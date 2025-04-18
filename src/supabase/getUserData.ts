import createClient from "./client";

const getUserData = () => {
  const supabase = createClient();

  const fetchUser = async () => {
    try {
      // login한 유저의 정보를 쿠키를 참조해 가져오기
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const userId = user?.id;
      const { data: userMetaData} = await supabase
        .from("users")
        .select("*")
        .eq("id", userId!) /* 가져온 유저를 참조해 users table 정보를 가져오기 */
        .single();
      return { user, userMetaData };
    } catch (error) {
      console.error(error);
      throw new Error("유저 불러오기 실패");
    }
  };
  return fetchUser();
};

export default getUserData;
