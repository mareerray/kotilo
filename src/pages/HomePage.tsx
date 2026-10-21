import { Link } from 'react-router-dom';
import { rooms } from '../data/rooms';
import './home.css';

const roomSymbols: Record<string, string> = {
    'living-room': '🛋️',
    bedroom: '🛏️',
    office: '📚',
    hallway: '🚪',
    kitchen: '🫖',
    bathroom: '🛁',
    outdoor: '🌿',
};

function HomePage() {
    return (
        <section className="home-page" aria-labelledby="home-title">
            <header className="home-intro">
                <p className="section-eyebrow">Your little corner of the world</p>
                <h1 id="home-title">Welcome home.</h1>
                <p>Choose a room and find the things you keep there.</p>
            </header>

            <div className="home-house">
                {/* Decorative roof */}
                <div className="house-roof-area" aria-hidden="true">
                    <div className="house-chimney">
                        <span className="chimney-smoke chimney-smoke--one" />
                        <span className="chimney-smoke chimney-smoke--two" />
                        <span className="chimney-smoke chimney-smoke--three" />
                    </div>

                    <div className="house-roof">
                        <span className="house-roof__window" />
                    </div>
                </div>

                {/* Indoor rooms */}
                <div className="home-map" aria-label="Choose a room">
                    {rooms
                        .filter((room) => room.id !== 'outdoor')
                        .map((room) => (
                            <Link
                                key={room.id}
                                to={`/rooms/${room.id}`}
                                className={`home-room home-room--${room.id}`}
                            >
                                <span className="room-window" aria-hidden="true" />

                                <span className="home-room__symbol" aria-hidden="true">
                                    {roomSymbols[room.id]}
                                </span>

                                <span className="home-room__name">
                                    {room.name}
                                </span>
                            </Link>
                        ))}
                </div>

                {/* Decorative entrance */}
                <div className="house-entrance" aria-hidden="true">
                    <span className="house-door" />
                </div>

                {/* Outdoor is outside the house */}
                {rooms
                    .filter((room) => room.id === 'outdoor')
                    .map((room) => (
                        <Link
                            key={room.id}
                            to={`/rooms/${room.id}`}
                            className="house-garden"
                        >
                            <span aria-hidden="true">🌿</span>
                            <span>{room.name}</span>
                            <span aria-hidden="true">🌼</span>
                        </Link>
                    ))}
            </div>            <Link className="home-inventory-link" to="/inventory">
                View all belongings →
            </Link>
        </section>
    );
}

export default HomePage;