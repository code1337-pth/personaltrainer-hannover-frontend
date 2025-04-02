// components/HeroSection.tsx

import RotatingShape from "./RotatingShape";

interface HeroProps {
  id?: string; // optional, da vielleicht nicht immer benötigt
}

const HeroSection: React.FC<HeroProps> = ({ id }) => {
  return (
    <section
      id={id}
      className="relative border-b border-gray-300 bg-no-repeat bg-cover bg-top-50"
      style={{ backgroundImage: "var(--hero-image)" }}
    >
      <div className="container mx-auto px-6 py-16 sm:py-24 md:py-32 flex flex-col md:flex-row items-center">
        {/* RotatingShape: Auf kleinen Bildschirmen zuerst, auf größeren rechts */}
        <div className="order-1 md:order-2 md:w-1/2 flex items-center justify-center mb-8 md:mb-0">
          <RotatingShape />
        </div>
        {/* Text: Auf kleinen Bildschirmen als zweites, auf größeren links */}
        <div className="order-2 md:order-1 md:w-1/2 mr-20">
          <h1 className="h1-hero">
            <span className="text-gold">Erreiche deine Topform</span>
            <br />
            <span className="black:text-white">
              und steigere deine Lebensqualität
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl md:text-2xl max-w-xl">
            Mit unserer ganzheitlichen Trainingsstrategie begleiten wir dich auf dem Weg zu deinem Ziel. 
            Unser erfahrenes Team erstellt für dich einen maßgeschneiderten Plan, der deine Muskulatur stärkt, 
            deine Leistungsfähigkeit steigert und dir ein neues, beschwerdefreies Körpergefühl verleiht – für 
            ein starkes und gesundes Leben.
          </p>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl max-w-xl">
            Starte jetzt und entdecke dein volles Potenzial!
          </p>
          <a href="#contact" className="group action-button mt-6">
            <span>Termin sichern – Jetzt kostenfrei und unverbindlich</span>
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
