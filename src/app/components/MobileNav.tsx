"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Star, X } from "lucide-react";
import Link from "next/link";
import { NavItem } from "../types/navigation";

interface MobileNavProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  navItems?: NavItem[]; // optional, default: []
}

const MobileNav = ({
  menuOpen,
  setMenuOpen,
  navItems = [],
}: MobileNavProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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

  if (!menuOpen) return null;

  // Umschalten des Dropdowns
  const toggleDropdown = (itemName: string) => {
    setOpenDropdown((prev) => (prev === itemName ? null : itemName));
  };

  return (
    <div className="fixed inset-0 z-30 flex">
      {/* Hintergrundoverlay */}
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
        {/* Schließen-Button */}
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
            {navItems.map((item) => {
              const hasChildren = !!item.children && item.children.length > 0;
              const isOpen = openDropdown === item.name;

              return (
                <li key={item.name}>
                  {/* 
                    Zeilencontainer: Klick irgendwo in der Zeile (außer auf den Link) → Toggle
                  */}
                  <div
                    className="flex items-center justify-between text-lg font-medium p-2 cursor-pointer"
                    onClick={() => {
                      if (hasChildren) {
                        toggleDropdown(item.name);
                      }
                    }}
                  >
                    {/* Link als "inline-block", stoppt Klick im übergeordneten Container */}
                    <Link
                      href={item.href}
                      className="inline-block px-2 py-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.name}
                    </Link>

                    {/* Pfeil oder Stern */}
                    {hasChildren ? (
                      isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />
                    ) : (
                      <Star
                        size={20}
                        className="text-[var(--color-gold)]"
                        fill="currentColor"
                        stroke="none"
                      />
                    )}
                  </div>

                  {/* Untermenü -> eingerückt per ml-5 */}
                  {hasChildren && isOpen && (
                    <ul className="ml-5 mt-2 space-y-2">
                      {item.children!.map((child) => (
                        <li key={child.name}>
                          <Link
                            href={child.href}
                            className="block py-2 text-[var(--tag-text-color)] hover:text-[var(--color-gold)]"
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default MobileNav;
