'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Timeline() {
  const [currentStep, setCurrentStep] = useState("");
  const totalSteps = 6;
  const router = useRouter();

  // useEffect(() => {
  //   router.push(`/step${currentStep+1}`);
  // }, [currentStep]);

  return (
    <div className="w-full fixed bottom-[50px] flex items-center justify-center">
        <svg
          width={1219}
          height={58}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex items-center justify-center"
          preserveAspectRatio="none"
        >
          <rect x={29} y={20} width={1163} height={17} fill="#F0F0F0" />
          <circle cx={29} cy={29} r={24} fill={currentStep === "1" ? "#CECFED" : "#F0F0F0"} onClick={()=>{setCurrentStep("1"); router.push("/step1")}} />
          <circle cx={261} cy={29} r={24} fill={currentStep === "2" ? "#CECFED" : "#F0F0F0"} onClick={()=>{setCurrentStep("2"); router.push("/step2")}} />
          <circle cx={493} cy={29} r={24} fill={currentStep === "3" ? "#CECFED" : "#F0F0F0"} onClick={()=>{setCurrentStep("3"); router.push("/step3")}} />
          <circle cx={726} cy={29} r={24} fill={currentStep === "4" ? "#CECFED" : "#F0F0F0"} onClick={()=>{setCurrentStep("4"); router.push("/step4")}} />
          <circle cx={958} cy={29} r={24} fill={currentStep === "5" ? "#CECFED" : "#F0F0F0"} onClick={()=>{setCurrentStep("5"); router.push("/step5")}} />
          <circle cx={1190} cy={29} r={24} fill={currentStep === "6" ? "#CECFED" : "#F0F0F0"} onClick={()=>{setCurrentStep("6"); router.push("/step6")}} />
        </svg>;
    </div>
  );
}