"use client";

import { X, ChevronDown, ChevronUp, Star } from "lucide-react";
import { useEffect, useState, useRef, JSX } from "react";
import { NavItem } from "../types/navigation";

interface MobileNavProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const MobileNav = ({ menuOpen, setMenuOpen }: MobileNavProps): JSX.Element => {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/nav/navigation.json")
      .then((res) => res.json())
      .then((data) => setNavItems(data))
      .catch((err) => console.error("Fehler beim Laden der Navigation:", err));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, setMenuOpen]);

  if (!menuOpen) return <></>;

  return (
    <div className="fixed inset-0 z-30 flex">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <aside
        ref={menuRef}
        className="relative z-40 w-3/4 max-w-xs bg-[var(--nav-background)] h-full shadow-xl transition-transform duration-300 ease-in-out"
        role="dialog"
        aria-label="Mobile Navigation"
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Navigation schließen"
            className="text-[var(--foreground)] focus:outline-none"
          >
            <X size={28} />
          </button>
        </div>
        <nav>
          <ul className="flex flex-col space-y-4 px-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <div className="flex items-center justify-between text-lg font-medium">
                  {/* Link bleibt klickbar */}
                  <a
                    href={item.href}
                    className="flex-1 block"
                  >
                    {item.name}
                  </a>

                  {/* Falls es ein Untermenü gibt, dann Icon als separater Button */}
                  {item.children ? (
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                      className="p-2"
                      aria-label="Untermenü öffnen/schließen"
                    >
                      {openDropdown === item.name ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  ) : (
                    <Star size={20} className="text-[var(--color-gold)]" fill="currentColor" stroke="none" />
                  )}
                </div>

                {/* Dropdown-Menü */}
                {item.children && openDropdown === item.name && (
                  <ul className="ml-4 mt-2 space-y-2">
                    {item.children.map((child) => (
                      <li key={child.name}>
                        <a
                          href={child.href}
                          className="block py-2 text-[var(--tag-text-color)] hover:text-[var(--color-gold)]"
                        >
                          {child.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default MobileNav;
