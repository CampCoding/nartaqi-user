import React from "react";
import CourseDetailsCard from "../../../../components/CourseDetailsPage/CourseDetailsCard";
import CourseDetailsContent from "../../../../components/CourseDetailsPage/CourseDetailsContent";
import RegCourseDetailsCard from "../../../../components/CourseDetailsPage/Reg_courseDetialsCard";
import RegCourseDetailsContent from "../../../../components/CourseDetailsPage/Reg_courseDetailsContent";
import LiveCard from "./../../../../components/ui/Cards/LiveCard";

const Reg_courseDetails = () => {
  return (
    <>
      <div className="w-full h-[611px] relative ">
        <img
          src="/images/Frame 1000004932.png"
          className="w-full h-full object-cover object-top"
          alt=""
        />
      </div>

      {/* course details content */}
      <div className=" mx-auto px-[64px] mt-[48px] mb-[139px] h-[300vh]">
        <div className="flex justify-between">
          <RegCourseDetailsContent />
          <div className=" grid grid-cols-1 gap-[80px] translate-y-[-441px]  ">
            <RegCourseDetailsCard />
            <LiveCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Reg_courseDetails;
