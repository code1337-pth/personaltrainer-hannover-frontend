"use client";

import PrinciplesSection from "./PrinciplesSection";
import {JSX} from "react";

interface ContactProps {
  id?: string; // optional, da vielleicht nicht immer benötigt
}

const ContactSection: ({id}: { id: any }) => JSX.Element = ({ id }) => {
  // Berechne die Anzahl an Jahren seit 2001
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 2001;

  return (
    <section
      id={id}
      className="relative h-[760px] flex items-center justify-center bg-center bg-cover bg-no-repeat text-3xl"
      style={{ backgroundImage: "url('/contact.jpg')" }} // Pfad zum Bild anpassen
    >
      {/* Der Formular-Container (z-index über Overlay) */}
      <div className="relative z-10 p-8 rounded shadow max-w-lg w-full mx-4 bg-(--contact-bg-color)">
        <h2 className="text-3xl font-bold mb-4">
          Starte dein Training jetzt
        </h2>
        <p className="mb-6">
          Sichere dir dein unverbindliches Erstgespräch – wir melden uns umgehend.
        </p>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Dein Name"
              className="w-full p-3 rounded focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="phone">
              Telefon
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Deine Telefonnummer"
              className="w-full p-3 rounded focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              E-Mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="Deine E-Mail"
              className="w-full p-3 rounded focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="contact-button"
          >
            Absenden
          </button>
        </form>
      </div>
      <main className="flex h-screen items-center justify-center">
      </main>
    </section>
  );
}
export default ContactSection;
