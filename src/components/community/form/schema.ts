import { z } from "zod";

export const CONGESTION_LEVELS = ["혼잡", "보통", "여유"] as const;
export const HYGIENE_LEVELS = ["청결", "보통", "불량"] as const;

export interface FormData {
  title: string;
  contents: string;
  congestion?: (typeof CONGESTION_LEVELS)[number];
  hygiene?: (typeof HYGIENE_LEVELS)[number];
  address: string;
  lat?: number;
  lng?: number;
}

export const editSchema = z.object({
  title: z.string().min(2, "제목은 2자 이상").max(15, "제목은 15자 미만"),
  contents: z
    .string()
    .min(1, "본문을 입력해주세요")
    .max(500, "500자 이하로 작성해주세요"),
  congestion: z.enum(CONGESTION_LEVELS).optional(),
  hygiene: z.enum(HYGIENE_LEVELS).optional(),
  address: z.string(),
  lat: z.number().optional(),
  lng: z.number().optional(),
});
