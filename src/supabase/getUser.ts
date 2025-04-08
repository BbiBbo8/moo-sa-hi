import React from "react";
import { supabase } from "./client";

const getUser = async () => {
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("nickname", "닉네임뭐하지") /* 테스트용 코드 */
    .single();

  if (error) {
    console.error("사용자 데이터 가져오기 실패:", error);
    return null;
  }
  return users;
};

export default getUser;
