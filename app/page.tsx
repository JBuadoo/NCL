import SiteApp from "@/components/SiteApp";
import { loadSiteContent } from "@/lib/site-content-server";

export const revalidate = 30;

export default async function Page() {
  const content = await loadSiteContent();
  return <SiteApp content={content} />;
}
