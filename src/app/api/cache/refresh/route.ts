import { NextRequest, NextResponse } from "next/server";
import strapiCache from "@/lib/strapiCache";

const SECRET = process.env.CACHE_REFRESH_SECRET;

export async function POST(req: NextRequest) {
    if (req.headers.get("authorization") !== `Bearer ${SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    strapiCache.clearCache()
    await strapiCache.preload();
    return NextResponse.json({ success: true });
}