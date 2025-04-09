import { transformHtmlContent, transformMediaUrl } from "@/lib/utils/transformHtml";

export enum CacheKey {
    Articles = "articles",
    Categories = "categories",
    Tags = "tags",
    TeamMembers = "team-members",
    ReasonLists = "reason-lists", // ✅ NEU
}

type CacheEntry<T> = {
    data: T[];
    timestamp: number;
};

const TTL = 1000 * 60 * 60; // Optional: 1 Stunde

class StrapiCache {
    private cache = new Map<CacheKey, CacheEntry<unknown>>();

    private isValid(key: CacheKey): boolean {
        const entry = this.cache.get(key);
        return !!entry && Date.now() - entry.timestamp < TTL;
    }

    public async fetchData<T>(endpoint: string, key: CacheKey): Promise<T[]> {
        if (this.isValid(key)) {
            return this.cache.get(key)!.data as T[];
        }

        let results: T[] = [];
        let page = 1;
        const pageSize = 100;
        let fetchedItems: T[];

        do {
            const url = `${process.env.STRAPI_API_URL}/api/${endpoint}?populate=*&pagination[pageSize]=${pageSize}&pagination[page]=${page}`;
            const res = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
                },
                next: { revalidate: 0 },
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`❌ Fehler beim Laden von ${key} (Seite ${page}): ${errorText}`);
            }

            const json = await res.json();
            fetchedItems = json.data as T[];

            // 🔁 Transformieren je nach Typ
            if (key === CacheKey.Articles) {
                fetchedItems.forEach((article: any) => {
                    if (article.content) {
                        article.content = transformHtmlContent(article.content);
                    }
                    if (article.featured_image?.url) {
                        article.featured_image.url = transformMediaUrl(article.featured_image.url);
                    }
                });
            }

            if (key === CacheKey.Categories) {
                fetchedItems.forEach((cat: any) => {
                    if (cat.featured_image?.url) {
                        cat.featured_image.url = transformMediaUrl(cat.featured_image.url);
                    }
                });
            }

            if (key === CacheKey.TeamMembers) {
                fetchedItems.forEach((member: any) => {
                    if (member.image?.url) {
                        member.image.url = transformMediaUrl(member.image.url);
                    }
                });
            }

            if (key === CacheKey.ReasonLists) {
                fetchedItems.forEach((list: any) => {
                    // optionales Transforming von content oder tags
                    list.reasons?.forEach((reason: any) => {
                        if (reason.html_content) {
                            reason.html_content = transformHtmlContent(reason.html_content);
                        }
                    });
                });
            }

            results = results.concat(fetchedItems);
            page++;
        } while (fetchedItems.length === pageSize);

        this.cache.set(key, { data: results, timestamp: Date.now() });
        return results;
    }

    public getCachedData<T>(key: CacheKey): T[] | undefined {
        const entry = this.cache.get(key);
        return entry?.data as T[] | undefined;
    }

    public clearCache(key?: CacheKey): void {
        if (key) {
            this.cache.delete(key);
        } else {
            this.cache.clear();
        }
    }

    public async preload(): Promise<void> {
        await Promise.all([
            this.fetchData('articles', CacheKey.Articles),
            this.fetchData('categories', CacheKey.Categories),
            this.fetchData('team-members', CacheKey.TeamMembers),
            this.fetchData('reason-lists', CacheKey.ReasonLists), // ✅ NEU
            // Optional: this.fetchData('tags', CacheKey.Tags),
        ]);
    }
}

export default new StrapiCache();
