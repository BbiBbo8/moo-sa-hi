import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { PostFormData } from '@/lib/post';

// 코드 지저분해져서 daily, shelter tsx따로 만들어서 정리
interface Props {
  register: UseFormRegister<PostFormData>; // 리액훅 등록
  setValue: UseFormSetValue<PostFormData>; // 리액훅 값 수동 설정
}

export default function Daily({ setValue }: Props) {
  return (
<div className="space-y-2">
      {/* 이미지 업로드 필드 */}
      <label className="block font-semibold">이미지 업로드</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setValue('image', file); // 리액훅에 업로드된 파일 등록
        }}
      />
    </div>
  );
}