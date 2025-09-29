"use client";
import React from "react";
import CourseTitle from "../../../components/CourseDetailsPage/CourseTitle";

import TeacherTopData from "../../../components/TeachrerOverviewPage/TeacherTopData";
import TeacherFunFacts from "../../../components/TeachrerOverviewPage/TeacherFunFacts";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode, Mousewheel, Navigation } from "swiper/modules";

import CourseCard from "../../../components/ui/Cards/CourseCard";
const TecherOverviewPage = () => {
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
    <div className="container mx-auto px-[64px]">
      <div className="flex flex-col gap-[48px]">
        <CourseTitle title="نبذه عن المدرب" />
        <TeacherTopData />
        <TeacherFunFacts />
      </div>
      <div className="mt-[56px] flex flex-col gap-[48px] mb-[260px]">
        <div className="self-stretch text-right justify-center text-secondary text-3xl font-bold ">
          دورات المدرب{" "}
        </div>

        <div className="">
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
            className="w-full relative pb-8 "
          >
            {CoursesCategoryCardData?.map((item, index) => (
              <SwiperSlide key={index} className="!w-fit">
                <CourseCard data={item} color={"#3B82F6"} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default TecherOverviewPage;
