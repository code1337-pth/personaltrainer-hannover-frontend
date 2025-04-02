"use client";

import { useEffect, useState } from "react";
import { Dumbbell, LifeBuoy,BrainCircuit, Apple, Users, Building } from "lucide-react";

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
    BrainCircuit: BrainCircuit
  };

  return (
    <section className="py-8 text-center">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-5">
          {iconsData.map((item, index) => {
            const IconComponent = iconsMap[item.icon];
            return (
              <div key={index} className="flex flex-col items-center">
                {/* Kreisförmiger Icon-Hintergrund mit fixen Maßen */}
                <div className="w-30 h-30 flex items-center justify-center rounded-full mb-6">
                  {IconComponent ? (
                    <IconComponent size={70} className="text-gold" />
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
      </div>
    </section>
  );
}
