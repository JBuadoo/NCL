import type { Metadata } from "next";
import ReferWizard from "@/components/onboarding/ReferWizard";
import { SiteContentProvider } from "@/components/SiteContentProvider";
import { loadSiteContent } from "@/lib/site-content-server";

export const metadata: Metadata = {
  title: "Refer Someone — New Creation Living",
  description: "Refer someone for structured independent living at New Creation Living.",
};

export const revalidate = 30;

export default async function ReferPage() {
  const content = await loadSiteContent();
  return (
    <SiteContentProvider content={content}>
      <ReferWizard />
    </SiteContentProvider>
  );
}
