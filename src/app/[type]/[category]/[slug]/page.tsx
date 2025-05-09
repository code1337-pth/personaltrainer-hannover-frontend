// src/app/[type]/[category]/[slug]/page.tsx
import {notFound} from "next/navigation";
import Script from "next/script";
import Image from "next/image";
import CategoryHeroSection from "@/app/components/CategoryHeroSection";
import HtmlContentBlock from "@/app/components/HtmlContentBlock";
import MarkdownContentBlock from "@/app/components/MarkdownContentBlock";
import ContentWithImageBlock from "@/app/components/ContentWithImageBlock";
import SliderBlock from "@/app/components/SliderBlock";
import QuoteBlock from "@/app/components/QuoteBlock";
import MediaBlock from "@/app/components/MediaBlock";
import ContactSectionBlock from "@/app/components/ContactSectionBlock";
import {getStructuredData} from "@/lib/metadata";
import StrapiCache, {CacheKey} from "@/lib/strapiCache";
import {Article, Category, MediaBlockType} from "@/app/types/strapi";


type Props = {
    params: Promise<{ type: "blog" | "service"; category: string; slug: string }>;
    searchParams?: Record<string, string>;
};

export default async function ArticlePage({params, searchParams}: Props) {
    // Erst Promise auflösen…
    const {type, category, slug} = await params;

    const basePath = type === "blog" ? "/blog" : "/service";
    const caption = type === "blog" ? "Blog" : "Leistungen";

    // 1) Kategorie validieren
    const allCategories = await StrapiCache.fetchData<Category>(
        "categories",
        CacheKey.Categories
    );
    const isBlog = type === "blog";
    const categoryObj = allCategories.find(c =>
        isBlog
            ? c.slug === category && c.blog_category
            : c.slug === category && !c.blog_category && c.active
    );
    if (!categoryObj) return notFound();

    // 2) Artikel laden & filtern
    const allArticles = await StrapiCache.fetchData<Article>(
        "articles",
        CacheKey.Articles
    );
    const filtered = allArticles.find(a =>
        a.slug === slug &&
        a.category?.slug === category &&
        a.status === "published" &&
        (isBlog
            // für Blog: nur nach Kategorie & Status filtern – ohne blog_article
            ? true
            // für Service: nach !blog_article filtern
            : !a.blog_article)
    );

    if (!filtered) return notFound();

    const article = filtered;
    const structuredData = getStructuredData(article);

    return (
        <>
            <CategoryHeroSection
                title={article.title}
                breadcrumb={[
                    {name: caption, href: basePath},
                    {
                        name: article.category?.name || "Unkategorisiert",
                        href: `${basePath}/${category}`,
                    },
                    {name: article.title, href: ""},
                ]}
            />

            <Script id="structured-data" type="application/ld+json" strategy="afterInteractive">
                {JSON.stringify(structuredData)}
            </Script>

            <article className="blog-article container mx-auto px-4 prose">
                {article.featured_image?.url && (
                    <div className="flex justify-center mb-6 overflow-hidden rounded-lg">
                        <Image
                            src={article.featured_image.url}
                            alt={article.title}
                            width={800}
                            height={500}
                            className="zoom-effect max-h-[500px] w-auto object-contain"
                        />
                    </div>
                )}

                {isBlog && article.published_date && (
                    <p className="text-sm text-gray-500 mb-2">
                        Veröffentlicht am{" "}
                        {new Date(article.published_date).toLocaleDateString("de-DE")}
                    </p>
                )}

                {/* Dynamic Zone */}
                {article.sections?.length
                    ? article.sections.map((sec, i) => {
                        switch (sec.__component) {
                            case "shared.html-content":
                                return <HtmlContentBlock key={i} content={(sec as any).content}/>;
                            case "shared.markdown-content":
                                return <MarkdownContentBlock key={i} content={(sec as any).content}/>;
                            case "shared.content-with-image":
                                return (
                                    <ContentWithImageBlock
                                        key={i}
                                        content={(sec as any).content}
                                        images={(sec as any).image}
                                        alignLeft={(sec as any).align_image_left}
                                    />
                                );
                            case "shared.slider":
                                return <SliderBlock key={i} items={(sec as any).items}/>;
                            case "shared.quote":
                                return (
                                    <QuoteBlock
                                        key={i}
                                        quoteText={(sec as any).text}
                                        author={(sec as any).author}
                                    />
                                );
                            case "shared.media":
                                return <MediaBlock key={i} block={sec as MediaBlockType} />;
                            case "shared.contact-section":
                                return <ContactSectionBlock key={i} text={(sec as any).optional_text}/>;
                            default:
                                return null;
                        }
                    })
                    : // Fallback auf altes HTML-Feld
                    article.content && <HtmlContentBlock content={article.content}/>
                }

                {/* Tags */}
                {article.tags?.length > 0 && (
                    <div className="tags mt-8">
                        <h3 className="text-lg font-semibold mb-2">Tags:</h3>
                        <div className="flex flex-wrap gap-2">
                            {article.tags?.map(tag => (
                                <a
                                    key={tag.slug}
                                    href={`${basePath}/tag/${tag.slug}`}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold"
                                >
                                    #{tag.name}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </article>
            <ContactSectionBlock/>
        </>
    );
}
