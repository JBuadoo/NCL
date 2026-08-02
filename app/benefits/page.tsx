import type { Metadata } from "next";
import BenefitsWizard from "@/components/onboarding/BenefitsWizard";

export const metadata: Metadata = {
  title: "Benefits Screening — New Creation Living",
  description:
    "Free eligibility screening for SSI, SSDI, or VA Pension with New Creation Living.",
};

export default function BenefitsOnboardingPage() {
  return <BenefitsWizard />;
}
