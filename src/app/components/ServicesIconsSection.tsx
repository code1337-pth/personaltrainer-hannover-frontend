"use client";

import { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import { Dumbbell, LifeBuoy, Apple, Users, Building } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

type ServiceIcon = {
  title: string;
  description: string;
  icon: string;
};

export default function ServicesIconsSection() {
  const [iconsData, setIconsData] = useState<ServiceIcon[]>([]);

  useEffect(() => {
    fetch("/services/servicesIcons.json")
      .then((res) => res.json())
      .then((data) => setIconsData(data.servicesIcons))
      .catch((error) =>
        console.error("Error fetching services icons:", error)
      );
  }, []);

  // Mapping von Icon-Namen zu den entsprechenden Lucide-Komponenten
  const iconsMap: { [key: string]: React.FC<{ size?: number; className?: string }> } = {
    Dumbbell: Dumbbell,
    LifeBuoy: LifeBuoy,
    Apple: Apple,
    Users: Users,
    Building: Building,
  };

  return (
    <section className="py-12 bg-white text-center">
      <div className="container mx-auto px-6">
        <h2 className={`${montserrat.className} text-4xl font-bold text-gold mb-4`}>
          Unsere Leistungen
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-12">
          Entdecken Sie unser Angebot – von Personal Training über Ernährungsberatung bis zu Firmenfitness.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {iconsData.map((item, index) => {
            const IconComponent = iconsMap[item.icon];
            return (
              <div key={index} className="flex flex-col items-center">
                {/* Kreisförmiger Icon-Hintergrund mit fixen Maßen */}
                <div className="w-20 h-20 flex items-center justify-center bg-sky-100 rounded-full mb-6">
                  {IconComponent ? (
                    <IconComponent size={40} className="text-gold" />
                  ) : null}
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm px-4">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
