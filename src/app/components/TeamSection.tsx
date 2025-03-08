// components/TeamSection.tsx
import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

interface TeamMember {
  src: string;
  alt: string;
  name: string;
  role: string;
}

const teamMembers: TeamMember[] = [
  { src: "/team/markus.jpg", alt: "Markus", name: "Markus", role: "Personal Training, Schmerztherapie" },
  { src: "/team/nicole.jpg", alt: "Nicole", name: "Nicole", role: "Personal Training, Physiotherapie, Schmerztherapie" },
  { src: "/team/sonja.jpg", alt: "Sonja", name: "Sonja", role: "Personal Training, Firmenfitness" },
  { src: "/team/christine.jpg", alt: "Christine", name: "Christine", role: "Personal Training, Firmenfitness" },
  { src: "/team/stella.jpg", alt: "Stella", name: "Stella", role: "Personal Training, Firmenfitness" },
  { src: "/team/jordan.jpg", alt: "Jordan", name: "Jordan", role: "Personal Training" },
  { src: "/team/petra.jpg", alt: "Petra", name: "Petra", role: "Firmenfitness, Organisation" },
  { src: "/team/elisabeth.jpg", alt: "Elisabeth", name: "Elisabeth", role: "Personal Training für Triathlon" },
  { src: "/team/sandra.jpg", alt: "Sandra", name: "Sandra", role: "Personal Training, Mama Workout" },
];

const TeamSection = (): JSX.Element => {
  return (
    <section id="about" className="container mx-auto px-6 py-16 text-center">
      <h2 className={`${montserrat.className} text-2xl sm:text-3xl md:text-4xl font-bold text-gold`}>
        Unser Team
      </h2>
      <p className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto">
        Unser erfahrenes Team aus professionellen Personal Trainern steht dir zur Seite, um deine individuellen Ziele zu erreichen.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-6">
        {teamMembers.map((member) => (
          <div key={member.name} className="p-6 bg-white shadow-md rounded-lg text-center w-64">
            <Image
              src={member.src}
              alt={member.alt}
              width={150}
              height={150}
              className="rounded-full mx-auto"
            />
            <h3 className={`${montserrat.className} text-lg sm:text-xl md:text-2xl font-semibold text-black mt-4`}>
              {member.name}
            </h3>
            <p className="text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
