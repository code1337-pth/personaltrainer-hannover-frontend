// components/BlogHeroSection.tsx
import React from "react";
import Link from "next/link";
import {BreadcrumbItem} from "../types/navigation";

interface CategoryHeroSectionProps {
    title: string;
    description?: string;
    breadcrumb?: BreadcrumbItem[];
}

const CategoryHeroSection: React.FC<CategoryHeroSectionProps> = ({
                                                                     title,
                                                                     description,
                                                                     breadcrumb = [],
                                                                 }) => {
    return (
        <header
            className="relative w-full h-[300px] flex items-center justify-center text-center mb-10 mt-20 text-[var(--foreground)] bg-cover bg-no-repeat"
            style={{backgroundImage: "var(--hero-image)"}}
        >
            <div className="relative z-10 px-6">
                <nav className="mb-4 opacity-80">
                    {breadcrumb.map((item, index) => (
                        <span key={index}>
              {item.href ? (
                  <Link hrefLang="de" href={item.href} className="underline">
                      {item.name}
                  </Link>
              ) : (
                  item.name
              )}
                            {index < breadcrumb.length - 1 && " / "}
            </span>
                    ))}
                </nav>
                <h1 className="text-4xl font-bold">{title}</h1>
                {description && <p className="mt-2 max-w-prose text-lg">{description}</p>}
            </div>
        </header>
    );
};

export default CategoryHeroSection;
