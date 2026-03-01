"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import Link from "next/link";
import { Dices } from "lucide-react";

const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

export default function LoginPage() {
    const [state, action, pending] = useActionState(
        async (_: unknown, formData: FormData) => login(formData),
        null
    );

    return (
        <div className="flex w-full items-center justify-center min-h-[calc(100vh-4rem)] pt-16">
            <div className="w-full max-w-sm p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                        <Dices size={24} />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">환영합니다</h1>
                    <p className="text-sm text-gray-500 mt-2">이메일과 비밀번호로 로그인하세요</p>
                </div>

                <form action={action} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">이메일</label>
                        <input id="email" name="email" type="email" className={inputClass} placeholder="you@example.com" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">비밀번호</label>
                        <input id="password" name="password" type="password" className={inputClass} placeholder="••••••••" required />
                    </div>

                    {state?.error && (
                        <div className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-lg">
                            {state.error === "Invalid login credentials"
                                ? "이메일 또는 비밀번호가 올바르지 않습니다."
                                : state.error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={pending}
                        className="w-full py-3.5 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors disabled:opacity-70"
                    >
                        {pending ? "로그인 중..." : "로그인"}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-500">
                    계정이 없으신가요?{" "}
                    <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                        회원가입
                    </Link>
                </p>
            </div>
        </div>
    );
}
