import { Article, Category } from "@/app/types/strapi";
import { NavItem } from "@/app/types/navigation";

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
  
  // Zuerst sortieren wir die Service-Kategorien
  const sortedServiceCategories = serviceCategories.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return (a.priority ?? 9999) - (b.priority ?? 9999);
  });

  const serviceNav: NavItem[] = sortedServiceCategories.map((category) => {
    const children = articles
      .filter(
        (article) =>
          article.category?.id === category.id &&
          article.blog_article === false &&
          article.status === "published"
      )
      .map((article) => ({
        name: article.title,
        slug: article.slug,
        href: `/service/${category.slug}/${article.slug}`,
      }));

    return {
      name: category.name,
      href: `/service/${category.slug}`,
      slug: category.slug,
      children,
    };
  });

  // === Blog Navigation ===
  const blogCategories = activeCategories.filter((cat) => cat.blog_category);

  const sortedBlogCategories = blogCategories.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return (a.priority ?? 9999) - (b.priority ?? 9999);
  });

  const blogNav: NavItem[] = sortedBlogCategories.map((category) => ({
    name: category.name,
    slug: category.slug,
    href: `/blog/${category.slug}`,
  }));

  return { serviceNav, blogNav };
}
