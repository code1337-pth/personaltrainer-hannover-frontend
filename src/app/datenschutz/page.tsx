// src/app/impressum/page.tsx
import CategoryHeroSection from "@/app/components/CategoryHeroSection";

export const metadata = {
    title: "Datenschutzerklärung | Markus Kaluza - Premium Personal Training + Team",
    description: "Datenschutzerklärung für Personal Training Kaluza + Team",
};

export default function PrivacyPage() {
    return (
        <>
            {/* Hero-Block als Header */}
            <CategoryHeroSection
                title="Datenschutzerklärung"
                description="Markus - Kaluza Premium Personal Training + Team"
            />

            {/* Layout-Wrapper für den Inhalt */}
            <div className="container mx-auto blog-article px-6 py-12">
                <section>
                    <h2>1. Verantwortlicher</h2>
                    <p>
                        Verantwortlich im Sinne der Datenschutzgesetze ist:<br />
                        Markus Kaluza<br />
                        Personal Training Kaluza + Team<br />
                        Hannoversche Str. 82, 30916 Isernhagen<br />
                        Tel.: 0174 / 4010440<br />
                        E-Mail: info@personaltrainer-hannover.de
                    </p>
                </section>

                <section>
                    <h2>2. Erhebung und Speicherung personenbezogener Daten</h2>
                    <p>
                        Wir verarbeiten Daten, die Sie uns im Rahmen Ihrer Kontaktaufnahme über das
                        Formular freiwillig mitteilen (Name, E-Mail, Nachricht). Diese Daten
                        verwenden wir ausschließlich zur Beantwortung Ihrer Anfrage und löschen sie,
                        sobald der Zweck erfüllt ist.
                    </p>
                </section>

                <section>
                    <h2>3. Server-Logfiles</h2>
                    <p>
                        Beim Besuch unserer Website werden automatisch technische Daten (z. B. IP-Adresse,
                        Browsertyp, Zugriffszeit) in Logfiles erfasst. Diese Daten dienen ausschließlich
                        der Gewährleistung des Betriebs und der Sicherheit und werden nach sieben Tagen gelöscht.
                    </p>
                </section>

                <section>
                    <h2>4. Cookies</h2>
                    <p>
                        Wir setzen nur technisch notwendige Cookies ein, z. B. für den Warenkorb oder die
                        Sitzungsverwaltung. Eine Speicherung personenbezogener Daten in Cookies erfolgt nicht.
                    </p>
                </section>

                <section>
                    <h2>5. Weitergabe von Daten</h2>
                    <p>
                        Ihre Daten werden nicht an Dritte weitergegeben, außer es ist gesetzlich vorgeschrieben
                        (z. B. Finanzamt) oder zur Vertragserfüllung notwendig (z. B. Zahlungsdienstleister).
                    </p>
                </section>

                <section>
                    <h2>6. Ihre Rechte</h2>
                    <ul>
                        <li>Auskunft über gespeicherte Daten</li>
                        <li>Berichtigung, Löschung oder Einschränkung der Verarbeitung</li>
                        <li>Widerspruch und Datenübertragbarkeit</li>
                        <li>Beschwerde bei der Aufsichtsbehörde</li>
                    </ul>
                </section>

                <section>
                    <h2>7. Änderung der Erklärung</h2>
                    <p>
                        Wir passen diese Datenschutzerklärung bei Bedarf an. Die jeweils aktuelle Version
                        finden Sie stets auf dieser Seite.
                    </p>
                </section>
            </div>
        </>
    );
}
