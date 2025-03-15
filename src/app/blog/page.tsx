"use client";

import { JSX, useEffect, useState } from "react";
import CategorySlider, { CategoryItem } from "../components/CategorySlider";
import BlogHeroSection from "../components/BlogHeroSection";

export default function BlogPage() : JSX.Element {
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    fetch("/blog/blogCategories.json")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories))
      .catch((error) => console.error("Fehler beim Laden der Blog-Kategorien:", error));
  }, []);

  return (
    <section className="container-lg">
      <BlogHeroSection/>
      <h1 className="text-4xl font-extrabold text-center">Blog</h1>
      <p className="text-lg text-center mt-2">
        Entdecke spannende Artikel zu verschiedenen Themen.
      </p>
      <CategorySlider title="Blog Kategorien" description="Wähle eine Kategorie" categories={categories} linkPrefix="/blog/" />
    </section>
  );
}
