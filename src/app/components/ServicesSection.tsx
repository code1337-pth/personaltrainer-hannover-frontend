import strapiCache, {CacheKey} from "@/lib/strapiCache";
import {Category} from "@/app/types/strapi";
import {CategorySliderItem} from "@/app/types/slider";
import CategorySlider from "@/app/components/CategorySlider";
import { getSortedServiceCategories } from "../lib/sortService";

export default async function ServicesSection() {
    // on-demand (holt & cached nur falls nötig):
    const categories = await strapiCache.fetchData<Category>('categories', CacheKey.Categories);
    const items = getSortedServiceCategories(categories);


    return (
        <CategorySlider
            title="Unsere Leistungen"
            description="Entdecken Sie unser umfangreiches Angebot, das individuell auf Ihre Fitness- und Gesundheitsziele zugeschnitten ist."
            items={items}
        />
    );
}
