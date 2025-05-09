// app/components/SealsSection.tsx
import Image from "next/image";
import strapiCache, { CacheKey } from "@/lib/strapiCache";
import { Seal } from "@/app/types/strapi";

export default async function SealsSection() {
    const seals = await strapiCache.fetchData<Seal>("seals", CacheKey.Seals);
    const maxHeight = 150;

    return (
        <section id="seals" className="py-16 text-center">
            <div className="container mx-auto px-6">
                <div className="flex flex-wrap justify-center gap-8">
                    {seals.map((seal) => {
                        const img = Array.isArray(seal.image) && seal.image[0];
                        if (!img) return null;

                        // Breite proportional zur festen Höhe berechnen
                        const scaledWidth = Math.round((img.width / img.height) * maxHeight);

                        return (
                            <a
                                key={seal.title}
                                href={seal.link}
                                target="_blank"
                                rel="noreferrer"
                                className="
                  group
                  flex flex-col items-center justify-between
                  h-60                /* alle Elemente gleich hoch (15rem = 240px) */
                  p-4
                  overflow-hidden
                  rounded-lg
                  shadow
                  transition-opacity hover:opacity-80
                "
                            >
                                <div
                                    className="flex items-center justify-center"
                                    style={{ height: maxHeight }}
                                >
                                    <Image
                                        src={img.url}
                                        alt={img.alternativeText ?? seal.title}
                                        width={scaledWidth}
                                        height={maxHeight}
                                        className="object-contain"
                                    />
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
