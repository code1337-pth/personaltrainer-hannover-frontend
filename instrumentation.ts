// instrumentation.ts
import strapiCache from "@/lib/strapiCache";

export async function register() {
    console.log("current runtime:", process.env.NEXT_RUNTIME);
    if (process.env.NEXT_RUNTIME === "nodejs") {
        console.log("nodejs runtime detected, preloading strapi cache");
        try{
            await strapiCache.preload();
        }
        catch (e) {
            console.error("Fehler bei der Kommunikation mit dem Backend:", e);
        }
    }
}