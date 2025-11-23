"use client";
import React, { useEffect, useState } from "react";
import CourseCard from "@/components/ui/Cards/CourseCard";
import { useSelector } from "react-redux";
import { useGetUserFavorite } from "@/components/shared/Hooks/useGetUserFav";
import LoadingPage from "@/components/shared/Loading";
import NoContent from "@/components/shared/NoContent";
import { set } from "react-hook-form";

const MyFavourites = () => {
  const { token } = useSelector((state) => state.auth);

  const [isRegistered, useIsRegistered] = useState(!!token);

  // 👈 هنا مكان الـ Hook الصح
  const { data, isLoading } = useGetUserFavorite(token);

  // فلترة أو تجهيز الداتا لو محتاج
  const displayedCourses = data?.message || [];
  console.log(data?.message);

  if (isLoading) return <LoadingPage />;

  return (
    <div className="w-full">
      <h1 className="leading-normal h-12 sm:h-14 text-right text-text text-xl sm:text-2xl font-bold mb-6 sm:mb-[24px]">
        المفضلة
      </h1>

      {displayedCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-[32px] lg:gap-[42px] place-items-center">
          {displayedCourses.map((course) => {
            const payload = {
              id: course?.round.id,
              name: course.round.name,
              description: course?.round?.description,
              image_url: course?.round?.image_url,
              start_date: course.round.start_date,
              free: course?.round?.free,
              price: course?.round?.price,
              capacity: course?.round?.capacity,
              favorite: true,
              enrolled: true,
              course: {
                name: course?.round.category_part || "تكنولوجيا التعليم ",
              },
              teacher: [{ name }] || [],
              rating: course.round.rate || 0,
              totalRates: course.round.totalRate || 0,
            };

            return (
              <CourseCard
                key={course.id}
                isRegistered={isRegistered}
                course={course}
                payload={payload}
                freeWidth={true}
                type="0"
                buttonStyle=""
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center my-10 text-lg font-bold">
          <NoContent title="لا توجد دورات مفضلة لهذا الطالب" />
        </div>
      )}
    </div>
  );
};

export default MyFavourites;
