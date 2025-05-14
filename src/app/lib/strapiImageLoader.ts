// src/lib/strapiImageLoader.ts
import {Media} from '@/app/types/strapi';

const STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_API_URL || '';

export function strapiImageLoader(image: Media) {
    return ({width}: { width: number }) => {
        const formats = image.formats || {};
        if (formats.thumbnail && width <= formats.thumbnail.width) {
            const url = `${STRAPI_HOST}${formats.thumbnail.url}`;
            console.log("[strapiImageLoader] Thumbnail-URL:", url);
            return url;
        }
        if (formats.small && width <= formats.small.width) {
            const url = `${STRAPI_HOST}${formats.small.url}`;
            console.log("[strapiImageLoader] Small-URL:", url);
            return url;
        }
        if (formats.medium && width <= formats.medium.width) {
            const url = `${STRAPI_HOST}${formats.medium.url}`;
            console.log("[strapiImageLoader] Medium-URL:", url);
            return url;
        }
        if (formats.large && width <= formats.large.width) {
            const url = `${STRAPI_HOST}${formats.large.url}`;
            console.log("[strapiImageLoader] Large-URL:", url);
            return url;
        }
        const url = `${STRAPI_HOST}${image.url}?w=${width}`;
        console.log("[strapiImageLoader] Original-URL:", url);
        return url;
    };
}