"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

export default function OnboardingShell({
  title,
  subtitle,
  step,
  totalSteps,
  children,
}: {
  title: string;
  subtitle: string;
  step: number;
  totalSteps: number;
  children: ReactNode;
}) {
  const progress = Math.round(((step + 1) / totalSteps) * 100);

  return (
    <div className="onboarding-page">
      <header className="onboarding-header">
        <Link href="/" className="brand">
          <div className="brand-logo" aria-hidden="true">
            <BrandLogo clipId="onboardClip" />
          </div>
          <div className="brand-text">
            <strong>New Creation Living</strong>
            <span>From Benefits to Belonging</span>
          </div>
        </Link>
        <Link href="/" className="onboarding-exit">
          Back to site
        </Link>
      </header>

      <main className="onboarding-main">
        <div className="onboarding-card">
          <div className="onboarding-progress">
            <div className="onboarding-progress-meta">
              <span>
                Step {step + 1} of {totalSteps}
              </span>
              <span>{progress}%</span>
            </div>
            <div className="onboarding-progress-track">
              <div className="onboarding-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <span className="eyebrow">{subtitle}</span>
          <h1 className="onboarding-title">{title}</h1>
          {children}
        </div>
      </main>
    </div>
  );
}
