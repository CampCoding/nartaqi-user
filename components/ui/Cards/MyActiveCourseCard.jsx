"use client";
import Link from "next/link";
import React from "react";

export const MyActiveCourseCard = ({ course }) => {
  // Default values in case data is missing
  const courseData = {
    title: course?.name || "دورة تدريبية",
    progress: course?.progress || 0,
    progressLabel: "معدل الإنجاز",
    buttonText: "متابعة",
    imageUrl: course?.image_url || "/images/teacher-course-banner.png",
    id: course?.id,
  };

  return (
    <article
      className="flex flex-col w-full items-start gap-2 pt-0 pb-6 sm:pb-8 px-0 relative bg-white rounded-[15px] sm:rounded-[20px] border-2 sm:border-4 border-solid border-secondary"
      role="article"
      aria-label={`دورة ${courseData.title}`}
    >
      <div
        className="relative self-stretch w-full h-[160px] sm:h-[180px] md:h-[200px] rounded-[15px_15px_0px_0px] sm:rounded-[20px_20px_0px_0px] overflow-hidden"
        role="img"
        aria-label="صورة الدورة"
        style={{
          backgroundImage: `url('${courseData.imageUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="flex flex-col items-center gap-6 sm:gap-8 px-3 sm:px-4 py-0 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-3 sm:gap-4 relative self-stretch w-full flex-[0_0_auto]">
          <h2 className="font-bold text-text text-lg sm:text-xl md:text-2xl relative flex items-center justify-center tracking-[0] leading-[normal] [direction:rtl]">
            {courseData.title}
          </h2>

          <div className="flex flex-col items-start gap-3 sm:gap-4 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex h-5 items-start justify-between relative self-stretch w-full">
              <div className="inline-flex h-5 items-center relative flex-[0_0_auto]">
                <span className="text-text-duplicate text-left [direction:rtl] relative flex items-center justify-center self-stretch w-fit text-xs sm:text-sm leading-5 whitespace-nowrap">
                  {courseData.progressLabel}
                </span>
              </div>
              <div className="inline-flex h-5 items-center relative flex-[0_0_auto]">
                <span className="text-secondary font-bold relative flex items-center justify-center self-stretch w-fit text-xs sm:text-sm leading-5 whitespace-nowrap">
                  {courseData.progress}%
                </span>
              </div>
            </div>

            <div
              className="relative flex self-stretch w-full h-2 bg-zinc-100 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={courseData.progress}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label={`${courseData.progressLabel}: ${courseData.progress}%`}
            >
              <div
                className="relative h-2 bg-secondary rounded-lg transition-all duration-300"
                style={{ width: `${courseData.progress}%` }}
              />
            </div>
          </div>
        </div>

        <Link
          href={`/course/${courseData.id}?reg=true&done=false`}
          className="flex h-[45px] sm:h-[50px] items-center justify-center gap-2.5 px-3 sm:px-4 py-3 relative self-stretch w-full bg-secondary rounded-[8px] sm:rounded-[10px] shadow-[8px_8px_12px_#fdd4b7] sm:shadow-[11px_11px_15px_#fdd4b7] hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-all duration-200"
          type="button"
          aria-label={`${courseData.buttonText} دورة ${courseData.title}`}
        >
          <span className="w-fit font-semibold text-white text-sm sm:text-base text-left relative flex items-center justify-center tracking-[0] leading-[normal] [direction:rtl]">
            {courseData.buttonText}
          </span>
        </Link>
      </div>
    </article>
  );
};
