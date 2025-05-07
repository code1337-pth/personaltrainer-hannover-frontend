import strapiCache, {CacheKey} from "@/lib/strapiCache";
import {Article, Category} from "@/app/types/strapi";
import {CategorySliderItem} from "@/app/types/slider";
import CategorySlider from "@/app/components/CategorySlider";
import { getSortedServiceCategories } from "../lib/sortService";
import {getServiceSliderItems} from "@/app/lib/getServiceSliderItems";

export default async function ServicesSection() {
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
        <CategorySlider
            title="Unsere Leistungen"
            description="Entdecken Sie unser umfangreiches Angebot, das individuell auf Ihre Fitness- und Gesundheitsziele zugeschnitten ist."
            items={items}
        />
    );
}
