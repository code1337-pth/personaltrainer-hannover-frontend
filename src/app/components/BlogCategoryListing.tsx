// src/app/components/BlogCategoryListing.tsx
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Breadcrumb from './Breadcrumb';
import BlogHeroSection from './BlogHeroSection';
import SearchInput from './SearchInput';
import BlogCard from './BlogCard';
import PaginationControls from './PaginationControls';
import { Article } from '../types/strapi';

type BlogCategoryListingProps = {
  slug: string;
  details?: string;
  image?: string;
  articles: Article[]; // Alle Artikel sind bereits geladen und werden als Prop übergeben
};

const PAGE_SIZE = 9; // Anzahl Artikel pro Seite

const BlogCategoryListing = ({ slug, details, image, articles }: BlogCategoryListingProps) => {
  const [page, setPage] = useState(1);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles);

  // Aktualisiere gefilterte Artikel, wenn sich die übergebenen Artikel ändern
  useEffect(() => {
    setFilteredArticles(articles);
    setPage(1);
  }, [articles]);

  // Gesamtseitenzahl basierend auf den gefilterten Artikeln
  const totalPages = Math.ceil(filteredArticles.length / PAGE_SIZE);

  // Berechne die Artikel, die zur aktuellen Seite gehören
  const paginatedArticles = useMemo(() => {
    const startIndex = (page - 1) * PAGE_SIZE;
    return filteredArticles.slice(startIndex, startIndex + PAGE_SIZE);
  }, [page, filteredArticles]);

  // handleSearch filtert die Artikel anhand des Suchstrings in title UND content (HTML)
  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredArticles(articles);
      setPage(1);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const result = articles.filter((a) =>
      a.title.toLowerCase().includes(lowerQuery) ||
      (a.content && a.content.toLowerCase().includes(lowerQuery))
    );
    setFilteredArticles(result);
    setPage(1);
  };

  return (
    <section className="container-lg">
      <BlogHeroSection
        title={`Blog – ${slug}`}
        description={`Alle Beiträge zum Thema ${slug}`}
        breadcrumb={[
          { name: "Blog", href: "/blog" },
          { name: slug, href: `/blog/${slug}` },
        ]}
      />
      <SearchInput onSearch={handleSearch} />

      {/* Pagination direkt unter dem Suchfeld */}
      <PaginationControls
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <div className="container-lg text-lg mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mt-6">
        {paginatedArticles.map((article) => (
          <BlogCard
            key={article.id}
            item={{
              name: article.title || "Ohne Titel",
              description:
                article.seo?.metaDescription ||
                (article.content ? article.content.slice(0, 100) + "..." : ""),
              image_url:
                `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.featured_image?.url}` ||
                "/public/default.jpg",
              link: `/blog/${slug}/${article.slug}`,
              published_date: article.published_date, // 🆕 hinzufügen
            }}
          />
        ))}
      </div>

      {/* Pagination erneut am Ende */}
      <PaginationControls
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </section>
  );
};

export default BlogCategoryListing;
