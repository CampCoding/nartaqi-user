"use client";

import React, { useMemo, useRef, useState } from "react";
import { ListCheck, SupportIcon } from "../../public/svgs";
import Link from "@/components/ui/NavLink";
import Container from "../ui/Container";

export const AboutUs = ({
  showCTA = true,
  youtubeId = "dQw4w9WgXcQ",
  mp4Src = "",
  placeholderImage = "/images/Frame 32.png",
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const hasYoutube = !!youtubeId;
  const hasMp4 = !!mp4Src;

  const youtubeSrc = useMemo(() => {
    if (!hasYoutube || !isPlaying) return "";
    return `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&playsinline=1&controls=1&rel=0&modestbranding=1`;
  }, [hasYoutube, youtubeId, isPlaying]);

  const handlePlayClick = async () => {
    if (hasMp4) {
      setIsPlaying(true);
      requestAnimationFrame(async () => {
        const v = videoRef.current;
        if (!v) return;
        try {
          v.playsInline = true;
          await v.play();
        } catch { }
      });
      return;
    }

    if (hasYoutube) {
      setIsPlaying(true);
    }
  };

  const handleStopMp4 = () => {
    const v = videoRef.current;
    if (v) v.pause();
    setIsPlaying(false);
  };

  return (
    <Container className="py-6 sm:py-8 md:py-10 lg:py-[48px] relative bg-bg overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-4">
      <div className="w-full lg:w-[656px]">
        {/* Badge */}
        <div className="inline-flex items-start justify-end gap-2.5 px-8 sm:px-10 md:px-14 py-2.5 sm:py-3 relative bg-primary-light rounded-[12px] sm:rounded-[15px]">
          <div className="relative flex items-center justify-center w-fit mt-[-1.00px] font-bold text-primary-dark text-base sm:text-lg md:text-xl text-left leading-7 sm:leading-8 whitespace-nowrap">
            نبذه عنا
          </div>
        </div>

        {/* Title */}
        <div className="self-stretch mt-5 sm:mt-7 md:mt-[32px] text-right justify-center">
          <span className="text-secondary text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold capitalize leading-8 sm:leading-9 md:leading-[44px] lg:leading-[50px]">
            منصة نرتقي
          </span>
          <span className="text-text text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold capitalize leading-7 sm:leading-8 md:leading-[44px] lg:leading-[50px]">
            {" "}
            – شريكك الدائم في رحلة التعلم، تطوير المهارات، وبناء مستقبل مليء
            بالنجاح
          </span>
        </div>

        {/* Description */}
        <p className="self-stretch mt-3 sm:mt-4 md:mt-[16px] text-right justify-center text-text-light text-xs sm:text-sm md:text-base font-medium leading-5 sm:leading-6 md:leading-7">
          نَرْتَقِي هي بيئتكم التعليمية الرقمية المتكاملة، تجمع بين الدورات
          التدريبية، والبث المباشر، والامتحانات، ومكتبة الكتب، مع دعم كامل
          للطلاب والمعلمين. مهمتنا هي تزويدكم بالأدوات والمعرفة اللازمة لتطوير
          مهاراتكم وتحقيق أهدافكم، في أي وقت ومن أي مكان.
        </p>

        {/* Features */}
        <div className="flex flex-col sm:flex-row items-start sm:justify-between mt-6 sm:mt-7 md:mt-[32px] gap-3 sm:gap-4 md:gap-0">
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex items-center gap-1.5 sm:gap-1">
              <ListCheck className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <div className="justify-center text-text text-xs sm:text-sm font-normal leading-loose">
                تعلم بلا حدود
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-1">
              <ListCheck className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <div className="justify-center text-text text-xs sm:text-sm font-normal leading-loose">
                محتوى تدريبي متنوع وعالي الجودة
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex items-center gap-1.5 sm:gap-1">
              <ListCheck className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <div className="justify-center text-text text-xs sm:text-sm font-normal leading-loose">
                دعم واستشارة على مدار الساعة طوال أيام الأسبوع
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-1">
              <ListCheck className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <div className="justify-center text-text text-xs sm:text-sm font-normal leading-loose">
                تتبع تقدمك في الوقت الحقيقي{" "}
              </div>
            </div>
          </div>
        </div>

        {/* CTA + Contact */}
        <div className="mt-6 sm:mt-7 md:mt-[32px] flex flex-col sm:flex-row items-start sm:justify-between justify-center gap-5 sm:gap-4 md:gap-0">
          {showCTA && (
            <Link href={"/about-us"} className="w-full sm:w-auto sm:flex-1">
              <div className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 px-8 md:px-10 lg:px-12 py-3.5 sm:py-4 md:py-5 relative rounded-[16px] md:rounded-[20px] bg-gradient-to-r from-primary to-secondary">
                <div className="relative flex items-center justify-center w-fit mt-[-1.00px] font-bold text-bg text-sm md:text-base text-left leading-5 whitespace-nowrap">
                  اكتشف المزيد
                </div>
              </div>
            </Link>
          )}

          <div className="flex items-center w-full sm:w-auto sm:flex-1 gap-2 sm:gap-[9px]">
            <SupportIcon className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex-shrink-0" />
            <div className="self-stretch inline-flex flex-col justify-center items-end gap-2 sm:gap-3 md:gap-3.5">
              <div className="self-stretch text-right justify-center text-primary-dark text-xs sm:text-sm font-bold">
                اتصل الآن
              </div>
              <div
                dir="ltr"
                className="justify-center text-secondary text-sm sm:text-base font-bold font-inter"
              >
                +966 011 1234 567
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side media */}
      <div className="hidden md:block justify-center w-full lg:w-auto">
        <div className="relative w-full md:w-[480px] lg:w-[560px] xl:w-[620px] aspect-video rounded-2xl md:rounded-3xl overflow-hidden">
          <img
            loading="lazy"
            src={placeholderImage}
            alt="About Us"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {!isPlaying && (hasMp4 || hasYoutube) && (
            <button
              type="button"
              onClick={handlePlayClick}
              className="absolute inset-0 grid place-items-center bg-black/20 hover:bg-black/30 transition"
              aria-label="تشغيل الفيديو"
            >
              <span className="grid place-items-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/90">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="md:w-7 md:h-7">
                  <path d="M8 5v14l11-7-11-7z" fill="currentColor" />
                </svg>
              </span>
            </button>
          )}

          {hasMp4 && isPlaying ? (
            <div className="absolute inset-0">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src={mp4Src}
                controls
                playsInline
                preload="metadata"
              />
              <button
                type="button"
                onClick={handleStopMp4}
                className="absolute top-2 md:top-3 right-2 md:right-3 px-2.5 md:px-3 py-1.5 md:py-2 rounded-lg md:rounded-xl bg-black/60 text-white text-[11px] md:text-xs font-bold"
              >
                إيقاف
              </button>
            </div>
          ) : null}

          {!hasMp4 && hasYoutube && isPlaying ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={youtubeSrc}
              title="About Video"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : null}
        </div>
      </div>
    </Container>
  );
};