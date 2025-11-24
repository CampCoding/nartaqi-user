import React from "react";
import { CoursRateCard } from "../ui/Cards/CoursRateCard";
// import { CoursRateCard } from "@/ui/Cards/CoursRateCard";

const CourseRatings = ({ courseData }) => {
  const { roundRate } = courseData;

  // حساب متوسط التقييم
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
    <div className="flex flex-col items-start gap-6 lg:gap-8">
      <div className="text-right justify-center text-primary text-xl md:text-2xl font-bold">
        تقييمات : {average} ({count})
      </div>

      {roundRate && roundRate.length > 0 ? (
        <div className="flex w-full flex-col items-start gap-4 lg:gap-6">
          {roundRate.map((rating) => (
            <CoursRateCard key={rating.id} rating={rating} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 w-full bg-gray-50 rounded-lg">
          <p className="text-text-alt text-lg">لا توجد تقييمات حتى الآن</p>
        </div>
      )}
    </div>
  );
};

export default CourseRatings;
