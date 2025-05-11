import strapiCache, {CacheKey} from "@/lib/strapiCache";
import CategorySlider from "@/app/components/CategorySlider";
import {getServiceSliderItems} from "@/app/lib/getServiceSliderItems";

export default async function ServicesSection() {
    // erst Kategorien, dann Artikel laden
    const categories = await strapiCache.fetchData(
        "categories",
        CacheKey.Categories
    );
    const articles = await strapiCache.fetchData(
        "articles",
        CacheKey.Articles
    );

    // erzeuge die Slider-Items in exakt der gewünschten Reihenfolge
    const items = getServiceSliderItems(categories, articles);
    return (
        <CategorySlider
            title="Unsere Leistungen"
            description="Entdecke unser umfangreiches Angebot, das individuell auf deine Fitness- und Gesundheitsziele zugeschnitten ist."
            items={items}
        />
    );
}
