// lib/strapiCache.ts

export enum CacheKey {
  Articles = "articles",
  Categories = "categories",
  Tags = "tags",
}

class StrapiCache {
  private cache: Map<CacheKey, any[]> = new Map();

  /**
   * Holt die Daten vom Strapi-Endpoint und cached sie unter dem angegebenen Schlüssel.
   * @param endpoint Der API-Endpunkt (z.B. "articles", "categories", "tags")
   * @param key Der Schlüssel, unter dem die Daten im Cache gespeichert werden sollen
   */
  public async fetchData<T>(endpoint: string, key: CacheKey): Promise<T[]> {
    if (this.cache.has(key)) {
      return this.cache.get(key)! as T[];
    }

    let results: T[] = [];
    let page = 1;
    const pageSize = 100;
    let fetchedItems: T[];

    do {
      const url = `${process.env.STRAPI_API_URL}/api/${endpoint}?populate=*&pagination[pageSize]=${pageSize}&pagination[page]=${page}`;
      console.log("Request:", url);
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`❌ Fehler beim Laden von ${key} (Seite ${page}): ${errorText}`);
      }

      const json = await res.json();
      fetchedItems = json.data as T[];
      results = results.concat(fetchedItems);
      page++;
    } while (fetchedItems.length === pageSize);

    this.cache.set(key, results);
    return results;
  }

  /**
   * Gibt die gecachten Daten für einen bestimmten Schlüssel zurück, sofern vorhanden.
   */
  public getCachedData<T>(key: CacheKey): T[] | undefined {
    return this.cache.get(key) as T[] | undefined;
  }

  /**
   * Löscht den Cache für einen bestimmten Schlüssel oder den gesamten Cache.
   */
  public clearCache(key?: CacheKey): void {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }
}

export default new StrapiCache();
