"use client";

import createClient from "./client";

const getUserData = () => {
  const supabase = createClient();

  const fetchUser = async () => {
    // login한 유저의 정보를 쿠키를 참조해 가져오기
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data: userMetaData, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", `${user?.id}`) /* 가져온 유저를 참조해 table 정보를 가져오기 */
      .single();

    if (error) {
      console.error("사용자 데이터 가져오기 실패:", error);
      return null;
    }
    return { user, userMetaData };
  };
  return fetchUser();
};

export default getUserData;
