import React from "react";

const BlogHeroSection = () => {
  return (
    <section className="relative w-full h-[300px] flex items-center justify-center text-center bg-[var(--contact-bg-color)] mb-10">
      <div className="absolute inset-0 bg-black/30"></div> {/* Dunkle Überlagerung für bessere Lesbarkeit */}
      <div className="relative z-10 px-6">
        <h2 className="text-5xl font-bold text-white">Unser Blog</h2>
        <p className="mt-4 text-lg text-gray-200">
          Spannende Artikel, Tipps & Tricks rund um Fitness, Gesundheit und Ernährung.
        </p>
      </div>
    </section>
  );
};

export default BlogHeroSection;
