"use client";
import { useState } from "react";

const dummyShelters = [
  //더미 데이터
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

const ShelterList = () => {
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

      <p className="text-sm text-gray-500 mb-3">
        내 주변 대피소 {dummyShelters.length}
      </p>

      {dummyShelters.map((shelter) => (
        <div
          key={shelter.id}
          className="flex justify-between items-center border border-gray-200 rounded-lg p-3 mb-2"
        >
          <div className="flex flex-col">
            <span className="font-semibold text-sm">{shelter.name}</span>
            <span className="text-xs text-gray-500">{shelter.address}</span>
          </div>
          <span className="text-sm text-gray-700">{shelter.distance}km</span>
        </div>
      ))}
    </div>
  );
};

export default ShelterList;
