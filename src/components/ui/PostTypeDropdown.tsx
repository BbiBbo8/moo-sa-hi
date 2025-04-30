"use client";

import Image from "next/image";
import { useState } from "react";

interface PostTypeDropdownProps {
  current: string;
  onChange: (value: string) => void;
}

function PostTypeDropdown({ current, onChange }: PostTypeDropdownProps) {
  const [open, setOpen] = useState(false);
  const options = ["대피소 글쓰기", "일상 글쓰기"];

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-lg font-semibold"
      >
        {current}
        <span>
          <Image
            src="./icons/postcreate/chevron-down-solid.svg"
            alt="아래로 이동"
            width={24}
            height={24}
          />
        </span>
      </button>

      {open && (
        <ul className="absolute top-full z-10 mt-2 w-40 rounded-lg bg-white text-center shadow-lg">
          {options.map(option => (
            <li
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostTypeDropdown;
