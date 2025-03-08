// components/MobileNav.tsx
import { X, Star } from "lucide-react";

interface MobileNavProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const MobileNav = ({ menuOpen, setMenuOpen }: MobileNavProps): JSX.Element => {
  return (
    <nav
      className={`fixed inset-0 bg-white z-20 transform transition-transform duration-300 ease-in-out ${
        menuOpen ? "translate-x-0" : "translate-x-full"
      } lg:hidden`}
    >
      <button
        className="absolute top-6 right-6 text-black"
        onClick={() => setMenuOpen(false)}
      >
        <X size={32} />
      </button>

      <div className="flex flex-col h-full justify-center items-center">
        <ul className="flex flex-col space-y-8 text-black text-2xl font-semibold">
          <li onClick={() => setMenuOpen(false)} className="flex items-center space-x-2">
            <a href="#about">Über uns</a>
            <Star size={26} className="text-gold" fill="currentColor" stroke="none" />
          </li>
          <li onClick={() => setMenuOpen(false)} className="flex items-center space-x-2">
            <a href="#services">Leistungen</a>
            <Star size={26} className="text-gold" fill="currentColor" stroke="none" />
          </li>
          <li onClick={() => setMenuOpen(false)} className="flex items-center space-x-2">
            <a href="#testimonials">Kundenstimmen</a>
            <Star size={26} className="text-gold" fill="currentColor" stroke="none" />
          </li>
          <li onClick={() => setMenuOpen(false)} className="flex items-center space-x-2">
            <a href="#contact">Kontakt</a>
            <Star size={26} className="text-gold" fill="currentColor" stroke="none" />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MobileNav;
