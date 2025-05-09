// src/lib/strapiCache.ts

import {transformHtmlContent, transformMediaUrl} from "@/lib/utils/transformHtml";
import {Partner} from "@/app/types/strapi";

export enum CacheKey {
    Articles = "articles",
    Categories = "categories",
    Tags = "tags",
    TeamMembers = "team-members",
    ReasonLists = "reason-lists",
    Partners = "partners",
    Seals = "seals",
}

type CacheEntry<T> = {
    data: T[];
    timestamp: number;
};

const TTL = 1000 * 60 * 60; // 1 Stunde

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
        let fetchedItems: any[] = [];

        do {
            if (key === CacheKey.Articles) {
                // 1️⃣ Basis-Abfrage (flaches populate)
                const baseParams = new URLSearchParams({
                    "pagination[pageSize]": pageSize.toString(),
                    "pagination[page]": page.toString(),
                    populate: "*",
                });
                const baseUrl = `${process.env.STRAPI_API_URL}/api/${endpoint}?${baseParams.toString()}`;

                console.log(`📡 Fetching base articles from ${baseUrl}`);
                const baseRes = await fetch(baseUrl, {
                    headers: {Authorization: `Bearer ${process.env.STRAPI_TOKEN}`},
                    next: {revalidate: 0},
                });
                if (!baseRes.ok) {
                    const txt = await baseRes.text();
                    throw new Error(`❌ Fehler beim Laden von ${key} (Basis, Seite ${page}): ${txt}`);
                }
                const baseJson = await baseRes.json();
                const baseData = baseJson.data as any[];

                // 2️⃣ Deep-Abfrage nur für sections
                let deepData: any[] = [];
                try {
                    const deepParams = new URLSearchParams({
                        "pagination[pageSize]": pageSize.toString(),
                        "pagination[page]": page.toString(),
                        "populate[sections][populate]": "*",
                    });
                    const deepUrl = `${process.env.STRAPI_API_URL}/api/${endpoint}?${deepParams.toString()}`;
                    console.log(`📡 Fetching deep sections from ${deepUrl}`);
                    const deepRes = await fetch(deepUrl, {
                        headers: {Authorization: `Bearer ${process.env.STRAPI_TOKEN}`},
                        next: {revalidate: 0},
                    });
                    if (deepRes.ok) {
                        const deepJson = await deepRes.json();
                        deepData = deepJson.data as any[];
                    } else {
                        console.warn(`⚠️ Deep fetch failed for ${deepUrl}, status ${deepRes.status}`);
                    }
                } catch (e) {
                    console.warn(`⚠️ Deep fetch error, skipping sections merge: ${e}`);
                }

                // 3️⃣ Merge: falls deepData vorhanden, setze nur sections
                fetchedItems = baseData.map(item => {
                    if (deepData.length) {
                        const deepItem = deepData.find(d => d.id === item.id);
                        if (deepItem && Array.isArray(deepItem.sections)) {
                            item.sections = deepItem.sections;
                        }
                    }
                    return item;
                });
            } else {
                // Normales Populate für andere Endpunkte
                const url = `${process.env.STRAPI_API_URL}/api/${endpoint}` +
                    `?populate=*&pagination[pageSize]=${pageSize}&pagination[page]=${page}`;
                console.log(`📡 Fetching ${url}`);
                const res = await fetch(url, {
                    headers: {Authorization: `Bearer ${process.env.STRAPI_TOKEN}`},
                    next: {revalidate: 0},
                });
                if (!res.ok) {
                    const txt = await res.text();
                    throw new Error(`❌ Fehler beim Laden von ${key} (Seite ${page}): ${txt}`);
                }
                const json = await res.json();
                fetchedItems = json.data as any[];
            }

            // 🔁 Transformation nur für Articles
            if (key === CacheKey.Articles) {
                fetchedItems.forEach((article: any) => {
                    // alter HTML-Content
                    if (article.content) {
                        article.content = transformHtmlContent(article.content);
                    }
                    // featured_image
                    if (article.featured_image?.url) {
                        article.featured_image.url = transformMediaUrl(article.featured_image.url);
                    }
                    // Dynamic Zone sections
                    if (Array.isArray(article.sections)) {
                        article.sections = article.sections.map((sec: any) => {
                            switch (sec.__component) {
                                case "shared.html-content":
                                    if (sec.content) sec.content = transformHtmlContent(sec.content);
                                    return sec;
                                case "shared.markdown-content":
                                    return sec;
                                case "shared.content-with-image":
                                    if (Array.isArray(sec.image)) {
                                        sec.image = sec.image.map((img: any) => ({
                                            ...img,
                                            url: transformMediaUrl(img.url)
                                        }));
                                    }
                                    return sec;
                                case "shared.slider":
                                    if (Array.isArray(sec.items)) {
                                        sec.items = sec.items.map((it: any) => ({
                                            ...it,
                                            image_url: transformMediaUrl(it.image_url)
                                        }));
                                    }
                                    return sec;
                                case "shared.media":
                                    if (sec.file) {
                                        // 1) Haupt‑URL des Bildes
                                        sec.file.url = transformMediaUrl(sec.file.url);

                                        // 2) alle formats URLs ebenfalls umwandeln
                                        if (sec.file.formats) {
                                            Object.values(sec.file.formats).forEach((fmt: any) => {
                                                fmt.url = transformMediaUrl(fmt.url);
                                            });
                                        }
                                    }
                                    return sec;
                                default:
                                    return sec;
                            }
                        });
                    }
                });
            }

            // Medien-URL-Transformation pro CacheKey
            if (key === CacheKey.Categories) {
                fetchedItems.forEach((cat: any) => {
                    if (cat.featured_image?.url) {
                        cat.featured_image.url = transformMediaUrl(cat.featured_image.url);
                    }
                });
            }
            if (key === CacheKey.TeamMembers) {
                fetchedItems.forEach((m: any) => {
                    if (m.image?.url) m.image.url = transformMediaUrl(m.image.url);
                });
            }
            if (key === CacheKey.ReasonLists) {
                fetchedItems.forEach((list: any) => {
                    list.reasons?.forEach((r: any) => {
                        if (r.html_content) r.html_content = transformHtmlContent(r.html_content);
                    });
                });
            }
            if (key === CacheKey.Partners) {
                fetchedItems.forEach((partner: any) => {
                    // partner.logo ist hier ein Array von Media-Objekten
                    if (Array.isArray(partner.logo)) {
                        partner.logo.forEach((media: any) => {
                            // URL des Originals
                            media.url = transformMediaUrl(media.url);
                            // alle Formate umlinken
                            if (media.formats) {
                                Object.values(media.formats).forEach((fmt: any) => {
                                    fmt.url = transformMediaUrl(fmt.url);
                                });
                            }
                        });
                    }
                });
            }
            if (key === CacheKey.Seals) {
                fetchedItems.forEach((seal: any) => {
                    // partner.logo ist hier ein Array von Media-Objekten
                    if (Array.isArray(seal.image)) {
                        seal.image.forEach((media: any) => {
                            // URL des Originals
                            media.url = transformMediaUrl(media.url);
                            // alle Formate umlinken
                            if (media.formats) {
                                Object.values(media.formats).forEach((fmt: any) => {
                                    fmt.url = transformMediaUrl(fmt.url);
                                });
                            }
                        });
                    }
                });
            }

            results = results.concat(fetchedItems as T[]);
            page++;
        } while (fetchedItems.length === pageSize);

        this.cache.set(key, {data: results, timestamp: Date.now()});
        return results as T[];
    }

    public getCachedData<T>(key: CacheKey): T[] | undefined {
        const entry = this.cache.get(key);
        return entry?.data as T[] | undefined;
    }

    public clearCache(key?: CacheKey): void {
        if (key) this.cache.delete(key);
        else this.cache.clear();
    }

    public async preload(): Promise<void> {
        await Promise.all([
            this.fetchData("articles", CacheKey.Articles),
            this.fetchData("categories", CacheKey.Categories),
            this.fetchData("team-members", CacheKey.TeamMembers),
            this.fetchData("reason-lists", CacheKey.ReasonLists),
            this.fetchData("partners", CacheKey.Partners),
            this.fetchData("seals", CacheKey.Seals),
        ]);
    }
}

export default new StrapiCache();
