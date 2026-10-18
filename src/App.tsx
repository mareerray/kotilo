import { useState } from 'react';
import ItemCard from './components/ItemCard';
import ItemForm from './components/ItemForm';
import type { Item } from './types/item';

const initialItems: Item[] = [
  { id: 1, name: "Bookshelf", category: "Furniture", color: "Brown", width_cm: 100, height_cm: 200, depth_cm: 30, photo_path: null, condition: "Good" },
  { id: 2, name: "Sofa", category: "Furniture", color: "Blue", width_cm: 150, height_cm: 80, depth_cm: 90, photo_path: null, condition: "Good" },
  { id: 3, name: "Floor lamp", category: "Lighting", color: "White", width_cm: 20, height_cm: 120, depth_cm: 20, photo_path: null, condition: "Fair" },
  { id: 4, name: "Bedside table", category: "Furniture", color: "Wooden", width_cm: 50, height_cm: 40, depth_cm: 40, photo_path: null, condition: "Good" },
];

function App() {
  const [items, setItems] = useState<Item[]>(initialItems);

  function handleAddItem(newItem: Item) {
    setItems([...items, newItem]);
  }

  function handleDeleteItem(delId: number) {
    setItems(items.filter(item => item.id !== delId));
  }

  function handleUpdateItem(updatedItem: Item) {
    setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
  }

  return (
    <div>
      <h1>Kotilo</h1>
      <ItemForm onAdd={handleAddItem} />
      {items.map((item) => (
        <ItemCard key={item.id} item={item} onDelete={handleDeleteItem} onUpdate={handleUpdateItem} />
      ))}

    </div>
  );
}
export default App
