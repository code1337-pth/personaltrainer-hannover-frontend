// app/layout.tsx
import { categoriesToNavItems } from "@/app/lib/convert";
export const dynamic = "force-static";
import "./globals.css";
import { Article, Category } from "@/app/types/strapi";
import { NavItem } from "@/app/types/navigation";
import strapiCache, { CacheKey } from "@/lib/strapiCache";
import { Rajdhani } from "next/font/google";
import { ThemeProvider } from "@/app/components/theme-provider";
import { UtilityButtons } from "@/app/components/UtilityButtons";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { generateNavigation } from "@/lib/navigationBuilder";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

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
    siteName: "Deine Webseite",
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
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.personaltrainer-hannover.de",
    languages: {
      de: "https://www.personaltrainer-hannover.de",
      en: "https://www.personaltrainer-hannover.de/en",
    },
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  await strapiCache.preload();
  const allArticles = await strapiCache.fetchData<Article>("articles", CacheKey.Articles);
  const allCategories = await strapiCache.fetchData<Category>("categories", CacheKey.Categories);

  const { serviceNav, blogNav } = generateNavigation({
    categories: allCategories,
    articles: allArticles,
  });

  // Wichtig: Übergebe die Untermenüs über "children"
  const navItems: NavItem[] = [
    { name: "Home", href: "/#home" },
    { name: "Kontakt", href: "/#contact" },
    { name: "Leistungen", href: "/service", children: serviceNav },
    { name: "Blog", href: "/blog", children: blogNav },
  ];

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
