"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {CategorySliderItem} from "@/app/types/slider";
import FeaturedImage from "@/app/components/FeaturedImage";

interface CategorySliderProps {
    title: string;
    description?: string;
    items: CategorySliderItem[];
}

const CategorySlider = ({title, description, items}: CategorySliderProps) => {
    const [selectedGroup, setSelectedGroup] = useState("Alle");
    const [showNav, setShowNav] = useState(false);

    // eigene Funktion, um anhand der Breite slidesPerView zu bestimmen
    const getSpv = () => {
        const w = window.innerWidth;
        if (w >= 1024) return 4;
        if (w >= 768) return 3;
        if (w >= 640) return 2;
        return 1;
    };

    const groupNames = ["Alle", ...Array.from(new Set(items.map(i => i.group)))];
    const displayed = selectedGroup === "Alle"
        ? items
        : items.filter(i => i.group === selectedGroup);

    // prüfen, ob wir Navigation brauchen
    useEffect(() => {
        const check = () => {
            setShowNav(displayed.length > getSpv());
        };
        // initial
        check();
        // bei resize nachprüfen
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, [selectedGroup, items, displayed]);

    return (
        <section className="py-12 bg-[var(--background)]">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-extrabold mb-2">{title}</h2>
                {description && <p className="text-lg mb-6">{description}</p>}

                {/* Tabs */}
                <nav className="border-b mb-8">
                    <ul className="flex flex-wrap justify-center gap-6">
                        {groupNames.map(g => (
                            <li
                                key={g}
                                className={`pb-2 cursor-pointer transition-colors ${
                                    g === selectedGroup ? "border-b-2 font-semibold" : "hover:text-gray-400"
                                }`}
                                onClick={() => setSelectedGroup(g)}
                            >
                                {g}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Slider */}
                <div className="relative">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={24}
                        breakpoints={{
                            0: {slidesPerView: 1},
                            640: {slidesPerView: 2},
                            768: {slidesPerView: 3},
                            1024: {slidesPerView: 4},
                        }}
                        navigation={showNav}
                        pagination={{clickable: true}}
                    >
                        {displayed.map(item => (
                            <SwiperSlide key={item.id}>
                                <Link href={item.link ?? "#"}>
                                    {item.img && (
                                        <FeaturedImage
                                            img={item.img}
                                            alt={item.img.alternativeText ?? item.name}
                                            containerClassName="flex flex-col aspect-video justify-center overflow-hidden rounded-lg"
                                            className="zoom-effect"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        />
                                    )}
                                    <h3 className="p-4 text-xl font-bold mb-2">{item.name}</h3>
                                </Link>
                                <div className="bg-[var(--background)]">
                                    {item.description && (
                                        <p className="text-sm text-[var(--tag-text-color)]">
                                            {item.description}
                                        </p>
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
