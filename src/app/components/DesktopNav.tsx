"use client";

import { useEffect, useState } from "react";
import { Star, ChevronDown, ChevronRight } from "lucide-react";
import { NavItem } from "../types/navigation";

interface DesktopNavProps{
  navItems: NavItem[]
}

const DesktopNav = ({ navItems }: DesktopNavProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  let timeout: NodeJS.Timeout | null = null;

  const handleMouseEnter = (name: string) => {
    if (timeout) clearTimeout(timeout);
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    timeout = setTimeout(() => setOpenDropdown(null), 300); // Verzögerung von 300ms
  };

  return (
    <nav className="hidden lg:flex">
      <ul className="flex space-x-6 font-semibold relative">
        {navItems.map((item, index) => (
          <li key={index} className="relative"
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}>
            <div 
              className="flex items-center space-x-2 cursor-pointer hover:text-[var(--color-gold)] transition-all duration-300">
              <a href={item.href}>{item.name}</a>
              {item.children && <ChevronDown size={16} className="transition-transform duration-300 group-hover:rotate-180 text-[var(--color-gold)]" />}
            </div>

            {item.children && (
              <ul className={`absolute left-0 mt-2 bg-[var(--background)] shadow-lg rounded-lg py-2 w-48 transition-all duration-300 ease-in-out border border-[var(--border-thin-color)] ${openDropdown === item.name ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}>
                {item.children.map((child, i) => (
                  <li key={i} className="px-4 py-2 flex justify-between items-center hover:bg-[var(--contact-bg-color)] transition-all duration-300 hover:text-[var(--color-gold)]">
                    <a href={child.href} className="flex-grow">{child.name}</a>
                    <ChevronRight size={16} className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-[var(--color-gold)]" />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopNav;