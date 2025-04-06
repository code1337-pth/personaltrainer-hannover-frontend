// app/blog/page.tsx (Server-Komponente – kein "use client" oben)
import CategoryHeroSection from "../components/CategoryHeroSection";
import CategorySlider from "../components/CategorySlider";
import {convertCategoryToSliderItem} from "../lib/convert";
import {Category} from "../types/strapi";
import strapiCache, {CacheKey} from "@/lib/strapiCache";

export default async function BlogPage() {
    // Hole Kategorien serverseitig

    const categories = await strapiCache.fetchData<Category>("categories", CacheKey.Categories);

    // Filtere Kategorien heraus, die für den Blog nicht relevant sind
    const filteredCategories = categories.filter(
        (cat) => cat.blog_category == true
    );

    // Konvertiere die gefilterten Kategorien in Slider-Items
    const sliderItems = filteredCategories.map((cat) =>
        convertCategoryToSliderItem(cat)
    );

    return (
        <section className="container-lg">
            <CategoryHeroSection
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
