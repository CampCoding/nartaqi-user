"use client";

import React from "react";
import CourseTitle from "./../../components/CourseDetailsPage/CourseTitle";
import Link from "next/link";

const SuccessCheckout = () => {
  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
      <CourseTitle title={"الدفع"} />
      <div className="max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[650px] xl:max-w-[834.56px] mx-auto">
        <div className="w-full flex justify-center mb-4 sm:mb-6 md:mb-8">
          <img
            src="/images/Image_fx 1.svg"
            alt="نجح الدفع"
            className="w-full h-auto max-w-[250px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px] xl:max-w-full object-contain"
          />
        </div>
        <BackToHome />
      </div>
    </div>
  );
};

export default SuccessCheckout;

export const BackToHome = () => {
  const handleReturnHome = () => {
    // Handle navigation to home page
    console.log("Navigating to home page");
  };

  return (
    <div className="flex flex-col pt-4 sm:pt-6 md:pt-8 pb-12 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-32 w-full items-center justify-center gap-4 sm:gap-5 md:gap-6 relative px-2 sm:px-4">
      <div className="self-stretch text-center justify-center text-text-alt text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-['Cairo'] leading-tight sm:leading-normal px-2">
        تمت عملية الدفع بنجاح , ابدا في التعلم الأن
      </div>

      <Link
        href={"/"}
        className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-3 sm:py-4 md:py-5 lg:py-6 bg-orange-500 hover:bg-orange-600 rounded-2xl sm:rounded-3xl inline-flex justify-center items-center gap-2.5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 w-full sm:w-auto max-w-sm sm:max-w-none"
      >
        <div className="text-center justify-center text-white text-sm sm:text-base font-bold font-['Cairo'] whitespace-nowrap">
          العودة إلى الرئيسية
        </div>
      </Link>
    </div>
  );
};
