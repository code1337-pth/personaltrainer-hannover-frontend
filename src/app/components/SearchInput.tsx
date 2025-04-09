// src/app/components/SearchInput.tsx – Client-Komponente
'use client';

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

interface SearchInputProps {
    defaultQuery?: string;
}

const SearchInput = ({ defaultQuery = "" }: SearchInputProps) => {
    const [query, setQuery] = useState(defaultQuery);
    const pathname = usePathname();
    const router = useRouter();

    // Synchronisiere den internen State, wenn sich defaultQuery ändert
    useEffect(() => {
        setQuery(defaultQuery);
    }, [defaultQuery]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (query) {
            params.set("query", query);
        }
        // Setze immer die Seite auf 1, wenn gesucht wird
        params.set("page", "1");

        // Navigiere ohne vollständiges Neuladen der Seite, sodass ein neuer Server-Render erfolgt
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto my-4">
            <input
                type="text"
                placeholder="Artikel suchen..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-0 top-0 mt-2 mr-2">
                Suchen
            </button>
        </form>
    );
};

export default SearchInput;
