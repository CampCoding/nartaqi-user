"use client";

import React, { useState } from "react";
import {
  CourseChevronTopIcon,
  CourseLockIcon,
  CoursePlayIcon,
} from "../../public/svgs";
import CourseContentDrawer from "../ui/CourseContentDrawer";
import Link from "next/link";

const CourseContent = ({ isRegistered }) => {
  // Track which course content tab is selected; defaults to "foundation"
  const [selectedTab, setSelectedTab] = useState("foundation");

  return (
    <div className="w-full">
      <div className="text-right justify-center text-primary text-3xl font-bold mb-8">
        محتوي الدورة : إتقان التدريس الفعال
      </div>
      {isRegistered && (
        <Navs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      )}
      {selectedTab == "foundation" && (
        <div className="flex flex-col gap-4">
          <CourseContentDrawer isRegistered={isRegistered} />
          <CourseContentDrawer isRegistered={isRegistered} />
          <CourseContentDrawer isRegistered={isRegistered} />
        </div>
      )}

      {selectedTab == "lectures" && (
        <div className="flex flex-col gap-4">
          <CourseContentDrawer isRegistered={isRegistered} />
          <CourseContentDrawer isRegistered={isRegistered} />
          <CourseContentDrawer isRegistered={isRegistered} />
        </div>
      )}
      {selectedTab == "tests" && (
        <div className="flex flex-col gap-4">
          <TestRow />
          <TestRow />
          <TestRow />
          <TestRow />
          <TestRow />
          <TestRow />
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
    {
      id: "foundation",
      label: "مرحلة التأسيس",
      isActive: true,
    },
    {
      id: "lectures",
      label: "المحاضرات",
      isActive: false,
    },
    {
      id: "tests",
      label: "اختبارات",
      isActive: false,
    },
  ];

  const handleTabClick = (tabId) => {
    setSelectedTab(tabId);
  };

  return (
    <nav
      className="flex w-[762px] mb-6 items-center justify-between p-4 relative bg-[#ebf3fe] rounded-[30px]"
      role="tablist"
      aria-label="Navigation tabs"
    >
      {tabsData.map((tab) => (
        <button
          key={tab.id}
          className={`flex ${
            tab.id === "tests" ? "w-[195px]" : "inline-flex flex-[0_0_auto]"
          } ${
            selectedTab === tab.id
              ? "self-stretch !bg-primary rounded-[20px] font-bold"
              : ""
          } rounded items-center justify-center px-6 py-4 relative transition-colors duration-200  focus:outline-none focus:ring-2 focus:ring-blue-300`}
          onClick={() => handleTabClick(tab.id)}
          role="tab"
          aria-selected={selectedTab === tab.id}
          aria-controls={`${tab.id}-panel`}
          tabIndex={selectedTab === tab.id ? 0 : -1}
        >
          <span
            className={`${
              selectedTab === tab.id ? " text-white" : " text-zinc-500"
            } relative [display:-webkit-box] items-center justify-center w-fit text-2xl text-center leading-[normal] overflow-hidden text-ellipsis [-webkit-line-clamp:1] [-webkit-box-orient:vertical] `}
          >
            {tab.label}
          </span>
        </button>
      ))}
    </nav>
  );
};

export const TestRow = () => {


  const ChevronLeft = (props) => (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.5301 3.47199C17.6791 3.62063 17.7972 3.79719 17.8779 3.99156C17.9585 4.18593 18 4.39429 18 4.60472C18 4.81515 17.9585 5.02351 17.8779 5.21788C17.7972 5.41225 17.6791 5.58881 17.5301 5.73745L11.2961 11.9715L17.5301 18.2055C17.8305 18.5059 17.9993 18.9134 17.9993 19.3382C17.9993 19.7631 17.8305 20.1706 17.5301 20.471C17.2297 20.7714 16.8223 20.9402 16.3974 20.9402C15.9725 20.9402 15.5651 20.7714 15.2647 20.471L7.88987 13.0962C7.74092 12.9475 7.62275 12.771 7.54213 12.5766C7.4615 12.3822 7.42 12.1739 7.42 11.9634C7.42 11.753 7.4615 11.5447 7.54213 11.3503C7.62275 11.1559 7.74092 10.9794 7.88987 10.8307L15.2647 3.45592C15.8752 2.84537 16.9035 2.84537 17.5301 3.47199Z"
        className="fill-primary"
      />
    </svg>
  )


  const TestIcon =  (props) => (
    <svg
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        opacity={0.987}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.1358 0.847673C11.2029 0.821172 15.268 0.848515 19.3311 0.929705C21.072 1.39455 22.1749 2.49741 22.6397 4.2383C22.7296 7.06176 22.7479 9.8873 22.6944 12.7149C22.3631 13.3053 21.8983 13.442 21.2999 13.125C21.1573 13.019 21.0571 12.8823 20.9991 12.7149C20.9967 10.0522 20.9602 7.3907 20.8897 4.73049C20.5372 3.42998 19.6895 2.72816 18.3467 2.62502C14.8467 2.58856 11.3467 2.58856 7.84673 2.62502C6.60013 2.70579 5.77069 3.3347 5.35845 4.51174C5.3021 4.7454 5.26564 4.98238 5.24908 5.22267C5.21262 10.181 5.21262 15.1393 5.24908 20.0977C5.32985 21.3443 5.95876 22.1737 7.1358 22.586C7.36948 22.6423 7.60644 22.6788 7.84673 22.6953C9.30848 22.6968 10.7668 22.7332 12.2217 22.8047C12.6696 23.152 12.7699 23.5804 12.5225 24.0899C12.3987 24.2503 12.2437 24.3688 12.0577 24.4453C10.417 24.4818 8.77642 24.4818 7.1358 24.4453C5.54882 24.1527 4.42772 23.2686 3.77252 21.793C3.68855 21.5593 3.61563 21.3223 3.55377 21.082C3.46324 15.5605 3.44501 10.0371 3.49908 4.51174C3.91908 2.4967 5.13132 1.27534 7.1358 0.847673Z"
className="fill-primary"      />
      <path
        opacity={0.988}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.39373 6.09718C10.6542 6.08804 12.9146 6.09718 15.175 6.12452C15.6662 6.36914 15.8394 6.76108 15.6945 7.3003C15.5943 7.54639 15.4211 7.71959 15.175 7.81983C12.9146 7.85631 10.6541 7.85631 8.39373 7.81983C8.01163 7.66632 7.82935 7.38381 7.84685 6.97218C7.83602 6.55573 8.0183 6.26403 8.39373 6.09718Z"
className="fill-primary"      />
      <path
        opacity={0.991}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.39373 10.4722C11.5292 10.463 14.6646 10.4722 17.8 10.4995C18.2912 10.7441 18.4644 11.1361 18.3195 11.6753C18.2193 11.9214 18.0461 12.0946 17.8 12.1948C14.6646 12.2313 11.5291 12.2313 8.39373 12.1948C8.01163 12.0413 7.82935 11.7588 7.84685 11.3472C7.83602 10.9307 8.0183 10.639 8.39373 10.4722Z"
className="fill-primary"      />
      <path
        opacity={0.986}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.39373 13.9722C10.3261 13.963 12.2584 13.9722 14.1906 13.9995C14.6571 14.2306 14.8303 14.6043 14.7101 15.1206C14.6332 15.398 14.4601 15.5894 14.1906 15.6948C12.2583 15.7313 10.326 15.7313 8.39373 15.6948C8.01163 15.5413 7.82935 15.2588 7.84685 14.8472C7.83602 14.4307 8.0183 14.139 8.39373 13.9722Z"
className="fill-primary"      />
      <path
        opacity={0.963}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.2765 14.8478C21.9922 14.6334 24.0612 15.6724 25.4835 17.965C26.3842 19.791 26.4571 21.6504 25.7023 23.5431C24.3542 26.1363 22.2122 27.3121 19.2765 27.0705C16.3138 26.514 14.5547 24.7549 13.9992 21.7931C13.758 19.0763 14.7879 17.0073 17.089 15.5861C17.7896 15.2341 18.5187 14.9881 19.2765 14.8478ZM20.0421 16.5978C21.9527 16.6999 23.3107 17.6114 24.1164 19.3322C24.7978 21.3558 24.3329 23.0602 22.7218 24.4455C20.9718 25.6486 19.2218 25.6486 17.4718 24.4455C15.9444 23.159 15.4431 21.5457 15.9679 19.6056C16.7034 17.757 18.0615 16.7545 20.0421 16.5978Z"
className="fill-primary"      />
      <path
        opacity={0.979}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.39373 17.4722C9.61523 17.463 10.8366 17.4722 12.0578 17.4995C12.6363 17.7947 12.7912 18.2413 12.5226 18.8394C12.3988 18.9998 12.2438 19.1183 12.0578 19.1948C10.8365 19.2313 9.61506 19.2313 8.39373 19.1948C8.01163 19.0413 7.82935 18.7588 7.84685 18.3472C7.83602 17.9307 8.0183 17.639 8.39373 17.4722Z"
className="fill-primary"      />
      <path
        opacity={0.957}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.7388 19.0586C22.6427 19.1891 22.9253 19.6813 22.5864 20.5352C21.719 21.4209 20.8349 22.2867 19.9341 23.1328C19.6161 23.2514 19.3062 23.2332 19.0044 23.0781C18.4629 22.5733 17.9617 22.0356 17.5005 21.4648C17.4006 20.4894 17.829 20.1157 18.7857 20.3438C19.0482 20.5515 19.2943 20.7794 19.5239 21.0273C20.1164 20.4349 20.7089 19.8424 21.3013 19.25C21.4466 19.1692 21.5925 19.1054 21.7388 19.0586Z"
className="fill-primary"      />
    </svg>
  );


  return (
    <Link href={"/mock-test/123"} className="flex items-center group hover:shadow-2xl cursor-pointer duration-75 !transition-all justify-between px-6 py-8 relative bg-white rounded-[20px] border-2 border-solid border-zinc-500">

      <div className="items-end gap-2 inline-flex relative duration-75 !transition-all flex-[0_0_auto]">
      <TestIcon />
        <p className=" group-hover:text-primary !transition-all duration-75   font-medium text-text text-base relative flex items-center justify-center w-fit mt-[-1.00px] tracking-[0] leading-[normal] ">
          الأختبار الأول : مدخل إلى التدريس الفعال
        </p>

      </div>
      <div className="items-center gap-4 inline-flex relative flex-[0_0_auto]">

        <div className=" font-bold text-primary text-lg relative flex items-center justify-center w-fit mt-[-1.00px] tracking-[0] leading-[normal] ">
          ( اختبار محاكي )
        </div>
        <div className="relative w-6 h-6  aspect-[1]">
        <ChevronLeft />
        </div>
      </div>
    </Link>
  );
};
