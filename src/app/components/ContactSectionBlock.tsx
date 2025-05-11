// src/app/components/ContactSectionBlock.tsx
import React from "react";
import Link from "next/link";

export interface ContactSectionBlockProps {
    text?: string;
}

export default function ContactSectionBlock({ text }: ContactSectionBlockProps) {
    return (
        <div className="my-8 p-6 rounded-lg text-center bg-[var(--alternative-bg-color)] border-1 border-dotted border-gray-400 ">
            {text ? (
                <div
                    className="prose mx-auto"
                    dangerouslySetInnerHTML={{ __html: text }}
                />
            ) : (
                <p className="p-4">Kontaktiere uns für weitere Informationen!</p>
            )}
            <Link
                href="/#contact"
                className="contact-button p-2"
            >
                Jetzt kontaktieren
            </Link>
        </div>
    );
}
