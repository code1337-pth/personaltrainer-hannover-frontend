// src/app/blog/[category]/page.tsx – Server-Komponente
import { notFound } from 'next/navigation';
import BlogCategoryListing from "@/app/components/BlogCategoryListing";
import StrapiCache, { CacheKey } from "@/app/lib/strapiCache";
import { Article, Category } from "@/app/types/strapi";

type BlogCategoryPageProps = {
  params: {
    category: string; // z. B. "mentale-staerke"
  };
};

export default async function BlogCategoryPage(props: BlogCategoryPageProps) {
  // Workaround: Await the params before using its properties
  const resolvedParams = await Promise.resolve(props.params);
  const categorySlug = resolvedParams.category;
  
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

  // Bereite das Kategorie‑Image vor (mit Fallback)
  const categoryImage =
    category.featured_image?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${category.featured_image.url}`
      : "/default.jpg";

  return (
    <BlogCategoryListing
      slug={category.slug}
      details={category.description}
      articles={filteredArticles}
      image={categoryImage}
    />
  );
}
