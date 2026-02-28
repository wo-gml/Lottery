"use client";

import { useState } from "react";
import { Dices, RefreshCw } from "lucide-react";

export default function RecommendPage() {
    const [numbers, setNumbers] = useState<number[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    // 로또 번호 생성 함수
    const generateLottoNumbers = () => {
        setIsGenerating(true);
        // 애니메이션 효과를 위해 약간의 딜레이
        setTimeout(() => {
            const nums = new Set<number>();
            while (nums.size < 6) {
                nums.add(Math.floor(Math.random() * 45) + 1);
            }
            setNumbers(Array.from(nums).sort((a, b) => a - b));
            setIsGenerating(false);
        }, 600);
    };

    // 번호별 색상 지정 함수
    const getNumberColor = (num: number) => {
        if (num <= 10) return "bg-yellow-400";
        if (num <= 20) return "bg-blue-400";
        if (num <= 30) return "bg-red-400";
        if (num <= 40) return "bg-gray-400";
        return "bg-green-400";
    };

    return (
        <div className="w-full flex justify-center py-24 min-h-[calc(100vh-4rem)]">
            <div className="w-full max-w-2xl px-6 flex flex-col items-center">

                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 mb-6 mx-auto">
                        <Dices size={32} />
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
                        프리미엄 번호 추천
                    </h1>
                    <p className="text-lg text-gray-500">
                        버튼을 눌러 나만의 특별한 행운의 번호를 조합해보세요.
                    </p>
                </div>

                {/* 번호 표시 영역 */}
                <div className="w-full bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center mb-10 min-h-[200px] justify-center transition-all">
                    {numbers.length > 0 ? (
                        <div className="flex flex-wrap justify-center gap-4 md:gap-6 w-full">
                            {numbers.map((num, i) => (
                                <div
                                    key={i}
                                    className={`w-14 h-14 md:w-20 md:h-20 flex justify-center items-center rounded-full text-white font-bold text-2xl md:text-3xl shadow-md ${getNumberColor(num)} animate-fade-in`}
                                    style={{ animationDelay: `${i * 100}ms` }}
                                >
                                    {num}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-400 flex flex-col items-center">
                            <span className="text-6xl mb-4 opacity-20">?</span>
                            <p>아직 추천받은 번호가 없습니다.</p>
                        </div>
                    )}
                </div>

                {/* 생성 버튼 */}
                <button
                    onClick={generateLottoNumbers}
                    disabled={isGenerating}
                    className="w-full md:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-full flex items-center justify-center gap-3 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-75"
                >
                    <RefreshCw size={24} className={isGenerating ? "animate-spin" : ""} />
                    {isGenerating ? "번호 조합 중..." : "행운의 번호 6개 추천받기"}
                </button>

            </div>
        </div>
    );
}
