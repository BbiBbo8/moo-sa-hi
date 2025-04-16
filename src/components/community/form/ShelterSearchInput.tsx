"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useShelters } from "@/hooks/shelter/useShelters";
import { Shelter } from "@/types/shelter";

interface ShelterSearchInputProps {
  onSelect?: (shelter: Shelter) => void;
}

function ShelterSearchInput({ onSelect }: ShelterSearchInputProps) {
  const { data: shelters } = useShelters(); // 대피소 목록 가져오기
  const [query, setQuery] = useState(""); // 입력 상태
  const [showList, setShowList] = useState(false); // 리스트 표시 여부

  const filteredShelters = shelters?.filter(shelter =>
    shelter.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="relative w-full">
      {/* 입력 필드 */}
      <Input
        type="text"
        placeholder="대피소를 검색하세요"
        value={query}
        onFocus={() => setShowList(true)}
        onChange={e => setQuery(e.target.value)}
        className="w-full min-w-[300px] md:min-w-[400px]"
      />

      {/* 자동완성 리스트 */}
      {showList && filteredShelters && filteredShelters.length > 0 && (
        <ul className="absolute z-10 mt-2 max-h-48 w-full overflow-y-auto rounded-md border bg-white shadow">
          {filteredShelters.map(shelter => (
            <li
              key={shelter.id}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setQuery(shelter.name);
                setShowList(false);
                if (onSelect) onSelect(shelter);
              }}
            >
              {shelter.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShelterSearchInput;
