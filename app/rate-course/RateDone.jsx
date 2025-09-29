import React from "react";

const RateDone = () => {
  return (
    <div className="container mx-auto px-[64px] space-y-[97px]">
      <img src="/images/2genders-rate.png" className="w-full" alt="" />
      <div className="flex  w-full flex-col justify-start items-center gap-12">
        <div className="self-stretch  text-center justify-center text-primary text-6xl font-bold ">
          شكرًا على تقييمك  تم تسجيل ملاحظاتك بنجاح
        </div>
        <div className="size- px-14 py-6 bg-blue-950 rounded-[30px] inline-flex justify-center items-center gap-2.5">
          <div className="text-right justify-center text-white text-3xl font-bold ">
            العودة إلى الرئيسية
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateDone;
