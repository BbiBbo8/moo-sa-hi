"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { PostUploadImg } from "@/supabase/imgBucket";
import Image from "next/image";
import { X } from "lucide-react";

interface Props {
  userId: string;
  category: "shelter" | "daily";
  onUploadComplete: (url: string | null) => void;
}

const ImageDropzone = ({ userId, category, onUploadComplete }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // 미리보기 이미지 URL
  const [isUploading, setIsUploading] = useState(false); // 업로드 중 여부

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // 제한 조건: 최대 10MB, 이미지 타입만
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert("최대 10MB 이하의 이미지만 업로드할 수 있습니다.");
      return;
    }

    const preview = URL.createObjectURL(file); // 미리보기 URL 생성
    setPreviewUrl(preview);

    try {
      setIsUploading(true); // 업로드 시작
      const uploadedUrl = await PostUploadImg(file, category, userId); // DB업로드
      onUploadComplete(uploadedUrl); // 부모 컴포넌트로 업로드 결과 전달
    } catch (err) {
      console.error("이미지 업로드 실패", err);
    } finally {
      setIsUploading(false); // 업로드 종료
    }
  };

  const handleDeleteImage = () => {
    setPreviewUrl(null);
    onUploadComplete(null); // 이미지 제거 시 부모 컴포넌트에도 null 전달
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className="relative cursor-pointer rounded-md border-2 border-dashed p-4 text-center"
    >
      <input {...getInputProps()} />

      {isUploading ? (
        <p className="text-sm text-gray-500">업로드 중...</p>
      ) : previewUrl ? (
        <div className="relative inline-block">
          <Image
            src={previewUrl}
            alt="업로드된 이미지"
            width={300}
            height={200}
            className="rounded-md object-cover"
          />
          <button
            type="button"
            onClick={handleDeleteImage}
            className="bg-opacity-50 absolute top-2 right-2 rounded-full bg-black p-1 text-white"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          이미지를 업로드하려면 클릭하거나 드래그하세요
        </p>
      )}
    </div>
  );
};

export default ImageDropzone;
