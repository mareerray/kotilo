import type { Item } from '../types/item';

type ItemCardProps = {
    item: Item;
};

function ItemCard ({item}: ItemCardProps) {
    return (
        <div>
            <h2>{item.name}</h2>
            <p>Category: {item.category}</p>
            <p>Color: {item.color}</p>
            <p>Condition: {item.condition}</p>
        </div>
    );
}

export default ItemCard;