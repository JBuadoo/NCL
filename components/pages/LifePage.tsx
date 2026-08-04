"use client";

import { scrollToId } from "@/lib/scroll";

export default function LifePage() {
  return (
    <div className="page" id="page-life">
      <section
        className="band alt"
        style={{
          background: "var(--navy)",
          color: "white",
          border: "none",
          backgroundImage:
            "radial-gradient(ellipse 900px 500px at 15% -10%, rgba(201,168,76,0.1), transparent)",
          paddingTop: 56,
        }}
      >
        <div className="wrap">
          <div className="split" style={{ alignItems: "center", marginBottom: 64 }}>
            <div>
              <span
                className="eyebrow"
                style={{
                  background: "rgba(201,168,76,0.2)",
                  color: "var(--gold-light)",
                  border: "1px solid rgba(201,168,76,0.3)",
                }}
              >
                Life at NCL
              </span>
              <h2
                style={{
                  color: "white",
                  fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)",
                  marginTop: 10,
                  marginBottom: 18,
                }}
              >
                The NCL Mindset
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "1.1rem",
                  marginBottom: 24,
                  lineHeight: 1.6,
                }}
              >
                New Creation Living isn&apos;t just a home. It&apos;s a system built around one
                simple idea: when you show up for yourself, you earn something back. Through our
                unique rewards program, your everyday consistency turns into real gift cards, rent
                credits, birthday celebrations, and a safe, supportive community that gets better
                the longer you stay.
              </p>
              <button
                type="button"
                className="btn"
                style={{ background: "var(--gold)", color: "var(--navy-deep)", fontWeight: 700 }}
                onClick={() => scrollToId("apply-options")}
              >
                Apply for residency
              </button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
                width: "100%",
              }}
            >
              <div className="free-screening-card">
                <div className="screening-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M2 12h20" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </div>
                <h4>Rewards Program</h4>
                <p>Show up for yourself — and earn something real back.</p>
                <div className="screening-benefits-list">
                  {["Gift cards & rent credits", "Birthday celebrations", "Stronger community"].map(
                    (item) => (
                      <div className="screening-benefit-item" key={item}>
                        <svg viewBox="0 0 24 24" fill="none">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{item}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="sec-head" style={{ marginBottom: 36 }}>
            <span
              className="eyebrow"
              style={{
                background: "rgba(201,168,76,0.2)",
                color: "var(--gold-light)",
                border: "1px solid rgba(201,168,76,0.3)",
              }}
            >
              The Culture
            </span>
            <h2 style={{ color: "white" }}>This is what living here feels like</h2>
            <p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.8)" }}>
              Community isn&apos;t a slogan. It&apos;s a schedule.
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
      </section>
    </div>
  );
}
