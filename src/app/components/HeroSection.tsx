// components/HeroSection.tsx

import RotatingShape from "./RotatingShape";
import Link from "next/link";
import React from "react";

type HeroSectionProps = {
    id?: string;
};

export default async function HeroSection(props: HeroSectionProps) {
    const resolvedParams = props;

    return (
        <section
            {...(resolvedParams.id ? {id: resolvedParams.id} : {})}
            className="relative border-b border-gray-300 bg-no-repeat bg-cover bg-top-50"
            style={{backgroundImage: "var(--hero-image)"}}
        >
            <div className="container mx-auto px-6 py-16 sm:py-24 md:py-32 flex flex-col md:flex-row items-center">
                {/* RotatingShape: Auf kleinen Bildschirmen zuerst, auf größeren rechts */}
                <div className="order-1 md:order-2 md:w-1/2 flex items-center justify-center mb-8 md:mb-0">
                    <RotatingShape/>
                </div>
                {/* Text: Auf kleinen Bildschirmen als zweites, auf größeren links */}
                <div className="order-2 md:order-1 md:mr-20">
                    <h1 className="mt-2 text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
                        <span className="text-gold">Erreiche deine Topform</span>
                        <br/>
                        <span className="black:text-white">
            und steigere deine Lebensqualität
        </span>
                    </h1>
                    <p className="mt-6 text-sm sm:text-lg md:text-2xl">
                        Mit unserer ganzheitlichen Trainingsstrategie begleiten wir dich auf dem Weg zu deinem Ziel.
                        Unser erfahrenes Team erstellt für dich einen maßgeschneiderten Plan, der deine Muskulatur
                        stärkt,
                        deine Leistungsfähigkeit steigert und dir ein neues, beschwerdefreies Körpergefühl verleiht –
                        für
                        ein starkes und gesundes Leben.
                    </p>
                    <p className="mt-4 text-lg sm:text-xl md:text-2xl">
                        Starte jetzt und entdecke dein volles Potenzial!
                    </p>
                    <Link hreflang="de" href="/#contact" className="group action-button mt-6 animate-pulse">
                        <span>Termin sichern</span>
                        <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
};
