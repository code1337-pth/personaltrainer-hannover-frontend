// src/app/components/MediaBlock.tsx
import Image from "next/image";
import {Media} from "@/app/types/strapi";
import FeaturedImage from "@/app/components/FeaturedImage";
import React from "react";

interface MediaBlockProps {
    file: Media;
}

export default function MediaBlock({file}: MediaBlockProps) {
    if (!file?.url) return null;

    return (
        <figure className="my-8 flex flex-col">
            <FeaturedImage
                img={file}
                alt={file.alternativeText ?? file.name}
                fill
                containerClassName="relative w-full max-w-3xl h-auto overflow-hidden rounded-lg shadow-lg"
                className="zoom-effect p-3 object-cover"
            />
            {file.caption && (
                <figcaption className="mt-2 w-full max-w-3xl pt-2 text-center text-sm italic">
                    {file.caption}
                </figcaption>
            )}
        </figure>
    );
}
