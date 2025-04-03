import strapiCache, { CacheKey } from "@/app/lib/strapiCache";
import { Rajdhani } from "next/font/google";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ThemeProvider } from "./components/theme-provider";
import { UtilityButtons } from "./components/UtilityButtons";
import "./globals.css";
import { Article, Category } from "./types/strapi";
import { categoriesToNavItems } from "./lib/convert";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

export const metadata = {
  title: "Home | Markus Kaluza - Premium Personal Training + Team",
  description: "Erreiche deine Fitnessziele mit individuellem Training, Ernährungsberatung und persönlicher Betreuung.",
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
  twitter: {
    card: "summary_large_image",
    title: "Home | Markus Kaluza - Premium Personal Training + Team",
    description: "Individuelles Personal Training für deine Fitnessziele.",
    images: ["https://www.deinewebseite.de/og-image.jpg"],
  },
  icons: {
    icon: "/favicon-32.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.deinewebseite.de",
    languages: {
      de: "https://www.deinewebseite.de",
      en: "https://www.deinewebseite.de/en",
    },
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Artikel und Kategorien aus Strapi abrufen
  const articles: Article[] = await strapiCache.fetchData("articles", CacheKey.Articles);
  const categories: Category[] = await strapiCache.fetchData("categories", CacheKey.Categories);

  // Feste Nav-Items für Home und Kontakt
  const navItems = [
    { name: "Home", href: "/#home" },
    { name: "Kontakt", href: "/#contact" },
  ];

  // Für den Menüpunkt "Leistungen" sollen alle Artikel angezeigt werden,
  // die der Kategorie "services" bzw. "leistungen" zugeordnet sind.
  const servicesArticles = articles.filter((article) => {
    return article.category &&
      (article.category.slug.toLowerCase() === "services" ||
       article.category.slug.toLowerCase() === "leistungen");
  });
  const servicesNavItems = servicesArticles.map((article) => ({
    name: article.title,
    href: `/services/${article.slug}`,
  }));
  const servicesNavItem = {
    name: "Leistungen",
    href: "/services",
    children: servicesNavItems,
  };
  navItems.push(servicesNavItem);

  // Für den Blog-Nav-Item sollen alle Kategorien außer "services"/"leistungen" genutzt werden.
  const filteredCategories = categories.filter((cat) => {
    return cat.slug.toLowerCase() !== "services" && cat.slug.toLowerCase() !== "leistungen";
  });
  const blogCategoryNavItems = categoriesToNavItems(filteredCategories);
  const blogNavItem = {
    name: "Blog",
    href: "/blog",
    children: blogCategoryNavItems,
  };
  navItems.push(blogNavItem);

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
