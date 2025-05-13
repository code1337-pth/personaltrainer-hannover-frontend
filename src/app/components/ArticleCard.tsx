import Link from "next/link";
import {Media} from "@/app/types/strapi";
import FeaturedImage from "@/app/components/FeaturedImage";

interface ArticleItemProps {
    item: {
        name: string;
        description: string;
        img: Media;
        link: string;
        published_date?: string;
    };
}

const ArticleCard = ({item}: ArticleItemProps) => {
    return (
        <div className="p-2 border-1 border-solid border-(--border-thin-color) shadow-xl rounded-lg  flex flex-col ">
            <Link href={item.link}>
                <>
                    {item.img?.url && (
                        <FeaturedImage
                            img={item.img}
                            alt={item.img.alternativeText ?? item.name}
                            className="zoom-effect object-contain aspect-video"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    )}
                </>
            </Link>
            {item.published_date && (
                <p className="text-sm text-center">
                    Veröffentlicht am {new Date(item.published_date).toLocaleDateString("de-DE")}
                </p>
            )}
            <div className="p-3">
                <h3 className="text-lg font-semibold mb-4 ">{item.name}</h3>
                <p>{item.description}</p>
            </div>
            <Link
                href={item.link}
                className="text-[var(--foreground)] font-semibold text-lg mt-auto p-2">
                Mehr lesen →
            </Link>
        </div>
    );
};


export default ArticleCard;
