"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import BrandLogo from "./BrandLogo";
import { scrollToSection } from "@/lib/scroll";

const NAV_ITEMS: { page: string; label: string }[] = [
  { page: "home", label: "Home" },
  { page: "about", label: "About Us" },
  { page: "life", label: "Life at NCL" },
  { page: "referral", label: "Residency" },
  { page: "benefits", label: "Get Benefits" },
  { page: "locations", label: "Locations" },
  { page: "faq", label: "FAQ" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [indicator, setIndicator] = useState<{
    display: "block" | "none";
    left: number;
    width: number;
  }>({ display: "none", left: 0, width: 0 });

  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const activePageRef = useRef(activePage);
  activePageRef.current = activePage;

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  const updateNavIndicator = useCallback(() => {
    if (window.innerWidth <= 900) {
      setIndicator((prev) => ({ ...prev, display: "none" }));
      return;
    }
    const activeBtn = btnRefs.current[activePageRef.current];
    if (activeBtn) {
      setIndicator({
        display: "block",
        left: activeBtn.offsetLeft + 16,
        width: activeBtn.offsetWidth - 32,
      });
    }
  }, []);

  useEffect(() => {
    // Scroll spy: keep the active nav item in sync with the section in view
    const onScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>(".page");
      let current = "";
      const scrollPosition = window.scrollY + 120;

      sections.forEach((sec) => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          current = sec.id.replace("page-", "");
        }
      });

      if (window.scrollY < 80) {
        current = "home";
      }

      setActivePage(current);
      activePageRef.current = current;
      updateNavIndicator();
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", updateNavIndicator);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateNavIndicator);
    };
  }, [updateNavIndicator]);

  const handleNavClick = (page: string) => {
    setMenuOpen(false);
    scrollToSection(page);
  };

  return (
    <header>
      <nav aria-label="Main navigation">
        <a
          href="#"
          className="brand"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("home");
          }}
        >
          <div className="brand-logo" aria-hidden="true">
            <BrandLogo clipId="cardClip" />
          </div>
          <div className="brand-text">
            <strong>New Creation Living</strong>
            <span>From Benefits to Belonging</span>
          </div>
        </a>
        <button
          className={`nav-toggle${menuOpen ? " is-open" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path className="icon-line top" d="M3 6h18" />
            <path className="icon-line middle" d="M3 12h18" />
            <path className="icon-line bottom" d="M3 18h18" />
          </svg>
        </button>
        <div className={`nav-links${menuOpen ? " open" : ""}`} id="navLinks">
          <div className="mobile-menu-top">
            <div>
              <p className="mobile-menu-label">Navigate</p>
              <p className="mobile-menu-title">New Creation Living</p>
            </div>
          </div>
          <a className="mobile-phone-card" href="tel:+14047312371">
            <span className="mobile-phone-label">Call us today</span>
            <span className="mobile-phone-number">(404) 731-2371</span>
          </a>
          {NAV_ITEMS.map(({ page, label }) => (
            <button
              key={page}
              data-page={page}
              className={activePage === page ? "active" : undefined}
              ref={(el) => {
                btnRefs.current[page] = el;
              }}
              onClick={() => handleNavClick(page)}
            >
              {label}
            </button>
          ))}
          <button className="nav-cta" onClick={() => handleNavClick("referral")}>
            (404) 731-2371
          </button>
          <div
            className="nav-indicator"
            id="navIndicator"
            style={{
              display: indicator.display,
              left: indicator.left,
              width: indicator.width,
            }}
          ></div>
        </div>
      </nav>
    </header>
  );
}
