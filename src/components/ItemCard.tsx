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
            <div>
                <input value={draftItem.name} onChange={(e) => setDraftItem({ ...draftItem, name: e.target.value })} />
                <input value={draftItem.category} onChange={(e) => setDraftItem({ ...draftItem, category: e.target.value })} />
                <input value={draftItem.color} onChange={(e) => setDraftItem({ ...draftItem, color: e.target.value })} />
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
        ) : (
            <div>

                <div>
                    <h2>{item.name}</h2>
                    <p>Category: {item.category}</p>
                    <p>Color: {item.color}</p>
                    <p>Condition: {item.condition}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => onDelete(item.id)}>Delete</button>
                </div>
            </div>
        )
    );
}

export default ItemCard;