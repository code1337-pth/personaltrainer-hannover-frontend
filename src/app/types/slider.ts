// types/slider.ts
export interface CategorySliderItem {
    id: number;
    category: string; // hier kannst du z. B. den slug speichern
    name: string;
    description?: string;
    image_url?: string;
    link?: string;
}