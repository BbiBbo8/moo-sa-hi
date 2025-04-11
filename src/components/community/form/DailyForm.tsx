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

function DailyForm({ form }: { form: UseFormReturn<FormData> }) {
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
              <Input placeholder="제목을 입력해주세요" {...field} />
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
            <FormLabel>내용</FormLabel>
            <FormControl>
              <Textarea
                placeholder="안전과 가까워진 오늘을 작성해보아요!!"
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

export default DailyForm;
