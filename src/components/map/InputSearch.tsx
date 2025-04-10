"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Shelter } from "@/types/shelter";

interface InputSearchProps {
  shelters: Shelter[];
  setCenter: (lat: number, lng: number) => void;
}

export function InputSearch({ shelters, setCenter }: InputSearchProps) {
  const [searchQuery, setSearchQuery] = useState(""); // 입력값 상태
  const [results, setResults] = useState<Shelter[]>([]); // 필터링 검색 결과
  const [isFocused, setIsFocused] = useState(false); // input 포커스 여부

  // 검색 데이터 필터링
  const handleSearch = (value: string) => {
    setSearchQuery(value); // 입력값 상태 업데이트

    // 입력값 포함된 데이터 필터링
    const filtered = shelters.filter(item => {
      return item.name.toLowerCase().includes(value.toLowerCase());
    });

    setResults(filtered);
  };

  return (
    <div className="absolute top-5 z-50 mx-auto w-[343px] space-y-4 rounded-md border border-black bg-white">
      <div className="relative">
        <Search className="text-muted-foreground absolute top-2.5 right-2.5 h-4 w-4 bg-white" />
        <Input
          type="search"
          placeholder="도시 이름을 입력하세요..."
          className="pl-3"
          value={searchQuery}
          onChange={e => handleSearch(e.target.value)} // 입력시 검색 처리
          onFocus={() => setIsFocused(true)} // 포커스 상태 true
          onBlur={() => setTimeout(() => setIsFocused(false), 200)} // blur 직후 잠깐 기다렸다가 false(클릭 방지)
        />
      </div>

      {/* 포커스 상태이며 입력 값이 있을 때만 검색 결과 표시 */}
      {isFocused && searchQuery.length > 0 && (
        <div className="rounded-md border">
          <Command>
            <CommandList>
              {/* 결과가 없을 경우 */}
              <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
              {results.length > 0 && (
                <CommandGroup heading="검색 결과">
                  {/* 결과가 있으면 리스트로 출력 */}
                  {results.map(item => (
                    <CommandItem
                      key={item.name}
                      className="flex items-center justify-between"
                      onSelect={() => {
                        setCenter(item.lat, item.lng);
                        setSearchQuery("");
                        setResults([]);
                        setIsFocused(true);
                      }}
                    >
                      <span>{item.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}
