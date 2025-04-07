import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { PostFormData } from '@/lib/post';

interface Props {
  register: UseFormRegister<PostFormData>;
  setValue: UseFormSetValue<PostFormData>;
}

export default function Shelter({ }: Props) {
  return (
    <div className="space-y-4">
      {/* 지도 or 대피소 위치 삽입 예정 */}
      <div className="p-4 border rounded text-gray-500 text-sm">
        추가 예정
      </div>
    </div>
  );
}