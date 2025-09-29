import React from "react";
import PagesBanner from "./../../components/ui/PagesBanner";
import BannerSection from "../../components/StudyPlanner/BannerSection";
import StudyPlannerForm from "./../../components/StudyPlanner/StudyPlannerForm";
import StudyBlannerFeaturesSection from "../../components/StudyPlanner/StudyBlannerFeaturesSection";

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

      <div className="container mx-auto px-[64px] flex flex-col gap-[65px] mb-[133px] mt-[48px]">
        <div className="flex justify-center  gap-[32px] ">
          <BannerSection />

          <StudyPlannerForm />
        </div>
        <StudyBlannerFeaturesSection />
      </div>
    </div>
  );
};

export default StudyPlannerPage;
