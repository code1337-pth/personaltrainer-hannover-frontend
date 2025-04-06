"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Breadcrumb from './Breadcrumb';
import CategoryHeroSection from './CategoryHeroSection';
import SearchInput from './SearchInput';
import ArticleCard from './ArticleCard';
import PaginationControls from './PaginationControls';
import { Article } from '../types/strapi';

export enum CategoryType {
    Blog = "/blog",
    Service = "/service",
}

type CategoryListingProps = {
    name: string;
    slug: string;
    details?: string;
    image?: string;
    articles: Article[]; // Alle Artikel sind bereits geladen und werden als Prop übergeben
    caption: string;
    categoryType: CategoryType;
};

const PAGE_SIZE = 9; // Anzahl Artikel pro Seite

const CategoryListing = ({
                             name,
                             slug,
                             details,
                             image,
                             articles,
                             categoryType = CategoryType.Blog,
                             caption = "Blog",
                         }: CategoryListingProps) => {
    // State für die aktuelle Seite und Suchquery
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    // Ableitung der gefilterten Artikel aus den übergebenen Artikeln und dem Suchquery
    const filteredArticles = useMemo(() => {
        if (!searchQuery) return articles;
        const lowerQuery = searchQuery.toLowerCase();
        return articles.filter((a) =>
            a.title.toLowerCase().includes(lowerQuery) ||
            (a.content && a.content.toLowerCase().includes(lowerQuery))
        );
    }, [articles, searchQuery]);

    // Setze die Seite zurück, wenn sich der Suchquery oder die Artikel ändern
    useEffect(() => {
        setPage(1);
    }, [searchQuery, articles]);

    // Berechne die Gesamtseitenzahl
    const totalPages = Math.ceil(filteredArticles.length / PAGE_SIZE);

    // Berechne die Artikel für die aktuelle Seite
    const paginatedArticles = useMemo(() => {
        const startIndex = (page - 1) * PAGE_SIZE;
        return filteredArticles.slice(startIndex, startIndex + PAGE_SIZE);
    }, [page, filteredArticles]);

    // Handle für die Suchfunktion
    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <section className="container-lg">
            <CategoryHeroSection
                title={`${caption} – ${name}`}
                description={`Alle Beiträge zum Thema ${name}`}
                breadcrumb={[
                    { name: caption.toLowerCase(), href: categoryType },
                    { name: slug, href: `${categoryType}/${slug}` },
                ]}
            />
            <SearchInput onSearch={handleSearch} />

            {/* Pagination direkt unter dem Suchfeld */}
            <PaginationControls
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />

            {paginatedArticles.length > 0 ? (
                <div className="container-lg text-lg mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mt-6">
                    {paginatedArticles.map((article) => (
                        <ArticleCard
                            key={article.id}
                            item={{
                                name: article.title || "Ohne Titel",
                                description:
                                    article.seo?.metaDescription ||
                                    (article.content ? article.content.slice(0, 100) + "..." : ""),
                                image_url: article.featured_image?.url || "/public/default.jpg",
                                link: `${categoryType}/${slug}/${article.slug}`,
                                published_date: article.published_date,
                            }}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p>Keine Artikel gefunden.</p>
                </div>
            )}

            {/* Pagination erneut am Ende */}
            <PaginationControls
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </section>
    );
};

export default CategoryListing;
