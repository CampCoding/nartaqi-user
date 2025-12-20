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
import { useParams, usePathname, useSearchParams } from "next/navigation";

// ==================== ENCODING/DECODING HELPERS ====================
const encodeId = (value) => {
  if (!value) return null;
  try {
    return encodeURIComponent(btoa(String(value)));
  } catch (e) {
    console.error("Encoding error:", e);
    return null;
  }
};

const extractVimeoId = (url) => {
  if (!url) return null;
  if (/^\d+$/.test(url)) return url;
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match ? match[1] : null;
};

const extractYoutubeId = (url) => {
  if (!url) return null;
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
};

// ==================== MAIN COMPONENT ====================
const CourseContentDrawer = ({ isRegistered, content, allExams, own }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const formatTime = (seconds) => {
    if (!seconds) return "غير محدد";
    const mins = Math.floor(seconds / 60);
    return `${mins} دقيقة`;
  };

  return (
    <div
      className={cx(
        // ✅ slightly bigger radius + more breathing space in shadows (same design)
        "self-stretch w-full transition-all bg-white rounded-2xl md:rounded-[24px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)] outline outline-2 outline-offset-[-1px] outline-neutral-300 inline-flex flex-col justify-start items-start",
        !isOpen ? "hover:shadow-2xl" : "shadow-xl"
      )}
    >
      {/* Header */}
      <div
        // ✅ more padding + align nicer
        className="self-stretch px-5 md:px-7 py-5 md:py-7 inline-flex justify-between items-center cursor-pointer"
        onClick={handleToggle}
      >
        {/* ✅ slightly larger text */}
        <div className="text-right justify-center text-text text-base md:text-lg font-bold">
          {content.content_title || "غير محدد"}
        </div>

        <div className="transition-transform duration-300">
          <div className="flex justify-between items-center gap-4 md:gap-5">
            {/* ✅ larger icon */}
            <CourseChevronTopIcon
              className={`w-[22px] h-[22px] md:w-[26px] md:h-[26px] ${
                !isOpen ? "rotate-180" : "rotate-0"
              } transition-transform duration-300 !fill-primary`}
            />
            {!isRegistered && (
              <CourseLockIcon className="w-[22px] h-[22px] md:w-[26px] md:h-[26px] !fill-primary" />
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      {isOpen &&
        (isRegistered ? (
          <div className="w-full flex flex-col gap-4 md:gap-5 px-5 md:px-7 pb-5 md:pb-7">
            {content.lessons.map((lesson) => (
              <RegLectureDrawer
                own={own}
                key={lesson.id}
                lesson={lesson}
                isDone={true}
              />
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4 md:gap-5 px-5 md:px-7 pb-5 md:pb-7">
            {content.lessons.map((lesson) => (
              <RegLectureDrawer
                own={own}
                key={lesson.id}
                lesson={lesson}
                isDone={true}
                isRegistered={!isRegistered}
              />
            ))}
          </div>
        ))}
    </div>
  );
};

export default CourseContentDrawer;

// ==================== REG LECTURE DRAWER ====================
export const RegLectureDrawer = ({ lesson, isDone, isRegistered, own }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionId = useId();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const mergedParams = {
    ...Object.fromEntries(searchParams.entries()),
    watch: true,
  };

  const toggleExpanded = () => setIsExpanded((v) => !v);

  const formatTime = (seconds) => {
    if (!seconds) return "غير محدد";
    const mins = Math.floor(seconds / 60);
    return `${mins} دقيقة`;
  };

  const buildVideoQuery = (item) => {
    const query = { ...mergedParams, video: item.id };

    if (item.vimeo_link) {
      const vimeoId = extractVimeoId(item.vimeo_link);
      query.vimeo_id = encodeId(vimeoId || item.vimeo_link);
    }

    if (item.youtube_link) {
      const youtubeId = extractYoutubeId(item.youtube_link);
      query.youtube_id = encodeId(youtubeId || item.youtube_link);
    }

    return query;
  };

  const allContent = [
    ...(lesson.videos || []).map((video) => ({ ...video, type: "video" })),
    ...(lesson.live || []).map((live) => ({ ...live, type: "live" })),
  ];

  const hasExams = lesson.exam_all_data && lesson.exam_all_data.length > 0;

  return (
    <article
      className={cx(
        // ✅ a touch larger radius + same border/shadow behavior
        "flex w-full flex-col items-start relative bg-white rounded-2xl md:rounded-[32px] border-2 border-solid border-variable-collection-stroke transition-all",
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
        // ✅ bigger padding + better rhythm
        className="flex cursor-pointer gap-4 sm:gap-6 p-5 sm:p-6 md:p-7 items-center justify-between self-stretch w-full"
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-controls={sectionId}
      >
        {/* ✅ slightly larger title */}
        <h1 className="font-bold cursor-pointer flex items-center justify-center w-fit -mt-px text-text text-base md:text-lg leading-snug">
          {lesson.lesson_title || "غير محدد"}
        </h1>

        <div className="shrink-0 transition-transform duration-300" aria-hidden="true">
          <div className="flex justify-between items-center gap-4 md:gap-5">
            <CourseChevronTopIcon
              className={`w-[22px] h-[22px] md:w-[26px] md:h-[26px] ${
                !isExpanded ? "rotate-180" : "rotate-0"
              } transition-transform duration-300 !fill-primary`}
            />
            {isRegistered && (
              <CourseLockIcon className="w-[22px] h-[22px] md:w-[26px] md:h-[26px] !fill-primary" />
            )}
          </div>
        </div>
      </header>

      {isExpanded && (
        <section
          id={sectionId}
          // ✅ more spacing, keep structure
          className="flex flex-col items-start self-stretch w-full gap-4 sm:gap-6 p-5 sm:p-6 md:p-7 !pt-0"
        >
          {/* Videos and Live Sessions */}
          {allContent.map((item) => (
            <div
              key={`${item.type}-${item.id}`}
              // ✅ slightly bigger paddings
              className="flex items-start gap-4 pt-4 pb-5 sm:pb-6 w-full border-b-[2px] border-solid border-variable-collection-stroke"
            >
              {/* ✅ larger play icon */}
              <RoundedPlayIcon
                className={cx(
                  "w-[30px] h-[30px] md:w-[36px] md:h-[36px]",
                  item.type === "live" ? "stroke-danger" : "stroke-primary"
                )}
              />

              <div className="flex w-full flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 self-stretch">
                <div className="inline-flex items-center gap-3">
                  {item.type === "video" ? (
                    !isRegistered ? (
                      <Link
                        href={{
                          pathname,
                          query: buildVideoQuery(item),
                          hash: "player",
                        }}
                      >
                        {/* ✅ larger title */}
                        <h2 className="cursor-pointer font-medium flex items-center justify-center w-fit -mt-px text-text text-base md:text-lg leading-snug hover:underline">
                          {item.title || "غير محدد"}
                        </h2>
                      </Link>
                    ) : (
                      <h2 className="font-medium flex items-center justify-center w-fit -mt-px text-text text-base md:text-lg leading-snug">
                        {item.title || "غير محدد"}
                      </h2>
                    )
                  ) : (
                    <div className="flex flex-col gap-1">
                      <h2 className="font-medium flex items-center justify-center w-fit -mt-px text-text text-base md:text-lg leading-snug">
                        {item.title || "غير محدد"}
                      </h2>

                      {item.finished == "1" ? (
                        <a
                          className="text-gray-500 underline text-sm md:text-base"
                          href={item.link}
                          target="_blank"
                        >
                          عرض التسجيل
                        </a>
                      ) : (
                        <a
                          className="text-gray-500 underline text-sm md:text-base"
                          href={item.link}
                          target="_blank"
                        >
                          دخول البث
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div className="inline-flex items-center gap-3 sm:gap-4">
                  {item.type === "live" ? (
                    <div className="inline-flex items-center gap-2">
                      <span className="font-bold text-sm md:text-base leading-normal">
                        {item.finished == "1" ? (
                          <span className="text-green-500">انتهى البث</span>
                        ) : (
                          <span className="text-danger">بث مباشر</span>
                        )}
                      </span>
                      <time className="font-medium text-text-alt text-xs md:text-sm">
                        {item.date} - {item.time}
                      </time>
                    </div>
                  ) : (
                    <time className="font-medium text-text text-sm md:text-base leading-normal">
                      {formatTime(item.time)}
                    </time>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Exams */}
          {hasExams && (
            <ExerciseDropDown
              lesson={lesson}
              examAllData={lesson.exam_all_data}
              isDone={isDone}
              isRegistered={isRegistered}
            />
          )}
        </section>
      )}
    </article>
  );
};

// ==================== EXERCISE DROPDOWN ====================
export const ExerciseDropDown = ({ examAllData, isDone = false, isRegistered, lesson }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionId = useId();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { id } = useParams();

  const extractVimeoId = (url) => {
    if (!url) return null;
    if (/^\d+$/.test(url)) return url;
    const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    return match ? match[1] : null;
  };

  const extractYoutubeId = (url) => {
    if (!url) return null;
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  const getVideoPlatform = (videoUrl) => {
    if (!videoUrl) return null;

    const vimeoId = extractVimeoId(videoUrl);
    if (vimeoId || videoUrl.toLowerCase().includes("vimeo")) return "vimeo";

    const youtubeId = extractYoutubeId(videoUrl);
    if (youtubeId || videoUrl.toLowerCase().includes("youtube") || videoUrl.toLowerCase().includes("youtu.be"))
      return "youtube";

    return null;
  };

  const toggleExpanded = () => setIsExpanded((v) => !v);

  const mergedParams = {
    ...Object.fromEntries(searchParams.entries()),
    watch: true,
  };

  const buildExamVideoQuery = (video) => {
    const query = { ...mergedParams, exam_video: video.id };
    const videoUrl = video.video_url;

    const vimeoId = extractVimeoId(videoUrl);
    if (vimeoId) {
      query.vimeo_id = encodeId(vimeoId);
      return query;
    }

    const youtubeId = extractYoutubeId(videoUrl);
    if (youtubeId) {
      query.youtube_id = encodeId(youtubeId);
      return query;
    }

    if (videoUrl && videoUrl.toLowerCase().includes("vimeo")) {
      query.vimeo_id = encodeId(videoUrl);
      return query;
    }

    if (videoUrl && (videoUrl.toLowerCase().includes("youtube") || videoUrl.toLowerCase().includes("youtu.be"))) {
      query.youtube_id = encodeId(videoUrl);
      return query;
    }

    if (videoUrl) query.vimeo_id = encodeId(videoUrl);
    return query;
  };

  const handleDownloadFile = async (fileUrl, title, extension = "pdf") => {
    if (!isDone) {
      alert("يجب إكمال الدرس أولاً للتحميل 🔒");
      return;
    }

    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("خطأ في تحميل الملف:", error);
      window.open(fileUrl, "_blank");
    }
  };

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
        // ✅ bigger padding & spacing
        className="flex select-none cursor-pointer items-center justify-between py-4 sm:py-5 w-full"
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-controls={sectionId}
      >
        <div className="inline-flex items-center gap-2.5">
          <CheckListIcon />
          <span className="font-medium text-text text-base md:text-lg leading-normal">
            تدريب
          </span>
        </div>

        <div aria-hidden="true">
          <div className="flex justify-between items-center gap-4 md:gap-5">
            <CourseChevronTopIcon
              className={`w-[22px] h-[22px] md:w-[26px] md:h-[26px] ${
                !isExpanded ? "rotate-180" : "rotate-0"
              } transition-transform duration-300 !fill-primary`}
            />
            {isRegistered && (
              <CourseLockIcon className="w-[22px] h-[22px] md:w-[26px] md:h-[26px] !fill-primary" />
            )}
          </div>
        </div>
      </header>

      {isExpanded && (
        <div id={sectionId} className="w-full">
          {examAllData.map((examData) => {
            const exam = examData?.exam;
            const examVideos = examData.videos || [];
            const examPdfs = examData.exam_pdfs || [];
            const isSolved = examData.is_solved === true;

            return (
              <div key={exam?.id} className="flex flex-col">
                {/* Exam Title Row */}
                {exam && (
                  <div className="flex w-full flex-row items-center justify-between border-b-[2px] border-solid last:border-none pt-4 pb-5 bg-white">
                    {(() => {
                      const Tag = isDone && !isRegistered ? Link : "div";
                      return (
                        <Tag
                          href={isDone ? `/course/${id}/lesson/${lesson.id}/exam-details/${exam?.id}` : undefined}
                          onClick={() => console.log("lesson", lesson)}
                          className="inline-flex items-center gap-5 sm:gap-7"
                        >
                          <div className="inline-flex items-center gap-3 sm:gap-5 bg-white hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-variable-collection-text focus:ring-offset-2 rounded">
                            <div className="relative w-7 h-7 sm:w-8 sm:h-8 aspect-[1]" aria-hidden="true">
                              <FileIcon className="w-[22px] h-[22px] md:w-[30px] md:h-[30px] fill-primary" />
                            </div>
                            <span className="font-medium text-text text-base md:text-lg leading-normal">
                              {exam.title || "أسئلة الاختبار"}
                            </span>
                          </div>

                          {!isDone && (
                            <div className="relative w-7 h-7 sm:w-8 sm:h-8 aspect-[1]">
                              <LockIcon2 className="fill-secondary w-6 h-6" />
                            </div>
                          )}
                        </Tag>
                      );
                    })()}
                  </div>
                )}

                {/* Exam Videos */}
                {examVideos.length > 0 &&
                  examVideos.map((video) => {
                    const videoUrl = video.video_url;
                    const platform = getVideoPlatform(videoUrl);
                    const isPlayable = !!platform;

                    return (
                      <div
                        key={`exam-video-${video.id}`}
                        className="flex items-center gap-4 pt-4 pb-5 w-full border-b-[2px] border-solid border-variable-collection-stroke"
                      >
                        <RoundedPlayIcon className="w-[30px] h-[30px] md:w-[36px] md:h-[36px] stroke-primary flex-shrink-0" />

                        <div className="flex w-full flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                          <div className="inline-flex items-center gap-2.5 flex-wrap flex-1 min-w-0">
                            {isDone && isPlayable ? (
                              <Link
                                href={{ pathname, query: buildExamVideoQuery(video), hash: "player" }}
                                className="font-medium text-text text-base md:text-lg leading-snug hover:text-primary hover:underline transition-colors"
                              >
                                {video.title || "شرح الاختبار"}
                              </Link>
                            ) : (
                              <h2 className="font-medium text-text text-base md:text-lg leading-snug">
                                {video.title || "شرح الاختبار"}
                              </h2>
                            )}

                            <span className="text-xs md:text-sm px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                              شرح
                            </span>
                          </div>

                          <div className="inline-flex items-center gap-2 flex-shrink-0">
                            {!isDone ? (
                              <LockIcon2 className="fill-secondary w-6 h-6" />
                            ) : (
                              isPlayable && (
                                <Link
                                  href={{ pathname, query: buildExamVideoQuery(video), hash: "player" }}
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary rounded-full hover:opacity-90 transition-opacity"
                                >
                                  <svg className="w-4.5 h-4.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span className="text-white font-medium text-sm md:text-base">
                                    تشغيل
                                  </span>
                                </Link>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                {/* PDFs */}
                {isDone &&
                  examPdfs.length > 0 &&
                  examPdfs.map((pdf) => (
                    <div
                      key={pdf.id}
                      className="flex w-full flex-row items-center justify-between border-b-[2px] border-solid last:border-none pt-4 pb-5 bg-white"
                    >
                      <div className="inline-flex items-center gap-3 sm:gap-5">
                        <FileIcon className="w-[22px] h-[22px] md:w-[26px] md:h-[26px] fill-primary" />
                        <span className="font-medium text-text text-base md:text-lg leading-normal">
                          {pdf.title}
                        </span>
                        <span
                          className={`text-xs md:text-sm px-2.5 py-1 rounded-full ${
                            pdf.type === "question"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {pdf.type === "question" ? "أسئلة" : "إجابات"}
                        </span>
                      </div>

                      {!isRegistered && (
                        <button
                          onClick={() => handleDownloadFile(pdf.pdf_url, pdf.title, "pdf")}
                          className="inline-flex items-center justify-end gap-2.5 px-4 py-2 bg-secondary rounded-full md:rounded-[12px] hover:opacity-90 transition-opacity"
                        >
                          <DownloadIcon className="w-[18px] h-[18px] md:w-[22px] md:h-[22px]" />
                          <span className="text-white font-medium text-sm md:text-base leading-normal">
                            تحميل
                          </span>
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
