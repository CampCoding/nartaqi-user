import React from "react";
import Container from "./Container";
import cx from "../../lib/cx";

const CoursesCategoriesLable = () => {
  return (
    <div className="h-[48px] sm:h-[60px] md:h-[100px] lg:h-[120px] w-full relative">
      <img
        loading="lazy"
        src="/images/frame-123.png"
        alt="Courses Categories Lable"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center w-full h-full px-4">
        <div className="justify-start text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-center">
          فئات الدورات
        </div>
      </div>
    </div>
  );
};

export default CoursesCategoriesLable;

const MobileCoursesCategoriesLable = ({ className }) => {
  return (
    <div
      className={cx(
        "self-stretch w-full inline-flex justify-between items-start",
        className
      )}
    >
      <div className="justify-center whitespace-nowrap w-fit text-primary-dark text-base font-bold font-['Cairo'] leading-normal">
        فئات الدورات
      </div>
      <div className="h-6 justify-center text-primary-dark text-sm font-normal font-['Cairo'] underline leading-none">
        عرض المزيد
      </div>
    </div>
  );
};