"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/PopOver";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PlusCircleIcon } from "lucide-react";
import createClient from "@/supabase/client";
import { toast } from "sonner";

const ProfileEditPop = () => {
  const supabase = createClient();

  const [nickname, setNickname] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  // 사용자 정보 가져오기 및 예외 처리
  const getUserOrThrow = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user)
      throw new Error("인증된 사용자를 찾을 수 없습니다.");
    return data.user;
  };

  // 닉네임 또는 아바타 데이터를 users 테이블에 반영
  const handleUpdate = async () => {
    try {
      const user = await getUserOrThrow();

      const { error } = await supabase
        .from("users")
        .update({
          nickname,
          profile_image: avatarUrl,
        })
        .eq("id", user.id);

      if (error) throw new Error("업데이트 실패");

      toast.success("업데이트 완료!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "업데이트 중 오류 발생");
    }
  };

  // 파일 업로드 및 아바타 이미지 업데이트
  const handleAvatarUpload = async (file: File) => {
    try {
      const user = await getUserOrThrow();

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file);

      if (uploadError) throw new Error("이미지 업로드 실패");

      const publicUrl = supabase.storage.from("avatars").getPublicUrl(fileName)
        .data.publicUrl;

      const { error: updateError } = await supabase
        .from("users")
        .update({ profile_image: publicUrl })
        .eq("id", user.id);

      if (updateError) throw new Error("프로필 이미지 저장 실패");

      setAvatarUrl(publicUrl);
      toast.success("아바타 변경 완료!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "알 수 없는 오류가 발생했습니다.");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" className="bg-gray-400">
          프로필 수정
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 rounded-lg p-4">
        <div className="grid gap-4">
          {/* 타이틀 및 설명 */}
          <div className="space-y-1">
            <h4 className="text-base font-semibold">정보 수정</h4>
            <p className="text-muted-foreground text-sm">
              닉네임과 아바타를 바꿔보세요.
            </p>
          </div>
          <div className="grid gap-3">
            {/* 닉네임 입력 필드 */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="nickname" className="text-sm">
                닉네임
              </label>
              <Input
                id="nickname"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                placeholder="닉네임 입력"
                className="col-span-2 h-8 text-sm"
              />
            </div>
            {/* 아바타 이미지 업로드 (추후에 드롭존 대체 예정) */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="avatar" className="text-sm">
                아바타
              </label>
              <input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) handleAvatarUpload(file);
                }}
                className="col-span-2 text-sm"
              />
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
