"use client";
import Link from "next/link";
import React from "react";

export const MyCompletedCourseCard = ({ course, studentId, token }) => {
  const courseData = {
    title: course?.name || "دورة تدريبية",
    imageUrl: course?.image_url || "/images/teacher-course-banner.png",
    id: course?.id,
    roundId: course?.round_id,
  };

  return (
    <article className="flex flex-col w-full items-start gap-2 pt-0 pb-8 px-0 relative bg-white rounded-[20px] border-2 sm:border-4 border-solid border-primary">
      <div
        className="relative self-stretch w-full h-[200px] rounded-[20px_20px_0px_0px] overflow-hidden"
        style={{
          backgroundImage: `url('${courseData.imageUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="flex flex-col items-center gap-8 px-4 py-0 relative self-stretch w-full">
        <div className="flex flex-col items-start gap-4 relative self-stretch w-full">
          <h2 className="font-bold text-text text-lg sm:text-xl md:text-2xl">
            {courseData.title}
          </h2>
          <div className="self-stretch text-center justify-center text-text-alt text-base font-medium">
            تم الإكمال
          </div>
        </div>

        <Buttons course={courseData} />
      </div>
    </article>
  );
};

export const Buttons = ({ course }) => {
  return (
    <div
      className="flex w-full items-start justify-between relative"
      role="tablist"
    >
      {/* ✅ تقييم => Link لصفحة التقييم */}
      <Link
        href={`/courses/${course.id}/rate-course`}
        role="tab"
        className="flex w-[130px] items-center justify-center gap-2.5 px-4 py-3 rounded-[10px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-primary-light border-2 border-primary hover:bg-blue-50 text-primary"
      >
        تقييم
      </Link>

      {/* مراجعة => Link */}
      <Link
        href={`/course/${course.id}?reg=true`}
        role="tab"
        className="flex w-[130px] items-center justify-center gap-2.5 px-4 py-3 rounded-[10px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-primary-light border-2 border-primary hover:bg-blue-50 text-primary"
      >
        مراجعة
      </Link>
    </div>
  );
};
