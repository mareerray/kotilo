import { useState } from 'react';
import type { Item } from '../types/item';
import { supabase } from '../lib/supabase';

type ItemCardProps = {
    item: Item;
    onDelete: (id: number) => void;
    onUpdate: (updatedItem: Item, newPhoto: File | null) => void;
};

function ItemCard({ item, onDelete, onUpdate }: ItemCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [draftItem, setDraftItem] = useState<Item>(item);
    const [newPhoto, setNewPhoto] = useState<File | null>(null);

    const photoUrl = item.photo_path
        ? supabase.storage.from('item-photos').getPublicUrl(item.photo_path).data.publicUrl
        : null;

    function startEditing() {
        setDraftItem(item);
        setNewPhoto(null);
        setIsEditing(true);
    }

    function cancelEditing() {
        setDraftItem(item);
        setNewPhoto(null);
        setIsEditing(false);
    }

    function handleSave() {
        onUpdate(draftItem, newPhoto);
        setNewPhoto(null);
        setIsEditing(false);
    }

    function numberValue(value: string) {
        return value ? parseFloat(value) : null;
    }

    if (isEditing) {
        return (
            <article className="item-card item-card--edit">
                <h2>Edit item</h2>

                {photoUrl && (
                    <div className="item-card__photo-area">
                        <img src={photoUrl} alt={item.name} className="item-photo" />
                    </div>
                )}

                <label className="field">
                    Replace photo
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setNewPhoto(e.target.files?.[0] ?? null)}
                    />
                </label>
                {newPhoto && <p className="field-note">New photo: {newPhoto.name}</p>}

                <label className="field">
                    Name
                    <input
                        value={draftItem.name}
                        onChange={(e) => setDraftItem({ ...draftItem, name: e.target.value })}
                    />
                </label>

                <label className="field">
                    Category
                    <input
                        value={draftItem.category}
                        onChange={(e) => setDraftItem({ ...draftItem, category: e.target.value })}
                    />
                </label>

                <label className="field">
                    Color
                    <input
                        value={draftItem.color}
                        onChange={(e) => setDraftItem({ ...draftItem, color: e.target.value })}
                    />
                </label>

                <div className="field-row">
                    <label className="field">
                        Width (cm)
                        <input
                            type="number"
                            min="0"
                            step="any"
                            value={draftItem.width_cm ?? ''}
                            onChange={(e) =>
                                setDraftItem({ ...draftItem, width_cm: numberValue(e.target.value) })
                            }
                        />
                    </label>

                    <label className="field">
                        Height (cm)
                        <input
                            type="number"
                            min="0"
                            step="any"
                            value={draftItem.height_cm ?? ''}
                            onChange={(e) =>
                                setDraftItem({ ...draftItem, height_cm: numberValue(e.target.value) })
                            }
                        />
                    </label>

                    <label className="field">
                        Depth (cm)
                        <input
                            type="number"
                            min="0"
                            step="any"
                            value={draftItem.depth_cm ?? ''}
                            onChange={(e) =>
                                setDraftItem({ ...draftItem, depth_cm: numberValue(e.target.value) })
                            }
                        />
                    </label>
                </div>

                <label className="field">
                    Condition
                    <select
                        value={draftItem.condition}
                        onChange={(e) => setDraftItem({ ...draftItem, condition: e.target.value })}
                    >
                        <option value="New">New</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Poor">Poor</option>
                    </select>
                </label>

                <div className="item-card__actions">
                    <button type="button" onClick={handleSave}>Save</button>
                    <button type="button" onClick={cancelEditing}>Cancel</button>
                </div>
            </article>
        );
    }

    return (
        <article className="item-card item-card--view">
            <header className="item-card__header">
                <h2>{item.name}</h2>
                <span className="item-card__condition">{item.condition}</span>
            </header>

            {photoUrl ? (
                <div className="item-card__photo-area">
                    <div className="item-card__photo-stage">
                        <img src={photoUrl} alt={item.name} className="item-photo" />
                        {/* Measurement annotations will go here in Step 7. */}
                    </div>
                </div>
            ) : (
                <div className="item-card__no-photo">No photo yet</div>
            )}

            <dl className="item-card__measurements">
                <div>
                    <dt>Width</dt>
                    <dd>{item.width_cm != null ? `${item.width_cm} cm` : '—'}</dd>
                </div>
                <div>
                    <dt>Height</dt>
                    <dd>{item.height_cm != null ? `${item.height_cm} cm` : '—'}</dd>
                </div>
                <div>
                    <dt>Depth</dt>
                    <dd>{item.depth_cm != null ? `${item.depth_cm} cm` : '—'}</dd>
                </div>
            </dl>

            <div className="item-card__details">
                <p>Category: {item.category || 'Not specified'}</p>
                <p>Color: {item.color || 'Not specified'}</p>
            </div>

            <footer className="item-card__actions">
                <button type="button" onClick={startEditing}>Edit</button>
                <button
                    type="button"
                    className="item-card__delete"
                    onClick={() => onDelete(item.id)}
                >
                    Delete
                </button>
            </footer>
        </article>
    );
}

export default ItemCard;