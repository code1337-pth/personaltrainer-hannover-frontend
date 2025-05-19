import { NextRequest, NextResponse } from "next/server";
import strapiCache from "@/lib/strapiCache";

const SECRET = process.env.CACHE_REFRESH_SECRET;

export async function POST(req: NextRequest) {
    console.log("Header:", JSON.stringify(req.headers.get("authorization")));
    console.log("Secret:", JSON.stringify(`Bearer ${SECRET}`));
    if (req.headers.get("authorization") !== `Bearer ${SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    strapiCache.clearCache()
    await strapiCache.preload();
    return NextResponse.json({ success: true });
}