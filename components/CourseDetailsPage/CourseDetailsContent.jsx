"use client";

import React, { useState } from "react";
import CourseBriefOverview from "./CourseBriefOverview.tab";
import CourseContent from "./CourseContent.tab";
import CourseAdvantages from "./CourseAdvantages.tab";
import CourseTermsAndConditions from "./CourseTermsAndConditions";
import CourseRatings from "./CourseRatings.tab";

const CourseDetailsContent = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { label: "نبذه مختصرة", value: "overview" },
    { label: "محتوي الدورة", value: "content" },
    { label: "مميزات الدورة", value: "features" },
    { label: "الشروط و الأحكام", value: "terms" },
    { label: "تقييمات", value: "reviews" },
  ];

  return (
    <div className="flex flex-col gap-[56px]">
      <div className="w-[762px] inline-flex justify-between items-center">
        {tabs.map((tab) => (
          <div
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex justify-center items-center gap-2.5 cursor-pointer ${
              activeTab === tab.value ? "border-b-[3px] border-primary" : ""
            }`}
          >
            <div
              className={`text-right justify-center text-2xl  ${
                activeTab === tab.value
                  ? "text-primary font-bold"
                  : "text-text font-medium"
              }`}
            >
              {tab.label}
            </div>
          </div>
        ))}
      </div>
      <div className="w-[762px]">
        {activeTab === "overview" && <CourseBriefOverview />}
        {activeTab === "content" && <CourseContent />}
        {activeTab === "features" && <CourseAdvantages />}
        {activeTab === "terms" && <CourseTermsAndConditions />}
        {activeTab === "reviews" && <CourseRatings />} 
      
      </div>
    </div>
  );
};

export default CourseDetailsContent;
