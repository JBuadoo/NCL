"use client";

import { useState } from "react";
import Link from "next/link";
import TourModal from "@/components/TourModal";
import { useCopy, useCopyList } from "@/components/SiteContentProvider";

export default function ReferralPage() {
  const copy = useCopy();
  const copyList = useCopyList();
  const [tourOpen, setTourOpen] = useState(false);
  const afterItems = copyList("residency.after.items");
  const acceptItems = copyList("residency.accept.items");

  return (
    <div className="page" id="page-referral">
      <section className="band" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <div className="sec-head" style={{ marginBottom: 36 }}>
            <span className="eyebrow">{copy("residency.eyebrow")}</span>
            <h2 style={{ fontSize: "clamp(2.2rem, 3.6vw, 2.9rem)", color: "var(--navy)" }}>
              {copy("residency.title")}
            </h2>
            <p style={{ fontSize: "1.2rem", color: "#2D3748" }}>
              {copy("residency.body")}
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
                  {copy("residency.tour.eyebrow")}
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
                  {copy("residency.tour.title")}
                </h3>
                <p
                  style={{
                    fontSize: "1.15rem",
                    color: "#2D3748",
                    marginBottom: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {copy("residency.tour.body")}
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
                  {copy("residency.tour.call_cta")}
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
                  {copy("residency.tour.schedule_cta")}
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
                {copy("residency.after.title")}
              </h3>
              <ul>
                {afterItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="info-card">
              <h3>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                  <path d="M20 21a8 8 0 10-16 0" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {copy("residency.accept.title")}
              </h3>
              <ul>
                {acceptItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div id="apply-options" className="split equal-cards">
            <Link href="/apply" className="path-card">
              <span className="eyebrow">{copy("residency.apply.eyebrow")}</span>
              <h3>{copy("residency.apply.title")}</h3>
              <p>{copy("residency.apply.body")}</p>
              <span className="path-card-cta">{copy("residency.apply.cta")}</span>
            </Link>

            <Link href="/refer" className="path-card">
              <span className="eyebrow">{copy("residency.refer.eyebrow")}</span>
              <h3>{copy("residency.refer.title")}</h3>
              <p>{copy("residency.refer.body")}</p>
              <span className="path-card-cta">{copy("residency.refer.cta")}</span>
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
              {copy("residency.call.title")}
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "1.3rem",
                fontWeight: 700,
                marginTop: 8,
              }}
            >
              {copy("footer.contact_phone")}
            </p>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.98rem", marginTop: 4 }}>
              {copy("footer.contact_email")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
