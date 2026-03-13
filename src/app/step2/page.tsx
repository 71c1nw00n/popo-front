import React from "react";
import Image from "next/image";

export default function CreateProfilePage() {
  return (
    <div className="flex flex-col w-full h-full">
      {/* Container */}
      <div className="w-full h-full">
            
      <div className="px-4 py-4 sm:px-6 md:px-12">
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
            Step 2. 프로필 형성
          </p>
          <p className="text-base sm:text-lg lg:text-xl mt-2">
            필요한 정보를 입력해주세요
          </p>
        </div>

        {/* Profile Banner */}
        <div className="relative flex mt-6 w-[80%] mx-auto items-center justify-center bg-lightgray rounded-lg h-32 flex">
          
          <Image 
            src="/img/profile.png" 
            alt="profile"
            width={200}
            height={200}
            className="absolute left-0 mt-[100px] ml-[60px]"
          />
          <span className="text-darkgray text-[28px]">배너 사진</span>
          <button className="absolute bottom-4 right-4 bg-white px-4 py-1 text-[28px] text-gray-600 rounded-full shadow-md hover:bg-mediumgray">
            업로드
          </button>
        </div>

        {/* Form */}
        <form className="mt-5 mx-[200px] min-w-[600px] w-[70%] mx-auto">
          {/* Name */}
          <div className="mb-5 pl-[180px] flex flex-row gap-3 items-center break-0">
            <label className="block text-[32px] font-medium break-0">이름</label>
            <input
              type="text"
              className="text-[28px] w-[260px] p-[6px_10px] block w-full border border-darkgray rounded-md shadow-sm"
              placeholder="이름을 입력하세요"
            />
          </div>
          <div className="grid grid-cols-2 gap-x-[60px] gap-y-3">
            {/* Phone */}
            <div>
              <label className="block text-[32px] font-medium ">휴대전화</label>
              <input
                type="text"
                className="text-[28px] p-[6px_10px] block w-full border border-darkgray rounded-md shadow-sm"
                placeholder="전화번호를 입력하세요"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[32px] font-medium ">메일</label>
              <input
                type="email"
                className="text-[28px] p-[6px_10px] block w-full border border-darkgray rounded-md shadow-sm"
                placeholder="jh532565@kaist.ac.kr"
              />
            </div>

            {/* School Name */}
            <div>
              <label className="block text-[32px] font-medium ">학교명</label>
              <input
                type="text"
                className="text-[28px] p-[6px_10px] block w-full border border-darkgray rounded-md shadow-sm"
                placeholder="학교명을 입력하세요"
              />
            </div>

            {/* Major */}
            <div>
              <label className="block text-[32px] font-medium ">전공</label>
              <input
                type="text"
                className="text-[28px] p-[6px_10px] block w-full border border-darkgray rounded-md shadow-sm"
                placeholder="전공을 입력하세요"
              />
            </div>

            {/* Enrollment Period */}
            <div className="col-span-1">
              <label className="block text-[32px] font-medium ">재학기간</label>
              <div className="flex space-x-4">
                <input
                  type="date"
                  className="text-[28px] p-[6px_10px] block w-full border border-darkgray rounded-md shadow-sm"
                />
                <input
                  type="date"
                  className="text-[28px] p-[6px_10px] block w-full border border-darkgray rounded-md shadow-sm"
                />
              </div>
            </div>

            {/* GitHub or Blog */}
            <div>
              <label className="block text-[32px] font-medium ">GitHub / 기술블로그</label>
              <input
                type="text"
                className="text-[28px] p-[6px_10px] block w-full border border-darkgray rounded-md shadow-sm"
                placeholder="GitHub 또는 블로그 URL을 입력하세요"
              />
            </div>


            
          </div>
        </form>
      </div>
    </div>
  );
}