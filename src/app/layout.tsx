// app/layout.tsx
import "./globals.css";
import strapiCache, {CacheKey} from "@/lib/strapiCache";
import {Rajdhani} from "next/font/google";
import React from "react";
import {ThemeProvider} from "@/app/components/theme-provider";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {UtilityButtons} from "@/app/components/UtilityButtons";
import {Toaster} from "react-hot-toast";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.personaltrainer-hannover.de";

// Dynamisch nur Client-Komponenten importieren

// Google Font: nur die wirklich benötigten Gewichte, mit font-display swap
const rajdhani = Rajdhani({
    subsets: ["latin"],
    weight: ["400", "700"],  // nur normale und fett
    display: "swap",
    variable: "--font-rajdhani",
    preload: true, // lädt nur diese beiden Gewichte vor
});

export const dynamic = "force-dynamic"; // immer dynamisch, um Cache-Invalidierung zu ermöglichen

export const metadata = {
    title: "Home | Markus Kaluza - Premium Personal Training + Team",
    description:
        "Erreiche deine Fitnessziele mit individuellem Training, Ernährungsberatung und persönlicher Betreuung.",
    openGraph: {
        title: "Home | Markus Kaluza - Premium Personal Training + Team",
        description:
            "Erreiche deine Fitnessziele mit individuellem Training, Ernährungsberatung und persönlicher Betreuung.",
        type: "website",
        url: siteUrl,
        siteName: "Personal Trainer Hannover",
        images: [
            {
                url: siteUrl + "/og-image.jpg",
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
        images: [siteUrl + "/og-image.jpg"],
    },
    icons: {
        icon: [
            {url: "/favicon.svg", type: "image/svg+xml"},
            {url: "/favicon-32.png", sizes: "32x32", type: "image/png"},
            {url: "/favicon-192.png", sizes: "192x192", type: "image/png"},
            {url: "/favicon-512.png", sizes: "512x512", type: "image/png"},
        ],
        shortcut: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    robots: {index: true, follow: true},
    alternates: {
        canonical: siteUrl,
        languages: {de: siteUrl + "/"},
    },
    verification: {
        google: 'bQUkqk1kKtBIUsbu4xVNx9NfbK8Q'
    }
};

export default async function RootLayout({children}: { children: React.ReactNode }) {
    try {
        const allArticles = await strapiCache.fetchData("articles", CacheKey.Articles);
        const allCategories = await strapiCache.fetchData("categories", CacheKey.Categories);

        const {serviceNav, blogNav} = (await import("@/lib/navigationBuilder")).generateNavigation({
            categories: allCategories,
            articles: allArticles,
        });

        const navItems = [
            {name: "Home", href: "/"},
            {name: "Kontakt", href: "/#contact"},
            {name: "Leistungen", href: "/service", children: serviceNav},
            {name: "Blog", href: "/blog", children: blogNav},
        ];

        return (
            <html lang="de" className={`${rajdhani.className} `}>
            <body>
            <ThemeProvider>
                <Header navItems={navItems}/>
                <main className="min-h-screen"> {children} </main>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        style: {
                            background: "var(--background)",
                            color: "var(--foreground)",
                            border: "1px solid var(--border-thin-color)",
                            padding: "0.75rem 1rem",
                            borderRadius: "0.5rem",
                        },
                    }}
                />
                <Footer/>
                <UtilityButtons/>
            </ThemeProvider>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "Markus Kaluza - Premium Personal Training + Team",
                        "url": siteUrl,
                        "potentialAction": {
                            "@type": "ContactAction",
                            "target": `${siteUrl}/#contact`,
                            "name": "Kontakt aufnehmen"
                        }
                    })
                }}
            />
            </body>
            </html>
        );
    } catch (e) {
        if (process.env.NODE_ENV === "development") {
            console.error("Fehler beim Laden der Daten:", e);
        }
        // Nur erneut preladen, wenn nötig (z.B. nach vorherigem Fehler)
        if (strapiCache.needsPreload && typeof strapiCache.needsPreload === "function" && strapiCache.needsPreload()) {
            try {
                await strapiCache.preload();
            } catch (err) {
                if (process.env.NODE_ENV === "development") {
                    console.error("Erneuter Preload-Versuch fehlgeschlagen:", err);
                }
            }
        }

        return (
            <html lang="de" className={`${rajdhani.className}`}>
            <body>
            <main className="min-h-screen flex items-center justify-center text-center">
                <div>
                    <h1 className="text-4xl font-bold">Wartungsarbeiten</h1>
                    <p className="mt-4 text-lg">
                        Unsere Seite ist vorübergehend nicht erreichbar.<br/>
                        Bitte lade die Seite in ein paar Sekunden erneut.
                    </p>
                </div>
            </main>
            </body>
            </html>
        );
    }
}