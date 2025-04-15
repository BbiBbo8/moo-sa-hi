"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/PopOver";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { z } from "zod";
import createClient from "@/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LogoutButton from "../auth/LogoutButton";

interface ProfileEditPopProps {
  userId: string;
  nickname: string;
}

const ProfileEditPop = ({ userId, nickname }: ProfileEditPopProps) => {
  const supabase = createClient();
  const queryClient = useQueryClient();

  const [editNickname, setEditNickname] = useState(nickname);

  // 닉네임 유효성 검사 스키마 정의
  const nicknameSchema = z
    .string()
    .min(2, { message: "닉네임은 최소 2자 이상이어야 해요." })
    .max(10, { message: "닉네임은 최대 10자까지 가능해요." });

  const { mutate, isPending } = useMutation({
    mutationFn: async (newNickname: string) => {
      nicknameSchema.parse(newNickname);

      const { error } = await supabase
        .from("users")
        .update({ nickname: newNickname })
        .eq("id", userId);

      if (error) throw new Error("업데이트 실패");
    },
    onSuccess: () => {
      toast.success("업데이트 완료!");
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
    onError: (err: any) => {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
      } else {
        toast.error(err.message || "업데이트 중 오류 발생");
      }
    },
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          className="border border-black bg-white px-4 py-3 text-black"
        >
          프로필 설정
        </Button>
      </PopoverTrigger>
      <div className="text-center">
        <PopoverContent className="flex w-full flex-col rounded-lg p-4">
          <div className="grid gap-4">
            <div className="space-y-1">
              <h4 className="text-base font-semibold">닉네임 변경</h4>
            </div>

            <div className="grid gap-3">
              {/* 닉네임 입력 */}
              <div className="grid grid-cols-3 items-center gap-4">
                <Input
                  id="nickname"
                  value={editNickname}
                  onChange={e => setEditNickname(e.target.value)}
                  placeholder="닉네임 입력"
                  className="col-span-2 h-8 w-full bg-[#F7F7F7] text-sm [active]:border-none"
                />
              </div>

              {/* 저장 버튼 */}
              <div className="mt-2 flex flex-col">
                <Button
                  size="sm"
                  onClick={() => mutate(editNickname)}
                  disabled={isPending}
                  className="w-full"
                >
                  저장
                </Button>
                <LogoutButton />
              </div>
            </div>
          </div>
        </PopoverContent>
      </div>
    </Popover>
  );
};

export default ProfileEditPop;
