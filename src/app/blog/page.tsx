"use client";

import { JSX, useEffect, useState } from "react";
import CategorySlider, { Item } from "../components/CategorySlider";
import BlogHeroSection from "../components/BlogHeroSection";

export default function BlogPage(): JSX.Element {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetch("/blog/blogCategories.json")
      .then((res) => res.json())
      .then((data) => setItems(data.items)) // Jetzt "items" laden, nicht mehr "categories"
      .catch((error) => console.error("Fehler beim Laden der Blog-Kategorien:", error));
  }, []);

  return (
    <section className="container-lg">
      <BlogHeroSection />
      <CategorySlider 
        title="Blog Kategorien" 
        description="Wähle eine Kategorie" 
        items={items} // Neue Datenstruktur nutzen
      />
    </section>
  );
}
