"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import CourseTitle from "../../../components/CourseDetailsPage/CourseTitle";
import TeacherTopData from "../../../components/TeachrerOverviewPage/TeacherTopData";
import TeacherFunFacts from "../../../components/TeachrerOverviewPage/TeacherFunFacts";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode, Mousewheel, Navigation } from "swiper/modules";

import CourseCard from "../../../components/ui/Cards/CourseCard";
import Container from "../../../components/ui/Container";

import useTeacherData from "./../../../components/shared/Hooks/useTeacherData";

const TecherOverviewPage = () => {
  const searchParams = useSearchParams();
  const teacherId = searchParams.get("teacherId") || "2"; // default

  // لو عندك token في redux
  const { token } = useSelector((state) => state.auth);

  const { teacher, rounds, loading, error } = useTeacherData({
    teacherId,
    token,
  });

  // ✅ حول rounds لصيغة CourseCard اللي عندك
  const CoursesCategoryCardData = useMemo(() => {
    return (rounds || []).map((r) => ({
      ...r,
    }));
  }, [rounds]);

  return (
    <Container className="">
      <div className="flex flex-col gap-[48px]">
        <CourseTitle title="نبذه عن المدرب" breadcrumbs={null} />

        {/* ✅ Loading / Error / Content */}
        {loading ? (
          <TeacherOverviewSkeleton />
        ) : error ? (
          <div className="text-right text-red-600">{error}</div>
        ) : (
          <>
            <TeacherTopData teacher={teacher} />
            <TeacherFunFacts teacher={teacher} rounds={rounds} />
          </>
        )}
      </div>

      <div className="mt-[56px] flex flex-col gap-[48px] mb-[260px]">
        <div className="self-stretch text-right justify-center text-secondary text-3xl font-bold">
          دورات المدرب
        </div>

        <div className="">
          {/* ✅ Courses Loading */}
          {loading ? (
            <CoursesRowSkeleton />
          ) : (
            <>
              <Swiper
                slidesPerView="auto"
                spaceBetween={24}
                freeMode={{
                  enabled: true,
                  momentum: true,
                  momentumBounce: true,
                }}
                mousewheel={{ forceToAxis: true }}
                navigation={{
                  prevEl: ".swiper-button-prev",
                  nextEl: ".swiper-button-next",
                }}
                modules={[FreeMode, Mousewheel, Navigation]}
                className="w-full relative pb-8"
              >
                {CoursesCategoryCardData?.map((item, index) => (
                  <SwiperSlide key={index} className="!w-fit">
                    <CourseCard payload={item} color={"#3B82F6"} />
                  </SwiperSlide>
                ))}
              </Swiper>

              {!error && CoursesCategoryCardData?.length === 0 && (
                <div className="text-right text-text-alt mt-4">
                  لا توجد دورات لهذا المدرب حاليًا.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default TecherOverviewPage;

/* =========================
   ✅ Skeleton Components
========================= */

const TeacherOverviewSkeleton = () => {
  return (
    <div className="flex flex-col gap-[48px]">
      {/* Teacher card skeleton */}
      <div className="flex justify-between items-center rounded-[20px] p-3 bg-gray-50 border border-gray-100">
        <div className="flex justify-end items-center gap-[8px]">
          <div className="w-11 h-11 rounded-full bg-gray-200 animate-pulse" />
          <div className="flex flex-col gap-2">
            <div className="h-5 w-40 rounded-lg bg-gray-200 animate-pulse" />
            <div className="h-4 w-56 rounded-lg bg-gray-200 animate-pulse" />
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          <div className="h-5 w-24 rounded-lg bg-gray-200 animate-pulse" />
          <div className="flex gap-2">
            <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
            <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
            <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Fun facts skeleton */}
      <div className="w-full rounded-[30px] bg-gray-200 animate-pulse h-[170px]" />

      {/* Description skeleton */}
      <div className="flex flex-col gap-3">
        <div className="h-4 w-full rounded bg-gray-200 animate-pulse" />
        <div className="h-4 w-[92%] rounded bg-gray-200 animate-pulse" />
        <div className="h-4 w-[80%] rounded bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
};

const CoursesRowSkeleton = () => {
  return (
    <div className="flex gap-4 overflow-hidden pb-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="w-[280px] h-[180px] rounded-2xl bg-gray-200 animate-pulse flex-shrink-0"
        />
      ))}
    </div>
  );
};
