import strapiCache, {CacheKey} from "@/lib/strapiCache";
import {Category} from "@/app/types/strapi";
import {CategorySliderItem} from "@/app/types/slider";
import CategorySlider from "@/app/components/CategorySlider";

export default async function ServicesSection() {
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
        <CategorySlider
            title="Unsere Leistungen"
            description="Entdecken Sie unser umfangreiches Angebot, das individuell auf Ihre Fitness- und Gesundheitsziele zugeschnitten ist."
            items={items}
        />
    );
}
