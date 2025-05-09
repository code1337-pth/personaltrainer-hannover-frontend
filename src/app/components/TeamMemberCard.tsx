// components/TeamMemberCard.tsx
"use client";

import Image from "next/image";
import {SocialIcon} from "react-social-icons";
import {TeamMember} from "@/app/types/strapi";

export interface TeamMemberCardProps {
    member: TeamMember,
    key?: number
}

export default function TeamMemberCard({member, key}: TeamMemberCardProps) {
    return (
        <div className="team-member-box">
            <Image
                src={member.image.url}
                alt={member.alt || member.name}
                width={175}
                height={175}
                className="rounded-full mx-auto transition-transform"
            />
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
            {member.social?.length > 0 && (
                <div className="mt-4 flex justify-center gap-2">
                    {member.social?.map((link) => (
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
