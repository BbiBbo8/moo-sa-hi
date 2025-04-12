"use client";

import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/PopOver";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import createClient from "@/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

interface ProfileEditPopProps {
  userId: string;
  nickname: string;
  avatarUrl: string;
}

// 닉네임 유효성 검사 스키마 정의
const nicknameSchema = z
  .string()
  .min(2, { message: "닉네임은 최소 2자 이상이어야 해요." })
  .max(20, { message: "닉네임은 최대 20자까지 가능해요." });

const ProfileEditPop = ({
  userId,
  nickname,
  avatarUrl,
}: ProfileEditPopProps) => {
  const supabase = createClient();

  const [open, setOpen] = useState(false);
  const [editNickname, setEditNickname] = useState(nickname);
  const [editAvatarUrl, setEditAvatarUrl] = useState(avatarUrl);

  // 팝업이 열릴 때 기존 정보를 표시
  useEffect(() => {
    if (open) {
      setEditNickname(nickname);
      setEditAvatarUrl(avatarUrl);
    }
  }, [open, nickname, avatarUrl]);

  // users 테이블 업데이트
  const handleUpdate = async () => {
    try {
      nicknameSchema.parse(editNickname);

      const { error } = await supabase
        .from("users")
        .update({
          nickname: editNickname,
          profile_image: editAvatarUrl,
        })
        .eq("id", userId);

      if (error) throw new Error("업데이트 실패");

      toast.success("업데이트 완료!");
      setOpen(false);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
      } else {
        toast.error(err.message || "업데이트 중 오류 발생");
      }
    }
  };

  // 프로필 이미지 업로드 (storage → public URL)로 변환 후 반영
  const handleAvatarUpload = async (file: File) => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file);

      if (uploadError) throw new Error("이미지 업로드 실패");

      const publicUrl = supabase.storage.from("avatars").getPublicUrl(fileName)
        .data.publicUrl;

      setEditAvatarUrl(publicUrl);
      toast.success("아바타 변경 완료!");
    } catch (err: any) {
      toast.error(err.message || "이미지 업로드 중 오류 발생");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="sm" className="bg-gray-400">
          프로필 수정
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 rounded-lg p-4">
        <div className="grid gap-4">
          <div className="space-y-1">
            <h4 className="text-base font-semibold">정보 수정</h4>
            <p className="text-muted-foreground text-sm">
              닉네임과 아바타를 바꿔보세요.
            </p>
          </div>

          <div className="grid gap-3">
            {/* 닉네임 입력 */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="nickname" className="text-sm">
                닉네임
              </label>
              <Input
                id="nickname"
                value={editNickname}
                onChange={e => setEditNickname(e.target.value)}
                placeholder="닉네임 입력"
                className="col-span-2 h-8 text-sm"
              />
            </div>

            {/* 아바타 이미지 업로드 */}
            <div className="grid grid-cols-3 items-center gap-4">
              <span className="text-sm">아바타</span>
              <div className="col-span-2 flex items-center gap-2">
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) handleAvatarUpload(file);
                  }}
                  className="hidden"
                />
                <Button
                  size="sm"
                  variant="outline"
                  type="button"
                  onClick={() => {
                    document.getElementById("avatar")?.click();
                  }}
                >
                  파일 선택
                </Button>
                {editAvatarUrl && (
                  <img
                    src={editAvatarUrl}
                    alt="avatar preview"
                    className="h-8 w-8 rounded-full"
                  />
                )}
              </div>
            </div>

            {/* 저장 버튼 */}
            <div className="mt-2 flex justify-end">
              <Button size="sm" onClick={handleUpdate}>
                저장
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileEditPop;
