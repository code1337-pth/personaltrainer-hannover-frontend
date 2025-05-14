import {useEffect, useRef, useState} from "react";
import {ChevronDown, ChevronUp, Star, X} from "lucide-react";
import Link from "next/link";
import {NavItem} from "../types/navigation";

interface MobileNavProps {
    menuOpen: boolean;
    setMenuOpen: (open: boolean) => void;
    navItems?: NavItem[];
}

const MobileNavItem: React.FC<{ item: NavItem; depth?: number; onNavigate?: () => void }> = ({
                                                                                                 item,
                                                                                                 depth = 0,
                                                                                                 onNavigate
                                                                                             }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = item.children && item.children.length > 0;
    const indentMap = ["", "ml-4", "ml-8", "ml-12", "ml-16"];
    const indentClass = indentMap[depth] || "ml-16";

    return (
        <li>
            <div
                className={`flex items-center justify-between text-lg font-medium p-2 cursor-pointer ${indentClass}`}
                onClick={() => hasChildren && setIsOpen((prev) => !prev)}
            >
                <Link
                    href={item.href}
                    className="inline-block px-2 py-1 transition-all duration-300 hover:bg-[var(--link-hover-bg-color)] hover:text-[var(--contact-text-color)] hover:font-bold hover:rounded-md"
                    onClick={e => {
                        e.stopPropagation();
                        if (onNavigate) onNavigate();
                    }}
                >
                    {item.name}
                </Link>
                {hasChildren ? (
                    isOpen ? <ChevronUp size={20}/> : <ChevronDown size={20}/>
                ) : (
                    <Star size={20} className="text-[var(--color-gold)]" fill="currentColor" stroke="none"/>
                )}
            </div>
            {hasChildren && isOpen && (
                <ul className="mt-2 space-y-2">
                    {item.children!.map(child => (
                        <MobileNavItem key={child.href} item={child} depth={depth + 1} onNavigate={onNavigate}/>
                    ))}
                </ul>
            )}
        </li>
    );
};

const MobileNav = ({menuOpen, setMenuOpen, navItems = []}: MobileNavProps) => {
    const menuRef = useRef<HTMLDivElement>(null);

    // Fokus-Trap
    useEffect(() => {
        if (!menuOpen) return;
        const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable?.[0];
        const last = focusable?.[focusable.length - 1];

        function handleTab(e: KeyboardEvent) {
            if (!focusable || focusable.length === 0) return;
            if (e.key === "Tab") {
                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last?.focus();
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault();
                        first?.focus();
                    }
                }
            }
            if (e.key === "Escape") setMenuOpen(false);
        }

        document.addEventListener("keydown", handleTab);
        first?.focus();
        return () => document.removeEventListener("keydown", handleTab);
    }, [menuOpen, setMenuOpen]);

    // Klick außerhalb schließt Menü
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuOpen, setMenuOpen]);

    if (!menuOpen) return null;

    return (
        <div className="fixed inset-0 z-30 flex">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={() => setMenuOpen(false)}
                aria-hidden="true"
            />
            <aside
                ref={menuRef}
                className="relative z-40 w-3/4 max-w-xs bg-[var(--nav-background)] h-full shadow-xl transition-transform duration-300 ease-in-out translate-x-0"
                role="dialog"
                aria-label="Mobile Navigation"
                tabIndex={-1}
            >
                {/* Schließen-Button */}
                <div className="flex justify-end p-4">
                    <button
                        onClick={() => setMenuOpen(false)}
                        aria-label="Navigation schließen"
                        className="text-[var(--foreground)] focus:outline-none"
                    >
                        <X size={28}/>
                    </button>
                </div>
                <nav>
                    <ul className="flex flex-col space-y-4 px-4">
                        {navItems.map(item => (
                            <MobileNavItem
                                key={item.href}
                                item={item}
                                onNavigate={() => setMenuOpen(false)}
                            />
                        ))}
                    </ul>
                </nav>
            </aside>
        </div>
    );
};

export default MobileNav;