// Shared Component: SEO
export interface Seo {
    metaTitle: string;
    metaDescription: string;
    canonicalUrl?: string;
    metaKeywords?: string[];
  }
  
  // Media (z. B. für Bilder)
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
  }
  
  // Tag
  export interface Tag {
    id: number;
    name: string;
    slug: string;
  }
  
  // Article
  export interface Article {
    id: number;
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
  }
  