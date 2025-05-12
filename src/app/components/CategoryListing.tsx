// src/app/components/CategoryListing.tsx
import Link from "next/link";
import React from "react";
import CategoryHeroSection from "./CategoryHeroSection";
import ArticleCard from "./ArticleCard";
import {Article} from "@/app/types/strapi";
import SearchInput from "@/app/components/SearchInput";

export enum CategoryType {
    Blog = "/blog",
    Service = "/service",
}

interface CategoryListingProps {
    name: string;
    slug: string;
    details?: string;
    caption: "Blog" | "Leistungen";
    categoryType: CategoryType;
    articles: Article[];
    query: string;
    page: number;
}

const PAGE_SIZE = 9;

export default function CategoryListing({
                                            name, slug, details, caption,
                                            categoryType, articles, query, page,
                                        }: CategoryListingProps) {
    const basePath = `${categoryType}/${slug}`;
    // Filter & Pagination
    const filtered = query.trim()
        ? articles.filter(a =>
            (a.title + " " + (a.content ?? ""))
                .toLowerCase()
                .includes(query.toLowerCase())
        )
        : articles;
    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const startIndex = (page - 1) * PAGE_SIZE;
    const paginated = filtered.slice(startIndex, startIndex + PAGE_SIZE);

    // Hilfs-Komponente für Prev/Next Buttons:
    const Pager = () => (
        <div className="flex justify-center items-center space-x-4">
            {page > 1 ? (
                <Link
                    href={`${basePath}?query=${encodeURIComponent(query)}&page=${page - 1}`}
                    className="
            px-4 py-2
            bg-[var(--alternative-bg-color)]
            text-[var(--foreground)]
            border border-[var(--border-thin-color)]
            rounded-md
            hover:bg-[var(--hover-bg)]
            transition
          "
                >
                    Vorherige
                </Link>
            ) : (
                <span
                    className="
            px-4 py-2
            text-[var(--foreground)]
            opacity-50
            rounded-md
          "
                >
          Vorherige
        </span>
            )}

            <span className="text-[var(--foreground)]">
        Seite {page} von {totalPages}
      </span>

            {page < totalPages ? (
                <Link
                    href={`${basePath}?query=${encodeURIComponent(query)}&page=${page + 1}`}
                    className="
            px-4 py-2
            bg-[var(--alternative-bg-color)]
            text-[var(--foreground)]
            border border-[var(--border-thin-color)]
            rounded-md
            hover:bg-[var(--hover-bg)]
            transition
          "
                >
                    Nächste
                </Link>
            ) : (
                <span
                    className="
            px-4 py-2
            text-[var(--foreground)]
            opacity-50
            rounded-md
          "
                >
          Nächste
        </span>
            )}
        </div>
    );

    return (
        <section className="container-lg  px-6 py-12">
            {/* Hero + Breadcrumb */}
            <CategoryHeroSection
                title={`${caption} – ${name}`}
                description={details}
                breadcrumb={[
                    {name: caption, href: categoryType},
                    {name, href: basePath},
                ]}
            />

            {/* Search Input */}
            <SearchInput defaultQuery={query} basePath={basePath}/>

            {/* Pager oben */}
            <div className="mb-6"><Pager/></div>

            {/* Artikel-Grid */}
            {paginated.length > 0 ? (
                <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-items-center gap-6">
                    {paginated.map(article => (
                        <ArticleCard
                            key={article.slug}
                            item={{
                                name: article.title,
                                description:
                                    article.seo?.metaDescription ??
                                    (article.content
                                        ? article.content.slice(0, 100) + "…"
                                        : ""),
                                img: article.featured_image,
                                link: `${basePath}/${article.slug}`,
                                published_date: article.published_date,
                            }}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center py-12 text-[var(--foreground)]">
                Keine Artikel gefunden.
                </p>
            )}

            {/* Pager unten */}
            <div className="mt-6"><Pager/></div>
        </section>
    );
}
