"use client";

import { useState } from "react";

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [query, setQuery] = useState("");

  return (
    <div className="relative w-full max-w-md mx-auto my-4">
      <input
        type="text"
        placeholder="Artikel suchen..."
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchInput;
