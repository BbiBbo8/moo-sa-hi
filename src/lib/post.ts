import { z } from "zod";

// 공통 폼 필드 타입 정의
export type PostFormData = {
  title: string;
  contents: string;
  image?: File | null; // Daily용 이미지
};

// 공통 스키마
const postEditor = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  contents: z.string().min(1, "본문을 입력해주세요"),
  image: z.any().optional(),
});

//
export const getEditor = () => postEditor;

// insert, update payload 생성
export const getPayload = (data: PostFormData) => {
  return {
    title: data.title,
    contents: data.contents,
    img_url: data.image ? data.image.name : "",
  };
};
