// app/components/SealsSection.tsx
import Image from "next/image";
import strapiCache, {CacheKey} from "@/lib/strapiCache";

export default async function SealsSection() {
    const seals = await strapiCache.fetchData("seals", CacheKey.Seals);
    const defaultWidth = 150;
    const defaultHeight = 150;
    const maxHeight = 150;

    return (
        <section id="seals" className="py-16 text-center">
            <div className="container mx-auto px-6">
                <div className="flex flex-wrap justify-center gap-8">
                    {seals.map((seal) => {
                        const img = Array.isArray(seal.image) && seal.image[0];
                        if (!img) return null;

                        // sichere Destrukturierung mit Fallbacks
                        const {width = defaultWidth, height = defaultHeight} = img;
                        // Verhältnis Breite/Höhe
                        const aspectRatio = height > 0 ? width / height : 1;
                        // jetzt mit maxHeight skalieren
                        const scaledWidth = Math.round(aspectRatio * maxHeight);

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
                                    style={{height: maxHeight}}
                                >
                                    <Image
                                        src={img.url}
                                        alt={img.alternativeText ?? seal.title}
                                        loading="lazy"
                                        width={scaledWidth}
                                        height={maxHeight}
                                        className="object-contain"
                                    />
                                </div>
                                <p className="mt-2 font-semibold text-sm">{seal.title}</p>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
