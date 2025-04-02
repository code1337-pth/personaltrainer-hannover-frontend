"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

type Review = {
  author: string;
  profile_url: string;
  rating: number;
  review_text: string;
  timestamp: string;
};

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch("/dev/google_reviews_extended.json")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: rating }, (_, i) => (
      <Star key={i} size={20} className="text-[var(--color-gold)]" fill="currentColor" stroke="none" />
    ));
  };

  return (
    <section className="py-16 text-center" id="testimonials">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-4">Was unsere Kunden sagen</h2>
        <p className="mb-8 max-w-2xl mx-auto">
          Echtes Feedback von unseren zufriedenen Kundinnen und Kunden
        </p>

        <div className="relative">
          <Swiper
            className="m-5"
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: "#swiper-button-next-reviews",
              prevEl: "#swiper-button-prev-reviews",
            }}
          >
            {reviews.map((review, idx) => (
              <SwiperSlide key={idx}>
                <div className="max-w-3xl mx-auto p-6 shadow rounded-lg text-center flex flex-col items-center bg-[var(--background)]">
                  <Quote size={40} className="mb-4 text-[var(--tag-text-color)]" />
                  <p className="italic text-lg mb-4 text-[var(--tag-text-color)]">"{review.review_text}"</p>
                  <div className="flex justify-center mb-4">{renderStars(review.rating)}</div>
                  <p className="text-sm font-semibold text-[var(--tag-text-color)]">
                    {review.author}
                    <span className="block text-xs">{review.timestamp}</span>
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div id="swiper-button-prev-reviews" className="swiper-button-prev text-[var(--color-gold)] scale-150 absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer">
            <ChevronLeft size={24} />
          </div>
          <div id="swiper-button-next-reviews" className="swiper-button-next text-[var(--color-gold)] scale-150 absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer">
            <ChevronRight size={24} />
          </div>
        </div>

        <p className="text-xs mt-4 text-[var(--tag-text-color)]">Bewertungen von Google</p>
      </div>
    </section>
  );
}
