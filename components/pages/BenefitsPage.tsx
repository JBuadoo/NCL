"use client";

import Link from "next/link";
import { useCopy } from "@/components/SiteContentProvider";

export default function BenefitsPage() {
  const copy = useCopy();
  return (
    <div className="page" id="page-benefits">
      <section className="band" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <div className="sec-head" style={{ marginBottom: 44 }}>
            <span className="eyebrow">{copy("benefits.eyebrow")}</span>
            <h2>{copy("benefits.title")}</h2>
            <p>{copy("benefits.body")}</p>
          </div>

          <div className="benefits-grid">
            <Link href="/benefits" className="path-card benefits-grid-cta">
              <span className="eyebrow">{copy("benefits.cta.eyebrow")}</span>
              <h3>{copy("benefits.cta.title")}</h3>
              <p>{copy("benefits.cta.body")}</p>
              <span className="path-card-cta">{copy("benefits.cta.button")}</span>
            </Link>

            <div className="info-card" style={{ marginBottom: 0 }}>
              <h3>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="var(--navy)">
                  <path d="M12 2v20M2 12h20" />
                </svg>
                {copy("benefits.cost.title")}
              </h3>
              <p>{copy("benefits.cost.body")}</p>
            </div>

            <div className="info-card" style={{ marginBottom: 0 }}>
              <h3>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="var(--navy)">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
                {copy("benefits.team.title")}
              </h3>
              <p>{copy("benefits.team.body")}</p>
            </div>

            <div
              className="info-card"
              style={{ background: "var(--navy)", border: "none", marginBottom: 0 }}
            >
              <h3 style={{ color: "white" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#E4CE8C" strokeWidth="1.8">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                {copy("benefits.call.title")}
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
        </div>
      </section>
    </div>
  );
}
