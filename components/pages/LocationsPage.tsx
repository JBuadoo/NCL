"use client";

import { scrollToSection } from "@/lib/scroll";

export default function LocationsPage({ onWatchVideo }: { onWatchVideo: () => void }) {
  return (
    <div className="page" id="page-locations">
      <section className="band" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Locations</span>
            <h2>Where we are</h2>
            <p>
              Every property is chosen for proximity to public transit, so you don't need a car to
              get where you're going.
            </p>
          </div>

          <div className="loc-card">
            <div className="loc-photo">
              <img
                src="/img/south-fulton.jpeg"
                alt="South Fulton location property"
              />
            </div>
            <div className="loc-body">
              <span className="loc-status">Open &amp; Accepting Residents</span>
              <h3>South Fulton Location</h3>
              <div className="loc-feats">
                <span className="loc-feat">Near MARTA bus routes</span>
                <span className="loc-feat">All-inclusive $25/day</span>
                <span className="loc-feat">On-site house manager</span>
                <span className="loc-feat">Shared common areas</span>
              </div>
              <div className="loc-actions">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => scrollToSection("referral")}
                >
                  Apply to This Location
                </button>
                <button
                  className="btn btn-ghost"
                  type="button"
                  onClick={onWatchVideo}
                  style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ width: 18, height: 18, color: "var(--gold)" }}
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Watch Video Tour
                </button>
              </div>
            </div>
          </div>

          <div className="expansion-note">
            <h4>Expanding across Metro &amp; Middle Georgia</h4>
            <p>
              We're actively adding new locations. Call (404) 731-2371 to ask about upcoming
              availability in your area.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
