import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import TabNavigateBar from "@/components/layout/TabNavigateBar";
import Header from "@/components/layout/Header";
import QueryProviders from "../providers/providers";
import { Toaster } from "sonner";
import { defaultFonts } from "@/fonts/defaultFonts";

export const metadata: Metadata = {
  title: "무사히",
  description: "재난이 닥쳤을때, 가장 먼저 무사히 확인하세요.",
  icons: "/typos/logo.svg",
  openGraph: {
    title: "재난이 닥쳤을때, 가장 먼저 무사히 확인하세요.",
    description:
      "대피소 위치부터 실시간 정보까지 무사히에서 빠르게 확인하세요.",
    url: "https://yourdomain.com/page-url",
    siteName: "무사히",
    images: [
      {
        url: "/opengraph-img.png",
        width: 1200,
        height: 630,
        alt: "미리보기 이미지",
      },
    ],
    locale: "ko_KR",
  },
};

const API = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer&autoload=false`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={defaultFonts.className}>
        <Header />
        <QueryProviders>
          {children}
          <Toaster />
        </QueryProviders>
        <TabNavigateBar />
        <Script src={API} strategy="beforeInteractive" />
      </body>
    </html>
  );
}
