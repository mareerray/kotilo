import { useEffect, useState } from 'react';
import { getItems, addItem, updateItem, deleteItem } from './lib/itemsApi';
import type { NewItem } from './lib/itemsApi';
import type { Item } from './types/item';
import kotiloIcon from './assets/kotilo-icon.png';
import { supabase } from './lib/supabase';

import ItemCard from './components/ItemCard';
import ItemForm from './components/ItemForm';


function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load items once, when the page opens.
  useEffect(() => {
    getItems()
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Upload the photo to Supabase Storage and return the public URL.
  async function uploadPhoto(file: File): Promise<string> {
    const ext = file.name.split('.').pop() ?? 'jpg';
    const path = `${crypto.randomUUID()}.${ext}`;

    const { error } = await supabase.storage
      .from('item-photos')
      .upload(path, file);

    if (error) {
      throw new Error(error.message);
    }
    return path;
  }


  // Save first, then update the screen with the row from the database.
  async function handleAddItem(newItem: NewItem, photoFile: File | null) {
    try {
      const photo_path = photoFile ? await uploadPhoto(photoFile) : null;
      const savedItem = await addItem({ ...newItem, photo_path });
      setItems(prev => [savedItem, ...prev]);
    } catch (e) {
      setError((e as Error).message);
    }
  }

  async function handleDeleteItem(delId: number) {
    try {
      await deleteItem(delId);
      setItems(prev => prev.filter(item => item.id !== delId));
    } catch (e) {
      setError((e as Error).message);
    }
  }

  async function handleUpdateItem(
    id: number,
    changes: Partial<NewItem>,
    newPhoto: File | null
  ) {
    try {
      const oldPath = items.find((i) => i.id === id)?.photo_path ?? null;
      const finalChanges = { ...changes };

      if (newPhoto) {
        finalChanges.photo_path = await uploadPhoto(newPhoto);
      }

      const savedItem = await updateItem(id, finalChanges);
      setItems((prev) => prev.map((item) => (item.id === id ? savedItem : item)));

      if (newPhoto && oldPath) {
        await supabase.storage.from('item-photos').remove([oldPath]);
      }
    } catch (e) {
      setError((e as Error).message);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="app-title">
        <img src={kotiloIcon} alt="Kotilo Icon" className="logo" />
        Kotilo
      </h1>
      {error && <p>Error: {error}</p>}
      <ItemForm onAdd={handleAddItem} />
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onDelete={handleDeleteItem}
          onUpdate={(updatedItem, newPhoto) => {
            const { id, ...changes } = updatedItem;
            handleUpdateItem(id, changes, newPhoto);
          }}
        />
      ))}

    </div>
  );
}
export default App



// const initialItems: Item[] = [
//   { id: 1, name: "Bookshelf", category: "Living room", color: "Brown", width_cm: 100, height_cm: 200, depth_cm: 30, photo_path: null, condition: "Good" },
//   { id: 2, name: "Sofa", category: "Living room", color: "Blue", width_cm: 150, height_cm: 80, depth_cm: 90, photo_path: null, condition: "Good" },
//   { id: 3, name: "Floor lamp", category: "Living room", color: "White", width_cm: 20, height_cm: 120, depth_cm: 20, photo_path: null, condition: "Fair" },
//   { id: 4, name: "Bedside table", category: "Bedroom", color: "Wooden", width_cm: 50, height_cm: 40, depth_cm: 40, photo_path: null, condition: "Good" },
// ];