"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode, Mousewheel, Navigation } from "swiper/modules";

import CoursesCategoryCard from "./../ui/Cards/CoursesCategoryCard";
import Link from "next/link";
import Container from "../ui/Container";
import CoursesCategoryCardMobile from "../ui/Cards/CoursesCategoryCard.mobile";

const HomeSection1 = () => {
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
  ];

  return (
    <Container>
      {/* Header */}
      <div className="flex items-center justify-between mb-8   mt-6 md:mt-[74px]">
        <div className="flex md:w-[261px] items-center justify-center gap-2.5  px-4 py-3  md:px-14 md:py-8 relative bg-secondary rounded-[15px] md:rounded-[25px]">
          <div className="relative flex items-center justify-center w-fit mt-[-1.00px] font-medium text-secondary-light  text-[12px] md:text-2xl text-left leading-5 whitespace-nowrap ">
            الدورات العامة
          </div>
        </div>

        <div className="inline-flex items-center justify-center gap-2.5 px-4 py-3 md:px-8 md:py-5 relative bg-bg rounded-[15px] md:rounded-[25px] border border-solid border-secondary hover:bg-secondary hover:text-white group cursor-pointer transition-all duration-300 ease-in-out">
          <div className="relative flex items-center justify-center w-fit mt-[-1.00px] font-semibold group-hover:text-white text-secondary  text-[12px] md:text-xl text-left leading-5 whitespace-nowrap ">
            عرض المزيد
          </div>
        </div>
      </div>

      {/* سلايدر */}

      <div className=" gap-4  md:gap-6  grid grid-cols-2 md:grid-cols-4 ">
        {CoursesCategoryCardData?.map((item, index) => (
          <Link href={"/courses/123"} key={index}>
            <div className="md:block hidden">
              <CoursesCategoryCard
                color="secondary"
                data={item}
                freeWidth={true}
              />
            </div>
            <div className="block md:hidden">
              <CoursesCategoryCardMobile data={item} freeWidth={true} />
            </div>
          </Link>
        ))}
      </div>

      {/* <div className="mr-[64px]">
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
                <CoursesCategoryCard data={item} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}
    </Container>
  );
};

export default HomeSection1;
