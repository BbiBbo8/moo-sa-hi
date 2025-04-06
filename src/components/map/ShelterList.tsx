"use client";
import { useState } from "react";

  //더미 데이터
const dummyShelters = [

  {
    id: 1,
    name: "대피소 이름",
    address: "서울특별시 ○○구 ○○동",
    distance: 1.9,
  },
  {
    id: 2,
    name: "서울중앙대피소",
    address: "서울특별시 강남구 역삼동",
    distance: 2.3,
  },
];
/*
* [패널 전체를 감싸는 컨테이너]
* - absolute: 부모 기준으로 절대 위치
* - bottom-0: 아래에 붙이기
* - w-full: 너비 전체
* - max-w-[393px]: 최대 너비 제한 (모바일 사이즈)
* - bg-white: 배경 흰색
* - p-4: 내부 여백 16px
* - rounded-t-2xl: 위쪽 모서리 둥글게
* - shadow-md: 중간 그림자
* - z-20: 위쪽에 쌓이도록 z-index 설정
* - transition-transform duration-300: transform 전환 애니메이션
* - translate-y-0: 기본 위치 (열림)
* - translate-y-[70%]: 아래로 70% 숨겨짐 (닫힘)
*/
const ShelterList = () => {
    // 하단 패널이 열려있는지 여부를 확인하는 상태 값
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`absolute bottom-0 w-full max-w-[393px] bg-white p-4 rounded-t-2xl shadow-md z-20 transition-transform duration-300 ${
        isOpen ? "translate-y-0" : "translate-y-[70%]"
      }`}
    >
      {/* 드래그 바 또는 클릭 영역 */}
      <div
        className="w-10 h-1 bg-gray-400 rounded-full mx-auto mb-3 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
        {/* 대피소 개수 표시 */}
      <p className="text-sm text-gray-500 mb-3">
        내 주변 대피소 {dummyShelters.length}
      </p>


      {/* 대피소 목록 렌더링 */}
      {dummyShelters.map((shelter) => (
        <div
          key={shelter.id}
          className="flex justify-between items-center border border-gray-200 rounded-lg p-3 mb-2"
        >
            {/* 대피소 이름 및 주소 정보 */}
          <div className="flex flex-col">
            <span className="font-semibold text-sm">{shelter.name}</span>
            <span className="text-xs text-gray-500">{shelter.address}</span>
          </div>
          {/* 대피소까지의 거리 */}
          <span className="text-sm text-gray-700">{shelter.distance}km</span>
        </div>
      ))}
    </div>
  );
};

export default ShelterList;
