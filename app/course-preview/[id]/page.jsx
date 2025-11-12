"use client";

import React, { useEffect, useState } from "react";
import CourseTitle from "../../../components/CourseDetailsPage/CourseTitle";
import CourseDetailsContent from "../../../components/CourseDetailsPage/CourseDetailsContent";
import Container from "../../../components/ui/Container";
import MobileCoursePreview from "../../../components/CourseDetailsPage/MobileCoursePreview";
import VideoPlayer from "./../../../components/ui/Video";
import useIsLgUp from "../../../hooks/useLgUp";



const CoursePreviewPage = () => {
  const [isLessonStart, setIsLessonStart] = useState(false);
  const isLgUp = useIsLgUp();

  return (
    <>
      {/* MOBILE / TABLET: < lg */}
      {!isLgUp && (
        <div className="space-y-4">
          {!isLessonStart && (
            <MobileCoursePreview onClick={() => setIsLessonStart(true)} />
          )}
          {isLessonStart && <VideoPlayer defaultPlay={true} />}

          <VideosList />
          <Container>
            <CourseDetailsContent />
          </Container>
        </div>
      )}

      {/* DESKTOP: >= lg */}
      {isLgUp && (
        <Container>
          <CourseTitle />
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div>
              {!isLessonStart && (
                <div
                  onClick={() => setIsLessonStart(true)}
                  className="cursor-pointer group flex-1 h-[300px] sm:h-[380px] lg:h-[455px] relative bg-black/20 rounded-[30px] overflow-hidden"
                >
                  <img
                    src="/images/Frame 1000004932.png"
                    className="w-full h-full object-cover object-top"
                    alt="صورة فيديو توضيحية"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent pointer-events-none z-10" />
                  <div
                    className="absolute z-20 cursor-pointer group-hover:scale-110 transition-all duration-300 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60 focus-visible:rounded-full"
                    role="button"
                    tabIndex={0}
                    aria-label="تشغيل الفيديو"
                  >
                    <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 p-5 bg-secondary rounded-[100px] outline outline-8 outline-offset-[-8px] outline-white inline-flex justify-center items-center gap-2.5 overflow-hidden">
                      <div className="w-12 h-12 relative">
                        <svg
                          width={48}
                          height={48}
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M13.5292 40.657C11.9864 41.595 10 40.4985 10 38.7084L10 10.2915C10 8.50162 11.9864 7.40494 13.5292 8.343L36.8981 22.5514C38.3673 23.4448 38.3673 25.5551 36.8981 26.4486L13.5292 40.657Z"
                            stroke="white"
                            strokeWidth={3}
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {isLessonStart && <VideoPlayer defaultPlay={true} />}

              <div className="grid grid-cols-1 my-8 mb-[139px]">
                <CourseDetailsContent />
              </div>
            </div>

            <VideosList />
          </div>
        </Container>
      )}
    </>
  );
};

export default CoursePreviewPage;

const VideoItem = ({
  idx,
  title,
  thumb = "/images/Frame 1000004932.png",
  duration = "1:25",
}) => (
  <div className="self-stretch inline-flex justify-between items-center gap-[9px]">
    <div className="text-right text-secondary text-xl md:text-2xl font-medium">
      {idx}
    </div>

    <div className="flex justify-start items-start gap-2 w-full">
      <div
        className="
          w-28 h-16 md:w-[174px] md:h-20
          relative rounded-[10px] overflow-hidden shrink-0
        "
        style={{
          backgroundImage: `url('${thumb}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-label={`مصغّر الفيديو ${idx}`}
        role="img"
      >
        <div className="px-2.5 absolute left-2 bottom-2 bg-zinc-800/80 rounded-[10px] inline-flex justify-center items-center">
          <div className="text-right text-white text-xs md:text-sm font-medium">
            {duration}
          </div>
        </div>
      </div>

      <div className="flex-1 text-right text-text text-xs md:text-sm font-medium leading-relaxed">
        {title}
      </div>
    </div>
  </div>
);

const VideosList = () => (
  <div
    className="
      w-full lg:max-w-[437px] lg:min-w-[437px]
      flex flex-col gap-6 md:gap-[32px]
      pt-6 md:pt-10 pb-4 md:pb-5 px-3 md:px-4
      relative bg-white rounded-[30px]
      lg:outline outline-[3px] outline-offset-[-3px] outline-gray-300
      overflow-hidden
    "
    dir="rtl"
    aria-label="قائمة الفيديوهات"
  >
    {/* Header */}
    <div className="inline-flex flex-col justify-start items-start gap-2">
      <div className="text-text text-2xl md:text-3xl font-bold">
        إتقان التدريس الفعال
      </div>
      <div className="inline-flex justify-start items-center gap-2">
        <div className="text-primary text-sm md:text-base font-bold">
          1 من 5
        </div>
        <div className="text-primary text-sm md:text-base font-bold">
          جون سميث
        </div>
      </div>
    </div>

    {/* List */}
    <div className="inline-flex flex-col justify-start items-start gap-3 md:gap-4">
      {[
        "أساسيات ومبادئ التدريس الفعّال لتحقيق نتائج مميزة داخل الصف",
        "أساليب إدارة الصف وبناء بيئة تعليمية محفزة",
        "تخطيط الدرس وتحديد مخرجات التعلم بوضوح",
        "التقويم البنائي وأدوات قياس التقدم",
        "التقنيات التعليمية ودعم التفاعل والمشاركة",
      ].map((t, i) => (
        <VideoItem key={i} idx={i + 1} title={t} />
      ))}
    </div>
  </div>
);
