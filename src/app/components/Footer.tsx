import SealsSection from "./SealsSection";

// components/Footer.tsx
const Footer = (): JSX.Element => {
    return (
      <footer className="bg-gray-100 text-black text-center p-6">
        <SealsSection />
        <p className="text-gold">
          © 2025 Personal Trainer Hannover - Alle Rechte vorbehalten
        </p>
      </footer>
    );
  };
  
  export default Footer;
  