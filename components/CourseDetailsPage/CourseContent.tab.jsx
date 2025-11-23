"use client";

import React, { useState, useCallback } from "react";
import CourseContentDrawer from "../ui/CourseContentDrawer";
import Link from "next/link";

const CourseContent = ({ isRegistered, courseData }) => {
  const [selectedTab, setSelectedTab] = useState("foundation");
  const { contents, round } = courseData;

  // فلترة المحتوى حسب النوع
  const foundationContents = contents.filter(
    (c) => c.content_type === "basic" || c.content_type === "foundation"
  );

  const lectureContents = contents.filter((c) => c.content_type === "lecture");

  // جمع كل الامتحانات من كل المحتوى
  const allExams = contents.flatMap((content) => content.exams_round || []);

  return (
    <div className="w-full flex-1">
      <div className="text-right justify-center text-primary text-lg md:text-2xl font-bold mb-6 lg:mb-8">
        محتوي الدورة : {round.name}
      </div>

      {isRegistered && (
        <Navs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      )}

      {selectedTab === "foundation" && (
        <div className="flex flex-col gap-3 md:gap-4">
          {foundationContents.length > 0 ? (
            foundationContents.map((content) => (
              <CourseContentDrawer
                key={content.id}
                content={content}
                isRegistered={isRegistered}
              />
            ))
          ) : (
            <div className="text-center py-8 text-text-alt">
              لا يوجد محتوى تأسيسي متاح
            </div>
          )}
        </div>
      )}

      {selectedTab === "lectures" && (
        <div className="flex flex-col gap-3 md:gap-4">
          {lectureContents.length > 0 ? (
            lectureContents.map((content) => (
              <CourseContentDrawer
                key={content.id}
                content={content}
                isRegistered={isRegistered}
              />
            ))
          ) : (
            <div className="text-center py-8 text-text-alt">
              لا توجد محاضرات متاحة
            </div>
          )}
        </div>
      )}

      {selectedTab === "tests" && (
        <div className="flex flex-col gap-3 md:gap-4">
          {allExams.length > 0 ? (
            allExams.map((exam) => <TestRow key={exam.id} exam={exam} />)
          ) : (
            <div className="text-center py-8 text-text-alt">
              لا توجد اختبارات متاحة
            </div>
          )}
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
      className="flex w-full lg:w-[720px] mb-6 items-center justify-between p-2 lg:p-3 bg-[#ebf3fe] rounded-[20px] lg:rounded-[26px] overflow-x-auto hidden-scroll gap-1 lg:gap-1.5"
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

export const TestRow = ({ exam }) => {
  const formatTime = (timeString) => {
    if (!timeString) return "غير محدد";
    const [hours, minutes] = timeString.split(":");
    return `${hours} ساعة ${minutes} دقيقة`;
  };

  return (
    <Link
      href={`/mock-test/${exam.id}`}
      className="flex flex-col lg:flex-row items-start lg:items-center group hover:shadow-2xl cursor-pointer duration-75 transition-all justify-between p-4 lg:px-6 lg:py-8 relative bg-white rounded-[20px] border-2 border-solid border-zinc-500 gap-4"
    >
      <div className="flex items-center gap-3">
        <p className="group-hover:text-primary transition-all duration-75 font-medium text-text text-sm md:text-base">
          {exam.title || "غير محدد"}
        </p>
      </div>

      <div className="w-full lg:w-auto flex items-center justify-between lg:justify-start lg:gap-4">
        <div className="font-bold text-primary text-base lg:text-lg">
          ({exam.exam_type === "full_round" ? "اختبار شامل" : "اختبار محاكي"})
        </div>
        <div className="text-text-alt text-sm">{formatTime(exam.time)}</div>
      </div>
    </Link>
  );
};
