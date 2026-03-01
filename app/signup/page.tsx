"use client";

import { useActionState } from "react";
import { signup } from "@/app/actions/auth";
import Link from "next/link";
import { Dices } from "lucide-react";

const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

export default function SignupPage() {
    const [state, action, pending] = useActionState(
        async (_: unknown, formData: FormData) => signup(formData),
        null
    );

    if (state?.success) {
        return (
            <div className="flex w-full items-center justify-center min-h-[calc(100vh-4rem)] pt-16">
                <div className="w-full max-w-sm p-8 bg-white rounded-3xl shadow-sm border border-gray-100 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-50 text-green-500 flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">인증 메일 발송 완료!</h2>
                    <p className="text-gray-500 mb-6">
                        입력하신 이메일로 인증 메일을 보냈습니다.<br />
                        메일함을 확인하고 링크를 클릭하면 가입이 완료됩니다.
                    </p>
                    <Link href="/login" className="inline-block w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
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
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">회원가입</h1>
                    <p className="text-sm text-gray-500 mt-2">LottoPick의 프리미엄 서비스를 시작하세요</p>
                </div>

                <form action={action} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">이메일</label>
                        <input id="email" name="email" type="email" className={inputClass} placeholder="you@example.com" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">비밀번호</label>
                        <input id="password" name="password" type="password" className={inputClass} placeholder="6자 이상 입력" required minLength={6} />
                    </div>

                    {state?.error && (
                        <div className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-lg">
                            {state.error === "User already registered"
                                ? "이미 가입된 이메일입니다."
                                : state.error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={pending}
                        className="w-full py-3.5 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors disabled:opacity-70"
                    >
                        {pending ? "가입 중..." : "회원가입하기"}
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
