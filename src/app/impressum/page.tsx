// src/app/impressum/page.tsx
import CategoryHeroSection from "@/app/components/CategoryHeroSection";

export const metadata = {
    title: "Impressum | Markus Kaluza - Premium Personal Training + Team",
    description: "Impressum und rechtliche Angaben gemäß § 5 TMG",
};

export default function ImpressumPage() {
    return (
        <>
            {/* Hero-Block als Header */}
            <CategoryHeroSection
                title="Impressum"
                description="Markus - Kaluza Premium Personal Training + Team"
            />

            {/* Layout-Wrapper für den Slider */}
            <div className="container mx-auto blog-article">
                <section>
                    <h2>Angaben gemäß § 5 TMG</h2>
                    <p>
                        <strong>Markus Kaluza Consulting</strong><br/>
                        Markus Kaluza<br/>
                        Hannoversche Str. 82<br/>
                        30916 Isernhagen<br/>
                        Deutschland
                    </p>
                    <p>
                        <strong>Telefon:</strong> 0174 / 4010440<br/>
                        <strong>E-Mail:</strong> <a
                        href="mailto:info@personaltrainer-hannover.de">info@personaltrainer-hannover.de</a>
                    </p>
                    <p>
                        <strong>Umsatzsteuer-ID:</strong> DE21827XXX4
                    </p>
                </section>

                <section>
                    <h2>Inhaltlich Verantwortlicher</h2>
                    <p>Markus Kaluza (Anschrift wie oben)</p>
                </section>

                <section>
                    <h2>Haftungsausschluss (Disclaimer)</h2>
                    <h3>Haftung für Inhalte</h3>
                    <p>
                        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene
                        Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
                        Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                        verpflichtet, übermittelte oder gespeicherte fremde Informationen
                        zu überwachen oder nach Umständen zu forschen, die auf eine
                        rechtswidrige Tätigkeit hinweisen.
                    </p>
                    <p>
                        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
                        Informationen nach den allgemeinen Gesetzen bleiben hiervon
                        unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
                        Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
                        Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir
                        diese Inhalte umgehend entfernen.
                    </p>

                    <h3>Haftung für Links</h3>
                    <p>
                        Unser Angebot enthält Links zu externen Websites Dritter, auf deren
                        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
                        fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
                        verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
                        der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt
                        der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
                        Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine
                        permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch
                        ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar.
                        Bei Bekanntwerden von Rechtsverletzungen werden wir derartige
                        Links umgehend entfernen.
                    </p>
                </section>

                <section>
                    <h2>Urheberrecht</h2>
                    <p>
                        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
                        Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind
                        als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung,
                        Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
                        Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen
                        Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur
                        für den privaten, nicht kommerziellen Gebrauch gestattet.
                    </p>
                </section>
            </div>
        </>
    );
}
