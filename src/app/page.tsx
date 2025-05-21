// src/app/page.tsx
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://personaltrainer-hannover.de";

import ContactSection from "./components/ContactSection";
import ExperienceSection from "./components/ExperienceSection";
import HeroSection from "./components/HeroSection";
import ReasonsSection from "./components/ReasonSection";
import ReviewsSection from "./components/ReviewsSection";
import ServicesIconsSection from "./components/ServicesIconsSection";
import ServicesSection from "./components/ServicesSection";
import TeamSection from "./components/TeamSection";
import BlogSection from "@/app/components/BlogSection";
import {Article} from "@/app/types/strapi";
import strapiCache, {CacheKey} from "@/lib/strapiCache";
import PostsSection from "@/app/components/PostsSection";

export default async function Home() {
    // 1) Lade alle Artikel (bereits im RAM durch preload im Layout)
    const allArticles = await strapiCache.fetchData('articles', CacheKey.Articles);

    // 2) Filtere nur veröffentlichte Artikel
    const published = (allArticles as Article[]).filter(a => a.status === 'published');

    // 3) Die 3 neuesten News (category.slug === 'news')
    const newsPosts = published
        .filter(a => a.category?.slug === 'news')
        .sort((a, b) => {
            const dateA = new Date(a.published_date ?? a.publishedAt ?? a.createdAt!).getTime();
            const dateB = new Date(b.published_date ?? b.publishedAt ?? b.createdAt!).getTime();
            return dateB - dateA;
        })
        .slice(0, 3);

    // 4) Die 3 neuesten Blog-Beiträge (ohne News)
    const blogPosts = published
        .filter(a => a.category?.slug !== 'news' && a.blog_article != false)
        .sort((a, b) => {
            const dateA = new Date(a.published_date ?? a.publishedAt ?? a.createdAt!).getTime();
            const dateB = new Date(b.published_date ?? b.publishedAt ?? b.createdAt!).getTime();
            return dateB - dateA;
        })
        .slice(0, 3);

    // 5) Drei zufällige Blog-Beiträge (ohne News)
    const blogPool = published.filter(a => a.category?.slug !== 'news' && a.blog_article != false);
    const randomPosts = blogPool
        .sort(() => 0.5 - Math.random()) // Shuffle
        .slice(0, 3);

    return (
        <>
            <HeroSection id="home"/>
            <TeamSection/>
            <div className="container-lg mx-auto">
                <div className="flex flex-col lg:flex-row gap-7 items-center justify-center m-10">
                    {/* Linke Spalte */}
                    <div className="w-full lg:w-1/2">
                        <ServicesIconsSection/>
                    </div>
                    {/* Rechte Spalte */}
                    <div className="w-full lg:w-1/2">
                        <ReasonsSection/>
                    </div>
                </div>
            </div>
            <ContactSection id="contact"/>
            <ExperienceSection/>
            <ReviewsSection/>
            <ServicesSection/>
            <BlogSection/>

            {/* Neueste Blog-Beiträge */}
            <PostsSection
                title="Neueste Blog-Beiträge"
                caption="Unsere frischesten Artikel und Tipps"
                articles={blogPosts}
                getLink={(post) => `/blog/${post.category?.slug}/${post.slug}`}
            />

            {/* Zufällige Blog-Beiträge */}
            <PostsSection
                title="Ausgewählte Beiträge"
                caption="Entdecke weitere spannende Artikel"
                articles={randomPosts}
                getLink={(post) => `/blog/${post.category?.slug}/${post.slug}`}
            />

            {/* Aktuelle News */}
            <PostsSection
                title="Aktuelle News"
                caption="Bleib auf dem Laufenden mit den letzten Meldungen"
                articles={newsPosts}
            />
            {/* Unternehmensdaten */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        "name": "Markus Kaluza - Premium Personal Training + Team",
                        "image": `${siteUrl}/personaltrainer-hannover-figure.svg`,
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Hannoversche Str. 82",
                            "addressLocality": "Isernhagen",
                            "postalCode": "30916 ",
                            "addressCountry": "DE"
                        },
                        "telephone": "+491744010440",
                        "url": siteUrl
                    })
                }}
            />
        </>
    );
}
