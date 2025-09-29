import React from "react";
import { DisabledRadioButton, EnabledRadioButton } from "../../public/svgs";
// import png2768X2501 from "./png-2-768x250-1.svg";
// import vector from "./vector.svg";

const InstallmentCheckout = () => {
  return (
    <div className="flex flex-col gap-[48px] mb-[200px]">
      <TamaraFrame />
      <TabbyFrame />
      
    </div>
  );
};

export default InstallmentCheckout;

const TamaraFrame = () => {
  return (
    <div className="flex flex-col items-start gap-4 px-4 py-6 relative bg-white rounded-[20px] border-[3px] border-solid border-[#c8c9d5] ">
      <div className="flex justify-between w-full items-center relative self-stretch flex-[0_0_auto]">
        <div className="inline-flex gap-2 items-center relative self-stretch flex-[0_0_auto]">
          <div className="relative w-8 h-8 aspect-[1]">
            <DisabledRadioButton />
          </div>
          <div className="relative w-fit  text-text-alt text-2xl text-left leading-6 whitespace-nowrap ">
            تمارا
          </div>
        </div>
        <img
          className="relative w-[172px] h-14 aspect-[3.07]"
          alt="Png"
          src={"/images/tamara-icon.png"}
        />
      </div>
    </div>
  );
};


const TabbyFrame = () => {
  return (
    <div className="flex flex-col items-start gap-4 px-4 py-6 relative bg-white rounded-[20px] border-[3px] border-solid border-[#c8c9d5]">
      <div className="flex justify-between w-full items-center relative self-stretch flex-[0_0_auto]">
        <div className="inline-flex gap-2 items-center relative self-stretch flex-[0_0_auto]">
          <div className="relative w-8 h-8 aspect-[1]">
            <DisabledRadioButton />
          </div>
          <div className="relative w-fit  text-text-alt text-2xl text-left leading-6 whitespace-nowrap ">
          تابي
          </div>
        </div>
        <img
          className="relative w-[130px] h-14 aspect-[3.07]"
          alt="Png"
          src={"/images/tabby.png"}
        />
      </div>
    </div>
  );
};


