"use client";

import React, { useState } from "react";
// import { LiveIcon } from "../../../public/svgs";
// import { Component5 } from "./Component5";
// import liveStreaming1 from "./live-streaming-1.svg";
// import vector from "./vector.svg";
import { CopyIcon, LiveIcon } from "./../../../public/svgs";

const LiveCard = () => {
  const [accessCode] = useState("558");
  const [isJoining, setIsJoining] = useState(false);

  const handleJoinClick = () => {
    setIsJoining(true);
    // Simulate joining process
    setTimeout(() => {
      setIsJoining(false);
    }, 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(accessCode);
  };

  return (
    <main className="flex flex-col w-[502px] items-start gap-6 pt-8 pb-12 px-6 relative bg-white rounded-[50px] border-[3px] border-solid border-variable-collection-stroke">
      <header className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex items-center justify-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
          <div className="w-[20px] h-[20px] bg-danger rounded-full mx-[14px]"></div>

          <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
            <div>
              <LiveIcon />
            </div>
            <div className="inline-flex items-center justify-start gap-4 relative flex-[0_0_auto]">
              <h1 className="w-fit  font-bold text-[#f91616] text-2xl leading-[normal] relative flex items-center justify-center mt-[-1.00px] tracking-[0] ">
                بث مباشر
              </h1>
            </div>

            {/* <LiveIcon /> */}
          </div>
        </div>

        <img
          className={`relative self-stretch w-full h-[287px] rounded-[40px]  object-cover object-[50%_50%]`}
          role="img"
          src="/images/Frame 1000004932.png"
          aria-label="Live stream video preview showing classroom scene"
        />
      </header>

      <section className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <h2 className="self-stretch  font-semibold text-text text-[32px] text-center leading-[normal] relative flex items-center justify-center mt-[-1.00px] tracking-[0] ">
          كيفية إعداد خطة درس ناجحة
        </h2>

        <div className="flex items-center justify-between p-4 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-[20px] border-2 border-solid border-variable-collection-stroke">

          <div className="inline-flex flex-col items-start gap-2 relative flex-[0_0_auto]">
            <div className="self-stretch font-semibold text-text text-2xl leading-[normal] relative flex items-center justify-center mt-[-1.00px] tracking-[0] ">
              <span>رمز الدخول :</span>
              <span className="mx-2" aria-label={`Access code ${accessCode}`}>
                {accessCode}
              </span>
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
        <span className="w-fit  font-bold text-[#e8ecf3] text-2xl text-center leading-[30px] whitespace-nowrap relative flex items-center justify-center mt-[-1.00px] tracking-[0] ">
          {isJoining ? "جاري الانضمام..." : "أنضم الأن"}
        </span>
      </button>
    </main>
  );
};

export default LiveCard;
