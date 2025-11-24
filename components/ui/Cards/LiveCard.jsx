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
    <main className="flex flex-col w-[502px] items-start gap-6 pt-8 pb-12 px-6 relative bg-white rounded-[50px] border-[3px] border-solid border-variable-collection-stroke">
      <header className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex items-center justify-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
          <div className="w-[20px] h-[20px] bg-danger rounded-full mx-[14px] animate-pulse"></div>

          <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
            <div>
              <LiveIcon className={"w-10 h-10"} />
            </div>
            <div className="inline-flex items-center justify-start gap-4 relative flex-[0_0_auto]">
              <h1 className="w-fit font-bold text-[#f91616] text-xl leading-[normal] relative flex items-center justify-center mt-[-1.00px] tracking-[0]">
                بث مباشر
              </h1>
            </div>
          </div>
        </div>

        {/* <img
          className="relative self-stretch w-full h-[287px] rounded-[40px] object-cover object-[50%_50%]"
          role="img"
          src={courseData.round.image_url}
          alt="Live stream preview"
        /> */}
      </header>

      <section className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <h2 className="self-stretch text-text text-2xl font-bold text-center leading-[normal] relative flex items-center justify-center mt-[-1.00px] tracking-[0]">
          {liveData.lessonTitle || liveData.title}
        </h2>

        <div className="flex items-center justify-between p-4 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-[20px] border-2 border-solid border-variable-collection-stroke">
          <div className="inline-flex flex-col items-start gap-2 relative flex-[0_0_auto]">
            <div className="self-stretch font-semibold text-text text-xl leading-[normal] relative flex items-center justify-center mt-[-1.00px] tracking-[0]">
              <span>رمز الدخول :</span>
              <span className="mx-2" aria-label={`Access code ${accessCode}`}>
                {accessCode}
              </span>
            </div>
            <div className="text-sm text-text-alt">
              الوقت: {formatTime(liveData.time)} - {liveData.date}
            </div>
          </div>
          <button
            onClick={handleCopyCode}
            className="relative w-6 h-6 aspect-[1] cursor-pointer hover:opacity-70 transition-opacity"
            aria-label="Copy access code to clipboard"
            title="Copy access code"
          >
            <CopyIcon />
          </button>
        </div>
      </section>

      <button
        onClick={handleJoinClick}
        disabled={isJoining}
        className="flex items-center justify-center gap-2.5 px-2.5 py-6 relative self-stretch w-full flex-[0_0_auto] bg-[#f91616] rounded-[30px] shadow-[0px_0px_50px_#f9161699] hover:bg-[#e01414] active:bg-[#d01212] disabled:opacity-70 transition-colors cursor-pointer"
        aria-label="Join the live stream now"
      >
        <span className="w-fit font-bold text-[#e8ecf3] text-xl text-center leading-[30px] whitespace-nowrap relative flex items-center justify-center mt-[-1.00px] tracking-[0]">
          {isJoining ? "جاري الانضمام..." : "انضم الآن"}
        </span>
      </button>
      {contextHolder}
    </main>
  );
};

export default LiveCard;
