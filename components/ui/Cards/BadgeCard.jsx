import React from "react";

export const BadgeCard = () => {
  return (
    <article className="inline-flex w-full flex-col items-center gap-6 sm:gap-8 px-6 sm:px-12 lg:px-[60px] py-6 sm:py-8 relative bg-white rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] border-[3px] border-solid border-primary-bg mx-auto">
      <div className="relative w-20 h-20 sm:w-22 sm:h-22 lg:w-24 lg:h-24 bg-primary-bg rounded-[50px] aspect-[1]">
        <img
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[35px] h-[32px] sm:w-[38px] sm:h-[35px] lg:w-[42px] lg:h-[39px]"
          alt="Frame"
          src={"/images/badge.png"}
        />
      </div>

      <header className="inline-flex flex-col items-center justify-center gap-2 relative flex-[0_0_auto]">
        <h1 className="self-stretch font-bold text-primary text-sm sm:text-base relative flex items-center justify-center text-center tracking-[0] leading-[normal] [direction:rtl]">
          شارة الملتزم
        </h1>

        <p className="w-fit font-medium text-text-alt text-xs sm:text-sm relative flex items-center justify-center text-center tracking-[0] leading-[normal] [direction:rtl]">
          إدارة الوقت للطلاب
        </p>
      </header>
    </article>
  );
};
