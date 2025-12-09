"use client";

import React, { useState } from "react";
import { CopyIcon, LiveIcon } from "../../../public/svgs";
import { message } from "antd";

const LiveCard = ({ liveData, courseData }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isJoining, setIsJoining] = useState(false);

  const accessCode = "558"; // يمكن إضافته في الـ API

  const handleJoinClick = () => {
    setIsJoining(true);
    // Redirect to live session
    window.open(liveData.link, "_blank");
    setTimeout(() => {
      setIsJoining(false);
    }, 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(accessCode);
    messageApi.success("تم نسخ الكود!");
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  };

  return (
    <main className="flex flex-col w-full sm:w-full lg:w-full xl:w-[502px] items-start gap-4 sm:gap-5 lg:gap-6 pt-5 sm:pt-6 lg:pt-8 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-5 lg:px-6 relative bg-white rounded-[30px] sm:rounded-[40px] lg:rounded-[50px] border-2 sm:border-[2.5px] lg:border-[3px] border-solid border-variable-collection-stroke">
      <header className="flex flex-col items-start gap-3 sm:gap-3.5 lg:gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex items-center justify-start gap-2 sm:gap-3 lg:gap-4 relative self-stretch w-full flex-[0_0_auto]">
          <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-[20px] lg:h-[20px] bg-danger rounded-full mx-2 sm:mx-3 lg:mx-[14px] animate-pulse flex-shrink-0"></div>

          <div className="inline-flex items-center gap-1.5 sm:gap-2 relative flex-[0_0_auto]">
            <div>
              <LiveIcon className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
            </div>
            <div className="inline-flex items-center justify-start gap-2 sm:gap-3 lg:gap-4 relative flex-[0_0_auto]">
              <h1 className="w-fit font-bold text-[#f91616] text-base sm:text-lg lg:text-xl leading-[normal] relative flex items-center justify-center tracking-[0]">
                بث مباشر
              </h1>
            </div>
          </div>
        </div>

        <img
          className="relative self-stretch w-full h-48 sm:h-56 lg:h-[287px] rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] object-cover object-[50%_50%]"
          role="img"
          src={courseData.round.image_url}
          alt="Live stream preview"
        />
      </header>

      <section className="flex flex-col items-start gap-3 sm:gap-3.5 lg:gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <h2 className="self-stretch text-text text-lg lg:text-xl xl:text-2xl font-bold text-center leading-[normal] relative flex items-center justify-center tracking-[0]">
          {liveData.lessonTitle || liveData.title}
        </h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-3.5 lg:p-4 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-[16px] sm:rounded-[18px] lg:rounded-[20px] border-2 border-solid border-variable-collection-stroke gap-2 sm:gap-0">
          <div className="inline-flex flex-col items-start gap-1.5 sm:gap-2 relative flex-[0_0_auto] w-full sm:w-auto">
            <div className="self-stretch font-semibold text-text text-sm lg:text-base  xl:text-lg leading-[normal] relative flex flex-wrap items-center tracking-[0]">
              <span>رمز الدخول :</span>
              <span
                className="mx-1.5 sm:mx-2"
                aria-label={`Access code ${accessCode}`}
              >
                {accessCode}
              </span>
            </div>
            <div className="text-xs sm:text-sm text-text-alt">
              الوقت: {formatTime(liveData.time)} - {liveData.date}
            </div>
          </div>
          <button
            onClick={handleCopyCode}
            className="relative w-5 h-5 sm:w-6 sm:h-6 aspect-[1] cursor-pointer hover:opacity-70 transition-opacity self-end sm:self-auto flex-shrink-0"
            aria-label="Copy access code to clipboard"
            title="Copy access code"
          >
            <CopyIcon className="w-full h-full" />
          </button>
        </div>
      </section>

      <button
        onClick={handleJoinClick}
        disabled={isJoining}
        className="flex items-center justify-center gap-2 sm:gap-2.5 px-2 sm:px-2.5 py-4 sm:py-5 lg:py-6 relative self-stretch w-full flex-[0_0_auto] bg-[#f91616] rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] shadow-[0px_0px_30px_#f9161699] sm:shadow-[0px_0px_40px_#f9161699] lg:shadow-[0px_0px_50px_#f9161699] hover:bg-[#e01414] active:bg-[#d01212] disabled:opacity-70 transition-colors cursor-pointer"
        aria-label="Join the live stream now"
      >
        <span className="w-fit font-bold text-[#e8ecf3] text-base  lg:text-base xl:text-xl text-center leading-[24px] sm:leading-[28px] lg:leading-[30px] whitespace-nowrap relative flex items-center justify-center tracking-[0]">
          {isJoining ? "جاري الانضمام..." : "انضم الآن"}
        </span>
      </button>
      {contextHolder}
    </main>
  );
};

export default LiveCard;
