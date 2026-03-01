"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

// 로그인
export async function login(formData: FormData) {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    });
    if (error) return { error: error.message };
    redirect("/");
}

// 회원가입
export async function signup(formData: FormData) {
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/auth/callback`,
        },
    });
    if (error) return { error: error.message };
    return { success: true };
}

// 로그아웃
export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/");
}
