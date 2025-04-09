"use client"

import { useState } from "react"
import { Search } from "lucide-react"

import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Input } from "@/components/ui/input"

// 더미 데이터
const sampleData = [
  { id: 1, title: "서울특별시", category: "capital" },
  { id: 2, title: "부산광역시", category: "southeast" },
  { id: 3, title: "인천광역시", category: "northwest" },
  { id: 4, title: "대구광역시", category: "southeast" },
  { id: 5, title: "대전광역시", category: "central" },
  { id: 6, title: "광주광역시", category: "southwest" },
  { id: 7, title: "울산광역시", category: "southeast" },
  { id: 8, title: "세종특별자치시", category: "central" },
]


const categoryNames: Record<string, string> = {
  capital: "수도권",
  southeast: "영남권",
  northwest: "수도권",
  southwest: "호남권",
  central: "충청권",
}

export function InputSearch() {
  const [searchQuery, setSearchQuery] = useState("") // 입력값 상태
  const [results, setResults] = useState(sampleData) // 필터링 검색 결과
  const [isFocused, setIsFocused] = useState(false) // input 포커스 여부

  // 검색 데이터 필터링
  const handleSearch = (value: string) => {
    setSearchQuery(value) // 입력값 상태 업데이트

    // 입력값 포함된 데이터 필터링
    const filtered = sampleData.filter((item) => {
      return item.title.toLowerCase().includes(value.toLowerCase())
    })

    setResults(filtered)
  }

  return (
    <div className="w-[343px] absolute top-5 z-50 bg-white mx-auto space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="도시 이름을 입력하세요..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)} // 입력시 검색 처리
          onFocus={() => setIsFocused(true)}// 포커스 상태 true
          onBlur={() => setTimeout(() => setIsFocused(false), 200)} // blur 직후 잠깐 기다렸다가 false(클릭 방지)
        />
      </div>

      {/* 포커스 상태이며 입력 값이 있을 때만 검색 결과 표시 */}
      {isFocused && searchQuery.length > 0 && (
        <div className="border rounded-md">
          <Command>
            <CommandList>
                {/* 결과가 없을 경우 */}
              <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
              {results.length > 0 && (
                <CommandGroup heading="검색 결과">
                    {/* 결과가 있으면 리스트로 출력 */}
                  {results.map((item) => (
                    <CommandItem key={item.id} className="flex items-center justify-between">
                      <span>{item.title}</span>
                      <span className="text-xs text-muted-foreground">{categoryNames[item.category]}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  )
}

