// app/blog/page.tsx
import CategoryHeroSection from "../components/CategoryHeroSection";
import CategorySlider from "../components/CategorySlider";
import { convertCategoryToSliderItem } from "../lib/convert";
import { Category } from "../types/strapi";
import strapiCache, { CacheKey } from "@/lib/strapiCache";

export default async function BlogPage() {
    const categories = await strapiCache.fetchData<Category>("categories", CacheKey.Categories);

    // nur die aktiven Blog-Kategorien
    const filteredCategories = categories.filter((cat) => cat.active && cat.blog_category);

    // jetzt haben wir Items mit "group = category.name"
    const sliderItems = filteredCategories.map(convertCategoryToSliderItem);

    return (
        <section className="container-lg">
            <CategoryHeroSection
                title="Übersicht der Blog-Kategorien"
                description="Hier findest du eine Übersicht all unserer Blog-Kategorien ..."
            />
            <CategorySlider
                title="Blog Kategorien"
                description="Wähle eine Kategorie"
                items={sliderItems}
            />
        </section>
    );
}
