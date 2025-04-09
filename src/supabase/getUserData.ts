"use client";

import React, { useEffect } from "react";
import createClient from "./client";

const getUserData = () => {
  const supabase = createClient();

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    // 이후 로그인된 user id와 맞는 id 불러오는 로직으로 변경 예정
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", `${user?.id}`) /* 테스트용 코드 */
      .single();

    if (error) {
      console.error("사용자 데이터 가져오기 실패:", error);
      return null;
    }

    console.log("auth 정보=", user);
    console.log("auth의 metadata=", users);
    return { user, users };
  };
  return fetchUser();
};

export default getUserData;
