"use client";
import React, { useState } from "react";
import { Rank } from "../ui/Cards/FirstsCard";
import Container from "../ui/Container";

const Leaderboard = () => {
  return (
    <div className="w-full min-h-[400px]  sm:min-h-[600px] lg:min-h-[670px] pt-8 sm:pt-12 lg:pt-[48px]  bg-[url('/images/Leaderboard-section-background.png')] bg-cover bg-center px-4 sm:px-6 lg:px-0">
      <Container className={"flex flex-col items-center"}>
        <Navs />

        <div className="flex flex-col md:flex-row items-center justify-center mt-6 pb-4 md:mt-8 lg:mt-[32px] gap-4 md:gap-2 lg:gap-0 w-full max-w-[1000px]">
          <div className="w-full md:scale-90 order-2 md:order-1">
            <LeaderCard
              color="#C0C0C0"
              icon={<UserIcon bgFill={"#F0F0F0"} iconFill={"#C0C0C0"} />}
              rank={"المركز الثاني"}
            />
          </div>
          <div className="w-full md:scale-100 order-1 md:order-2">
            <LeaderCard
              color="#FFCB14"
              icon={<UserIcon />}
              rank={"المركز الاول"}
            />
          </div>
          <div className="w-full md:scale-90 order-3">
            <LeaderCard
              color="#CD7F32"
              icon={<UserIcon bgFill={"#FFE7D0"} iconFill={"#CD7F32"} />}
              rank={"المركز الثالث"}
            />
          </div>
        </div>
      </Container>
    </div>
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
    <div className="flex flex-col lg:flex-row w-full  mx-auto justify-between items-center gap-4 lg:gap-0 relative ">
      <h1 className="flex text-primary font-bold text-xl sm:text-2xl lg:text-3xl leading-tight relative items-center justify-center w-fit text-center [direction:rtl] order-2 lg:order-1">
        لوحة المتصدرين
      </h1>

      <div className="inline-flex justify-center lg:justify-end px-4 sm:px-6 py-3 sm:py-4 flex-[0_0_auto] bg-primary-light rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] border-0 border-none items-center relative order-1 lg:order-2 w-full sm:w-auto overflow-x-auto scrollbar-hide hidden-scroll">
        <div className="flex items-center gap-1 sm:gap-2 min-w-max">
          {tabData.reverse().map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`px-4 sm:px-8 lg:px-16 py-3 sm:py-4 lg:py-${
                activeTab === tab.id ? "5" : "4"
              } rounded-[15px] sm:rounded-[20px] inline-flex items-center justify-center relative flex-shrink-0 transition-all duration-200 ${
                activeTab === tab.id ? "bg-primary" : "hover:bg-primary/10"
              }`}
              role="tab"
              aria-selected={activeTab === tab.id}
              tabIndex={0}
            >
              <div
                className={`[display:-webkit-box] justify-center w-fit ${
                  activeTab === tab.id ? "text-white font-bold" : "text-text"
                } text-sm sm:text-lg lg:text-xl text-center whitespace-nowrap overflow-hidden text-ellipsis [-webkit-line-clamp:1] [-webkit-box-orient:vertical] [direction:rtl] items-center relative`}
              >
                {tab.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const LeaderCard = ({ icon, color, rank }) => {
  const userData = {
    name: "أحمد محمد الفاروق",
    points: "350 نقطة",
    rank: rank,
  };

  return (
    <div
      style={{
        boxShadow: `0px 0px 50px 10px ${color}70`,
      }}
      className={`relative w-full max-w-[300px] sm:max-w-[unset] sm:w-[300px] md:w-[250px] lg:w-[305px] flex items-center justify-center h-[350px] sm:h-[400px] lg:h-[430px] bg-white rounded-[30px] sm:rounded-[35px] lg:rounded-[40px] mx-auto `}
    >
      <div className="absolute w-5 h-5 sm:w-6 sm:h-6 top-4 sm:top-5 lg:top-6 right-[15px] sm:right-[16px] lg:right-[17px]">
        <div className="absolute w-[18px] h-[15px] sm:w-[20px] sm:h-[16px] lg:w-[22px] lg:h-[18px] top-[2px] sm:top-[2.5px] lg:top-[3px] left-px">
          <Rank
            style={{
              stroke: color || "#f4a625",
            }}
          />
        </div>
      </div>

      <div className="flex flex-col items-center w-full sm:w-[260px] lg:w-[289px] gap-6 sm:gap-7 lg:gap-8 relative">
        <div className="relative flex items-center justify-center w-full h-32 sm:h-36 lg:h-40">
          <div className="scale-75 sm:scale-90 lg:scale-100">{icon}</div>
        </div>

        <div className="flex flex-col w-[200px] sm:w-[220px] lg:w-[234px] items-center gap-3 sm:gap-4 relative flex-[0_0_auto]">
          <div className="flex flex-col w-full items-center justify-center gap-3 sm:gap-4 relative flex-[0_0_auto]">
            <div className="flex flex-col items-start gap-1 relative self-stretch w-full flex-[0_0_auto]">
              <div className="text-text font-bold text-base sm:text-lg lg:text-xl leading-6 sm:leading-7 relative flex items-center justify-center self-stretch text-center [direction:rtl]">
                {userData.name}
              </div>
              <div className="text-zinc-500 text-sm sm:text-base leading-5 sm:leading-6 relative flex items-center justify-center self-stretch text-center [direction:rtl]">
                {userData.points}
              </div>
            </div>
          </div>

          <div
            style={{
              color: color || "#f4a625",
            }}
            className="font-bold text-lg sm:text-xl md:text-2xl leading-7 sm:leading-8 relative flex items-center justify-center self-stretch text-center [direction:rtl]"
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
    width={120}
    height={120}
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] lg:w-[160px] lg:h-[160px]"
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
