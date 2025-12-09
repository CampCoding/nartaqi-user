"use client";

import React, { useState, useCallback } from "react";
import CourseContentDrawer from "../ui/CourseContentDrawer";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  DownloadIcon,
  FileIcon,
  RoundedPlayIcon,
  LockIcon2,
} from "../../public/svgs";
import cx from "../../lib/cx";

// ==================== ENCODING HELPERS ====================
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

const CourseContent = ({ isRegistered, courseData }) => {
  const [selectedTab, setSelectedTab] = useState("foundation");

  const { contents, round, exams_round } = courseData;

  const foundationContents = contents.filter(
    (c) => c.content_type === "basic" || c.content_type === "foundation"
  );

  const lectureContents = contents.filter((c) => c.content_type === "lecture");

  const allExams = exams_round || [];

  return (
    <div className="w-full flex-1">
      <div className="text-right justify-center text-primary text-lg md:text-2xl font-bold mb-6 lg:mb-8">
        محتوي الدورة : {round.name}
      </div>

      {isRegistered && (
        <Navs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      )}

      {selectedTab === "foundation" && (
        <div className="flex flex-col gap-3 md:gap-4">
          {foundationContents.length > 0 ? (
            foundationContents.map((content) => (
              <CourseContentDrawer
                key={content.id}
                content={content}
                isRegistered={isRegistered}
              />
            ))
          ) : (
            <div className="text-center py-8 text-text-alt">
              لا يوجد محتوى تأسيسي متاح
            </div>
          )}
        </div>
      )}

      {selectedTab === "lectures" && (
        <div className="flex flex-col gap-3 md:gap-4">
          {lectureContents.length > 0 ? (
            lectureContents.map((content) => (
              <CourseContentDrawer
                key={content.id}
                content={content}
                isRegistered={isRegistered}
              />
            ))
          ) : (
            <div className="text-center py-8 text-text-alt">
              لا توجد محاضرات متاحة
            </div>
          )}
        </div>
      )}

      {selectedTab === "tests" && (
        <div className="flex flex-col gap-3 md:gap-4">
          {allExams.length > 0 ? (
            allExams.map((examData) => (
              <TestRow
                key={examData.exam.id}
                examData={examData}
                isRegistered={isRegistered}
              />
            ))
          ) : (
            <div className="text-center py-8 text-text-alt">
              لا توجد اختبارات متاحة
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseContent;

export const Navs = ({ selectedTab, setSelectedTab }) => {
  const tabsData = [
    { id: "foundation", label: "مرحلة التأسيس" },
    { id: "lectures", label: "المحاضرات" },
    { id: "tests", label: "اختبارات" },
  ];

  const handleTabClick = useCallback(
    (tabId) => setSelectedTab(tabId),
    [setSelectedTab]
  );

  const onKeyDown = (e) => {
    const idx = tabsData.findIndex((t) => t.id === selectedTab);
    if (idx < 0) return;
    if (e.key === "ArrowRight") {
      const next = (idx + 1) % tabsData.length;
      setSelectedTab(tabsData[next].id);
    } else if (e.key === "ArrowLeft") {
      const prev = (idx - 1 + tabsData.length) % tabsData.length;
      setSelectedTab(tabsData[prev].id);
    }
  };

  return (
    <nav
      dir="rtl"
      role="tablist"
      aria-label="أقسام الدورة"
      onKeyDown={onKeyDown}
      className="flex w-full mb-6 items-center justify-between p-2 lg:p-3 bg-[#ebf3fe] rounded-[20px] lg:rounded-[26px] overflow-x-auto hidden-scroll gap-1 lg:gap-1.5"
    >
      {tabsData.map((tab) => {
        const selected = selectedTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => handleTabClick(tab.id)}
            className={[
              "flex-1 lg:flex-none inline-flex justify-center items-center",
              "px-3 py-3 lg:px-5 lg:py-3.5 rounded-[16px] lg:rounded-[18px]",
              "transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300",
              tab.id === "tests" ? "lg:w-[180px]" : "lg:inline-flex",
              selected ? "bg-primary font-bold text-white" : "text-zinc-500",
              !selected ? "hover:bg-white/60" : "",
            ].join(" ")}
          >
            <span className="w-fit text-center text-xs md:text-lg lg:text-xl leading-normal truncate">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export const TestRow = ({ examData, isRegistered }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { exam, videos = [], exam_pdfs = [], is_solved = false } = examData;

  // Build merged params for video links
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

  // Check if video has playable content
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

  const formatTime = (timeString) => {
    if (!timeString) return "غير محدد";
    const [hours, minutes] = timeString.split(":");
    const h = parseInt(hours);
    const m = parseInt(minutes);
    if (h === 0) return `${m} دقيقة`;
    if (m === 0) return `${h} ساعة`;
    return `${h} ساعة ${m} دقيقة`;
  };

  const getLevelLabel = (level) => {
    const levels = {
      easy: "سهل",
      medium: "متوسط",
      hard: "صعب",
    };
    return levels[level] || "";
  };

  const getLevelColor = (level) => {
    const colors = {
      easy: "bg-green-100 text-green-600",
      medium: "bg-yellow-100 text-yellow-600",
      hard: "bg-red-100 text-red-600",
    };
    return colors[level] || "";
  };

  const handleDownloadFile = async (e, fileUrl, title, extension = "pdf") => {
    e.preventDefault();
    e.stopPropagation();

    if (!isRegistered) {
      alert("يجب التسجيل في الدورة أولاً للتحميل 🔒");
      return;
    }

    const downloadId = `${title}-${extension}`;
    setIsDownloading(downloadId);

    try {
      const response = await fetch(fileUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });

      if (!response.ok) {
        throw new Error("فشل في جلب الملف");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title}.${extension}`;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error("خطأ في تحميل الملف:", error);
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = `${title}.${extension}`;
      link.setAttribute("download", `${title}.${extension}`);
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsDownloading(null);
    }
  };

  const hasContent = videos.length > 0 || exam_pdfs.length > 0;

  return (
    <div
      className={cx(
        "flex flex-col relative bg-white rounded-[20px] border-2 border-solid transition-all",
        is_solved ? "border-green-300" : "border-zinc-300",
        isExpanded ? "shadow-xl" : "hover:shadow-2xl"
      )}
    >
      {/* Main Row - Clickable Header */}
      <div
        onClick={() => hasContent && setIsExpanded(!isExpanded)}
        className={cx(
          "flex flex-col lg:flex-row items-start lg:items-center justify-between p-3 sm:p-4 lg:px-6 lg:py-6 gap-3 sm:gap-4",
          hasContent && "cursor-pointer"
        )}
      >
        {/* Title and Tags Section */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 flex-wrap w-full lg:w-auto">
          <Link
            href={isRegistered ? `/mock-test/${exam.id}` : "#"}
            onClick={(e) => {
              if (!isRegistered) {
                e.preventDefault();
                alert("يجب التسجيل في الدورة أولاً 🔒");
              }
              e.stopPropagation();
            }}
            className="group-hover:text-primary transition-all duration-75 font-medium text-text text-xs sm:text-sm md:text-base hover:text-primary hover:underline line-clamp-2 sm:line-clamp-1"
          >
            {exam.title || "غير محدد"}
          </Link>

          {exam.level && (
            <span
              className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap ${getLevelColor(
                exam.level
              )}`}
            >
              {getLevelLabel(exam.level)}
            </span>
          )}

          {is_solved && (
            <span className="inline-flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-green-100 text-green-600 font-medium whitespace-nowrap">
              <svg
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="hidden sm:inline">تم الحل</span>
            </span>
          )}

          {!isRegistered && (
            <LockIcon2 className="fill-secondary w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
          )}
        </div>

        {/* Time and Date Section */}
        <div className="w-full lg:w-auto flex items-center justify-between lg:justify-end gap-2 sm:gap-3 lg:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            {exam.date && (
              <span className="text-text-alt text-[10px] sm:text-xs md:text-sm whitespace-nowrap">
                {exam.date}
              </span>
            )}
            <span className="text-text-alt text-[10px] sm:text-xs md:text-sm whitespace-nowrap">
              {formatTime(exam.time)}
            </span>
          </div>

          {hasContent && (
            <div
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 flex-shrink-0 ${
                isExpanded ? "rotate-180" : "rotate-0"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-full h-full text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && hasContent && (
        <div className="border-t-2 border-zinc-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 space-y-3 sm:space-y-4">
          {exam.description && (
            <p className="text-text-alt text-xs sm:text-sm">
              {exam.description}
            </p>
          )}

          {/* Videos Section */}
          {videos.length > 0 && (
            <div className="space-y-2 sm:space-y-3">
              <h4 className="font-medium text-text text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2">
                <RoundedPlayIcon className="w-4 h-4 sm:w-5 sm:h-5 stroke-primary flex-shrink-0" />
                فيديوهات الشرح
              </h4>
              {videos.map((video) => {
                const platform = getVideoPlatform(video.video_url);
                const isPlayable = !!platform;

                return (
                  <div
                    key={video.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-xl border border-gray-200 gap-2 sm:gap-3"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      <RoundedPlayIcon className="w-5 h-5 sm:w-6 sm:h-6 stroke-primary flex-shrink-0" />
                      <div className="flex flex-col flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          {isRegistered && isPlayable ? (
                            <Link
                              href={{
                                pathname,
                                query: buildExamVideoQuery(video),
                                hash: "player",
                              }}
                              className="font-medium text-text text-xs sm:text-sm hover:text-primary hover:underline transition-colors line-clamp-1"
                            >
                              {video.title}
                            </Link>
                          ) : (
                            <span className="font-medium text-text text-xs sm:text-sm line-clamp-1">
                              {video.title}
                            </span>
                          )}
                        </div>
                        {video.description && (
                          <span className="text-text-alt text-[10px] sm:text-xs line-clamp-1">
                            {video.description}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-auto">
                      {!isRegistered ? (
                        <LockIcon2 className="fill-secondary w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <>
                          {isPlayable && (
                            <Link
                              href={{
                                pathname,
                                query: buildExamVideoQuery(video),
                                hash: "player",
                              }}
                              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-primary rounded-full hover:opacity-90 transition-opacity"
                            >
                              <svg
                                className="w-3 h-3 sm:w-4 sm:h-4 text-white flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-white font-medium text-[10px] sm:text-xs whitespace-nowrap">
                                تشغيل
                              </span>
                            </Link>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* PDFs Section */}
          {exam_pdfs.length > 0 && (
            <div className="space-y-2 sm:space-y-3">
              <h4 className="font-medium text-text text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2">
                <FileIcon className="w-4 h-4 sm:w-5 sm:h-5 fill-primary flex-shrink-0" />
                ملفات الاختبار
              </h4>
              {exam_pdfs.map((pdf) => {
                const pdfDownloadId = `${pdf.title}-pdf`;
                const isPdfDownloading = isDownloading === pdfDownloadId;

                return (
                  <div
                    key={pdf.id}
                    className={cx(
                      "flex flex-col sm:flex-row sm:items-center justify-between p-2 sm:p-3 rounded-xl border gap-2 sm:gap-3",
                      pdf.type === "question"
                        ? "bg-gray-50 border-gray-200"
                        : "bg-gray-50 border-gray-200"
                    )}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      <FileIcon
                        className={cx(
                          "w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0",
                          pdf.type === "question"
                            ? "fill-blue-600"
                            : "fill-green-600"
                        )}
                      />
                      <div className="flex flex-col flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                          <span className="font-medium text-text text-xs sm:text-sm line-clamp-1">
                            {pdf.title}
                          </span>
                          <span
                            className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap ${
                              pdf.type === "question"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-green-100 text-green-600"
                            }`}
                          >
                            {pdf.type === "question" ? "أسئلة" : "إجابات"}
                          </span>
                        </div>
                        {pdf.description && (
                          <span className="text-text-alt text-[10px] sm:text-xs line-clamp-1">
                            {pdf.description}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="self-end sm:self-auto flex-shrink-0">
                      {!isRegistered ? (
                        <LockIcon2 className="fill-secondary w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <button
                          onClick={(e) =>
                            handleDownloadFile(e, pdf.pdf_url, pdf.title, "pdf")
                          }
                          disabled={isPdfDownloading}
                          className={cx(
                            "inline-flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full md:rounded-[10px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-wait",
                            pdf.type === "question"
                              ? "bg-blue-600"
                              : "bg-green-600"
                          )}
                        >
                          {isPdfDownloading ? (
                            <svg
                              className="animate-spin w-3 h-3 sm:w-4 sm:h-4 text-white flex-shrink-0"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                              />
                            </svg>
                          ) : (
                            <DownloadIcon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          )}
                          <span className="text-white font-medium text-[10px] sm:text-xs whitespace-nowrap">
                            {isPdfDownloading ? "جاري..." : "تحميل"}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Action Buttons */}
          {isRegistered && (
            <div className="flex justify-center gap-2 sm:gap-3 pt-2">
              {is_solved ? (
                <button
                  disabled
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-300 text-gray-500 rounded-xl cursor-not-allowed font-medium text-xs sm:text-sm md:text-base"
                  title="لقد قمت بحل هذا الاختبار مسبقاً"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="hidden sm:inline">تم الحل مسبقاً</span>
                  <span className="sm:hidden">تم الحل</span>
                </button>
              ) : (
                <Link
                  href={`/mock-test/${exam.id}`}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity font-medium text-xs sm:text-sm md:text-base"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  بدء الاختبار
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
