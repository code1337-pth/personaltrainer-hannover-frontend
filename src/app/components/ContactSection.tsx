"use client";

export default function ContactHeroSection() {
  return (
    <section
      className="relative h-[600px] flex items-center justify-center bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: "url('/contact.jpg')" }} // Pfad zum Bild anpassen
    >
      {/* Optionales Overlay, damit das Formular sich abhebt */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Der Formular-Container (z-index über Overlay) */}
      <div className="relative z-10 bg-white p-8 rounded shadow max-w-lg w-full mx-4">
        <h2 className="text-3xl font-bold mb-4 text-black">
          Starte dein Training jetzt
        </h2>
        <p className="text-gray-700 mb-6">
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
              className="w-full p-3 rounded bg-gray-100 focus:outline-none"
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
              className="w-full p-3 rounded bg-gray-100 focus:outline-none"
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
              className="w-full p-3 rounded bg-gray-100 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded shadow"
          >
            Absenden
          </button>
        </form>
      </div>
    </section>
  );
}
