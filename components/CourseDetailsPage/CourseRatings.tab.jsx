import React from "react";
import { CoursRateCard } from "../ui/Cards/CoursRateCard";
// import { CoursRateCard } from "@/ui/Cards/CoursRateCard";

const CourseRatings = ({ courseData }) => {
  const { roundRate } = courseData;

  const calculateAverageRating = () => {
    if (!roundRate || roundRate.length === 0) return { average: 0, count: 0 };

    const sum = roundRate.reduce((acc, curr) => acc + curr.rate, 0);
    return {
      average: (sum / roundRate.length).toFixed(1),
      count: roundRate.length,
    };
  };

  const { average, count } = calculateAverageRating();

  return (
    <div className="flex flex-col items-start gap-8 lg:gap-10">
      <div className="text-right justify-center text-primary text-2xl md:text-3xl font-bold">
        تقييمات : {average} ({count})
      </div>

      {roundRate && roundRate.length > 0 ? (
        <div className="flex w-full flex-col items-start gap-5 lg:gap-7">
          {roundRate.map((rating) => (
            <CoursRateCard key={rating.id} rating={rating} />
          ))}
        </div>
      ) : (
        <div className="text-center py-14 md:py-16 w-full bg-gray-50 rounded-2xl">
          <p className="text-text-alt text-base md:text-xl font-medium">
            لا توجد تقييمات حتى الآن
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseRatings;
