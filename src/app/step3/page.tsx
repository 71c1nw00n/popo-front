"use client";

import React, { useState } from "react";
import Link from 'next/link';

const Step3 = () => {
  // 상태 관리: 선택된 옵션
  const [selectedOption, setSelectedOption] = useState("");
  // 날짜 상태 초기화 추가
  const [startDate, setStartDate] = useState({ year: "", month: "" });
  const [endDate, setEndDate] = useState({ year: "", month: "" });
  const [dateError, setDateError] = useState("");
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);

  // 년도와 월 옵션 생성
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // 옵션 데이터
  const options = ["회사 인턴", "연구 인턴"]; // 원하는 옵션 추가 가능

  // 날짜 유효성 검사 함수
  const validateDates = (start: { year: string, month: string }, end: { year: string, month: string }) => {
    if (!start.year || !start.month) {
      setDateError("");
      return;
    }

    if (isCurrentlyWorking) {
      setDateError("");
      return;
    }

    if (!end.year || !end.month) {
      setDateError("");
      return;
    }

    const startDate = new Date(parseInt(start.year), parseInt(start.month) - 1);
    const endDate = new Date(parseInt(end.year), parseInt(end.month) - 1);

    if (startDate > endDate) {
      setDateError("시작일이 종료일보다 늦을 수 없습니다.");
    } else {
      setDateError("");
    }
  };

  // 시작일 변경 핸들러
  const handleStartDateChange = (e: React.ChangeEvent<HTMLSelectElement>, type: 'year' | 'month') => {
    const newStartDate = { ...startDate, [type]: e.target.value };
    setStartDate(newStartDate);
    validateDates(newStartDate, endDate);
  };

  // 종료일 변경 핸들러
  const handleEndDateChange = (e: React.ChangeEvent<HTMLSelectElement>, type: 'year' | 'month') => {
    const newEndDate = { ...endDate, [type]: e.target.value };
    setEndDate(newEndDate);
    validateDates(startDate, newEndDate);
  };

  // 현재 근무 중 체크박스 핸들러
  const handleCurrentlyWorkingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCurrentlyWorking(e.target.checked);
    if (e.target.checked) {
      setEndDate({ year: "", month: "" });
      setDateError("");
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      {/* Container */}
      <div className="w-full h-full">
    <div className="px-4 py-4 sm:px-6 md:px-12">
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
          Step 3. 인턴/연구 경험 추가
          </p>
          <p className="text-base sm:text-lg lg:text-xl  mt-2">
          인턴 또는 연구 경력을 설명해주세요.
          </p>
          {/* 입력 폼 컨테이너 */}
      <div className="mt-4 p-6 rounded-lg bg-[#F0F0F0]">
        {/* 경력 1 */}
        <div>
          <p className="text-lg sm:text-xl font-bold text-[#2300A1]">
            근무한 회사/연구실의 이름은 무엇인가요?
          </p>
          <div className="flex flex-col gap-4 mt-4">
    {/* 선택형 입력과 입력 필드 */}
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 ">
      {/* 드롭다운 박스 */}
      <select
        id="experienceType"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        className="w-40 lg:w-40 sm:w-1/3 p-3 rounded-md border border-gray-400 bg-white text-gray-800"
      >
        <option value="" disabled>
          경험 유형
        </option>
        <option value="회사 인턴">회사 인턴</option>
        <option value="연구실 경험">연구실 인턴</option>
      </select>

      {/* 입력 필드 - 조건부 렌더링 제거 */}
      <input
        type="text"
        placeholder={`ex. Ki Lab (KAIST)`}
        className="flex-1 p-3 rounded-md border border-gray-400"
      />
    </div>

    </div>
        </div>

        {/* 근무 기간 */}
        <div className="mt-6">
          <p className="text-lg sm:text-xl font-bold text-[#2300A1]">
            근무 시작과 종료 연월을 선택해주세요.
          </p>
          
          <div className="flex items-center gap-4 mt-2">
            {/* 시작 날짜 */}
            <div className="flex items-center gap-2">
              <select
                value={startDate.year}
                onChange={(e) => handleStartDateChange(e, 'year')}
                className="p-2 rounded-md border border-gray-400"
              >
                <option value="">년도</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select
                value={startDate.month}
                onChange={(e) => handleStartDateChange(e, 'month')}
                className="p-2 rounded-md border border-gray-400"
              >
                <option value="">월</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <span className="text-gray-500">~</span>

            {/* 종료 날짜 */}
            {isCurrentlyWorking ? (
              <span className="text-gray-700">현재</span>
            ) : (
              <div className="flex items-center gap-2">
                <select
                  value={endDate.year}
                  onChange={(e) => handleEndDateChange(e, 'year')}
                  className="p-2 rounded-md border border-gray-400"
                >
                  <option value="">년도</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <select
                  value={endDate.month}
                  onChange={(e) => handleEndDateChange(e, 'month')}
                  className="p-2 rounded-md border border-gray-400"
                >
                  <option value="">월</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            {/* 현재 근무 중 체크박스 */}
            <div className="flex items-center gap-2 ml-4">
              <input
                type="checkbox"
                id="currentlyWorking"
                checked={isCurrentlyWorking}
                onChange={handleCurrentlyWorkingChange}
                className="w-4 h-4 text-[#2300A1] border-gray-300 rounded focus:ring-[#2300A1]"
              />
              <label htmlFor="currentlyWorking" className="text-sm text-gray-700">
                현재 근무중         
              </label>
            </div>
          </div>
          {dateError && (
            <p className="text-red-500 mt-2 text-sm">
              {dateError}
            </p>
          )}
        </div>

        {/* 맡은 업무 */}
        <div className="mt-6">
          <div className="flex items-center gap-2">
            <p className="text-lg sm:text-xl font-bold text-[#2300A1]">
              해당 회사/연구실에서는 어떤 일을 맡았나요?
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#2300A1] text-white text-sm hover:bg-[#1b0080] focus:outline-none"
            >
              ?
            </button>
          </div>
          <textarea
            placeholder="회사/연구실에서 맡았던 역할과 했던 일을 설명해주세요."
            className="w-full mt-2 p-3 rounded-md border border-gray-400"
          ></textarea>
        </div>

        {/* 성과 */}
        <div className="mt-6">
        <div className="flex items-center gap-2">
          <p className="text-lg sm:text-xl font-bold text-[#2300A1]">
            해당 회사/연구실에서 어떤 성과를 만들었나요?
          </p>
          <button
              onClick={() => setIsModal2Open(true)}
              className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#2300A1] text-white text-sm hover:bg-[#1b0080] focus:outline-none"
            >
              ?
            </button>
          </div>
          <textarea
            placeholder="해당 직무를 통해 이루어낸 성과나 새롭게 배운 점을 자세히 설명해주세요."
            className="w-full mt-2 p-3 rounded-md border border-gray-400"
          ></textarea>
        </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-[578px] relative">
            {/* 닫기 버튼 */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {/* 제목 */}
            <h3 className="text-2xl font-bold text-black mb-8 text-center">
              인턴/연구 경력 작성 가이드
            </h3>

            {/* 메인 텍스트 */}
            <p className="text-3xl font-bold text-[#0008A1] text-center mb-12">
              회사/연구실에서 맡았던 업무를<br />
              구체적으로 설명해주세요.
            </p>

            {/* 들어가면 좋은 내용 섹션 */}
            <div className="mb-8">
              <p className="text-xl font-semibold text-black mb-4">
                들어가면 좋은 내용
              </p>
              <ul className="text-lg font-light space-y-1">
                <li>* 프로젝트의 간단한 설명</li>
                <li>* 사용한 개발 언어/프레임워크</li>
                <li>* 프로젝트 내에서 내가 맡은 역할</li>
              </ul>
            </div>

            {/* 예시 섹션 */}
            <div className="bg-[#F4F4F4] rounded-[20px] p-6">
              <p className="text-lg font-bold text-[#686868] mb-6">
                예시
              </p>
              <p className="text-base font-extralight text-[#676767]">
                전자상거래 웹 애플리케이션 프로젝트에 참여하여 사용자 맞춤형 추천 시스템을 개발했습니다.
                Python과 Django를 사용해 백엔드 API를 구축하고, React를 활용해 프론트엔드 인터페이스를
                구현했습니다. 프로젝트 내에서 데이터 처리 로직 설계와 API 최적화를 담당했습니다.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-6 w-full bg-[#2300A1] text-white py-2 rounded-md hover:bg-[#1b0080]"
            >
              확인
            </button>
          </div>
        </div>
      )}

      {isModal2Open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-[578px] relative">
            {/* 닫기 버튼 */}
            <button
              onClick={() => setIsModal2Open(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {/* 제목 */}
            <h3 className="text-2xl font-bold text-black mb-8 text-center">
              인턴/연구 경력 작성 가이드
            </h3>

            {/* 메인 텍스트 */}
            <p className="text-3xl font-bold text-[#0008A1] text-center mb-12">
              업무를 통해 만들어낸 성과를<br />
              구체적으로 설명해주세요.
            </p>

            {/* 들어가면 좋은 내용 섹션 */}
            <div className="mb-8">
              <p className="text-xl font-semibold text-black mb-4">
                들어가면 좋은 내용
              </p>
              <ul className="text-lg font-light space-y-1">
                <li>* 프로젝트의 결과/달성한 주요 성과 (구체적인 지표)</li>
                <li>* 프로젝트 진행 중 직면한 도전 과제와 해결 방법</li>
                <li>* 프로젝트를 통해 얻은 주요 교훈</li>
                <li>* 성장한 기술적 또는 비기술적 능력</li>
              </ul>
            </div>

            {/* 예시 섹션 */}
            <div className="bg-[#F4F4F4] rounded-[20px] p-6">
              <p className="text-lg font-bold text-[#686868] mb-6">
                예시
              </p>
              <p className="text-base font-extralight text-[#676767]">
              데이터 처리 속도 저하 문제가 발생했으나, 캐싱과 쿼리 최적화를 통해 성능을 개선했습니다.  
              결과적으로, 프로젝트를 통해 추천 알고리즘의 정확도를 25% 향상시키며, 재방문율을 15% 증가시키는 성과를 달성했습니다. 
              이를 통해 대규모 데이터를 효과적으로 처리하는 경험을 쌓았으며, 시스템 설계와 문제 해결 능력을 성장시킬 수 있었습니다.
              </p>
            </div>
            <button
              onClick={() => setIsModal2Open(false)}
              className="mt-6 w-full bg-[#2300A1] text-white py-2 rounded-md hover:bg-[#1b0080]"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Step3;
