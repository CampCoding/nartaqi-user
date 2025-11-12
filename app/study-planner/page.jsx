import React from "react";
import PagesBanner from "./../../components/ui/PagesBanner";
import BannerSection from "../../components/StudyPlanner/BannerSection";
import StudyPlannerForm from "./../../components/StudyPlanner/StudyPlannerForm";
import StudyBlannerFeaturesSection from "../../components/StudyPlanner/StudyBlannerFeaturesSection";
import Container from "../../components/ui/Container";

const StudyPlannerPage = () => {
  return (
    <div>
      <PagesBanner
        variant="normal"
        title={"جدول المذاكرة"}
        image={"/images/Frame 1000004929 (1).png"}
        breadcrumb={[
          {
            title: "الرئيسية",
            link: "/",
          },
          {
            title: "جدول المذاكرة",
            link: "/study-planner",
          },
        ]}
        objectPosition={"100%_100%"}
      />

      <Container className=" flex flex-col  gap-5 md:gap-[65px] mb-[40px]  md:mb-[133px] mt-[48px]">
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-[32px]">
          <BannerSection />
          <StudyPlannerForm />
        </div>
        <StudyBlannerFeaturesSection />
      </Container>
    </div>
  );
};

export default StudyPlannerPage;
