"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";           // Basis-Styles
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Montserrat } from "next/font/google";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Navigation, Pagination } from "swiper/modules";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

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
    // Dummy-Daten aus /public/dev/dummyReviews.json abrufen
    fetch("/dev/google_reviews_extended.json")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  // Sterne rendern
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <Star
          key={i}
          size={20}
          className="text-gold"
          fill="currentColor"
          stroke="none"
        />
      );
    }
    return stars;
  };

  return (
    <section className="py-16 bg-white text-center" id="testimonials">
      <div className="container mx-auto px-6">
        <h2
          className={`${montserrat.className} text-4xl font-bold text-gold mb-4`}
        >
          Was unsere Kunden sagen
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Echtes Feedback von unseren zufriedenen Kundinnen und Kunden
        </p>

        <div className="relative">
          {/* Swiper-Container */}
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            // Custom Navigation-Elemente definieren
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
          >
            {reviews.map((review, idx) => (
              <SwiperSlide key={idx}>
                <div className="max-w-3xl mx-auto p-6 bg-gray-50 shadow rounded-lg text-center flex flex-col items-center">
                  {/* Icon (z. B. Zitat) */}
                  <Quote size={40} className="text-gold mb-4" />

                  {/* Bewertungstext */}
                  <p className="italic text-lg text-gray-700 mb-4">
                    "{review.review_text}"
                  </p>

                  {/* Sterne */}
                  <div className="flex justify-center mb-4">
                    {renderStars(review.rating)}
                  </div>

                  {/* Autor & Zeit */}
                  <p className="text-sm text-gray-500 font-semibold">
                    {review.author}
                    <span className="block text-xs text-gray-400">
                      {review.timestamp}
                    </span>
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation (Pfeile) */}
          <div className="swiper-button-prev absolute top-1/2 left-4 -translate-y-1/2 p-2 bg-white rounded-full shadow cursor-pointer">
            <ChevronLeft size={24} className="text-gold" />
          </div>
          <div className="swiper-button-next absolute top-1/2 right-4 -translate-y-1/2 p-2 bg-white rounded-full shadow cursor-pointer">
            <ChevronRight size={24} className="text-gold" />
          </div>
        </div>

        {/* Attribution / Hinweis */}
        <p className="text-xs text-gray-400 mt-4">Bewertungen von Google</p>
      </div>
    </section>
  );
}
