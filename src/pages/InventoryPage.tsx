import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Item } from '../types/item';
import type { NewItem } from '../lib/itemsApi';
import type { Annotation } from '../types/annotation';
import { rooms } from '../data/rooms';
import StatsBar from '../components/StatsBar';
import ItemForm from '../components/ItemForm';
import ItemFilters from '../components/ItemFilters';
import Pagination from '../components/Pagination';
import ItemCard from '../components/ItemCard';

import '../site.css';
import './inventory.css';

type InventoryPageProps = {
    items: Item[];
    loading: boolean;
    error: string;
    onAdd: (newItem: NewItem, photoFile: File | null) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
    onUpdate: (id: number, changes: Partial<NewItem>, newPhoto: File | null) => Promise<void>;
    onAnnotationsChange: (id: number, annotations: Annotation[]) => Promise<void>;
};

const PAGE_SIZE = 6;

function InventoryPage({
    items,
    loading,
    error,
    onAdd,
    onDelete,
    onUpdate,
    onAnnotationsChange,
}: InventoryPageProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryFilter = searchParams.get('category') ?? '';
    const highlightId = searchParams.get('highlight');

    const [search, setSearch] = useState('');
    const [conditionFilter, setConditionFilter] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [page, setPage] = useState(1);
    const [toastMessage, setToastMessage] = useState('');

    function showToast(message: string) {
        setToastMessage(message);
        setTimeout(() => setToastMessage(''), 3000);
    }

    function handleCategoryChange(value: string) {
        setSearchParams(value ? { category: value } : {});
        setPage(1);
    }

    const categories = rooms.map((room) => room.name);

    const visibleItems = items.filter((item) => {
        const text = `${item.name} ${item.description} ${item.category} ${item.color}`.toLowerCase();
        const matchesSearch = text.includes(search.trim().toLowerCase());
        const matchesCategory = !categoryFilter || item.category === categoryFilter;
        const matchesCondition = !conditionFilter || item.condition === conditionFilter;
        return matchesSearch && matchesCategory && matchesCondition;
    });

    // Derive the page for the highlighted item during render (no effect needed)
    const highlightIndex = highlightId
        ? visibleItems.findIndex((item) => String(item.id) === highlightId)
        : -1;
    const highlightPage =
        highlightIndex >= 0 ? Math.floor(highlightIndex / PAGE_SIZE) + 1 : null;

    const totalPages = Math.max(1, Math.ceil(visibleItems.length / PAGE_SIZE));
    const requestedPage = highlightPage ?? page;
    const currentPage = Math.min(requestedPage, totalPages);
    const pagedItems = visibleItems.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    // Scroll to the highlighted item (DOM update — allowed in an effect)
    useEffect(() => {
        if (!highlightId) return;
        const element = document.getElementById(`item-${highlightId}`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [highlightId, currentPage, items]);

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <Link
                to="/"
                className="fab fab--home"
                aria-label="Go to my home"
            >
                <img
                    src="/kotilo-logo-nobg.png"
                    alt=""
                    className="fab__logo"
                />
            </Link>

            <button
                className="fab"
                onClick={() => setShowAddForm(true)}
                aria-label="Add item"
            >
                +
            </button>

            <button
                type="button"
                className="fab fab--top"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Scroll to top"
            >
                <ArrowUp size={20} />
            </button>

            <ItemForm
                open={showAddForm}
                onClose={() => setShowAddForm(false)}
                onAdd={async (newItem, photoFile) => {
                    await onAdd(newItem, photoFile);
                    showToast('Item added ✓');
                }}
            />

            <section className="dashboard-intro">
                <p className="section-eyebrow">Your personal storage dashboard</p>
                <h1>A little order. A little peace of mind.</h1>
                <p className="dashboard-intro-text">
                    Know what you have, keep measurements close,
                    and make room for what matters.
                </p>
            </section>

            <section id="inventory" aria-labelledby="inventory-title">
                <h2 className="inventory-heading" id="inventory-title">
                    My inventory
                </h2>

                {error && <p className="form-error">Error: {error}</p>}

                <StatsBar items={items} />

                <ItemFilters
                    search={search}
                    category={categoryFilter}
                    condition={conditionFilter}
                    categories={categories}
                    onSearchChange={(v) => { setSearch(v); setPage(1); }}
                    onCategoryChange={handleCategoryChange}
                    onConditionChange={(v) => { setConditionFilter(v); setPage(1); }}
                    onClear={() => {
                        setSearch('');
                        setSearchParams({});
                        setConditionFilter('');
                        setPage(1);
                    }}
                />

                <p className="results-note">
                    Showing {visibleItems.length} of {items.length} items
                </p>
                {visibleItems.length === 0 && (
                    <p className="results-note">No items match your filters.</p>
                )}

                <div className="items-grid">
                    {pagedItems.map((item) => (
                        <div
                            key={item.id}
                            id={`item-${item.id}`}
                            className={
                                String(item.id) === highlightId
                                    ? 'item-highlight'
                                    : ''
                            }
                        >
                            <ItemCard
                                item={item}
                                onDelete={onDelete}
                                onAnnotationsChange={onAnnotationsChange}
                                onUpdate={(updatedItem, newPhoto) => {
                                    const { id, ...changes } = updatedItem;
                                    return onUpdate(id, changes, newPhoto);
                                }}
                            />
                        </div>
                    ))}
                </div>

                {toastMessage && (
                    <div className="toast" role="status">{toastMessage}</div>
                )}

                <Pagination
                    page={currentPage}
                    totalPages={totalPages}
                    onChange={(p) => {
                        setPage(p);
                        // Clear highlight so paging works normally after the jump
                        if (highlightId) {
                            setSearchParams(
                                categoryFilter ? { category: categoryFilter } : {}
                            );
                        }
                        document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                />
            </section>
        </>
    );
}

export default InventoryPage;