// src/app/components/SearchInput.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SearchInputProps {
    defaultQuery?: string;
    basePath: string;
}

const SearchInput = ({ defaultQuery, basePath }: SearchInputProps) => {
    // Initialisiere immer mit einem String
    const [query, setQuery] = useState<string>(defaultQuery ?? "");
    const router = useRouter();

    useEffect(() => {
        // Erneut immer einen String setzen
        setQuery(defaultQuery ?? "");
    }, [defaultQuery]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (query) params.set("query", query);
        params.set("page", "1");
        router.push(`${basePath}?${params.toString()}`);
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
            <button
                type="submit"
                className="absolute right-2 top-2 text-sm text-[var(--color-gold)]"
            >
                Suchen
            </button>
        </form>
    );
};

export default SearchInput;
