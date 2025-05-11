import strapiCache, {CacheKey} from "@/lib/strapiCache";
import ReasonsSlider from "./ReasonsSlider";

export default async function ReasonSection() {
    const reasonLists = await strapiCache.fetchData(CacheKey.ReasonLists, CacheKey.ReasonLists);
    const reasonsPth = reasonLists.find(value => value.name === "reasons-pth");

    if (!reasonsPth) {
        return <section><p>Keine Liste gefunden.</p></section>;
    }

    return (
        <section className="bg-primary py-16 md:px-12">
            <div className="max-w-4xl mx-auto text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold">
                    <span className="text-gold">{reasonsPth.reasons?.length ?? 0} gute Gründe,</span> warum du mit uns
                    dein volles Potenzial entfaltest
                </h2>
                <p className="mt-4 px-10 text-lg">{reasonsPth.description}</p>
            </div>

            {/* Hier der Client-Teil */}
            <ReasonsSlider reasons={reasonsPth.reasons}/>
        </section>
    );
}
