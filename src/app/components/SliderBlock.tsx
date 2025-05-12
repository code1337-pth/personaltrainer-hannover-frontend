// src/app/components/SliderBlock.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export interface SliderItem {
    id: string;
    image_url: string;
    name: string;
    description?: string;
    link?: string;
}

export interface SliderBlockProps {
    items: SliderItem[];
}

export default function SliderBlock({ items }: SliderBlockProps) {
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
                    0: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
                navigation={showNav}
                pagination={{ clickable: true }}
            >
                {items.map((item) => (
                    <SwiperSlide key={item.id}>
                        <Link href={item.link ?? "#"} className="block h-full group">
                            <div className="h-[450px] flex flex-col overflow-hidden rounded-lg shadow-lg">
                                <div className="relative w-full aspect-video">
                                    {item.image_url && (
                                        <Image
                                            src={item.image_url}
                                            alt={item.name}
                                            loading="lazy"
                                            fill
                                            className="object-cover object-center"
                                        />
                                    )}
                                </div>
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

            <style jsx global>{`
        .swiper-button-prev,
        .swiper-button-next {
          width: 2.5rem !important;
          height: 2.5rem !important;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 9999px;
        }
        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 1.25rem;
          color: white;
        }
      `}</style>
        </div>
    );
}
