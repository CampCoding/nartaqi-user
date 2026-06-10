"use client";

import React, { useRef, useState } from "react";
import Container from "../ui/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Play } from "lucide-react";

const FALLBACK_BG = "/images/Header, hero 9.png";

const getYouTubeId = (url) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
};

export const MobileHero = ({ banners = [], videoUrl = null }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const swiperRef = useRef(null);

  const getBg = (idx) => {
    if (!banners || banners.length === 0) return FALLBACK_BG;
    return banners[idx % banners.length]?.image_url || FALLBACK_BG;
  };

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
    <Container
      className="flex flex-col w-full items-center gap-3 relative"
      aria-label="دورات تعليمية"
      role="region"
    >
      <div className="relative self-stretch w-full h-[200px]">
        <Swiper
          spaceBetween={10}
          modules={[Autoplay, Pagination]}
          onSwiper={(instance) => (swiperRef.current = instance)}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop={slideCount > 1}
          pagination={{ clickable: true, el: ".custom-pagination" }}
          style={{ width: "100%", height: "100%" }}
        >
          {Array.from({ length: slideCount }).map((_, index) => (
            <SwiperSlide key={index} className="w-full">
              <div
                style={{
                  backgroundImage: `url('${getBg(index)}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "50% 30%",
                  backgroundRepeat: "no-repeat",
                }}
                className="w-full h-[200px] rounded-[25px] overflow-hidden relative"
              >
                {/* Play button on first slide */}
                {index === 0 && youtubeId && (
                  <button
                    onClick={openVideo}
                    aria-label="مشاهدة الفيديو"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 text-primary flex items-center justify-center shadow-lg"
                  >
                    <span className="absolute inset-0 rounded-full ring-1 ring-white/60 animate-ping" />
                    <Play className="w-6 h-6 ml-0.5" />
                  </button>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="custom-pagination flex justify-center m-0" />

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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
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
    </Container>
  );
};
