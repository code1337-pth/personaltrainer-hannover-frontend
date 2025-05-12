// src/app/components/PostsSection.tsx
import ArticleCard from './ArticleCard';
import { Article } from '@/app/types/strapi';

interface PostsSectionProps {
    title: string;
    caption: string;
    hrefPrefix: string;
    articles: Article[];
    /** Baut den Link aus einem Artikel-Objekt */
    getLink?: (post: Article) => string;
}

export default function PostsSection({
                                         title,
                                         caption,
                                         hrefPrefix,
                                         articles,
                                         getLink,
                                     }: PostsSectionProps) {
    const buildLink =
        getLink ??
        ((post: Article) => {
            const categorySlug = post.category?.slug ?? '';
            return `/blog/${categorySlug}/${post.slug}`;
        });

    return (
        <section className="py-12">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-2 text-[var(--foreground)]">
                    {title}
                </h2>
                <p className="text-[var(--foreground)] mb-6">
                    {caption}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((post) => (
                        <ArticleCard
                            key={post.id}
                            item={{
                                name: post.title,
                                description:
                                    post.seo?.metaDescription ??
                                    (post.content ? post.content.slice(0, 100) + '…' : ''),
                                img: post.featured_image,
                                link: buildLink(post),
                                published_date: post.published_date,
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
