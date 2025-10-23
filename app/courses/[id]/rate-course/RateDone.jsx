import React from "react";

const RateDone = () => {
  return (
<div className="container mx-auto max-w-4xl px-4 sm:px-8 md:px-16 space-y-6 sm:space-y-10 md:space-y-[30px]">
  <img src="/images/2genders-rate.png" className="w-full h-auto" alt="" />

  <div className="flex w-full flex-col justify-start items-center gap-6 sm:gap-10">
    <div className="self-stretch text-center text-primary font-bold text-xl ">
      شكرًا على تقييمك  تم تسجيل ملاحظاتك بنجاح
    </div>

    <button
      type="button"
      className="px-6 sm:px-10 md:px-14 py-3 sm:py-4 md:py-6 bg-blue-950 rounded-[20px] md:rounded-[30px] inline-flex justify-center items-center gap-2.5
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
      aria-label="العودة إلى الرئيسية"
    >
      <span className="text-white font-bold text-base">العودة إلى الرئيسية</span>
    </button>
  </div>
</div>

  );
};

export default RateDone;
