"use client";

import React, { useRef } from "react";
import { HomeBannerArrowLeft } from "../../public/svgs";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Container from "../ui/Container";

export const HeaderHero = () => {
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
    <div className=" flex-1  flex items-center justify-center">
      <div
        style={{
          backgroundImage: "url('/images/Header, hero 9.png')",
          backgroundSize: "cover",
          backgroundPosition: "50% 30%",
          backgroundRepeat: "no-repeat",
          flex: 1,
          color: "var(--color-bg)",
        }}
        className=" w-full h-full pt-[48px] pb-[50px]  "
      >
        <Container className="flex items-end justify-between">
          <Swiper
            modules={[Autoplay]}
            onSwiper={(instance) => (swiperRef.current = instance)}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop
            style={{ width: "100%", height: "100%" }}
          >
            {Array.from({ length: 4 }).map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="select-none">
                    <div className="w-[714px] ">
                      <h1 className=" w-[714px] text-bold h-[154px] flex flex-col justify-center text-bg text-[40px] leading-[60px] overflow-hidden text-ellipsis ">
                        ابنِ مستقبلك مع أفضل الدورات{" "}
                        <span className="text-secondary font-bold">التعليمية</span>
                      </h1>
                    </div>
                    <p className=" w-[703px]   leading-normal  text-bg text-2xl overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] ">
                      انضم إلى آلاف المتعلمين واكتسب مهارات جديدة من خبراء
                      بارزين في مجالات متعددة، من خلال الدورات التدريبية المصممة
                      لإلهامك وتحديك وتحويل مستقبلك.
                    </p>

                    <button
                      className=" mt-[75px] inline-flex items-center justify-center gap-2 px-14 py-6 relative rounded-[20px] bg-gradient-to-r from-primary to-secondary cursor-pointer transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      type="button"
                      aria-label="اكتشف المزيد"
                      onClick={handleDiscoverMore}
                    >
                      <span className="relative [display:-webkit-box] font-bold items-center justify-center w-fit  text-bg text-base text-center leading-5 whitespace-nowrap overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical] ">
                        اكتشف المزيد
                      </span>
                    </button>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="relative z-20">
            <div
              className="w-[72px] group flex items-center justify-center h-[72px] relative bg-primary-light  hover:bg-primary rounded-[50px] transition-all hover:shadow-[0px_-8px_50px_0px_var(--color-primary)] cursor-pointer" 
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <HomeBannerArrowLeft className=" text-text group-hover:fill-white fill-text" />
            </div>

            <div
              className="w-[72px] group h-[72px] relative translate-x-[72px]   bg-primary-light hover:bg-primary rounded-[50px] backdrop-blur-lg flex items-center justify-center hover:shadow-[0px_-8px_50px_0px_var(--color-primary)] cursor-pointer "
              onClick={() => swiperRef.current?.slideNext()}
            >
              <div className="w-[72px] h-[72px] left-0 top-0  absolute rounded-full border-2 border-bg group-hover:border-primary transition-all duration-200" />
              <HomeBannerArrowLeft className="!rotate-180 text-text group-hover:fill-white fill-text" />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};
