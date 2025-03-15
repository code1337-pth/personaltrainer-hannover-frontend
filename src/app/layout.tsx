import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { Rajdhani } from "next/font/google";
import { UtilityButtons } from "./components/UtilityButtons";
import Header from "./components/Header";
import Footer from "./components/Footer";

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

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={rajdhani.className}>
      <body>
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
          <UtilityButtons />
        </ThemeProvider>
      </body>
    </html>
  );
}
