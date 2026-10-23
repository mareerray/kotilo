import './about.css';

function AboutKotilo() {
    return (
        <section className="about-kotilo" id="about" aria-labelledby="about-title">
<svg className="cozy-scene" viewBox="0 0 400 110" aria-hidden="true">
    {/* ground */}
    <line x1="10" y1="80" x2="390" y2="80" stroke="#a87b4f" strokeWidth="2" strokeLinecap="round" />

    {/* candle */}
    <rect x="24" y="50" width="12" height="30" rx="2" fill="#a87b4f" />
    <path className="flame" d="M30 32 C24 42 25 49 30 49 C35 49 36 42 30 32 Z" fill="#f2a93b" />

    {/* NEW: book stack */}
    <rect x="44" y="68" width="32" height="12" rx="1.5" fill="#d9708a" />
    <rect x="47" y="56" width="26" height="12" rx="1.5" fill="#f2a93b" />
    <rect x="45" y="44" width="30" height="12" rx="1.5" fill="#7a9a86" />

    {/* mug with steam */}
    <rect x="84" y="56" width="24" height="24" rx="4" fill="#d9708a" />
    <path d="M108 62 a7 7 0 0 1 0 14" fill="none" stroke="#d9708a" strokeWidth="3" />
    <g fill="none" stroke="#7a9a86" strokeWidth="2" strokeLinecap="round">
        <path className="steam steam--1" d="M90 50 q-4 -6 0 -12" />
        <path className="steam steam--2" d="M96 50 q-4 -6 0 -12" />
        <path className="steam steam--3" d="M102 50 q-4 -6 0 -12" />
    </g>

    {/* plant */}
    <g className="plant" fill="#4f7a5c">
        <path d="M150 64 C142 54 144 42 150 38 C156 44 157 55 150 64 Z" />
        <path d="M150 64 C140 60 134 52 136 46 C144 48 150 54 150 64 Z" />
    </g>
    <rect x="142" y="64" width="16" height="16" rx="3" fill="#a87b4f" />

    {/* NEW: standing books */}
    <rect x="168" y="48" width="9" height="32" rx="1.5" fill="#7a9a86" />
    <rect x="178" y="52" width="8" height="28" rx="1.5" fill="#f2a93b" />
    <rect x="187" y="50" width="9" height="30" rx="1.5" fill="#d9708a" />

    {/* NEW: teddy bear */}
    <g className="teddy">
        <ellipse cx="221" cy="77" rx="6" ry="4" fill="#c98f5a" />
        <ellipse cx="239" cy="77" rx="6" ry="4" fill="#c98f5a" />
        <ellipse cx="230" cy="67" rx="12" ry="12" fill="#c98f5a" />
        <ellipse cx="230" cy="70" rx="7" ry="7" fill="#e8c9a0" />
        <ellipse cx="217" cy="66" rx="4" ry="7" fill="#c98f5a" transform="rotate(15 217 66)" />
        <ellipse cx="243" cy="66" rx="4" ry="7" fill="#c98f5a" transform="rotate(-15 243 66)" />
        <circle cx="222" cy="41" r="4" fill="#c98f5a" />
        <circle cx="238" cy="41" r="4" fill="#c98f5a" />
        <circle cx="222" cy="41" r="2" fill="#e8c9a0" />
        <circle cx="238" cy="41" r="2" fill="#e8c9a0" />
        <circle cx="230" cy="49" r="10" fill="#c98f5a" />
        <ellipse cx="230" cy="52" rx="5" ry="3.5" fill="#e8c9a0" />
        <ellipse cx="230" cy="51" rx="1.8" ry="1.2" fill="#5a3b24" />
        <circle cx="226" cy="47" r="1.3" fill="#5a3b24" />
        <circle cx="234" cy="47" r="1.3" fill="#5a3b24" />
        <path d="M230 58 l-5 -3 v6 Z M230 58 l5 -3 v6 Z" fill="#d9708a" />
    </g>

    {/* NEW: trailing plant */}
    <g className="trail">
        <g fill="none" stroke="#4f7a5c" strokeWidth="2" strokeLinecap="round">
            <path d="M272 70 C262 78 265 92 260 104" />
            <path d="M288 70 C298 80 294 94 298 106" />
        </g>
        <g fill="#4f7a5c">
            <ellipse cx="263" cy="88" rx="3" ry="5" />
            <ellipse cx="260" cy="100" rx="3" ry="5" />
            <ellipse cx="296" cy="90" rx="3" ry="5" />
            <ellipse cx="298" cy="102" rx="3" ry="5" />
        </g>
    </g>
    <g className="plant" fill="#4f7a5c">
        <path d="M280 60 C272 52 274 42 280 38 C286 44 287 53 280 60 Z" />
        <path d="M280 60 C270 56 266 48 268 44 C275 46 280 52 280 60 Z" />
        <path d="M280 60 C290 56 294 48 292 44 C285 46 280 52 280 60 Z" />
    </g>
    <rect x="270" y="60" width="20" height="20" rx="3" fill="#a87b4f" />

    {/* NEW: vase with flower */}
    <line x1="314" y1="66" x2="314" y2="46" stroke="#4f7a5c" strokeWidth="2" strokeLinecap="round" />
    <circle cx="314" cy="42" r="5" fill="#d9708a" />
    <circle cx="314" cy="42" r="2" fill="#f2a93b" />
    <path d="M308 80 L306 66 Q314 62 322 66 L320 80 Z" fill="#f2a93b" />

    {/* NEW: radio */}
    <line x1="368" y1="60" x2="380" y2="42" stroke="#a87b4f" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="336" y="60" width="40" height="20" rx="3" fill="#7a9a86" />
    <circle cx="348" cy="70" r="6" fill="none" stroke="#f6ead9" strokeWidth="1.5" />
    <circle cx="366" cy="70" r="3" fill="#f2a93b" />
</svg>
            <p className="section-eyebrow">A little more organised</p>
            <h2 id="about-title">A home for the things you keep.</h2>

            <p className="about-kotilo__intro">
                Kotilo helps you keep track of your belongings in one place.
                Save photos, record measurements, and find what you need
                without relying on memory.
            </p>

            <div className="about-features">
                <div className="about-features__card">
                    <h3>See what you have</h3>
                    <p>
                        Keep names, photos, descriptions, and prices together
                        in a searchable inventory.
                    </p>
                </div>

                <div className="about-features__card">
                    <h3>Keep measurements handy</h3>
                    <p>
                        Mark dimensions directly on a photo, so you can check
                        whether something fits before moving it.
                    </p>
                </div>

                <div className="about-features__card">
                    <h3>Plan your next clear-out</h3>
                    <p>
                        Mark belongings you’re planning to sell and keep track
                        of their listed prices.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default AboutKotilo;