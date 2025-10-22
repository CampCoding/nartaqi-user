"use client";

import React, { useRef, useState } from "react";
import { HomeBannerArrowLeft } from "../../public/svgs";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Container from "../ui/Container";
import { Play } from "lucide-react";

export const HeaderHero = () => {
  const swiperRef = useRef(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Handler for the "اكتشف المزيد" button to go to next slide
  const handleDiscoverMore = () => {
    if (
      swiperRef.current &&
      typeof swiperRef.current.slideNext === "function"
    ) {
      swiperRef.current.slideNext();
    }
  };

  const openVideo = () => {
    if (swiperRef.current?.autoplay?.stop) {
      swiperRef.current.autoplay.stop();
    }
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
    if (swiperRef.current?.autoplay?.start) {
      swiperRef.current.autoplay.start();
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
        <Container className="flex items-end justify-between relative">
          <Swiper
            modules={[Autoplay]}
            onSwiper={(instance) => (swiperRef.current = instance)}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop
            style={{ width: "100%", height: "100%" }}
          >
            {/* Primary Text Slide with CTA to open video */}
            <SwiperSlide>
              <div className="select-none">
                <div className="w-[714px] ">
                  <h1 className=" w-[714px] text-bold h-[154px] flex flex-col justify-center text-bg text-[40px] leading-[60px] overflow-hidden text-ellipsis ">
                    اكتشف منصتنا في دقيقة
                    <span className="text-secondary font-bold">شاهد الفيديو التعريفي</span>
                  </h1>
                </div>
                <p className=" w-[703px]   leading-normal  text-bg text-2xl overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] ">
                  نظرة عامة سريعة على المزايا والخصائص التي تقدمها منصتنا وكيف
                  تساعدك على التعلم والنمو بشكل أسرع وأسهل.
                </p>
                <div className="mt-[75px] flex items-center gap-4">
                  <button
                    className=" inline-flex items-center justify-center gap-2 px-14 py-6 relative rounded-[20px] bg-gradient-to-r from-primary to-secondary cursor-pointer transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    type="button"
                    aria-label="مشاهدة الفيديو"
                    onClick={openVideo}
                  >
                    <Play />
                    <span className="relative [display:-webkit-box] font-bold items-center justify-center w-fit  text-bg text-base text-center leading-5 whitespace-nowrap overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical] ">
                      مشاهدة الفيديو
                    </span>
                  </button>
                  <button
                    className=" inline-flex items-center justify-center gap-2 px-10 py-6 relative rounded-[20px] border-2 border-white/70 text-bg cursor-pointer transition-all duration-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    type="button"
                    aria-label="اكتشف المزيد"
                    onClick={handleDiscoverMore}
                  >
                    <span className="relative [display:-webkit-box] font-bold items-center justify-center w-fit  text-bg text-base text-center leading-5 whitespace-nowrap overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical] ">
                      اكتشف المزيد
                    </span>
                  </button>
                </div>
              </div>
            </SwiperSlide>

            {/* Existing Text Slides */}
            {Array.from({ length: 3 }).map((item, index) => (
              <SwiperSlide key={index}>
                <div className="select-none">
                  <div className="w-[714px] ">
                    <h1 className=" w-[714px] text-bold h-[154px] flex flex-col justify-center text-bg text-[40px] leading-[60px] overflow-hidden text-ellipsis ">
                      ابنِ مستقبلك مع أفضل الدورات{" "}
                      <span className="text-secondary font-bold">التعليمية</span>
                    </h1>
                  </div>
                  <p className=" w-[703px]   leading-normal  text-bg text-2xl overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] ">
                    انضم إلى آلاف المتعلمين واكتسب مهارات جديدة من خبراء بارزين في مجالات متعددة، من خلال الدورات التدريبية المصممة لإلهامك وتحديك وتحويل مستقبلك.
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
            ))}
          </Swiper>

          <div className="absolute left-20 z-20">
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

        {/* Video Modal */}
        {isVideoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/70" onClick={closeVideo} />
            <div className="relative z-10 w-[92%] max-w-[1000px] rounded-2xl overflow-hidden shadow-2xl bg-black">
              {/* Close button */}
              <button
                onClick={closeVideo}
                aria-label="إغلاق الفيديو"
                className="absolute top-3 left-3 z-20 w-10 h-10 rounded-full bg-white/90 text-text flex items-center justify-center hover:scale-105 transition"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.3 19.71 2.89 18.3 9.17 12 2.89 5.71 4.3 4.29 10.59 10.6 16.89 4.29z" />
                </svg>
              </button>
              {/* 16:9 container */}
              <div className="relative" style={{ paddingTop: "56.25%" }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/jmVflHiAEV4?autoplay=1&rel=0"
                  title="Intro video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
