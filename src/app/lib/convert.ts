// lib/convert.ts
import {Category} from "../types/strapi";
import {CategorySliderItem} from "../types/slider";
import {NavItem} from "../types/navigation";

export function convertCategoryToSliderItem(category: Category): CategorySliderItem {
    return {
        id: category.id,
        // group bestimmt den Tab-Namen
        group: category.name,
        name: category.name,
        description: category.description,
        img: category.featured_image,
        link: `/blog/${category.slug}`,
    };
}

export function categoryToNavItem(category: Category, basePath: string = "/blog"): NavItem {
    return {
        name: category.name,
        href: `${basePath}/${category.slug}`
    };
}

export function categoriesToNavItems(categories: Category[], basePath: string = "/blog"): NavItem[] {
    return categories.map(category => categoryToNavItem(category, basePath));
}