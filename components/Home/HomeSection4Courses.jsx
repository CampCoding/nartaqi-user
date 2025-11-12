"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode, Mousewheel, Navigation, Autoplay } from "swiper/modules";

import CoursesCategoryCard from "./../ui/Cards/CoursesCategoryCard";
import CourseCard from "../ui/Cards/CourseCard";
import Link from "next/link";
import Container from "../ui/Container";

const HomeSection4Courses = () => {
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
    <Container className=" mt-[74px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 ">
        {/* العنوان */}
        <div className="flex md:w-[261px] items-center justify-center gap-2.5  px-4 py-3  md:px-14 md:py-8  relative rounded-[15px] md:rounded-[25px] bg-gradient-to-r from-primary to-secondary">
          <div className="relative flex items-center justify-center w-fit mt-[-1.00px] font-medium text-bg text-[12px] md:text-2xl text-left leading-5 whitespace-nowrap ">
            أحدث الدورات
          </div>
        </div>

        {/* زر عرض المزيد */}
        <div
          className="inline-flex items-center justify-center gap-2.5 relative bg-bg rounded-[15px]  md:rounded-[25px] border-[none] 
                        before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-[15px] before:md:rounded-[25px] 
                        before:[background:linear-gradient(90deg,var(--color-primary)_0%,var(--color-secondary)_100%)] 
                        before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] 
                        before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none
                        transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-lg"
        >
          <Link
            href={"/courses/newest"}
            className="relative flex items-center justify-center w-fit mt-[-1.00px] 
            text-[12px] md:text-xl 
                          bg-gradient-to-r from-primary to-secondary 
                          [-webkit-background-clip:text] bg-clip-text 
                          text-transparent font-semibold px-4 py-3 md:px-8 md:py-5 text-left  whitespace-nowrap 
                          transition-all duration-200 group-hover:text-white group-hover:bg-none "
          >
            عرض المزيد
          </Link>
        </div>
      </div>

      {/* السلايدر */}
      <div className="">
        {/* <div className="  gap-[30px]  grid grid-cols-3 ">
          {CoursesCategoryCardData?.map((item, index) => (
              <CourseCard freeWidth data={item} color="var(--color-primary)" />
          ))}
        </div> */}

        <Swiper
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
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
          modules={[FreeMode, Mousewheel, Navigation, Autoplay]}
          className="w-full relative pb-8"
          breakpoints={{
            // ✅ الموبايل الصغير جدًا
            0: {
              slidesPerView: 1,
              spaceBetween: 12,
              freeMode: false,
            },
            // ✅ الموبايل المتوسط (أفقي أو أكبر قليلًا)
            480: {
              slidesPerView: 2,
              spaceBetween: 16,
              freeMode: false,
              
            },
            // ✅ التابلت
            768: {
              slidesPerView: 2.2,
              spaceBetween: 20,
            },
            // ✅ اللابتوب
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            // ✅ الشاشات الكبيرة (ديسكتوب)
            1280: {
              slidesPerView:3.6,
              spaceBetween: 28,
            },
          }}
        >
          {CoursesCategoryCardData?.map((item, index) => (
            <SwiperSlide key={index} className="">
              <CourseCard data={item} freeWidth color="var(--color-primary)" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
};

export default HomeSection4Courses;
