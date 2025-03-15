"use client";

import { JSX } from "react";
import ContactSection from "./components/ContactSection";
import ExperienceSection from "./components/ExperienceSection";
import HeroSection from "./components/HeroSection";
import ReviewsSection from "./components/ReviewsSection";
import ServicesIconsSection from "./components/ServicesIconsSection";
import ServicesSection from "./components/ServicesSection";
import TeamSection from "./components/TeamSection";


export default function Home(): JSX.Element {

  return (
    <div >
      <main>
        <HeroSection id="home" />
        <TeamSection />
        <ServicesIconsSection />
        <ContactSection id="contact" />
        <ExperienceSection />
        <ReviewsSection />
        <ServicesSection />
      </main>
    </div>
  );
}
