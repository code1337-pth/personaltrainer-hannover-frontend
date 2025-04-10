"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Reason } from "@/app/types/strapi";

export default function ReasonsSlider({ reasons }: { reasons: Reason[] }) {
  if (!reasons || reasons.length === 0) {
    return <p className="text-center text-secondary">Keine Gründe gefunden.</p>;
  }

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      className="rounded-lg overflow-hidden"
    >
      {reasons.map((reason, index) => (
        <SwiperSlide key={reason.id}>
          <div className="pl-15 pr-15 xl:pl-30 xl:pr-30 rounded-lg pb-20">
            <div className="text-3xl font-bold text-center">
              <span>Grund - {index + 1}</span>
            </div>
            <p className="text-lg mt-6">{reason.html_content}</p>
            <div className="uppercase text-right text-sm text-[var(--keyword-text-color)] flex flex-wrap gap-2 justify-end mt-4">
              {reason.tags?.map((tag, tagIndex) => (
                <strong
                  key={tagIndex}
                  className="bg-[var(--tag-color)] px-3 py-1 rounded-full text-xs"
                >
                  {tag}
                </strong>
              ))}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
