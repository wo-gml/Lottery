import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LottoPick - 프리미엄 로또 추천",
  description: "역대 로또 당첨 번호, 통계 및 번호 추천 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <nav className="w-full border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl tracking-tight text-blue-600">LottoPick</Link>

            <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
              <Link href="/recommend" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">번호 추천</Link>
              <Link href="/history" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">당첨 내역</Link>
              <Link href="/stats" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">당첨 통계</Link>
            </div>

            <div className="flex gap-2 md:gap-4">
              <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 md:px-4 py-2">로그인</Link>
              <Link href="/signup" className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 md:px-5 py-2 rounded-full transition-colors hidden sm:block">회원가입</Link>
            </div>
          </div>

          {/* Mobile Bottom Navigation (optional for very small screens, keeping simple for now) */}
          <div className="md:hidden flex px-6 py-3 border-t border-gray-50 justify-between">
            <Link href="/recommend" className="text-xs font-medium text-gray-600 hover:text-blue-600">추천</Link>
            <Link href="/history" className="text-xs font-medium text-gray-600 hover:text-blue-600">내역</Link>
            <Link href="/stats" className="text-xs font-medium text-gray-600 hover:text-blue-600">통계</Link>
            <Link href="/signup" className="text-xs font-medium text-blue-600 sm:hidden">가입</Link>
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
