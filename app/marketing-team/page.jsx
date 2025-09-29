import React from "react";
import PagesBanner from "./../../components/ui/PagesBanner";
import JoinUsAsMerketer from "../../components/MarketingTeam/JoinUsAsMerketer";
import WhyChooseUs from "./../../components/Home/WhyChooseUs";
import { HowProgramWorks } from "../../components/MarketingTeam/HowProgramWorks";
import OurProgramFeatures from "../../components/MarketingTeam/OurProgramFeatures";
import WhatOurXSay from "../../components/Home/WhatOurStudentsSay";
import { BottomBanner } from "../../components/MarketingTeam/BottomBanner";

const MarketingTeam = () => {
  return (
    <div className="pb-[46px]">
      <PagesBanner
        image={"/images/marketing-team.png"}
        title={"انضم إلى فريق المسوقين"}
        breadcrumb={[
          { title: "الرئيسية", link: "/" },
          { title: "انضم إلى فريق المسوقين", link: "/marketing-team" },
        ]}
      />

      <div className="container mt-[56px] px-[64px] mx-auto">
        <JoinUsAsMerketer />
      </div>
      <WhyChooseUs />
      <div className="container mt-[56px] px-[64px] mx-auto">
        <HowProgramWorks />
      </div>
      <OurProgramFeatures />
      <WhatOurXSay title="ماذا يقول مسوقونا" description="" bg="bg-gradient-to-b  from-primary-light to-primary-bg"   />
      <BottomBanner />
    </div>
  );
};

export default MarketingTeam;
