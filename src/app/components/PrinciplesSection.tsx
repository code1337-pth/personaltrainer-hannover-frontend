"use client";

import {Calendar, ShieldCheck, Smile, ThumbsUp, UserCheck} from "lucide-react";

export default function PrinciplesSection() {
    return (
        <section className="py-6 mt-10">
            <div className="container-lg mx-auto px-4">
                <h2 className="text-center text-3xl font-bold mb-8">UNSERE GRUNDSÄTZE</h2>

                {/* Container für Kreise - Jetzt horizontal */}
                <div className="flex flex-wrap justify-center gap-12">
                    {/* Prinzipien-Elemente */}
                    {[
                        {
                            icon: ShieldCheck,
                            title: "Schonendes Training",
                            text: "Wir achten auf eine saubere Ausführung Ihres Trainings."
                        },
                        {
                            icon: Calendar,
                            title: "Flexibilität",
                            text: "Wir passen uns Ihrem Terminplan an und finden individuelle Lösungen."
                        },
                        {
                            icon: UserCheck,
                            title: "Individualität",
                            text: "Wir erstellen für Sie ein personalisiertes Trainingsprogramm."
                        },
                        {
                            icon: Smile,
                            title: "Spaß",
                            text: "Wir gestalten Ihr Training interessant und abwechslungsreich."
                        },
                        {
                            icon: ThumbsUp,
                            title: "Motivation",
                            text: "Wir sind Ihr persönlicher Motivator, damit Sie Ihre Ziele erreichen."
                        },
                    ].map(({icon: Icon, title, text}, index) => (
                        <div
                            key={index}
                            className="group flex flex-col items-center text-center max-w-xs animate-fadeInUp transition-all duration-500"
                        >
                            <div
                                className="w-20 h-20 border-4 border-[var(--color-gold)] rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg">
                                <Icon className="w-8 h-8 text-[var(--color-gold)] group-hover:animate-bounce"/>
                            </div>
                            <h3 className="mt-4 text-lg font-bold uppercase">{title}</h3>
                            <p className="mt-2 text-[var(--tag-text-color)]">{text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
