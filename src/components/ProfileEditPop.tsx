import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/PopOver";

import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PlusCircleIcon } from "lucide-react";

const ProfileEditPop = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* 가시성 확보 위해 추가로 버튼 컴포넌트 사용 */}
        <Button>
          <PlusCircleIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">
              수정할 내용을 입력하세요.
            </h4>
            <p className="text-muted-foreground text-sm">
              뭔가 부제목이 있다면 여기에
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              {" "}
              {/* 닉네임 수정칸 */}
              <label htmlFor="nickname">닉네임</label>
              <Input
                id="nickname"
                defaultValue="sample-nickname"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              {" "}
              {/* 아바타 수정칸 */}
              <label htmlFor="avatar">아바타</label>
              <Input
                id="avatar"
                defaultValue="null"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              {" "}
              {/* 임시로 만든 추가수정칸 */}
              <label htmlFor="sample-value1">추가사항</label>
              <Input
                id="sample-value1"
                defaultValue="null"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              {" "}
              {/* 임시로 만든 추가수정칸 */}
              <label htmlFor="sample-value2">추가사항</label>
              <Input
                id="sample-value1"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileEditPop;
