"use client";

import { Input } from "@/components/ui/input";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { useState } from "react";

type Props = {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  disabled?: boolean;
};

export default function ProfileImageInput({ register, errors, disabled }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // 이미지 미리보기 url저장
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">프로필 이미지 업로드</label>
      
      <Input
        type="file"
        accept="image/*"
        {...register("profile_image")}
        disabled={disabled}
        onChange={handleChange}
      />

      {previewUrl && (
        <img
          src={previewUrl}
          alt="프로필 이미지 미리보기"
          className="w-24 h-24 rounded-full object-cover border"
        />
      )}

      {errors.profile_image?.message && typeof errors.profile_image.message === "string" && (
        <p className="text-sm text-red-500">{errors.profile_image.message}</p>
      )}
    </div>
  );
}