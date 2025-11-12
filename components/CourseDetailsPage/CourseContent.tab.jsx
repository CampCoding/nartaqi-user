"use client";

import React, { useState, useCallback, KeyboardEvent } from "react";
import {
  CourseChevronTopIcon,
  CourseLockIcon,
  CoursePlayIcon,
} from "../../public/svgs";
import CourseContentDrawer from "../ui/CourseContentDrawer";
import Link from "next/link";

const CourseContent = ({ isRegistered }) => {
  const [selectedTab, setSelectedTab] = useState("foundation");

  return (
    <div className="w-full flex-1">
      <div className="text-right justify-center text-primary text-lg md:text-2xl font-bold mb-6 lg:mb-8">
        محتوي الدورة : إتقان التدريس الفعال
      </div>

      {isRegistered && (
        <Navs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      )}

      {/* The content sections below are already structured to be responsive */}
      {selectedTab == "foundation" && (
        <div className="flex flex-col gap-3 md:gap-4">
          <CourseContentDrawer isRegistered={isRegistered} />
          <CourseContentDrawer isRegistered={isRegistered} />
          <CourseContentDrawer isRegistered={isRegistered} />
        </div>
      )}

      {selectedTab == "lectures" && (
        <div className="flex flex-col gap-3 md:gap-4">
          <CourseContentDrawer isRegistered={isRegistered} />
          <CourseContentDrawer isRegistered={isRegistered} />
          <CourseContentDrawer isRegistered={isRegistered} />
        </div>
      )}

      {selectedTab == "tests" && (
        <div className="flex flex-col gap-3 md:gap-4">
          <TestRow />
          <TestRow />
          <TestRow />
          <TestRow />
        </div>
      )}
    </div>
  );
};

export default CourseContent;

export const Navs = ({ selectedTab, setSelectedTab }) => {
  const tabsData = [
    { id: "foundation", label: "مرحلة التأسيس" },
    { id: "lectures", label: "المحاضرات" },
    { id: "tests", label: "اختبارات" },
  ];

  const handleTabClick = useCallback(
    (tabId) => setSelectedTab(tabId),
    [setSelectedTab]
  );

  const onKeyDown = (e) => {
    const idx = tabsData.findIndex((t) => t.id === selectedTab);
    if (idx < 0) return;
    if (e.key === "ArrowRight") {
      const next = (idx + 1) % tabsData.length;
      setSelectedTab(tabsData[next].id);
    } else if (e.key === "ArrowLeft") {
      const prev = (idx - 1 + tabsData.length) % tabsData.length;
      setSelectedTab(tabsData[prev].id);
    }
  };

  return (
    <nav
      dir="rtl"
      role="tablist"
      aria-label="أقسام الدورة"
      onKeyDown={onKeyDown}
      className="
        flex w-full lg:w-[720px] mb-6 items-center justify-between
        p-2 lg:p-3 bg-[#ebf3fe] rounded-[20px] lg:rounded-[26px]
        overflow-x-auto no-scrollbar gap-1 lg:gap-1.5
      "
    >
      {tabsData.map((tab) => {
        const selected = selectedTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => handleTabClick(tab.id)}
            className={[
              "flex-1 lg:flex-none inline-flex justify-center items-center",
              "px-3 py-3 lg:px-5 lg:py-3.5 rounded-[16px] lg:rounded-[18px]",
              "transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300",
              tab.id === "tests" ? "lg:w-[180px]" : "lg:inline-flex",
              selected ? "bg-primary font-bold text-white" : "text-zinc-500",
              !selected ? "hover:bg-white/60" : "",
            ].join(" ")}
          >
            <span className="w-fit text-center text-xs md:text-lg lg:text-xl leading-normal truncate">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};


export const TestRow = () => {
  // SVG components (ChevronLeft, TestIcon) are not changed.

  return (
    <Link
      href={"/mock-test/123"}
      // Stacks vertically on mobile, row on desktop. Responsive padding.
      className="flex flex-col lg:flex-row items-start lg:items-center group hover:shadow-2xl cursor-pointer duration-75 transition-all justify-between p-4 lg:px-6 lg:py-8 relative bg-white rounded-[20px] border-2 border-solid border-zinc-500 gap-4"
    >
      {/* Test Title section */}
      <div className="flex items-center gap-3">
        {/* <TestIcon /> */}
        <p className="group-hover:text-primary transition-all duration-75 font-medium text-text text-sm md:text-base">
          الأختبار الأول : مدخل إلى التدريس الفعال
        </p>
      </div>

      {/* Test Type and Chevron section */}
      {/* justify-between pushes chevron to the end on mobile */}
      <div className="w-full lg:w-auto flex items-center justify-between lg:justify-start lg:gap-4">
        <div className="font-bold text-primary text-base lg:text-lg">
          ( اختبار محاكي )
        </div>
        <div className="relative w-6 h-6">{/* <ChevronLeft /> */}</div>
      </div>
    </Link>
  );
};
