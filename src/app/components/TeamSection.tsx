import strapiCache, {CacheKey} from "@/lib/strapiCache";
import React from "react";
import TeamMemberCard from "@/app/components/TeamMemberCard";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://personaltrainer-hannover.de";
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || "https://deine-strapi-url.de";


export const dynamic = "force-dynamic";
export default async function TeamSection() {
    const teamMembers = (await strapiCache.fetchData('team-members', CacheKey.TeamMembers)).filter(member => member.active);
    // Berechne die Anzahl an Jahren seit 2001
    const currentYear = new Date().getFullYear();
    const experienceYears = currentYear - 2001;

    // Strukturiertes Daten-Array für alle Teammitglieder
    const teamJsonLd = teamMembers.map(member => ({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": member.name,
        "jobTitle": member.roles?.map(r => r.name).join(", "),
        "image": member.image?.url
            ? member.image.url.startsWith("http")
                ? member.image.url
                : strapiUrl + member.image.url
            : undefined,
        "sameAs": member.social?.map(s => s.url),
        "url": siteUrl
    }));

    return (
        <section id="team" className="container-lg text-lg mx-auto px-6 py-12 text-center">
            <h2 className="text-4xl font-bold">Unser Team</h2>

            <div className="container-lg mx-auto px-6 ">
                <div className="flex flex-col 2xl:flex-row items-center gap-8">

                    {/* Linke Spalte */}
                    <div className="2xl:w-1/3 relative flex flex-col items-center">
                        <div className="relative flex flex-col items-center text-center 2xl:text-left">
                            {/* Erfahrung (10+ Years) */}
                            <div className="text-6xl font-bold">{experienceYears}+</div>
                            <div className="mt-2 text-xl">Jahre Trainer Erfahrung</div>
                        </div>
                    </div>

                    {/* Mittlere Spalte */}
                    <div className="2xl:w-1/3 relative flex flex-col  m-2">
                        <p className="mt-4 max-w-3xl mx-auto">
                            Unser erfahrenes Team aus professionellen Personal Trainern steht dir zur Seite, um
                            deine individuellen
                            Ziele zu erreichen. Wir bringen langjährige Erfahrung in den Bereichen Fitness,
                            Ernährung und Coaching
                            mit.
                        </p>
                    </div>

                    {/* Rechte Spalte */}
                    <div className="2xl:w-1/3 relative flex flex-col items-center">
                        <div className="relative flex flex-col items-center text-center 2xl:text-left">
                            {/* Erfahrung (10+ Years) */}
                            <div className="text-6xl font-bold">2001</div>
                            <div className="mt-2 text-xl">Gründungsjahr</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6">
                {teamMembers.map((member, index) => (
                    <TeamMemberCard member={member} key={index}/>
                ))}
            </div>
            {/* Strukturierte Daten für alle Teammitglieder */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(teamJsonLd)
                }}
            />
        </section>
    );
}
