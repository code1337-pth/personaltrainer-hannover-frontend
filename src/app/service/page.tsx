// app/service/page.tsx
import strapiCache, { CacheKey } from '@/lib/strapiCache';
import { CategorySliderItem } from '@/app/types/slider';

import CategoryHeroSection from '../components/CategoryHeroSection';
import CategorySlider from '../components/CategorySlider';
import {Category} from "@/app/types/strapi";

export default async function ServicePage() {
    // on-demand (holt & cached nur falls nötig):
    const categories = await strapiCache.fetchData<Category>('categories', CacheKey.Categories);
    const serviceCategories = categories.filter((c) => !c.blog_category && c.active);

    const items: CategorySliderItem[] = serviceCategories.map((cat) => ({
        id: cat.id,
        category: cat.slug,
        name: cat.name,
        description: cat.description,
        image_url: cat.featured_image?.url ?? '', // Fallback falls kein Bild
        link: `/service/${cat.slug}`,
    }));

    return (
        <section className="container-lg">
            <CategoryHeroSection
                title="Übersicht unserer Leistungen"
                description="Entdecken Sie unser umfangreiches Angebot, das individuell auf Ihre Fitness- und Gesundheitsziele zugeschnitten ist."
            />

            <CategorySlider
                title="Unsere Leistungen"
                description=""
                items={items}
            />
        </section>
    );
}
