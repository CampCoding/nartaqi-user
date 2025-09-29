import React from "react";
// import frame1000005384 from "./frame-1000005384.svg";

export const BadgeCard = () => {
  return (
    <article className="inline-flex flex-col items-center gap-8 px-[60px] py-8 relative bg-white rounded-[30px] border-[3px] border-solid border-primary-bg">
       <div className="relative w-24 h-24 bg-primary-bg rounded-[50px] aspect-[1]">
      <img
        className="absolute top-[calc(50.00%_-_20px)] left-[calc(50.00%_-_21px)] w-[42px] h-[39px]"
        alt="Frame"
        src={"/images/badge.png"}
      />
    </div>

      <header className="inline-flex flex-col items-center justify-center gap-2 relative flex-[0_0_auto]">
        <h1 className="self-stretch mt-[-1.00px]  font-bold text-primary text-base relative flex items-center justify-center text-center tracking-[0] leading-[normal] [direction:rtl]">
          شارة الملتزم
        </h1>

        <p className="w-fit  font-medium text-text-alt text-sm relative flex items-center justify-center text-center tracking-[0] leading-[normal] [direction:rtl]">
          إدارة الوقت للطلاب
        </p>
      </header>
    </article>
  );
};