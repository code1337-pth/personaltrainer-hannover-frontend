// app/service/page.tsx
import strapiCache, { CacheKey } from '@/lib/strapiCache';
import { CategorySliderItem } from '@/app/types/slider';

import CategoryHeroSection from '../components/CategoryHeroSection';
import CategorySlider from '../components/CategorySlider';
import {Category} from "@/app/types/strapi";
import { getSortedServiceCategories } from '../lib/sortService';

export default async function ServicePage() {
    // on-demand (holt & cached nur falls nötig):
    const categories = await strapiCache.fetchData<Category>('categories', CacheKey.Categories);
    const items = getSortedServiceCategories(categories);

    return (
        <section className="container-lg">
            <CategoryHeroSection
                title="Übersicht unserer Leistungen"
                description="Entdecken Sie unser umfangreiches Angebot, das individuell auf Ihre Fitness- und Gesundheitsziele zugeschnitten ist."
            />

            <CategorySlider
                title="Unsere Leistungen"
                items={items}
            />
        </section>
    );
}
