import Image from "next/image";
import {SocialIcon} from "react-social-icons";
import strapiCache, {CacheKey} from "@/lib/strapiCache";

type SocialLinks = {
    facebook?: string;
    instagram?: string;
    x?: string;
    youtube?: string;
};

type TeamMember = {
    name: string;
    roles: string[]; // Rollen als Liste
    src: string;
    alt?: string;
    social?: SocialLinks; // Optionale Social-Media-Links
};

export default async function TeamSection() {
    const teamMembers = await strapiCache.fetchData<TeamMember>('team-member', CacheKey.TeamMembers);

    return (
        <section id="team" className="container-lg text-lg mx-auto px-6 py-12 text-center">
            <h2 className="text-4xl font-bold">Unser Team</h2>
            <p className="mt-4 max-w-3xl mx-auto">
                Unser erfahrenes Team aus professionellen Personal Trainern steht dir zur Seite, um deine individuellen
                Ziele zu erreichen. Wir bringen langjährige Erfahrung in den Bereichen Fitness, Ernährung und Coaching
                mit.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-6">
                {teamMembers.map((member, index) => (
                    <div key={index} className="team-member-box">
                        <Image
                            src={member.src}
                            alt={member.alt || member.name}
                            width={175}
                            height={175}
                            className="rounded-full mx-auto transition-transform"
                        />
                        <h3 className="text-xl font-semibold mt-4">{member.name}</h3>
                        <div className="flex flex-wrap justify-center gap-2 mt-2">
                            {member.roles.map((role, idx) => (
                                <span
                                    key={idx}
                                    className="bg-(--tag-color) text-(--tag-text-color) px-2 py-1 rounded-full text-sm font-medium"
                                >
                  {role}
                </span>
                            ))}
                        </div>
                        {member.social && (
                            <div className="mt-4 flex justify-center gap-2">
                                {member.social.facebook && (
                                    <SocialIcon url={member.social.facebook} style={{height: 35, width: 35}}/>
                                )}
                                {member.social.instagram && (
                                    <SocialIcon url={member.social.instagram} style={{height: 35, width: 35}}/>
                                )}
                                {member.social.x && (
                                    <SocialIcon url={member.social.x} style={{height: 35, width: 35}}/>
                                )}
                                {member.social.youtube && (
                                    <SocialIcon url={member.social.youtube} style={{height: 35, width: 35}}/>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
