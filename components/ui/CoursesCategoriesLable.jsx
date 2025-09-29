import React from "react";

const CoursesCategoriesLable = () => {
  return (
    <div className="h-[148px] w-full relative">
      <img
        src="/images/frame-123.png"
        alt="Courses Categories Lable"
        className="h-full w-full"
      />
      <div className="absolute inset-0 flex items-center justify-center w-full h-full">
        <div className="justify-start text-white text-6xl font-bold  uppercase">
          فئات الدورات
        </div>
      </div>
    </div>
  );
};

export default CoursesCategoriesLable;
