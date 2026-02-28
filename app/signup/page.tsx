"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Dices } from "lucide-react";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const supabase = createClient();
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        });

        if (error) {
            setError(error.message);
        } else {
            setSuccess(true);
        }
        setLoading(false);
    };

    if (success) {
        return (
            <div className="flex w-full items-center justify-center min-h-[calc(100vh-4rem)] pt-16">
                <div className="w-full max-w-sm p-8 bg-white rounded-3xl shadow-sm border border-gray-100 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-50 text-green-500 flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">가입 완료!</h2>
                    <p className="text-gray-500 mb-6">입력하신 이메일 확인 메일을 전송했습니다. 이메일을 확인해주세요.</p>
                    <Link href="/login" className="inline-block w-full py-3 bg-blue-600 text-white rounded-xl font-medium">
                        로그인 페이지로
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex w-full items-center justify-center min-h-[calc(100vh-4rem)] pt-16 pb-8">
            <div className="w-full max-w-sm p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                        <Dices size={24} />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">회원가입</h2>
                    <p className="text-sm text-gray-500 mt-2">LottoPick의 프리미엄 서비스를 시작하세요</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                            이메일
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                            비밀번호
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="6자 이상 입력"
                            required
                            minLength={6}
                        />
                    </div>

                    {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors disabled:opacity-70"
                    >
                        {loading ? "가입 중..." : "회원가입하기"}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-500">
                    이미 계정이 있으신가요?{" "}
                    <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                        로그인
                    </Link>
                </p>
            </div>
        </div>
    );
}
