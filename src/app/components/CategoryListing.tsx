// src/app/components/CategoryListing.tsx – Server-Komponente
import { Article } from '../types/strapi';
import ArticleCard from './ArticleCard';
import CategoryHeroSection from './CategoryHeroSection';
import PaginationControls from './PaginationControls';
import SearchInput from './SearchInput';

export enum CategoryType {
    Blog = "/blog",
    Service = "/service",
}

export type BreadcrumbItem = {
    id: string;
    name: string;
    href: string;
};

type CategoryListingProps = {
    name: string;
    slug: string;
    details?: string;
    image?: string;
    articles: Article[]; // Alle Artikel wurden serverseitig geladen
    caption: string;
    categoryType: CategoryType;
    /** searchParams aus der URL, z. B. ?query=...&page=... */
    searchParams?: {
        query?: string;
        page?: string;
    };
};

const PAGE_SIZE = 9; // Anzahl Artikel pro Seite

const CategoryListing = ({
    name,
    slug,
    details,
    image,
    articles,
    categoryType = CategoryType.Blog,
    caption = "Blog",
    searchParams,
}: CategoryListingProps) => {
    // Lese Suchquery und Seitennummer aus den URL-Parametern; Standardwerte verwenden
    const searchQuery = searchParams?.query || "";
    const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;

    // Serverseitiges Filtern der Artikel
    const filteredArticles = searchQuery
        ? articles.filter(
            (a) =>
                a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (a.content && a.content.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        : articles;

    // Berechne Gesamtseitenzahl und wähle die auf der aktuellen Seite anzuzeigenden Artikel
    const totalPages = Math.ceil(filteredArticles.length / PAGE_SIZE);
    const startIndex = (page - 1) * PAGE_SIZE;
    const paginatedArticles = filteredArticles.slice(startIndex, startIndex + PAGE_SIZE);

    return (
        <section className="container-lg">
            <CategoryHeroSection
                title={`${caption} – ${name}`}
                description={`Alle Beiträge zum Thema ${name}`}
                breadcrumb={[
                    { name: caption.toLowerCase(), href: categoryType },
                    { name: slug, href: `${categoryType}/${slug}` },
                ]}
            />

            {/* Clientseitige Suchkomponente */}
            <SearchInput defaultQuery={searchQuery} />

            {/* Pagination oberhalb der Artikelliste */}
            <PaginationControls
                currentPage={page}
                totalPages={totalPages}
                baseUrl={`${categoryType}/${slug}`}
                currentQuery={searchQuery}
            />

            {paginatedArticles.length > 0 ? (
                <div className="container-lg text-lg mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mt-6">
                    {paginatedArticles.map((article, index) => (
                        <ArticleCard
                            key={article.slug || `${index}`}
                            item={{
                                name: article.title || "Ohne Titel",
                                description:
                                    article.seo?.metaDescription ||
                                    (article.content ? article.content.slice(0, 100) + "..." : ""),
                                image_url: article.featured_image?.url || "/public/default.jpg",
                                link: `${categoryType}/${slug}/${article.slug}`,
                                published_date: article.published_date,
                            }}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p>Keine Artikel gefunden.</p>
                </div>
            )}

            {/* Pagination erneut unterhalb der Artikelliste */}
            <PaginationControls
                currentPage={page}
                totalPages={totalPages}
                baseUrl={`${categoryType}/${slug}`}
                currentQuery={searchQuery}
            />
        </section>
    );
};

export default CategoryListing;
