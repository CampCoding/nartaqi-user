import React from "react";

const CoursesCategoryCard = ({
  data,
  color = "secondary",
  freeWidth = false,
}) => {
  const colorClasses = {
    secondary: {
      hover: "group-hover:bg-secondary",
      fill: "fill-secondary",
      fillHover: "group-hover:fill-white",
    },
    primary: {
      hover: "group-hover:bg-primary",
      fill: "fill-primary",
      fillHover: "group-hover:fill-white",
    },
    warning: {
      hover: "group-hover:bg-warning",
      fill: "fill-warning",
      fillHover: "group-hover:fill-white",
    },
  };

  const currentColor = colorClasses[color] || colorClasses.secondary;

  return (
    <div
      className={`group relative cursor-pointer ${freeWidth ? "w-full" : "w-full max-w-[267px]"
        } h-[320px] md:h-[360px] lg:h-[400px] rounded-[16px] md:rounded-[20px] shadow-2xl bg-[linear-gradient(180deg,rgba(0,0,0,0)_60%,rgba(0,0,0,1)_100%)]`}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 100%), url('${data?.image}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex absolute bottom-4 md:bottom-5 items-center justify-between px-3 md:px-4 lg:px-[20px] w-full">
        <div className="flex flex-col items-start gap-1 relative min-w-0 flex-1">
          <div className="relative w-full max-w-[160px] md:max-w-[180px] lg:max-w-[200px] truncate mt-[-0.58px] font-semibold text-bg text-sm md:text-base text-right leading-[18px] md:leading-[19.2px]">
            {data?.title}
          </div>

          <div className="relative w-fit font-semibold text-[#fdd4b7] text-xs md:text-sm text-left leading-[18px] md:leading-[21px] whitespace-nowrap">
            {data?.courses} دورة
          </div>
        </div>

        <div
          className={`group-hover:scale-125 ${currentColor.hover} cursor-pointer transition-all duration-300 flex min-w-[32px] min-h-[32px] md:min-w-[36px] md:min-h-[36px] lg:min-w-[40px] lg:min-h-[40px] items-center justify-center gap-[5.8px] p-[8px] md:p-[10px] lg:p-[11.61px] relative bg-white rounded-full overflow-hidden shadow-[0px_2.32px_2.32px_#00000040] aspect-[1] flex-shrink-0`}
        >
          <div className="relative w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 aspect-[1]">
            <ChevronLeft
              className={`${currentColor.fill} ${currentColor.fillHover} transition-all duration-300 w-full h-full`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesCategoryCard;

const ChevronLeft = (props) => (
  <svg
    width={25}
    height={24}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M16.6447 5.36833C16.7573 5.48432 16.8467 5.62211 16.9077 5.77379C16.9686 5.92547 17 6.08807 17 6.25228C17 6.41649 16.9686 6.57909 16.9077 6.73077C16.8467 6.88245 16.7573 7.02023 16.6447 7.13623L11.9309 12.0011L16.6447 16.866C16.8719 17.1004 16.9995 17.4184 16.9995 17.7499C16.9995 18.0815 16.8719 18.3994 16.6447 18.6339C16.4175 18.8683 16.1095 19 15.7882 19C15.4669 19 15.1589 18.8683 14.9317 18.6339L9.35529 12.8788C9.24266 12.7628 9.15331 12.625 9.09235 12.4733C9.03138 12.3216 9 12.159 9 11.9948C9 11.8306 9.03138 11.668 9.09235 11.5163C9.15331 11.3647 9.24266 11.2269 9.35529 11.1109L14.9317 5.35579C15.3934 4.87933 16.1709 4.87933 16.6447 5.36833Z" />
  </svg>
);