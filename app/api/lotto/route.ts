import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const drawNo = new URL(req.url).searchParams.get("drawNo");
    if (!drawNo) return NextResponse.json(null, { status: 400 });

    try {
        const res = await fetch(
            `https://search.naver.com/search.naver?query=로또당첨번호+${drawNo}회`,
            { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } }
        );
        if (!res.ok) return NextResponse.json(null);

        const $ = cheerio.load(await res.text());

        const numbers = $("div.winning_number span.ball")
            .toArray()
            .map((el) => parseInt($(el).text(), 10));
        const bonus = parseInt($("div.bonus_number span.ball").text(), 10);
        if (numbers.length !== 6 || !bonus) return NextResponse.json(null);

        const winText = $("p.win_text").text();
        const prize = (winText.match(/당첨금\s*([\d,]+)원/)?.[1] ?? "0") + "원";
        const winners = parseInt(winText.match(/복권수\s*(\d+)개/)?.[1] ?? "0", 10);

        const dateMatch = winText.match(/(\d{4}\.\d{2}\.\d{2})/);
        const date = dateMatch
            ? dateMatch[1].replace(/\./g, "-")
            : new Date(new Date("2002-12-07").getTime() + (Number(drawNo) - 1) * 7 * 86400000)
                .toISOString().split("T")[0];

        return NextResponse.json({ drawNo: Number(drawNo), date, numbers, bonus, prize, winners });
    } catch {
        return NextResponse.json(null);
    }
}
