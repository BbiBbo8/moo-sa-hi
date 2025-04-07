"use client";

import { Input } from "@/components/ui/input";
import { UseFormRegister, FieldErrors } from "react-hook-form";

type Props = {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  disabled?: boolean;
};

export default function ProfileImageInput({ register, errors, disabled }: Props) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        프로필 이미지 업로드
      </label>

      {/* 이미지 파일 업로드 인풋 */}
      <Input
        type="file"
        accept="image/*"
        {...register("profile_image")}
        disabled={disabled}
      />

      {/* 유효성 에러 메시지 출력 */}
      {errors.profile_image?.message && typeof errors.profile_image.message === "string" && (
        <p className="text-sm text-red-500">{errors.profile_image.message}</p>
      )}
    </div>
  );
}