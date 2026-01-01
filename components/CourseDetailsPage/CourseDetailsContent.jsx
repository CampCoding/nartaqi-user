"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import CourseBriefOverview from "./CourseBriefOverview.tab";
import CourseContent from "./CourseContent.tab";
import CourseAdvantages from "./CourseAdvantages.tab";
import CourseTermsAndConditions from "./CourseTermsAndConditions";
import CourseRatings from "./CourseRatings.tab";

/** ✅ Detect RTL scroll behavior across browsers */
let _rtlScrollType = null;
function getRtlScrollType() {
  if (_rtlScrollType) return _rtlScrollType;

  const el = document.createElement("div");
  el.dir = "rtl";
  el.style.width = "80px";
  el.style.height = "80px";
  el.style.overflow = "scroll";
  el.style.position = "absolute";
  el.style.top = "-9999px";

  const inner = document.createElement("div");
  inner.style.width = "160px";
  inner.style.height = "1px";
  el.appendChild(inner);

  document.body.appendChild(el);

  // When setting scrollLeft to 1, different browsers respond differently.
  el.scrollLeft = 1;
  if (el.scrollLeft === 1) {
    // "positive-ascending" (Chrome-like in some cases)
    _rtlScrollType = "positive-ascending";
  } else {
    el.scrollLeft = -1;
    if (el.scrollLeft < 0) {
      // "negative" (Firefox)
      _rtlScrollType = "negative";
    } else {
      // "positive-descending" (WebKit/Safari)
      _rtlScrollType = "positive-descending";
    }
  }

  document.body.removeChild(el);
  return _rtlScrollType;
}

function getDirection(el) {
  if (!el) return "ltr";
  return getComputedStyle(el).direction || "ltr";
}

function getMaxScroll(el) {
  return Math.max(0, el.scrollWidth - el.clientWidth);
}

function getNormalizedScrollLeft(el) {
  const max = getMaxScroll(el);
  const dir = getDirection(el);

  if (dir !== "rtl") return el.scrollLeft;

  const type = getRtlScrollType();
  if (type === "negative") return -el.scrollLeft;
  if (type === "positive-descending") return max - el.scrollLeft;
  return el.scrollLeft; // positive-ascending
}

function setNormalizedScrollLeft(el, normalized) {
  const max = getMaxScroll(el);
  const dir = getDirection(el);
  const value = Math.min(max, Math.max(0, normalized));

  if (dir !== "rtl") {
    el.scrollLeft = value;
    return;
  }

  const type = getRtlScrollType();
  if (type === "negative") el.scrollLeft = -value;
  else if (type === "positive-descending") el.scrollLeft = max - value;
  else el.scrollLeft = value; // positive-ascending
}

const CourseDetailsContent = ({ courseData, inFreeVideos }) => {
  const [activeTab, setActiveTab] = useState("content");


  useEffect(()=>{ 
    if(inFreeVideos)
    setActiveTab("overview")
  },[inFreeVideos])

  const tabs = useMemo(
    () =>
      inFreeVideos
        ? [
            { label: "نبذة مختصرة", value: "overview" },
            { label: "مميزات الدورة", value: "features" },
            { label: "الشروط والأحكام", value: "terms" },
            { label: "تقييمات", value: "reviews" },
          ]
        : [
            { label: "نبذة مختصرة", value: "overview" },
            { label: "محتوى الدورة", value: "content" },
            { label: "مميزات الدورة", value: "features" },
            { label: "الشروط والأحكام", value: "terms" },
            { label: "تقييمات", value: "reviews" },
          ],
    []
  );

  const scrollerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false); // visually left
  const [canScrollRight, setCanScrollRight] = useState(false); // visually right
  const [isOverflowing, setIsOverflowing] = useState(false);

  // hint "اسحب للمزيد" يظهر فقط قبل أول سكرول
  const [showHint, setShowHint] = useState(false);
  const hintDismissedRef = useRef(false);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const max = getMaxScroll(el);
    const overflowing = max > 2;
    setIsOverflowing(overflowing);

    if (!overflowing) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      setShowHint(false);
      return;
    }

    const n = getNormalizedScrollLeft(el);
    const dir = getDirection(el);
    const threshold = 2;

    // ✅ Determine hidden sides based on visual direction
    // LTR: left hidden when n > 0, right hidden when n < max
    // RTL: at start you're at the right side visually; hidden to the left when n < max
    const hasHiddenLeft = dir === "rtl" ? n < max - threshold : n > threshold;
    const hasHiddenRight = dir === "rtl" ? n > threshold : n < max - threshold;

    setCanScrollLeft(overflowing && hasHiddenLeft);
    setCanScrollRight(overflowing && hasHiddenRight);

    if (!hintDismissedRef.current) {
      // show hint only if there is something hidden on any side
      setShowHint(hasHiddenLeft || hasHiddenRight);
    }
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      updateScrollState();
      if (!hintDismissedRef.current) {
        hintDismissedRef.current = true;
        setTimeout(() => setShowHint(false), 300);
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(() => updateScrollState());
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [updateScrollState]);

  const scrollTowardLeft = () => {
    const el = scrollerRef.current;
    if (!el) return;

    const max = getMaxScroll(el);
    const current = getNormalizedScrollLeft(el);
    const step = Math.max(220, Math.floor(el.clientWidth * 0.6));

    // visually left means normalized + step
    const next = Math.min(max, current + step);
    setNormalizedScrollLeft(el, next);
  };

  const scrollTowardRight = () => {
    const el = scrollerRef.current;
    if (!el) return;

    const current = getNormalizedScrollLeft(el);
    const step = Math.max(220, Math.floor(el.clientWidth * 0.6));

    // visually right means normalized - step
    const next = Math.max(0, current - step);
    setNormalizedScrollLeft(el, next);
  };

  const handleTabClick = (tabValue) => {
    setActiveTab(tabValue);

    // ✅ bring clicked tab into view (nice UX)
    requestAnimationFrame(() => {
      const el = scrollerRef.current;
      if (!el) return;
      const btn = el.querySelector(`[data-tab="${tabValue}"]`);
      if (btn?.scrollIntoView) {
        btn.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 md:gap-10">
      {/* Tabs */}
      <div className="sticky md:static top-[83px] z-30 bg-white/95 md:bg-transparent backdrop-blur supports-[backdrop-filter]:bg-white/80 py-2 md:py-3">
        <div className="relative">
          {/* Gradients to hint overflow */}
          {isOverflowing && (
            <>
              {/* Left fade */}
              <div
                className={[
                  "pointer-events-none absolute inset-y-0 left-0 w-10",
                  "bg-gradient-to-r from-white/95 to-white/0",
                  "md:from-transparent",
                  canScrollLeft ? "opacity-100" : "opacity-0",
                  "transition-opacity duration-200",
                ].join(" ")}
              />
              {/* Right fade */}
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
                onClick={scrollTowardLeft}
                className={[
                  "absolute left-1 top-1/2 -translate-y-1/2 z-10",
                  "h-8 w-8 rounded-full border border-zinc-200 bg-white/90 shadow-sm",
                  "grid place-items-center",
                  "transition-all duration-200",
                  canScrollLeft
                    ? "opacity-100 hover:bg-white"
                    : "opacity-0 pointer-events-none",
                ].join(" ")}
              >
                <ChevronLeft className="h-4 w-4 text-zinc-600" />
              </button>

              <button
                type="button"
                aria-label="Scroll tabs right"
                onClick={scrollTowardRight}
                className={[
                  "absolute right-1 top-1/2 -translate-y-1/2 z-10",
                  "h-8 w-8 rounded-full border border-zinc-200 bg-white/90 shadow-sm",
                  "grid place-items-center",
                  "transition-all duration-200",
                  canScrollRight
                    ? "opacity-100 hover:bg-white"
                    : "opacity-0 pointer-events-none",
                ].join(" ")}
              >
                <ChevronRight className="h-4 w-4 text-zinc-600" />
              </button>
            </>
          )}

          {/* Hint bubble */}
          {isOverflowing && showHint && (canScrollLeft || canScrollRight) && (
            <div className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 z-10">
              <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white/95 px-3 py-1 shadow-sm">
                <span className="text-[11px] text-zinc-600">اسحب للمزيد</span>
                <span className="flex items-center gap-1">
                  {canScrollRight && (
                    <ChevronRight className="h-3.5 w-3.5 text-zinc-500 animate-pulse" />
                  )}
                  {canScrollLeft && (
                    <ChevronLeft className="h-3.5 w-3.5 text-zinc-500 animate-pulse" />
                  )}
                </span>
              </div>
            </div>
          )}

          <div
            ref={scrollerRef}
            className={[
              "flex w-full items-center gap-2 overflow-x-auto hidden-scroll px-1",
              "scroll-smooth",
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
                  data-tab={tab.value}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleTabClick(tab.value)}
                  className={[
                    "relative flex items-center justify-center cursor-pointer select-none",
                    "px-3 md:px-3.5",
                    "py-1.5 md:py-2",
                    "rounded-xl",
                    "transition-all duration-200",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                    isActive ? "bg-primary/10" : "hover:bg-zinc-50",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "text-right whitespace-nowrap",
                      // ✅ أصغر شوية
                      "text-[13px] sm:text-sm md:text-base",
                      isActive
                        ? "text-primary font-bold"
                        : "text-text/90 font-medium",
                    ].join(" ")}
                  >
                    {tab.label}
                  </span>

                  {/* Underline */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-2 right-2 h-[3px] rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* subtle divider for mobile */}
        <div className="mt-2 md:hidden h-px w-full bg-zinc-100" />
      </div>

      {/* Content */}
      <div className="mb-12 md:mb-16">
        {activeTab === "overview" && (
          <CourseBriefOverview courseData={courseData} />
        )}

        {activeTab === "content" && <CourseContent courseData={courseData} />}

        {activeTab === "features" && (
          <CourseAdvantages courseData={courseData} />
        )}

        {activeTab === "terms" && (
          <CourseTermsAndConditions courseData={courseData} />
        )}

        {activeTab === "reviews" && <CourseRatings courseData={courseData} />}
      </div>
    </div>
  );
};

export default CourseDetailsContent;
