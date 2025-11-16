import React from "react";
import { EyeIcon, MessageIcon } from "../../../public/svgs";
import { formatDate } from "../../utils/helpers/date.js";

export const BlogCard = ({
  freeWidth = false,
  handleBlogClick = () => {},
  item = {}, // ⬅ important (fix)
  onClick, // ⬅ allow click override
}) => {
  const { id, image, title, content, published_at, views, comments_count } =
    item;

  const width = freeWidth
    ? "w-full"
    : "w-full sm:w-[380px] md:w-[420px] lg:w-[440px]";

  return (
    <article
      className={`flex flex-col ${width} items-start relative bg-white rounded-2xl sm:rounded-[25px] md:rounded-[30px] shadow-lg sm:shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl`}
    >
      {/* Header */}
      <header
        className="relative w-full h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px] bg-cover bg-center"
        style={{ backgroundImage: `url('${image || ""}')` }}
      >
        <time className="inline-flex font-semibold items-center justify-center px-3 py-1.5 absolute top-3 right-3 bg-white rounded-2xl text-secondary text-xs shadow-md">
          {formatDate(published_at)}
        </time>
      </header>

      {/* Content */}
      <div className="flex flex-col items-start gap-2 pt-3 pb-2 w-full sm:pt-4">
        <div className="flex flex-col items-start gap-3 pb-2 px-3 w-full border-b border-neutral-200 sm:px-4 md:px-5">
          <button
            type="button"
            onClick={onClick ?? (() => handleBlogClick(id))} // ⬅ priority for parent click
          >
            <h1 className="font-bold text-primary text-base sm:text-lg md:text-xl leading-6 line-clamp-2">
              {title}
            </h1>
          </button>

          <p className="text-text-alt text-sm sm:text-[15px] md:text-base leading-5 line-clamp-2 md:line-clamp-3">
            {content}
          </p>
        </div>

        {/* Footer */}
        <footer className="flex justify-center sm:justify-end items-center gap-4 p-3 w-full sm:gap-5 sm:p-4 md:px-5">
          {/* Views */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2">
            <span className="text-[#2d2d2d] text-sm sm:text-[15px] md:text-base font-medium">
              {views?.toLocaleString()}
            </span>
            <EyeIcon className="stroke-primary w-5 h-5 md:w-6 md:h-6" />
          </div>

          {/* Comments */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2">
            <span className="text-[#2d2d2d] text-sm sm:text-[15px] md:text-base font-medium">
              {comments_count}
            </span>
            <MessageIcon className="stroke-primary w-5 h-5 md:w-6 md:h-6" />
          </div>
        </footer>
      </div>
    </article>
  );
};
