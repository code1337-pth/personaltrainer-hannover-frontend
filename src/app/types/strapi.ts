// src/app/types/strapi.ts

import {CacheKey} from "@/lib/strapiCache";

export type StrapiEntityMap = {
    [CacheKey.Articles]: Article;
    [CacheKey.Categories]: Category;
    [CacheKey.Tags]: Tag;
    [CacheKey.TeamMembers]: TeamMember;
    [CacheKey.ReasonLists]: ReasonList;
    [CacheKey.Partners]: Partner;
    [CacheKey.Seals]: Seal;
};

// Shared Component: SEO
export interface Seo {
    metaTitle: string;
    metaDescription: string;
    canonicalUrl?: string;
    metaKeywords?: string[];
}

// Media (z. B. für Bilder)
export interface MediaFormat {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string | null;
    size: number;
    width: number;
    height: number;
}

export interface Media {
    id: number;
    name: string;
    url: string;
    alternativeText?: string | null;
    caption?: string | null;
    width?: number;
    height?: number;
    mime: string;
    size: number;
    formats?: {
        thumbnail?: MediaFormat;
        small?: MediaFormat;
        medium?: MediaFormat;
        large?: MediaFormat;
    };
}

// Author
export interface Author {
    id: number;
    name: string;
    email: string;
    avatar?: Media;
}

// Category
export interface Category {
    id: number;
    name: string;
    slug: string;
    featured_image?: Media;
    description?: string;
    seo?: Seo;
    blog_category?: boolean;
    active?: boolean;
    featured?: boolean;
    priority?: number;
}

// Tag
export interface Tag {
    id: number;
    name: string;
    slug: string;
}

// -------------------- Dynamic Zone Blocks --------------------

// Html Content Block
export interface HtmlContentBlock {
    __component: "shared.html-content";
    content: string;
}

// Markdown Content Block
export interface MarkdownContentBlock {
    __component: "shared.markdown-content";
    content: string;
}

// Content With Image Block
export interface ContentWithImageBlock {
    __component: "shared.content-with-image";
    content: string;
    image: Media[];
    align_image_left: boolean;
}

// Slider Block
export interface SliderBlock {
    __component: "shared.slider";
    items: SliderItem[];
}

export interface SliderItem {
    id: string;
    img: Media;
    name: string;
    description?: string;
    link?: string;
}


// Review
export interface Review {
    author: string;
    profile_url: string;
    rating: number;
    review_text: string;
    timestamp: string;
};

// Quote Block
export interface QuoteBlock {
    __component: "shared.quote";
    text: string;
    author?: string;
}

// Media Block
export interface MediaBlockType {
    __component: "shared.media";
    id: number;
    /** Achtung: heißt jetzt `file`, kein `media[]` mehr */
    file: Media;
}

// Contact Section Block
export interface ContactSectionBlock {
    __component: "shared.contact-section";
    optional_text?: string;
}

// Union of all section blocks
export type SectionBlock =
    | HtmlContentBlock
    | MarkdownContentBlock
    | ContentWithImageBlock
    | SliderBlock
    | QuoteBlock
    | MediaBlockType   // geändertes Interface
    | ContactSectionBlock;

// -------------------- Article --------------------

// Artikel-Interface inklusive Dynamic Zone
export interface Article {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    content?: string;
    published_date?: string;
    modified_date?: string;
    status: "draft" | "published";
    featured_image?: Media;
    author?: Author;
    category?: Category;
    tags?: Tag[];
    seo?: Seo;
    optimized?: boolean;
    blog_article?: boolean;

    /** Strapi-internes Erstellungs-Datum */
    createdAt?: string;
    /** Strapi-internes Änderungs-Datum */
    updatedAt?: string;
    /** Strapi-interne Veröffentlichungs-Zeit (bei draftAndPublish) */
    publishedAt?: string;

    /** Dynamic-Zone-Blöcke */
    sections?: SectionBlock[];
}


// -------------------- Social Link --------------------
export interface SocialLink {
    id: number;
    platform: "Instagram" | "YouTube" | "WhatsApp" | "LinkedIn" | "Facebook" | "Website";
    url: string;
}

// -------------------- Role --------------------
export interface Role {
    id: number;
    name: string;
    title: string;
}

// -------------------- Team Member --------------------
export interface TeamMember {
    id: number;
    name: string;
    slug: string;
    alt: string;
    image: Media;
    roles: Role[];
    social?: SocialLink[];
    seo?: Seo;
    active: boolean;
    about?: string;
}

// -------------------- Reason List --------------------
export interface Reason {
    id: number;
    html_content: string;
    tags?: string[];
}

export interface ReasonList {
    id: number;
    title: string;
    description: string;
    reasons: Reason[];
    seo?: Seo;
    name: string;
}

export interface Partner {
    id: number;
    name: string;
    link: string;
    logo: Media[];      // ← Array von Media
}

export interface Seal {
    id: number;
    title: string;
    link: string;
    image: Media[];    // ← Array von Media
}
