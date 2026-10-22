import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { rooms } from '../data/rooms';
import { supabase } from '../lib/supabase';
import type { Item } from '../types/item';
import './home.css';
import './room.css';

function RoomPage() {
    const { roomId } = useParams();
    const room = rooms.find((room) => room.id === Number(roomId));

    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!room) return;
        const roomName = room.name;

        async function fetchItems() {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase
                .from('items')
                .select('*')
                .eq('category', roomName);

            if (error) {
                setError(error.message);
            } else {
                setItems(data ?? []);
            }

            setLoading(false);
        }

        fetchItems();
    }, [room]);

    if (!room) {
        return (
            <section className="home-page">
                <h1>Room not found</h1>
                <Link className="home-inventory-link" to="/">
                    ← Back to my home
                </Link>
            </section>
        );
    }

    return (
        <section className="room-page">
            <Link className="room-page__back" to="/">← My home</Link>

            <header className="room-page__header">
                <h1 className="room-page__title">{room.name}</h1>
                <p className="room-page__subtitle">A little place for the things you keep.</p>
                <span className="room-page__count">
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
            </header>

            {loading && <p>Loading items...</p>}
            {error && <p>Error: {error}</p>}

            {!loading && !error && items.length === 0 && (
                <div className="room-page__empty">
                    <p>No items in this room yet.</p>
                </div>
            )}

            <div className="room-showcase">
                {items.map((item) => {
                    const photoUrl = item.photo_path
                        ? supabase.storage.from('item-photos').getPublicUrl(item.photo_path).data.publicUrl
                        : null;

                    return (
                        <Link
                            key={item.id}
                            to={`/inventory?category=${encodeURIComponent(room.name)}&highlight=${item.id}`}
                            className="room-item-card"
                        >
                            {photoUrl ? (
                                <img src={photoUrl} alt={item.name} className="room-item-card__photo" />
                            ) : (
                                <div className="room-item-card__no-photo">No photo</div>
                            )}
                            <span className="room-item-card__name">{item.name}</span>
                        </Link>
                    );
                })}
            </div>

            <Link className="home-inventory-link" to="/inventory">
                Browse my inventory →
            </Link>

            <Link
                to="/"
                className="fab room-fab--home"
                aria-label="Go to my home"
            >
                <img
                    src="/kotilo-logo-nobg.png"
                    alt=""
                    className="fab__logo"
                />
            </Link>

            <button
                type="button"
                className="fab room-fab--top"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Scroll to top"
            >
                ↑
            </button>
        </section>
    );
}

export default RoomPage;