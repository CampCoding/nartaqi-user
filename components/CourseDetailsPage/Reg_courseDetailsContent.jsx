"use client";

import React, { useEffect, useState } from "react";
import CourseBriefOverview from "./CourseBriefOverview.tab";
import CourseContent from "./CourseContent.tab";
import CourseSources from "./CourseSources";
import CourseAdvantages from "./CourseAdvantages.tab";
import CourseTermsAndConditions from "./CourseTermsAndConditions";
import CourseRatings from "./CourseRatings.tab";

const RegCourseDetailsContent = ({ courseData, onTabsChange = () => {} }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { label: "معلومات الدورة", value: "overview" },
    { label: "محتوى الدورة", value: "content" },
    { label: "مميزات الدورة", value: "features" },
    { label: "الشروط و الأحكام", value: "terms" },
    { label: "مصادر الدورة", value: "sourses" },
    { label: "تقييمات", value: "reviews" },
  ];

  useEffect(() => {
    onTabsChange(activeTab);
  }, [activeTab, onTabsChange]);

  return (
    <div className="flex flex-col gap-6 md:gap-14">
      {/* Tabs */}
      <div className="sticky md:static top-[83px] z-30 bg-white/95 md:bg-transparent backdrop-blur supports-[backdrop-filter]:bg-white/80 py-3 md:py-4">
        <div className="inline-flex w-full items-center gap-3 sm:gap-4 md:gap-8 overflow-auto hidden-scroll px-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.value;

            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={[
                  "relative flex justify-center items-center gap-2.5 cursor-pointer select-none",
                  "px-4 py-2.5 md:px-5 md:py-3 rounded-[14px] md:rounded-[16px]",
                  "transition-all duration-200",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                  isActive ? "text-primary font-bold" : "text-text font-medium",
                  !isActive ? "hover:bg-primary/5" : "bg-primary/5",
                ].join(" ")}
              >
                <span className="whitespace-nowrap text-base sm:text-lg md:text-xl leading-normal">
                  {tab.label}
                </span>

                {/* Active underline (same design idea, but cleaner) */}
                {isActive && (
                  <span className="absolute -bottom-1 left-3 right-3 h-[3px] rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>

        {/* subtle divider (helps sticky bar separation without changing design) */}
        <div className="mt-3 md:hidden h-px w-full bg-zinc-100" />
      </div>

      {/* Content */}
      <div className="mb-12 md:mb-16">
        {activeTab === "overview" && (
          <CourseBriefOverview courseData={courseData} isRegistered />
        )}

        {activeTab === "features" && (
          <CourseAdvantages courseData={courseData} />
        )}

        {activeTab === "terms" && (
          <CourseTermsAndConditions courseData={courseData} />
        )}

        {activeTab === "sourses" && <CourseSources courseData={courseData} />}

        {activeTab === "content" && (
          <CourseContent courseData={courseData} isRegistered />
        )}

        {activeTab === "reviews" && <CourseRatings courseData={courseData} />}
      </div>
    </div>
  );
};

export default RegCourseDetailsContent;
