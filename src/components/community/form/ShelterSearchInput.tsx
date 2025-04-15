"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useShelters } from "@/hooks/shelter/useShelters";
import { Shelter } from "@/types/shelter";

// 부모 컴포넌트로 선택된 대피소를 전달할 콜백 props
interface Props {
  onSelect: (shelter: Shelter) => void;
}

export default function ShelterSearchInput({ onSelect }: Props) {
  const { data: shelters } = useShelters(); // 대피소 데이터 가져오기

  // 입력 상태
  const [query, setQuery] = useState("");

  const filteredShelters = shelters?.filter(shelter =>
    shelter.name.toLowerCase().includes(query.toLowerCase()),
  ); // 대피소 이름으로 필터링

  return (
    <div className="relative w-full">
      {/* 검색 입력창 */}
      <Input
        type="text"
        placeholder="대피소를 검색하세요"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-full min-w-[300px] md:min-w-[400px]"
      />

      <ul>
        {filteredShelters?.map((shelter => (
          <li key={shelter.name}>
            {shelter.name}
          </li>
        )))}
      </ul>
    </div>
  );
}
