export function scrollToId(elementId: string) {
  const el = document.getElementById(elementId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function scrollToSection(id: string) {
  scrollToId("page-" + id);
}

/** Scroll to the self-apply / referral option cards in the Residency section */
export function scrollToApplyOptions() {
  scrollToId("apply-options");
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
