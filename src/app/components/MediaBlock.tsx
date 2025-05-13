import { Media } from "@/app/types/strapi";
import FeaturedImage from "@/app/components/FeaturedImage";
import React from "react";

interface MediaBlockProps {
    file: Media;
    sizes?: string; // z.B. "(max-width: 768px) 100vw, 50vw"
}

export default function MediaBlock({ file, sizes }: MediaBlockProps) {
    if (!file?.url) return null;

    const effectiveSizes = sizes ?? "(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw";

    return (
        <figure>
            <FeaturedImage
                img={file}
                alt={file.alternativeText ?? file.name}
                sizes={sizes}
            />
            {file.caption && (
                <figcaption className="mt-2 w-full max-w-3xl pt-2 text-center text-sm italic">
                    {file.caption}
                </figcaption>
            )}
        </figure>
    );
}