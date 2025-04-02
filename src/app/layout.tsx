import strapiCache, { CacheKey } from "@/app/lib/strapiCache";
import { Rajdhani } from "next/font/google";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ThemeProvider } from "./components/theme-provider";
import { UtilityButtons } from "./components/UtilityButtons";
import "./globals.css";
import { Category } from "./types/strapi";
import { categoriesToNavItems } from "./lib/convert";


const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

export const metadata = {
  title: "Home | Markus Kaluza - Premium Personal Training + Team",
  description: "Erreiche deine Fitnessziele mit individuellem Training, Ernährungsberatung und persönlicher Betreuung.",

  // OpenGraph (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    title: "Home | Markus Kaluza - Premium Personal Training + Team",
    description: "Erreiche deine Fitnessziele mit individuellem Training, Ernährungsberatung und persönlicher Betreuung.",
    type: "website",
    url: "https://www.deinewebseite.de",
    siteName: "Deine Webseite",
    images: [
      {
        url: "https://www.deinewebseite.de/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fitness Personal Trainer",
      },
    ],
  },

  // Twitter Cards (Optimierung für Twitter-Posts)
  twitter: {
    card: "summary_large_image",
    title: "Home | Markus Kaluza - Premium Personal Training + Team",
    description: "Individuelles Personal Training für deine Fitnessziele.",
    images: ["https://www.deinewebseite.de/og-image.jpg"],
  },

  // Favicons & Icons
  icons: {
    icon: "/favicon-32.png", // Standard PNG
    shortcut: "/favicon.ico", // Fallback für alte Browser
    apple: "/apple-touch-icon.png", // Apple Touch Icon (empfohlen: 180x180)
  },


  // Web App Manifest (für Android PWAs)
  manifest: "/site.webmanifest",

  // Robots & Indexing für SEO
  robots: {
    index: true,  // Suchmaschinen sollen die Seite indexieren
    follow: true, // Links dürfen gecrawlt werden
  },

  // Alternativ-Tags für Mehrsprachigkeit (falls du das brauchst)
  alternates: {
    canonical: "https://www.deinewebseite.de",
    languages: {
      "de": "https://www.deinewebseite.de",
      "en": "https://www.deinewebseite.de/en",
    },
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories: Category[] = await strapiCache.fetchData("categories", CacheKey.Categories);
  const navItems = [
    {
      "name": "Home",
      "href": "/#home"
    },
    {
      "name": "Kontakt",
      "href": "/#contact"
    },
    {
      "name": "Leistungen",
      "href": "/services"
    }
  ]
  
  const blogCategoryNavItems = categoriesToNavItems(categories)

  const blogNavItem = {
    "name": "Blog",
    "href": "/blog",
    "children" : blogCategoryNavItems
  }

  navItems.push(blogNavItem)

  return (
    <html lang="de" className={rajdhani.className}>
      <body>
        <ThemeProvider>
          <Header navItems={navItems} />
          {children}
          <Footer />
          <UtilityButtons />
        </ThemeProvider>
      </body>
    </html>
  );
}
