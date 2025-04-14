import createClient from "./client";
import { v4 as uuidv4 } from "uuid";

// Supabase 클라이언트 초기화
const supabase = createClient();

// 로그인 사용자가 이미지 업로드하게 수정
export const PostUploadImg = async (
  file: File,
  category: "shelter" | "daily",
  userId: string,
): Promise<string> => {
  // 카테고리에 따라 저장할 스토리지 버킷 선택
  const bucket = category === "shelter" ? "shelter-image" : "daily-image";

  // 확장자 추출
  const extension = file.name.split(".").pop();

  // UUID 안전한 파일명 생성 (원본 이름 제거 한글/특수문자 오류 방지)
  const safeFileName = `${uuidv4()}.${extension}`;

  // 사용자 ID 기반으로 디렉토리 경로 구성
  const path = `posts/${userId}/${safeFileName}`;
  console.log(path);

  // 이미지 Supabase 스토리지 업로드 수행
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: "3600", // 브라우저 캐시: 1시간
      upsert: true, // 기존 파일 덮어쓰기 허용
    });

  if (uploadError) {
    console.error("이미지 업로드 실패:", uploadError.message);
    throw new Error(uploadError.message);
  }

  // 업로드된 파일의 public URL 반환
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};
