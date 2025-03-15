// components/Header.tsx
"use client";

import { JSX, useState } from "react";
import { Menu, X, Star } from "lucide-react";
import Image from "next/image";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function Header(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  return (
    <header className="py-2 fixed top-0 left-0 w-full z-30">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Image
            src="/personaltrainer-hannover-figure.svg"
            alt="Logo"
            width={65}
            height={65}
          />
          <div className="flex flex-col items-center">
            <h1 className={`h1-header`}            >
              Premium Personal Training + Team
            </h1>
            <div className="flex items-center justify-center space-x-2">
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
        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <MobileNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </header>
  );
}
