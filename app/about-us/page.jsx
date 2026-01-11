import React from "react";
import PagesBanner from "../../components/ui/PagesBanner";
import { AboutUs } from "../../components/Home/AboutUs";
import FunFacts from "../../components/ui/FunFacts";
import OurMessagesSection from "../../components/AbouUsPage/OurMessagesSection";
import OurVision from "../../components/AbouUsPage/OurVision";
import OurGoals from "../../components/AbouUsPage/OurGoals";

const AboutUsPage = () => {
  return <div className="">
    <PagesBanner   breadcrumb = {[
    {
      title: "الرئيسية",
      link: "/",
    },
    {
      title: "نبذه عنا",
      link: "/about-us",
    },
  ]} />
    <AboutUs showCTA={false} />
    <FunFacts />
    <OurMessagesSection />
    <OurVision />
    <OurGoals />
  </div>
};

export default AboutUsPage;
