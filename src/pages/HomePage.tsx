import { Link } from 'react-router-dom';
import './home.css';

function HomePage() {
    return (
        <section className="home-page" aria-labelledby="home-title">
            <header className="home-intro">
                <p className="section-eyebrow">Your little corner of the world</p>
                <h1 id="home-title">Welcome home.</h1>
                <p>Choose a room and find the things you keep there.</p>
            </header>

            <div className="home-map" aria-label="Choose a room">
                <Link
                    to="/rooms/living-area"
                    className="home-room home-room--living"
                >
                    <span className="home-room__symbol" aria-hidden="true">🛋️</span>
                    <span className="home-room__name">Living area</span>
                    <span className="home-room__hint">A place to unwind</span>
                </Link>

                <Link
                    to="/rooms/kitchen"
                    className="home-room home-room--kitchen"
                >
                    <span className="home-room__symbol" aria-hidden="true">🫖</span>
                    <span className="home-room__name">Kitchen</span>
                    <span className="home-room__hint">Something warm</span>
                </Link>

                <Link
                    to="/rooms/bedroom"
                    className="home-room home-room--bedroom"
                >
                    <span className="home-room__symbol" aria-hidden="true">🛏️</span>
                    <span className="home-room__name">Bedroom</span>
                    <span className="home-room__hint">Rest and recharge</span>
                </Link>
            </div>

            <Link className="home-inventory-link" to="/inventory">
                View all belongings →
            </Link>
        </section>
    );
}

export default HomePage;