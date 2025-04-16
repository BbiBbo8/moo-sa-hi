import { IBM_Plex_Sans_KR } from "next/font/google";

export const defaultFonts = IBM_Plex_Sans_KR({
  preload: false,
  weight: ["400", "500", "600"],
});

// headline 또는 title
export const semibold = IBM_Plex_Sans_KR({
  weight: "600",
  display: "fallback",
  preload: false,
  style: "normal",
  fallback: ["system-ui"],
});

// body 또는 label
export const medium = IBM_Plex_Sans_KR({
  weight: "500",
  display: "fallback",
  preload: false,
  style: "normal",
  fallback: ["system-ui"],
});

// body 또는 num/eng
export const regular = IBM_Plex_Sans_KR({
  weight: "400",
  display: "fallback",
  preload: false,
  style: "normal",
  fallback: ["system-ui"],
});

// font size
// 32: text-[32px]
// 28: text-[28px]
// 20: text-xl
// 18: text-lg
// 16: text-base
// 14: text-sm
// 12: text-xs
// 11: text-[11px]
