import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { createClient } from "@/utils/supabase/server";
import { logout } from "@/app/actions/auth";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LottoPick - 프리미엄 로또 추천",
  description: "역대 로또 당첨 번호, 통계 및 번호 추천 서비스",
};

const navLinks = [
  { href: "/recommend", label: "번호 추천" },
  { href: "/history", label: "당첨 내역" },
  { href: "/stats", label: "당첨 통계" },
];

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <nav className="w-full border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl tracking-tight text-blue-600">LottoPick</Link>

            {/* 데스크탑 센터 링크 */}
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  {label}
                </Link>
              ))}
            </div>

            {/* 로그인 상태에 따른 우측 버튼 */}
            <div className="flex items-center gap-2">
              {user ? (
                <>
                  <span className="hidden sm:block text-sm text-gray-500 mr-2 truncate max-w-[140px]">{user.email}</span>
                  <form action={logout}>
                    <button type="submit" className="text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
                      로그아웃
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2">로그인</Link>
                  <Link href="/signup" className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition-colors hidden sm:block">
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* 모바일 하단 네비 */}
          <div className="md:hidden flex px-6 py-3 border-t border-gray-50 justify-around">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="text-xs font-medium text-gray-600 hover:text-blue-600">{label}</Link>
            ))}
            {!user && <Link href="/signup" className="text-xs font-medium text-blue-600">가입</Link>}
          </div>
        </nav>

        <main className="flex-1 bg-gray-50/50 flex flex-col items-center">
          {children}
        </main>

        <footer className="w-full border-t border-gray-100 py-8 bg-white text-center text-sm text-gray-400">
          <p>© 2026 LottoPick. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
