"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { z } from "zod";
import createClient from "@/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LogoutButton from "../auth/LogoutButton";
import Image from "next/image";

interface ProfileEditPopProps {
  userId: string | undefined;
  nickname: string;
}

const ProfileEditPop = ({ userId }: ProfileEditPopProps) => {
  const supabase = createClient();
  const queryClient = useQueryClient();

  const [editNickname, setEditNickname] = useState("");
  const [open, setOpen] = useState(false);

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
        .eq("id", userId!);

      if (error) throw new Error("업데이트 실패");
    },
    onSuccess: () => {
      toast.success("업데이트 완료!");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err: unknown) => {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
      } else if (err instanceof Error) {
        toast.error(err.message || "업데이트 중 오류 발생");
      } else {
        toast.error("알 수 없는 오류가 발생했어요");
      }
    },
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          className="h-fit w-fit rounded-full border border-[#CCCCCC] bg-white px-4 py-3 font-medium text-[#666666]"
        >
          프로필 설정
        </Button>
      </PopoverTrigger>
      <div className="text-center">
        <PopoverContent className="flex w-fit flex-col rounded-lg p-4">
          <div className="grid gap-3">
            <button
              onClick={() => setOpen(false)}
              className="flex h-7 w-full justify-end"
            >
              <Image
                src="/icons/xmark-solid.svg"
                alt="닫기"
                width={28}
                height={28}
                objectFit="center"
              />
            </button>
            <div className="space-y-1">
              <h4 className="text-base font-semibold">닉네임 변경</h4>
            </div>

            <div className="grid gap-3">
              {/* 닉네임 입력 */}
              <div className="grid-row-3 grid items-center gap-2">
                <Input
                  id="nickname"
                  value={editNickname}
                  onChange={e => setEditNickname(e.target.value)}
                  placeholder="닉네임 입력"
                  className="h-fit w-[280px] border-transparent bg-[#F7F7F7] px-4 py-3 text-sm [active]:border-none [active]:ring-offset-0"
                />
                {/* 저장 버튼 */}
                <div className="mt-2 flex flex-col focus:outline-none">
                  <Button
                    size="sm"
                    onClick={() => mutate(editNickname)}
                    disabled={isPending || !editNickname.trim()}
                    className={`h-fit w-full border border-[#CCCCCC] py-3 text-sm ${
                      editNickname.trim()
                        ? "cursor-pointer bg-[#2889E4] text-white"
                        : "cursor-not-allowed bg-transparent text-[#CCCCCC]"
                    } `}
                  >
                    확인
                  </Button>
                  <div className="mt-3 w-full text-center">
                    <LogoutButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </div>
    </Popover>
  );
};

export default ProfileEditPop;
