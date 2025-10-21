import React from "react";
import CourseDetailsCard from "../../../../components/CourseDetailsPage/CourseDetailsCard";
import CourseDetailsContent from "../../../../components/CourseDetailsPage/CourseDetailsContent";
import Container from "../../../../components/ui/Container";
import MobileCourseDetails from "../../../../components/CourseDetailsPage/MobileCourseDetails";

const NotReg_courseDetails = () => {
  return (
    <>
      <div className="lg:hidden space-y-4">
        <MobileCourseDetails />
        <Container>
          <CourseDetailsContent />
        </Container>
      </div>

      <div className="hidden lg:block">
        <div className="w-full h-[611px] relative">
          <img
            src="/images/Frame 1000004932.png"
            className="w-full h-full object-cover object-top"
            alt=""
          />
        </div>

        <Container className="mt-[48px] mb-[139px] ">
          <div className=" flex  justify-between gap-10  items-start">
            <div className="w-full max-w-[762px]">
              <CourseDetailsContent />
            </div>
            <div className="  translate-y-[-441px]  ">
              <CourseDetailsCard />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default NotReg_courseDetails;
