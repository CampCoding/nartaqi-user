"use client";

import React from "react";
import CourseTitle from "./../../components/CourseDetailsPage/CourseTitle";

const SuccessCheckout = () => {
  return (
    <div className="container mx-auto px-[64px]">
      <CourseTitle title={"الدفع"} />

      <img src="/images/Image_fx 1.svg" alt="" />
      <BackToHome />
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
    <div className="flex flex-col pt-[96px] pb-[158px]  w-full items-center justify-center  gap-12 relative">
      <h1 className="self-stretch text-center text-text-alt text-[56px] relative mt-[-1.00px]  font-bold tracking-[0] leading-[normal] ">
        تمت عملية الدفع بنجاح , ابدا في التعلم الأن
      </h1>

      <button
        onClick={handleReturnHome}
        className="inline-flex items-center justify-center gap-2.5 px-14 py-6 relative flex-[0_0_auto] bg-primary rounded-[30px] hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-colors duration-200 cursor-pointer"
        aria-label="العودة إلى الصفحة الرئيسية"
      >
        <span className="w-fit text-white text-[32px] relative mt-[-1.00px]  font-bold tracking-[0] leading-[normal] ">
          العودة الي الرئيسية
        </span>
      </button>
    </div>
  );
};
