"use client";

import { useEffect, useState } from "react";
import CategorySlider, { Item } from "./CategorySlider";

export default function ServicesSection() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetch("/services/servicesData.json")
      .then((res) => res.json())
      .then((data) => setItems(data.items)) // Jetzt "items" laden, nicht mehr "categories"
      .catch((error) => console.error("Fehler beim Laden der Services:", error));
  }, []);

  return (
    <CategorySlider
      title="Unsere Leistungen"
      description="Entdecken Sie unser umfangreiches Angebot, das individuell auf Ihre Fitness- und Gesundheitsziele zugeschnitten ist."
      items={items} // Anpassung des Props an die neue Struktur
    />
  );
}
