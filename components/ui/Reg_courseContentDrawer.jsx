"use client";

import React, { useState } from "react";
import {
  CourseChevronTopIcon,
  CourseLockIcon,
  CoursePlayIcon,
} from "../../public/svgs";

const RegCourseContentDrawer = () => {
  const [isOpen, setIsOpen] = useState(false); // فتح/غلق الجزء
  const [playingId, setPlayingId] = useState(null); // أي درس بيشتغل

  // بيانات تجريبية - ممكن تجيبها من API بعدين
  const lessons = [
    {
      id: 1,
      title: "كيفية إعداد خطة درس ناجحة",
      duration: "18 دقيقة",
      locked: true,
    },
    {
      id: 2,
      title: "تحديد أهداف التعلم بفعالية",
      duration: "12 دقيقة",
      locked: true,
    },
    {
      id: 3,
      title: "استخدام استراتيجيات متنوعة في التدريس",
      duration: "20 دقيقة",
      locked: true,
    },
    {
      id: 4,
      title: "إدارة الوقت داخل الحصة",
      duration: "15 دقيقة",
      locked: true,
    },
    {
      id: 5,
      title: "طرق تقييم تقدم الطلاب",
      duration: "22 دقيقة",
      locked: true,
    },
  ];

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handlePlay = (lesson) => {
    if (lesson.locked) {
      alert("هذا الدرس مقفل 🔒");
      return;
    }
    setPlayingId((prev) => (prev === lesson.id ? null : lesson.id));
  };

  return (
    <div className="self-stretch w-full px-6 py-[24px] bg-white rounded-[20px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)] outline outline-2 outline-offset-[-1px] outline-zinc-500 inline-flex flex-col justify-start items-start gap-8">
      {/* Header */}
      <div
        className="self-stretch inline-flex justify-between items-end cursor-pointer"
        onClick={handleToggle}
      >
        <div className="text-right justify-center text-text text-base font-bold ">
          القسم الأول : مهارات التخطيط للدروس
        </div>
        <div
          className={`w-6 h-6 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <CourseChevronTopIcon />
        </div>
      </div>

      {/* Body */}
      {isOpen && (
        <div className="self-stretch flex flex-col justify-start items-start gap-6">
          {lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              className="self-stretch inline-flex justify-between items-center"
            >
              <div
                className="flex justify-start items-center gap-2 cursor-pointer"
                onClick={() => handlePlay(lesson)}
              >
                <CoursePlayIcon />
                <div className="text-right justify-center text-text text-base font-medium ">
                  <span className=" font-bold text-primary">
                    {" "}
                    المحاضرة {index + 1}
                  </span>{" "}
                  : {playingId === lesson.id ? "جاري التشغيل..." : lesson.title}
                </div>
              </div>
              <div className="flex justify-end items-center gap-4">
                <div className="text-right justify-center text-text text-base font-medium ">
                  {lesson.duration}
                </div>
                {lesson.locked && <CourseLockIcon />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RegCourseContentDrawer;
