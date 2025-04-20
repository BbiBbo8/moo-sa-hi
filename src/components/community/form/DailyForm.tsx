"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

function DailyForm() {
  const form = useFormContext();

  return (
    <div className="space-y-[20px] px-[20px]">
      {/* 제목 입력 */}
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[16px]"></FormLabel>
            <FormControl>
              <Input
                {...field}
                maxLength={15}
                placeholder="제목"
                className="text-[16px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 본문 입력 */}
      <FormField
        control={form.control}
        name="contents"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[16px]"></FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="오늘의 안전을 작성해주세요!!"
                maxLength={500}
                className="min-h-[140px] text-[16px]"
              />
            </FormControl>
            <p className="text-muted-foreground text-right text-sm">
              {field.value.length} / 500자
            </p>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default DailyForm;
