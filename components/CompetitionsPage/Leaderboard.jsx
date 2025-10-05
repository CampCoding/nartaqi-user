"use client";
import React, { useState } from "react";
import { Rank } from "../ui/Cards/FirstsCard";

const Leaderboard = () => {
  return (
    <section className="w-full min-w-[1440px] min-h-[670px] pt-[48px] flex flex-col items-center bg-[url('/images/Leaderboard-section-background.png')] bg-cover bg-center">
      <Navs />

      <div className="flex items-center mt-[32px] ">
        <div className="scale-90">
          <LeaderCard
            color="#CD7F32"
            icon={<UserIcon bgFill={"#FFE7D0"} iconFill={"#CD7F32"} />}
          />
        </div>
        <div className="">
          <LeaderCard color="" icon={<UserIcon />} />
        </div>
        <div className="scale-90">
          <LeaderCard
            color="#C0C0C0"
            icon={<UserIcon bgFill={"#F0F0F0"} iconFill={"#C0C0C0"} />}
          />
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;

export const Navs = () => {
  const [activeTab, setActiveTab] = useState("daily");

  const tabData = [
    { id: "monthly", label: "شهرية", isActive: false },
    { id: "weekly", label: "أسبوعية", isActive: false },
    { id: "daily", label: "يومية", isActive: true },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="flex w-[1312px] h-fit mx-auto justify-between items-center relative">
      <h1 className="flex text-primary font-bold text-3xl leading-10 relative items-center justify-center w-fit  text-center whitespace-nowrap [direction:rtl]">
        لوحة المتصدرين
      </h1>
      <div className="inline-flex justify-end px-6 py-4 flex-[0_0_auto] mt-[-1.00px] mb-[-1.00px] ml-[-1.00px] bg-primary-light rounded-[30px] border-0 border-none items-center relative border-variable-collection-stroke">
        {tabData.reverse().map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`${
              tab.id === "monthly" && false ? "px-8" : "px-16"
            } py-${
              activeTab === tab.id ? "5" : "4"
            } rounded-[20px] inline-flex items-center justify-center relative flex-[0_0_auto] ${
              activeTab === tab.id ? "bg-primary" : ""
            }`}
            role="tab"
            aria-selected={activeTab === tab.id}
            tabIndex={0}
          >
            <div
              className={`[display:-webkit-box] justify-center w-fit  ${
                activeTab === tab.id ? "text-white" : "text-text"
              } text-xl text-center  whitespace-nowrap overflow-hidden text-ellipsis [-webkit-line-clamp:1] [-webkit-box-orient:vertical] [direction:rtl] items-center relative`}
            >
              {tab.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export const LeaderCard = ({ icon, color }) => {
  const userData = {
    name: "أحمد محمد الفاروق",
    points: "350 نقطة",
    rank: "المركز الأول",
  };

  return (
    <div className="relative w-[305px] flex items-center justify-center h-[430px] bg-white rounded-[40px]">
      <div className="absolute w-6 h-6 top-6  right-[17px]">
        <div className="absolute w-[22px] h-[18px] top-[3px] left-px">
          <Rank className="stroke-warning" />
        </div>
      </div>
      <div className="flex flex-col items-center w-[289px]  gap-8 relative ">
        <div className="relative flex items-center justify-center  w-full h-40">
          {icon}
        </div>
        <div className="flex flex-col w-[234px] items-center gap-4 relative flex-[0_0_auto]">
          <div className="flex flex-col w-[234px] items-center justify-center gap-4 relative flex-[0_0_auto]">
            <div className="flex flex-col items-start gap-1 relative self-stretch w-full flex-[0_0_auto]">
              <div className="mt-[-1.00px]  text-text font-bold text-xl leading-7 relative flex items-center justify-center self-stretch text-center [direction:rtl]">
                {userData.name}
              </div>
              <div className=" text-zinc-500 text-base leading-6 relative flex items-center justify-center self-stretch text-center [direction:rtl]">
                {userData.points}
              </div>
            </div>
          </div>
          <div
            style={{
              color: color || "#f4a625",
            }}
            className={`  font-bold text-2xl leading-8 relative flex items-center justify-center self-stretch text-center [direction:rtl]`}
          >
            {userData.rank}
          </div>
        </div>
      </div>
    </div>
  );
};

const UserIcon = ({ bgFill, iconFill, ...props }) => (
  <svg
    width={160}
    height={160}
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_47_36297)">
      <rect width={160} height={160} rx={80} fill={bgFill || "#FCF1DE"} />
      <rect
        x={48}
        y={26}
        width={64}
        height={64}
        rx={32}
        fill={iconFill || "#FFCB14"}
      />
      <rect
        x={-40}
        y={107}
        width={240}
        height={240}
        rx={120}
        fill={iconFill || "#FFCB14"}
      />
    </g>
    <defs>
      <clipPath id="clip0_47_36297">
        <rect width={160} height={160} rx={80} fill="white" />
      </clipPath>
    </defs>
  </svg>
);
