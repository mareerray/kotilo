function AboutKotilo() {
    return (
        <section className="about-kotilo" id="about" aria-labelledby="about-title">
            <p className="section-eyebrow">A little more organised</p>
            <h2 id="about-title">A home for the things you keep.</h2>

            <p className="about-kotilo__intro">
                Kotilo helps you keep track of your belongings in one place.
                Save photos, record measurements, and find what you need
                without relying on memory.
            </p>

            <div className="about-features">
                <div>
                    <h3>See what you have</h3>
                    <p>
                        Keep names, photos, descriptions, and prices together
                        in a searchable inventory.
                    </p>
                </div>

                <div>
                    <h3>Keep measurements handy</h3>
                    <p>
                        Mark dimensions directly on a photo, so you can check
                        whether something fits before moving it.
                    </p>
                </div>

                <div>
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