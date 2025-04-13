import createClient from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const DailyDeatailPage = ({
  params,
}: {
  params: Promise<{
    id: number;
  }>;
}) => {
  const fetchDailyPostDetail = async () => {
    const supabase = createClient();
    const { id } = await params;
    const { data, error } = await supabase
      .from("daily_post")
      .select(
        `
        id,
        created_at,
        title,
        contents,
        img_url,
        user:user_id (
          nickname,
          profile_image
        ),
        helpfuls (
          id,
          daily_post_id,
          shelter_post_id
        )
      `,
      )
      .eq("id", id);

    if (error) throw new Error(error.message);
    return data;
  };

  const {
    data: dailyPostDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dailyPostDetails"],
    queryFn: fetchDailyPostDetail,
  });
  if (isLoading) {
    return <p>로딩 중...</p>;
  }
  if (error) {
    return <p>에러 발생: {error.message}</p>;
  }

  return (
    <main>
      {dailyPostDetails?.map(post => {
        // TODO: 날짜 작성 형태(년도.월.일)를 형식에 맞춰 반환
        const createdAt = post.created_at;
        const date = new Date(createdAt);
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const formatted = `${date.getFullYear()}.${month}.${day}`;
        return (
          <>
            <h1 className="text-[20px]">{post.title}</h1>
            <span>{formatted}</span>
            {/* NOTE: 한 게시글에 이미지가 여러 개면....이미지만을 위한 수파베이스 테이블을 만들어야하나???? :ㅇ */}
            <Image src={post.img_url || ""} alt="이미지가 없습니다." />
            <p>{post.contents}</p>
          </>
        );
      })}
    </main>
  );
};

export default DailyDeatailPage;
