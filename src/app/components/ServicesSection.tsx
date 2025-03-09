"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

type Service = {
  category: string;
  name: string;
  description: string;
  image_url: string;
};

export default function ServicesNavigation() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Alle");

  useEffect(() => {
    fetch("/services/dummyServices.json")
      .then((res) => res.json())
      .then((data) => setServices(data.services))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  // Alle Kategorien (inkl. "Alle")
  const categories = ["Alle", ...new Set(services.map((s) => s.category))];

  // Filterlogik
  const filteredServices =
    selectedCategory === "Alle"
      ? services
      : services.filter((s) => s.category === selectedCategory);

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className={`${montserrat.className} text-4xl font-bold text-gold mb-2`}>
          Unsere Leistungen
        </h2>

        {/* Horizontale Navigation */}
        <nav className="border-b border-gray-200 mb-8">
          <ul className="flex space-x-4">
            {categories.map((cat, idx) => {
              const isActive = cat === selectedCategory;
              return (
                <li
                  key={idx}
                  className={`py-2 cursor-pointer ${
                    isActive
                      ? "border-b-2 border-gold text-gold font-semibold"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Grid für die Leistungen */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredServices.map((service, idx) => (
            <div key={idx} className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative w-full md:w-48 h-48 flex-shrink-0">
                <Image
                  src={service.image_url}
                  alt={service.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                <h3 className={`${montserrat.className} text-xl font-semibold text-black mb-2`}>
                  {service.name}
                </h3>
                <p className="text-sm text-gray-500 uppercase mb-2">{service.category}</p>
                <p className="text-gray-700">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
