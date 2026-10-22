import kotiloIcon from '../assets/kotilo-logo-nobg.png';
import { Link, NavLink } from 'react-router-dom';

type AppHeaderProps = {
    soundToggle?: React.ReactNode;
};

function AppHeader({ soundToggle }: AppHeaderProps) {
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
            {soundToggle}
        </header>
    );
}

export default AppHeader;