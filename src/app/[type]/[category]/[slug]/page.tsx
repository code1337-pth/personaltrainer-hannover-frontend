// src/app/[type]/[category]/[slug]/page.tsx
import {notFound} from 'next/navigation';
import Script from 'next/script';
import Image from 'next/image';
import CategoryHeroSection from '@/app/components/CategoryHeroSection';
import HtmlContentBlock from '@/app/components/HtmlContentBlock';
import MarkdownContentBlock from '@/app/components/MarkdownContentBlock';
import ContentWithImageBlock from '@/app/components/ContentWithImageBlock';
import SliderBlock from '@/app/components/SliderBlock';
import QuoteBlock from '@/app/components/QuoteBlock';
import MediaBlock from '@/app/components/MediaBlock';
import ContactSectionBlock from '@/app/components/ContactSectionBlock';
import {getStructuredData} from '@/lib/metadata';
import StrapiCache, {CacheKey} from '@/lib/strapiCache';
import {MediaBlockType, SectionBlock} from '@/app/types/strapi';

type Props = {
    params: Promise<{
        type: 'blog' | 'service';
        category: string;
        slug: string;
    }>;
};

export default async function ArticlePage({params}: Props) {
    const {type, category, slug} = await params;
    const basePath = type === 'blog' ? '/blog' : '/service';
    const caption = type === 'blog' ? 'Blog' : 'Leistungen';

    // Kategorie validieren
    const allCategories = await StrapiCache.fetchData(
        'categories',
        CacheKey.Categories
    );
    const isBlog = type === 'blog';
    const categoryObj = allCategories.find(c =>
        isBlog
            ? c.slug === category && c.blog_category
            : c.slug === category && !c.blog_category && c.active
    );
    if (!categoryObj) return notFound();

    // Artikel laden & filtern
    const allArticles = await StrapiCache.fetchData(
        'articles',
        CacheKey.Articles
    );
    const article = allArticles.find(a =>
        a.slug === slug &&
        a.category?.slug === category &&
        a.status === 'published' &&
        (isBlog ? true : !a.blog_article)
    );
    if (!article) return notFound();

    const structuredData = getStructuredData(article);

    return (
        <>
            <CategoryHeroSection
                title={article.title}
                breadcrumb={[
                    {name: caption, href: basePath},
                    {name: article.category?.name ?? 'Unkategorisiert', href: `${basePath}/${category}`},
                    {name: article.title, href: ''}
                ]}
            />

            <Script id="structured-data" type="application/ld+json" strategy="afterInteractive">
                {JSON.stringify(structuredData)}
            </Script>

            <article className="blog-article container mx-auto px-4 prose">
                {article.featured_image?.url && (
                    <div className="flex justify-center mb-6 overflow-hidden rounded-lg">
                        <Image
                            src={article.featured_image.url}
                            alt={article.title}
                            width={800}
                            height={500}
                            loading={"lazy"}
                            className="zoom-effect max-h-[500px] w-auto object-contain"
                        />
                    </div>
                )}

                {isBlog && article.published_date && (
                    <p className="text-sm text-gray-500 mb-2">
                        Veröffentlicht am {new Date(article.published_date).toLocaleDateString('de-DE')}
                    </p>
                )}

                {/* Dynamic Zone */}
                {article.sections && article.sections.length > 0 ? (
                    article.sections.map((sec: SectionBlock, i) => {
                        switch (sec.__component) {
                            case 'shared.html-content':
                                return <HtmlContentBlock key={i} content={sec.content}/>;
                            case 'shared.markdown-content':
                                return <MarkdownContentBlock key={i} content={sec.content}/>;
                            case 'shared.content-with-image':
                                return (
                                    <ContentWithImageBlock
                                        key={i}
                                        content={sec.content}
                                        images={sec.image}
                                        alignLeft={sec.align_image_left}
                                    />
                                );
                            case 'shared.slider':
                                return <SliderBlock key={i} items={sec.items}/>;
                            case 'shared.quote':
                                return <QuoteBlock key={i} quoteText={sec.text} author={sec.author}/>;
                            case 'shared.media': {
                                const mediaSection = sec as MediaBlockType;
                                return <MediaBlock key={i} file={mediaSection.file}/>;
                            }
                            case 'shared.contact-section':
                                return <ContactSectionBlock key={i} text={sec.optional_text}/>;
                            default:
                                return null;
                        }
                    })
                ) : (
                    // Fallback, wenn keine Sections da sind:
                    article.content && <HtmlContentBlock content={article.content}/>
                )}

                {/* Tags */}
                {article.tags?.length ? (
                    <div className="tags mt-8">
                        <h3 className="text-lg font-semibold mb-2">Tags:</h3>
                        <div className="flex flex-wrap gap-2">
                            {article.tags.map(tag => (
                                <a
                                    key={tag.slug}
                                    href={`${basePath}/tag/${tag.slug}`}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold"
                                >
                                    #{tag.name}
                                </a>
                            ))}
                        </div>
                    </div>
                ) : null}
            </article>

            <ContactSectionBlock/>
        </>
    );
}
