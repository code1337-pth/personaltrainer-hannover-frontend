import {Article, Category} from "@/app/types/strapi";

export interface NavItem {
    label: string;
    slug: string;
    href: string;
    children?: NavItem[];
}

export function generateNavigation({
                                       categories,
                                       articles,
                                   }: {
    categories: Category[];
    articles: Article[];
}): {
    serviceNav: NavItem[];
    blogNav: NavItem[];
} {
    // Nur aktive Kategorien verwenden
    const activeCategories = categories.filter((cat) => cat.active);

    // === Service Navigation ===
    const serviceCategories = activeCategories.filter((cat) => !cat.blog_category);

    const serviceNav: NavItem[] = serviceCategories.map((category) => {
        const children = articles
            .filter(
                (article) =>
                    article.category?.id === category.id &&
                    article.blog_article === false &&
                    article.status === 'published'
            )
            .map((article) => ({
                label: article.title,
                slug: article.slug,
                href: `/service/${category.slug}/${article.slug}`,
            }));

        return {
            label: category.name,
            slug: category.slug,
            href: `/service/${category.slug}`,
            children,
        };
    });

    // === Blog Navigation ===
    const blogCategories = activeCategories.filter((cat) => cat.blog_category);

    const blogNav: NavItem[] = blogCategories.map((category) => ({
        label: category.name,
        slug: category.slug,
        href: `/blog/${category.slug}`,
    }));

    return { serviceNav, blogNav };
}
