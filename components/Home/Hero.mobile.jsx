"use client";

import React, { useRef, useState } from "react";
import Container from "../ui/Container";
// import frame1 from "./frame-1.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export const MobileHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: {
        white: "ابن مستقبلك مع أفضل الدورات ",
        orange: "التعليمية",
      },
      description:
        "انضم إلى آلاف المتعلمين واكتسب مهارات جديدة من خبراء بارزين في مجالات متعددة، من خلال الدورات التدريبية المصممة لإلهامك وتحديك وتحويل مستقبلك.",
    },
    {
      id: 2,
      title: {
        white: "ابن مستقبلك مع أفضل الدورات ",
        orange: "التعليمية",
      },
      description:
        "انضم إلى آلاف المتعلمين واكتسب مهارات جديدة من خبراء بارزين في مجالات متعددة، من خلال الدورات التدريبية المصممة لإلهامك وتحديك وتحويل مستقبلك.",
    },
    {
      id: 3,
      title: {
        white: "ابن مستقبلك مع أفضل الدورات ",
        orange: "التعليمية",
      },
      description:
        "انضم إلى آلاف المتعلمين واكتسب مهارات جديدة من خبراء بارزين في مجالات متعددة، من خلال الدورات التدريبية المصممة لإلهامك وتحديك وتحويل مستقبلك.",
    },
    {
      id: 4,
      title: {
        white: "ابن مستقبلك مع أفضل الدورات ",
        orange: "التعليمية",
      },
      description:
        "انضم إلى آلاف المتعلمين واكتسب مهارات جديدة من خبراء بارزين في مجالات متعددة، من خلال الدورات التدريبية المصممة لإلهامك وتحديك وتحويل مستقبلك.",
    },
  ];

  const handleSlideClick = (index) => {
    setCurrentSlide(index);
  };

  const swiperRef = useRef(null);

  // Handler for the "اكتشف المزيد" button to go to next slide
  const handleDiscoverMore = () => {
    if (
      swiperRef.current &&
      typeof swiperRef.current.slideNext === "function"
    ) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <Container
      className="flex flex-col w-full items-center gap-3 relative"
      aria-label="دورات تعليمية"
      role="region"
    >
      <div className="relative self-stretch w-full h-[148px]">
        <div className="inline-flex items-start w-full  justify-center gap-4 relative">
          <Swiper
            className=""
            spaceBetween={10}
            modules={[Autoplay, Pagination]}
            onSwiper={(instance) => (swiperRef.current = instance)}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop
            pagination={{
              clickable: true,
              el: ".custom-pagination", // نربطها بعنصر خارجي
            }}
            // style={{ width: "100%", height: "100%" }}
          >
            {slides.map((slide, index) => {
              return (
                <SwiperSlide key={index} className="w-full">
                  <article
                    style={{
                      backgroundImage: "url('/images/Header, hero 9.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "50% 30%",
                      backgroundRepeat: "no-repeat",
                      flex: 1,
                      color: "var(--color-bg)",
                    }}
                    key={slide.id}
                    className="flex flex-col w-full h-[148px]  items-start gap-2.5 p-4 relative rounded-[25px] overflow-hidden bg-[linear-gradient(270deg,rgba(21,46,86,0.9)_0%,rgba(0,0,0,0.45)_100%)]"
                    onClick={() => handleSlideClick(index)}
                    role="button"
                    tabIndex={0}
                    aria-label={`شريحة ${index + 1} من ${slides.length}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSlideClick(index);
                      }
                    }}
                  >
                    <div className="flex flex-col items-start justify-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
                      <h2 className=" text-white  mt-[-1.00px] text-base font-bolder  text-transparent  leading-[var(--cairo-bold-base-line-height)] relative   font-bold tracking-[var(--cairo-bold-base-letter-spacing)] [direction:rtl]">
                          {slide.title.white}
                        <span className="text-secondary font-cairo-bold-base   ">
                          {slide.title.orange}
                        </span>
                      </h2>
                      <p className="[display:-webkit-box]  text-[12px]  text-[#e9edf4]  leading-[var(--cairo-regular-xs-line-height)] overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical] relative items-center justify-center self-stretch tracking-[var(--cairo-regular-xs-letter-spacing)] [direction:rtl] ">
                        {slide.description}
                      </p>
                    </div>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      {/* ✅ Pagination container أسفل السلايدر */}
      <div className="custom-pagination flex justify-center m-0"></div>

      {/* تحسين المظهر */}
   
    </Container>
  );
};
