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
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { CONGESTION_LEVELS, HYGIENE_LEVELS } from "../PostCreateEdit";
import ShelterSearchInput from "./ShelterSearchInput";
import type { Shelter } from "@/types/shelter";

interface ShelterFormProps {
  onShelterSelect: (shelter: Shelter) => void;
}

function ShelterForm({ onShelterSelect }: ShelterFormProps) {
  const form = useFormContext();

  return (
    <div className="w-full space-y-[20px] px-[20px]">
      {/* 대피소 위치 검색 */}
      <FormField
        control={form.control}
        name="shelter_id"
        render={() => (
          <FormItem className="w-full">
            <FormLabel className="text-[16px]"></FormLabel>
            <ShelterSearchInput
              onSelect={shelter => {
                form.setValue("shelter_id", shelter.id);
                onShelterSelect(shelter);
              }}
            />
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 제목 입력 */}
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-[16px]"></FormLabel>
            <FormControl>
              <Input
                {...field}
                maxLength={15}
                placeholder="제목"
                className="bg-[#F7F7F7] text-[16px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 혼잡도 버튼 */}
      <FormField
        control={form.control}
        name="congestion"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-[16px]">혼잡도</FormLabel>
            <div className="flex w-full gap-2">
              {CONGESTION_LEVELS.map(level => (
                <Button
                  key={level}
                  type="button"
                  variant={field.value === level ? "default" : "outline"}
                  onClick={() => field.onChange(level)}
                  className={`h-[40px] flex-1 rounded-[10px] px-[12px] text-[14px] ${
                    field.value === level
                      ? "bg-[#3A7E8D] text-white hover:bg-[#60A1B0] active:bg-[#2B5D6C]"
                      : "border border-gray-300 text-gray-400 hover:border-[#60A1B0] active:border-[#2B5D6C]"
                  }`}
                >
                  {level}
                </Button>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 위생 상태 버튼 */}
      <FormField
        control={form.control}
        name="hygiene"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-[16px]">위생상태</FormLabel>
            <div className="flex w-full gap-2">
              {HYGIENE_LEVELS.map(level => (
                <Button
                  key={level}
                  type="button"
                  variant={field.value === level ? "default" : "outline"}
                  onClick={() => field.onChange(level)}
                  className={`h-[40px] flex-1 rounded-[8px] px-[12px] text-[14px] ${
                    field.value === level
                      ? "bg-[#3A7E8D] text-white hover:bg-[#60A1B0] active:bg-[#2B5D6C]"
                      : "border border-gray-300 text-gray-400 hover:border-[#60A1B0] active:border-[#2B5D6C]"
                  }`}
                >
                  {level}
                </Button>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 본문 입력 */}
      <FormField
        control={form.control}
        name="contents"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-[16px]"></FormLabel>
            <FormControl>
              <Textarea
                {...field}
                maxLength={500}
                placeholder="상세 내용을 입력해주세요"
                className="max-h-[160px] min-h-[96px] overflow-y-auto bg-[#F7F7F7] text-[16px]"
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

export default ShelterForm;
