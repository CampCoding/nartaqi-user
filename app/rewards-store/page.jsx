import React from "react";
import PagesBanner from "../../components/ui/PagesBanner";
import { RewardsPointsHeader } from "../../components/rewards-store/rewards-points-header";
import { RewardsNav } from "../../components/rewards-store/rewards-navs";
import { RewardCard } from "../../components/ui/Cards/RewardCard";

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

      <div className="container  max-w-[1312px] mt-8 mb-28  mx-auto  ">
        <RewardsPointsHeader />

        <RewardsNav />

        <div className="grid grid-cols-3 content-center justify-items-center gap-y-12">
          <RewardCard />
          <RewardCard />
          <RewardCard />
          <RewardCard />
          <RewardCard />
        </div>

        <div className="">
          <div className=" h-[90px]  mt-10 mb-5 flex items-center justify-start  text-secondary text-4xl font-bold  leading-[normal] [direction:rtl]">
            المستوى الفضي
          </div>

          <div className="grid grid-cols-3 content-center justify-items-center gap-y-12">
            <RewardCard locked />
            <RewardCard locked />
            <RewardCard locked />
            <RewardCard locked />
            <RewardCard locked />
            <RewardCard locked />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsStorePage;
