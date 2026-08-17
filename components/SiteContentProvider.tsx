"use client";

import { createContext, useContext, type ReactNode } from "react";
import {
  SITE_CONTENT_DEFAULTS,
  splitContentList,
  type SiteContentMap,
} from "@/lib/site-content";

const SiteContentContext = createContext<SiteContentMap>(SITE_CONTENT_DEFAULTS);

export function SiteContentProvider({
  content,
  children,
}: {
  content: SiteContentMap;
  children: ReactNode;
}) {
  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useCopy() {
  const content = useContext(SiteContentContext);

  return (key: string) => content[key] ?? SITE_CONTENT_DEFAULTS[key] ?? "";
}

export function useCopyList() {
  const copy = useCopy();

  return (key: string) => splitContentList(copy(key));
}
