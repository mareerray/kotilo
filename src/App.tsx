import { useEffect, useState } from 'react';
import { getItems, updateItem } from './lib/itemsApi';
import type { NewItem } from './lib/itemsApi';
import type { Item } from './types/item';

import ItemCard from './components/ItemCard';
import ItemForm from './components/ItemForm';

// const initialItems: Item[] = [
//   { id: 1, name: "Bookshelf", category: "Living room", color: "Brown", width_cm: 100, height_cm: 200, depth_cm: 30, photo_path: null, condition: "Good" },
//   { id: 2, name: "Sofa", category: "Living room", color: "Blue", width_cm: 150, height_cm: 80, depth_cm: 90, photo_path: null, condition: "Good" },
//   { id: 3, name: "Floor lamp", category: "Living room", color: "White", width_cm: 20, height_cm: 120, depth_cm: 20, photo_path: null, condition: "Fair" },
//   { id: 4, name: "Bedside table", category: "Bedroom", color: "Wooden", width_cm: 50, height_cm: 40, depth_cm: 40, photo_path: null, condition: "Good" },
// ];

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getItems()
    .then(setItems)
    .catch((e) => setError(e.message))
    .finally(() => setLoading(false));
  }, []);

  function handleAddItem(newItem: Item) {
    setItems([...items, newItem]);
  }

  function handleDeleteItem(delId: number) {
    setItems(items.filter(item => item.id !== delId));
  }

  async function handleUpdateItem(id: number, updatedItem: Partial<NewItem>) {
    try {
      const savedItem = await updateItem(id, updatedItem);
      setItems(prev => prev.map(item => (item.id === id ? savedItem : item)));
    } catch (e) {
      setError((e as Error).message);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Kotilo</h1>
      {error && <p>Error: {error}</p>}
      <ItemForm onAdd={handleAddItem} />
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onDelete={handleDeleteItem}
          onUpdate={(updatedItem) => {
            const { id, ...changes } = updatedItem;
            handleUpdateItem(id, changes);
          }}
        />  
      ))}

    </div>
  );
}
export default App
