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
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>제목</FormLabel>
            <FormControl>
              <Input {...field} maxLength={15} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="contents"
        render={({ field }) => (
          <FormItem>
            <FormLabel>본문</FormLabel>
            <FormControl>
              <Textarea {...field} maxLength={500} />
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

export default DailyForm;
