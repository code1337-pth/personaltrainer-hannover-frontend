// app/components/PartnerSlider.tsx
"use client";

import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {Partner} from "@/app/types/strapi";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import FeaturedImage from "@/app/components/FeaturedImage";

interface PartnerSliderProps {
    partners: Partner[];
}

export default function PartnerSlider({partners}: PartnerSliderProps) {
    if (!partners?.length) {
        return <p className="text-center text-secondary">Keine Partner vorhanden.</p>;
    }

    return (
        <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{clickable: true}}
            breakpoints={{
                640: {slidesPerView: 2},
                1024: {slidesPerView: 3},
            }}
        ><>
            {partners.map((partner, index) => {
                const logo = Array.isArray(partner.logo) && partner.logo[0];
                if (!logo) return null;

                return (
                    <SwiperSlide key={index}>
                        <Link href={partner.link ?? "#"} target={"_blank"}  className="block mx-auto max-w-[720px] h-[550px] flex flex-col justify-between overflow-hidden rounded-lg shadow-lg p-4">
                            {/* Bild-Container immer 16:9 */}
                            <FeaturedImage
                                img={logo}
                                alt={logo.name}
                                quality={75}
                                fill
                                containerClassName={"relative w-full aspect-video"}
                                className="object-contain"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />

                            {/* Name immer unten */}
                            <h3 className="mt-4 text-xl font-semibold text-center">
                                {partner.name}
                            </h3>
                        </Link>
                    </SwiperSlide>
                );
            })}</>
        </Swiper>
    );
}
