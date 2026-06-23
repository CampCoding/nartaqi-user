import React from "react";
import { EyeIcon, MessageIcon } from "../../../public/svgs";
import { formatDate } from "../../utils/helpers/date.js";

export const BlogCard = ({
  freeWidth = false,
  handleBlogClick = () => { },
  item = {},
  onClick,
}) => {
  const {
    id,
    image,
    title,
    content,
    published_at,
    views,
    comments_count,
    image_url,
  } = item;

  const width = freeWidth
    ? "w-full"
    : "w-full sm:w-[380px] md:w-[420px] lg:w-[440px]";

  return (
    <article
      className={`flex flex-col ${width} items-start relative bg-white rounded-xl sm:rounded-2xl md:rounded-[25px] lg:rounded-[30px] shadow-md sm:shadow-lg md:shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl`}
    >
      {/* Header */}
      <header
        className="relative w-full h-[140px] sm:h-[160px] md:h-[180px] lg:h-[220px] bg-cover bg-center"
        style={{ backgroundImage: `url('${image_url || ""}')` }}
      >
        <time className="inline-flex font-semibold items-center justify-center px-2.5 sm:px-3 py-1 sm:py-1.5 absolute top-2 sm:top-3 right-2 sm:right-3 bg-white rounded-xl sm:rounded-2xl text-secondary text-[10px] sm:text-xs shadow-md">
          {formatDate(published_at)}
        </time>
      </header>

      {/* Content */}
      <div className="flex flex-col items-start gap-2 pt-2.5 sm:pt-3 md:pt-4 pb-2 w-full">
        <div className="flex flex-col items-start gap-2 sm:gap-3 pb-2 px-2.5 sm:px-3 md:px-4 lg:px-5 w-full border-b border-neutral-200">
          <button
            type="button"
            onClick={onClick ?? (() => handleBlogClick(id))}
            className="w-full text-right"
          >
            <h1 className="font-bold text-primary text-sm sm:text-base md:text-lg lg:text-xl leading-5 sm:leading-6 line-clamp-1">
              {title}
            </h1>
          </button>

          <p
            className="text-text-alt text-xs sm:text-sm md:text-[15px] lg:text-base leading-4 sm:leading-5 line-clamp-2 md:line-clamp-3 w-full"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        {/* Footer */}
        <footer className="flex justify-center sm:justify-end items-center gap-3 sm:gap-4 md:gap-5 p-2.5 sm:p-3 md:p-4 w-full px-2.5 sm:px-3 md:px-4 lg:px-5">
          <div className="inline-flex items-center gap-1 sm:gap-1.5 md:gap-2">
            <span className="text-[#2d2d2d] text-xs sm:text-sm md:text-[15px] lg:text-base font-medium">
              {views?.toLocaleString()}
            </span>
            <EyeIcon className="stroke-primary w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </div>

          <div className="inline-flex items-center gap-1 sm:gap-1.5 md:gap-2">
            <span className="text-[#2d2d2d] text-xs sm:text-sm md:text-[15px] lg:text-base font-medium">
              {comments_count}
            </span>
            <MessageIcon className="stroke-primary w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </div>
        </footer>
      </div>
    </article>
  );
};