import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Reason {
  id: number;
  text: string;
  category: string;
  keywords: string[];
}

const ReasonsSection: React.FC = () => {
  const [reasons, setReasons] = useState<Reason[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    fetch("/reasons/reasons.json")
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setDescription(data.description);
        setReasons(data.items);
      })
      .catch((error) => console.error("Fehler beim Laden der Gründe:", error));
  }, []);

  return (
    <section className="bg-primary py-16  md:px-12">
      {/* Titel & Beschreibung */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">
          <span className="text-gold">{reasons.length} gute Gründe,</span> warum du mit uns dein volles Potenzial entfaltest <span></span>
        </h2>
        <p className="mt-4 px-10 text-lg">{description}</p>
      </div>

      {/* Swiper Slider */}
      <div className="max-w-4xl mx-auto ">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="rounded-lg overflow-hidden "
        >
          {reasons.length > 0 ? (
            reasons.map((reason) => (
              <SwiperSlide key={reason.id}>
                <div className="pl-15 pr-15 xl:pl-30 xl:pr-30 rounded-lg pb-20">
                  <div className="text-3xl font-bold text-center">
                    <span>Grund - {reason.id}</span>
                  </div>
                  <p className="text-lg mt-6">{reason.text}</p>
                  <div className="uppercase text-right text-sm text-(--keyword-text-color) ">
                    <strong className="bg-(--tag-color) p-2 rounded-full">{reason.category}</strong>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <p className="text-center text-secondary">Lade Gründe...</p>
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default ReasonsSection;
