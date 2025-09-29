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
  const width = freeWidth ? "w-full" : "w-[420px]";

  return (
    <article
      className={`flex flex-col ${width} items-start relative bg-white rounded-[30px] shadow-xl overflow-hidden`}
    >
      {/* 🖼 Header with background image + date badge */}
      <header
        className="relative self-stretch w-full h-[200px] bg-cover bg-[50%_50%]"
        style={{ backgroundImage: `url('${image}')` }}
      >
        <time className="inline-flex font-[600] items-center justify-center gap-2.5 px-4 py-2 absolute top-6 right-4 bg-white rounded-[30px]  text-secondary text-sm">
          {date}
        </time>
      </header>

      {/* 📄 Content */}
      <div className="flex flex-col items-start gap-2 pt-4 pb-2 px-0 relative self-stretch w-full">
        <div className="flex flex-col items-start gap-4 pb-2 px-4 relative self-stretch w-full border-b border-neutral-200">
          <h1 className="self-stretch font-bold text-primary text-xl leading-7 ">
            {title}
          </h1>
          <p className="self-stretch text-text-alt text-base leading-[22.8px] ">
            {description}
          </p>
        </div>

        {/* 📊 Footer with stats */}
        <footer className="flex justify-end items-center gap-5 p-4 self-stretch w-full">
          {/* Views */}
          <div
            className="inline-flex h-5 items-center gap-2"
            role="group"
            aria-label="Views count"
          >
            <span className="text-[#2d2d2d] text-base leading-5 whitespace-nowrap">
              {views.toLocaleString()}
            </span>
            <div className="w-6 h-6 flex items-center justify-center">
              <EyeIcon className="stroke-primary" />
            </div>
          </div>

          {/* Comments */}
          <div
            className="inline-flex h-5 items-center gap-2"
            role="group"
            aria-label="Comments count"
          >
            <span className="text-[#2d2d2d] text-base leading-5 whitespace-nowrap">
              {comments}
            </span>
            <div className="w-6 h-6 flex items-center justify-center">
              <MessageIcon className="stroke-primary" />
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
};
