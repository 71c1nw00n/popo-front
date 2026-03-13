"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RecoilRoot } from "recoil";
import Header from "@/components/Header";
import Timeline from "@/components/Timeline";
import { usePathname } from "next/navigation";



export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 페이지별 "다음" 버튼 이동 경로 설정
  const nextPageMap: { [key: string]: string } = {
    "/": "/step1",
    "/step1": "/step2",
    "/step2": "/step3",
    "/step3": "/step4_re",
    "/step4_re": "/step4_fin",
    "/step4_fin": "step5",
    "/step5": "step6"
  };

  const nextPage = nextPageMap[pathname] || "/";

  return (
    <RecoilRoot>
      <html lang="ko">
        <body className={`antialiased flex flex-col w-screen h-screen overflow-hidden`}>
          {/* 공통 헤더 */}
          <Header nextPage={nextPage} />

          {/* 페이지별 콘텐츠 렌더링 */}
          <div className="flex px-10 py-6 h-full overflow-y-auto">
            {children}
          </div>

          {/* 공통 타임라인 */}
          <div>
            <Timeline />
          </div>
        </body>
      </html>
    </RecoilRoot>
  );
}

