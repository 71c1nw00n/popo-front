'use client';
import { useRouter } from "next/navigation";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { FaCircle, FaRegCircle } from "react-icons/fa";
import PropTypes from "prop-types"; // Prop 검증을 위해 추가

// 다음버튼
const onNext = () => {
  if (window.confirm("넘어가시겠습니까? 더이상 추가할 수 없습니다.")) {
      alert("넘어갑니다.");
  } else {
      alert("돌아갑니다.");
  }
};

const ImageSlider = ({ images = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1300,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current) => setCurrentSlide(current),
  };

  return (
    <div className="w-full max-w-[800px] mx-auto">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <div className="relative w-full h-[500px]">
              <Image
                src={image}
                alt={`slide-${index}`}
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
          </div>
        ))}
      </Slider>
      <div className="flex w-full justify-center">
        {images.map((_, index) => (
          index === currentSlide ? (
            <FaCircle key={index} style={{ margin: "0 5px" }} />
          ) : (
            <FaRegCircle key={index} style={{ margin: "0 5px" }} />
          )
        ))}
      </div>
    </div>
  );
};

// Prop 검증 추가
ImageSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const images =[
    "/example-image-1_3.png",
    "/example-image-1_2.png",
    "/example-image-1_4.png"
];

{/*main*/}
const Step4 = () => {
  // 도움말 모달 관리
  const router = useRouter()

  return (
    <div className="relative w-full h-auto bg-white overflow-hidden">
      {/* header */}
      <header className="bg-[#FFFFFF] text-white py-4 shadow-md fixed w-full top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* 로고 */}
          <div className="text-3xl font-bold text-[#2300A1]">POPO</div>

          {/* 네비게이션 메뉴 // Re?랑 +프로젝트 둘다 라우팅은 똑같은데 onclick으로 +프로젝트는 작성된 데이터 db에 저장하는걸로*/}
          <nav className="flex flex-row-3 gap-10">
            <a href="/" className="hover:text-gray-300 font-bold text-[#2300A1] text-xl">
              + 프로젝트
            </a>
            <button 
              onClick={onNext} // 버튼 클릭 시 onNext 함수 실행
              className="hover:text-gray-300 font-bold text-[#2300A1] text-xl"
            >
              다음
            </button>
          </nav>
        </div>
      </header>

      {/* body */}
      <div className="pt-2">
        {/* 설명 */}
        <div className="flex items-center justify-between bg-white shadow px-10 pt-20 pb-5">
          {/* 왼쪽 섹션 */}
          <div>
            <h1 className="text-xl font-bold text-black">Step 4. 프로젝트 경험 추가</h1>
            <p className="text-sm text-gray-600">프로젝트 목록을 확인하세요</p>
          </div>
        </div>

        {/* 완성된 포트폴리오 이미지 슬라이드쇼 */}
        <div className="flex relative w-auto h-[600px] bg-[#F0F0F0] justify-center">
            <div className="mt-10">
                <ImageSlider images={images}/>
            </div>
        </div>
        {/* SVG Bar */}
        <svg
          width={1219}
          height={58}
          viewBox="0 0 1219 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto w-4/9 max-w-[800px] h-auto py-4 "
          preserveAspectRatio="none"
        >
          <rect x={29} y={20} width={1163} height={17} fill="#D9D9D9" />
          <circle cx={29} cy={29} r={29} fill="#D9D9D9" />
          <circle cx={261} cy={29} r={29} fill="#D9D9D9" />
          <circle cx={493} cy={29} r={29} fill="#D9D9D9" />
          <circle cx={726} cy={29} r={29} fill="#CECFED" />
          <circle cx={958} cy={29} r={29} fill="#D9D9D9" />
          <circle cx={1190} cy={29} r={29} fill="#D9D9D9" />
        </svg>
      </div>
    </div>
  );
};

export default Step4;