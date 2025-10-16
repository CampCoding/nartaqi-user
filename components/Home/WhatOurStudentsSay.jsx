"use client";

import React from "react";
import { TestimonialCard } from "../ui/Cards/TestimonialCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import Container from "../ui/Container";

const WhatOurXSay = ({
  title = "ماذا يقول طلابنا",
  description = "اكتشف تجارب متعلمينا الذين قاموا بتحويل مهاراتهم ومساراتهم المهنية من خلال منصتنا. كل شهادة تعكس التأثير والجودة والقيمة التي نسعى لتقديمها في كل دورة.",
  bg = "bg-[linear-gradient(178deg,rgba(255,255,255,1)_0%,rgba(240,246,255,1)_38%,rgba(194,216,252,1)_77%,rgba(255,255,255,1)_97%)]",
}) => {
  return (
    <div
      className={`${bg} pt-6 sm:pt-8 lg:pt-[32px] pb-6 sm:pb-8 md:pb-[78px] px-0 sm:px-0`}
    >
      <section
        className="flex-col mx-auto font-bold gap-4 sm:gap-6 flex items-center relative max-w-7xl"
        role="region"
        aria-labelledby="testimonials-heading"
      >
        <h1
          id="testimonials-heading"
          className="justify-center self-stretch mt-[-1.00px] text-text text-2xl sm:text-3xl md:text-[40px] text-center leading-8 sm:leading-10 md:leading-[48px] flex items-center relative px-4 sm:px-0"
        >
          {title}
        </h1>
        <div className="self-stretch text-center justify-center max-w-[792px] mx-auto text-text-alt text-base sm:text-lg lg:text-xl font-medium font-['Cairo'] leading-6 sm:leading-8 lg:leading-10 px-4 sm:px-6 lg:px-0">
          {description}
        </div>
      </section>

      <Container className="mt-6 sm:mt-8 md:mt-[56px] relative">
        <Swiper
          modules={[FreeMode, Mousewheel, Autoplay]}
          spaceBetween={16}
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
            // Mobile
            320: {
              slidesPerView: 1,
              spaceBetween: 16,
              freeMode: {
                enabled: true,
                momentum: true,
              },
            },
            // Small tablets
            640: {
              slidesPerView: 1.2,
              spaceBetween: 20,
              freeMode: {
                enabled: true,
                momentum: true,
              },
            },
            // Medium tablets
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
              freeMode: false,
            },
            // Large tablets
            960: {
              slidesPerView: 2.5,
              spaceBetween: 28,
              freeMode: false,
            },
            // Desktop
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 30,
              freeMode: false,
            },
            // Large desktop
            1280: {
              slidesPerView: 3,
              spaceBetween: 32,
              freeMode: false,
            },
          }}
          className="w-full relative pb-6 sm:pb-8"
        >
          <SwiperSlide className="h-auto">
            <TestimonialCard freeWidth />
          </SwiperSlide>
          <SwiperSlide className="h-auto">
            <TestimonialCard freeWidth />
          </SwiperSlide>
          <SwiperSlide className="h-auto">
            <TestimonialCard freeWidth />
          </SwiperSlide>
          <SwiperSlide className="h-auto">
            <TestimonialCard freeWidth />
          </SwiperSlide>
          <SwiperSlide className="h-auto">
            <TestimonialCard freeWidth />
          </SwiperSlide>
        </Swiper>
      </Container>
    </div>
  );
};

export default WhatOurXSay;
