// src/lib/metadata.ts
import type { Metadata } from 'next';
import strapiCache, {CacheKey} from "@/lib/strapiCache";
import type { Article } from '@/app/types/strapi';

// Basis-URL für alle OpenGraph-/Twitter-Images
export const metadataBase = new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://personaltrainer-hannover.de'
);

export interface ArticleMetadata {
    title: string;
    description: string;
    keywords: string;
    alternates: { canonical: string };
    openGraph: {
        title: string;
        description: string;
        url: string;
        images?: { url: string; alt: string }[];
    };
}

/** SEO-/OG-Grunddaten aus dem Artikel holen */
export function getArticleMetadata(article: Article, canonicalUrl: string): ArticleMetadata {
    const imageUrl = article.featured_image?.url;
    return {
        title: article.seo?.metaTitle || article.title,
        description: article.seo?.metaDescription || '',
        keywords: article.seo?.metaKeywords?.join(', ') || '',
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: article.seo?.metaTitle || article.title,
            description: article.seo?.metaDescription || '',
            url: canonicalUrl,
            images: imageUrl ? [{ url: imageUrl, alt: article.title }] : undefined,
        },
    };
}

export interface ArticleStructuredData {
    '@context': 'https://schema.org';
    '@type': 'Article';
    headline: string;
    image?: string;
    author: { '@type': 'Person'; name: string };
    publisher: { '@type': 'Organization'; name: string };
    datePublished?: string;
    dateModified: string;
    description: string;
}

/** JSON-LD für Artikel erzeugen */
export function getStructuredData(article: Article): ArticleStructuredData {
    const datePublished = article.published_date;
    const dateModified = article.modified_date || datePublished || '';
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        image: article.featured_image?.url,
        author: { '@type': 'Person', name: article.author?.name || '' },
        publisher: { '@type': 'Organization', name: 'Markus Kaluza' },
        datePublished,
        dateModified,
        description: article.seo?.metaDescription || '',
    };
}

/**
 * Next.js 15: params kommen als Promise, daher hier awaiten.
 * Dieser Export wird als `generateMetadata` von Next.js erkannt.
 */
export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{
        type: 'blog' | 'service';
        category: string;
        slug: string;
    }>;
}): Promise<Metadata> {
    const { type, category, slug } = await params;

    const all = await strapiCache.fetchData('articles', CacheKey.Articles);
    const article = all.find(a =>
        a.slug === slug &&
        a.category?.slug === category &&
        a.status === 'published' &&
        (type === 'blog' ? true : !a.blog_article)
    );
    if (!article) return {};

    // Dynamische Canonical-URL bauen
    const canonicalUrl = `${metadataBase.origin}/${type}/${category}/${slug}`;

    const meta = getArticleMetadata(article, canonicalUrl);
    return {
        metadataBase,
        title: meta.title,
        description: meta.description,
        keywords: meta.keywords,
        alternates: { canonical: meta.alternates.canonical },
        openGraph: { ...meta.openGraph, type: 'article' },
        twitter: {
            card: 'summary_large_image',
            title: meta.title,
            description: meta.description,
            images: meta.openGraph.images?.[0]?.url,
        },
    };
}