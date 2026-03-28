"use client";

import { VideoIcon } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { detectVideoType } from "../../../lib/parseVideoLink";

export const StudentResultCard = ({ item, onOpenImages }) => {
  const router = useRouter();

  const title = item?.title || "نتيجة طالب";
  const image = item?.image_url || "/images/resultImage.png";
  const videoLink = item?.video_link || "";

  // ✅ استخراج نوع الفيديو والـ Video ID
  const { videoId, type: videoType } = detectVideoType(videoLink);
  const canOpen = !!(
    (videoId && videoType === "youtube") ||
    videoType === "vimeo"
  );

  // ✅ Debug - شيله بعد التأكد
  console.log("Video Link:", videoLink);
  console.log("Video ID:", videoId);
  console.log("Video Type:", videoType);

  // ✅ فتح صفحة مشاهدة منفصلة
  const handleWatch = (e) => {
    e.stopPropagation();
    if (!canOpen) return;

    const params = new URLSearchParams();

    if (videoType === "youtube") {
      params.set("youtube_id", videoId);
    }
    if (videoType === "vimeo") {
      params.set("vimeo_id", videoId);
    }
    params.set("title", title);

    const url = `/student-results/watch?${params.toString()}`;
    console.log("Navigating to:", url); // Debug

    router.push(url);
  };

  // ✅ الضغط على الكارد يفتح الصور
  const handleCardClick = () => {
    onOpenImages?.();
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
      {/* ✅ Thumbnail */}
      <div className="group relative self-stretch w-full min-h-[200px] rounded-xl overflow-hidden bg-neutral-100">
        <img
          loading="lazy"
          className="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-300"
          alt={title}
          src={image}
          onError={(e) => {
            e.currentTarget.src = "/images/resultImage.png";
            e.currentTarget.onerror = null;
          }}
        />
      </div>

      {/* ✅ زر المشاهدة */}
      <button
        className={`flex items-center text-white justify-center gap-2.5 px-2 py-3 md:py-3 relative self-stretch w-full flex-[0_0_auto] rounded-[15px] md:rounded-[19px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 ${
          canOpen
            ? "bg-primary hover:opacity-90"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        type="button"
        disabled={!canOpen}
        onClick={handleWatch}
      >
        <VideoIcon className="w-5 h-5" />
        <span className="text-sm lg:text-base font-semibold">
          {canOpen ? "توثيق الدرجة بالفيديو" : "لا يوجد رابط توثيق"}
        </span>
      </button>
    </main>
  );
};
