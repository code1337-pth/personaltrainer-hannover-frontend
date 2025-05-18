// src/app/components/SliderBlock.tsx
"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import FeaturedImage from "@/app/components/FeaturedImage";
import {SliderItem} from "@/app/types/strapi";


export interface SliderBlockProps {
    items: SliderItem[];
}

export default function SliderBlock({items}: SliderBlockProps) {
    const [showNav, setShowNav] = useState(false);

    const getSpv = () => {
        const w = window.innerWidth;
        if (w >= 1024) return 4;
        if (w >= 768) return 3;
        if (w >= 640) return 2;
        return 1;
    };

    useEffect(() => {
        const update = () => setShowNav(items.length > getSpv());
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, [items]);

    return (
        <div className="relative my-8">
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
                {items.map((item) => (
                    <SwiperSlide key={item.id}>
                        <Link href={item.link ?? "#"} className="block h-full group">
                            <div className="h-[450px] flex flex-col overflow-hidden rounded-lg shadow-lg">
                                {item.img && (
                                    <FeaturedImage
                                        img={item.img}
                                        alt={item.img.alternativeText ?? item.name}
                                        quality={75}
                                        containerClassName={"relative w-full aspect-video"}
                                        className="object-cover object-center"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"

                                    />
                                )}
                                <div className="p-4 bg-[var(--background)] flex flex-col space-y-2">
                                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                                    {item.description && (
                                        <p className="text-sm text-[var(--tag-text-color)] line-clamp-3">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    );
}
