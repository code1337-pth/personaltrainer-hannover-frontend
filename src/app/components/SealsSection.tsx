"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Seal = {
  title: string;
  image_url: string;
  link_url: string;
};

export default function SealsSection() {
  const [seals, setSeals] = useState<Seal[]>([]);

  useEffect(() => {
    // JSON-Datei aus dem Public-Ordner abrufen
    fetch("/badges/badges.json")
      .then((res) => res.json())
      .then((data) => setSeals(data))
      .catch((err) => console.error("Fehler beim Laden der Siegel:", err));
  }, []);

  return (
    <section className="py-16 bg-white text-center" id="seals">
      <div className="container mx-auto px-6">
        {/* <h2 className="text-4xl font-bold text-gold mb-4">
          Unsere Auszeichnungen
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Zertifikate, Awards und Siegel, die unsere Qualität belegen
        </p> */}

        {/* Anzeige der Siegel als Grid/Flex */}
        <div className="flex flex-wrap justify-center gap-8">
          {seals.map((seal, index) => (
            <a
              href={seal.link_url}
              target="_blank"
              rel="noreferrer"
              key={index}
              className="group w-48 hover:opacity-80 transition-opacity"
            >
              <div className="relative w-48 h-48 mx-auto">
                <Image
                  src={seal.image_url}
                  alt={seal.title}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="mt-2 text-black font-semibold group-hover:text-gray-700">
                {seal.title}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
