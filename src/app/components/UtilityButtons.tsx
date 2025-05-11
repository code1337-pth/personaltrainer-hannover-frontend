"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import {Sun, Moon, ArrowUp, MessageCircle, MapPin} from "lucide-react";
import { SocialIcon } from "react-social-icons";
import Link from "next/link";

export function UtilityButtons() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Fix hydration issue
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch on SSR

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-3 items-center z-50">
      {/* Scroll to Top */}
      <button
        className="p-2 bg-[var(--button-bg-color)] text-[var(--button-text-color)] rounded-full shadow-lg hover:scale-110 transition"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp size={20} />
      </button>

      {/* WhatsApp Button */}
      <SocialIcon
        network="whatsapp"
        url="https://api.whatsapp.com/send?phone=%2B491744010440"
        target="_blank"
        className="!w-10 !h-10 rounded-full shadow-lg hover:scale-110 transition"
        fgColor="white"
        bgColor="green"
      />

      {/* Kontakt-Button */}
      <Link
        href="/#contact"
        className="p-2 bg-[var(--button-bg-color)] text-[var(--button-text-color)] rounded-full shadow-lg hover:scale-110 transition"
      >
        <MessageCircle size={20} />
      </Link>

     {/* Google Maps Button */}
     <Link
       href="https://maps.app.goo.gl/uBx5VCkFviVtSafK6"
       target="_blank"
       rel="noopener noreferrer"
       className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:scale-110 transition"
     >
       <MapPin size={20} />
     </Link>

      {/* Theme Toggle */}
      <button
        className="p-2 bg-[var(--foreground)] text-[var(--background)] rounded-full shadow-lg hover:scale-110 transition"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        {resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
}
