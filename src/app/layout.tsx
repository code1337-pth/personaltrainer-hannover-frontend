// app/layout.tsx
import "./globals.css";
import strapiCache, {CacheKey} from "@/lib/strapiCache";
import {Rajdhani} from "next/font/google";
import React from "react";
import {ThemeProvider} from "@/app/components/theme-provider";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {UtilityButtons} from "@/app/components/UtilityButtons";

// Dynamisch nur Client-Komponenten importieren

// Google Font: nur die wirklich benötigten Gewichte, mit font-display swap
const rajdhani = Rajdhani({
    subsets: ["latin"],
    weight: ["400", "700"],  // nur normale und fett
    display: "swap",
    variable: "--font-rajdhani",
    preload: true, // lädt nur diese beiden Gewichte vor
});

export const dynamic = "force-static";

export const metadata = {
    title: "Home | Markus Kaluza - Premium Personal Training + Team",
    description:
        "Erreiche deine Fitnessziele mit individuellem Training, Ernährungsberatung und persönlicher Betreuung.",
    openGraph: {
        title: "Home | Markus Kaluza - Premium Personal Training + Team",
        description:
            "Erreiche deine Fitnessziele mit individuellem Training, Ernährungsberatung und persönlicher Betreuung.",
        type: "website",
        url: "https://www.personaltrainer-hannover.de",
        siteName: "Personal Trainer Hannover",
        images: [
            {
                url: "https://www.personaltrainer-hannover.de/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Fitness Personal Trainer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Home | Markus Kaluza - Premium Personal Training + Team",
        description: "Individuelles Personal Training für deine Fitnessziele.",
        images: ["https://www.personaltrainer-hannover.de/og-image.jpg"],
    },
    icons: {
        icon: "/favicon-32.png",
        shortcut: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    robots: {index: true, follow: true},
    alternates: {
        canonical: "https://www.personaltrainer-hannover.de",
        languages: {de: "/", en: "/en"},
    },
};

export default async function RootLayout({children}: { children: React.ReactNode }) {
    // Preload-Strapi-Daten einmal
    await strapiCache.preload();
    const allArticles = await strapiCache.fetchData("articles", CacheKey.Articles);
    const allCategories = await strapiCache.fetchData("categories", CacheKey.Categories);

    const {serviceNav, blogNav} = (await import("@/lib/navigationBuilder")).generateNavigation({
        categories: allCategories,
        articles: allArticles,
    });

    const navItems = [
        {name: "Home", href: "/#home"},
        {name: "Kontakt", href: "/#contact"},
        {name: "Leistungen", href: "/service", children: serviceNav},
        {name: "Blog", href: "/blog", children: blogNav},
    ];

    return (
        <html lang="de" className={`${rajdhani.className}`}>
        <body>
        <ThemeProvider>
            <Header navItems={navItems}/>
            <main className="min-h-screen"> {children} </main>
            <Footer/>
            <UtilityButtons/>
        </ThemeProvider>
        </body>
        </html>
    );
}
