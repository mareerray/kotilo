import { Link, useParams } from 'react-router-dom';
import { rooms } from '../data/rooms';
import './home.css';

function RoomPage() {
    const { roomId } = useParams();
    const room = rooms.find((room) => room.id === roomId);

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
        <section className="home-page">
            <Link className="home-inventory-link" to="/">
                ← My home
            </Link>

            <header className="home-intro">
                <h1>{room.name}</h1>
                <p>A little place for the things you keep.</p>
            </header>

            <p>
                Your belongings in this space will appear here soon.
            </p>

            <Link className="home-inventory-link" to="/inventory">
                Browse my inventory →
            </Link>
        </section>
    );
}

export default RoomPage;