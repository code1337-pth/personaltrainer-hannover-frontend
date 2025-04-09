// src/app/blog/[category]/page.tsx – Server-Komponente
import { notFound } from 'next/navigation';
import CategoryListing, { CategoryType } from "@/app/components/CategoryListing";
import { Article, Category } from "@/app/types/strapi";
import StrapiCache, { CacheKey } from "@/lib/strapiCache";

type BlogCategoryPageProps = {
  params: {
    category: string; // z. B. "mentale-staerke"
  };
  searchParams: {
    query?: string;
    page?: string;
  };
};

export default async function BlogCategoryPage({ params, searchParams }: BlogCategoryPageProps) {
  const categorySlug = params.category;

  // Hole alle Kategorien
  const categories = await StrapiCache.fetchData<Category>("categories", CacheKey.Categories);

  // Finde die Kategorie anhand des Slugs
  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) {
    notFound();
  }

  // Hole alle Artikel
  const articles = await StrapiCache.fetchData<Article>("articles", CacheKey.Articles);

  // Filtere die Artikel, die zur aktuellen Kategorie gehören
  const filteredArticles = articles.filter(
      (a) => a.category?.slug === category.slug
  );

  return (
      <CategoryListing
          slug={category.slug}
          details={category.description}
          articles={filteredArticles}
          image={category.featured_image?.url}
          caption="Blog"
          categoryType={CategoryType.Blog}
          name={category.name}
          searchParams={searchParams}
      />
  );
}
