// src/lib/metadata.ts
import type { Article } from "@/app/types/strapi";

export interface ArticleMetadata {
    title: string;
    description: string;
    keywords: string;
    alternates: {
        canonical: string;
    };
    openGraph: {
        title: string;
        description: string;
        url: string;
        images?: { url: string; alt: string }[];
    };
}

export function getArticleMetadata(article: Article): ArticleMetadata {
    const imageUrl = article.featured_image?.url

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

export function getStructuredData(article: Article): any {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        image: article.featured_image?.url,
        author: {
            "@type": "Person",
            "name": article.author?.name || "",
        },
        publisher: {
            "@type": "Organization",
            "name": "Markus Kaluza",
        },
        datePublished: article.published_date,
        dateModified: article.modified_date || article.published_date,
        description: article.seo?.metaDescription || "",
    };
}
