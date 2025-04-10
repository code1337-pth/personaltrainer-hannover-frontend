// components/Header.tsx
"use client";
import Image from "next/image";
import MultiLevelMenu from "./MultiLevelMenu";
import MobileNav from "./MobileNav";
import {NavItem} from "../types/navigation";
import {Menu, X} from "lucide-react";
import {useState} from "react";

export default function Header({navItems}: { navItems: NavItem[] }) {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    return (
        <header className="py-2 fixed top-0 left-0 w-full z-30">
            <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Image src="/personaltrainer-hannover-figure.svg" alt="Logo" width={65} height={65}/>
                    <div className="flex flex-col items-center">
                        <div className="h1-header text-3xl font-bold">Premium Personal Training + Team</div>
                        <div className="flex items-center justify-center space-x-2">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="text-gold" width="20" height="20" viewBox="0 0 24 24"
                                     fill="currentColor">
                                    <path
                                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                                </svg>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <MultiLevelMenu navItems={navItems}/>

                {/* Hamburger Button */}
                <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={32}/> : <Menu size={32}/>}
                </button>
            </div>

            {/* Mobile Navigation Overlay */}
            <MobileNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} navItems={navItems}/>
        </header>
    );
}
