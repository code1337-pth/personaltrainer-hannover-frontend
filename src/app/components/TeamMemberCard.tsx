// components/TeamMemberCard.tsx
"use client";

import {SocialIcon} from "react-social-icons";
import {TeamMember} from "@/app/types/strapi";
import FeaturedImage from "@/app/components/FeaturedImage";

export interface TeamMemberCardProps {
    member: TeamMember;
}

export default function TeamMemberCard({member}: TeamMemberCardProps) {
    // Bestimme Bildquelle und Dimensionen
    const small = member.image.formats?.small;

    return (
        <div
            className="p-6 shadow-md rounded-lg text-center  border-1 border-dashed border-[--border-thin-color] w-full max-w-xs sm:w-70 xl:w-80 duration-300 hover:-translate-y-2">
            {member.image && (
                <FeaturedImage
                    img={member.image}
                    alt={member.name}
                    width={small?.width}
                    height={small?.height}
                    quality={75}
                    className="rounded-full mx-auto transition-transform"
                    sizes="(max-width: 640px) 134px, (max-width: 1024px) 175px, 200px"
                />
            )}

            <h3 className="text-xl font-semibold mt-4">{member.name}</h3>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
                {member.roles.map((role) => (
                    <span
                        key={role.id}
                        className="bg-[var(--tag-color)] text-[var(--tag-text-color)] px-2 py-1 rounded-full text-sm font-medium"
                    >
            {role.name}
          </span>
                ))}
            </div>

            {member.social && member.social.length > 0 && (
                <div className="mt-4 flex justify-center gap-2">
                    {member.social.map((link) => (
                        <SocialIcon
                            key={link.id}
                            url={link.url}
                            style={{height: 35, width: 35}}
                            target="_blank"
                            rel="noopener noreferrer"
                        />
                    ))}
                </div>
            )}
        </div>
    );
}