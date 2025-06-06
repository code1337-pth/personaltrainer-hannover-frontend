// components/ExperienceSection.tsx
import React from "react";
import PrinciplesSection from "./PrinciplesSection";
import {HeartPulse, Moon, Scale, Target} from "lucide-react";
import InfoCard from "@/app/components/InfoCard";

const ExperienceSection = () => {
    return (
        <section className="py-12 section-border-b">
            <div className="container-lg mx-auto px-6 ">
                <div className="flex flex-col 2xl:flex-row items-center gap-8">

                    {/* Linke Spalte */}
                    <div className="2xl:w-1/3 relative flex flex-col items-center">
                        <div className="space-y-6 ">
                            <InfoCard icon={Target}>
                                Werde fokussiert und leistungsfähig
                            </InfoCard>
                            <InfoCard icon={Scale}>
                                Erreiche dein Zielgewicht
                            </InfoCard>
                        </div>
                    </div>

                    {/* Mittlere Spalte */}
                    <div className="2xl:w-1/3 relative flex flex-col m-2">
                        <div className="text-center mb-4">
                            <h2 className="text-3xl font-bold">Wir freuen uns mit dir zusammen zu arbeiten!</h2>
                            <p className="mt-2 text-lg">Starte dein persönliches Gesundheitsprojekt mit uns.</p>
                        </div>

                        <div>
                            <ul className="list-disc pl-6 m-4">
                                <li>Möchtest du deine Fitness verbessern?</li>
                                <li>Ein paar Kilos verlieren und dich fitter fühlen?</li>
                                <li>Langfristig gesund und leistungsfähig bleiben?</li>
                            </ul>
                        </div>

                        <p className="m-2">
                            Unser erfahrenes Team unterstützt dich dabei, deine Ziele effektiv zu erreichen - mit
                            individuellem <strong>Personal Training</strong>,
                            gezielter <strong>Körperanalyse</strong> und vielfältigen Trainingsmöglichkeiten.
                        </p>

                        <p className="m-2">
                            Unsere Angebote umfassen auch spezialisierte Trainingsprogramme
                            für <strong>Triathlon</strong>, <strong>(Kick-)Boxen</strong> und <strong>CrossTraining</strong>,
                            die auf deine spezifischen Bedürfnisse zugeschnitten sind.
                        </p>

                        <p className="m-2">
                            Für diejenigen, die die Dynamik der Gruppe schätzen, bieten wir zudem
                            verschiedene <strong>Gruppentrainings</strong> an,
                            darunter <strong>Yoga</strong>, <strong>Bootcamp</strong> und klassisches Gruppentraining -
                            motivierend und effektiv in der Gemeinschaft.
                        </p>

                        <p className="m-2">
                            Um maximale Flexibilität zu gewährleisten, bieten wir bei Bedarf auch <strong>Online
                            Personal Training</strong> per Webcam an.
                        </p>

                        <p className="m-2 mt-5 italic font-semibold">
                            Gesundheit ist dein wichtigstes Gut - eine Investition, die sich lohnt. Gemeinsam sorgen wir
                            dafür, dass du ein gesundes, vitales und beschwerdefreies Leben bis ins hohe Alter genießen
                            kannst.
                        </p>
                    </div>

                    {/* Rechte Spalte */}
                    <div className="2xl:w-1/3 relative flex flex-col items-center">
                        <div className="space-y-6">
                            <InfoCard icon={HeartPulse}>
                                Lebe ein fittes und gesundes Leben
                            </InfoCard>
                            <InfoCard icon={Moon}>
                                Verbessere deine Schlafeigenschaften
                            </InfoCard>
                        </div>
                    </div>
                </div>
            </div>
            <PrinciplesSection/>

        </section>
    );
};

export default ExperienceSection;
