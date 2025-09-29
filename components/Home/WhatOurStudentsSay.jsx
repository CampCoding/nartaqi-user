"use client";

import React from "react";
import { TestimonialCard } from "../ui/Cards/TestimonialCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";


const WhatOurXSay = ({
  title = "ماذا يقول طلابنا",
  description = "اكتشف تجارب متعلمينا الذين قاموا بتحويل مهاراتهم ومساراتهم المهنية من خلال منصتنا. كل شهادة تعكس التأثير والجودة والقيمة التي نسعى لتقديمها في كل دورة.",
  bg="bg-[linear-gradient(178deg,rgba(255,255,255,1)_0%,rgba(240,246,255,1)_38%,rgba(194,216,252,1)_77%,rgba(255,255,255,1)_97%)]"
}) => {
  return (
    <div className={` ${bg}  pt-[32px] pb-[78px]`}>
      <section
        className="flex-col mx-auto font-bold w-[792px] gap-6 flex items-center relative "
        role="region"
        aria-labelledby="testimonials-heading"
      >
        <h1
          id="testimonials-heading"
          className="justify-center self-stretch mt-[-1.00px]  text-text text-[40px] text-center leading-[48px]  flex items-center relative"
        >
          {title}
        </h1>
        {
          description && <p className="text-text text-[20px] text-center leading-[30px]  flex items-center relative"></p>
        }
      </section>
      <div className="container mx-auto mt-[64px]">
        <Swiper
          modules={[FreeMode, Mousewheel, Navigation]}
          slidesOffsetBefore={64} // right padding (px)

          spaceBetween={30}
          slidesPerView={1}
          freeMode={{
            enabled: true,
            momentum: true,
            momentumBounce: true,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="w-full relative pb-8"
        >
          <SwiperSlide className="!w-fit">
            <TestimonialCard />
          </SwiperSlide>
          <SwiperSlide className="!w-fit">
            <TestimonialCard />
          </SwiperSlide>
          <SwiperSlide className="!w-fit">
            <TestimonialCard />
          </SwiperSlide>
          <SwiperSlide className="!w-fit">
            <TestimonialCard />
          </SwiperSlide>
          <SwiperSlide className="!w-fit">
            <TestimonialCard />
          </SwiperSlide>
        </Swiper>

        {/* Navigation buttons */}
        <div className="swiper-button-prev !text-[#1B3A6F] !w-12 !h-12 !mt-[-24px] !bg-white !rounded-full !shadow-lg hover:!bg-gray-50 transition-colors"></div>
        <div className="swiper-button-next !text-[#1B3A6F] !w-12 !h-12 !mt-[-24px] !bg-white !rounded-full !shadow-lg hover:!bg-gray-50 transition-colors"></div>

        {/* Pagination dots */}
        <div className="swiper-pagination !mt-8 !relative !bottom-0"></div>
      </div>
    </div>
  );
};

export default WhatOurXSay;
