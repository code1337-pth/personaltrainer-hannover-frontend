// app/blog/page.tsx (Server-Komponente – kein "use client" oben)
import { CacheKey } from "@/app/lib/strapiCache";
import BlogHeroSection from "../components/BlogHeroSection";
import CategorySlider from "../components/CategorySlider";
import strapiCache from "@/app/lib/strapiCache";
import { convertCategoryToSliderItem } from "../lib/convert";
import { Category } from "../types/strapi";

export default async function BlogPage() {
  // Hole Kategorien serverseitig
  const categories = await strapiCache.fetchData<Category>("categories", CacheKey.Categories);

  // Filtere Kategorien heraus, die für den Blog nicht relevant sind (z.B. "services" und "leistungen")
  const filteredCategories = categories.filter(
    (cat) => cat.slug !== "services" && cat.slug !== "leistungen"
  );

  // Konvertiere die gefilterten Kategorien in Slider-Items
  const sliderItems = filteredCategories.map((cat) =>
    convertCategoryToSliderItem(cat)
  );

  return (
    <section className="container-lg">
      <BlogHeroSection
        title="Übersicht der Blog-Kategorien"
        description="Hier findest du eine Übersicht all unserer Blog-Kategorien rund um Gesundheit, Abnehmen, mentale Stärke, Training und Ernährung. Lass dich inspirieren, informiere dich fundiert und finde genau die Inhalte, die dich auf deinem Weg zu einem gesünderen Lebensstil unterstützen."
      />
      <CategorySlider
        title="Blog Kategorien"
        description="Wähle eine Kategorie"
        items={sliderItems}
      />
    </section>
  );
}
