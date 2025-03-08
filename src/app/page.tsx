"use client";

import { Open_Sans } from "next/font/google";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TeamSection from "./components/TeamSection";
import Footer from "./components/Footer";
import { JSX } from "react";

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
        <Footer />
      </main>
    </div>
  );
}
