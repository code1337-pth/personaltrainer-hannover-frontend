"use client";

import { Open_Sans } from "next/font/google";
import { JSX } from "react";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ReviewsSection from "./components/ReviewsSection";
import ServicesIconsSection from "./components/ServicesIconsSection";
import TeamSection from "./components/TeamSection";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-open-sans",
});

export default function Home(): JSX.Element {
  return (
    <div className={openSans.className}>
      <main className="bg-white text-gray-900">
        <Header />
        <HeroSection />
        <TeamSection />
        {/* Gemeinsamer Container für TeamSection und ReviewsSection */}
        {/* <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TeamSection />
            <ReviewsSection />
          </div>
        </div> */}
        <ServicesIconsSection />
        <ContactSection />
        <ReviewsSection />
        <Footer />
      </main>
    </div>
  );
}
