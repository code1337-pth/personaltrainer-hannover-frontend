import strapiCache, {CacheKey} from "@/lib/strapiCache";
import {Category} from "@/app/types/strapi";
import CategorySlider from "@/app/components/CategorySlider";
import {convertCategoryToSliderItem} from "@/app/lib/convert";

export default async function BlogSection() {
    const categories = await strapiCache.fetchData<Category>("categories", CacheKey.Categories);

    // nur die aktiven Blog-Kategorien
    const filteredCategories = categories.filter((cat) => cat.active && cat.blog_category);

    // jetzt haben wir Items mit "group = category.name"
    const sliderItems = filteredCategories.map(convertCategoryToSliderItem);

    return (
        <CategorySlider
            title="Blog Kategorien"
            description="Hol dir frische Impulse für dein Wohlbefinden: In unserem Blog erwarten dich praktische
                        Tipps zu Abnehmen, Ernährung & Fitness und vieles mehr!"
            items={sliderItems}
        />
    );
}
