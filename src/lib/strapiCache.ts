// src/lib/strapiCache.ts
import {transformHtmlContent, transformMediaUrl} from "@/lib/utils/transformHtml";
import {
    Article,
    Category,
    Partner,
    ReasonList,
    Seal,
    SectionBlock,
    StrapiEntityMap,
    TeamMember,
} from "@/app/types/strapi";

export enum CacheKey {
    Articles = "articles",
    Categories = "categories",
    Tags = "tags",
    TeamMembers = "team-members",
    ReasonLists = "reason-lists",
    Partners = "partners",
    Seals = "seals",
}

const TTL = 1000 * 60 * 60; // 1 hour
const PAGE_SIZE = 100;

interface CacheEntry<T> {
    data: T[];
    timestamp: number;
}

class StrapiCache {
    private cache = new Map<CacheKey, CacheEntry<unknown>>();

    private isValid(key: CacheKey): boolean {
        const entry = this.cache.get(key);
        return !!entry && Date.now() - entry.timestamp < TTL;
    }

    public async fetchData<K extends keyof StrapiEntityMap>(
        endpoint: string,
        key: K
    ): Promise<StrapiEntityMap[K][]> {
        if (this.isValid(key)) {
            return this.cache.get(key)!.data as StrapiEntityMap[K][];
        }

        let results: StrapiEntityMap[K][];
        if (key === CacheKey.Articles) {
            // Fetch articles with deep sections and transform
            results = (await this.fetchArticles(endpoint)) as StrapiEntityMap[K][];
            this.sortByPublishedDateDesc(results as Article[]);
        } else {
            // Generic fetch for other endpoints
            results = await this.fetchGeneric<StrapiEntityMap[K]>(endpoint);
            this.applyMediaTransform(key, results);
        }

        this.cache.set(key, {data: results, timestamp: Date.now()});
        return results;
    }

    private async fetchArticles(endpoint: string): Promise<Article[]> {
        const combined: Article[] = [];
        let page = 1;
        while (true) {
            const baseParams = new URLSearchParams({
                "pagination[pageSize]": PAGE_SIZE.toString(),
                "pagination[page]": page.toString(),
                populate: "*",
            });
            const baseUrl = `${process.env.STRAPI_API_URL}/api/${endpoint}?${baseParams}`;
            const baseData = await this.fetchJson<Article>(baseUrl);

            const deepParams = new URLSearchParams({
                "pagination[pageSize]": PAGE_SIZE.toString(),
                "pagination[page]": page.toString(),
                "populate[sections][populate]": "*",
            });
            const deepUrl = `${process.env.STRAPI_API_URL}/api/${endpoint}?${deepParams}`;
            const deepData = await this.fetchJsonSafe<Article>(deepUrl);

            const merged = this.mergeSections(baseData, deepData);
            this.transformArticles(merged);

            combined.push(...merged);
            if (baseData.length < PAGE_SIZE) break;
            page++;
        }
        return combined;
    }

    private async fetchGeneric<T>(endpoint: string): Promise<T[]> {
        const combined: T[] = [];
        let page = 1;
        while (true) {
            const params = new URLSearchParams({
                populate: "*",
                "pagination[pageSize]": PAGE_SIZE.toString(),
                "pagination[page]": page.toString(),
            });
            const url = `${process.env.STRAPI_API_URL}/api/${endpoint}?${params}`;
            const data = await this.fetchJson<T>(url);
            combined.push(...data);
            if (data.length < PAGE_SIZE) break;
            page++;
        }
        return combined;
    }

    private async fetchJson<T>(url: string): Promise<T[]> {
        const res = await fetch(url, {
            headers: {Authorization: `Bearer ${process.env.STRAPI_TOKEN}`},
            next: {revalidate: 0},
        });
        if (!res.ok) {
            const txt = await res.text();
            throw new Error(`Error fetching ${url}: ${txt}`);
        }
        const json = (await res.json()) as { data: T[] };
        return json.data;
    }

    private async fetchJsonSafe<T>(url: string): Promise<T[]> {
        try {
            return await this.fetchJson<T>(url);
        } catch {
            console.warn(`Warning: Deep fetch failed for ${url}`);
            return [];
        }
    }

    private mergeSections(baseData: Article[], deepData: Article[]): Article[] {
        if (!deepData.length) return baseData;
        return baseData.map(item => {
            const deep = deepData.find(d => d.id === item.id);
            if (deep && Array.isArray(deep.sections)) {
                item.sections = deep.sections as SectionBlock[];
            }
            return item;
        });
    }

    private transformArticles(items: Article[]): void {
        items.forEach(article => {
            if (article.content) article.content = transformHtmlContent(article.content);
            if (article.featured_image?.url) {
                article.featured_image.url = transformMediaUrl(article.featured_image.url);
            }
            if (Array.isArray(article.sections)) {
                article.sections = article.sections.map(sec => this.transformSection(sec));
            }
        });
    }

    private transformSection(sec: SectionBlock): SectionBlock {
        switch (sec.__component) {
            case "shared.html-content":
                if (sec.content) sec.content = transformHtmlContent(sec.content);
                break;
            case "shared.content-with-image":
                sec.image = sec.image.map(img => ({...img, url: transformMediaUrl(img.url)}));
                break;
            case "shared.slider":
                sec.items = sec.items.map(it => ({...it, image_url: transformMediaUrl(it.image_url)}));
                break;
            case "shared.media":
                if (sec.file) {
                    sec.file.url = transformMediaUrl(sec.file.url);
                    if (sec.file.formats) {
                        Object.values(sec.file.formats).forEach(fmt => {
                            fmt.url = transformMediaUrl(fmt.url);
                        });
                    }
                }
                break;
        }
        return sec;
    }

    private applyMediaTransform<K extends keyof StrapiEntityMap>(key: K, items: StrapiEntityMap[K][]): void {
        items.forEach(item => {
            switch (key) {
                case CacheKey.Categories: {
                    const categoryItem = item as Category;
                    const img = categoryItem.featured_image;
                    if (img && img.url) {
                        img.url = transformMediaUrl(img.url);
                    }
                    break;
                }
                case CacheKey.TeamMembers: {
                    const member = item as TeamMember;
                    const img = member.image;
                    if (img && img.url) {
                        img.url = transformMediaUrl(img.url);
                    }
                    break;
                }
                case CacheKey.ReasonLists: {
                    (item as ReasonList).reasons.forEach(r => {
                        if (r.html_content) r.html_content = transformHtmlContent(r.html_content);
                    });
                    break;
                }
                case CacheKey.Partners: {
                    const partner = item as Partner;
                    if (Array.isArray(partner.logo)) {
                        partner.logo.forEach(media => this.transformMediaArray(media));
                    }
                    break;
                }
                case CacheKey.Seals: {
                    const seal = item as Seal;
                    if (Array.isArray(seal.image)) {
                        seal.image.forEach(media => this.transformMediaArray(media));
                    }
                    break;
                }
            }
        });
    }

    private transformMediaArray(media: { url: string; formats?: Record<string, { url: string }> }): void {
        media.url = transformMediaUrl(media.url);
        if (media.formats) {
            Object.values(media.formats).forEach(fmt => {
                fmt.url = transformMediaUrl(fmt.url);
            });
        }
    }

    /**
     * Sortiert Artikel absteigend nach veröffentlichtem Datum, mit Fallback auf publishedAt und createdAt
     */
    private sortByPublishedDateDesc(items: Article[]): void {
        items.sort((a, b) => {
            const dateA = new Date(a.published_date ?? a.publishedAt ?? a.createdAt ?? "").getTime();
            const dateB = new Date(b.published_date ?? b.publishedAt ?? b.createdAt ?? "").getTime();
            return dateB - dateA;
        });
    }

    public getCachedData<K extends keyof StrapiEntityMap>(key: K): StrapiEntityMap[K][] | undefined {
        return this.cache.get(key)?.data as StrapiEntityMap[K][] | undefined;
    }

    public clearCache(key?: CacheKey): void {
        if (key) this.cache.delete(key);
        else this.cache.clear();
    }

    public async preload(): Promise<void> {
        // Lade alle Cache-Daten parallel
        const tasks: Promise<StrapiEntityMap[keyof StrapiEntityMap][]>[] = [
            this.fetchData("articles", CacheKey.Articles),
            this.fetchData("categories", CacheKey.Categories),
            this.fetchData("team-members", CacheKey.TeamMembers),
            this.fetchData("reason-lists", CacheKey.ReasonLists),
            this.fetchData("partners", CacheKey.Partners),
            this.fetchData("seals", CacheKey.Seals),
        ];
        await Promise.all(tasks);
    }
}

const strapiCache = new StrapiCache();

export default strapiCache;
