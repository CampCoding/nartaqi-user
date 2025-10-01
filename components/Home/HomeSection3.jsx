"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode, Mousewheel, Navigation } from "swiper/modules";

import CoursesCategoryCard from "./../ui/Cards/CoursesCategoryCard";
import Link from "next/link";

const HomeSection3 = () => {
  const CoursesCategoryCardData = [
    {
      image: "/images/Frame 1000004851.png",
      title: "التكنولوجيا التعليمية",
      courses: 15,
    },
    {
      image: "/images/Frame 1000004852.png",
      title: " إدارة الفصل الدراسي",
      courses: 15,
    },
    {
      image: "/images/Frame 1000004849.png",
      title: " منهجيات التدريس",
      courses: 15,
    },
    {
      image: "/images/Frame 1000004851.png",
      title: "التكنولوجيا التعليمية",
      courses: 15,
    },
    {
      image: "/images/Frame 1000004852.png",
      title: " إدارة الفصل الدراسي",
      courses: 15,
    },
    {
      image: "/images/Frame 1000004849.png",
      title: " منهجيات التدريس",
      courses: 15,
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 container mx-auto px-[64px] mt-[74px]">
        {/* العنوان */}
        <div className="flex w-[261px] items-center justify-center gap-2.5 px-14 py-8 relative bg-warning rounded-[25px]">
          <div className="relative flex items-center justify-center w-fit mt-[-1.00px] font-medium text-secondary-light text-2xl text-left leading-5 whitespace-nowrap">
            دورات أخرى
          </div>
        </div>

        {/* زر عرض المزيد */}
        <div className="inline-flex items-center justify-center gap-2.5 px-8 py-5 relative bg-bg rounded-[25px] border border-solid border-warning">
          <div className="relative flex items-center justify-center w-fit mt-[-1.00px] font-semibold text-warning text-2xl text-left leading-8 whitespace-nowrap ">
            عرض المزيد
          </div>
        </div>
      </div>

      {/* السلايدر */}
      <div className="mr-[64px]">
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
              <Link href={"/courses/123"}>
                <CoursesCategoryCard data={item} color="var(--color-warning)" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeSection3;
