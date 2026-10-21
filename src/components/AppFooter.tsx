import { FaGithub, FaLinkedin } from 'react-icons/fa';

function AppFooter() {
    return (
        <footer className="site-footer">
            <div>
                <p className="site-footer__brand">Kotilo</p>
                <p>Your belongings, thoughtfully organised.</p>
            </div>

            <div className="site-footer__meta">
                <div className="site-footer__author">
                    <p>Built by Mayuree Reunsati</p>

                    <div className="site-footer__socials">
                        <a
                            href="https://www.linkedin.com/in/mayuree-reunsati/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Mayuree on LinkedIn (opens in a new tab)"
                        >
                            <FaLinkedin aria-hidden="true" />
                        </a>

                        <a
                            href="https://github.com/mareerray"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Mayuree on GitHub (opens in a new tab)"
                        >
                            <FaGithub aria-hidden="true" />
                        </a>
                    </div>
                </div>

                <p>© {new Date().getFullYear()} Kotilo</p>
                <a href="#top">Back to top ↑</a>
            </div>
        </footer>
    );
}

export default AppFooter;