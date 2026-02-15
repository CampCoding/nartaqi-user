// app/payment/failed/page.jsx
"use client";

import React, { Suspense, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import CourseTitle from "../../../components/CourseDetailsPage/CourseTitle";
import Link from "next/link";

const PaymentFailedContent = () => {
  const router = useRouter();
  const hasCleared = useRef(false);

  useEffect(() => {
    // ✅ امسح localStorage مرة واحدة بس
    if (!hasCleared.current) {
      hasCleared.current = true;
      localStorage.removeItem("pending_payment");
    }
  }, []);

  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
      <CourseTitle title={"الدفع"} />
      <div className="max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[650px] xl:max-w-[834.56px] mx-auto">
        <div className="w-full flex justify-center mb-4 sm:mb-6 md:mb-8">
          <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full bg-red-100 flex items-center justify-center">
            <svg
              className="w-16 h-16 sm:w-20 sm:h-20 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col pt-4 sm:pt-6 md:pt-8 pb-12 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-32 w-full items-center justify-center gap-4 sm:gap-5 md:gap-6 relative px-2 sm:px-4">
          <div className="self-stretch text-center justify-center text-text-alt text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-['Cairo'] leading-tight sm:leading-normal px-2">
            عذراً، لم تتم عملية الدفع بنجاح
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => router.back()}
              className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-3 sm:py-4 md:py-5 lg:py-6 bg-orange-500 hover:bg-orange-600 rounded-2xl sm:rounded-3xl inline-flex justify-center items-center gap-2.5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 w-full sm:w-auto max-w-sm sm:max-w-none"
            >
              <div className="text-center justify-center text-white text-sm sm:text-base font-bold font-['Cairo'] whitespace-nowrap">
                إعادة المحاولة
              </div>
            </button>

            <Link
              href={"/"}
              className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-3 sm:py-4 md:py-5 lg:py-6 bg-gray-200 hover:bg-gray-300 rounded-2xl sm:rounded-3xl inline-flex justify-center items-center gap-2.5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 w-full sm:w-auto max-w-sm sm:max-w-none"
            >
              <div className="text-center justify-center text-gray-700 text-sm sm:text-base font-bold font-['Cairo'] whitespace-nowrap">
                العودة إلى الرئيسية
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentFailedPage = () => {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto min-h-[60vh] flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PaymentFailedContent />
    </Suspense>
  );
};

export default PaymentFailedPage;
