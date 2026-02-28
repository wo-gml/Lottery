"use client";

import { TrendingUp, BarChart3, PieChart } from "lucide-react";

// 가상의 통계 데이터
const mockStats = [
    { number: 34, count: 184, percent: "8.4%" },
    { number: 43, count: 180, percent: "8.2%" },
    { number: 12, count: 178, percent: "8.1%" },
    { number: 27, count: 175, percent: "8.0%" },
    { number: 1, count: 174, percent: "7.9%" },
    { number: 14, count: 172, percent: "7.8%" },
    { number: 39, count: 170, percent: "7.7%" },
    { number: 40, count: 168, percent: "7.6%" },
    { number: 33, count: 165, percent: "7.5%" },
    { number: 18, count: 162, percent: "7.4%" },
];

export default function StatsPage() {
    const getNumberColorClass = (num: number) => {
        if (num <= 10) return "bg-yellow-400";
        if (num <= 20) return "bg-blue-400";
        if (num <= 30) return "bg-red-400";
        if (num <= 40) return "bg-gray-400";
        return "bg-green-400";
    };

    return (
        <div className="w-full flex justify-center py-16 pb-24">
            <div className="w-full max-w-5xl px-6">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-3">
                            <TrendingUp size={16} />
                            빅데이터 통계
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">당첨 번호 출현 통계</h1>
                        <p className="text-gray-500 mt-2">동행복권(dhlottery.co.kr)의 누적 통계 데이터를 기반으로 합니다.</p>
                    </div>

                    <div className="flex gap-3">
                        <a href="https://dhlottery.co.kr" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                            공식 홈페이지
                        </a>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                            <BarChart3 size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">최다 출현 번호</p>
                            <p className="text-2xl font-bold text-gray-900">34 <span className="text-sm font-normal text-gray-500 ml-1">(184회)</span></p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">최소 출현 번호</p>
                            <p className="text-2xl font-bold text-gray-900">9 <span className="text-sm font-normal text-gray-500 ml-1">(132회)</span></p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                            <PieChart size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">가장 많이 나온 색상</p>
                            <p className="text-2xl font-bold text-gray-900">파란색 <span className="text-sm font-normal text-gray-500 ml-1">(11~20)</span></p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-900">번호별 누적 당첨 횟수 순위 (TOP 10)</h2>
                    </div>
                    <div className="p-6">
                        <div className="space-y-6">
                            {mockStats.map((stat, index) => (
                                <div key={stat.number} className="flex items-center gap-4">
                                    <div className="w-6 text-center text-sm font-bold text-gray-400">
                                        {index + 1}
                                    </div>
                                    <div className={`w-10 h-10 flex-shrink-0 flex justify-center items-center rounded-full text-white font-bold shadow-sm ${getNumberColorClass(stat.number)}`}>
                                        {stat.number}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700">{stat.count}회 당첨</span>
                                            <span className="text-sm text-gray-500">{stat.percent}</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                            <div
                                                className="bg-blue-500 h-2 rounded-full"
                                                style={{ width: `${(stat.count / 200) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
