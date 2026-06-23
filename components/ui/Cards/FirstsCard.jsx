import React from "react";

export const Rank = (props) => (
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.83496 20H19.835M2.83496 4L5.83496 16H19.835L22.835 4L16.835 11L12.835 4L8.83496 11L2.83496 4Z"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FirstsCard = ({ data, icon }) => {
  return (
    <div
      style={{
        boxShadow: `0px 4px 20px 10px ${icon?.icon}50`,
      }}
      className="relative w-full sm:w-[260px] md:w-[280px] lg:w-[305px] h-[360px] sm:h-[400px] md:h-[430px] flex flex-col items-center bg-white rounded-[28px] sm:rounded-[32px] md:rounded-[40px] shadow-2xl mx-auto"
    >
      <div className="flex flex-col w-full px-4 sm:px-6 md:w-[289px] items-center gap-5 sm:gap-7 md:gap-8 relative top-[35px] sm:top-[42px] md:top-[49px]">
        {/* Icon Section */}
        <div className="relative self-stretch w-full h-32 sm:h-36 md:h-40">
          <div
            className="absolute w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 top-0 left-1/2 -translate-x-1/2 rounded-full overflow-hidden"
            style={{
              backgroundColor: icon?.bg,
            }}
          >
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 top-[20px] sm:top-[24px] md:top-[26px] left-[36px] sm:left-[42px] md:left-12 rounded-full absolute"
              style={{
                backgroundColor: icon?.icon,
              }}
            />
            <div
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 top-[85px] sm:top-[100px] md:top-[107px] -left-8 sm:-left-9 md:-left-10 rounded-full absolute"
              style={{
                backgroundColor: icon?.icon,
              }}
            />
          </div>

          {/* Rank Icon */}
          <div className="absolute w-5 h-5 sm:w-6 sm:h-6 top-0 right-2 sm:right-4 md:right-0 md:left-[247px]">
            <div className="absolute w-[18px] h-[15px] sm:w-[22px] sm:h-[18px] top-[2px] sm:top-[3px] left-px">
              <Rank stroke={icon?.icon} className="w-full h-full" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col w-full sm:w-[220px] md:w-[234px] items-center gap-3 sm:gap-4 relative flex-[0_0_auto]">
          <div className="flex flex-col w-full items-center justify-center gap-3 sm:gap-4 relative flex-[0_0_auto]">
            <div className="flex flex-col items-start gap-1 relative self-stretch w-full flex-[0_0_auto]">
              <div className="mt-[-1.00px] font-bold text-[#2d2d2d] text-base sm:text-lg md:text-xl leading-6 sm:leading-7 relative self-stretch text-center line-clamp-1">
                {data?.name}
              </div>
              <div className="text-text-alt text-sm sm:text-base leading-5 sm:leading-6 relative self-stretch text-center line-clamp-1">
                {data?.title}
              </div>
            </div>
            <p className="text-[#1d242d] text-[11px] sm:text-xs leading-4 sm:leading-5 relative self-stretch text-center line-clamp-2 min-h-[32px] sm:min-h-[40px]">
              {data?.note}
            </p>
          </div>
          <div
            style={{ color: icon?.icon }}
            className="text-xl sm:text-2xl font-bold leading-7 sm:leading-8 relative self-stretch text-center"
          >
            {data?.percentage}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstsCard;