"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Typ für Kategorien
export type CategoryItem = {
  name: string;
  description?: string;
  image_url: string;
  link?: string; // Falls du individuelle Links haben möchtest
};

interface CategorySliderProps {
  title: string;
  description: string;
  categories: CategoryItem[];
}

const CategorySlider = ({ title, description, categories }: CategorySliderProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Alle");

  const categoryNames = ["Alle", ...new Set(categories.map((c) => c.name))];

  return (
    <section>
      <div className="container mx-auto px-4 text-center">
        <div className="text-center">
          <h2 className="mt-2 text-4xl font-extrabold">{title}</h2>
          <p className="mt-4 text-lg">{description}</p>
        </div>

        {/* Kategorie-Navigation */}
        <nav className="border-b mb-8">
          <ul className="flex flex-wrap gap-4 justify-center">
            {categoryNames.map((cat, idx) => (
              <li
                key={idx}
                className={`py-2 cursor-pointer transition-colors duration-300 ${
                  cat === selectedCategory ? "font-bold border-b-2" : "font-normal hover:underline"
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </nav>

        {/* Swiper-Slider */}
        <div className="relative">
          <Swiper
            className="m-5"
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {categories
              .filter((c) => selectedCategory === "Alle" || c.name === selectedCategory)
              .map((category, idx) => (
                <SwiperSlide key={idx}>
                  <div className="relative group overflow-hidden rounded-xl h-[450px] shadow-lg transition-transform transform hover:scale-105">
                    <div className="relative w-full h-2/3">
                      <Image
                        src={category.image_url}
                        alt={category.name}
                        fill
                        className="object-cover object-center rounded-lg"
                      />
                    </div>
                    <div className="p-4 h-1/3 flex flex-col justify-center bg-[var(--background)] group-hover:bg-[var(--contact-bg-color)] transition-colors duration-300">
                      <h3 className="mt-1 text-xl font-bold">{category.name}</h3>
                      {category.description && <p className="text-sm text-[var(--tag-text-color)]">{category.description}</p>}
                    </div>
                    {category.link && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Link href={category.link} className="text-xl font-bold text-[var(--button-text-color)] bg-[var(--button-bg-color)] px-4 py-2 rounded-lg">Mehr erfahren</Link>
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CategorySlider;
