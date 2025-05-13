import servicesIconsData from "@/../public/services/servicesIcons.json";
import {Apple, BrainCircuit, Building, Dumbbell, LifeBuoy, Users} from "lucide-react";
import React from "react";


export default function ServicesIconsSection() {
    const iconsMap: { [key: string]: React.FC<{ size?: number; className?: string }> } = {
        Dumbbell,
        LifeBuoy,
        Apple,
        Users,
        Building,
        BrainCircuit
    };

    return (
        <section className="py-8 text-center">
            <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-5">
                {servicesIconsData.servicesIcons.map((item, index) => {
                    const IconComponent = iconsMap[item.icon];
                    return (
                        <div
                            key={index}
                            className="group flex flex-col items-center animate-fadeInUp transition-all duration-500"
                        >
                            <div
                                className="w-30 h-30 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                                {IconComponent ? (
                                    <IconComponent size={70} className="text-gold group-hover:animate-bounce"/>
                                ) : null}
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">
                                {item.title}
                            </h3>
                            <p className="text-base px-4">
                                {item.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}