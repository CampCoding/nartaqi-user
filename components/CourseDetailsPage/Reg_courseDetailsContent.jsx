"use client";

import React, { useEffect, useState } from "react";
import CourseBriefOverview from "./CourseBriefOverview.tab";
import CourseContent from "./CourseContent.tab";
import CourseAdvantages from "./CourseAdvantages.tab";
import CourseTermsAndConditions from "./CourseTermsAndConditions";
import CourseRatings from "./CourseRatings.tab";
import CourseSources from "./CourseSources";

const RegCourseDetailsContent = ({ onTabsChange = () => {} }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { label: "معلومات الدورة", value: "overview" },
    { label: " محتوى الدورة", value: "content" },
    { label: "مصادر الدورة", value: "sourses" },
  ];

  useEffect(()=>{
    onTabsChange(activeTab)
  },[activeTab])
  

  return (
    <div className="flex flex-col gap-4 md:gap-[56px] ">
      <div className=" sticky md:static py-4   z-30  bg-white md:bg-transparent top-[83px]  inline-flex gap-8 md:gap-[45px] items-center overflow-auto hidden-scroll">
        {tabs.map((tab) => (
          <div
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex justify-center items-center gap-2.5 cursor-pointer ${
              activeTab === tab.value
                ? "border-b-[3px] pb-1 border-primary"
                : ""
            }`}
          >
            <div
              className={`text-right whitespace-nowrap  justify-center text-lg  ${
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
      <div className="mb-10">
        {activeTab === "overview" && <CourseBriefOverview isRegistered />}
        {activeTab === "content" && <CourseContent isRegistered />}
        {activeTab === "sourses" && <CourseSources />}
      </div>
    </div>
  );
};

export default RegCourseDetailsContent;
