import {useState} from "react";
import type {Item} from "../types/item";

type ItemFormProps = {
    onAdd: (item: Item) => void;
};

function ItemForm({onAdd}: ItemFormProps) {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [color, setColor] = useState("");
    const [condition, setCondition] = useState("Good");

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (!name.trim()) return;

        onAdd({
            id: Date.now(),
            name: name.trim(),
            category: category.trim(),
            color: color.trim(),
            condition: condition,
        });

        setName("");
        setCategory("");
        setColor("");
        setCondition("Good");
    }

    return (
        <form onSubmit={handleSubmit}>
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