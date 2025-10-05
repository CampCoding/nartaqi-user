import React from "react";
import Container from "./Container";
import cx from "../../lib/cx";

const CoursesCategoriesLable = () => {
  return (
      <div className="  h-[60px] md:h-[120px] w-full relative">
        <img
          src="/images/frame-123.png"
          alt="Courses Categories Lable"
          className="h-full w-full "
        />
        <div className="absolute inset-0 flex items-center justify-center w-full h-full">
          <div className="justify-start text-white text-2xl md:text-4xl font-bold  uppercase">
            فئات الدورات
          </div>
        </div>
      </div>
    // <Container className={"!all-unset"}>

    //   <MobileCoursesCategoriesLable className={"  hidden"} />
    // </Container>
  );
};

export default CoursesCategoriesLable;

const MobileCoursesCategoriesLable = ({ className }) => {
  return (
    <div
      class={cx(
        "self-stretch w-full inline-flex justify-between items-start",
        className
      )}
    >
      <div class="justify-center whitespace-nowrap w-fit text-primary-dark text-base font-bold font-['Cairo'] leading-normal">
        فئات الدورات
      </div>
      <div class=" h-6 justify-center  text-primary-dark text-sm font-normal font-['Cairo'] underline leading-none">
        عرض المزيد
      </div>
    </div>
  );
};
