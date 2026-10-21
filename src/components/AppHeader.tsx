import kotiloIcon from '../assets/kotilo-logo-nobg.png';

function AppHeader() {
    return (
        <header className="site-header" id="top">
            <a className="site-brand" href="#top" aria-label="Kotilo home">
                <img src={kotiloIcon} alt="" />
                <span>Kotilo</span>
            </a>

            <nav className="site-nav" aria-label="Main navigation">
                <a href="#inventory">Inventory</a>
                <a href="#about">About</a>
            </nav>
        </header>
    );
}

export default AppHeader;