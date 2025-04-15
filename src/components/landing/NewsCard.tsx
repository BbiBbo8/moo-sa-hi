"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
  CardDescription,
  CardFooter
} from "../ui/card";

const NewsCard = () => {
  return (
      <section className="overflow-x-auto">
      <div className="flex w-max gap-4 px-4 py-2">
        {/* 카드 1 */}
        <Card className="max-w-[300px] min-w-[300px] flex-shrink-0">
          <Link
            href="https://www.yna.co.kr/view/AKR20250415137200052?section=search"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CardHeader>
              <CardTitle>
                "산청·하동 대형산불 피해 대책·체계적 대응책 마련 필요"
              </CardTitle>
              <Image
                src="https://img0.yna.co.kr/etc/inner/KR/2025/04/15/AKR20250415137200052_01_i_P4.jpg"
                alt="News Image"
                width={500}
                height={300}
                className="rounded-lg object-cover"
                unoptimized
              />
              <CardDescription>
                경남도의회 긴급현안 질문…박완수 지사 "진화장비·초동 대응체계
                강화 추진"
              </CardDescription>
            </CardHeader>
            <CardContent />
          </Link>
          <CardFooter className="text-xs">2025-04-15 16:29 | 연합뉴스</CardFooter>
        </Card>

        {/* 카드 2 */}
        <Card className="max-w-[300px] min-w-[300px] flex-shrink-0">
          <Link
            href="https://www.yna.co.kr/view/AKR20250415135700063?section=search"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CardHeader>
              <CardTitle>
                "산불 꺼주셔서 감사해요" 고사리손 감사 편지에 진화대원 미소
              </CardTitle>
              <Image
                src="https://img9.yna.co.kr/etc/inner/KR/2025/04/15/AKR20250415135700063_01_i_P4.jpg"
                alt="News Image"
                width={500}
                height={300}
                className="rounded-lg object-cover"
                unoptimized
              />
              <CardDescription>
                대구비슬초 5학년 학생 184명, 산림재난상황실에 손편지 보내
              </CardDescription>
            </CardHeader>
            <CardContent />
          </Link>
          <CardFooter className="text-xs">2025-04-15 16:30 | 연합뉴스</CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default NewsCard;
