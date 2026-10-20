import { Search } from 'lucide-react';

type ItemFiltersProps = {
    search: string;
    category: string;
    condition: string;
    categories: string[];
    onSearchChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
    onConditionChange: (value: string) => void;
    onClear: () => void;
};

function ItemFilters({
    search, category, condition, categories,
    onSearchChange, onCategoryChange, onConditionChange, onClear,
}: ItemFiltersProps) {
    return (
        <div className="item-filters">
            <label className="search-box">
                <Search size={18} />
                <input
                    type="search"
                    placeholder="Search items..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </label>

            <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
                <option value="">All categories</option>
                {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>

            <select value={condition} onChange={(e) => onConditionChange(e.target.value)}>
                <option value="">Any condition</option>
                <option value="New">New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
            </select>

            <button type="button" className="btn" onClick={onClear}>Clear</button>
        </div>
    );
}

export default ItemFilters;