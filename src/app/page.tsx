"use client";

import Image from "next/image";
import { Dumbbell, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="bg-white text-gray-900">
      {/* Header & Navigation */}
      <header className="bg-white text-black py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">
          {/* Logo & Mobile View */}
          <div className="flex items-center w-full justify-between md:w-auto">
            <Image src="/logo.svg" alt="Logo" width={300} height={100} className="md:w-[400px]" />
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-black">
              {menuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className={`absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 md:flex transition-all ${menuOpen ? 'block' : 'hidden'}`}>
            <ul className="flex flex-col md:flex-row md:space-x-8 text-black text-lg font-medium">
              <li className="flex items-center space-x-2 hover:text-gray-600" onClick={() => setMenuOpen(false)}>
                <a href="#about">Über uns</a>
                <Dumbbell size={26} className="text-gold" />
              </li>
              <li className="flex items-center space-x-2 hover:text-gray-600" onClick={() => setMenuOpen(false)}>
                <a href="#services">Leistungen</a>
                <Dumbbell size={26} className="text-gold" />
              </li>
              <li className="flex items-center space-x-2 hover:text-gray-600" onClick={() => setMenuOpen(false)}>
                <a href="#testimonials">Kundenstimmen</a>
                <Dumbbell size={26} className="text-gold" />
              </li>
              <li className="flex items-center space-x-2 hover:text-gray-600" onClick={() => setMenuOpen(false)}>
                <a href="#contact">Kontakt</a>
                <Dumbbell size={26} className="text-gold" />
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center bg-cover bg-center text-black" style={{ backgroundImage: "url('/hero.jpg')" }}>
        <div className="bg-white bg-opacity-80 p-12 text-center rounded-lg shadow-xl max-w-3xl opacity-90">
          <h1 className="text-xl font-bold text-gold uppercase text-sm font-semibold tracking-wide text-gray-500">Personal Trainer Hannover</h1>
          <h2 className="text-6xl font-extrabold leading-tight text-black">
            Erreiche deine <span className="text-gold">Fitnessziele</span> mit
            <br /> professionellem <span className="text-gold">Coaching</span>
          </h2>
          <p className="mt-6 text-lg text-gray-700 max-w-xl mx-auto leading-relaxed">
            Dein maßgeschneidertes <strong>Personal Training</strong> für nachhaltigen Erfolg. 
            Ob Muskelaufbau, Gewichtsreduktion oder mehr Vitalität – wir begleiten dich mit einer
            individuellen Strategie, die perfekt zu deinem Lebensstil passt.
          </p>
          <a href="#contact" className="mt-8 inline-block bg-black hover:bg-gray-800 text-white px-10 py-4 text-lg font-semibold rounded-lg shadow-md">
            Kostenlose Erstberatung buchen
          </a>
        </div>
      </section>

      {/* Unser Team */}
      <section id="about" className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-bold text-gold">Unser Team</h2>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
          Unser erfahrenes Team aus professionellen Personal Trainern steht dir zur Seite, um deine individuellen Ziele zu erreichen. Wir bringen langjährige Erfahrung in den Bereichen Fitness, Ernährung und Coaching mit.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          <div className="p-6 bg-white shadow-md rounded-lg text-center w-64">
            <Image src="/trainer-1.jpg" alt="Trainer 1" width={150} height={150} className="rounded-full mx-auto" />
            <h3 className="text-xl font-semibold text-black mt-4">Max Mustermann</h3>
            <p className="text-gray-600">Experte für Muskelaufbau</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg text-center w-64">
            <Image src="/trainer-2.jpg" alt="Trainer 2" width={150} height={150} className="rounded-full mx-auto" />
            <h3 className="text-xl font-semibold text-black mt-4">Lisa Beispiel</h3>
            <p className="text-gray-600">Spezialistin für Ernährungsberatung</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-black text-center p-6">
        <p className="text-gold">© 2024 Personal Trainer Hannover - Alle Rechte vorbehalten</p>
      </footer>
    </main>
  );
}
