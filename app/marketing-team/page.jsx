import React from "react";
import PagesBanner from "./../../components/ui/PagesBanner";
import JoinUsAsMerketer from "../../components/MarketingTeam/JoinUsAsMerketer";
import WhyChooseUs from "./../../components/Home/WhyChooseUs";
import { HowProgramWorks } from "../../components/MarketingTeam/HowProgramWorks";
import OurProgramFeatures from "../../components/MarketingTeam/OurProgramFeatures";
import WhatOurXSay from "../../components/Home/WhatOurStudentsSay";
import { BottomBanner } from "../../components/MarketingTeam/BottomBanner";
import Container from "../../components/ui/Container";

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

      <Container className=" mt-[56px] mx-auto">
        <JoinUsAsMerketer />
      </Container>
      <WhyChooseUs />
      <Container className=" mt-[56px] mx-auto">
        <HowProgramWorks />
      </Container>
      <OurProgramFeatures />
      <WhatOurXSay
        title="ماذا يقول مسوقونا"
        description=""
        bg="bg-gradient-to-b  from-primary-light to-primary-bg"
      />
      <Container>
        <BottomBanner />
      </Container>
    </div>
  );
};

export default MarketingTeam;
