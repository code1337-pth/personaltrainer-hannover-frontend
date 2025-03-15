"use client";

import { useEffect, useState } from "react";
import CategorySlider, { CategoryItem } from "./CategorySlider";

export default function ServicesSection() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    fetch("/services/servicesData.json")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories)) // Jetzt nur die Kategorien laden
      .catch((error) => console.error("Fehler beim Laden der Services:", error));
  }, []);

  return (
    <CategorySlider
      title="Unsere Leistungen"
      description="Entdecken Sie unser umfangreiches Angebot, das individuell auf Ihre Fitness- und Gesundheitsziele zugeschnitten ist."
      categories={categories}
    />
  );
}
