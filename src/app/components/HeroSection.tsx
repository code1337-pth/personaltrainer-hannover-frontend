// components/HeroSection.tsx

import RotatingShape from "./RotatingShape";

interface HeroProps {
  id?: string; // optional, da vielleicht nicht immer benötigt
}

const HeroSection: React.FC<HeroProps> = ({ id }) => {
  return (
    <section id={id} className="relative  border-b border-gray-300 bg-no-repeat bg-cover bg-top-50" style={{ backgroundImage: "var(--hero-image)"}}>
      <div className="container mx-auto px-6 py-16 sm:py-24 md:py-32 flex flex-col md:flex-row items-center">
        {/* RotatingShape: Auf kleinen Bildschirmen zuerst, auf größeren rechts */}
        <div className="order-1 md:order-2 md:w-1/2 flex items-center justify-center mb-8 md:mb-0">
          <RotatingShape />
        </div>
        {/* Text: Auf kleinen Bildschirmen als zweites, auf größeren links */}
        <div className="order-2 md:order-1 md:w-1/2 mr-20">
          <h2 className={`h2-hero`}
          >
            <span className="text-gold">Transformiere dich</span>
            <br />
            <span className="black:text-white">mit unseren Experten</span>
          </h2>
          <p className="mt-6 text-lg sm:text-xl md:text-2xl max-w-xl">
            Wir entwickeln für dich ein maßgeschneidertes Trainings- und
            Ernährungsprogramm, das dich deinem Ziel näherbringt – sei es
            Muskelaufbau, Gewichtsreduktion oder ein gesünderer Lebensstil.
          </p>
          <a href="#contact" className="group action-button"
          >
            <span>Jetzt starten</span>
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
