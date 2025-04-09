import ContactSection from "./components/ContactSection";
import ExperienceSection from "./components/ExperienceSection";
import HeroSection from "./components/HeroSection";
import ReviewsSection from "./components/ReviewsSection";
import ServicesIconsSection from "./components/ServicesIconsSection";
import ServicesSection from "./components/ServicesSection";
import TeamSection from "./components/TeamSection";
import ReasonsSection from "./components/ReasonSection";


export default async function Home() {

    return (
        <div>
            <main>
                <HeroSection id="home"/>
                <TeamSection/>
                <div className="container-lg mx-auto">
                    <div className="flex flex-col md:flex-row gap-8 items-center justify-center m-10">
                        {/* Linke Spalte */}
                        <div className="w-full md:w-1/2">
                            <ServicesIconsSection/>
                        </div>
                        {/* Rechte Spalte */}
                        <div className="w-full md:w-1/2">
                            <ReasonsSection/>
                        </div>
                    </div>
                </div>
                <ContactSection id="contact"/>
                <ExperienceSection/>
                <ReviewsSection/>
                <ServicesSection/>
            </main>
        </div>
    );
}
