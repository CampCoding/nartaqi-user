"use client";

import Link from "@/components/ui/NavLink";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ArrowIcon = () => (
  <div className="w-5 h-5 sm:w-6 sm:h-6 relative shrink-0">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <path
        d="M15.6634 5.83816C15.7701 5.94465 15.8547 6.07115 15.9125 6.2104C15.9703 6.34966 16 6.49894 16 6.6497C16 6.80046 15.9703 6.94974 15.9125 7.08899C15.8547 7.22825 15.7701 7.35474 15.6634 7.46124L11.197 11.9276L15.6634 16.3939C15.8786 16.6092 15.9995 16.9011 15.9995 17.2055C15.9995 17.5099 15.8786 17.8018 15.6634 18.017C15.4481 18.2322 15.1562 18.3532 14.8518 18.3532C14.5474 18.3532 14.2555 18.2322 14.0403 18.017L8.75664 12.7334C8.64992 12.6269 8.56526 12.5004 8.5075 12.3611C8.44973 12.2219 8.42 12.0726 8.42 11.9218C8.42 11.7711 8.44973 11.6218 8.5075 11.4825C8.56526 11.3433 8.64992 11.2168 8.75664 11.1103L14.0403 5.82664C14.4777 5.38922 15.2144 5.38922 15.6634 5.83816Z"
        fill="#FAFAFA"
      />
    </svg>
  </div>
);

const CourseTitle = ({
  title,
  breadcrumbs = [
    { title: "الرئيسية", link: "/" },
    { title: "دورات المعلمين", link: "/courses" },
    { title: "مهارات التعليم والتدريس", link: "/courses/teaching-skills" },
  ],
}) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 my-5 sm:my-6 md:my-8 lg:mt-[18px] lg:mb-12 flex items-center justify-center">
      <div className="inline-flex flex-col justify-start items-center gap-3 sm:gap-4 w-full">
        {/* Title */}
        <h1 className="text-center text-tertiary text-xl sm:text-2xl md:text-[28px] lg:text-[30px] font-bold leading-tight md:leading-snug lg:leading-loose px-2">
          {title || "إتقان التدريس الفعال - معلمين"}
        </h1>

        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <div className="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-none lg:w-auto px-3 sm:px-4 py-2 bg-secondary rounded-xl">
            <Swiper
              slidesPerView="auto"
              spaceBetween={6}
              className="!w-full"
            >
              {breadcrumbs?.map((crumb, idx) => (
                <SwiperSlide key={idx} className="!w-auto">
                  <div className="flex items-center">
                    <div
                      className={`whitespace-nowrap text-xs sm:text-sm md:text-base lg:text-lg leading-normal ${idx === 0
                          ? "font-bold text-text"
                          : "font-semibold text-white"
                        }`}
                    >
                      {crumb.title}
                    </div>
                    {idx < breadcrumbs.length - 1 && <ArrowIcon />}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CourseTitle;