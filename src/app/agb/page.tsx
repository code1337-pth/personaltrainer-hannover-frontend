// src/app/impressum/page.tsx
import CategoryHeroSection from "@/app/components/CategoryHeroSection";
import Link from "next/link";

export const metadata = {
    title: "AGB | Personal Training Kaluza + Team",
    description: "Allgemeine Geschäftsbedingungen (AGB) für Personal Training Kaluza + Team",
};

export default function TermsPage() {
    return (
        <>
            {/* Hero-Block als Header */}
            <CategoryHeroSection
                title="Allgemeine Geschäftsbedingungen (AGB)"
                description="Markus - Kaluza Premium Personal Training + Team"
            />

            {/* Layout-Wrapper für den Slider */}
            <div className="container mx-auto blog-article">
                <section>
                    <h2>1. Geltungsbereich</h2>
                    <p>
                        Diese AGB gelten für alle Verträge über Dienstleistungen von
                        Personal Training Kaluza + Team, Hannoversche Str. 82, 30916
                        Isernhagen (nachfolgend: „Anbieter“), die ein Kunde (nachfolgend:
                        „Klient“) abschließt. Abweichende oder ergänzende Vereinbarungen
                        bedürfen der Schriftform.
                    </p>
                </section>

                <section>
                    <h2>2. Leistungsbeschreibung</h2>
                    <p>
                        Der Anbieter erbringt Personal Training, Gesundheits- und
                        Ernährungsberatung sowie ggf. Gruppentraining („Leistungen“) gemäß
                        individueller Absprache. Die Trainingsdauer beträgt in der Regel
                        60 Minuten und kann nach beidseitiger Vereinbarung um bis zu 15 Min.
                        variieren. Ein Abbruch vor Ablauf berechtigt nicht zu Gutschrift oder
                        Rückerstattung.
                    </p>
                </section>

                <section>
                    <h2>3. Vertragsschluss</h2>
                    <p>
                        Der Vertrag kommt mit Unterzeichnung des Anamnesebogens oder durch
                        Buchung per Email/Telefon zustande. Gutscheine und Zeitkarten sind ab
                        Kaufdatum ein Jahr gültig und nicht übertragbar. Eine Auszahlung
                        nicht genutzter Einheiten ist ausgeschlossen.
                    </p>
                </section>

                <section>
                    <h2>4. Preise und Zahlungsbedingungen</h2>
                    <p>
                        Die jeweils vereinbarten Preise gelten bei Vertragsschluss. Der
                        Klient erhält eine Rechnung, die ohne Abzug sofort fällig ist.
                        Fahrtkosten und Zusatzleistungen (z. B. Fremdanbieter, Hallenmiete)
                        werden gesondert berechnet.
                    </p>
                </section>

                <section>
                    <h2>5. Absage und Ausfall</h2>
                    <p>
                        Absagen müssen spätestens 24 Stunden vor Trainingsbeginn schriftlich
                        (E-Mail oder SMS) erfolgen. Bei späterer Absage oder Nichterscheinen
                        wird die volle Trainingsgebühr berechnet. Der Anbieter kann Sessions
                        bei höherer Gewalt oder unvorhergesehenem Ausfall verschieben.
                    </p>
                </section>

                <section>
                    <h2>6. Haftung</h2>
                    <p>
                        Der Klient ist verpflichtet, vor Trainingsbeginn einen
                        Gesundheitsfragebogen vollständig auszufüllen. Der Anbieter haftet
                        nur für Schäden aus Vorsatz und grober Fahrlässigkeit. Eine weitergehende
                        Haftung, insbesondere für mittelbare Schäden oder entgangenen
                        Gewinn, ist ausgeschlossen. Der Klient sollte eine private Unfall- und
                        Haftpflichtversicherung abschließen. Der Anbieter verfügt über eine
                        Betriebshaftpflichtversicherung.
                    </p>
                </section>

                <section>
                    <h2>7. Datenschutz</h2>
                    <p>
                        Personenbezogene Daten des Klienten werden nur zum Zwecke der
                        Vertragserfüllung gespeichert und nicht an Dritte weitergegeben.
                        Weitere Informationen entnehmen Sie unserer
                        <Link hrefLang="de" href={"/datenschutz"} className="underline">Datenschutzerklärung</Link>.
                    </p>
                </section>

                <section>
                    <h2>8. Vertragsdauer und Kündigung</h2>
                    <p>
                        Die Vertragsdauer richtet sich nach individueller Vereinbarung. Beide
                        Parteien können das Vertragsverhältnis jederzeit ohne Angabe von
                        Gründen schriftlich kündigen. Bei Zahlungsverzug von mehr als 14 Tagen
                        kann der Anbieter außerordentlich kündigen.
                    </p>
                </section>

                <section>
                    <h2>9. Schlussbestimmungen</h2>
                    <p>
                        Änderungen und Ergänzungen dieser AGB bedürfen der Schriftform. Sollten
                        einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der
                        übrigen Bestimmungen unberührt. Es gilt deutsches Recht. Gerichtsstand
                        und Erfüllungsort ist Hannover.
                    </p>
                </section>
            </div>
        </>
    );
}
