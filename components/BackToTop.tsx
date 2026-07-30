"use client";

import { useEffect, useState } from "react";
import { scrollToTop } from "@/lib/scroll";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      id="backToTop"
      className={`back-to-top${show ? " show" : ""}`}
      aria-label="Back to top"
      onClick={scrollToTop}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  );
}
