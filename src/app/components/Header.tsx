// components/Header.tsx
"use client";

import { JSX, useState } from "react";
import { Menu, X, Star } from "lucide-react";
import Image from "next/image";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { Montserrat, Open_Sans } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-open-sans",
});

export default function Header(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <header className="bg-white text-black py-4 shadow-md fixed top-0 left-0 w-full z-30">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between">
        {/* Logo und Titel */}
        <div className="flex items-center space-x-4">
          <Image
            src="/personaltrainer-hannover-figure-XXL.png"
            alt="Logo"
            width={85}
            height={85}
            className="object-contain"
          />
          <div className="flex flex-col items-center">
            <h1
              className={`${montserrat.className} text-lg sm:text-xl md:text-1xl font-semibold text-black uppercase text-center`}
            >
              Premium Personal Training + Team
            </h1>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <Star size={20} className="text-gold" fill="currentColor" stroke="none" />
              <Star size={20} className="text-gold" fill="currentColor" stroke="none" />
              <Star size={20} className="text-gold" fill="currentColor" stroke="none" />
              <Star size={20} className="text-gold" fill="currentColor" stroke="none" />
              <Star size={20} className="text-gold" fill="currentColor" stroke="none" />
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <DesktopNav />

        {/* Hamburger Button */}
        <button className="lg:hidden text-black" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <MobileNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </header>
  );
}
