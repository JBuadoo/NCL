"use client";

import { useState, type FormEvent } from "react";
import { submitReferral } from "@/app/actions/forms";

const BENEFIT_OPTIONS = ["SSI", "SSDI", "VA Benefits", "Social Security", "Not yet approved"];

export default function ReferralPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const data = new FormData(e.currentTarget);
    setStatus("submitting");

    const result = await submitReferral(data);
    if (result.ok) {
      setStatus("success");
    } else {
      console.error("Referral submission failed:", result.error);
      setStatus("error");
    }
  }

  return (
    <div className="page" id="page-referral">
      <section className="band" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <div className="sec-head" style={{ marginBottom: 36 }}>
            <span className="eyebrow">For Professionals &amp; Families</span>
            <h2 style={{ fontSize: "clamp(2.2rem, 3.6vw, 2.9rem)", color: "var(--navy)" }}>
              Residency
            </h2>
            <p style={{ fontSize: "1.2rem", color: "#2D3748" }}>
              Whether you are filing it out for yourself, a family member, or referral partner,
              please complete the form below.
            </p>
          </div>

          {/* Schedule a Tour Subsection */}
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
              <a
                href="tel:+14047312371"
                className="btn btn-primary"
                style={{
                  background: "var(--navy)",
                  fontSize: "1.1rem",
                  padding: "16px 30px",
                  whiteSpace: "nowrap",
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
                Call (404) 731-2371 to Schedule
              </a>
            </div>
          </div>

          <div className="split">
            <div>
              <div className="info-card">
                <h3>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                  </svg>
                  What happens after you submit
                </h3>
                <ul>
                  <li>We review the referral and confirm benefit type and eligibility</li>
                  <li>We contact you or the individual directly, usually within a few hours</li>
                  <li>If it's a fit, we can place most referrals within 24 to 48 hours</li>
                  <li>You'll get a direct line to our team for follow-up</li>
                </ul>
              </div>
              <div className="info-card">
                <h3>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                    <path d="M20 21a8 8 0 10-16 0" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Who we accept referrals for
                </h3>
                <ul>
                  <li>Adults on SSI, SSDI, VA Pension, VA Disability, or Social Security</li>
                  <li>Patients being discharged from acute care, rehab, or skilled nursing</li>
                  <li>Veterans transitioning from VA housing programs</li>
                  <li>Anyone on fixed income!</li>
                </ul>
              </div>
              <div className="info-card" style={{ background: "var(--navy)", border: "none" }}>
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

            <div className="form-card">
              <h3>Residency form</h3>
              <p>Takes about 2 minutes. We'll follow up directly.</p>

              <form
                id="referralForm"
                onSubmit={handleSubmit}
                style={status === "success" ? { display: "none" } : undefined}
              >
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="ref-name">Your name</label>
                    <input type="text" id="ref-name" name="ref-name" required />
                  </div>
                  <div className="field">
                    <label htmlFor="ref-role">Your role</label>
                    <select id="ref-role" name="ref-role" required defaultValue="">
                      <option value="">Select one</option>
                      <option>Hospital discharge planner</option>
                      <option>Social worker / case manager</option>
                      <option>VA / veteran services staff</option>
                      <option>Family member</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="ref-org">Organization (if applicable)</label>
                    <input type="text" id="ref-org" name="ref-org" />
                  </div>
                  <div className="field">
                    <label htmlFor="ref-phone">Your phone number</label>
                    <input type="tel" id="ref-phone" name="ref-phone" required />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="ref-client">Name of person being referred</label>
                  <input type="text" id="ref-client" name="ref-client" required />
                </div>
                <div className="field">
                  <label>Their benefit type</label>
                  <div className="radio-group">
                    {BENEFIT_OPTIONS.map((option, index) => (
                      <label className="radio-pill" key={option}>
                        <input
                          type="radio"
                          name="ref-benefit"
                          value={option}
                          required={index === 0}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="ref-notes">Anything we should know about their situation?</label>
                  <textarea id="ref-notes" name="ref-notes" rows={4}></textarea>
                </div>
                <button type="submit" className="submit-btn" disabled={status === "submitting"}>
                  {status === "submitting" ? "Submitting..." : "Submit Referral"}
                </button>
                {status === "error" && (
                  <p className="form-note" style={{ color: "#C0392B" }}>
                    Something went wrong submitting your referral. Please try again or call (404)
                    731-2371.
                  </p>
                )}
                <p className="form-note">
                  We typically respond within a few hours during business hours.
                </p>
              </form>

              <div
                className={`confirm-box${status === "success" ? " show" : ""}`}
                id="referral-confirm"
              >
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
                <h4>Referral received</h4>
                <p>
                  Thank you. Our team will follow up shortly. For anything urgent, call us directly
                  at (404) 731-2371.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
