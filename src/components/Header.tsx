"use client"; // Next.js App Router에서 클라이언트 컴포넌트로 사용

import { useRouter } from "next/navigation";

interface HeaderProps {
  nextPage: string; // 다음 페이지 경로를 동적으로 받음
}

export default function Header({ nextPage }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between w-full px-3 sm:px-5 md:px-6 h-[50px] sm:h-[65px] md:h-[80px] border-b border-gray-300">
      {/* Logo */}
      <div className="text-primary text-[24px] sm:text-[36px] md:text-[48px] font-bold italic">
        POPO.
      </div>

      {/* Next Button */}
      <button
        onClick={() => router.push(nextPage)}
        className="text-darkgray font-bold text-[14px] sm:text-[20px] md:text-[24px] hover:text-secondary"
      >
        다음&gt;
      </button>
    </header>
  );
}

