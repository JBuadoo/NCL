"use client";

import { useState } from "react";
import Link from "next/link";
import TourModal from "@/components/TourModal";

export default function ReferralPage() {
  const [tourOpen, setTourOpen] = useState(false);

  return (
    <div className="page" id="page-referral">
      <section className="band" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <div className="sec-head" style={{ marginBottom: 36 }}>
            <span className="eyebrow">Apply or Refer</span>
            <h2 style={{ fontSize: "clamp(2.2rem, 3.6vw, 2.9rem)", color: "var(--navy)" }}>
              Residency
            </h2>
            <p style={{ fontSize: "1.2rem", color: "#2D3748" }}>
              Choose how you&apos;d like to get started. We&apos;ll walk you through a short guided
              application — typically a few minutes — and follow up within a few hours.
            </p>
          </div>

          <div
            id="schedule-tour"
            className="schedule-tour-card"
            style={{
              background: "white",
              border: "2px solid var(--gold)",
              borderRadius: 20,
              padding: 36,
              marginBottom: 44,
              boxShadow: "0 10px 30px rgba(19, 31, 69, 0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 24,
              }}
            >
              <div style={{ flex: 1, minWidth: 280 }}>
                <span
                  className="eyebrow"
                  style={{
                    background: "rgba(201,168,76,0.18)",
                    color: "var(--navy)",
                    border: "1px solid var(--gold-light)",
                  }}
                >
                  Schedule a Tour
                </span>
                <h3
                  style={{
                    fontSize: "1.85rem",
                    color: "var(--navy)",
                    marginTop: 12,
                    marginBottom: 10,
                    fontFamily: "'Fraunces', serif",
                  }}
                >
                  Schedule a Tour of Our Locations
                </h3>
                <p
                  style={{
                    fontSize: "1.15rem",
                    color: "#2D3748",
                    marginBottom: 0,
                    lineHeight: 1.6,
                  }}
                >
                  Experience New Creation Living firsthand! Come visit our beautiful,
                  fully-furnished homes in Metro Atlanta &amp; Middle Georgia before or during your
                  application process.
                </p>
              </div>
              <div
                className="schedule-tour-actions"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  minWidth: 260,
                }}
              >
                <a
                  href="tel:+14047312371"
                  className="btn btn-primary"
                  style={{
                    background: "var(--navy)",
                    fontSize: "1.05rem",
                    padding: "16px 30px",
                    whiteSpace: "nowrap",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ width: 20, height: 20, marginRight: 4 }}
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  Call (404) 731-2371
                </a>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setTourOpen(true)}
                  style={{
                    fontSize: "1.05rem",
                    padding: "16px 30px",
                    whiteSpace: "nowrap",
                    justifyContent: "center",
                    borderColor: "var(--gold)",
                    color: "var(--navy)",
                    fontWeight: 700,
                  }}
                >
                  Schedule a Tour Now
                </button>
              </div>
            </div>
          </div>

          <TourModal open={tourOpen} onClose={() => setTourOpen(false)} />

          <div className="split equal-cards" style={{ marginBottom: 36 }}>
            <div className="info-card">
              <h3>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 3" />
                </svg>
                What happens after you submit
              </h3>
              <ul>
                <li>We review the application or referral and confirm benefit type and eligibility</li>
                <li>We contact you or the individual directly, usually within a few hours</li>
                <li>If it&apos;s a fit, we can place most people within 24 to 48 hours</li>
                <li>You&apos;ll get a direct line to our team for follow-up</li>
              </ul>
            </div>
            <div className="info-card">
              <h3>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                  <path d="M20 21a8 8 0 10-16 0" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Who we accept
              </h3>
              <ul>
                <li>Adults on SSI, SSDI, VA Pension, VA Disability, or Social Security</li>
                <li>Patients being discharged from acute care, rehab, or skilled nursing</li>
                <li>Veterans transitioning from VA housing programs</li>
                <li>Anyone on fixed income!</li>
              </ul>
            </div>
          </div>

          <div className="split equal-cards">
            <Link href="/apply" className="path-card">
              <span className="eyebrow">For You</span>
              <h3>Applying for myself</h3>
              <p>
                Start a guided application for your own residency. We&apos;ll ask about your
                situation, benefits, and readiness step by step.
              </p>
              <span className="path-card-cta">Start application →</span>
            </Link>

            <Link href="/refer" className="path-card">
              <span className="eyebrow">For Professionals &amp; Families</span>
              <h3>Referral</h3>
              <p>
                Refer someone else for placement. Walk through their eligibility and situation in a
                short guided flow.
              </p>
              <span className="path-card-cta">Start referral →</span>
            </Link>
          </div>

          <div
            className="info-card"
            style={{
              background: "var(--navy)",
              border: "none",
              marginTop: 36,
              marginBottom: 0,
              textAlign: "center",
            }}
          >
            <h3 style={{ color: "white", justifyContent: "center" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#E4CE8C" strokeWidth="1.8">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              Prefer to call?
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "1.3rem",
                fontWeight: 700,
                marginTop: 8,
              }}
            >
              (404) 731-2371
            </p>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.98rem", marginTop: 4 }}>
              SUPPORT@NEWCREATIONLIVING.ORG
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
