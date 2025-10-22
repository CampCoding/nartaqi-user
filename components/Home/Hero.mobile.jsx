"use client";

import React, { useRef, useState } from "react";
import Container from "../ui/Container";
// import frame1 from "./frame-1.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Play } from "lucide-react";

export const MobileHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

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
            {/* Creative video slide with CTA */}
            <SwiperSlide className="w-full">
              <article
                style={{
                  backgroundImage: "url('/images/Header, hero 9.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "50% 30%",
                  backgroundRepeat: "no-repeat",
                  flex: 1,
                  color: "var(--color-bg)",
                }}
                className="flex flex-col w-full h-[148px] items-start gap-2.5 p-4 relative rounded-[25px] overflow-hidden bg-[linear-gradient(270deg,rgba(21,46,86,0.9)_0%,rgba(0,0,0,0.45)_100%)]"
                aria-label="شريحة فيديو تعريفية"
              >
                {/* Decorative blobs */}
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-secondary/30 blur-2xl rounded-full" />
                <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-primary/30 blur-2xl rounded-full" />

                <div className="flex flex-col items-start justify-center gap-3 relative w-full">
                  <h2 className=" text-white text-base font-bold [direction:rtl]">
                    جولة سريعة في منصتنا
                  </h2>
                  <p className=" text-[12px] text-[#e9edf4] leading-[var(--cairo-regular-xs-line-height)] [direction:rtl]">
                    شاهد أهم المزايا خلال 60 ثانية.
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={openVideo}
                      aria-label="مشاهدة الفيديو"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[16px] bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold shadow-md active:scale-95 transition"
                    >
                      {/* Play icon */}
                      <button
                        onClick={openVideo}
                        aria-label="تشغيل الفيديو"
                        className="  w-8 h-8 p-2  flex items-center justify-center rounded-full bg-white/90 text-primary shadow-lg backdrop-blur"
                      >
                        <span className="relative p-1">
                          <span className="absolute -inset-2 rounded-full ring-1 ring-white/60 animate-ping" />
                         <Play className="w-5 h-5 " />
                        </span>
                      </button>{" "}
                      مشاهدة الفيديو
                    </button>
                  </div>
                </div>

                {/* Center floating play button with ripple */}
              </article>
            </SwiperSlide>
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

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={closeVideo} />
          <div className="relative z-10 w-[94%] max-w-[640px] rounded-2xl overflow-hidden shadow-2xl bg-black">
            <button
              onClick={closeVideo}
              aria-label="إغلاق الفيديو"
              className="absolute top-3 left-3 z-20 w-9 h-9 rounded-full bg-white/90 text-text flex items-center justify-center"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.3 19.71 2.89 18.3 9.17 12 2.89 5.71 4.3 4.29 10.59 10.6 16.89 4.29z" />
              </svg>
            </button>
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
    </Container>
  );
};
