// components/HeroSection.tsx
import { Montserrat } from "next/font/google";
import { JSX } from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

const HeroSection = (): JSX.Element => {
  return (
    <section
      className="relative h-[65vh] md:h-[1000px] flex items-center bg-center bg-cover bg-no-repeat mt-20"
      style={{ backgroundImage: "url('/slider-coach.jpg')" }}
    >
      <div className="container relative z-10 mx-auto px-6 py-32">
        <div className="max-w-4xl text-left">
          <h2
            className={`${montserrat.className} text-base sm:text-lg md:text-xl font-semibold text-black uppercase tracking-widest`}
          >
            Markus Kaluza - Premium Personal Training - Team
          </h2>
          <h2
            className={`${montserrat.className} mt-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight`}
          >
            <span className="text-gold">Transformiere dich</span>
            <br />
            <span className="text-black">
              mit den Experten von Personal Trainer Hannover
            </span>
          </h2>
          <p className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-700 max-w-xl">
            Wir entwickeln für dich ein maßgeschneidertes Trainings- und Ernährungsprogramm, das dich deinem Ziel näherbringt – sei es Muskelaufbau, Gewichtsreduktion oder ein gesünderer Lebensstil.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-block bg-black hover:bg-gray-800 text-white px-10 py-4 text-lg font-semibold rounded-lg shadow-md"
          >
            Jetzt starten
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
