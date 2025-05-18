// instrumentation.ts
import strapiCache from "@/lib/strapiCache";

export async function register() {
    if (process.env.NEXT_RUNTIME === "nodejs") {
        console.log("nodejs runtime detected, preloading strapi cache");
        await strapiCache.preload();
    }
}