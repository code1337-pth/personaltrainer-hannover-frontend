// src/app/[type]/[category]/page.tsx
import {notFound} from "next/navigation";
import CategoryListing, {CategoryType} from "@/app/components/CategoryListing";
import StrapiCache, {CacheKey} from "@/lib/strapiCache";

type Props = {
    params: Promise<{ type: "blog" | "service"; category: string }>;
    searchParams: Promise<{ query?: string; page?: string }>;
};

export default async function DynamicCategoryPage({
                                                      params,
                                                      searchParams,
                                                  }: Props) {
    // 🚀 zuerst awaiten
    const {type, category: categorySlug} = await params;
    const {query = "", page: pageStr = "1"} = await searchParams;
    const page = parseInt(pageStr, 10) || 1;

    const isBlog = type === "blog";
    const caption = isBlog ? "Blog" : "Leistungen";

    // Kategorie validieren
    const allCategories = await StrapiCache.fetchData(
        'categories',
        CacheKey.Categories
    );
    const category = allCategories.find((c) =>
        isBlog
            ? c.slug === categorySlug && c.blog_category
            : c.slug === categorySlug && !c.blog_category && c.active
    );
    if (!category) return notFound();

    // Artikel laden & filtern
    const allArticles = await StrapiCache.fetchData(
        'articles',
        CacheKey.Articles
    );
    const filteredArticles = allArticles.filter((a) => {
        if (a.category?.slug !== categorySlug) return false;
        if (a.status !== "published") return false;
        if (!isBlog && a.blog_article) return false;
        if (query) {
            const txt = (a.title + " " + (a.content ?? "")).toLowerCase();
            return txt.includes(query.toLowerCase());
        }
        return true;
    });

    return (
        <CategoryListing
            name={category.name}
            slug={category.slug}
            details={category.description}
            caption={caption}
            categoryType={isBlog ? CategoryType.Blog : CategoryType.Service}
            articles={filteredArticles}
            query={query}
            page={page}
        />
    );
}
