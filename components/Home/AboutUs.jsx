"use client";

import React, { useMemo, useRef, useState } from "react";
import { ListCheck, SupportIcon } from "../../public/svgs";
import Link from "next/link";
import Container from "../ui/Container";

export const AboutUs = ({
  showCTA = true,

  // ✅ Choose ONE of these:
  youtubeId = "dQw4w9WgXcQ", // set to "" / null to disable
  mp4Src = "", // e.g. "/videos/about.mp4"

  // ✅ Placeholder image
  placeholderImage = "/images/Frame 32.png",
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const hasYoutube = !!youtubeId;
  const hasMp4 = !!mp4Src;

  const youtubeSrc = useMemo(() => {
    if (!hasYoutube || !isPlaying) return "";
    // start playing only after click (autoplay=1 happens only after user gesture)
    return `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&playsinline=1&controls=1&rel=0&modestbranding=1`;
  }, [hasYoutube, youtubeId, isPlaying]);

  const handlePlayClick = async () => {
    // If MP4 exists => play it
    if (hasMp4) {
      setIsPlaying(true);

      // wait next tick so <video> is in DOM and ref is ready
      requestAnimationFrame(async () => {
        const v = videoRef.current;
        if (!v) return;
        try {
          v.playsInline = true;
          // muted optional: many sites want muted autoplay; but we're click-to-play, so you can keep sound
          // v.muted = false;
          await v.play();
        } catch {
          // ignore
        }
      });

      return;
    }

    // If YouTube exists => mount iframe and autoplay (after user click)
    if (hasYoutube) {
      setIsPlaying(true);
    }
  };

  // Optional: if you want click again to stop MP4 and show placeholder
  const handleStopMp4 = () => {
    const v = videoRef.current;
    if (v) v.pause();
    setIsPlaying(false);
  };

  return (
    <Container className="md:py-[48px] py-8 relative bg-bg overflow-hidden flex md:flex-row flex-col items-center justify-between md:gap-4 gap-8">
      <div className="md:w-[656px] w-full">
        <div className="inline-flex items-start justify-end gap-2.5 px-14 py-3 relative bg-primary-light rounded-[15px]">
          <div className="relative flex items-center justify-center w-fit mt-[-1.00px] font-bold text-primary-dark md:text-xl text-lg text-left leading-8 whitespace-nowrap">
            نبذه عنا
          </div>
        </div>

        <div className="self-stretch mt-[32px] text-right justify-center">
          <span className="text-secondary md:text-4xl text-2xl font-bold capitalize md:leading-[50px] leading-9">
            منصة نرتقي
          </span>
          <span className="text-text md:text-3xl text-xl font-bold capitalize md:leading-[50px] leading-8">
            {" "}
            – شريكك الدائم في رحلة التعلم، تطوير المهارات، وبناء مستقبل مليء
            بالنجاح
          </span>
        </div>

        <p className="self-stretch mt-[16px] text-right justify-center text-text-light md:text-base text-sm font-medium md:leading-7 leading-6">
          نَرْتَقِي هي بيئتكم التعليمية الرقمية المتكاملة، تجمع بين الدورات
          التدريبية، والبث المباشر، والامتحانات، ومكتبة الكتب، مع دعم كامل
          للطلاب والمعلمين. مهمتنا هي تزويدكم بالأدوات والمعرفة اللازمة لتطوير
          مهاراتكم وتحقيق أهدافكم، في أي وقت ومن أي مكان.
        </p>

        <div className="flex md:flex-row flex-col items-start md:justify-between justify-start mt-[32px] md:gap-0 gap-4">
          <div className="flex flex-col gap-[8px] flex-1">
            <div className="flex items-center gap-[4px]">
              <ListCheck />
              <div className="justify-center text-text md:text-sm text-xs font-normal leading-loose">
                تعلم بلا حدود
              </div>
            </div>
            <div className="flex items-center gap-[4px]">
              <ListCheck />
              <div className="justify-center text-text md:text-sm text-xs font-normal leading-loose">
                محتوى تدريبي متنوع وعالي الجودة
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[8px] flex-1">
            <div className="flex items-center gap-[4px]">
              <ListCheck />
              <div className="justify-center text-text md:text-sm text-xs font-normal leading-loose">
                دعم واستشارة على مدار الساعة طوال أيام الأسبوع
              </div>
            </div>
            <div className="flex items-center gap-[4px]">
              <ListCheck />
              <div className="justify-center text-text md:text-sm text-xs font-normal leading-loose">
                تتبع تقدمك في الوقت الحقيقي{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[32px] flex md:flex-row flex-col items-start md:justify-between justify-center md:gap-0 gap-6">
          {showCTA && (
            <Link href={"/about-us"} className="flex-1">
              <div className="inline-flex items-center justify-center gap-2.5 md:px-12 px-8 md:py-5 py-4 relative rounded-[20px] bg-gradient-to-r from-primary to-secondary">
                <div className="relative flex items-center justify-center w-fit mt-[-1.00px] font-bold text-bg md:text-base text-sm text-left leading-5 whitespace-nowrap">
                  اكتشف المزيد
                </div>
              </div>
            </Link>
          )}

          <div className="flex items-center flex-1 gap-[9px]">
            <SupportIcon className="md:w-auto w-12 h-12" />
            <div className="self-stretch inline-flex flex-col justify-center items-end gap-3.5">
              <div className="self-stretch text-right justify-center text-primary-dark md:text-sm text-xs font-bold">
                اتصل الآن
              </div>
              <div
                dir="ltr"
                className="justify-center text-secondary md:text-base text-base font-bold font-inter"
              >
                +966 011 1234 567
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Right side media */}
      <div className="md:block hidden justify-center w-full md:w-auto">
        <div className="relative md:w-[620px] w-full aspect-video rounded-3xl overflow-hidden">
          {/* Placeholder */}
          <img
            loading="lazy"
            src={placeholderImage}
            alt="About Us"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Click overlay (Play button) */}
          {!isPlaying && (hasMp4 || hasYoutube) && (
            <button
              type="button"
              onClick={handlePlayClick}
              className="absolute inset-0 grid place-items-center bg-black/20 hover:bg-black/30 transition"
              aria-label="تشغيل الفيديو"
            >
              <span className="grid place-items-center w-16 h-16 rounded-full bg-white/90">
                {/* simple play icon */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8 5v14l11-7-11-7z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </button>
          )}

          {/* MP4 (mounted only after click) */}
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
              {/* optional stop button */}
              <button
                type="button"
                onClick={handleStopMp4}
                className="absolute top-3 right-3 px-3 py-2 rounded-xl bg-black/60 text-white text-xs font-bold"
              >
                إيقاف
              </button>
            </div>
          ) : null}

          {/* YouTube (mounted only after click) */}
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
