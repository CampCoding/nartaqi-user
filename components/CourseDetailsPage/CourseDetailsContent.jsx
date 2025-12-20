"use client";

import React, { useState } from "react";
import CourseBriefOverview from "./CourseBriefOverview.tab";
import CourseContent from "./CourseContent.tab";
import CourseAdvantages from "./CourseAdvantages.tab";
import CourseTermsAndConditions from "./CourseTermsAndConditions";
import CourseRatings from "./CourseRatings.tab";

const CourseDetailsContent = ({ courseData }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { label: "نبذه مختصرة", value: "overview" },
    { label: "محتوي الدورة", value: "content" },
    { label: "مميزات الدورة", value: "features" },
    { label: "الشروط و الأحكام", value: "terms" },
    { label: "تقييمات", value: "reviews" },
  ];

  return (
    <div className="flex flex-col gap-6 md:gap-14">
      {/* Tabs */}
      <div className="sticky md:static top-[83px] z-30 bg-white/95 md:bg-transparent backdrop-blur supports-[backdrop-filter]:bg-white/80 py-3 md:py-4">
        <div className="flex w-full items-center gap-3 sm:gap-5 md:gap-10 overflow-auto hidden-scroll px-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.value;

            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={[
                  "relative flex items-center justify-center cursor-pointer select-none",
                  "px-3.5 sm:px-4.5 md:px-5",
                  "py-2.5 sm:py-3",
                  "transition-all duration-200",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                  isActive ? "pb-3" : "",
                ].join(" ")}
              >
                <span
                  className={[
                    "text-right whitespace-nowrap justify-center",
                    "text-base sm:text-lg md:text-xl",
                    isActive ? "text-primary font-bold" : "text-text font-medium",
                  ].join(" ")}
                >
                  {tab.label}
                </span>

                {/* Underline (same design idea) */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>

        {/* subtle divider for mobile (helps separation) */}
        <div className="mt-3 md:hidden h-px w-full bg-zinc-100" />
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
