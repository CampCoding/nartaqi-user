import React from "react";
import { DisabledRadioButton, EnabledRadioButton } from "../../public/svgs";

const InstallmentCheckout = () => {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20">
      <TamaraFrame />
      <TabbyFrame />
    </div>
  );
};

export default InstallmentCheckout;

const TamaraFrame = () => {
  return (
    <div className="flex flex-col items-start gap-3 sm:gap-4 px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 relative bg-white rounded-[15px] sm:rounded-[18px] md:rounded-[20px] border-2 sm:border-[3px] border-solid border-[#c8c9d5]">
      <div className="flex justify-between w-full items-center relative self-stretch flex-[0_0_auto]">
        <div className="inline-flex gap-2 items-center relative self-stretch flex-[0_0_auto]">
          <div className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 aspect-[1] focus-within:ring-2 focus-within:ring-secondary focus-within:ring-offset-2 focus-within:rounded-full">
            <DisabledRadioButton />
          </div>
          <div className="relative w-fit text-text-alt text-lg sm:text-xl md:text-2xl text-left leading-6 whitespace-nowrap">
            تمارا
          </div>
        </div>
        <img
          loading="lazy"
          className="relative w-[100px] sm:w-[120px] md:w-[140px] h-8 sm:h-9 md:h-10 object-contain"
          alt="Tamara"
          src={"/images/tamara-icon.png"}
        />
      </div>
    </div>
  );
};

const TabbyFrame = () => {
  return (
    <div className="flex flex-col items-start gap-3 sm:gap-4 px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 relative bg-white rounded-[15px] sm:rounded-[18px] md:rounded-[20px] border-2 sm:border-[3px] border-solid border-[#c8c9d5]">
      <div className="flex justify-between w-full items-center relative self-stretch flex-[0_0_auto]">
        <div className="inline-flex gap-2 items-center relative self-stretch flex-[0_0_auto]">
          <div className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 aspect-[1] focus-within:ring-2 focus-within:ring-secondary focus-within:ring-offset-2 focus-within:rounded-full">
            <DisabledRadioButton />
          </div>
          <div className="relative w-fit text-text-alt text-lg sm:text-xl md:text-2xl text-left leading-6 whitespace-nowrap">
            تابي
          </div>
        </div>
        <img
          loading="lazy"
          className="relative w-[80px] sm:w-[95px] md:w-[110px] h-8 sm:h-9 md:h-10 object-contain"
          alt="Tabby"
          src={"/images/tabby.png"}
        />
      </div>
    </div>
  );
};
