import React from "react";

const CoursesCategoryCardMobile = ({
  data,
  freeWidth = false,
  color = "secondary",
}) => {
  const width = freeWidth ? "w-[100%]" : "w-[177px]";

  // Color mapping for Tailwind classes
  const colorClasses = {
    secondary: {
      hover: "active:bg-secondary",
      fill: "fill-secondary",
      fillHover: "active:fill-white",
    },
    primary: {
      hover: "active:bg-primary",
      fill: "fill-primary",
      fillHover: "active:fill-white",
    },
    warning: {
      hover: "active:bg-warning",
      fill: "fill-warning",
      fillHover: "active:fill-white",
    },
  };

  const currentColor = colorClasses[color] || colorClasses.secondary;

  return (
    <article
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(0,0,0,1) 100%), url('${data?.image}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className={`group flex flex-col ${width} h-[200px] items-start justify-end gap-2.5 px-2 py-4 relative rounded-[20px] cursor-pointer shadow-lg active:shadow-2xl transition-all duration-300`}
    >
      {/* Content Container */}
      <div className="flex items-end justify-between w-full">
        {/* Text Content */}
        <div className="flex flex-col items-start justify-end gap-1 flex-1">
          <h2 className="relative text-white font-bold w-fit font-semibold text-sm text-right leading-tight">
            {data?.title || "التحصيلي"}
          </h2>

          <p className="relative w-fit font-semibold text-[#fdd4b7] text-xs text-right leading-tight whitespace-nowrap">
            {data?.courses || 0} دورة
          </p>
        </div>

        {/* Chevron Button */}
        <div
          className={`group-active:scale-125 ${currentColor.hover} cursor-pointer transition-all duration-300 flex min-w-[32px] min-h-[32px] items-center justify-center gap-[5.8px] p-2 relative bg-white rounded-full overflow-hidden shadow-md aspect-[1]`}
        >
          <div className="relative w-4 h-4 aspect-[1]">
            <ChevronLeft
              className={`${currentColor.fill} ${currentColor.fillHover} transition-all duration-300`}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default CoursesCategoryCardMobile;

const ChevronLeft = (props) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M16.6447 5.36833C16.7573 5.48432 16.8467 5.62211 16.9077 5.77379C16.9686 5.92547 17 6.08807 17 6.25228C17 6.41649 16.9686 6.57909 16.9077 6.73077C16.8467 6.88245 16.7573 7.02023 16.6447 7.13623L11.9309 12.0011L16.6447 16.866C16.8719 17.1004 16.9995 17.4184 16.9995 17.7499C16.9995 18.0815 16.8719 18.3994 16.6447 18.6339C16.4175 18.8683 16.1095 19 15.7882 19C15.4669 19 15.1589 18.8683 14.9317 18.6339L9.35529 12.8788C9.24266 12.7628 9.15331 12.625 9.09235 12.4733C9.03138 12.3216 9 12.159 9 11.9948C9 11.8306 9.03138 11.668 9.09235 11.5163C9.15331 11.3647 9.24266 11.2269 9.35529 11.1109L14.9317 5.35579C15.3934 4.87933 16.1709 4.87933 16.6447 5.36833Z" />
  </svg>
);
