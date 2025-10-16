import React from "react";
import PagesBanner from "../../../components/ui/PagesBanner";
import { FirstSection } from "../../../components/CompetitionsPage/FirstSection";
import CompetitionsSection from "../../../components/CompetitionsPage/CompetitionsSection";
import Leaderboard from "../../../components/CompetitionsPage/Leaderboard";
import CompetitionRulesAndFaqs from "../../../components/CompetitionsPage/CompetitionRulesAndFaqs";
import SharingWithFriendsHeroSection from "../../../components/CompetitionsPage/SharingWithFriendsHeroSection";
import Container from "../../../components/ui/Container";

const Compitions = () => {
  return (
    <div className="">
      <PagesBanner
        title={" المسابقات"}
        breadcrumb={[
          {
            title: "الرئيسية",
            link: "/",
          },
          {
            title: "المسابقات",
            link: "#",
          },
        ]}
        image={"/images/competitions-banner.png"}
      />

      <div className="mt-[48px] mb-[100px]">
        <Container className=" ">
          <FirstSection />
        </Container>
        <CompetitionsSection />
        <Leaderboard />
        <CompetitionRulesAndFaqs />
        <SharingWithFriendsHeroSection />
      </div>
    </div>
  );
};

export default Compitions;
