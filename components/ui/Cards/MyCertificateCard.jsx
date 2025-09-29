"use client"


import React, { useState } from "react";
import { DownloadIcon } from "../../../public/svgs";
// import rectangle8 from "./rectangle-8.png";
// import vector from "./vector.svg";

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
    <article className="flex flex-col w-[312px] items-center gap-8 pt-4 pb-6 px-4 relative bg-white rounded-[30px] border-[3px] border-solid border-variable-collection-stroke">
      <header className="relative w-[284px] h-32 ml-[-2.00px] mr-[-2.00px]">
        <img
          className="w-full h-full object-cover rounded-lg"
          alt="شهادة إدارة المشاريع الاحترافية"
          src={"/images/Certificate 8.png"}
          loading="lazy"
        />
      </header>

      <section className="inline-flex flex-col gap-2 ml-[-2.00px] mr-[-2.00px] items-center justify-center relative flex-[0_0_auto]">
        <h1 className="w-[284px] mt-[-1.00px]  font-bold text-primary text-base relative flex items-center justify-center text-center tracking-[0] leading-[normal] [direction:rtl]">
          شهادة إدارة المشاريع الاحترافية
        </h1>

        <time
          className="w-fit  font-medium text-text-alt text-sm relative flex items-center justify-center text-center tracking-[0] leading-[normal] [direction:rtl]"
          dateTime="2023-08-18"
        >
          تاريخ الإنجاز: 18 أغسطس 2023
        </time>
      </section>

      <button
        className="flex gap-2.5 px-4 py-3 self-stretch w-full bg-primary rounded-[15px] items-center justify-center relative flex-[0_0_auto] transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleDownload}
        disabled={isDownloading}
        aria-label="تحميل شهادة إدارة المشاريع الاحترافية بصيغة PDF"
        type="button"
      >
        <DownloadIcon />
        <span className="relative flex text-white items-center justify-center w-fit mt-[-1.00px]  font-medium text-foundation-bluewhite text-base tracking-[0] leading-[normal] [direction:rtl]">
          {isDownloading ? "جاري التحميل..." : "تحميل PDF"}
        </span>

      </button>
    </article>
  );
};