import { useEffect, useState } from 'react';
import { getItems, addItem, updateItem, deleteItem } from './lib/itemsApi';
import { resizeImage } from './lib/resizeImage';
import type { NewItem } from './lib/itemsApi';
import type { Item } from './types/item';
import type { Annotation } from './types/annotation';
import kotiloIcon from './assets/kotilo-icon.png';
import { supabase } from './lib/supabase';
import { updateAnnotations } from './lib/itemsApi';

import ItemCard from './components/ItemCard';
import ItemForm from './components/ItemForm';
import ItemFilters from './components/ItemFilters';


function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [conditionFilter, setConditionFilter] = useState('');
  const [error, setError] = useState("");

  // Load items once, when the page opens.
  useEffect(() => {
    getItems()
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Upload photo
  // Upload the photo to Supabase Storage and return the public URL.
  async function uploadPhoto(file: File): Promise<string> {
    const resized = await resizeImage(file);
    const ext = file.name.split('.').pop() ?? 'jpg';
    const path = `${crypto.randomUUID()}.${ext}`;

    const { error } = await supabase.storage
      .from('item-photos')
      .upload(path, resized);

    if (error) {
      throw new Error(error.message);
    }
    return path;
  }

  // Add item
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

  // Delete item
  // Delete first, then update the screen.
  async function handleDeleteItem(delId: number) {
    try {
      const path = items.find((i) => i.id === delId)?.photo_path ?? null;
      await deleteItem(delId);
      setItems(prev => prev.filter(item => item.id !== delId));
      if (path) {
        await supabase.storage.from('item-photos').remove([path]);
      }
    } catch (e) {
      setError((e as Error).message);
    }
  }

  // Update item
  // Save first, then update the screen with the row from the database.
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

      if (oldPath && oldPath !== savedItem.photo_path) {
        await supabase.storage.from('item-photos').remove([oldPath]);
      }
    } catch (e) {
      setError((e as Error).message);
    }
  }

  // Update annotations
  async function handleAnnotationsChange(id: number, annotations: Annotation[]) {
    const previous = items.find((i) => i.id === id)?.annotations ?? [];

    // 1. update the screen right away
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, annotations } : i)));

    // 2. save; if it fails, put the old lines back
    try {
      await updateAnnotations(id, annotations);
    } catch (e) {
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, annotations: previous } : i)));
      setError((e as Error).message);
    }
  }

  const categories = [...new Set(items.map((item) => item.category).filter(Boolean))].sort();

  const visibleItems = items.filter((item) => {
    const text = `${item.name} ${item.description} ${item.category} ${item.color}`.toLowerCase();
    const matchesSearch = text.includes(search.trim().toLowerCase());
    const matchesCategory = !categoryFilter || item.category === categoryFilter;
    const matchesCondition = !conditionFilter || item.condition === conditionFilter;
    return matchesSearch && matchesCategory && matchesCondition;
  });

  // Show loading message while items are being fetched from the database.
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="app-title">
        <img src={kotiloIcon} alt="Kotilo Icon" className="logo" />
        Kotilo
      </h1>
      {error && <p>Error: {error}</p>}
      <ItemForm onAdd={handleAddItem} />
      <ItemFilters
  search={search}
  category={categoryFilter}
  condition={conditionFilter}
  categories={categories}
  onSearchChange={setSearch}
  onCategoryChange={setCategoryFilter}
  onConditionChange={setConditionFilter}
  onClear={() => { setSearch(''); setCategoryFilter(''); setConditionFilter(''); }}
/>

<p className="field-note">Showing {visibleItems.length} of {items.length} items</p>

{visibleItems.length === 0 && <p>No items match your filters.</p>}
      {visibleItems.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onDelete={handleDeleteItem}
          onAnnotationsChange={handleAnnotationsChange}
          onUpdate={(updatedItem, newPhoto) => {
            const { id, ...changes } = updatedItem;
            return handleUpdateItem(id, changes, newPhoto);
          }}
        />
      ))}

    </div>
  );
}
export default App

