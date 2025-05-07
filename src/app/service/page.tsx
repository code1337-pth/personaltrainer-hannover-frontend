// app/service/page.tsx
import strapiCache, { CacheKey } from "@/lib/strapiCache";
import { Category } from "@/app/types/strapi";
import { Article } from "@/app/types/strapi";
import { getServiceSliderItems } from "../lib/getServiceSliderItems";
import CategoryHeroSection from "../components/CategoryHeroSection";
import CategorySlider from "../components/CategorySlider";

export default async function ServicePage() {
    // erst Kategorien, dann Artikel laden
    const categories = await strapiCache.fetchData<Category>(
        "categories",
        CacheKey.Categories
    );
    const articles = await strapiCache.fetchData<Article>(
        "articles",
        CacheKey.Articles
    );

    // erzeuge die Slider-Items in exakt der gewünschten Reihenfolge
    const items = getServiceSliderItems(categories, articles);

    return (
        <section className="container-lg">
            <CategoryHeroSection
                title="Übersicht unserer Leistungen"
                description="Entdecken Sie unser umfangreiches Angebot, das individuell auf Ihre Fitness- und Gesundheitsziele zugeschnitten ist."
            />

            <CategorySlider title="Unsere Leistungen" items={items} />
        </section>
    );
}
