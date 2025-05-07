// src/app/components/CategoryListing.tsx
import Link from "next/link";
import React from "react";
import CategoryHeroSection from "./CategoryHeroSection";
import ArticleCard from "./ArticleCard";
import { Article } from "@/app/types/strapi";
import SearchInput from "@/app/components/SearchInput";

export enum CategoryType {
    Blog    = "/blog",
    Service = "/service",
}

interface CategoryListingProps {
    name: string;               // z.B. "Fitness"
    slug: string;               // z.B. "fitness"
    details?: string;           // Beschreibungstext
    caption: "Blog" | "Leistungen";
    categoryType: CategoryType; // "/blog" oder "/service"
    articles: Article[];        // Alle Artikel, die geladen wurden
    query: string;              // Suchbegriff aus URL (?query=...)
    page: number;               // Seitenzahl aus URL (?page=...)
}

const PAGE_SIZE = 9;

export default function CategoryListing({
                                            name,
                                            slug,
                                            details,
                                            caption,
                                            categoryType,
                                            articles,
                                            query,
                                            page,
                                        }: CategoryListingProps) {
    const basePath = `${categoryType}/${slug}`; // z.B. "/blog/fitness"

    // ————— 1) Filter nach Suchbegriff —————
    const filtered = query.trim() !== ""
        ? articles.filter((a) => {
            const text = (a.title + " " + (a.content || "")).toLowerCase();
            return text.includes(query.toLowerCase());
        })
        : articles;

    // ————— 2) Pagination berechnen —————
    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const startIndex = (page - 1) * PAGE_SIZE;
    const paginated = filtered.slice(startIndex, startIndex + PAGE_SIZE);

    return (
        <section className="container-lg">
            {/* Hero + Breadcrumb */}
            <CategoryHeroSection
                title={`${caption} – ${name}`}
                description={details}
                breadcrumb={[
                    { name: caption, href: categoryType },
                    { name,        href: basePath },
                ]}
            />

            <SearchInput defaultQuery={query} basePath={`${categoryType}/${slug}`} />

            {/* 4) Pagination oben */}
            <div className="flex justify-center items-center space-x-4 mb-6">
                {page > 1 ? (
                    <Link
                        href={`${basePath}?query=${encodeURIComponent(query)}&page=${page - 1}`}
                        className="px-4 py-2 bg-gray-200 rounded"
                    >
                        Vorherige
                    </Link>
                ) : (
                    <span className="px-4 py-2 bg-gray-200 rounded opacity-50">
            Vorherige
          </span>
                )}
                <span>
          Seite {page} von {totalPages}
        </span>
                {page < totalPages ? (
                    <Link
                        href={`${basePath}?query=${encodeURIComponent(query)}&page=${page + 1}`}
                        className="px-4 py-2 bg-gray-200 rounded"
                    >
                        Nächste
                    </Link>
                ) : (
                    <span className="px-4 py-2 bg-gray-200 rounded opacity-50">
            Nächste
          </span>
                )}
            </div>

            {/* 5) Artikel-Grid */}
            {paginated.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginated.map((article) => (
                        <ArticleCard
                            key={article.slug}
                            item={{
                                name: article.title,
                                description:
                                    article.seo?.metaDescription ??
                                    (article.content ? article.content.slice(0, 100) + "…" : ""),
                                image_url: article.featured_image?.url ?? "/default.jpg",
                                link: `${basePath}/${article.slug}`,
                                published_date: article.published_date,
                            }}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center py-12">Keine Artikel gefunden.</p>
            )}

            {/* 6) Pagination unten */}
            <div className="flex justify-center items-center space-x-4 mt-6">
                {page > 1 ? (
                    <Link
                        href={`${basePath}?query=${encodeURIComponent(query)}&page=${page - 1}`}
                        className="px-4 py-2 bg-gray-200 rounded"
                    >
                        Vorherige
                    </Link>
                ) : (
                    <span className="px-4 py-2 bg-gray-200 rounded opacity-50">
            Vorherige
          </span>
                )}
                <span>
          Seite {page} von {totalPages}
        </span>
                {page < totalPages ? (
                    <Link
                        href={`${basePath}?query=${encodeURIComponent(query)}&page=${page + 1}`}
                        className="px-4 py-2 bg-gray-200 rounded"
                    >
                        Nächste
                    </Link>
                ) : (
                    <span className="px-4 py-2 bg-gray-200 rounded opacity-50">
            Nächste
          </span>
                )}
            </div>
        </section>
    );
}
