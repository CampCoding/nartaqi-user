import React from "react";
import CourseDetailsCard from "../../../../components/CourseDetailsPage/CourseDetailsCard";
import CourseDetailsContent from "../../../../components/CourseDetailsPage/CourseDetailsContent";

const NotReg_courseDetails = () => {
  return (
    <>
      <div className="w-full h-[611px] relative">
        <img
          src="/images/Frame 1000004932.png"
          className="w-full h-full object-cover object-top"
          alt=""
        />
      </div>

      <div className=" mx-auto px-[64px] mt-[48px] mb-[139px] ">
        <div className="flex justify-between items-start">
          <div className="max-w-[762px] w-full ">
            <CourseDetailsContent />
          </div>
          <div className=" grid grid-cols-1 gap-[80px] translate-y-[-441px]  ">
            <CourseDetailsCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default NotReg_courseDetails;
