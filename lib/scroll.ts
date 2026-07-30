export function scrollToSection(id: string) {
  const el = document.getElementById("page-" + id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
