// app/service/page.tsx
import CategoryHeroSection from "../components/CategoryHeroSection";
import ServicesSection from "@/app/components/ServicesSection";

export default async function ServicePage() {
    return (
        <>
            {/* Hero-Block als Header */}
            <CategoryHeroSection
                title="Übersicht unserer Leistungen"
                description="Hier findest du eine Übersicht all unserer Leistungen ..."
            />

            {/* Layout-Wrapper für den Slider */}
            <div className="container-lg mx-auto">
                {/* BlogSection rendert selbst eine <section> für den Slider */}
                <ServicesSection/>
            </div>
        </>
    );
}
