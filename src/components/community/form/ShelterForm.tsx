// ShelterForm.tsx
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "../PostCreateEdit";

function ShelterForm({ form }: { form: UseFormReturn<FormData> }) {
  return (
    <>
      {/* 제목 필드 */}
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>제목</FormLabel>
            <FormControl>
              <Input placeholder="제목를 입력해주세요" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 내용 필드 */}
      <FormField
        control={form.control}
        name="contents"
        render={({ field }) => (
          <FormItem>
            <FormLabel>상세 내용</FormLabel>
            <FormControl>
              <Textarea
                placeholder="방문하신 대피소 상황을 입력해주세요"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

export default ShelterForm;
