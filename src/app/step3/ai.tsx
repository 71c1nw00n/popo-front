import React, { useState } from "react";
import Link from 'next/link';

const Step3 = () => {
  const handleAddExperience = () => {
    const isConfirmed = window.confirm("새로운 인턴/연구 경험을 더 생성하시겠습니까?\n 완성된 요약은 포트폴리오에 추가되며, 포트폴리오 완성 이후에만 수정 가능합니다.");
    if (isConfirmed) {
      window.location.href = "/step3"; // 또는 원하는 경로
    }
  };
  const handleAddExperience2 = () => {
    const isConfirmed = window.confirm("완성된 요약을 포트폴리오에 작성하지 않고 새로운 내용을 생성하시겠습니까?\n 완성된 요약은 사라집니다.");
    if (isConfirmed) {
      window.location.href = "/step3"; // 또는 원하는 경로
    }
  };
  const handleNextstep = () => {
    const isConfirmed = window.confirm("지금까지 작성한 내용을 모두 포트폴리오에 추가하고 다음 단계로 넘어가시겠습니까?");
    if (isConfirmed) {
      window.location.href = "/step4"; // 또는 원하는 경로
    }
  };
  return (
    <div className="relative w-full h-auto bg-white overflow-hidden">
      {/* header */}
      <header className="bg-[#FFFFFF] text-white py-4 shadow-md fixed w-full top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* 로고 */}
          <div className="text-3xl font-bold text-[#2300A1]">POPO</div>

          {/* 네비게이션 메뉴 */}
          <nav className="flex space-x-6">
            <button 
              onClick={handleAddExperience}
              className="hover:text-gray-300 font-bold text-[#2300A1] text-xl"
            >
              경험 추가
            </button>
            <button 
              onClick={handleAddExperience2}
              className="hover:text-gray-300 font-bold text-[#2300A1] text-xl"
            >
              다시 생성하기
            </button>
            <button 
              onClick={handleNextstep}
              className="hover:text-gray-300 font-bold text-[#2300A1] text-xl"
            >
              다음 단계로
            </button>
          </nav>
          
        </div>
      </header>
      {/* 콘텐츠 */}
      <div className="px-10 pt-20"> {/* 헤더 높이만큼 패딩 추가 */}
    {/* Step Description */}
    <div className="px-4 py-4 sm:px-6 md:px-12">
      <p className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
        Step 3. 인턴/연구 경험 추가
      </p>
      <p className="text-base sm:text-lg lg:text-xl font-light mt-2">
        완성된 요약을 확인하세요
      </p>
    </div>

    {/* Experience Summary Card */}
    <div className="mx-auto px-4 sm:px-6 md:px-12 mb-8">
      <div className="w-full rounded-[25px] bg-[#f0f0f0] p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0008a1] ">
          어쩌구컴퍼니 인턴
        </h2>
        
        <p className="text-xl font-extralight text-black mb-6">
          2023.08~2024.02
        </p>

        {/* 요약 섹션 */}
        <div className="flex gap-8 mb-8">
          <h3 className="text-2xl font-bold text-[#0008a1] w-24">‍💻 요약</h3>
          <div className="space-y-4">
            <p className="text-xl text-black">
              - 효율적인 컴포넌트 설계와 코드 최적화를 통해 개발 속도와 유지보수성을 30% 향상
            </p>
          </div>
        </div>

        <div className="border-t border-black my-6"></div>

        {/* 성과 섹션 */}
        <div className="flex gap-8 mt-5">
          <h3 className="text-2xl font-bold text-[#0008a1] w-24">‍💡 성과</h3>
          <div>
            <p className="text-xl text-black">
                - 약 6개월 간 초기버전의 프론트엔드를 개발하였으며, 이후 사용자 피드백을 반영하여 UI/UX를 개선하고 안정성을 강화하는 작업을 수행
            </p>
            <p className="text-xl text-black mt-6">
              - ProtoPie Studio와 연동되는 ProtoPie Cloud의 엔터프라이즈 버전의 프론트엔드 인터페이스 개발
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* SVG Bar */}
    <svg
      width={1219}
      height={58}
      viewBox="0 0 1219 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto w-4/9 max-w-[800px] h-auto "
      preserveAspectRatio="none"
    >
      <rect x={29} y={20} width={1163} height={17} fill="#D9D9D9" />
      <circle cx={29} cy={29} r={29} fill="#CECFED" />
      <circle cx={261} cy={29} r={29} fill="#D9D9D9" />
      <ellipse cx="493.5" cy={29} rx="29.5" ry={29} fill="#D9D9D9" />
      <circle cx={726} cy={29} r={29} fill="#D9D9D9" />
      <circle cx={958} cy={29} r={29} fill="#D9D9D9" />
      <circle cx={1190} cy={29} r={29} fill="#D9D9D9" />
    </svg>


    </div>
    </div>
  );


};
export default Step3;