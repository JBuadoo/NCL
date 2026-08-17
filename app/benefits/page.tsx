import type { Metadata } from "next";
import BenefitsWizard from "@/components/onboarding/BenefitsWizard";
import { SiteContentProvider } from "@/components/SiteContentProvider";
import { loadSiteContent } from "@/lib/site-content-server";

export const metadata: Metadata = {
  title: "Benefits Screening — New Creation Living",
  description:
    "Free eligibility screening for SSI, SSDI, or VA Pension with New Creation Living.",
};

export const revalidate = 30;

export default async function BenefitsOnboardingPage() {
  const content = await loadSiteContent();
  return (
    <SiteContentProvider content={content}>
      <BenefitsWizard />
    </SiteContentProvider>
  );
}
