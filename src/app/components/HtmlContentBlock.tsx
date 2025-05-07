// src/app/components/HtmlContentBlock.tsx
import React from "react";

export interface HtmlContentBlockProps {
    content: string;
}

export default function HtmlContentBlock({ content }: HtmlContentBlockProps) {
    return (
        <div className="prose mx-auto my-8">
            <HtmlRenderer html={content} />
        </div>
    );
}

// wenn du HtmlRenderer importieren möchtest:
import HtmlRenderer from "@/app/components/HtmlRenderer";
