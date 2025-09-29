import React from "react";
import { CoursRateCard } from "../ui/Cards/CoursRateCard";

const CourseRatings = () => {
  return (
    <div className="flex flex-col items-start gap-8">
      <div className="text-right justify-center text-primary text-3xl font-bold ">
        تقييمات : 4.5 (1450)
      </div>

      <div className="flex flex-col items-start gap-6">
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
