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

function ShelterForm() {
  const form = useFormContext();

  return (
    <>
      {/* 대피소 검색 */}
      <FormField
        control={form.control}
        name="shelter_id"
        render={() => (
          <FormItem>
            <FormLabel>대피소 위치 검색</FormLabel>
            <ShelterSearchInput
              onSelect={shelter => {
                form.setValue("shelter_id", shelter.id);
              }}
            />
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 혼잡도 버튼 선택 */}
      <FormField
        control={form.control}
        name="congestion"
        render={({ field }) => (
          <FormItem>
            <FormLabel>혼잡도</FormLabel>
            <div className="flex gap-2">
              {CONGESTION_LEVELS.map(level => (
                <Button
                  key={level}
                  type="button"
                  variant={field.value === level ? "default" : "outline"}
                  onClick={() => field.onChange(level)}
                >
                  {level}
                </Button>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 청결도 버튼 선택 */}
      <FormField
        control={form.control}
        name="hygiene"
        render={({ field }) => (
          <FormItem>
            <FormLabel>위생상태</FormLabel>
            <div className="flex gap-2">
              {HYGIENE_LEVELS.map(level => (
                <Button
                  key={level}
                  type="button"
                  variant={field.value === level ? "default" : "outline"}
                  onClick={() => field.onChange(level)}
                >
                  {level}
                </Button>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 제목 */}
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>제목</FormLabel>
            <FormControl>
              <Input
                {...field}
                maxLength={15}
                placeholder="제목을 입력해주세요"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 본문 */}
      <FormField
        control={form.control}
        name="contents"
        render={({ field }) => (
          <FormItem>
            <FormLabel>본문</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                maxLength={500}
                placeholder="내용을 입력해주세요"
              />
            </FormControl>
            <p className="text-muted-foreground text-right text-sm">
              {field.value.length} / 500자
            </p>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

export default ShelterForm;
