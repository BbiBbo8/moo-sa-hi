"use client";

import { useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Shelter } from "@/types/shelter";
import { useMapStore } from "@/store/useMapStore";
import { useShelters } from "@/hooks/shelter/useShelters";
import Image from "next/image";
import Search from "public/icons/map/magnifying-glass-solid.svg";
import CircleX from "public/icons/map/circle-xmark-solid.svg";

const InputSearch = () => {
  const [searchQuery, setSearchQuery] = useState(""); // 입력값 상태
  const [results, setResults] = useState<Shelter[]>([]); // 필터링 검색 결과
  const [isFocused, setIsFocused] = useState(false); // input 포커스 여부
  const { data: shelters = [] } = useShelters();
  // 검색 데이터 필터링
  const handleSearch = (value: string) => {
    setSearchQuery(value); // 입력값 상태 업데이트

    // 입력값 포함된 데이터 필터링
    const filtered = shelters.filter(item => {
      return item.name.toLowerCase().includes(value.toLowerCase());
    });

    setResults(filtered);
  };
  const { setLevel, setCenter } = useMapStore(); // 변경될 좌표와 지도 레벨
  // shelter 선택 시 지도 중심 이동 + zoom 조절
  const handleSelectShelter = (shelter: Shelter) => {
    setCenter({ lat: shelter.lat, lng: shelter.lng });
    setLevel(4);
  };

  return (
    <div className="absolute top-10 z-50 w-full px-5">
      {/* wrapper: input + 결과 리스트 포함, 포커스 시 테두리 강조 */}
      <div className="rounded-md bg-white shadow-md transition-all focus-within:ring-1 focus-within:ring-[#2889E4]">
        <div className="relative">
          <Image
            src={Search}
            width={20}
            height={20}
            alt="search"
            className="absolute top-2 right-4 h-5 w-5 bg-white"
          />

          <Input
            type="search"
            placeholder="대피소,장소,지역,주소 검색"
            className="w-full border-0 px-5 py-3 text-base font-normal text-[1A1A1A] placeholder:text-base placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus-visible:ring-0"
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          />

          {isFocused && searchQuery.length > 0 && (
            <Image
              src={CircleX}
              width={20}
              height={20}
              alt="circleX"
              className="absolute top-2 right-4 h-5 w-5 cursor-pointer bg-white"
              onClick={() => {
                setSearchQuery("");
                setResults([]);
              }}
            />
          )}
        </div>

        {isFocused && searchQuery.length > 0 && (
          <Command className="rounded-md border-0">
            <CommandList className="pt-0">
              <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
              {results.length > 0 && (
                <CommandGroup>
                  {results.map(item => (
                    <CommandItem
                      key={item.name}
                      className="flex items-center justify-between px-5 py-2"
                      onSelect={() => {
                        handleSelectShelter(item);
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
        )}
      </div>
    </div>
  );
};

export default InputSearch;
