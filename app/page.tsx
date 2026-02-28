import { Dices, TrendingUp, History, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full flex justify-center pb-24">
      <div className="w-full max-w-5xl px-6">

        {/* Hero Section */}
        <section className="py-24 md:py-32 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            최신 당첨 번호 업데이트 완료
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
            과학적 데이터로<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">당신의 행운을 </span>디자인하세요
          </h1>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl">
            LottoPick은 역대 당첨 번호의 통계적 분석을 통해 가장 확률 높은 프리미엄 로또 번호를 추천해 드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/recommend" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30">
              <Dices size={20} />
              무료 조합 받기
            </Link>
            <Link href="/history" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-all">
              <History size={20} />
              역대 당첨 내역
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
              <Dices size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">스마트 번호 추천</h3>
            <p className="text-gray-500 leading-relaxed">
              자체 알고리즘과 통계 패턴을 기반으로 당첨 확률이 높은 최적의 로또 번호 6자리를 추천합니다.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">빅데이터 기반 통계</h3>
            <p className="text-gray-500 leading-relaxed">
              1회부터 현재까지의 모든 당첨 번호를 분석하여, 번호별 출현 빈도 및 패턴 정보를 제공합니다.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
              <History size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">회차별 당첨 조회</h3>
            <p className="text-gray-500 leading-relaxed">
              매주 업데이트되는 최신 회차 당첨 번호와 역대 모든 회차의 당첨 내역을 한눈에 확인할 수 있습니다.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
