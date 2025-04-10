// app/lib/sortServiceCategories.ts
import { Category } from "@/app/types/strapi";
import { CategorySliderItem } from "@/app/types/slider";

/**
 * Extrahiert, sortiert und mappt aus allen Kategorien
 * nur die für "Leistungen" relevanten Kategorien (nicht blog_category und aktiv)
 * in die Slider-Items.
 */
export function getSortedServiceCategories(categories: Category[]): CategorySliderItem[] {
  const serviceCategories = categories.filter((c) => !c.blog_category && c.active);
  const sortedServiceCategories = serviceCategories.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return (a.priority ?? 9999) - (b.priority ?? 9999);
  });

  return sortedServiceCategories.map((cat) => ({
    id: cat.id,
    category: cat.slug,
    name: cat.name,
    description: cat.description,
    image_url: cat.featured_image?.url ?? '', // Fallback falls kein Bild
    link: `/service/${cat.slug}`,
  }));
}
