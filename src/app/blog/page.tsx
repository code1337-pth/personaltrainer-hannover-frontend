// app/blog/page.tsx
import CategoryHeroSection from "../components/CategoryHeroSection";
import BlogSection from "@/app/components/BlogSection";

export const metadata = {
    title: "Blog | Markus Kaluza - Premium Personal Training + Team",
    description: "Alle Blog-Kategorien und Artikel rund um Fitness, Gesundheit und Training.",
};

export default async function BlogPage() {
    return (
        <>
            {/* Hero-Block als Header */}
            <CategoryHeroSection
                title="Übersicht der Blog-Kategorien"
                description="Hier findest du eine Übersicht all unserer Blog-Kategorien …"
            />

            {/* Layout-Wrapper für den Slider */}
            <div className="container-lg mx-auto">
                {/* BlogSection rendert selbst eine <section> für den Slider */}
                <BlogSection />
            </div>
        </>
    );
}
