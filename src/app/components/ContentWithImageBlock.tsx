// src/app/components/ContentWithImageBlock.tsx
"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MediaBlock from "./MediaBlock";
import { Media } from "@/app/types/strapi";

export interface ContentWithImageBlockProps {
    content: string;
    images: Media[];
    /** Wenn true → Bild links, Text rechts. Default false → Text links, Bild rechts */
    alignLeft?: boolean;
}

export default function ContentWithImageBlock({
                                                  content,
                                                  images,
                                                  alignLeft = false,
                                              }: ContentWithImageBlockProps) {
    // Mobile: 1 Spalte; ab sm: 2 Spalten mit Bruchteilen
    const baseGrid = "grid grid-cols-1 sm:grid-cols-2 gap-12 my-12";
    const template = alignLeft
        ? "sm:[grid-template-columns:1fr_2fr]"
        : "sm:[grid-template-columns:2fr_1fr]";

    // Die Bild-Spalte als wiederverwendbares JSX
    const imageColumn = (
        <div className="space-y-8">
            {images.map((img) => (
                <MediaBlock key={img.id} file={img} />
            ))}
        </div>
    );

    return (
        <section className={`${baseGrid} ${template}`}>
            {alignLeft && imageColumn}
            <article className="prose max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </article>
            {!alignLeft && imageColumn}
        </section>
    );
}
