"use client";
import Link from "next/link";
import React, { useState } from "react";

export const MyCompletedCourseCard = () => {
  const courseData = {
    title: "إتقان التدريس الفعال",
    progress: 65,
    progressLabel: "معدل الإنجاز",
    buttonText: "متابعة",
  };

  return (
    <article
      className="flex flex-col w-full items-start gap-2 pt-0 pb-8 px-0 relative bg-white rounded-[20px] border-2 sm:border-4 border-solid border-primary"
      role="article"
      aria-label={`دورة ${courseData.title}`}
    >
      <div
        className="relative self-stretch w-full h-[200px] rounded-[20px_20px_0px_0px] overflow-hidden"
        role="img"
        aria-label="صورة الدورة"
        style={{
          backgroundImage: `url('/images/teacher-course-banner.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="flex flex-col items-center gap-8 px-4 py-0 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
          <h2 className="  font-bold text-text text-lg sm:text-xl md:text-2xl relative flex items-center justify-center mt-[-1.00px] tracking-[0] leading-[normal] [direction:rtl]">
            {courseData.title}
          </h2>
          <div className="self-stretch text-center justify-center text-text-alt text-base font-medium ">
            تم الإكمال
          </div>
        </div>
        <Buttons />
      </div>
    </article>
  );
};

const Buttons = () => {
  const [activeTab, setActiveTab] = useState("evaluation");

  const tabs = [
    {
      id: "evaluation",
      label: "تقييم",
      isActive: true,
      href: "/courses/123/rate-course",
    },
    {
      id: "review",
      label: "مراجعه",
      isActive: false,
      href: "/course/123?reg=true",
    },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div
      className="flex w-full items-start justify-between relative"
      role="tablist"
      aria-label="Navigation tabs"
    >
      {tabs.map((tab) => (
        <Link
          href={tab.href}
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`${tab.id}-panel`}
          onClick={() => handleTabClick(tab.id)}
          className={`flex w-[130px] items-center justify-center gap-2.5 px-4 py-3 relative rounded-[10px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
            activeTab === tab.id
              ? "bg-primary"
              : "bg-primary-light border-2 border-solid border-primary hover:bg-blue-50"
          }`}
        >
          <span
            className={`mt-[-1.00px] relative flex items-center justify-center w-fit  font-semibold text-sm text-left tracking-[0] leading-[normal] [direction:rtl] ${
              activeTab === tab.id ? "text-white" : "text-primary mt-[-2.00px]"
            }`}
          >
            {tab.label}
          </span>
        </Link>
      ))}
    </div>
  );
};
