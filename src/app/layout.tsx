import type { Metadata } from "next";
import "./globals.css";
import TabNavigateBar from "@/components/TabNavigateBar";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "무사히",
  description: "대피소 정보 공유 사이트" /* 임의대로 작성한 내용. 추후 수정 */,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
      <Header />
        <main>{children}</main>
        <TabNavigateBar />
      </body>
    </html>
  );
}
