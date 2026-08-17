import { createClient } from "@supabase/supabase-js";
import {
  mergeSiteContent,
  type SiteContentMap,
} from "@/lib/site-content";

export async function loadSiteContent(): Promise<SiteContentMap> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return mergeSiteContent(null);
  }

  try {
    const supabase = createClient(url, anonKey);
    const { data, error } = await supabase
      .from("site_content")
      .select("key, value");

    if (error || !data) {
      if (error) {
        console.error("Failed to load site_content:", error.message);
      }
      return mergeSiteContent(null);
    }

    const overrides: Partial<SiteContentMap> = {};
    for (const row of data) {
      if (row.key && typeof row.value === "string") {
        overrides[row.key] = row.value;
      }
    }

    return mergeSiteContent(overrides);
  } catch (error) {
    console.error("Failed to load site_content:", error);
    return mergeSiteContent(null);
  }
}
