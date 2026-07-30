"use client";

import BrandLogo from "./BrandLogo";
import { scrollToSection } from "@/lib/scroll";

const FOOTER_LINKS: { page: string; label: string }[] = [
  { page: "about", label: "About Us" },
  { page: "life", label: "Life at NCL" },
  { page: "benefits", label: "Get Benefits" },
  { page: "faq", label: "FAQ" },
  { page: "referral", label: "Residency" },
  { page: "locations", label: "Locations" },
];

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="brand">
            <div className="brand-logo">
              <BrandLogo clipId="cardClipFooter" />
            </div>
            <div className="brand-text">
              <strong style={{ color: "white" }}>New Creation Living</strong>
              <span>From Benefits to Belonging</span>
            </div>
          </div>
          <p>
            Structured independent living for adults on fixed government income across Metro
            Atlanta & middle Georgia.
          </p>
        </div>
        <div>
          <h5>Navigate</h5>
          <ul>
            {FOOTER_LINKS.map(({ page, label }) => (
              <li key={page}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(page);
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5>Contact</h5>
          <ul>
            <li>(404) 731-2371</li>
            <li>SUPPORT@NEWCREATIONLIVING.ORG</li>
            <li>Atlanta &amp; Middle Georgia</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 New Creation Living. All rights reserved.</span>
        <span>Structured Independent Living. Not a licensed personal care home.</span>
      </div>
    </footer>
  );
}
