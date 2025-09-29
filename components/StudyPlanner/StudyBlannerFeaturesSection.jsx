import React from "react";

const StudyBlannerFeaturesSection = () => {
  return (
    <div className="flex flex-wrap justify-center gap-[32px]">
      <StudyBlannerfeatureCard />
      <StudyBlannerfeatureCard />
      <StudyBlannerfeatureCard />
    </div>
  );
};

export default StudyBlannerFeaturesSection;

import { FeaturePlannerFileIcon } from "../../public/svgs";

export const StudyBlannerfeatureCard = () => {
  return (
    <div className="relative w-[414px] h-[196px] border-[3px] border-[#E5E7EB] p-6 rounded-[20px] ">
      <FeaturePlannerFileIcon   parentClassName="fill-secondary-light" iconClassName={"stroke-secondary"}  />
      <div className="flex  items-center justify-start pt-[16px] pb-[7.5px] ">
        <div className="relative text-text self-stretch w-fit  text-text text-xl leading-7 whitespace-nowrap ">
          جدول الدراسة
        </div>
      </div>
      <p className="   text-text-alt text-base leading-6 overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] ">
        احصل على جدول دراستك المخصص في مستند PDF منسق بشكل جيد
      </p>
    </div>
  );
};
