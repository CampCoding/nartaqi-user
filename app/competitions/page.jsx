import React from "react";
import PagesBanner from "../../components/ui/PagesBanner";
import { FirstSection } from "./../../components/CompetitionsPage/FirstSection";
import CompetitionsSection from "../../components/CompetitionsPage/CompetitionsSection";
import Leaderboard from "../../components/CompetitionsPage/Leaderboard";
import CompetitionRulesAndFaqs from "../../components/CompetitionsPage/CompetitionRulesAndFaqs";
import SharingWithFriendsHeroSection from "../../components/CompetitionsPage/SharingWithFriendsHeroSection";

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


      <main className="container max-w-[1312px] mx-auto ">
        <FirstSection />
      </main>
      <CompetitionsSection />
      <Leaderboard />
      <CompetitionRulesAndFaqs />
      <SharingWithFriendsHeroSection />
    </div>
          </div>
  );
};

export default Compitions;
