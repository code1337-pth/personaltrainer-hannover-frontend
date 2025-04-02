// src/app/blog/[category]/[slug]/page.tsx

import StrapiCache, { CacheKey } from "@/app/lib/strapiCache";
import { Article } from "@/app/types/strapi";
import { notFound } from "next/navigation";
import Image from "next/image";
import BlogHeroSection from "@/app/components/BlogHeroSection";

// Hilfsfunktion: Relative Bildpfade in absolute URLs umwandeln
function prependStrapiHostToImages(htmlContent: string): string {
  const host = process.env.STRAPI_API_URL || "";
  return htmlContent.replace(/(<img[^>]+src=")(\/[^">]+)/g, `$1${host}$2`);
}

export async function generateStaticParams() {
  const articles = await StrapiCache.fetchData<Article>("articles", CacheKey.Articles);
  return articles.map((article) => ({
    category: article.category?.slug || "uncategorized",
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: { category: string; slug: string } }) {
  // Await params before using its properties
  const resolvedParams = await Promise.resolve(params);
  const { category, slug } = resolvedParams;

  const articles = await StrapiCache.fetchData<Article>("articles", CacheKey.Articles);
  const article = articles.find(
    (a) => a.slug === slug && a.category?.slug === category
  );

  if (!article) return {};

  const imageUrl = article.featured_image?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.featured_image.url}`
    : undefined;

  return {
    title: article.seo?.metaTitle || article.title,
    description: article.seo?.metaDescription || "",
    keywords: article.seo?.metaKeywords?.join(", ") || "",
    alternates: {
      canonical: article.seo?.canonicalUrl || "",
    },
    openGraph: {
      title: article.seo?.metaTitle || article.title,
      description: article.seo?.metaDescription || "",
      url: article.seo?.canonicalUrl || "",
      images: imageUrl ? [{ url: imageUrl, alt: article.title }] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: { params: { category: string; slug: string } }) {
  // Await params before using its properties
  const resolvedParams = await Promise.resolve(params);
  const { category, slug } = resolvedParams;

  const articles = await StrapiCache.fetchData<Article>("articles", CacheKey.Articles);
  const article = articles.find(
    (a) => a.slug === slug && a.category?.slug === category
  );

  if (!article) return notFound();

  const imageUrl = article.featured_image?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.featured_image.url}`
    : null;

  // JSON‑LD strukturierte Daten für SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "image": imageUrl,
    "author": {
      "@type": "Person",
      "name": article.author?.name || "",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Markus Kaluza"
    },
    "datePublished": article.published_date,
    "dateModified": article.modified_date || article.published_date,
    "description": article.seo?.metaDescription || "",
  };

  return (
    <>
      <BlogHeroSection
        title={article.title}
        breadcrumb={[
          { name: "Blog", href: "/blog" },
          { name: article.category?.name || "Unkategorisiert", href: `/blog/${category}` },
          { name: article.title },
        ]}
      />

      {/* SEO: Strukturierte Daten */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <article className="blog-article container mx-auto px-4 prose">
        {imageUrl && (
          <div className="flex justify-center mb-6 overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
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
          <div
            dangerouslySetInnerHTML={{
              __html: prependStrapiHostToImages(article.content),
            }}
          />
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
