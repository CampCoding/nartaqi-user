"use client";

import {
  CheckListIcon,
  DownloadIcon,
  FileIcon,
  LiveIcon,
  LockIcon2,
  RoundedPlayIcon,
} from "./../../public/svgs";
import React, { useState, useId } from "react";
import {
  CourseChevronTopIcon,
  CourseLockIcon,
  CoursePlayIcon,
} from "../../public/svgs";
import cx from "../../lib/cx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const CourseContentDrawer = ({ isRegistered, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handlePlay = (video) => {
    if (video.free === "0" && !isRegistered) {
      alert("هذا الدرس مقفل 🔒");
      return;
    }
    console.log("تشغيل الفيديو:", video.title);
  };

  // تنسيق الوقت
  const formatTime = (seconds) => {
    if (!seconds) return "غير محدد";
    const mins = Math.floor(seconds / 60);
    return `${mins} دقيقة`;
  };

  return (
    <div
      className={cx(
        "self-stretch w-full transition-all bg-white rounded-xl md:rounded-[20px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)] outline outline-2 outline-offset-[-1px] outline-neutral-300 inline-flex flex-col justify-start items-start",
        !isOpen ? "hover:shadow-2xl" : "shadow-xl"
      )}
    >
      {/* Header */}
      <div
        className="self-stretch px-4 md:px-6 py-4 md:py-[24px] inline-flex justify-between items-start cursor-pointer"
        onClick={handleToggle}
      >
        <div className="text-right justify-center text-text text-sm md:text-base font-bold">
          {content.content_title || "غير محدد"}
        </div>
        <div
          className={`md:w-6 md:h-6 transition-transform duration-300 ${
            !isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <CourseChevronTopIcon
            className={
              "w-[20px] h-[20px] md:w-[24px] md:h-[24px] !fill-primary"
            }
          />
        </div>
      </div>

      {/* Body */}
      {isOpen &&
        (isRegistered ? (
          <div className="w-full flex flex-col gap-3 sm:gap-4 px-4 md:px-6 pb-4 md:pb-[24px]">
            {content.lessons.map((lesson) => (
              <RegLectureDrawer key={lesson.id} lesson={lesson} isDone={true} />
            ))}
          </div>
        ) : (
          <div className="self-stretch flex flex-col justify-start items-start gap-6 px-4 md:px-6 pb-4 md:pb-[24px]">
            {content.lessons.flatMap((lesson) =>
              lesson.videos.map((video) => (
                <div
                  key={video.id}
                  className="self-stretch inline-flex justify-between items-start gap-3"
                >
                  <div
                    className="flex justify-start items-center gap-2 cursor-pointer"
                    onClick={() => handlePlay(video)}
                  >
                    <CoursePlayIcon className={"stroke-primary"} />
                    <div className="text-right justify-center text-text text-sm md:text-base font-medium">
                      {video.title || "غير محدد"}
                    </div>
                  </div>
                  <div className="flex justify-start items-center gap-4">
                    <div className="text-right whitespace-nowrap justify-center text-text text-xs md:text-sm font-medium">
                      {formatTime(video.time)}
                    </div>
                    {video.free === "0" && <CourseLockIcon />}
                  </div>
                </div>
              ))
            )}
          </div>
        ))}
    </div>
  );
};

export default CourseContentDrawer;

export const RegLectureDrawer = ({ lesson, isDone }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionId = useId();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const mergedParams = {
    ...Object.fromEntries(searchParams.entries()),
    watch: true,
  };

  const toggleExpanded = () => setIsExpanded((v) => !v);

  // تنسيق الوقت
  const formatTime = (seconds) => {
    if (!seconds) return "غير محدد";
    const mins = Math.floor(seconds / 60);
    return `${mins} دقيقة`;
  };

  // دمج الفيديوهات والجلسات المباشرة في مصفوفة واحدة
  const allContent = [
    ...(lesson.videos || []).map((video) => ({ ...video, type: "video" })),
    ...(lesson.live || []).map((live) => ({ ...live, type: "live" })),
  ];

  return (
    <article
      className={cx(
        "flex w-full flex-col items-start relative bg-white rounded-xl md:rounded-[30px] border-2 border-solid border-variable-collection-stroke transition-all",
        isExpanded ? "shadow-xl" : "hover:shadow-2xl"
      )}
    >
      <header
        onClick={toggleExpanded}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleExpanded();
          }
        }}
        className="flex cursor-pointer sm:gap-6 p-4 sm:p-6 items-center justify-between self-stretch w-full"
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-controls={sectionId}
      >
        <h1 className="font-bold cursor-pointer flex items-center justify-center w-fit -mt-px text-text text-sm sm:text-base leading-normal">
          {lesson.lesson_title || "غير محدد"}
        </h1>
        <div
          className={`shrink-0 w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ${
            !isExpanded ? "rotate-180" : "rotate-0"
          }`}
          aria-hidden="true"
        >
          <CourseChevronTopIcon
            className={
              "w-[20px] h-[20px] md:w-[24px] md:h-[24px] !fill-primary"
            }
          />
        </div>
      </header>

      {isExpanded && (
        <section
          id={sectionId}
          className="flex flex-col items-start self-stretch w-full sm:gap-6 p-4 sm:p-6 !pt-0"
        >
          {/* Videos and Live Sessions Combined */}
          {allContent.map((item) => (
            <div
              key={`${item.type}-${item.id}`}
              className="flex items-start gap-3 pt-3 sm:pt-4 pb-4 sm:pb-6 w-full border-b-[2px] border-solid border-variable-collection-stroke"
            >
              <RoundedPlayIcon
                className={cx(
                  "w-[27px] h-[27px] md:w-[32px] md:h-[32px]",
                  item.type === "live" ? "stroke-danger" : "stroke-primary"
                )}
              />
              <div className="flex w-full flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 self-stretch">
                <div className="inline-flex items-center gap-2">
                  {item.type === "video" ? (
                    <Link
                      href={{
                        pathname,
                        query: { ...mergedParams, video: item.id },
                        hash: "player",
                      }}
                    >
                      <h2 className="cursor-pointer font-medium flex items-center justify-center w-fit -mt-px text-text text-sm sm:text-base leading-normal hover:underline">
                        {item.title || "غير محدد"}
                      </h2>
                    </Link>
                  ) : (
                    <h2 className="font-medium flex items-center justify-center w-fit -mt-px text-text text-sm sm:text-base leading-normal">
                      {item.title || "غير محدد"}
                    </h2>
                  )}
                </div>

                <div className="inline-flex items-center gap-3 sm:gap-4">
                  {item.type === "live" ? (
                    <div className="inline-flex items-center gap-2">
                      <span className="font-bold text-danger text-sm sm:text-base leading-normal">
                        بث مباشر
                      </span>
                      <time className="font-medium text-text-alt text-xs sm:text-sm">
                        {item.date} - {item.time}
                      </time>
                    </div>
                  ) : (
                    <time className="font-medium text-text text-sm sm:text-base leading-normal">
                      {formatTime(item.time)}
                    </time>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Exams */}
          {lesson.exams && lesson.exams.length > 0 && (
            <ExerciseDropDown lesson={lesson} isDone={isDone} />
          )}
        </section>
      )}
    </article>
  );
};

export const ExerciseDropDown = ({ lesson, isDone = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionId = useId();

  const toggleExpanded = () => setIsExpanded((v) => !v);

  return (
    <>
      <header
        onClick={toggleExpanded}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleExpanded();
          }
        }}
        className="flex select-none cursor-pointer items-center justify-between py-3 sm:py-4 w-full"
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-controls={sectionId}
      >
        <div className="inline-flex items-center gap-2">
          <CheckListIcon />
          <span className="font-medium text-text text-sm sm:text-base leading-normal">
            تدريب
          </span>
        </div>
        <div
          className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ${
            !isExpanded ? "rotate-180" : "rotate-0"
          }`}
          aria-hidden="true"
        >
          <CourseChevronTopIcon
            className={
              "w-[20px] h-[20px] md:w-[24px] md:h-[24px] !fill-primary"
            }
          />
        </div>
      </header>

      {isExpanded && (
        <div id={sectionId} className="w-full">
          {lesson.exams.map((exam) => (
            <div key={exam.id} className="flex flex-col">
              <div className="flex w-full flex-row items-center justify-between border-b-[2px] border-solid last:border-none pt-3 sm:pt-4 pb-4 sm:pb-6 bg-white">
                {(() => {
                  const Tag = isDone ? Link : "div";
                  return (
                    <>
                      <Tag
                        href={isDone ? `/exam-details/${exam.id}` : undefined}
                        className="inline-flex items-center gap-4 sm:gap-6"
                      >
                        <div className="inline-flex items-center gap-0 sm:gap-4 bg-white hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-variable-collection-text focus:ring-offset-2 rounded">
                          <div
                            className="relative w-6 h-6 sm:w-7 sm:h-7 aspect-[1]"
                            aria-hidden="true"
                          >
                            <FileIcon
                              className={
                                "w-[20px] h-[20px] md:w-[28px] md:h-[28px] fill-primary"
                              }
                            />
                          </div>
                          <span className="font-medium text-text text-sm sm:text-base leading-normal">
                            {exam.title || "أسئلة الاختبار"}
                          </span>
                        </div>

                        {!isDone && (
                          <div className="relative w-6 h-6 sm:w-7 sm:h-7 aspect-[1]">
                            <LockIcon2 className="fill-secondary w-5 h-5" />
                          </div>
                        )}
                      </Tag>

                      <button
                        className="inline-flex disabled:!opacity-50 disabled:cursor-not-allowed items-center justify-end gap-2.5 px-4 md:px-6 sm:px-8 py-2 bg-secondary rounded-full md:rounded-[10px] hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                        disabled={!isDone}
                      >
                        <DownloadIcon
                          className={
                            "w-[20px] h-[20px] md:w-[28px] md:h-[28px]"
                          }
                        />
                        <span className="text-white font-medium text-sm sm:text-base leading-normal">
                          تحميل
                        </span>
                      </button>
                    </>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
