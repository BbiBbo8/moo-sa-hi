'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Shelter from '@/components/ui/shelter';
import Daily from '@/components/ui/daily';


// zod 스키마 정의
const editor = z.object({
  title: z.string().min(1, '제목을 입력해주세요'), // 최소 1글자 이상 작성 해야함
  contents: z.string().min(1, '내용을 입력해주세요'),
  image: z.any().optional(),
});

// (zod에서 추론) 즉 위의 zod 스키마를 기반으로 리액트훅폼 타입 정의
type FormData = z.infer<typeof editor>;

// useForm 훅 - 리훅폼 초기화
// 여기서 zodResolver를 사용하여 editor 스키마와 연결
function PostCreateEdit() {
  const {
    register, // form input 연결 함수
    handleSubmit, // 등록 핸들러 생성 함수
    formState: { errors }, // 에러 상태 정보
    setValue, // 수동으로 필드 값 설정할 때 사용 (ex 이미지 업로드)
  } = useForm<FormData>({
    resolver: zodResolver(editor), // 여기가 editor 스키마를 실제 사용하는 부분
  });

  const [category, setCategory] = useState<'shelter_post' | 'daily_post'>('shelter_post'); // 디폴트 작성칸 쉘터로

  // 등록 처리 함수
  const onSubmit = (data: FormData) => {
    if (!category) return alert('말머리를 선택해주세요');
    console.log('카테고리:', category);
    console.log('제출된 데이터:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* 말머리 선택 */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setCategory('shelter_post')}
          className={cn(
            'px-4 py-1 border rounded',
            category === 'shelter_post' && 'bg-blue-600 text-white'
          )}
        >
          대피소
        </button>
        <button
          type="button"
          onClick={() => setCategory('daily_post')}
          className={cn(
            'px-4 py-1 border rounded',
            category === 'daily_post' && 'bg-blue-600 text-white'
          )}
        >
          일상
        </button>
      </div>

      {/* 제목 입력 */}
      <Input placeholder="제목을 입력해주세요" {...register('title')} />
      {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

      {/* 본문 입력 */}
      <textarea
        placeholder="본문을 입력해주세요"
        {...register('contents')}
        className="w-full h-40 p-2 border rounded resize-none"
      />
      {errors.contents && <p className="text-red-500 text-sm">{errors.contents.message}</p>}

      {/* 카테고리 조건부 필드 */}
      {category === 'shelter_post' && <Shelter register={register} setValue={setValue} />}
      {category === 'daily_post' && <Daily register={register} setValue={setValue} />}

      {/* 등록 버튼 */}
      <button type="submit" className="w-full py-2 bg-black text-white rounded">
        등록
      </button>
    </form>
  );
}

export default PostCreateEdit;