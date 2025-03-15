"use client";

import { JSX } from "react";
import ContactSection from "./components/ContactSection";
import ExperienceSection from "./components/ExperienceSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ReviewsSection from "./components/ReviewsSection";
import ServicesIconsSection from "./components/ServicesIconsSection";
import ServicesSection from "./components/ServicesSection";
import TeamSection from "./components/TeamSection";


export default function Home(): JSX.Element {

  return (
    <div >
      <main>
        <HeroSection />
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
