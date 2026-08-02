"use client";

import { useState, type FormEvent } from "react";
import { submitBenefitsScreening } from "@/app/actions/forms";

const BENEFIT_OPTIONS = ["SSI", "SSDI", "VA Pension", "Social Security", "Not Sure"];
const APPLIED_OPTIONS = ["No, never", "Yes, and was denied", "Yes, application is pending"];

export default function BenefitsPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const data = new FormData(e.currentTarget);
    setStatus("submitting");

    const result = await submitBenefitsScreening(data);
    if (result.ok) {
      setStatus("success");
    } else {
      console.error("Benefits screening submission failed:", result.error);
      setStatus("error");
    }
  }

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

          <div className="split">
            <div>
              <div className="info-card">
                <h3>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="var(--navy)">
                    <path d="M12 2v20M2 12h20" />
                  </svg>
                  No Upfront Cost
                </h3>
                <p>
                  We work on a contingency basis. Our attorneys handle the paperwork, applications,
                  and hearings on your behalf, and we do not charge you upfront or out-of-pocket.
                  With our Attorneys, you are three times more likely to be approved!
                </p>
              </div>
              <div className="info-card">
                <h3>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="var(--navy)">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  Vetted &amp; Experienced Team
                </h3>
                <p>
                  From initial applications to hearings and appeals, we stand by you. If your
                  application is denied, we appeal. We don't walk away.
                </p>
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
              <h3>Benefits Screening Form</h3>
              <p>Takes about 2 minutes. We will identify your options and follow up within 72 hours.</p>

              <form
                id="benefitsForm"
                onSubmit={handleSubmit}
                style={status === "success" ? { display: "none" } : undefined}
              >
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="ben-first">First name</label>
                    <input type="text" id="ben-first" name="ben-first" required />
                  </div>
                  <div className="field">
                    <label htmlFor="ben-last">Last name</label>
                    <input type="text" id="ben-last" name="ben-last" required />
                  </div>
                </div>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="ben-phone">Phone number</label>
                    <input type="tel" id="ben-phone" name="ben-phone" required />
                  </div>
                  <div className="field">
                    <label htmlFor="ben-email">Email address</label>
                    <input type="text" id="ben-email" name="ben-email" required />
                  </div>
                </div>
                <div className="field">
                  <label>Which benefit are you seeking help with?</label>
                  <div className="radio-group">
                    {BENEFIT_OPTIONS.map((option, index) => (
                      <label className="radio-pill" key={option}>
                        <input type="radio" name="ben-type" value={option} required={index === 0} />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="field">
                  <label>Have you ever applied for this benefit in the past?</label>
                  <div className="radio-group">
                    {APPLIED_OPTIONS.map((option, index) => (
                      <label className="radio-pill" key={option}>
                        <input
                          type="radio"
                          name="ben-applied"
                          value={option}
                          required={index === 0}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="ben-notes">Briefly describe your situation or health conditions</label>
                  <textarea
                    id="ben-notes"
                    name="ben-notes"
                    rows={4}
                    placeholder="This helps us evaluate your path to approval..."
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn" disabled={status === "submitting"}>
                  {status === "submitting" ? "Submitting..." : "Submit Screening Request"}
                </button>
                {status === "error" && (
                  <p className="form-note" style={{ color: "#C0392B" }}>
                    Something went wrong submitting your request. Please try again or call (404)
                    731-2371.
                  </p>
                )}
                <p className="form-note">Free screening. No obligation. Confidential submission.</p>
              </form>

              <div
                className={`confirm-box${status === "success" ? " show" : ""}`}
                id="benefits-confirm"
              >
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
                <h4>Submitted</h4>
                <p>We will be in touch within 72 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
