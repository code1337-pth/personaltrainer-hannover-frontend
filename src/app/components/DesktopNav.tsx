// components/DesktopNav.tsx
import { Star } from "lucide-react";
import { JSX } from "react";

const DesktopNav = (): JSX.Element => {
  return (
    <nav className="hidden lg:flex">
      <ul className="flex space-x-6 text-black text-lg font-semibold">
        <li className="flex items-center space-x-2 hover:text-gray-600">
          <a href="#about">Über uns</a>
          <Star size={26} className="text-gold" fill="currentColor" stroke="none" />
        </li>
        <li className="flex items-center space-x-2 hover:text-gray-600">
          <a href="#services">Leistungen</a>
          <Star size={26} className="text-gold" fill="currentColor" stroke="none" />
        </li>
        <li className="flex items-center space-x-2 hover:text-gray-600">
          <a href="#testimonials">Kundenstimmen</a>
          <Star size={26} className="text-gold" fill="currentColor" stroke="none" />
        </li>
        <li className="flex items-center space-x-2 hover:text-gray-600">
          <a href="#contact">Kontakt</a>
          <Star size={26} className="text-gold" fill="currentColor" stroke="none" />
        </li>
      </ul>
    </nav>
  );
};

export default DesktopNav;
