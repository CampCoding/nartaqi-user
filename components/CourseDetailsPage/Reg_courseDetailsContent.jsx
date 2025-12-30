"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import CourseBriefOverview from "./CourseBriefOverview.tab";
import CourseContent from "./CourseContent.tab";
import CourseSources from "./CourseSources";
import CourseAdvantages from "./CourseAdvantages.tab";
import CourseTermsAndConditions from "./CourseTermsAndConditions";
import CourseRatings from "./CourseRatings.tab";

/** ---------- RTL scroll helpers (robust) ---------- */
function detectRtlScrollType() {
  if (typeof document === "undefined") return "negative";

  const el = document.createElement("div");
  el.dir = "rtl";
  el.style.width = "10px";
  el.style.height = "10px";
  el.style.overflow = "scroll";
  el.style.position = "absolute";
  el.style.top = "-9999px";

  const inner = document.createElement("div");
  inner.style.width = "20px";
  inner.style.height = "10px";
  el.appendChild(inner);

  document.body.appendChild(el);

  el.scrollLeft = 0;
  const init = el.scrollLeft;

  el.scrollLeft = 1;
  const after = el.scrollLeft;

  document.body.removeChild(el);

  if (after < 0) return "negative"; // Firefox-like
  if (init > 0) return "positive-descending"; // Chrome/Safari common
  return "positive-ascending";
}

function getNormalizedScrollLeft(el, dir, rtlType) {
  const max = el.scrollWidth - el.clientWidth;
  if (max <= 0) return 0;

  if (dir !== "rtl") return el.scrollLeft;

  switch (rtlType) {
    case "negative":
      return Math.abs(el.scrollLeft);
    case "positive-descending":
      return max - el.scrollLeft;
    case "positive-ascending":
    default:
      return el.scrollLeft;
  }
}

function setNormalizedScrollLeft(el, dir, rtlType, value) {
  const max = el.scrollWidth - el.clientWidth;
  const v = Math.min(Math.max(value, 0), Math.max(max, 0));

  if (dir !== "rtl") {
    el.scrollLeft = v;
    return;
  }

  switch (rtlType) {
    case "negative":
      el.scrollLeft = -v;
      return;
    case "positive-descending":
      el.scrollLeft = max - v;
      return;
    case "positive-ascending":
    default:
      el.scrollLeft = v;
      return;
  }
}
/** ----------------------------------------------- */

const RegCourseDetailsContent = ({ courseData, onTabsChange = () => {} , open = false }) => {
  const [activeTab, setActiveTab] = useState("content");

  const tabs = useMemo(
    () => [
      { label: "معلومات الدورة", value: "overview" },
      { label: "محتوى الدورة", value: "content" },
      { label: "مميزات الدورة", value: "features" },
      { label: "الشروط والأحكام", value: "terms" },
      { label: "مصادر الدورة", value: "sourses" }, // زي ما عندك
      { label: "تقييمات", value: "reviews" },
    ],
    []
  );

  useEffect(() => {
    onTabsChange(activeTab);
  }, [activeTab, onTabsChange]);

  const scrollerRef = useRef(null);
  const rtlTypeRef = useRef("negative");

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const dir =
      typeof window !== "undefined"
        ? getComputedStyle(el).direction
        : "rtl";

    const max = el.scrollWidth - el.clientWidth;
    const overflowing = max > 2;

    setIsOverflowing(overflowing);

    const current = getNormalizedScrollLeft(el, dir, rtlTypeRef.current);

    setCanScrollLeft(overflowing && current > 2);
    setCanScrollRight(overflowing && current < max - 2);

    if (overflowing) setShowSwipeHint((prev) => prev || true);
    else setShowSwipeHint(false);
  }, []);

  useEffect(() => {
    rtlTypeRef.current = detectRtlScrollType();
    updateScrollState();

    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      setShowSwipeHint(false);
      updateScrollState();
    };

    el.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(() => updateScrollState());
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [updateScrollState]);

  const scrollByStep = (dirStep) => {
    const el = scrollerRef.current;
    if (!el) return;

    const dir =
      typeof window !== "undefined"
        ? getComputedStyle(el).direction
        : "rtl";

    const step = Math.max(200, Math.floor(el.clientWidth * 0.65));
    const current = getNormalizedScrollLeft(el, dir, rtlTypeRef.current);

    setNormalizedScrollLeft(el, dir, rtlTypeRef.current, current + dirStep * step);

    setShowSwipeHint(false);
    updateScrollState();
  };

  return (
    <div className="flex flex-col gap-5 md:gap-10">
      {/* Tabs */}
      <div className="sticky md:static top-[83px] z-30 bg-white/95 md:bg-transparent backdrop-blur supports-[backdrop-filter]:bg-white/80 py-2 md:py-3">
        <div className="relative">
          {/* Fade gradients */}
          {isOverflowing && (
            <>
              <div
                className={[
                  "pointer-events-none absolute inset-y-0 left-0 w-10",
                  "bg-gradient-to-r from-white/95 to-white/0",
                  "md:from-transparent",
                  canScrollLeft ? "opacity-100" : "opacity-0",
                  "transition-opacity duration-200",
                ].join(" ")}
              />
              <div
                className={[
                  "pointer-events-none absolute inset-y-0 right-0 w-10",
                  "bg-gradient-to-l from-white/95 to-white/0",
                  "md:from-transparent",
                  canScrollRight ? "opacity-100" : "opacity-0",
                  "transition-opacity duration-200",
                ].join(" ")}
              />
            </>
          )}

          {/* Scroll buttons */}
          {isOverflowing && (
            <>
              <button
                type="button"
                aria-label="Scroll tabs left"
                onClick={() => scrollByStep(-1)}
                className={[
                  "absolute left-1 top-1/2 -translate-y-1/2 z-10",
                  "h-8 w-8 rounded-full border border-zinc-200 bg-white/90 shadow-sm",
                  "grid place-items-center",
                  "transition-all duration-200",
                  canScrollLeft ? "opacity-100 hover:bg-white" : "opacity-0 pointer-events-none",
                ].join(" ")}
              >
                <ChevronLeft className="h-4 w-4 text-zinc-600" />
              </button>

              <button
                type="button"
                aria-label="Scroll tabs right"
                onClick={() => scrollByStep(1)}
                className={[
                  "absolute right-1 top-1/2 -translate-y-1/2 z-10",
                  "h-8 w-8 rounded-full border border-zinc-200 bg-white/90 shadow-sm",
                  "grid place-items-center",
                  "transition-all duration-200",
                  canScrollRight ? "opacity-100 hover:bg-white" : "opacity-0 pointer-events-none",
                ].join(" ")}
              >
                <ChevronRight className="h-4 w-4 text-zinc-600" />
              </button>
            </>
          )}

          <div
            ref={scrollerRef}
            className={[
              "inline-flex w-full items-center gap-2 overflow-x-auto hidden-scroll overflow-y-hidden px-1",
              "scroll-smooth snap-x snap-mandatory",
              isOverflowing ? "pr-10 pl-10" : "",
            ].join(" ")}
            role="tablist"
            aria-label="Course Tabs"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.value;

              return (
                <button
                  key={tab.value}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveTab(tab.value);
                    setShowSwipeHint(false);
                  }}
                  className={[
                    "relative flex justify-center items-center gap-2 cursor-pointer select-none",
                    "px-2.5 md:px-3.5", // ✅ أصغر
                    "py-1.5 md:py-2",   // ✅ أصغر
                    "rounded-xl",
                    "transition-all duration-200",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                    "snap-start",
                    isActive ? "bg-primary/8 text-primary font-bold" : "text-text/90 font-medium hover:bg-primary/5",
                  ].join(" ")}
                >
                  <span className="whitespace-nowrap text-xs sm:text-sm md:text-base leading-normal">
                    {tab.label}
                  </span>

                  {isActive && (
                    <span className="absolute -bottom-1 left-2 right-2 h-[3px] rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Swipe hint */}
          {isOverflowing && showSwipeHint && (
            <div className="mt-2 flex items-center justify-center md:hidden">
              <span className="inline-flex items-center gap-1 rounded-full bg-zinc-50 px-3 py-1 text-[11px] text-zinc-600 border border-zinc-100">
                اسحب للمزيد
                <ChevronLeft className="h-3.5 w-3.5" />
              </span>
            </div>
          )}
        </div>

        {/* subtle divider */}
        <div className="mt-2 md:hidden h-px w-full bg-zinc-100" />
      </div>

      {/* Content */}
      <div className="mb-12 md:mb-16">
        {activeTab === "overview" && (
          <CourseBriefOverview courseData={courseData} isRegistered={open} />
        )}

        {activeTab === "content" && (
          <CourseContent courseData={courseData} isRegistered={open} />
        )}

        {activeTab === "features" && <CourseAdvantages courseData={courseData} />}

        {activeTab === "terms" && (
          <CourseTermsAndConditions courseData={courseData} />
        )}

        {activeTab === "sourses" && <CourseSources courseData={courseData} />}

        {activeTab === "reviews" && <CourseRatings courseData={courseData} />}
      </div>
    </div>
  );
};

export default RegCourseDetailsContent;
