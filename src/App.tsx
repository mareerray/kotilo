import { useState } from 'react';
import ItemCard from './components/ItemCard';
import ItemForm from './components/ItemForm';
import type { Item } from './types/item';

const initialItems: Item[] = [
  { id: 1, name: "Bookshelf", category: "Furniture", color: "Brown", condition: "Good" },
  { id: 2, name: "Sofa", category: "Furniture", color: "Blue", condition: "Good" },
  { id: 3, name: "Floor lamp", category: "Lighting", color: "White", condition: "Fair" },
  { id: 4, name: "Bedside table", category: "Furniture", color: "Wooden", condition: "Good" },
];

function App() {
  const [items, setItems] = useState<Item[]>(initialItems);

  function handleAddItem(newItem: Item) {
    setItems([...items, newItem]);
  }

  function handleDeleteItem(delId: number) {
    setItems(items.filter(item => item.id !== delId));
  }

  return (
    <div>
      <h1>Kotilo</h1>
      <ItemForm onAdd={handleAddItem} />
      {items.map((item) => (
        <ItemCard key={item.id} item={item} onDelete={handleDeleteItem} />
      ))}

    </div>
  );
}
export default App
