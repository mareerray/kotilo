import { Link, useParams } from 'react-router-dom';
import './home.css';

const roomNames: Record<string, string> = {
    'living-area': 'Living area',
    kitchen: 'Kitchen',
    bedroom: 'Bedroom',
};

function RoomPage() {
    const { roomId } = useParams();
    const roomName = roomId ? roomNames[roomId] : undefined;

    if (!roomName) {
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
        <section className="home-page">
            <Link className="home-inventory-link" to="/">
                ← My home
            </Link>

            <header className="home-intro">
                <h1>{roomName}</h1>
                <p>This room is ready for your belongings.</p>
            </header>

            <p>
                Next, we’ll connect items from your inventory to this room.
            </p>

            <Link className="home-inventory-link" to="/inventory">
                Browse my inventory →
            </Link>
        </section>
    );
}

export default RoomPage;