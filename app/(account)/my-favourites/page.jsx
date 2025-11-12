import React from "react";
import CourseCard from "./../../../components/ui/Cards/CourseCard";

const MyFavourites = () => {
  return (
    <div className="w-full">
      <div className="leading-normal self-stretch h-12 sm:h-14 text-right justify-center text-text text-xl sm:text-2xl font-bold mb-6 sm:mb-[24px]">
        المفضلة
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-2 gap-4 sm:gap-x-[13.5px] sm:gap-y-[24px] place-items-center">
        <CourseCard freeWidth={true} isRegistered={true} isInFav={true} />
        <CourseCard freeWidth={true} isRegistered={true} isInFav={true} />
        <CourseCard freeWidth={true} isRegistered={true} isInFav={true} />
        <CourseCard freeWidth={true} isRegistered={true} isInFav={true} />
        <CourseCard freeWidth={true} isRegistered={true} isInFav={true} />
        <CourseCard freeWidth={true} isRegistered={true} isInFav={true} />
        <CourseCard freeWidth={true} isRegistered={true} isInFav={true} />
      </div>
    </div>
  );
};

export default MyFavourites;
