import { Package, Coins, LayoutGrid, Tag } from 'lucide-react';
import type { Item } from '../types/item';

function StatsBar({ items }: { items: Item[] }) {
    const euro = new Intl.NumberFormat('fi-FI', { style: 'currency', currency: 'EUR' });
    const totalValue = items.reduce((sum, i) => sum + (i.price ?? 0), 0);
    const categoryCount = new Set(items.map((i) => i.category).filter(Boolean)).size;
    const forSale = items.filter((i) => i.for_sale);
    const forSaleValue = forSale.reduce((sum, i) => sum + (i.price ?? 0), 0);

    const stats = [
        { label: 'Total items', value: items.length, icon: <Package size={22} /> },
        { label: 'Total value', value: euro.format(totalValue), icon: <Coins size={22} /> },
        { label: 'Categories', value: categoryCount, icon: <LayoutGrid size={22} /> },
        { label: 'For sale', value: `${forSale.length}  | ${euro.format(forSaleValue)}`, icon: <Tag size={22} /> },
    ];

    return (
        <section className="stats">
            {stats.map((s) => (
                <div key={s.label} className="stat">
                    <span className="stat__icon">{s.icon}</span>
                    <div className="stat__text">
                        <span className="stat__label">{s.label}</span>
                        <span className="stat__value">{s.value}</span>
                    </div>
                </div>
            ))}
        </section>
    );
}

export default StatsBar;