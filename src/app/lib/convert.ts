// lib/convert.ts
import { Category } from "../types/strapi";
import { CategorySliderItem } from "../types/slider";
import { NavItem } from "../types/navigation";

export function convertCategoryToSliderItem(category: Category): CategorySliderItem {
  console.log(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${category.featured_image?.url ?? "/uploads/default.webp"}`)
  return {
    id: category.id,
    category: category.slug, // oder auch den Namen, je nach Bedarf
    name: category.name,
    description: category.description,
    image_url: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${category.featured_image?.url ?? "/uploads/default.webp"}`,
    link: `/blog/${category.slug}`,
  };
}

export function categoryToNavItem(category: Category, basePath: string = "/blog"): NavItem {
  return {
    name: category.name,
    href: `${basePath}/${category.slug}`
  };
}

export function categoriesToNavItems(categories: Category[], basePath: string = "/blog"): NavItem[] {
  return categories.map(category => categoryToNavItem(category, basePath));
}