// src/lib/strapiImageLoader.ts
import {Media} from '@/app/types/strapi';

const STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_API_URL || '';

export function strapiImageLoader(image: Media) {
    return ({width}: { width: number }) => {
        const formats = image.formats || {};
        if (formats.thumbnail && width <= formats.thumbnail.width) {
            return `${STRAPI_HOST}${formats.thumbnail.url}`;
        }
        if (formats.small && width <= formats.small.width) {
            return `${STRAPI_HOST}${formats.small.url}`;
        }
        if (formats.medium && width <= formats.medium.width) {
            return `${STRAPI_HOST}${formats.medium.url}`;
        }
        if (formats.large && width <= formats.large.width) {
            return `${STRAPI_HOST}${formats.large.url}`;
        }
        return `${STRAPI_HOST}${image.url}?w=${width}`;
    };
}