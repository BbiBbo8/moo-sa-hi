"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import createClient from "@/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

interface Props {
  value: string[];
  onChange: (urls: string[]) => void;
  maxFiles?: number;
}

function ImageDropzone({ value, onChange, maxFiles = 5 }: Props) {
  const supabase = createClient();

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.slice(0, maxFiles - value.length);
      if (value.length + newFiles.length > maxFiles) {
        toast.warning(`이미지는 최대 ${maxFiles}장까지 업로드 가능합니다.`);
        return;
      }

      const uploadedUrls: string[] = [];

      for (const file of newFiles) {
        const ext = file.name.split(".").pop();
        const fileName = `${uuidv4()}.${ext}`;
        const filePath = `posts/${fileName}`;

        const { data, error } = await supabase.storage
          .from("shelter-image") // 필요 시 daily-image로도 변경
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          toast.error(`이미지 업로드 실패: ${error.message}`);
        } else {
          const {
            data: { publicUrl },
          } = supabase.storage.from("shelter-image").getPublicUrl(filePath);
          uploadedUrls.push(publicUrl);
        }
      }

      onChange([...value, ...uploadedUrls]);
    },
    [value, onChange, maxFiles, supabase],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: handleDrop,
  });

  return (
    <div
      {...getRootProps()}
      className="flex h-32 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed text-gray-500"
    >
      <input {...getInputProps()} />
      {isDragActive
        ? "여기에 이미지를 드랍하세요..."
        : "이미지를 드래그하거나 클릭해서 업로드"}
    </div>
  );
}

export default ImageDropzone;
