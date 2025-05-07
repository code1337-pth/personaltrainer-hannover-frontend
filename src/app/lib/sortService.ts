// app/lib/sortServiceCategories.ts
import { Category } from "@/app/types/strapi";
import { CategorySliderItem } from "@/app/types/slider";

/**
 * Liefert Slider-Items mit group = Kategorie-Name,
 * sortiert nach featured und priority.
 */
export function getSortedServiceCategories(
    categories: Category[]
): CategorySliderItem[] {
  const serviceCategories = categories.filter((c) => !c.blog_category && c.active);

  const sorted = serviceCategories.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return (a.priority ?? 9999) - (b.priority ?? 9999);
  });

  return sorted.map((cat) => ({
    id: cat.id,
    group: cat.name,               // <-- hier statt category: cat.slug
    name: cat.name,
    description: cat.description,
    image_url: cat.featured_image?.url ?? "",
    link: `/service/${cat.slug}`,
  }));
}
