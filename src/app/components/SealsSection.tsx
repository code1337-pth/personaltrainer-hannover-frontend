"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Typ für dein Siegel
type Seal = {
  title: string;
  src: string;
  link_url: string;
  width: number;
  height: number;
};

export default function SealsSection() {
  const [seals, setSeals] = useState<Seal[]>([]);

  useEffect(() => {
    fetch("/seals/dummySeals.json")
      .then((res) => res.json())
      .then((data) => setSeals(data))
      .catch((err) => console.error("Fehler beim Laden der Siegel:", err));
  }, []);

  return (
    <section className="py-16 bg-white text-center" id="seals">
      <div className="container mx-auto px-6">
        {/* <h2 className="text-4xl font-bold text-gold mb-4">Unsere Auszeichnungen</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Zertifikate, Awards und Siegel, die unsere Qualität belegen
        </p> */}

        <div className="flex flex-wrap justify-center gap-8">
          {seals.map((seal, index) => (
            <a
              href={seal.link_url}
              target="_blank"
              rel="noreferrer"
              key={index}
              className="group hover:opacity-80 transition-opacity flex flex-col items-center"
            >
              {/* 
                Fester Container (z.B. 160×160) 
                - flex items-center justify-center für zentrales Ausrichten
              */}
              <div className="relative w-40 h-40 flex items-center justify-center bg-white">
                <Image
                  src={seal.src}
                  alt={seal.title}
                  width={seal.width}
                  height={seal.height}
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
