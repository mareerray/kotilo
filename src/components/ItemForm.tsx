import { useState } from "react";
import type { NewItem } from "../lib/itemsApi";

type ItemFormProps = {
    onAdd: (
        item: NewItem,
        photoFile: File | null) => Promise<void>;
};

function ItemForm({ onAdd }: ItemFormProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number | null>(null);
    const [category, setCategory] = useState("");
    const [color, setColor] = useState("");
    const [width, setWidth] = useState<number | null>(null);
    const [height, setHeight] = useState<number | null>(null);
    const [depth, setDepth] = useState<number | null>(null);
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [condition, setCondition] = useState("Good");
    const [forSale, setForSale] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    function numberValue(value: string) {
        return value ? parseFloat(value) : null;
    }

    async function handleSubmit(event: React.SubmitEvent) {
        event.preventDefault();
        setError("");
        if (!name.trim()) return;
        if ((width ?? 0) < 0 || (height ?? 0) < 0 || (depth ?? 0) < 0) {
            setError("Measurements cannot be negative.");
            return;
        }
        if ((price ?? 0) < 0) {
            setError("Price cannot be negative.");
            return;
        }
        if (!photoFile) {
            setError("A photo is required.");
            return;
        }
        setIsSubmitting(true);

        await onAdd({
            name: name.trim(),
            description: description.trim(),
            price: price,
            category: category.trim(),
            color: color.trim(),
            width_cm: width,
            height_cm: height,
            depth_cm: depth,
            photo_path: null,
            condition: condition,
            for_sale: forSale,
            annotations: [],

        }, photoFile);

        setIsSubmitting(false);
        setName("");
        setDescription("");
        setPrice(null);
        setCategory("");
        setColor("");
        setWidth(null);
        setHeight(null);
        setDepth(null);
        setCondition("Good");
        setForSale(false);
        setPhotoFile(null);
    }

    return (
        <details className="add-panel">
            <summary>+ Add item</summary>
            <form className="add-form" onSubmit={handleSubmit}>
                {error && <p role="alert" className="form-error">{error}</p>}

                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                <input type="text" placeholder="Color" value={color} onChange={(e) => setColor(e.target.value)} />
                <input
                    type="number" min="0" step="0.01" placeholder="Price (€)"
                    value={price ?? ""} onChange={(e) => setPrice(numberValue(e.target.value))}
                />
                <input
                    type="number" min="0" step="any" placeholder="Width (cm)"
                    value={width ?? ""} onChange={(e) => setWidth(numberValue(e.target.value))}
                />
                <input
                    type="number" min="0" step="any" placeholder="Height (cm)"
                    value={height ?? ""} onChange={(e) => setHeight(numberValue(e.target.value))}
                />
                <input
                    type="number" min="0" step="any" placeholder="Depth (cm)"
                    value={depth ?? ""} onChange={(e) => setDepth(numberValue(e.target.value))}
                />

                <div className="add-form__wide add-form__row">
                    <select value={condition} onChange={(e) => setCondition(e.target.value)}>
                        <option value="New">New</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Poor">Poor</option>
                    </select>

                    <label className="checkbox">
                        <input type="checkbox" checked={forSale} onChange={(e) => setForSale(e.target.checked)} />
                        Planning to sell
                    </label>
                </div>

                <textarea
                    className="add-form__wide"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    className="add-form__wide"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhotoFile(e.target.files ? e.target.files[0] : null)}
                />

                <button className="btn btn--primary add-form__wide" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Adding..." : "Add Item"}
                </button>
            </form>
        </details>
    );
}

export default ItemForm;