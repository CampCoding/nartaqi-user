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
  // Direct ID (just numbers)
  if (/^\d+$/.test(url)) return url;
  // URL format: https://vimeo.com/123456789 or https://player.vimeo.com/video/123456789
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match ? match[1] : null;
};

const extractYoutubeId = (url) => {
  if (!url) return null;
  // Direct ID (11 characters)
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
  // URL formats
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
};

// ==================== MAIN COMPONENT ====================
const CourseContentDrawer = ({ isRegistered, content, allExams }) => {
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
        <div className={` md:h-6 transition-transform duration-300 `}>
          <div className="flex justify-between items-center gap-4">
            <CourseChevronTopIcon
              className={`w-[20px] ${
                !isOpen ? "rotate-180" : "rotate-0"
              } transition-transform duration-300 h-[20px] md:w-[24px] md:h-[24px] !fill-primary`}
            />
            {!isRegistered && (
              <CourseLockIcon className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] !fill-primary " />
            )}
          </div>
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
          <div className="w-full flex flex-col gap-3 sm:gap-4 px-4 md:px-6 pb-4 md:pb-[24px]">
            {content.lessons.map((lesson) => (
              <RegLectureDrawer
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
export const RegLectureDrawer = ({ lesson, isDone, isRegistered }) => {
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

  // Build encoded video query
  const buildVideoQuery = (item) => {
    const query = {
      ...mergedParams,
      video: item.id,
    };

    // Handle Vimeo
    if (item.vimeo_link) {
      const vimeoId = extractVimeoId(item.vimeo_link);
      if (vimeoId) {
        // Encode the ID
        query.vimeo_id = encodeId(vimeoId);
      } else {
        // If no ID extracted, encode the full URL
        query.vimeo_id = encodeId(item.vimeo_link);
      }
    }

    // Handle YouTube
    if (item.youtube_link) {
      const youtubeId = extractYoutubeId(item.youtube_link);
      if (youtubeId) {
        query.youtube_id = encodeId(youtubeId);
      } else {
        query.youtube_id = encodeId(item.youtube_link);
      }
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
          className={`shrink-0  transition-transform duration-300`}
          aria-hidden="true"
        >
          <div className="flex justify-between items-center gap-4">
            <CourseChevronTopIcon
              className={`w-[20px] ${!isExpanded ? "rotate-180" : "rotate-0"}
              transition-transform duration-300 h-[20px] md:w-[24px] md:h-[24px] !fill-primary`}
            />
            {isRegistered && (
              <CourseLockIcon className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] !fill-primary " />
            )}
          </div>
        </div>
      </header>

      {isExpanded && (
        <section
          id={sectionId}
          className="flex flex-col items-start self-stretch w-full sm:gap-6 p-4 sm:p-6 !pt-0"
        >
          {/* Videos and Live Sessions */}
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
                    !isRegistered ? (
                      <Link
                        href={{
                          pathname,
                          query: buildVideoQuery(item),
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
                    )
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
          {hasExams && (
            <ExerciseDropDown
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
// ==================== EXERCISE DROPDOWN ====================
export const ExerciseDropDown = ({
  examAllData,
  isDone = false,
  isRegistered,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionId = useId();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
    if (vimeoId || videoUrl.toLowerCase().includes("vimeo")) {
      return "vimeo";
    }

    const youtubeId = extractYoutubeId(videoUrl);
    if (
      youtubeId ||
      videoUrl.toLowerCase().includes("youtube") ||
      videoUrl.toLowerCase().includes("youtu.be")
    ) {
      return "youtube";
    }

    return null;
  };

  const toggleExpanded = () => setIsExpanded((v) => !v);

  const mergedParams = {
    ...Object.fromEntries(searchParams.entries()),
    watch: true,
  };

  // Build encoded video query for exam videos
  const buildExamVideoQuery = (video) => {
    const query = {
      ...mergedParams,
      exam_video: video.id,
    };

    const videoUrl = video.video_url;

    // Try to extract Vimeo ID first
    const vimeoId = extractVimeoId(videoUrl);
    if (vimeoId) {
      query.vimeo_id = encodeId(vimeoId);
      return query;
    }

    // Try to extract YouTube ID
    const youtubeId = extractYoutubeId(videoUrl);
    if (youtubeId) {
      query.youtube_id = encodeId(youtubeId);
      return query;
    }

    // If URL contains "vimeo", encode full URL as vimeo_id
    if (videoUrl && videoUrl.toLowerCase().includes("vimeo")) {
      query.vimeo_id = encodeId(videoUrl);
      return query;
    }

    // If URL contains "youtube" or "youtu.be", encode as youtube_id
    if (
      videoUrl &&
      (videoUrl.toLowerCase().includes("youtube") ||
        videoUrl.toLowerCase().includes("youtu.be"))
    ) {
      query.youtube_id = encodeId(videoUrl);
      return query;
    }

    // Default: try as vimeo (encode full URL)
    if (videoUrl) {
      query.vimeo_id = encodeId(videoUrl);
    }

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
        <div className={``} aria-hidden="true">
          <div className="flex justify-between items-center gap-4">
            <CourseChevronTopIcon
              className={`w-[20px] ${!isExpanded ? "rotate-180" : "rotate-0"}
              transition-transform duration-300 h-[20px] md:w-[24px] md:h-[24px] !fill-primary`}
            />
            {isRegistered && (
              <CourseLockIcon className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] !fill-primary " />
            )}
          </div>
        </div>
      </header>

      {isExpanded && (
        <div id={sectionId} className="w-full">
          {examAllData.map((examData) => {
            const exam = examData.exam;
            const examVideos = examData.videos || [];
            const examPdfs = examData.exam_pdfs || [];
            const isSolved = examData.is_solved === true;

            return (
              <div key={exam.id} className="flex flex-col">
                {/* Exam Title Row */}
                <div className="flex w-full flex-row items-center justify-between border-b-[2px] border-solid last:border-none pt-3 sm:pt-4 pb-4 sm:pb-6 bg-white">
                  {(() => {
                    const Tag = isDone && !isRegistered ? Link : "div";

                    return (
                      <Tag
                        href={isDone ? `/exam-details/${exam.id}` : undefined}
                        className="inline-flex items-center gap-4 sm:gap-6"
                      >
                        <div className="inline-flex items-center gap-2 sm:gap-4 bg-white hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-variable-collection-text focus:ring-offset-2 rounded">
                          <div
                            className="relative w-6 h-6 sm:w-7 sm:h-7 aspect-[1]"
                            aria-hidden="true"
                          >
                            <FileIcon className="w-[20px] h-[20px] md:w-[28px] md:h-[28px] fill-primary" />
                          </div>
                          <span className="font-medium text-text text-sm sm:text-base leading-normal">
                            {exam.title || "أسئلة الاختبار"}
                          </span>

                          {isSolved && (
                            <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-100 text-green-600 font-medium">
                              <svg
                                className="w-3 h-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              تم الحل
                            </span>
                          )}
                        </div>

                        {!isDone && (
                          <div className="relative w-6 h-6 sm:w-7 sm:h-7 aspect-[1]">
                            <LockIcon2 className="fill-secondary w-5 h-5" />
                          </div>
                        )}
                      </Tag>
                    );
                  })()}
                </div>

                {/* Exam Videos - Updated with Play Button */}
                {examVideos.length > 0 &&
                  examVideos.map((video) => {
                    const videoUrl = video.video_url;
                    const platform = getVideoPlatform(videoUrl);
                    const isPlayable = !!platform;

                    return (
                      <div
                        key={`exam-video-${video.id}`}
                        className="flex items-center gap-3 pt-3 sm:pt-4 pb-4 sm:pb-6 w-full border-b-[2px] border-solid border-variable-collection-stroke"
                      >
                        <RoundedPlayIcon className="w-[27px] h-[27px] md:w-[32px] md:h-[32px] stroke-primary flex-shrink-0" />

                        <div className="flex w-full flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                          {/* Title & Badges */}
                          <div className="inline-flex items-center gap-2 flex-wrap flex-1 min-w-0">
                            {isDone && isPlayable ? (
                              <Link
                                href={{
                                  pathname,
                                  query: buildExamVideoQuery(video),
                                  hash: "player",
                                }}
                                className="font-medium text-text text-sm sm:text-base leading-normal hover:text-primary hover:underline transition-colors"
                              >
                                {video.title || "شرح الاختبار"}
                              </Link>
                            ) : (
                              <h2 className="font-medium text-text text-sm sm:text-base leading-normal">
                                {video.title || "شرح الاختبار"}
                              </h2>
                            )}

                            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                              شرح
                            </span>
                          </div>

                          {/* Action Buttons */}
                          <div className="inline-flex items-center gap-2 flex-shrink-0">
                            {!isDone ? (
                              <LockIcon2 className="fill-secondary w-5 h-5" />
                            ) : (
                              isPlayable && (
                                <Link
                                  href={{
                                    pathname,
                                    query: buildExamVideoQuery(video),
                                    hash: "player",
                                  }}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary rounded-full hover:opacity-90 transition-opacity"
                                >
                                  <svg
                                    className="w-4 h-4 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span className="text-white font-medium text-xs sm:text-sm">
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
                      className="flex w-full flex-row items-center justify-between border-b-[2px] border-solid last:border-none pt-3 sm:pt-4 pb-4 sm:pb-6 bg-white"
                    >
                      <div className="inline-flex items-center gap-2 sm:gap-4">
                        <FileIcon className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] fill-primary" />
                        <span className="font-medium text-text text-sm sm:text-base leading-normal">
                          {pdf.title}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
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
                          onClick={() =>
                            handleDownloadFile(pdf.pdf_url, pdf.title, "pdf")
                          }
                          className="inline-flex items-center justify-end gap-2 px-3 md:px-4 py-1.5 bg-secondary rounded-full md:rounded-[10px] hover:opacity-90 transition-opacity"
                        >
                          <DownloadIcon className="w-[16px] h-[16px] md:w-[20px] md:h-[20px]" />
                          <span className="text-white font-medium text-xs sm:text-sm leading-normal">
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
