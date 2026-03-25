"use client";

import { VideoIcon, Play } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { detectVideoType } from "../../../lib/parseVideoLink";

export const StudentResultCard = ({ item, onOpenImages }) => {
  const router = useRouter();

  const title = item?.title || "نتيجة طالب";
  const image = item?.image_url || "/images/resultImage.png";
  const videoLink = item?.video_link || "";
  const canOpen = !!videoLink;

  // استخراج نوع الفيديو والـ ID
  const { link, type } = detectVideoType(videoLink);

  // ✅ Helper لعمل encode
  const encodeId = (value) => {
    if (!value) return "";
    try {
      return encodeURIComponent(btoa(String(value)));
    } catch (e) {
      return value;
    }
  };

  // ✅ فتح صفحة مشاهدة منفصلة
  const handleWatch = (e) => {
    e.stopPropagation();
    if (!canOpen) return;

    const params = new URLSearchParams();

    if (type === "youtube" && link) {
      params.set("youtube_id", encodeId(link));
    }
    if (type === "vimeo" && link) {
      params.set("vimeo_id", encodeId(link));
    }
    if (title) {
      params.set("title", title);
    }

    router.push(`/student-results/watch?${params.toString()}`);
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
      {/* ✅ Thumbnail فقط - بدون فيديو داخل الكارد */}
      <div className="group relative self-stretch w-full min-h-[200px] rounded-xl overflow-hidden bg-neutral-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
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

        {/* ✅ Play Overlay on Hover - فقط لو فيه فيديو */}
        {canOpen && (
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center bg-black/30 cursor-pointer"
            onClick={handleWatch}
          >
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300">
              <Play className="w-7 h-7 text-primary fill-primary ml-0.5" />
            </div>
          </div>
        )}
      </div>

      {/* ✅ زر المشاهدة - يفتح صفحة جديدة */}
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
