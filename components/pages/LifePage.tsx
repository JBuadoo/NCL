export default function LifePage() {
  return (
    <div className="page" id="page-life">
      <section className="band" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <div className="sec-head" style={{ marginBottom: 44 }}>
            <span className="eyebrow">Life at NCL</span>
            <h2 style={{ fontSize: "clamp(2.2rem, 3.6vw, 2.9rem)", color: "var(--navy)" }}>
              The NCL Mindset
            </h2>
            <p
              style={{
                fontSize: "1.18rem",
                color: "#2D3748",
                maxWidth: 780,
                margin: "16px auto 0",
                lineHeight: 1.65,
              }}
            >
              New Creation Living isn't just a home. It's a system built around one simple idea:
              when you show up for yourself, you earn something back. Through our unique rewards
              program, your everyday consistency turns into real gift cards, rent credits, birthday
              celebrations, and a safe, supportive community that gets better the longer you stay.
            </p>
          </div>

          <div>
            <div className="sec-head" style={{ marginBottom: 36 }}>
              <span className="eyebrow">The Culture</span>
              <h2>This is what living here feels like</h2>
              <p style={{ fontSize: "1.15rem", color: "#2D3748" }}>
                Community isn't a slogan. It's a schedule.
              </p>
            </div>
            <div className="culture-grid">
              <div className="culture-card">
                <span className="culture-tag">Every Saturday · 7 PM</span>
                <h3>Game Night</h3>
                <p>Cards, board games, laughter. The common area fills up. You show up as you are.</p>
              </div>
              <div className="culture-card">
                <span className="culture-tag">Last Saturday · Monthly</span>
                <h3>House Cookout</h3>
                <p>
                  Every last Saturday of the month, the whole house eats together. Food and drinks
                  provided. Residents only: this table is yours.
                </p>
              </div>
              <div className="culture-card">
                <span className="culture-tag">Twice a Year</span>
                <h3>The Big Event</h3>
                <p>
                  An outdoor gathering with food, games, raffles, and partners from across the
                  community. <strong>Free for every resident.</strong> Points unlock extras: bring a
                  family member, earn VIP seating, get raffle tickets for real prizes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
