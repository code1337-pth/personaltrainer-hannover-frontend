// src/app/components/MarkdownContentBlock.tsx
"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export interface MarkdownContentBlockProps {
    content: string;
}

export default function MarkdownContentBlock({
                                                 content,
                                             }: MarkdownContentBlockProps) {
    return (
        <article className="prose mx-auto my-8">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </article>
    );
}
