import React from "react";
import { MyActiveCourseCard } from "../../../components/ui/Cards/MyActiveCourseCard";
import { MyCompletedCourseCard } from './../../../components/ui/Cards/MyCompletedCourseCard';

const MyCourses = () => {
  return (
    <div className="space-y-[32px]">
      <AchievementRate />

      <div className="space-y-4">
        <div className="self-stretch leading-normal text-right justify-center text-secondary text-3xl font-bold font-['Cairo']">
          الدورات النشطة
        </div>

        <div className="grid grid-cols-3 gap-[19px] " style={{
          justifyItems:"center"
        }}>
          {/* first row */}
          <MyActiveCourseCard />
          <MyActiveCourseCard />
          <MyActiveCourseCard />

        </div>
      </div>
      <div className="space-y-4">
        <div className="self-stretch leading-normal text-right justify-center text-primary text-3xl font-bold font-['Cairo']">
          الدورات المكتملة
        </div>

        <div className="grid grid-cols-3 gap-[19px] " style={{
          justifyItems:"center"
        }}>
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
    <div className="flex flex-1 items-center justify-between px-6 py-4 relative bg-primary-light rounded-[15px]">
      <div
        className="text-text text-left  relative flex items-center justify-center w-fit mt-[-1.00px]  font-bold text-base tracking-[0] leading-[normal]"
        lang="ar"
      >
        {progressData.label}
      </div>

      <div className="inline-flex items-center gap-6 relative flex-[0_0_auto]">
        <div
          className="relative w-[548px] h-[18px] bg-primary-bg rounded-[50px] overflow-hidden"
          role="progressbar"
          aria-valuenow={progressData.percentage}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="Overall completion rate"
        >
          <div
            className="w-[438px] h-[18px] mr-auto bg-primary rounded-[50px]"
            style={{
              width: `${
                (progressData.completedWidth / progressData.totalWidth) * 100
              }%`,
            }}
          />
        </div>
        <div
          className="text-primary relative flex items-center justify-center w-fit mt-[-1.00px]  font-bold text-base tracking-[0] leading-[normal]"
          role="status"
          aria-label={`Progress: ${progressData.percentage} percent`}
        >
          %{progressData.percentage}
        </div>
      </div>
    </div>
  );
};
