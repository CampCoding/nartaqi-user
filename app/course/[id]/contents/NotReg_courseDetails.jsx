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
        <div className="absolute top-[202px] !left-[65px]">
          <CourseDetailsCard />
        </div>
      </div>

      {/* course details content */}
      <div className="container mx-auto px-[64px] mt-[48px] mb-[139px]">
        <div>
          <CourseDetailsContent />
        </div>
      </div>
    </>
  );
};

export default NotReg_courseDetails;
