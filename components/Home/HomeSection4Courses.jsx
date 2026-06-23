"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode, Mousewheel, Navigation } from "swiper/modules";

import CourseCard from "../ui/Cards/CourseCard";
import Link from "@/components/ui/NavLink";
import Container from "../ui/Container";

const HomeSection4Courses = ({ latestRounds = [] }) => {
  const fallbackData = [
    {
      id: 1,
      image_url: "/images/Frame 1000004851.png",
      name: "التكنولوجيا التعليمية",
      goal: "تعلم أساسيات التكنولوجيا في التعليم",
      start_date: "2024-02-15",
      free: "0",
      for: "Beginner",
      gender: "male",
      price: 99.99,
      course: { name: "مهارات التعليم والتدريس" },
      teacher: { name: "جون سميث", image_url: "/images/Image-24.png" },
    },
  ];

  const transformedData = latestRounds?.map((item) => ({
    ...item,
    id: item.id,
    name: item.name,
    goal: item.description,
    description: item.description,
    image_url: item.image_url,
    start_date: item.start_date,
    end_date: item.end_date,
    free: item.free,
    price: item.price,
    for: item.for,
    gender: item.gender,
    active: item.active,
    course_category_id: item.course_category_id,
    remainingSets: +item.capacity - +item.students_count,
    course: {
      name: item.course_categories?.name || "غير محدد",
      id: item.course_categories?.id,
      description: item.course_categories?.description,
      image_url: item.course_categories?.image_url,
    },
    teacher: Array.isArray(item.teacher)
      ? item.teacher.map((teacher) => ({
        name: teacher.name,
        image_url: teacher.image_url,
      }))
      : item.teacher && typeof item.teacher === "object"
        ? [{ name: item.teacher.name, image_url: item.teacher.image_url }]
        : [],
    is_favorite: item?.fav || false,
    enrolled: item.enrolled || false,
    teachers: item.teachers,
  }));

  const displayData =
    transformedData?.length > 0 ? transformedData : fallbackData;

  return (
    <Container
      id="latest-courses"
      className="mt-5 sm:mt-6 md:mt-12 lg:mt-[74px] scroll-mt-[134px]"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5 sm:mb-7 md:mb-8 gap-3 sm:gap-4">
        <div className="flex items-center justify-center gap-2.5 px-3 sm:px-5 md:px-10 lg:px-14 py-2.5 sm:py-3 md:py-6 lg:py-8 relative rounded-[12px] sm:rounded-[15px] md:rounded-[20px] lg:rounded-[25px] bg-gradient-to-r from-primary to-secondary min-w-[110px] sm:min-w-[140px] md:min-w-[200px] lg:min-w-[261px]">
          <div className="relative flex items-center justify-center w-fit mt-[-1.00px] font-medium text-bg text-xs sm:text-sm md:text-xl lg:text-2xl text-left leading-5 whitespace-nowrap">
            أحدث الدورات
          </div>
        </div>

        <div
          className="inline-flex items-center justify-center gap-2.5 relative bg-bg rounded-[12px] sm:rounded-[15px] md:rounded-[20px] lg:rounded-[25px] border-[none] 
                        before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-[12px] sm:before:rounded-[15px] md:before:rounded-[20px] lg:before:rounded-[25px] 
                        before:[background:linear-gradient(90deg,var(--color-primary)_0%,var(--color-secondary)_100%)] 
                        before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] 
                        before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none
                        transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-lg"
        >
          <Link
            href={"/courses/newest"}
            className="relative flex items-center justify-center w-fit mt-[-1.00px] 
            text-xs sm:text-sm md:text-lg lg:text-xl
                          bg-gradient-to-r from-primary to-secondary 
                          [-webkit-background-clip:text] bg-clip-text 
                          text-transparent font-semibold px-3 sm:px-4 md:px-6 lg:px-8 py-2.5 sm:py-3 md:py-4 lg:py-5 text-left whitespace-nowrap 
                          transition-all duration-200 group-hover:text-white group-hover:bg-none"
          >
            عرض المزيد
          </Link>
        </div>
      </div>

      {/* Slider */}
      <div>
        {displayData?.length > 0 ? (
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
            modules={[FreeMode, Mousewheel, Navigation]}
            className="w-full relative pb-6 sm:pb-8"
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 12,
                freeMode: false,
              },
              480: {
                slidesPerView: 1.5,
                spaceBetween: 14,
                freeMode: false,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
                freeMode: false,
              },
              768: {
                slidesPerView: 2.2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 3.6,
                spaceBetween: 28,
              },
            }}
          >
            {displayData.map((item) => (
              <SwiperSlide key={item.id}>
                <CourseCard
                  payload={item}
                  type={item.for || item.gender || "0"}
                  freeWidth
                  buttonStyle="normal"
                  isInFav={item.is_favorite || false}
                  isRegistered={item.enrolled || false}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-10 sm:py-12 text-gray-500 text-sm sm:text-base">
            لا توجد دورات متاحة حالياً
          </div>
        )}
      </div>
    </Container>
  );
};

export default HomeSection4Courses;