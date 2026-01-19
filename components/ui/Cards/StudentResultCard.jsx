"use client";

import { VideoIcon } from "lucide-react";
import React from "react";
import { openVideoModal } from "../../utils/Store/Slices/videoModalSlice";
import { useDispatch } from "react-redux";
import { detectVideoType, parseVideoLink } from "../../../lib/parseVideoLink";

export const StudentResultCard = ({ item }) => {
  const title = item?.title || "نتيجة طالب";
  const image = item?.image_url || "/images/resultImage.png";
  const videoLink = item?.video_link || "";
  const canOpen = !!videoLink;
  
  const dispatch = useDispatch();
  
  const openModal = () => {
    const { link, type } = detectVideoType(videoLink);

    console.log("link" , link)
    console.log("type" , type)

  
    dispatch(
      openVideoModal({
        title: (title || "").trim(),
        vimeoId: type === "vimeo" ? link : "",
        youtubeId: type === "youtube" ? link : "",
        autoplay: true,
      })
    );
  };

  return (
    <main className="flex flex-col w-full items-start gap-6 py-4 px-4  relative  rounded-[35px]  border-[4px] md:border-[5px] border-solid">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        loading="lazy"
        className="relative self-stretch w-full h-[200px]  object-fit  aspect-video bg-neutral-100"
        alt={title}
        src={image}
      />

      <button
        className={`flex items-center text-white justify-center gap-2.5  px-2 py-3 md:py-3 relative self-stretch w-full flex-[0_0_auto] rounded-[15px] md:rounded-[19px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-opacity duration-200 ${
          canOpen ? "bg-primary hover:opacity-90" : "bg-gray-400 cursor-not-allowed"
        }`}
        type="button"
        aria-label="Document certification button"
        disabled={!canOpen}
        onClick={() => {
          if (!canOpen) return;
          openModal()
        }}
      >
        <VideoIcon/>
        <span className="text-sm lg:text-base  font-semibold">
          {canOpen ? "توثيق الدرجة بالفيديو" : "لا يوجد رابط توثيق"}
        </span>
      </button>
    </main>
  );
};
