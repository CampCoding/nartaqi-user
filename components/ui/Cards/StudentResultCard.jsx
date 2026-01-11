"use client";

import { VideoIcon } from "lucide-react";
import React from "react";

export const StudentResultCard = ({ item }) => {
  const title = item?.title || "نتيجة طالب";
  const image = item?.image_url || "/images/resultImage.png";
  const videoLink = item?.video_link || "";

  const canOpen = !!videoLink;

  return (
    <main className="flex flex-col w-full items-start gap-6 md:gap-8 pt-4 md:pt-6 pb-5 px-4 md:px-6 relative bg-variable-collection-white-moca rounded-[30px] md:rounded-[40px] border-[4px] md:border-[5px] border-solid border-variable-collection-stroke">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        loading="lazy"
        className="relative self-stretch w-full object-cover rounded-2xl aspect-video bg-neutral-100"
        alt={title}
        src={image}
      />

      <button
        className={`flex items-center text-white justify-center gap-2.5 px-8 md:px-12 py-3 md:py-3 relative self-stretch w-full flex-[0_0_auto] rounded-[13px] md:rounded-[20px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-opacity duration-200 ${
          canOpen ? "bg-primary hover:opacity-90" : "bg-gray-400 cursor-not-allowed"
        }`}
        type="button"
        aria-label="Document certification button"
        disabled={!canOpen}
        onClick={() => {
          if (!canOpen) return;
          window.open(videoLink, "_blank", "noopener,noreferrer");
        }}
      >
        <VideoIcon/>
        <span className="text-base md:text-lg font-semibold">
          {canOpen ? "توثيق الدرجة بالفيديو" : "لا يوجد رابط توثيق"}
        </span>
      </button>
    </main>
  );
};
