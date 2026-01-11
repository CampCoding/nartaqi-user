import React from "react";
import Image from "next/image";

export const RewardsPointsHeader = () => {
  const progressData = {
    currentPoints: 1250,
    requiredPoints: 250,
    nextLevel: "الفضي",
    progressPercentage: 75,
  };

  return (
    <section
      dir="rtl"
      className="relative w-full overflow-hidden rounded-[25px] bg-primary  py-5 px-4 sm:px-6 md:px-8 md:py-6 mb-8"
      role="banner"
      aria-label="نظام النقاط والتقدم"
    >
      {/* Background Image (Already Responsive) */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/rewards-store-pointes-header.png"
          alt=""
          aria-hidden="true"
          fill
          priority={false}
          className="object-cover opacity-90"
        />
      </div>

      {/* Main Content Wrapper */}
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        
        {/* Current Points Section */}
        <div
          className="flex items-center gap-4 sm:gap-6"
          role="region"
          aria-labelledby="current-points"
        >
          <Image
            src="/images/wallet.png"
            width={56}
            height={71}
            alt="أيقونة المحفظة"
            className="shrink-0"
          />
          <div className="flex flex-col items-start">
            <h3
              id="current-points"
              className="text-white text-xl sm:text-2xl font-medium"
            >
              رصيد نقاطك الحالي
            </h3>
            <div
              className="text-white text-3xl sm:text-[32px] font-extrabold leading-tight"
              role="status"
              aria-label={`رصيدك الحالي ${progressData.currentPoints} نقطة`}
            >
              {progressData.currentPoints.toLocaleString("ar-EG")}
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div
          className="w-full md:max-w-md lg:max-w-lg"
          role="region"
          aria-labelledby="progress-title"
        >
          <h2
            id="progress-title"
            className="text-white text-base sm:text-lg font-bold mb-2"
          >
            تقدمك للمستوى التالي
          </h2>

          {/* Progress Bar */}
          <div
            className="relative flex h-3.5 w-full items-center rounded-full bg-white/80 overflow-hidden"
            role="progressbar"
            aria-valuenow={progressData.progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`تقدم ${progressData.progressPercentage}% نحو المستوى التالي`}
          >
            {/* The fill of the progress bar. `ml-auto` was removed. */}
            <div
              className="h-full bg-[linear-gradient(270deg,rgba(244,166,37,1)_0%,rgba(249,115,22,1)_100%)]"
              style={{ width: `${progressData.progressPercentage}%` }}
            />
          </div>

          <p className="mt-2 text-white text-sm leading-5" role="status" aria-live="polite">
            تحتاج إلى {progressData.requiredPoints.toLocaleString("ar-EG")} نقطة
            لتنتقل إلى المستوى {progressData.nextLevel}
          </p>
        </div>
      </div>
    </section>
  );
};