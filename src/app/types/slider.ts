// nachher in app/types/slider.ts
export interface CategorySliderItem {
    /** Eindeutige ID (Artikel-ID oder Kategorie-ID) */
    id: number | string;
    /** Gruppierungs-Feld (z. B. Kategorie-Name) */
    group: string;
    /** Label, das auf der Karte steht */
    name: string;
    description?: string;
    image_url?: string;
    link?: string;
}
