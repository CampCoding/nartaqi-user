"use client";

import React, { useState } from "react";
import { CopyIcon, LiveIcon } from "../../../public/svgs";
import { message } from "antd";

const LiveCard = ({ liveData, courseData }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isJoining, setIsJoining] = useState(false);

  const accessCode = liveData.password; // يمكن إضافته في الـ API

  const handleJoinClick = () => {
    setIsJoining(true);
    window.open(liveData.link, "_blank");
    setTimeout(() => setIsJoining(false), 1600); // ✅ أخف شوية
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(accessCode);
      messageApi.success("تم نسخ الكود!");
    } catch {
      messageApi.error("تعذر نسخ الكود");
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  };

  return (
    <main className="flex flex-col w-full xl:w-[460px] items-start gap-3.5 sm:gap-4 lg:gap-5 pt-4 sm:pt-5 lg:pt-6 pb-7 sm:pb-8 lg:pb-10 px-3.5 sm:px-4 lg:px-5 relative bg-white rounded-[26px] sm:rounded-[34px] lg:rounded-[44px] border-2 sm:border-[2.5px] lg:border-[3px] border-solid border-variable-collection-stroke">
      <header className="flex flex-col items-start gap-2.5 sm:gap-3 lg:gap-3.5 relative self-stretch w-full">
        <div className="flex items-center justify-start gap-2 sm:gap-2.5 lg:gap-3 relative self-stretch w-full">
          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-[18px] lg:h-[18px] bg-danger rounded-full mx-2 sm:mx-2.5 lg:mx-3 animate-pulse flex-shrink-0" />

          <div className="inline-flex items-center gap-1.5 sm:gap-2">
            <LiveIcon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9" />
            <h1 className="font-bold text-[#f91616] text-[14px] sm:text-[16px] lg:text-[18px] leading-none">
              بث مباشر
            </h1>
          </div>
        </div>

        {/* <img
          loading="lazy"
          className="self-stretch w-full h-44 sm:h-52 lg:h-[270px] rounded-[20px] sm:rounded-[28px] lg:rounded-[36px] object-cover object-[50%_50%]"
          src={courseData?.round?.image_url}
          alt="معاينة البث المباشر"
        /> */}
      </header>

      <section className="flex flex-col items-start gap-2.5 sm:gap-3 lg:gap-3.5 self-stretch w-full">
        <h2 className="self-stretch text-text text-[15px] sm:text-[17px] lg:text-[20px] font-bold text-center leading-snug">
          { liveData.title || liveData.lessonTitle }
        </h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-3.5 lg:p-4 self-stretch w-full bg-white rounded-[14px] sm:rounded-[16px] lg:rounded-[18px] border-2 border-solid border-variable-collection-stroke gap-2 sm:gap-0">
          <div className="inline-flex flex-col items-start gap-1 sm:gap-1.5 w-full sm:w-auto">
            <div className="font-semibold text-text text-[12px] sm:text-[13px] lg:text-[14px] leading-normal flex flex-wrap items-center">
              <span>رمز الدخول:</span>
              <span className="mx-1.5 sm:mx-2" aria-label={`رمز الدخول ${accessCode}`}>
                {accessCode}
              </span>
            </div>

            <div className="text-[11px] sm:text-[12px] lg:text-[13px] text-text-alt">
              الوقت: {formatTime(liveData.time)} - {liveData.date}
            </div>
          </div>

          <button
            onClick={handleCopyCode}
            className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:opacity-70 transition-opacity self-end sm:self-auto flex-shrink-0"
            aria-label="نسخ رمز الدخول"
            title="نسخ رمز الدخول"
          >
            <CopyIcon className="w-full h-full" />
          </button>
        </div>
      </section>

      <button
        onClick={handleJoinClick}
        disabled={isJoining}
        className="flex items-center justify-center gap-2 px-2.5 py-3.5 sm:py-4 lg:py-5 self-stretch w-full bg-[#f91616] rounded-[18px] sm:rounded-[22px] lg:rounded-[26px] shadow-[0px_0px_26px_#f9161699] sm:shadow-[0px_0px_34px_#f9161699] lg:shadow-[0px_0px_42px_#f9161699] hover:bg-[#e01414] active:bg-[#d01212] disabled:opacity-70 transition-colors"
        aria-label="الانضمام للبث المباشر الآن"
      >
        <span className="font-bold text-[#e8ecf3] text-[13px] sm:text-[14px] lg:text-[16px] text-center leading-none whitespace-nowrap">
          {isJoining ? "جاري الانضمام..." : "انضم الآن"}
        </span>
      </button>

      {contextHolder}
    </main>
  );
};

export default LiveCard;
