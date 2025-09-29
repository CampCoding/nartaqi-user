import React from "react";

// import background from "./background.svg";
// import frame1000005574 from "./frame-1000005574.svg";

export const RewardsPointsHeader = () => {
  // Data for the progress component
  const progressData = {
    currentPoints: 1250,
    requiredPoints: 250,
    nextLevel: "الفضي",
    progressPercentage: 75, // Calculated based on visual progress bar
  };

  return (
    <section
      className="flex !w-full items-center justify-between px-6 py-4 mb-8 relative bg-foundation-bluenormal rounded-[25px]"
      role="banner"
      aria-label="نظام النقاط والتقدم"
    >
      <img
        className="absolute top-1.5 inset-0 w-full h-32"
        alt="خلفية زخرفية"
        src={"/images/rewards-store-pointes-header.png"}
        role="presentation"
      />

      <div
        className="inline-flex items-center gap-6 relative flex-[0_0_auto] ml-[-1285px]"
        role="region"
        aria-labelledby="current-points"
      >

        <img
          className="relative w-[56.58px] h-[70.63px]"
          alt="أيقونة الجوائز والإنجازات"
          src={"/images/wallet.png"}
        />
        <div className="flex flex-col w-[182px] items-center relative">
          <h3
            id="current-points"
            className="mt-[-1.00px]  font-normal text-2xl text-left [direction:rtl] relative flex items-center justify-center self-stretch text-white tracking-[0] leading-[normal]"
          >
            رصيد نقاطك الحالي
          </h3>

          <div
            className=" font-bold text-[32px] text-center relative flex items-center justify-center self-stretch text-white tracking-[0] leading-[normal]"
            role="status"
            aria-label={`رصيدك الحالي ${progressData.currentPoints} نقطة`}
          >
            {progressData.currentPoints.toLocaleString()}
          </div>
        </div>
      </div>

      <div
        className="flex flex-col w-[387px] items-start justify-center gap-3.5 px-4 py-0 relative self-stretch  rounded-[15px]"
        role="region"
        aria-labelledby="progress-title"
      >
        <h2
          id="progress-title"
          className="relative   font-bold text-white text-base leading-[normal] [direction:rtl]"
        >
          تقدمك للمستوى التالي
        </h2>

        <div
          className="relative flex !items-start !justify-start self-stretch w-full h-3.5 bg-white rounded-full overflow-hidden rotate-180"
          role="progressbar"
          aria-valuenow={progressData.progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`تقدم ${progressData.progressPercentage}% نحو المستوى التالي`}
        >
          <div
            className="relative !ml-auto  w-[326px] h-3.5 rounded-[15px] bg-[linear-gradient(270deg,rgba(244,166,37,1)_0%,rgba(249,115,22,1)_100%)]"
            style={{ width: `${progressData.progressPercentage}%` }}
          />
        </div>

        <p
          className="relative  text-white text-sm leading-5 [direction:rtl]"
          role="status"
          aria-live="polite"
        >
          تحتاج إلى {progressData.requiredPoints} نقطة لتنتقل إلى المستوى{" "}
          {progressData.nextLevel}
        </p>
      </div>
    </section>
  );
};
