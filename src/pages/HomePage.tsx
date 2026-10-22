import { Link } from 'react-router-dom';
import { rooms } from '../data/rooms';
import './home.css';
import {
    Sofa,
    BedDouble,
    NotebookPen,
    DoorOpen,
    CookingPot,
    Bath,
    Sprout,
} from 'lucide-react';

import type { LucideIcon } from 'lucide-react';

const roomIcons: Record<string, LucideIcon> = {
    'living-room': Sofa,
    bedroom: BedDouble,
    office: NotebookPen,
    hallway: DoorOpen,
    kitchen: CookingPot,
    bathroom: Bath,
    outdoor: Sprout,
};
function HomePage() {
    return (
        <section className="home-page" aria-labelledby="home-title">
            <header className="home-intro">
                <p className="section-eyebrow">Your little corner of the world</p>
                <h1 id="home-title">Welcome home.</h1>
                <p>Choose a room and find the things you keep there.</p>
            </header>
            <div className="house-sky" aria-hidden="true">
                <span className="cloud cloud-1" />
                <span className="cloud cloud-2" />
                <span className="cloud cloud-3" />
                <span className="cloud cloud-4" />
                <span className="cloud cloud-5" />

                <span className="bird bird-1 bird-icon">🕊️</span>
                <span className="bird bird-2 bird-icon">🕊️</span>
                <span className="bird bird-3 bird-icon">🕊️</span>
            </div>
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
                        .filter((room) => room.id !== 7)
                        .map((room) => {
                            const Icon = roomIcons[room.id];

                            return (
                                <Link
                                    key={room.id}
                                    to={`/rooms/${room.id}`}
                                    className={`home-room home-room--${room.id}`}
                                >
                                    <span className="room-window" aria-hidden="true" />

                                    {Icon && (
                                        <Icon
                                            className="home-room__icon"
                                            strokeWidth={1.5}
                                            aria-hidden="true"
                                        />
                                    )}

                                    <span className="home-room__name">
                                        {room.name}
                                    </span>
                                </Link>
                            );
                        })}                </div>

                {/* Decorative entrance */}
                <div className="house-entrance" aria-hidden="true">
                    <span className="house-door" />
                </div>

                {/* Outdoor is outside the house */}
                {rooms
                    .filter((room) => room.id === 7)
                    .map((room) => (
                        <Link
                            key={room.id}
                            to={`/rooms/${room.id}`}
                            className="house-garden"
                        >
                            {/* Cute garden decorations */}
                            <span className="garden-birdhouse" aria-hidden="true">
                                <span className="garden-birdhouse__hole" />
                            </span>

                            <span className="garden-planter garden-planter--left" aria-hidden="true">
                                <span className="garden-planter__flowers" />
                            </span>

                            <span className="garden-planter garden-planter--right" aria-hidden="true">
                                <span className="garden-planter__flowers" />
                            </span>

                            <span className="garden-flower garden-flower--pink" aria-hidden="true" />
                            <span className="garden-flower garden-flower--yellow" aria-hidden="true" />
                            <span className="garden-flower garden-flower--blue" aria-hidden="true" />
                            <span className="garden-flower garden-flower--white" aria-hidden="true" />
                            {/* Garden path */}
                            <span className="garden-path" aria-hidden="true">
                                <span className="garden-path__stone garden-path__stone--1" />
                                <span className="garden-path__stone garden-path__stone--2" />
                                <span className="garden-path__stone garden-path__stone--3" />
                                <span className="garden-path__stone garden-path__stone--4" />
                            </span>

                            {/* Watering can */}
                            <span className="garden-watering-can" aria-hidden="true">
                                <span className="garden-watering-can__spout" />
                            </span>

                            {/* Butterfly */}
                            <span className="garden-butterfly" aria-hidden="true"> <span /> </span>
                            <span className="garden-butterfly garden-butterfly--blue" aria-hidden="true">
                                <span />
                            </span>
                            <span>{room.name}</span>
                        </Link>

                    ))}

                {/* Decorative plants beside the house */}
                <div className="house-plants" aria-hidden="true">
                    <span className="house-bush house-bush--left" />

                    <div className="house-tree-group">
                        <span className="house-tree" />
                        <span className="house-bush house-bush--right-front" />
                    </div>
                </div>
            </div>
            <Link className="home-inventory-link" to="/inventory">
                View all belongings →
            </Link>
        </section>
    );
}

export default HomePage;