"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import createClient from "@/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Props {
  value: string[];
  onChange: (urls: string[]) => void;
  maxFiles?: number;
}

function ImageDropzone({ value, onChange, maxFiles = 1 }: Props) {
  const supabase = createClient();

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (value.length >= maxFiles) {
        toast.warning(`이미지는 최대 ${maxFiles}장까지 업로드 가능합니다.`);
        return;
      }

      const file = acceptedFiles[0];
      if (!file) return;

      const ext = file.name.split(".").pop();
      const fileName = `${uuidv4()}.${ext}`;
      const filePath = `posts/${fileName}`;

      const { error } = await supabase.storage
        .from("shelter-image")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        toast.error(`이미지 업로드 실패: ${error.message}`);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("shelter-image").getPublicUrl(filePath);

      onChange([...value, publicUrl]);
    },
    [value, onChange, maxFiles, supabase],
  );

  const handleRemove = (index: number) => {
    const updated = [...value];
    updated.splice(index, 1);
    onChange(updated);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop: handleDrop,
  });

  return (
    <div
      {...getRootProps()}
      className="relative flex h-32 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed p-2 text-gray-500"
    >
      <input {...getInputProps()} />

      {value.length > 0 ? (
        <div className="relative flex h-full w-full gap-2 overflow-x-auto">
          {value.map((url, index) => (
            <div key={index} className="relative aspect-video h-full">
              <Image
                src={url}
                alt="미리보기"
                fill
                className="max-h-[200px] rounded-md object-contain sm:max-h-[250px]"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 z-10"
                onClick={() => handleRemove(index)}
              >
                ✕
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <span>
          {isDragActive
            ? "여기에 이미지를 드랍하세요..."
            : "이미지를 드래그하거나 클릭해서 업로드"}
        </span>
      )}
    </div>
  );
}

export default ImageDropzone;
