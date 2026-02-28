"use client";

import { useState, useEffect } from "react";
import { History, TrendingUp, CalendarDays, ExternalLink } from "lucide-react";
import Link from "next/link";

type LottoDraw = {
    drawNo: number;
    date: string;
    numbers: number[];
    bonus: number;
    prize: string;
    winners: number;
};

const FALLBACK: LottoDraw[] = [
    { drawNo: 1111, date: "2024-03-16", numbers: [3, 13, 30, 33, 43, 45], bonus: 4, prize: "1,714,662,540원", winners: 16 },
    { drawNo: 1110, date: "2024-03-09", numbers: [3, 7, 11, 20, 22, 41], bonus: 24, prize: "1,647,392,719원", winners: 16 },
    { drawNo: 1109, date: "2024-03-02", numbers: [10, 12, 13, 19, 33, 40], bonus: 2, prize: "3,051,196,500원", winners: 17 },
    { drawNo: 1108, date: "2024-02-24", numbers: [7, 19, 26, 37, 39, 44], bonus: 27, prize: "1,957,998,429원", winners: 14 },
    { drawNo: 1107, date: "2024-02-17", numbers: [6, 14, 30, 31, 40, 41], bonus: 29, prize: "1,883,524,667원", winners: 14 },
];

const ballColor = (n: number) =>
    n <= 10 ? "bg-yellow-400" : n <= 20 ? "bg-blue-400" : n <= 30 ? "bg-red-400" : n <= 40 ? "bg-gray-400" : "bg-green-400";

const Ball = ({ num, ring = false }: { num: number; ring?: boolean }) => (
    <div className={`w-12 h-12 flex justify-center items-center rounded-full text-white font-bold text-lg shadow-sm ${ballColor(num)} ${ring ? "ring-4 ring-offset-2 ring-gray-100" : ""}`}>
        {num}
    </div>
);

function getCurrentDrawNo() {
    return Math.floor((Date.now() - new Date("2002-12-07T20:45:00+09:00").getTime()) / (7 * 24 * 3600 * 1000)) + 1;
}

async function fetchDraw(drawNo: number): Promise<LottoDraw | null> {
    try {
        const res = await fetch(`/api/lotto?drawNo=${drawNo}`);
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

export default function HistoryPage() {
    const [data, setData] = useState<LottoDraw[]>(FALLBACK);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const current = getCurrentDrawNo();
        Promise.all(Array.from({ length: 5 }, (_, i) => fetchDraw(current - i))).then((results) => {
            const valid = results.filter(Boolean) as LottoDraw[];
            setData(valid.length ? valid : FALLBACK);
            setLoading(false);
        });
    }, []);

    return (
        <div className="w-full flex justify-center py-16 pb-24">
            <div className="w-full max-w-5xl px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-3">
                            <History size={16} /> 당첨 내역
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">역대 로또 당첨 내역</h1>
                        <p className="text-gray-500 mt-2">동행복권(dhlottery.co.kr)의 최신 회차 정보를 실시간으로 가져옵니다.</p>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/stats" className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            <TrendingUp size={16} /> 통계 보기
                        </Link>
                        <a href="https://dhlottery.co.kr" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                            <ExternalLink size={16} /> 공식 홈페이지
                        </a>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-gray-400">불러오는 중...</div>
                ) : (
                    <div className="space-y-6">
                        {data.map((item) => (
                            <div key={item.drawNo} className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-50">
                                    <div className="flex items-center gap-4">
                                        <h2 className="text-2xl font-bold text-blue-600 font-mono">{item.drawNo}회</h2>
                                        <div className="h-4 w-px bg-gray-200" />
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <CalendarDays size={16} /> <span>{item.date}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:items-end">
                                        <span className="text-sm text-gray-500 mb-1">1등 총 당첨금 (1인당)</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-xl font-bold text-gray-900">{item.prize}</span>
                                            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{item.winners}명 당첨</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    <div className="flex flex-col items-center flex-1 w-full md:border-r border-gray-100 md:pr-8">
                                        <span className="text-xs font-semibold text-gray-400 mb-4 tracking-wider uppercase">당첨 번호</span>
                                        <div className="flex flex-wrap justify-center gap-3">
                                            {item.numbers.map((num, i) => <Ball key={i} num={num} />)}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center md:pl-2">
                                        <span className="text-xs font-semibold text-gray-400 mb-4 tracking-wider uppercase">보너스</span>
                                        <Ball num={item.bonus} ring />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
