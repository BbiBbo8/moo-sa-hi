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
  description: "대피소 정보 공유 사이트" /* 임의대로 작성한 내용. 추후 수정 */,
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
