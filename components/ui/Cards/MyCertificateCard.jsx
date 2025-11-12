"use client";

import React, { useState } from "react";
import { DownloadIcon } from "../../../public/svgs";

export const MyCertificateCard = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  return (
    <article className="flex flex-col w-full items-center gap-6 sm:gap-8 pt-3 sm:pt-4 pb-4 sm:pb-6 px-3 sm:px-4 relative bg-white rounded-[25px] sm:rounded-[30px] border-[3px] border-solid border-variable-collection-stroke">
      <header className="relative w-full aspect-[284/128] overflow-hidden">
        <img
          className="w-full h-full object-cover rounded-lg"
          alt="شهادة إدارة المشاريع الاحترافية"
          src={"/images/Certificate 8.png"}
          loading="lazy"
        />
      </header>

      <section className="inline-flex flex-col gap-2 items-center justify-center relative flex-[0_0_auto] w-full">
        <h1 className="w-full font-bold text-primary text-sm sm:text-base relative flex items-center justify-center text-center tracking-[0] leading-[normal] [direction:rtl] px-2">
          شهادة إدارة المشاريع الاحترافية
        </h1>

        <time
          className="w-fit font-medium text-text-alt text-xs sm:text-sm relative flex items-center justify-center text-center tracking-[0] leading-[normal] [direction:rtl]"
          dateTime="2023-08-18"
        >
          تاريخ الإنجاز: 18 أغسطس 2023
        </time>
      </section>

      <button
        className="flex gap-2.5 px-3 sm:px-4 py-3 self-stretch w-full bg-primary rounded-[12px] sm:rounded-[15px] items-center justify-center relative flex-[0_0_auto] transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleDownload}
        disabled={isDownloading}
        aria-label="تحميل شهادة إدارة المشاريع الاحترافية بصيغة PDF"
        type="button"
      >
        <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
          <DownloadIcon />
        </div>
        <span className="relative flex text-white items-center justify-center w-fit font-medium text-foundation-bluewhite text-sm sm:text-base tracking-[0] leading-[normal] [direction:rtl]">
          {isDownloading ? "جاري التحميل..." : "تحميل PDF"}
        </span>
      </button>
    </article>
  );
};
