function AppFooter() {
    return (
        <footer className="site-footer">
            <div>
                <p className="site-footer__brand">Kotilo</p>
                <p>Your belongings, thoughtfully organised.</p>
            </div>

            <div className="site-footer__meta">
                <p>Built by Mayuree Reunsati</p>
                <p>© {new Date().getFullYear()} Kotilo</p>
                <a href="#top">Back to top ↑</a>
            </div>
        </footer>
    );
}

export default AppFooter;