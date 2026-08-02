import type { Metadata } from "next";
import ApplyWizard from "@/components/onboarding/ApplyWizard";

export const metadata: Metadata = {
  title: "Apply for Residency — New Creation Living",
  description: "Apply for structured independent living at New Creation Living.",
};

export default function ApplyPage() {
  return <ApplyWizard />;
}
