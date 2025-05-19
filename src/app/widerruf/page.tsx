// src/app/impressum/page.tsx
import CategoryHeroSection from "@/app/components/CategoryHeroSection";

export const metadata = {
    title: "Widerrufsbelehrung | Markus Kaluza - Premium Personal Training + Team",
    description: "Informationen zum Widerrufsrecht für Kunden von Personal Training Kaluza + Team",
};

export default function WithdrawalPage() {
    return (
        <>
            {/* Hero-Block als Header */}
            <CategoryHeroSection
                title="Widerrufsbelehrung"
                description="Markus - Kaluza Premium Personal Training + Team"
            />

            {/* Layout-Wrapper für den Slider */}
            <div className="container mx-auto blog-article">
                <section>
                    <h2>Widerrufsrecht</h2>
                    <p>
                        Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen ggf. abgeschlossene Verträge
                        zu widerrufen.
                    </p>
                    <p>Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.</p>
                </section>

                <section>
                    <h2>Ausübung des Widerrufs</h2>
                    <p>
                        Um Ihr Widerrufsrecht auszuüben, müssen Sie uns
                    </p>
                    <address>
                        Personal Training Kaluza + Team<br/>
                        Markus Kaluza<br/>
                        Hannoversche Str. 82<br/>
                        30916 Isernhagen<br/>
                        Tel.: 0174 / 4010440<br/>
                        E-Mail: info@personaltrainer-hannover.de
                    </address>
                    <p>
                        mittels einer eindeutigen Erklärung (z. B. ein per Post versandter Brief, Telefax oder E-Mail)
                        über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Zur Wahrung der Widerrufsfrist
                        reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufs vor Ablauf der
                        Widerrufsfrist absenden.
                    </p>
                </section>

                <section>
                    <h2>Folgen des Widerrufs</h2>
                    <p>
                        Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten
                        haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus
                        ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste
                        Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag
                        zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen
                        ist.
                    </p>
                    <p>
                        Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen
                        Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes
                        vereinbart.
                    </p>
                </section>

                <section>
                    <h2>Ausschluss bzw. vorzeitiges Erlöschen des Widerrufsrechts</h2>
                    <p>
                        Das Widerrufsrecht erlischt vorzeitig, wenn beide Vertragsparteien – auf ausdrücklichen Wunsch
                        des Klienten – vollständig mit der Ausführung der Dienstleistung vor Ablauf der Widerrufsfrist
                        begonnen haben und der Klient gleichzeitig ausdrücklich zugestimmt hat, dass der Anbieter mit
                        der Ausführung der Dienstleistung vor Ablauf der Widerrufsfrist beginnt und sie seine Kenntnis
                        darüber bestätigt hat, dass er sein Widerrufsrecht bei vollständiger Vertragserfüllung durch den
                        Anbieter verliert.
                    </p>
                </section>

                <section>
                    <h2>Muster-Widerrufsformular</h2>
                    <p>
                        (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden
                        Sie es zurück.)
                    </p>
                    <form className="border p-4 bg-gray-50 rounded">
                        <p>
                            An Personal Training Kaluza + Team, Hannoversche Str. 82, 30916 Isernhagen,
                            Tel.: 0174 / 4010440, E-Mail: info@personaltrainer-hannover.de
                        </p>
                        <p>
                            – Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die
                            Erbringung der folgenden Dienstleistung:
                        </p>
                        <ul className="list-inside list-disc">
                            <li>………………………………………………………………………………</li>
                            <li>Bestellt am: ……………………………… / erhalten am: ………………………………</li>
                            <li>Name des/der Verbraucher(s): ……………………………………………………………………</li>
                            <li>Anschrift des/der Verbraucher(s): ……………………………………………………………</li>
                        </ul>
                        <p>
                            Datum: ……………………………… Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)
                        </p>
                        <p>(*) Unzutreffendes streichen.</p>
                    </form>
                </section>
            </div>
        </>
    );
}
