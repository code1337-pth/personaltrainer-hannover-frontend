// src/app/impressum/page.tsx
import CategoryHeroSection from "@/app/components/CategoryHeroSection";
import strapiCache, {CacheKey} from "@/lib/strapiCache";
import React from "react";
import PartnerSlider from "@/app/components/PartnerSlider";

export const metadata = {
    title: "Partner",
    description: "Partner von Markus - Kaluza Premium Personal Training + Team",
};

export default async function PartnerPage() {
    const partners = await strapiCache.fetchData(CacheKey.Partners, CacheKey.Partners);
    console.log("fixed image?", partners[0].logo[0])
    console.log("fixed image?", partners[0].logo[0]["url"])
    console.log("fixed image?", partners[0].logo[0].url)
    return (
        <>
            {/* Hero-Block als Header */}
            <CategoryHeroSection
                title="Partner"
                description="Markus - Kaluza Premium Personal Training + Team"
            />

            <div className="container mx-auto blog-article">
                <PartnerSlider partners={partners}/>
            </div>
        </>
    );
}
