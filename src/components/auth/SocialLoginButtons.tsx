"use client"; // 로그인 버튼 컴포넌트가 클라이언트 컴포넌트이기 때문에 무조건 client.ts를 사용

import { createClient } from "@/supabase/client";
import {Button} from "@/components/ui/button";

const supabase = createClient();

function SocialLoginButtons() {
    const handleLogin = async (provider: 'google' | 'kakao') => {
        await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        });
    }
    return (
        <div>
            <div>
                <Button onClick={()=>handleLogin('google')} >구글로그인</Button>
                <Button onClick={()=>handleLogin('kakao')} >카카오로그인</Button>
            </div>
        </div>
    )
}
export default SocialLoginButtons;