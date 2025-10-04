"use client";

import React from "react";
import PagesBanner from "../../components/ui/PagesBanner";
import CoursesFilters from "../../components/ui/CoursesFilters";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode, Mousewheel, Navigation } from "swiper/modules";
import CoursesCategoryCard from "../../components/ui/Cards/CoursesCategoryCard";
import CourseCard from "../../components/ui/Cards/CourseCard";
import Link from "next/link";

const FreeCourses = () => {
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
      <PagesBanner
        variant="normal"
        title={"الشروحات المجانية"}
        breadcrumb={[
          {
            title: "الرئيسية",
            link: "/",
          },
          {
            title: "الشروحات المجانية",
            link: "#",
          },
        ]}
        image={"/images/Frame 1000005155.png"}
      />

      <div className="mt-[32px] mb-[48px] container mx-auto max-w-[1312px]">
        <CoursesFilters />
      </div>

      <div className=" px-14 py-8 w-full rounded-3xl inline-flex justify-center items-center gap-2.5">
        <div className="justify-center text-secondary  text-4xl font-bold ">
          الفئات
        </div>
      </div>

      <Swiper
        slidesPerView="auto"
        spaceBetween={24}
        slidesOffsetBefore={64}
        centeredSlidesBounds
        centerInsufficientSlides
        slidesOffsetAfter={64}
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
        {[...CoursesCategoryCardData]?.map((item, index) => (
          <SwiperSlide key={index} className="!w-fit flex items-center ">
            <Link href={"/courses/123"}>
              <CoursesCategoryCard data={item} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Header */}
      <div className="container  mx-auto px-[64px] mb-[100px]">
        <div className="flex items-center justify-between mb-8  mt-[74px]">
          {/* العنوان */}
          <div className="flex w-[261px] items-center justify-center gap-2.5 px-14 py-8 relative rounded-[25px] bg-gradient-to-r from-primary to-secondary">
            <div className="relative flex items-center justify-center w-fit mt-[-1.00px] font-medium text-bg text-2xl text-left leading-5 whitespace-nowrap ">
              أحدث الدورات
            </div>
          </div>

          {/* زر عرض المزيد */}
          <div
            className="inline-flex items-center justify-center gap-2.5 px-8 py-5 relative bg-bg rounded-[25px] border-[none] 
                        before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-[25px] 
                        before:[background:linear-gradient(90deg,var(--color-primary)_0%,var(--color-secondary)_100%)] 
                        before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] 
                        before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none"
          >
            <div
              className="relative flex items-center justify-center w-fit mt-[-1.00px] 
                          bg-gradient-to-r from-primary to-secondary 
                          [-webkit-background-clip:text] bg-clip-text 
                          text-transparent font-semibold text-2xl text-left leading-8 whitespace-nowrap "
            >
              عرض المزيد
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-[48px] ">
          {[...CoursesCategoryCardData, ...CoursesCategoryCardData]?.map(
            (item, index) => (
              <CourseCard
                buttonStyle="!normal"
                freeWidth
                key={index}
                data={item}
                color="var(--color-primary)"
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default FreeCourses;
