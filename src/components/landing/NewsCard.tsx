"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
  CardDescription,
  CardFooter,
} from "../ui/card";

const NewsCard = () => {
  const newsData = [
    {
      title: "대구 자동차부품 몰에 불…진화 중",
      description:
        "(대구=연합뉴스) 김용민 기자 = 23일 오후 3시께 대구시 남구에 있는 자동차부품 몰에 불이 났다.\n소방 당국은 인력 40여명과 진화 차량 20대를 투입해 15분여 만인 오후 3시 20분께 큰 불길을 잡고 마무리 진화 작업을 진행 중이다.",
      link: "https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/sfc/dis/disasterNewsView.jsp?menuSeq=619&cno=764374",
      footer: "2025-04-23 20:48 | 행정안전부 공공누리",
    },
    {
      title: "부산 수영구 아파트서 화재…4명 연기흡입",
      description:
        "(부산=연합뉴스) 차근호 기자 = 23일 오후 3시께 부산 수영구 3층짜리 아파트 1층 주택에서 불이 나 소방서 추산 1천700만원 상당의 재산피해를 내고 29분 만에 꺼졌다 또 출동한 119 구조대에 의한 구조된 아파트 주민 4명은 연기를 흡입해 병원으로 옮겨졌다.",
      link: "https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/sfc/dis/disasterNewsView.jsp?menuSeq=619&cno=764369",
      footer: "2025-04-23 17:52 | 행정안전부 공공누리",
    },
    {
      title: "국가재난대응 시설, 세종시에 상반기 준공…위기관리 중추역할",
      description:
        "(세종=연합뉴스) 양영석 기자 = 행정중심복합도시건설청은 세종시 다정동 2-1생활권에 들어설국가재난대응 시설 건립이 순조롭게 추진돼 올해 상반기에 공사를 마무리할 예정이라고 23일 밝혔다.지하 1층·지상 3층 규모(연면적 3천572㎡)인 해당 건물에 중앙긴급구조통제단 훈련실과 재난대응 담당시설 등이 설치될 예정이다.특히 전국의 재난 상황뿐만 아니라 119신고 접수·출동·상황 관제 등을 실시간으로 모니터링하고 화재·구조·구급 분야별 현장 대원의 활",
      link: "https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/sfc/dis/disasterNewsView.jsp?menuSeq=619&cno=764366",
      footer: "2025-04-23 17:03 | 행정안전부 공공누리",
    },
    {
      title: "강원소방, 석가탄신일 앞두고 사찰·다중이용시설 현장 점검",
      description:
        '(춘천=연합뉴스) 강태현 기자 = 강원특별자치도소방본부는 석가탄신일을 앞두고 사찰과 다중이용시설에서 화재 예방을 위한 현장점검을 벌였다고 23일 밝혔다.도 소방본부는 전날부터 이틀간 양양국제공항, 모나용평리조트, 양양 낙산사, 평창 월정사 등에서 피난 유도체계, 방재실 실시간 대응력, 위험물 저장관리 실태 등 시스템 전반을 점검했다.',
      link: "https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/sfc/dis/disasterNewsView.jsp?menuSeq=619&cno=764365",
      footer: "2025-04-23 16:42 | 행정안전부 공공누리",
    }
  ];

  return (
    <div className="mx-[20px]">
      <h2 className="text-[20px] leading-[27px] font-semibold text-[#1A1A1A]">
        무사히 재난 뉴스
      </h2>
      <p className="mt-1 text-[16px] text-[#666666]">
        전국 각지에서 일어난 재난 정보
      </p>
      <section className="overflow-x-auto">
        <div className="flex w-max gap-4 py-[12px]">
          {newsData.map((news, index) => (
            <Card
              key={index}
              className="max-w-[300px] min-w-[300px] flex-shrink-0"
            >
              <Link href={news.link} target="_blank" rel="noopener noreferrer">
                <CardHeader className="pb-2">
                  <CardTitle className="truncate">{news.title}</CardTitle>
                  <CardDescription className="mt-2 line-clamp-4">
                    {news.description}
                  </CardDescription>
                </CardHeader>
                <CardContent />
              </Link>
              <CardFooter className="text-xs">{news.footer}</CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NewsCard;
