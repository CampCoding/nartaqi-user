"use client";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode, Mousewheel, Navigation, Autoplay } from "swiper/modules";

import CourseCard from "../ui/Cards/CourseCard";
import Link from "next/link";
import Container from "../ui/Container";

const HomeSection4Courses = ({ latestRounds = [] }) => {
  useEffect(() => {
    console.log(latestRounds, "latestRounds");
  }, [latestRounds]);

  // Fallback data if API doesn't return data
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
      course: {
        name: "مهارات التعليم والتدريس",
      },
      teacher: {
        name: "جون سميث",
        image_url: "/images/Image-24.png",
      },
    },
  ];
  console.log(latestRounds);

  const transformedData = latestRounds?.map((item) => ({
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
    // Transform course_categories to course
    course: {
      name: item.course_categories?.name || "غير محدد",
      id: item.course_categories?.id,
      description: item.course_categories?.description,
      image_url: item.course_categories?.image_url,
    },
    // Teacher data (already in correct format)
    teacher: Array.isArray(item.teacher)
      ? item.teacher.map((teacher) => ({
          name: teacher.name,
          image_url: teacher.image_url,
        }))
      : item.teacher && typeof item.teacher === "object"
      ? [
          {
            name: item.teacher.name,
            image_url: item.teacher.image_url,
          },
        ]
      : [],
    is_favorite: item?.fav || false,
    enrolled: item.enrolled || false,
    teachers: item.teachers,
  }));
  console.log(transformedData, "transformedData");

  // Use transformed data if available, otherwise use fallback
  const displayData =
    transformedData?.length > 0 ? transformedData : fallbackData;

  return (
    <Container className="mt-6 md:mt-[74px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        {/* العنوان */}
        <div className="flex md:w-[261px] items-center justify-center gap-2.5 px-4 py-3 md:px-14 md:py-8 relative rounded-[15px] md:rounded-[25px] bg-gradient-to-r from-primary to-secondary">
          <div className="relative flex items-center justify-center w-fit mt-[-1.00px] font-medium text-bg text-[12px] md:text-2xl text-left leading-5 whitespace-nowrap">
            أحدث الدورات
          </div>
        </div>

        {/* زر عرض المزيد */}
        <div
          className="inline-flex items-center justify-center gap-2.5 relative bg-bg rounded-[15px] md:rounded-[25px] border-[none] 
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
                          text-transparent font-semibold px-4 py-3 md:px-8 md:py-5 text-left whitespace-nowrap 
                          transition-all duration-200 group-hover:text-white group-hover:bg-none"
          >
            عرض المزيد
          </Link>
        </div>
      </div>

      {/* السلايدر */}
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
            className="w-full relative pb-8"
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 12,
                freeMode: false,
              },
              480: {
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
          <div className="text-center py-12 text-gray-500">
            لا توجد دورات متاحة حالياً
          </div>
        )}
      </div>
    </Container>
  );
};

export default HomeSection4Courses;
