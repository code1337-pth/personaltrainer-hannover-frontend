// src/app/blog/[category]/[slug]/page.tsx

import {Article, Category} from "@/app/types/strapi";
import {notFound} from "next/navigation";
import Image from "next/image";
import CategoryHeroSection from "@/app/components/CategoryHeroSection";
import HtmlRenderer from "@/app/components/HtmlRenderer";
import StrapiCache, {CacheKey} from "@/lib/strapiCache";
import {getStructuredData} from "@/lib/metadata";
import Script from "next/script";

export default async function ArticlePage({params}: { params: { category: string; slug: string } }) {
    const {category, slug} = params;
    const resolvedParams = await Promise.resolve(params);
    // Hole alle Kategorien
    const categories = await StrapiCache.fetchData<Category>("categories", CacheKey.Categories);
    const articles = await StrapiCache.fetchData<Article>("articles", CacheKey.Articles);
    const article = articles.find(
        (a) => a.slug === slug && a.category?.slug === category
    );
    if (!article) return notFound();

    const structuredData = getStructuredData(article);

    return (
        <>
            <CategoryHeroSection
                title={article.title}
                breadcrumb={[
                    {name: "Blog", href: "/blog"},
                    {name: article.category?.name || "Unkategorisiert", href: `/blog/${category}`},
                    {name: article.title},
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

                {article.content && (
                    <HtmlRenderer html={article.content}/>
                )}

                {article.tags && article.tags.length > 0 && (
                    <div className="tags mt-8">
                        <h3 className="text-lg font-semibold mb-2">Tags:</h3>
                        <div className="flex flex-wrap gap-2">
                            {article.tags.map((tag) => (
                                <a
                                    key={tag.slug}
                                    href={`/blog/tag/${tag.slug}`}
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
