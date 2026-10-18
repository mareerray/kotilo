import { useState } from 'react';
import type { Item } from '../types/item';

type ItemCardProps = {
    item: Item;
    onDelete: (id: number) => void;
    onUpdate: (updatedItem: Item) => void;
};

function ItemCard({ item, onDelete, onUpdate }: ItemCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [draftItem, setDraftItem] = useState<Item>(item);

    function handleSave() {
        onUpdate(draftItem);
        setIsEditing(false);
    }

    return (
        isEditing ? (
            <div className="item-card">
                <input value={draftItem.name} onChange={(e) => setDraftItem({ ...draftItem, name: e.target.value })} />
                <input value={draftItem.category} onChange={(e) => setDraftItem({ ...draftItem, category: e.target.value })} />
                <input value={draftItem.color} onChange={(e) => setDraftItem({ ...draftItem, color: e.target.value })} />
                <input 
                    type="number" 
                    min="0" 
                    step="any" 
                    value={draftItem.width_cm ?? ""} 
                    onChange={(e) => setDraftItem({ ...draftItem, width_cm: e.target.value ? parseFloat(e.target.value) : null })} 
                />
                <input 
                    type="number" 
                    min="0" 
                    step="any" 
                    value={draftItem.height_cm ?? ""} 
                    onChange={(e) => setDraftItem({ ...draftItem, height_cm: e.target.value ? parseFloat(e.target.value) : null })} 
                />
                <input 
                    type="number" 
                    min="0" 
                    step="any" 
                    value={draftItem.depth_cm ?? ""} 
                    onChange={(e) => setDraftItem({ ...draftItem, depth_cm: e.target.value ? parseFloat(e.target.value) : null })} 
                />
                <input
                    type="text"
                    placeholder="Photo Path (URL)"
                    value={draftItem.photo_path ?? ""}
                    onChange={(e) => setDraftItem({ ...draftItem, photo_path: e.target.value || null })}
                />

                <button onClick={handleSave}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
        ) : (
            <div>

                <div className="item-card">
                    <h2>{item.name}</h2>
                    <p>Category: {item.category}</p>
                    <p>Color: {item.color}</p>
                    <p>Width: {item.width_cm !== null ? `${item.width_cm} cm` : "N/A"}</p>
                    <p>Height: {item.height_cm !== null ? `${item.height_cm} cm` : "N/A"}</p>
                    <p>Depth: {item.depth_cm !== null ? `${item.depth_cm} cm` : "N/A"}</p>
                    <p>Condition: {item.condition}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => onDelete(item.id)}>Delete</button>
                </div>
            </div>
        )
    );
}

export default ItemCard;