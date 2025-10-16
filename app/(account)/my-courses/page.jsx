import React from "react";
import { MyActiveCourseCard } from "../../../components/ui/Cards/MyActiveCourseCard";
import { MyCompletedCourseCard } from "./../../../components/ui/Cards/MyCompletedCourseCard";

const MyCourses = () => {
  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-[32px] w-full">
      <AchievementRate />

      <div className="space-y-3 sm:space-y-4">
        <div className="self-stretch leading-normal text-right justify-center text-secondary text-xl sm:text-2xl md:text-3xl font-bold">
          الدورات النشطة
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-[19px]"
          style={{ justifyItems: "center" }}
        >
          {/* first row */}
          <MyActiveCourseCard />
          <MyActiveCourseCard />
          <MyActiveCourseCard />
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div className="self-stretch leading-normal text-right justify-center text-primary text-xl sm:text-2xl md:text-3xl font-bold">
          الدورات المكتملة
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-[19px]"
          style={{ justifyItems: "center" }}
        >
          {/* first row */}
          <MyCompletedCourseCard />
          <MyCompletedCourseCard />
          <MyCompletedCourseCard />
        </div>
      </div>
    </div>
  );
};

export default MyCourses;

export const AchievementRate = () => {
  const progressData = {
    percentage: 77,
    completedWidth: 438,
    totalWidth: 548,
    label: "معدل الإنجاز الكلي",
  };

  return (
    <div className="flex flex-col items-start md:items-center justify-between gap-4 md:gap-6 px-4 md:px-6 py-4 relative bg-primary-light rounded-[15px] w-full">
      <div
        className="text-text text-right relative flex items-center justify-center w-fit font-bold text-base tracking-[0] leading-[normal] flex-shrink-0"
        lang="ar"
      >
        {progressData.label}
      </div>

      <div className="inline-flex items-center gap-4 md:gap-6 relative flex-[0_0_auto] w-full md:w-auto">
        <div
          className="relative w-full md:w-[400px] lg:w-[548px] h-[18px] bg-primary-bg rounded-[50px] overflow-hidden"
          role="progressbar"
          aria-valuenow={progressData.percentage}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="Overall completion rate"
        >
          <div
            className="h-full bg-primary rounded-[50px] transition-all duration-300"
            style={{
              width: `${progressData.percentage}%`,
            }}
          />
        </div>

        <div
          className="text-primary relative flex items-center justify-center w-fit font-bold text-base tracking-[0] leading-[normal] flex-shrink-0"
          role="status"
          aria-label={`Progress: ${progressData.percentage} percent`}
        >
          %{progressData.percentage}
        </div>
      </div>
    </div>
  );
};
