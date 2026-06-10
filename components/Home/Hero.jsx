"use client";

import React, { useRef, useState } from "react";
import { HomeBannerArrowLeft } from "../../public/svgs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Container from "../ui/Container";
import { Play } from "lucide-react";

const FALLBACK_BG = "/images/Header, hero 9.png";

const getYouTubeId = (url) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
};

export const HeaderHero = ({ banners = [], videoUrl = null }) => {
  const swiperRef = useRef(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const currentBg =
    banners.length > 0
      ? banners[activeIndex % banners.length]?.image_url || FALLBACK_BG
      : FALLBACK_BG;

  const youtubeId = getYouTubeId(videoUrl);
  const slideCount = Math.max(banners.length, 1);

  const openVideo = () => {
    if (swiperRef.current?.autoplay?.stop) swiperRef.current.autoplay.stop();
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
    if (swiperRef.current?.autoplay?.start) swiperRef.current.autoplay.start();
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <div
        style={{
          backgroundImage: `url('${currentBg}')`,
          backgroundSize: "cover",
          backgroundPosition: "50% 30%",
          backgroundRepeat: "no-repeat",
          flex: 1,
          color: "var(--color-bg)",
        }}
        className="w-full min-h-[725px] relative"
      >
        {/* Swiper for cycling through banner images */}
        <div className="absolute inset-0">
          <Swiper
            modules={[Autoplay]}
            onSwiper={(instance) => (swiperRef.current = instance)}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            onRealIndexChange={(swiper) => setActiveIndex(swiper.realIndex)}
            loop={slideCount > 1}
            style={{ width: "100%", height: "100%" }}
          >
            {Array.from({ length: slideCount }).map((_, i) => (
              <SwiperSlide key={i} />
            ))}
          </Swiper>
        </div>

        {/* Play button */}
        {youtubeId && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10">
            <button
              onClick={openVideo}
              aria-label="مشاهدة الفيديو"
              type="button"
              className="inline-flex items-center justify-center gap-2 px-14 py-6 rounded-[20px] bg-gradient-to-r from-primary to-secondary text-white cursor-pointer transition-all duration-200 hover:opacity-90 shadow-2xl"
            >
              <Play className="w-5 h-5" />
              <span className="font-bold text-base whitespace-nowrap">مشاهدة الفيديو</span>
            </button>
          </div>
        )}

        {/* Navigation arrows */}
        <div className="absolute left-10 bottom-10 z-20">
          <div
            className="w-[72px] group flex items-center justify-center h-[72px] relative bg-primary-light hover:bg-primary rounded-[50px] transition-all hover:shadow-[0px_-8px_50px_0px_var(--color-primary)] cursor-pointer"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <HomeBannerArrowLeft className="text-text group-hover:fill-white fill-text" />
          </div>
          <div
            className="w-[72px] group h-[72px] relative translate-x-[72px] bg-primary-light hover:bg-primary rounded-[50px] backdrop-blur-lg flex items-center justify-center hover:shadow-[0px_-8px_50px_0px_var(--color-primary)] cursor-pointer"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <div className="w-[72px] h-[72px] left-0 top-0 absolute rounded-full border-2 border-bg group-hover:border-primary transition-all duration-200" />
            <HomeBannerArrowLeft className="!rotate-180 text-text group-hover:fill-white fill-text" />
          </div>
        </div>

        {/* Video Modal */}
        {isVideoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/70" onClick={closeVideo} />
            <div className="relative z-10 w-[92%] max-w-[1000px] rounded-2xl overflow-hidden shadow-2xl bg-black">
              <button
                onClick={closeVideo}
                aria-label="إغلاق الفيديو"
                className="absolute top-3 left-3 z-20 w-10 h-10 rounded-full bg-white/90 text-text flex items-center justify-center hover:scale-105 transition"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.3 19.71 2.89 18.3 9.17 12 2.89 5.71 4.3 4.29 10.59 10.6 16.89 4.29z" />
                </svg>
              </button>
              <div className="relative" style={{ paddingTop: "56.25%" }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
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
