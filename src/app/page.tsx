import ContactSection from "./components/ContactSection";
import ExperienceSection from "./components/ExperienceSection";
import HeroSection from "./components/HeroSection";
import ReasonsSection from "./components/ReasonSection";
import ReviewsSection from "./components/ReviewsSection";
import ServicesIconsSection from "./components/ServicesIconsSection";
import ServicesSection from "./components/ServicesSection";
import TeamSection from "./components/TeamSection";
import BlogSection from "@/app/components/BlogSection";


export default async function Home() {

    return (
        <>
            <HeroSection id="home"/>
            <TeamSection/>
            <div className="container-lg mx-auto">
                <div className="flex flex-col lg:flex-row gap-8 items-center justify-center m-10">
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
        </>
    );
}
