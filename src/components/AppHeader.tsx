import kotiloIcon from '../assets/kotilo-logo-nobg.png';
import { Link, NavLink } from 'react-router-dom';
function AppHeader() {
    return (
        <header className="site-header" id="top">
            <Link className="site-brand" to="/" aria-label="Kotilo home">
                <img src={kotiloIcon} alt="" />
                <span>Kotilo</span>
            </Link>

            <nav className="site-nav" aria-label="Main navigation">
                <NavLink to="/" end>Home</NavLink>
                <NavLink to="/inventory">Inventory</NavLink>
                <NavLink to="/about">About</NavLink>
            </nav>
        </header>
    );
}

export default AppHeader;