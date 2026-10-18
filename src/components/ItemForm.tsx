import { useState } from "react";
import type { Item } from "../types/item";

type ItemFormProps = {
    onAdd: (item: Item) => void;
    onUpdate?: (item: Item) => void;
};

function ItemForm({ onAdd }: ItemFormProps) {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [color, setColor] = useState("");
    const [width, setWidth] = useState<number | null>(null);
    const [height, setHeight] = useState<number | null>(null);
    const [depth, setDepth] = useState<number | null>(null);
    const [photoPath, setPhotoPath] = useState<string | null>(null);
    const [condition, setCondition] = useState("Good");
    const [error, setError] = useState("");

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setError("");
        if (!name.trim()) return;
        if ((width ?? 0) < 0 || (height ?? 0) < 0 || (depth ?? 0) < 0) {
            setError("Measurements cannot be negative.");
            return;
        }
        if (photoPath && !photoPath.startsWith("http")) {
            setError("Invalid photo path.");
            return;
        }

        onAdd({
            id: Date.now(),
            name: name.trim(),
            category: category.trim(),
            color: color.trim(),
            width_cm: width,
            height_cm: height,
            depth_cm: depth,
            photo_path: null,
            condition: condition,
        });

        setName("");
        setCategory("");
        setColor("");
        setWidth(null);
        setHeight(null);
        setDepth(null);
        setPhotoPath(null);
        setCondition("Good");
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
                type="text"
                placeholder="Photo Path (URL)"
                value={photoPath ?? ""}
                onChange={(e) => setPhotoPath(e.target.value || null)}
            />
            <select value={condition} onChange={(e) => setCondition(e.target.value)}>
                <option value="New">New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
            </select>
            <button type="submit">Add Item</button>
        </form>
    );
}

export default ItemForm;