import React from "react";
import CourseDetailsCard from "../../../../components/CourseDetailsPage/CourseDetailsCard";
import CourseDetailsContent from "../../../../components/CourseDetailsPage/CourseDetailsContent";
import RegCourseDetailsCard from "../../../../components/CourseDetailsPage/Reg_courseDetialsCard";
import RegCourseDetailsContent from "../../../../components/CourseDetailsPage/Reg_courseDetailsContent";
import LiveCard from "./../../../../components/ui/Cards/LiveCard";
import Container from "../../../../components/ui/Container";
import MobileCourseDetails from "../../../../components/CourseDetailsPage/MobileCourseDetails";
import FAQs from "../../../faqs/page";
import CrouseFaqs from "../../../../components/CourseDetailsPage/CourseFaqs";

const Reg_courseDetails = ({ isDone }) => {
  const [selectedTab, setSelectedTab] = React.useState("sourses");
  return (
    <>
      <div className="lg:hidden space-y-4">
        <MobileCourseDetails isRegestered />
        <Container >
          <RegCourseDetailsContent onTabsChange={(e) => setSelectedTab(e)} />
          {selectedTab === "sourses" && <CrouseFaqs />}
        </Container>
      </div>{" "}
      <div className="hidden lg:block">
        <div className="w-full h-[611px] relative ">
          <img
            src="/images/Frame 1000004932.png"
            className="w-full h-full object-cover object-top"
            alt=""
          />
        </div>

        {/* course details content */}
        <Container className=" mt-[48px] mb-[139px] ">
          <div className=" flex gap-5  justify-between items-start">
            <div className="max-w-[762px] w-full ">
              <RegCourseDetailsContent
                onTabsChange={(e) => setSelectedTab(e)}
              />
            </div>
            <div className="  space-y-6 translate-y-[-441px]  ">
              <RegCourseDetailsCard isDone={isDone} />
              <LiveCard />
            </div>
          </div>

          {selectedTab === "sourses" && <CrouseFaqs />}
        </Container>
      </div>
    </>
  );
};

export default Reg_courseDetails;
