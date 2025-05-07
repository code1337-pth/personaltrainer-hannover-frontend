// src/app/components/QuoteBlock.tsx
import React from "react";

export interface QuoteBlockProps {
    quoteText: string;
    author?: string;
}

export default function QuoteBlock({ quoteText, author }: QuoteBlockProps) {
    return (
        <blockquote className="my-8 border-l-4 border-gray-300 pl-4 italic">
            <p>"{quoteText}"</p>
            {author && (
                <footer className="mt-2 text-right font-semibold">— {author}</footer>
            )}
        </blockquote>
    );
}
