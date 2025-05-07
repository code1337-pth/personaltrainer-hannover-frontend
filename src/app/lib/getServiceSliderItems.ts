// app/lib/getServiceSliderItems.ts
import { Category, Article } from "@/app/types/strapi";
import { CategorySliderItem } from "@/app/types/slider";

/**
 * Nimmt einen Text und gibt höchstens die ersten `limit` Wörter zurück.
 */
function limitWords(text: string, limit: number): string {
    const words = text.trim().split(/\s+/);
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "…";
}

/**
 * Erst sortiert nach featured & priority,
 * dann für jede Kategorie alle Artikel mappt,
 * group = Kategorie-Name, description auf 10 Wörter beschränkt.
 */
export function getServiceSliderItems(
    categories: Category[],
    articles: Article[]
): CategorySliderItem[] {
    // 1) nur aktive Service-Kategorien
    const serviceCats = categories.filter((c) => !c.blog_category && c.active);

    // 2) sortieren wie in der Navigation
    serviceCats.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (a.priority ?? 9999) - (b.priority ?? 9999);
    });

    // 3) nur veröffentlichte Service-Artikel
    const serviceArticles = articles.filter(
        (a) => a.blog_article === false && a.status === "published"
    );

    // 4) im Tab- und Artikelreihenfolge mappen
    const items: CategorySliderItem[] = [];
    for (const cat of serviceCats) {
        const catArticles = serviceArticles.filter(
            (a) => a.category?.id === cat.id
        );
        for (const art of catArticles) {
            // nutze entweder SEO-Meta oder den Content
            const rawDesc =
                art.seo?.metaDescription ??
                (art.content || "");
            items.push({
                id: art.id,
                group: cat.name,
                name: art.title,
                description: limitWords(rawDesc, 10),
                image_url: art.featured_image?.url ?? "",
                link: `/service/${cat.slug}/${art.slug}`,
            });
        }
    }

    return items;
}
