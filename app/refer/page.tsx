import type { Metadata } from "next";
import ReferWizard from "@/components/onboarding/ReferWizard";

export const metadata: Metadata = {
  title: "Refer Someone — New Creation Living",
  description: "Refer someone for structured independent living at New Creation Living.",
};

export default function ReferPage() {
  return <ReferWizard />;
}
