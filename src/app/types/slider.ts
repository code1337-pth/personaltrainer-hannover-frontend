// nachher in app/types/slider.ts
import {Media} from "@/app/types/strapi";

export interface CategorySliderItem {
    /** Eindeutige ID (Artikel-ID oder Kategorie-ID) */
    id: number | string;
    /** Gruppierungs-Feld (z. B. Kategorie-Name) */
    group: string;
    /** Label, das auf der Karte steht */
    name: string;
    description?: string;
    img?: Media;
    link?: string;
}
