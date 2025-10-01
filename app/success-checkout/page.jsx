"use client";

import React from "react";
import CourseTitle from "./../../components/CourseDetailsPage/CourseTitle";
import Link from "next/link";

const SuccessCheckout = () => {
  return (
    <div className="container mx-auto px-[64px]">
      <CourseTitle title={"الدفع"} />
      <div className="max-w-[834.56px] mx-auto">
        <img src="/images/Image_fx 1.svg" alt="" />
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
    <div className="flex flex-col pt-8 pb-[158px]  w-full items-center justify-center  gap-6 relative">
      <div class="self-stretch text-center justify-center text-text-alt text-3xl font-bold font-['Cairo']">
        تمت عملية الدفع بنجاح , ابدا في التعلم الأن
      </div>

      <Link href={"/"} className="px-20 py-6 bg-orange-500 rounded-3xl inline-flex justify-center items-center gap-2.5">
        <div className="text-right justify-center text-white text-base font-bold font-['Cairo']">
          العودة إلى الرئيسية
        </div>
      </Link>
    </div>
  );
};
