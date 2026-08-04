"use client";

import Link from "next/link";

export default function BenefitsPage() {
  return (
    <div className="page" id="page-benefits">
      <section className="band" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <div className="sec-head" style={{ marginBottom: 44 }}>
            <span className="eyebrow">Free Eligibility Screening</span>
            <h2>We Help You Navigate Benefits</h2>
            <p>
              Evaluate your eligibility for SSI, SSDI, or VA Pension at no cost. We identify the
              strongest path to approval for your specific situation.
            </p>
          </div>

          <div className="benefits-grid">
            <Link href="/benefits" className="path-card benefits-grid-cta">
              <span className="eyebrow">Start Here</span>
              <h3>Benefits Screening</h3>
              <p>
                Answer a few guided questions about your work history, disability, and income. Takes
                a few minutes — we follow up within 72 hours.
              </p>
              <span className="path-card-cta">Start benefits screening →</span>
            </Link>

            <div className="info-card" style={{ marginBottom: 0 }}>
              <h3>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="var(--navy)">
                  <path d="M12 2v20M2 12h20" />
                </svg>
                No Upfront Cost
              </h3>
              <p>
                We work on a contingency basis. Our attorneys handle the paperwork, applications,
                and hearings on your behalf, and we do not charge you upfront or out-of-pocket. With
                our Attorneys, you are three times more likely to be approved!
              </p>
            </div>

            <div className="info-card" style={{ marginBottom: 0 }}>
              <h3>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="var(--navy)">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
                Vetted &amp; Experienced Team
              </h3>
              <p>
                From initial applications to hearings and appeals, we stand by you. If your
                application is denied, we appeal. We don&apos;t walk away.
              </p>
            </div>

            <div
              className="info-card"
              style={{ background: "var(--navy)", border: "none", marginBottom: 0 }}
            >
              <h3 style={{ color: "white" }}>
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
        </div>
      </section>
    </div>
  );
}
