"use client";

import { VideoIcon, X, Play } from "lucide-react";
import React, { useState } from "react";
import { detectVideoType } from "../../../lib/parseVideoLink";
import VideoPlayer from "../Video";
// import VideoPlayer from "../VideoPlayer"; // عدّل المسار حسب مكان الملف

export const StudentResultCard = ({ item, onOpenImages }) => {
  const title = item?.title || "نتيجة طالب";
  const image = item?.image_url || "/images/resultImage.png";
  const videoLink = item?.video_link || "";
  const canOpen = !!videoLink;

  const [showVideo, setShowVideo] = useState(false);

  // استخراج نوع الفيديو والـ ID
  const { link, type } = detectVideoType(videoLink);

  const handlePlayVideo = (e) => {
    e.stopPropagation();
    if (!canOpen) return;
    setShowVideo(true);
  };

  const handleCloseVideo = (e) => {
    e.stopPropagation();
    setShowVideo(false);
  };

  const handleCardClick = () => {
    if (!showVideo) {
      onOpenImages?.();
    }
  };

  return (
    <main
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleCardClick();
      }}
      className="flex flex-col w-full items-start gap-6 py-4 px-4 relative rounded-[35px] border-[4px] md:border-[5px] border-solid cursor-pointer hover:shadow-md transition"
    >
      {/* Image/Video Container */}
      <div className="relative self-stretch w-full min-h-[200px] rounded-xl overflow-hidden bg-neutral-100">
        {showVideo ? (
          <div className="relative w-full h-full">
            {/* Close Button */}
            <button
              onClick={handleCloseVideo}
              className="absolute top-2 right-2 z-30 w-8 h-8 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="إغلاق الفيديو"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Video Player */}
            <VideoPlayer
              vimeo_id={type === "vimeo" ? link : ""}
              youtube_id={type === "youtube" ? link : ""}
              defaultPlay={true}
              rootClassName="rounded-xl overflow-hidden h-full"
            />
          </div>
        ) : (
          <>
            {/* Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              loading="lazy"
              className="w-full h-[200px] object-cover"
              alt={title}
              src={image}
            />
          </>
        )}
      </div>

      {/* Button */}
      <button
        className={`flex items-center text-white justify-center gap-2.5 px-2 py-3 md:py-3 relative self-stretch w-full flex-[0_0_auto] rounded-[15px] md:rounded-[19px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 ${
          canOpen
            ? showVideo
              ? "bg-red-500 hover:bg-red-600"
              : "bg-primary hover:opacity-90"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        type="button"
        disabled={!canOpen}
        onClick={(e) => {
          e.stopPropagation();
          if (!canOpen) return;
          setShowVideo(!showVideo);
        }}
      >
        {showVideo ? (
          <>
            <X className="w-5 h-5" />
            <span className="text-sm lg:text-base font-semibold">
              إغلاق الفيديو
            </span>
          </>
        ) : (
          <>
            <VideoIcon />
            <span className="text-sm lg:text-base font-semibold">
              {canOpen ? "توثيق الدرجة بالفيديو" : "لا يوجد رابط توثيق"}
            </span>
          </>
        )}
      </button>
    </main>
  );
};
