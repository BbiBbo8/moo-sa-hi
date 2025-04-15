"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import createClient from "@/supabase/client";
import { useDebounce } from "@/hooks/useDebounce";

// 대피소 타입 정의 (필요한 필드만 사용)
interface Shelter {
  id: string;
  name: string;
  lat: number;
  lon: number;
  // 필요 시 address, type 등 추가
}

// 부모 컴포넌트로 선택된 대피소를 전달할 콜백 props
interface Props {
  onSelect: (shelter: Shelter) => void;
}

export default function ShelterSearchInput({ onSelect }: Props) {
  const supabase = createClient();

  // 입력 상태
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300); // 🔹 입력 지연 적용
  const [results, setResults] = useState<Shelter[]>([]);

  // 디바운싱된 검색어가 바뀔 때마다 검색 실행
  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    const fetchShelters = async () => {
      const { data, error } = await supabase
        .from("shelters") // 테이블명 확인 필요 (예: shelter_list, shelter_data 등일 수 있음)
        .select("*")
        .ilike("name", `%${debouncedQuery}%`);

      if (!error && data) {
        setResults(data);
      } else {
        console.error("검색 오류:", error?.message);
        setResults([]);
      }
    };

    fetchShelters();
  }, [debouncedQuery]);

  return (
    <div className="relative w-full">
      {/* 검색 입력창 */}
      <Input
        placeholder="대피소를 검색하세요"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-full min-w-[300px] md:min-w-[400px]"
      />

      {/* 자동완성 리스트 */}
      {results.length > 0 && (
        <div className="absolute z-50 mt-1 max-h-[240px] w-full overflow-y-auto rounded-md border bg-white shadow">
          {results.map(shelter => (
            <Card
              key={shelter.id}
              className="cursor-pointer p-2 hover:bg-gray-100"
              onClick={() => {
                onSelect(shelter); // 부모로 선택된 대피소 전달
                setQuery(shelter.name); // input에 선택한 이름 표시
                setResults([]); // 리스트 닫기
              }}
            >
              {shelter.name}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
