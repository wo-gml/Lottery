import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const { searchParams, origin } = requestUrl;

    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/";
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type") as | "signup" | "recovery" | "magiclink" | "invite" | "email_change" | null;

    if (token_hash && type) {
        const supabase = await createClient();
        const { error } = await supabase.auth.verifyOtp({ type, token_hash });
        if (!error) {
            return NextResponse.redirect(`${origin}${next}`);
        }
        console.error("OTP verification error:", error);
    } else if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            return NextResponse.redirect(`${origin}${next}`);
        }
        console.error("Code exchange error:", error);
    } else {
        console.error("No code or token_hash found in callback URL:", requestUrl.toString());
    }

    // 인증 실패 시 로그인 페이지로
    return NextResponse.redirect(`${origin}/login?error=인증에 실패했습니다.`);
}
