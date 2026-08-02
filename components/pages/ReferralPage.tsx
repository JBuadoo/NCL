"use client";

import { useState, type FormEvent } from "react";
import { submitApplication, submitReferral } from "@/app/actions/forms";
import TourModal from "@/components/TourModal";

const BENEFIT_OPTIONS = ["SSI", "SSDI", "VA Benefits", "Social Security", "Not yet approved"];

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ReferralPage() {
  const [appStatus, setAppStatus] = useState<FormStatus>("idle");
  const [refStatus, setRefStatus] = useState<FormStatus>("idle");
  const [tourOpen, setTourOpen] = useState(false);

  async function handleApplicationSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (appStatus === "submitting") return;
    const data = new FormData(e.currentTarget);
    setAppStatus("submitting");

    const result = await submitApplication(data);
    if (result.ok) {
      setAppStatus("success");
    } else {
      console.error("Application submission failed:", result.error);
      setAppStatus("error");
    }
  }

  async function handleReferralSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (refStatus === "submitting") return;
    const data = new FormData(e.currentTarget);
    setRefStatus("submitting");

    const result = await submitReferral(data);
    if (result.ok) {
      setRefStatus("success");
    } else {
      console.error("Referral submission failed:", result.error);
      setRefStatus("error");
    }
  }

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
              Applying for yourself? Use the form on the left. Referring someone else? Use the form
              on the right. We typically respond within a few hours.
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

          <div className="split" style={{ marginBottom: 36 }}>
            <div className="info-card" style={{ marginBottom: 0 }}>
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
                <li>If it's a fit, we can place most people within 24 to 48 hours</li>
                <li>You'll get a direct line to our team for follow-up</li>
              </ul>
            </div>
            <div className="info-card" style={{ marginBottom: 0 }}>
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

          <div className="split">
            {/* Left: Apply for yourself */}
            <div className="form-card">
              <h3>Apply for yourself</h3>
              <p>Applying for your own residency. Takes about 2 minutes.</p>

              <form
                id="applicationForm"
                onSubmit={handleApplicationSubmit}
                style={appStatus === "success" ? { display: "none" } : undefined}
              >
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="app-first">First name</label>
                    <input type="text" id="app-first" name="app-first" required />
                  </div>
                  <div className="field">
                    <label htmlFor="app-last">Last name</label>
                    <input type="text" id="app-last" name="app-last" required />
                  </div>
                </div>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="app-phone">Phone number</label>
                    <input type="tel" id="app-phone" name="app-phone" required />
                  </div>
                  <div className="field">
                    <label htmlFor="app-email">Email address</label>
                    <input type="email" id="app-email" name="app-email" required />
                  </div>
                </div>
                <div className="field">
                  <label>Your benefit type</label>
                  <div className="radio-group">
                    {BENEFIT_OPTIONS.map((option, index) => (
                      <label className="radio-pill" key={option}>
                        <input
                          type="radio"
                          name="app-benefit"
                          value={option}
                          required={index === 0}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="app-notes">Anything we should know about your situation?</label>
                  <textarea id="app-notes" name="app-notes" rows={4}></textarea>
                </div>
                <button type="submit" className="submit-btn" disabled={appStatus === "submitting"}>
                  {appStatus === "submitting" ? "Submitting..." : "Submit Application"}
                </button>
                {appStatus === "error" && (
                  <p className="form-note" style={{ color: "#C0392B" }}>
                    Something went wrong submitting your application. Please try again or call (404)
                    731-2371.
                  </p>
                )}
                <p className="form-note">
                  We typically respond within a few hours during business hours.
                </p>
              </form>

              <div
                className={`confirm-box${appStatus === "success" ? " show" : ""}`}
                id="application-confirm"
              >
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
                <h4>Application received</h4>
                <p>
                  Thank you. Our team will follow up shortly. For anything urgent, call us directly
                  at (404) 731-2371.
                </p>
              </div>
            </div>

            {/* Right: Referral form */}
            <div className="form-card">
              <h3>Referral form</h3>
              <p>For professionals &amp; families referring someone else.</p>

              <form
                id="referralForm"
                onSubmit={handleReferralSubmit}
                style={refStatus === "success" ? { display: "none" } : undefined}
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
                <button type="submit" className="submit-btn" disabled={refStatus === "submitting"}>
                  {refStatus === "submitting" ? "Submitting..." : "Submit Referral"}
                </button>
                {refStatus === "error" && (
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
                className={`confirm-box${refStatus === "success" ? " show" : ""}`}
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
