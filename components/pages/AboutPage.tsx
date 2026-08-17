"use client";

import { useState } from "react";
// import Link from "next/link";
import { scrollToId } from "@/lib/scroll";
import { useCopy } from "@/components/SiteContentProvider";

export default function AboutPage() {
  const copy = useCopy();
  // Benefits assistance flow temporarily hidden — keep fixed-income path only
  const [activeFlow] = useState<"fixed" | "need">("fixed");

  return (
    <div className="page" id="page-about">
      <section className="band" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <div className="about-grid">
            <div className="about-intro">
              <span className="eyebrow">{copy("about.eyebrow")}</span>
              <h2>{copy("about.title")}</h2>
              <div className="about-text-border">
                <p>{copy("about.body")}</p>
              </div>
            </div>

            <div className="about-pillars">
              <div className="about-pillar-card">
                <div className="about-pillar-header">
                  <div className="about-pillar-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 2a5 5 0 0 1 5 5v3a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5z" />
                      <path d="M8 21h8M12 17v4" />
                    </svg>
                  </div>
                  <h3>{copy("about.structure_title")}</h3>
                </div>
                <p>{copy("about.structure_body")}</p>
              </div>

              {/* Benefits Support pillar temporarily hidden
              <div className="about-pillar-card">
                <div className="about-pillar-header">
                  <div className="about-pillar-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M20 21a8 8 0 10-16 0" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <h3>Benefits Support</h3>
                </div>
                <p>
                  If you're waiting on SSI, SSDI, VA benefits, or Social Security, we help you
                  navigate the process at no upfront cost to you.
                </p>
                <Link href="/benefits" className="benefits-cta-btn">
                  <span>Get my benefits</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ width: 16, height: 16 }}
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
              */}
            </div>
          </div>

          <div className="sec-head" style={{ marginTop: 80 }}>
            <span className="eyebrow">{copy("about.how.eyebrow")}</span>
            <h2>{copy("about.how.title")}</h2>
          </div>

          {/* Benefits tab temporarily hidden — fixed-income flow shown by default
          <div className="how-tabs">
            <button
              className={`how-tab${activeFlow === "fixed" ? " active" : ""}`}
              onClick={() => setActiveFlow("fixed")}
            >
              I am on Fixed Income
            </button>
            <button
              className={`how-tab${activeFlow === "need" ? " active" : ""}`}
              onClick={() => setActiveFlow("need")}
            >
              I need my Benefits
            </button>
          </div>
          */}

          {/* Flow for fixed income (4 steps) */}
          <div id="flow-fixed" className={`how-flow${activeFlow === "fixed" ? " active-flow" : ""}`}>
            <div className="how-grid-4">
              <div className="how-step-card">
                <span className="how-step-num">01</span>
                <h4>{copy("about.step1_title")}</h4>
                <p>{copy("about.step1_body")}</p>
                <button className="btn btn-ghost" onClick={() => scrollToId("apply-options")}>
                  {copy("about.step1_cta")}
                </button>
              </div>

              <div className="how-step-card">
                <span className="how-step-num">02</span>
                <h4>{copy("about.step2_title")}</h4>
                <p>{copy("about.step2_body")}</p>
              </div>

              <div className="how-step-card">
                <span className="how-step-num">03</span>
                <h4>{copy("about.step3_title")}</h4>
                <p>{copy("about.step3_body")}</p>
              </div>

              <div className="how-step-card">
                <span className="how-step-num">04</span>
                <h4>{copy("about.step4_title")}</h4>
                <p>{copy("about.step4_body")}</p>
              </div>
            </div>
          </div>

          {/* Flow for needing benefits (temporarily hidden)
          <div id="flow-need" className={`how-flow${activeFlow === "need" ? " active-flow" : ""}`}>
            <div className="how-grid-3">
              <div className="how-step-card">
                <span className="how-step-num">01</span>
                <h4>Free screening</h4>
                <p>
                  We evaluate your eligibility for SSI, SSDI, VA pension, or Social Security at no
                  cost. We identify the strongest path to approval for your specific situation.
                </p>
                <Link
                  href="/benefits"
                  className="btn btn-primary"
                  style={{ marginTop: 16, width: "100%", justifyContent: "center" }}
                >
                  Get my benefits
                </Link>
              </div>

              <div className="how-step-card">
                <span className="how-step-num">02</span>
                <h4>We file your case</h4>
                <p>
                  Our attorneys handle every document, form, and submission on your behalf. From
                  applications and hearings to submissions, you have a vetted and experienced team
                  fighting for you. If denied, we appeal. We don’t walk away. We don’t charge you
                  upfront or out of pocket.
                </p>
              </div>

              <div className="how-step-card">
                <span className="how-step-num">03</span>
                <h4>You come home</h4>
                <p>
                  Your approved benefits pay your rent at New Creation Living:{" "}
                  <span style={{ color: "var(--gold)", fontWeight: 700 }}>
                    from benefits to belonging
                  </span>
                </p>
              </div>
            </div>
          </div>
          */}
        </div>
      </section>
    </div>
  );
}
