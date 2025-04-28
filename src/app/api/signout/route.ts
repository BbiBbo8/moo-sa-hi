import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import createClient from "@/supabase/client";


export async function POST() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("로그아웃 실패:", error.message);
    return NextResponse.json({ message: "로그아웃 실패" }, { status: 500 });
  }

  revalidatePath("/");
  return NextResponse.json({ message: "로그아웃 성공" }, { status: 200 });
}