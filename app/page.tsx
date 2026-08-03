"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import VideoModal from "@/components/VideoModal";
import HomePage from "@/components/pages/HomePage";
import AboutPage from "@/components/pages/AboutPage";
import LifePage from "@/components/pages/LifePage";
import ReferralPage from "@/components/pages/ReferralPage";
// import BenefitsPage from "@/components/pages/BenefitsPage";
import LocationsPage from "@/components/pages/LocationsPage";
import FaqPage from "@/components/pages/FaqPage";

export default function Page() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Header />

      <main id="main">
        <HomePage />
        <AboutPage />
        <LifePage />
        <ReferralPage />
        {/* Benefits assistance section temporarily hidden
        <BenefitsPage />
        */}
        <LocationsPage onWatchVideo={() => setVideoOpen(true)} />
        <FaqPage />
      </main>

      <Footer />

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />

      <BackToTop />
    </>
  );
}
