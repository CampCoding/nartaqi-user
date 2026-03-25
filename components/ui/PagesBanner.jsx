"use client";

import React from "react";
import { useRouter } from "next/navigation";

const PagesBanner = ({
  image,
  title,
  partName = "",
  variant = "large",
  objectPosition,
  breadcrumb = [
    { title: "الرئيسية", link: "/" },
    { title: "دورات المعلمين", link: "/about-us" },
    { title: partName },
  ],
}) => {
  const router = useRouter();

  const sizes = {
    large: {
      height: "h-[280px] lg:h-[473px]",
      padding: "pt-[40px] lg:pt-[89px]",
    },
    normal: {
      height: "h-[240px] lg:h-[336px]",
      padding: "pt-[40px] lg:pt-[65px]",
    },
  };

  // ✅ دالة ذكية: لو الـ link رقم سالب يرجع في الـ history، لو string يروح للرابط
  const handleNavigation = (link) => {
    if (!link || link === "#") return;

    if (typeof link === "number") {
      // مثال: -1 يرجع صفحة، -2 يرجع صفحتين
      window.history.go(link);
    } else {
      router.push(link);
    }
  };

  return (
    <div>
      <div
        className={`${sizes[variant].height} relative ${sizes[variant].padding} flex justify-center overflow-hidden`}
      >
        {/* ✅ Layer 1: الصورة - z-0 */}
        <img
          loading="lazy"
          src={image || "/images/Frame 1000004881.png"}
          alt={title}
          className={`absolute inset-0 z-0 w-full h-full object-cover ${
            objectPosition ?? "object-top"
          }`}
          onError={(e) => {
            e.currentTarget.src = "/images/Frame 1000004881.png";
            e.currentTarget.onerror = null;
          }}
        />

        {/* ✅ Layer 2: الـ Overlay الغامق - z-[1] */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/20 to-black/30" />

        {/* ✅ Layer 3: المحتوى (العنوان + Breadcrumb) - z-[2] */}
        <div className="relative z-[2] container mx-auto px-4 md:px-8 lg:px-[64px] inline-flex flex-col justify-start items-center gap-4">
          <div className="text-center leading-normal min-h-[60px] lg:min-h-[75px] flex items-center justify-center text-white text-3xl lg:text-[40px] font-bold">
            {title || "نبذه عنا"}
          </div>

          {/* Breadcrumb */}
          <div
            dir="rtl"
            className="max-w-full w-fit !px-3 lg:px-[24px] py-3 lg:py-4 bg-secondary rounded-2xl inline-flex items-center gap-3 lg:gap-[16px] overflow-auto hidden-scroll lg:overflow-visible whitespace-nowrap lg:whitespace-normal snap-x snap-mandatory"
          >
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                <div
                  onClick={() => handleNavigation(item.link)}
                  className={`shrink-0 snap-start transition-opacity ${
                    item.link && item.link !== "#"
                      ? "cursor-pointer hover:opacity-80"
                      : ""
                  } ${
                    index !== 0
                      ? "text-white font-semibold"
                      : "text-text font-bold"
                  } text-base lg:text-2xl leading-normal`}
                >
                  {item.title}
                </div>
                {index < breadcrumb.length - 1 && (
                  <svg
                    className="shrink-0 w-[6px] h-[11px] lg:w-[8px] lg:h-[13px]"
                    viewBox="0 0 8 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.66336 0.338156C7.77007 0.44465 7.85474 0.571145 7.9125 0.7104C7.97027 0.849655 8 0.998935 8 1.1497C8 1.30046 7.97027 1.44974 7.9125 1.58899C7.85474 1.72825 7.77007 1.85474 7.66336 1.96124L3.19701 6.42758L7.66336 10.8939C7.8786 11.1092 7.99951 11.4011 7.99951 11.7055C7.99951 12.0099 7.8786 12.3018 7.66336 12.517C7.44813 12.7322 7.15621 12.8532 6.85182 12.8532C6.54743 12.8532 6.25552 12.7322 6.04028 12.517L0.756638 7.23337C0.649924 7.12687 0.565262 7.00038 0.507497 6.86112C0.449732 6.72187 0.42 6.57259 0.42 6.42183C0.42 6.27107 0.449732 6.12179 0.507497 5.98253C0.565262 5.84328 0.649924 5.71678 0.756638 5.61029L6.04028 0.326644C6.47771 -0.110781 7.21442 -0.110781 7.66336 0.338156Z"
                      fill="#FAFAFA"
                    />
                  </svg>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagesBanner;
