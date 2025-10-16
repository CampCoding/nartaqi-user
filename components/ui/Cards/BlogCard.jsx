import React from "react";
import { EyeIcon, MessageIcon } from "../../../public/svgs";

export const BlogCard = ({
  image = "/FRAME.png",
  date = "Aug 5, 2025",
  title = "تقنيات دراسية فعالة للطلاب المشغولين",
  description = "اكتشف طرق دراسة بسيطة وفعالة لمساعدتك على البقاء منتجا وتحقيق نتائج أفضل في وقت أقل",
  comments = 12,
  views = 1248,
  freeWidth = false,
}) => {
  const width = freeWidth
    ? "w-full"
    : "w-full sm:w-[380px] md:w-[420px] lg:w-[440px]";

  return (
    <article
      className={`flex flex-col ${width} items-start relative bg-white rounded-2xl sm:rounded-[25px] md:rounded-[30px] shadow-lg sm:shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl`}
    >
      {/* 🖼 Header with background image + date badge */}
      <header
        className="relative self-stretch w-full h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px] bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
      >
        <time className="inline-flex font-semibold items-center justify-center gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2 absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-4 bg-white rounded-2xl sm:rounded-[25px] md:rounded-[30px] text-secondary text-xs sm:text-sm shadow-md">
          {date}
        </time>
      </header>

      {/* 📄 Content */}
      <div className="flex flex-col items-start gap-2 pt-3 pb-2 px-0 relative self-stretch w-full sm:pt-4">
        <div className="flex flex-col items-start gap-3 pb-2 px-3 relative self-stretch w-full border-b border-neutral-200 sm:gap-4 sm:px-4 md:px-5">
          <h1 className="self-stretch font-bold text-primary text-base leading-6 sm:text-lg sm:leading-7 md:text-xl md:leading-7 line-clamp-2">
            {title}
          </h1>
          <p className="self-stretch text-text-alt text-sm leading-5 sm:text-[15px] sm:leading-[21px] md:text-base md:leading-[22.8px] line-clamp-2 md:line-clamp-3">
            {description}
          </p>
        </div>

        {/* 📊 Footer with stats */}
        <footer className="flex justify-center items-center gap-4 p-3 self-stretch w-full sm:justify-end sm:gap-5 sm:p-4 md:px-5">
          {/* Views */}
          <div
            className="inline-flex items-center gap-1.5 sm:gap-2"
            role="group"
            aria-label="Views count"
          >
            <span className="text-[#2d2d2d] text-sm leading-5 whitespace-nowrap sm:text-[15px] md:text-base font-medium">
              {views.toLocaleString()}
            </span>
            <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 flex items-center justify-center">
              <EyeIcon className="stroke-primary w-full h-full" />
            </div>
          </div>

          {/* Comments */}
          <div
            className="inline-flex items-center gap-1.5 sm:gap-2"
            role="group"
            aria-label="Comments count"
          >
            <span className="text-[#2d2d2d] text-sm leading-5 whitespace-nowrap sm:text-[15px] md:text-base font-medium">
              {comments}
            </span>
            <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 flex items-center justify-center">
              <MessageIcon className="stroke-primary w-full h-full" />
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
};
