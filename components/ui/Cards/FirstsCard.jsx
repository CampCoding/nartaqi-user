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
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);



const FirstsCard = ({ data, icon }) => {
  return (
    <div>
      <Frame data={data} icon={icon} />
    </div>
  );
};

export default FirstsCard;

const Frame = ({ data, icon }) => {
  return (
    <div style={{
      boxShadow: `0px 4px 20px 10px ${icon?.icon}50`,
      
    }} className="relative w-[305px] h-[430px] flex flex-col items-center bg-white rounded-[40px] shadow-2xl">
      <div className="flex flex-col w-[289px] items-center gap-8 relative top-[49px] ">
        <div className="relative self-stretch w-full h-40">
          <div className={`absolute w-40 h-40 top-0 left-[65px] rounded-[80px] overflow-hidden`} style={{
            backgroundColor: icon?.bg,
          }}>
            <div className={`w-16 h-16 top-[26px] left-12 rounded-[64px] absolute `} style={{
              backgroundColor: icon?.icon,
            }} />
            <div className={`w-60 h-60 top-[107px] -left-10 rounded-[240px] absolute `} style={{
              backgroundColor: icon?.icon,
            }} />
          </div>
          <div className="absolute w-6 h-6 top-0 left-[247px]">
            <div className="absolute w-[22px] h-[18px] top-[3px] left-px">
              <Rank stroke={icon?.icon} />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[234px] items-center gap-4 relative flex-[0_0_auto]">
          <div className="flex flex-col w-[234px] items-center justify-center gap-4 relative flex-[0_0_auto]">
            <div className="flex flex-col items-start gap-1 relative self-stretch w-full flex-[0_0_auto]">
              <div className="mt-[-1.00px] font-bold text-[#2d2d2d] text-xl leading-7  relative self-stretch text-center">
                {data?.name}
              </div>
              <div className=" text-text-alt text-base leading-6  relative self-stretch text-center">
                {data?.title}
              </div>
            </div>
            <p className=" text-[#1d242d] text-xs leading-5  relative self-stretch text-center">
              {data?.note}
            </p>
          </div>
          <div style={{ color: icon?.icon }} className={` text-2xl font-bold leading-8 relative self-stretch text-center`}>
            {data?.percentage}
          </div>
        </div>
      </div>
    </div>
  );
};
