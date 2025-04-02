"use client"
import { CacheKey } from "@/app/lib/strapiCache";
import BlogHeroSection from "../components/BlogHeroSection";
import CategorySlider, { Item } from "../components/CategorySlider";

import strapiCache from "@/app/lib/strapiCache";
import { convertCategoryToSliderItem } from "../lib/convert"; // Hilfsfunktion zur Umwandlung
import { Category } from "../types/strapi";
import { useState } from "react";

export default async function BlogPage() {
  // Hole Kategorien serverseitig
  const [items, setItems] = useState<Item[]>([]);
  function prependStrapiHostToImages(arg0: string): string | TrustedHTML {
    throw new Error("Function not implemented.");
  }

  // const categories = await strapiCache.fetchData<Category>("categories", CacheKey.Categories);


  // Konvertiere die Kategorien in Slider-Items (entspricht z. B. dem CategorySliderItem-Interface)
  // const sliderItems = categories.map((cat) =>
  //   convertCategoryToSliderItem(cat)
  // );

  return (
    <section className="container-lg">
      <BlogHeroSection
        title="Übersicht unserer Leistungen"
        description="Entdecken Sie unser umfangreiches Angebot, das individuell auf Ihre Fitness- und Gesundheitsziele zugeschnitten ist."
      />
      <CategorySlider
        title="Unsere Leistungen"
        description=""
        items={items}
      />
    </section>
  );
}
