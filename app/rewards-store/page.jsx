import React from "react";
import PagesBanner from "../../components/ui/PagesBanner";
import { RewardsPointsHeader } from "../../components/rewards-store/rewards-points-header";
import { RewardsNav } from "../../components/rewards-store/rewards-navs";
import { RewardCard } from "../../components/ui/Cards/RewardCard";
import Container from "../../components/ui/Container";

const RewardsStorePage = () => {
  return (
    <div className="">
      <PagesBanner
        title={" متجر المكافأت"}
        breadcrumb={[
          {
            title: "الرئيسية",
            link: "/",
          },
          {
            title: "مسابقة الطلاب",
            link: "#",
          },
        ]}
        image={"/images/rewards-store.png"}
      />

      <Container className="my-8 ">
        <RewardsPointsHeader />
        <RewardsNav />
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-6 content-center justify-items-center ">
          <RewardCard />
          <RewardCard />
          <RewardCard />
          <RewardCard />
          <RewardCard />
        </div>

        <div className="">
          <div className="   mt-10 mb-5 flex items-center justify-start  text-secondary text-xl md:text-3xl font-bold  leading-[normal] [direction:rtl]">
            المستوى الفضي
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-6 content-center justify-items-center ">
            <RewardCard locked />
            <RewardCard locked />
            <RewardCard locked />
            <RewardCard locked />
            <RewardCard locked />
            <RewardCard locked />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RewardsStorePage;
