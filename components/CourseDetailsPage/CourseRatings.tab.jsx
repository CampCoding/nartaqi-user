import React from "react";
import { CoursRateCard } from "../ui/Cards/CoursRateCard";

const CourseRatings = () => {
  return (
    <div className="flex flex-col items-start gap-6 lg:gap-8">
      <div className="text-right justify-center text-primary text-xl md:text-2xl font-bold">
        تقييمات : 4.5 (1450)
      </div>

      <div className="flex w-full flex-col items-start gap-4 lg:gap-6">
        <CoursRateCard />
        <CoursRateCard />
        <CoursRateCard />
        <CoursRateCard />
        <CoursRateCard />
        <CoursRateCard />
        <CoursRateCard />
        <CoursRateCard />
        <CoursRateCard />
        <CoursRateCard />
      </div>
    </div>
  );
};

export default CourseRatings;
