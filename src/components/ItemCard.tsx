import type { Item } from '../types/item';

type ItemCardProps = {
    item: Item;
    onDelete: (id: number) => void;
};

function ItemCard ({item, onDelete}: ItemCardProps) {
    return (
        <div>
            <h2>{item.name}</h2>
            <p>Category: {item.category}</p>
            <p>Color: {item.color}</p>
            <p>Condition: {item.condition}</p>
            <button onClick={() => onDelete(item.id)}>Delete</button>
        </div>
    );
}

export default ItemCard;