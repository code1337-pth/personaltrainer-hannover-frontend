"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { NavItem } from "@/app/types/navigation";

interface DesktopNavProps {
  navItems: NavItem[];
}

const MultiLevelMenu = ({ navItems }: DesktopNavProps) => {
  const [openPath, setOpenPath] = useState<string[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLElement | null>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Mausposition verfolgen
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const clearExistingTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleMouseEnterAtLevel = (itemName: string, level: number) => {
    clearExistingTimeout();
    setOpenPath((prev) => {
      const newPath = [...prev];
      newPath[level] = itemName;
      return newPath.slice(0, level + 1);
    });
  };

  const handleMouseLeaveAtLevel = () => {
    clearExistingTimeout();
    timeoutRef.current = setTimeout(() => {
      const { x, y } = mousePosRef.current;
      const rect = menuRef.current?.getBoundingClientRect();

      if (
        rect &&
        x >= rect.left - 20 &&
        x <= rect.right + 20 &&
        y >= rect.top - 20 &&
        y <= rect.bottom + 20
      ) {
        // Maus ist noch im Menübereich → nicht schließen
        return;
      }

      setOpenPath([]);
    }, 300);
  };

  const renderNavItems = (items: NavItem[], level: number = 0) => {
    return (
      <ul
        className="
          bg-[var(--background)] 
          shadow-lg 
          rounded-lg 
          py-2 
          w-64
          border border-[var(--border-thin-color)]
          transition-all 
          duration-300 
          ease-in-out
        "
      >
        {items.map((item, index) => {
          const isActive = openPath[level] === item.name;
          return (
            <li
              key={index}
              className="relative px-2 py-1"
              onMouseEnter={() => handleMouseEnterAtLevel(item.name, level)}
              onMouseLeave={handleMouseLeaveAtLevel}
            >
              <div className="flex items-center justify-between rounded-md">
                <Link
                  href={item.href}
                  className="
                    block
                    text-base
                    whitespace-normal
                    break-words
                    transition-all
                    duration-300
                    px-2
                    py-1
                    rounded-md
                    hover:bg-[var(--link-hover-bg-color)]
                    hover:text-[var(--contact-text-color)]
                    hover:font-bold
                  "
                >
                  {item.name}
                </Link>
                {item.children && (
                  <ChevronRight size={16} className="ml-2 text-[var(--color-gold)]" />
                )}
              </div>

              {/* Submenu */}
              {item.children && isActive && (
                <div
                  className={`absolute top-0 ${
                    level === 0 ? "left-0 mt-2" : "left-full -ml-2"
                  }`}
                  onMouseEnter={() => handleMouseEnterAtLevel(item.name, level)}
                  onMouseLeave={handleMouseLeaveAtLevel}
                >
                  {renderNavItems(item.children, level + 1)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <nav ref={menuRef} className="hidden lg:flex">
      <ul className="flex space-x-6 font-semibold relative">
        {navItems.map((item, index) => {
          const isActive = openPath[0] === item.name;
          return (
            <li
              key={index}
              className="relative"
              onMouseEnter={() => handleMouseEnterAtLevel(item.name, 0)}
              onMouseLeave={handleMouseLeaveAtLevel}
            >
              <div className="flex items-center space-x-2 cursor-pointer hover:text-[var(--color-gold)] transition-all duration-300">
                <Link hrefLang="de" href={item.href}>{item.name}</Link>
                {item.children && (
                  <ChevronDown
                    size={16}
                    className="transition-transform duration-300 text-[var(--color-gold)]"
                  />
                )}
              </div>
              {item.children && isActive && (
                <div
                  onMouseEnter={() => handleMouseEnterAtLevel(item.name, 0)}
                  onMouseLeave={handleMouseLeaveAtLevel}
                  className="absolute left-0 mt-2"
                >
                  {renderNavItems(item.children, 1)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MultiLevelMenu;
