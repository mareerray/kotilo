import { Routes, Route } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { getItems, addItem, updateItem, deleteItem } from './lib/itemsApi';
import { resizeImage } from './lib/resizeImage';
import type { NewItem } from './lib/itemsApi';
import type { Item } from './types/item';
import type { Annotation } from './types/annotation';
import { supabase } from './lib/supabase';
import { updateAnnotations } from './lib/itemsApi';

import AppHeader from './components/AppHeader';
import AboutKotilo from './components/AboutKotilo';
import AppFooter from './components/AppFooter';

import HomePage from './pages/HomePage';
import RoomPage from './pages/RoomPage';
import InventoryPage from './pages/InventoryPage';
import SoundToggle from './components/SoundToggle';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function toggleSound() {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }

  // Load items once, when the page opens.
  useEffect(() => {
    getItems()
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Upload photo to Supabase Storage and return the path.
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

  async function handleAnnotationsChange(id: number, annotations: Annotation[]) {
    const previous = items.find((i) => i.id === id)?.annotations ?? [];

    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, annotations } : i)));

    try {
      await updateAnnotations(id, annotations);
    } catch (e) {
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, annotations: previous } : i)));
      setError((e as Error).message);
    }
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <main id="main-content">
        <audio ref={audioRef} src="/sounds/kotilo-theme.mp3" loop preload="none" />

        <AppHeader
          soundToggle={
            <SoundToggle isPlaying={isPlaying} onToggle={toggleSound} />
          }
        />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/rooms/:roomId" element={<RoomPage />} />
          
          <Route
            path="/inventory"
            element={
              <InventoryPage
                items={items}
                loading={loading}
                error={error}
                onAdd={handleAddItem}
                onDelete={handleDeleteItem}
                onUpdate={handleUpdateItem}
                onAnnotationsChange={handleAnnotationsChange}
              />
            }
          />

          <Route path="/about" element={<AboutKotilo />} />

        </Routes>
      </main>

      <AppFooter />
    </div>
  );
}

export default App;

