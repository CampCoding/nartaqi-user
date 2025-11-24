import React from "react";
import { FeaturePlannerFileIcon } from "../../public/svgs";

const StudyBlannerFeaturesSection = () => {
  return (
    // CHANGED: Added responsive gap for better spacing on mobile.
    <div className="flex flex-wrap justify-center gap-4 lg:gap-[32px]">
      <StudyBlannerfeatureCard />
      <StudyBlannerfeatureCard />
      <StudyBlannerfeatureCard />
    </div>
  );
};

export default StudyBlannerFeaturesSection;

export const StudyBlannerfeatureCard = () => {
  return (
   
    <div className="relative w-full lg:w-[414px] border-[3px] border-[#E5E7EB] p-6 rounded-[20px] ">
      <FeaturePlannerFileIcon
        parentClassName="fill-secondary-light"
        iconClassName={"stroke-secondary"}
      />
      <div className="flex items-center justify-start pt-[16px] pb-[7.5px] ">
        <div className="relative text-text self-stretch w-fit font-semibold text-lg md:text-xl leading-7 whitespace-nowrap ">
          جدول الدراسة
        </div>
      </div>
      <p className="text-text-alt text-sm  leading-6 overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] ">
        احصل على جدول دراستك المخصص في مستند PDF منسق بشكل جيد
      </p>
    </div>
  );
};
