// src/app/components/MediaBlock.tsx
import Image from "next/image";
import {Media} from "@/app/types/strapi";

interface MediaBlockProps {
    file: Media;
}

export default function MediaBlock({file}: MediaBlockProps) {
    if (!file?.url) return null;

    return (
        <figure className="my-8 flex flex-col">
            <div className="relative w-full max-w-3xl h-auto overflow-hidden rounded-lg shadow-lg">
                <Image
                    src={file.url}
                    alt={file.alternativeText ?? file.name}
                    width={file.width ?? 800}
                    height={file.height ?? 600}
                    className="object-cover"
                />
            </div>
            {file.caption && (
                <figcaption className="mt-2 w-full max-w-3xl pt-2 text-center text-sm italic">
                    {file.caption}
                </figcaption>
            )}
        </figure>
    );
}
