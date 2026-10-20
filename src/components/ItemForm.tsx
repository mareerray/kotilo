import { useState } from "react";
import type { NewItem } from "../lib/itemsApi";

type ItemFormProps = {
    onAdd: (
        item: NewItem, 
        photoFile: File | null) => Promise<void>;
};

function ItemForm({ onAdd }: ItemFormProps) {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [color, setColor] = useState("");
    const [width, setWidth] = useState<number | null>(null);
    const [height, setHeight] = useState<number | null>(null);
    const [depth, setDepth] = useState<number | null>(null);
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [condition, setCondition] = useState("Good");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: React.SubmitEvent) {
        event.preventDefault();
        setError("");
        if (!name.trim()) return;
        if ((width ?? 0) < 0 || (height ?? 0) < 0 || (depth ?? 0) < 0) {
            setError("Measurements cannot be negative.");
            return;
        }
        if (!photoFile) {
            setError("A photo is required.");
            return;
        }
        setIsSubmitting(true);

        await onAdd({
            name: name.trim(),
            category: category.trim(),
            color: color.trim(),
            width_cm: width,
            height_cm: height,
            depth_cm: depth,
            photo_path: null,
            annotations: [],
            condition: condition,
        }, photoFile);

        setIsSubmitting(false);
        setName("");
        setCategory("");
        setColor("");
        setWidth(null);
        setHeight(null);
        setDepth(null);
        setCondition("Good");
        setPhotoFile(null);
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <p role="alert">{error}</p>}
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <input
                type="text"
                placeholder="Color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />
            <input
                type="number"
                min="0"
                step="any"
                placeholder="Width (cm)"
                value={width ?? ""}
                onChange={(e) => setWidth(e.target.value ? parseFloat(e.target.value) : null)}
            />
            <input
                type="number"
                min="0"
                step="any"
                placeholder="Height (cm)"
                value={height ?? ""}
                onChange={(e) => setHeight(e.target.value ? parseFloat(e.target.value) : null)}
            />
            <input
                type="number"
                min="0"
                step="any"
                placeholder="Depth (cm)"
                value={depth ?? ""}
                onChange={(e) => setDepth(e.target.value ? parseFloat(e.target.value) : null)}
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhotoFile(e.target.files ? e.target.files[0] : null)}
            />
            <select value={condition} onChange={(e) => setCondition(e.target.value)}>
                <option value="New">New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
            </select>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Item"}
            </button>
        </form>
    );
}

export default ItemForm;