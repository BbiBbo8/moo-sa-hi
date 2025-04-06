import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/PopOver"

import React from 'react'
import { Input } from "./ui/input"

function ProfileEditPop() {
  return (
    <Popover>
  <PopoverTrigger>프로필 수정</PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">수정할 내용을 입력하세요.</h4>
        <p className="text-sm text-muted-foreground">
              뭔가 부제목이 있다면 여기에
            </p>
        </div>
        <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="nickname">닉네임</label>
              <Input
                id="nickname"
                defaultValue="sample-nickname"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="avatar">아바타</label>
              <Input
                id="avatar"
                defaultValue="null"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="sample-value1">추가사항</label>
              <Input
                id="sample-value1"
                defaultValue="null"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="sample-value2">추가사항</label>
              <Input
                id="sample-value1"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div></div></PopoverContent>
</Popover>

  )
}

export default ProfileEditPop