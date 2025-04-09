// src/app/[type]/[category]/[slug]/page.tsx
import CategoryHeroSection from "@/app/components/CategoryHeroSection";
import HtmlRenderer from "@/app/components/HtmlRenderer";
import { Article, Category } from "@/app/types/strapi";
import { getStructuredData } from "@/lib/metadata";
import StrapiCache, { CacheKey } from "@/lib/strapiCache";
import Image from "next/image";
import { notFound } from "next/navigation";
import Script from "next/script";

export default async function ArticlePage({
    params,
}: {
    params: { type: string; category: string; slug: string };
}) {
    const resolvedParams = await Promise.resolve(params);
    const { type, category, slug } = resolvedParams;
    // Bestimme den Basis-Pfad dynamisch anhand von "type"

    // Hole die Kategorien und Artikel aus dem Cache
    const categories = await StrapiCache.fetchData<Category>("categories", CacheKey.Categories);
    const articles = await StrapiCache.fetchData<Article>("articles", CacheKey.Articles);

    // Finde den entsprechenden Artikel anhand der übergebenen Parameter
    const article = articles.find(
        (a) => a.slug === slug && a.category?.slug === category
    );
    if (!article) return notFound();

    // Generiere strukturierte Daten für SEO-Zwecke
    const structuredData = getStructuredData(article);

    return (
        <>
            <CategoryHeroSection
                title={article.title}
                breadcrumb={[
                    // Anhand von "type" wird hier entweder "Blog" oder "Service" als Basis angezeigt.
                    { name: "service", href: "/service" },
                    { name: article.category?.name || "Unkategorisiert", href: `/service/${category}` },
                    { name: article.title, href: "" },
                ]}
                
                
            />

            {/* SEO: Strukturierte Daten */}
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
                            className="zoom-effect"
                        />
                    </div>
                )}

                {article.published_date && (
                    <p className="text-sm text-gray-500 mb-2">
                        Veröffentlicht am{" "}
                        {new Date(article.published_date).toLocaleDateString("de-DE")}
                    </p>
                )}

                {article.content && <HtmlRenderer html={article.content} />}

                {article.tags && article.tags.length > 0 && (
                    <div className="tags mt-8">
                        <h3 className="text-lg font-semibold mb-2">Tags:</h3>
                        <div className="flex flex-wrap gap-2">
                            {article.tags.map((tag) => (
                                <a
                                    key={tag.slug}
                                    href={`${basePath}/tag/${tag.slug}`}
                                    className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full px-3 py-1 text-sm font-semibold"
                                >
                                    #{tag.name}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </>
    );
}
