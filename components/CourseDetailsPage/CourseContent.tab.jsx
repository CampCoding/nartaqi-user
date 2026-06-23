"use client";

import React, { useState, useCallback, useEffect } from "react";
import CourseContentDrawer from "../ui/CourseContentDrawer";
import Link from "@/components/ui/NavLink";
import { usePathname, useSearchParams } from "next/navigation";
import {
  DownloadIcon,
  FileIcon,
  RoundedPlayIcon,
  LockIcon2,
} from "../../public/svgs";
import cx from "../../lib/cx";
import { createPortal } from "react-dom";

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
  const [examModeModal, setExamModeModal] = useState({
    isOpen: false,
    examId: null,
  });

  const handleOpenModeModal = (examId) => {
    setExamModeModal({ isOpen: true, examId });
  };

  const { contents, round, exams_round, own } = courseData;
  const isFree = round.free == 1;

  const foundationContents = contents.filter(
    (c) => c.content_type === "basic" || c.content_type === "foundation"
  );

  const lectureContents = contents.filter((c) => c.content_type === "lecture");

  const allExams = exams_round || [];

  return (
    <div className="w-full flex-1">
      <div className="text-right text-primary text-lg sm:text-xl md:text-2xl font-bold mb-5 sm:mb-7 lg:mb-10">
        محتوي الدورة : {round.name}
      </div>

      <Navs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {selectedTab === "foundation" && (
        <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
          {foundationContents.length > 0 ? (
            [...foundationContents].map((content) => (
              <CourseContentDrawer
                key={content.id}
                content={content}
                isRegistered={own || isFree}
                allExams={allExams}
                own={own || isFree}
              />
            ))
          ) : (
            <div className="text-center py-10 sm:py-12 md:py-14 text-text-alt text-sm sm:text-base md:text-lg">
              لا يوجد محتوى تأسيسي متاح
            </div>
          )}
        </div>
      )}

      {selectedTab === "lectures" && (
        <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
          {lectureContents.length > 0 ? (
            lectureContents.map((content) => (
              <CourseContentDrawer
                key={content.id}
                content={content}
                isRegistered={own || isFree}
                own={own || isFree}
              />
            ))
          ) : (
            <div className="text-center py-10 sm:py-12 md:py-14 text-text-alt text-sm sm:text-base md:text-lg">
              لا توجد محاضرات متاحة
            </div>
          )}
        </div>
      )}

      {selectedTab === "tests" && (
        <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
          {allExams.length > 0 ? (
            allExams.map((examData) => (
              <TestRow
                key={examData.exam.id}
                examData={examData}
                isRegistered={own || isFree}
                onOpenModeModal={handleOpenModeModal}
              />
            ))
          ) : (
            <div className="text-center py-10 sm:py-12 md:py-14 text-text-alt text-sm sm:text-base md:text-lg">
              لا توجد اختبارات متاحة
            </div>
          )}
        </div>
      )}

      <ExamModeModal
        isOpen={examModeModal.isOpen}
        onClose={() => setExamModeModal({ isOpen: false, examId: null })}
        examId={examModeModal.examId}
      />
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
      className="flex w-full mb-5 sm:mb-7 lg:mb-9 items-center justify-between
                 p-2 sm:p-3 lg:p-4 bg-[#ebf3fe]
                 rounded-[16px] sm:rounded-[20px] lg:rounded-[28px]
                 overflow-x-auto hidden-scroll gap-1.5 sm:gap-2.5"
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
              "min-h-[40px] sm:min-h-[44px] md:min-h-[48px] lg:min-h-[54px]",
              "px-2.5 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3.5",
              "rounded-[12px] sm:rounded-[16px] lg:rounded-[20px]",
              "transition-all duration-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300",
              tab.id === "tests" ? "lg:w-[210px]" : "lg:inline-flex",
              selected
                ? "bg-primary font-bold text-white shadow-sm"
                : "text-zinc-500",
              !selected ? "hover:bg-white/60 hover:text-zinc-700" : "",
            ].join(" ")}
          >
            <span className="w-fit text-center text-xs sm:text-sm md:text-base lg:text-xl leading-normal truncate">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export const TestRow = ({ examData, isRegistered, onOpenModeModal }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { exam, videos = [], exam_pdfs = [] } = examData;

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

    if (
      videoUrl &&
      (videoUrl.toLowerCase().includes("youtube") ||
        videoUrl.toLowerCase().includes("youtu.be"))
    ) {
      query.youtube_id = encodeId(videoUrl);
      return query;
    }

    if (videoUrl) query.vimeo_id = encodeId(videoUrl);
    return query;
  };

  const getVideoPlatform = (videoUrl) => {
    if (!videoUrl) return null;
    const vimeoId = extractVimeoId(videoUrl);
    if (vimeoId || videoUrl.toLowerCase().includes("vimeo")) return "vimeo";
    const youtubeId = extractYoutubeId(videoUrl);
    if (
      youtubeId ||
      videoUrl.toLowerCase().includes("youtube") ||
      videoUrl.toLowerCase().includes("youtu.be")
    )
      return "youtube";
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
        headers: { "Content-Type": "application/octet-stream" },
      });

      if (!response.ok) throw new Error("فشل في جلب الملف");

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

  const examDate = examData?.show_date ? new Date(examData?.show_date) : null;
  const isFutureExam = examDate ? examDate.getTime() > Date.now() : false;
  const isBlocked = !isRegistered || isFutureExam;

  return (
    <div
      title={
        !isRegistered
          ? "يجب التسجيل في الدورة أولاً 🔒"
          : isFutureExam
            ? "هذا الاختبار لم يبدأ بعد ⏳"
            : ""
      }
      className={cx(
        "flex flex-col relative bg-white rounded-[16px] sm:rounded-[20px] md:rounded-[26px] border-2 border-solid transition-all border-zinc-300",
        isExpanded ? "shadow-xl" : "hover:shadow-2xl"
      )}
    >
      {/* Main Row */}
      <div
        onClick={() => {
          hasContent && setIsExpanded(!isExpanded);
        }}
        className={cx(
          "flex flex-col lg:flex-row items-start lg:items-center justify-between",
          "p-3 sm:p-4 md:p-5 lg:px-7 lg:py-7",
          "gap-3 sm:gap-4 lg:gap-5",
          hasContent && "cursor-pointer"
        )}
      >
        {/* Title + Tags */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 flex-wrap w-full lg:w-auto min-w-0">
          {!isRegistered && (
            <LockIcon2 className="fill-secondary w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" />
          )}
          <Link
            href={
              isBlocked
                ? "#"
                : exam.type === "mock"
                  ? `/mock-test/${exam.id}`
                  : `/intern-test-details/${exam.id}`
            }
            onClick={(e) => {
              if (isBlocked) {
                e.preventDefault();
                if (!isRegistered) {
                  alert("يجب التسجيل في الدورة أولاً 🔒");
                } else if (isFutureExam) {
                  alert("هذا الاختبار لم يبدأ بعد ⏳");
                }
              } else if (exam.type === "mock") {
                e.preventDefault();
                onOpenModeModal(exam.id);
              }
              e.stopPropagation();
            }}
            className={[
              "font-medium text-text text-xs sm:text-sm md:text-base lg:text-lg transition-all line-clamp-2 sm:line-clamp-1",
              isBlocked
                ? "pointer-events-auto opacity-60 cursor-not-allowed hover:no-underline hover:text-text"
                : "hover:text-primary hover:underline",
            ].join(" ")}
            aria-disabled={isBlocked}
          >
            {exam.title || "غير محدد"}{" "}
            {exam.type === "mock" ? (
              <span className="text-primary">(اختر وضع الاختبار)</span>
            ) : (
              <span className="text-secondary">(تدريـــــب)</span>
            )}
          </Link>
        </div>

        {/* Time + Date */}
        <div className="w-full lg:w-auto flex items-center justify-between lg:justify-end gap-2 sm:gap-3 md:gap-4 lg:gap-5">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
            {examData?.show_date && isBlocked && (
              <span className="text-text-alt text-[11px] sm:text-xs md:text-sm whitespace-nowrap">
                متاح في{" "}
                {new Date(examData?.show_date).toLocaleDateString("ar-EG", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
            <span className="text-text-alt text-[11px] sm:text-xs md:text-sm whitespace-nowrap">
              {formatTime(exam.time)}
            </span>
          </div>

          {hasContent && (
            <div
              className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform duration-300 flex-shrink-0 ${isExpanded ? "rotate-180" : "rotate-0"
                }`}
              aria-hidden="true"
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
        <div className="border-t-2 border-zinc-200 px-3 sm:px-4 md:px-5 lg:px-7 py-4 sm:py-5 md:py-6 space-y-4 sm:space-y-5 md:space-y-6">
          {exam.description && (
            <p className="text-text-alt text-xs sm:text-sm md:text-base leading-relaxed">
              {exam.description}
            </p>
          )}

          {/* Videos */}
          {videos.length > 0 && (
            <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
              <h4 className="font-medium text-text text-xs sm:text-sm md:text-base flex items-center gap-2">
                <RoundedPlayIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 stroke-primary flex-shrink-0" />
                فيديوهات الشرح
              </h4>

              {videos.map((video) => {
                const platform = getVideoPlatform(video.video_url);
                const isPlayable = !!platform;

                return (
                  <div
                    key={video.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between
                               p-3 sm:p-3.5 md:p-4 bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-200
                               gap-2.5 sm:gap-3 md:gap-4"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4 flex-1 min-w-0">
                      <RoundedPlayIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 stroke-primary flex-shrink-0" />
                      <div className="flex flex-col flex-1 min-w-0 gap-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          {isRegistered && isPlayable ? (
                            <Link
                              href={{
                                pathname,
                                query: buildExamVideoQuery(video),
                                hash: "player",
                              }}
                              className="font-medium text-text text-xs sm:text-sm md:text-base hover:text-primary hover:underline transition-colors line-clamp-1"
                            >
                              {video.title}
                            </Link>
                          ) : (
                            <span className="font-medium text-text text-xs sm:text-sm md:text-base line-clamp-1">
                              {video.title}
                            </span>
                          )}
                        </div>

                        {video.description && (
                          <span className="text-text-alt text-[11px] sm:text-xs md:text-sm line-clamp-1">
                            {video.description}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-auto">
                      {!isRegistered ? (
                        <LockIcon2 className="fill-secondary w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      ) : (
                        isPlayable && (
                          <Link
                            href={{
                              pathname,
                              query: buildExamVideoQuery(video),
                              hash: "player",
                            }}
                            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-primary rounded-full hover:opacity-90 transition-opacity"
                          >
                            <svg
                              className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-white font-medium text-xs sm:text-sm md:text-base whitespace-nowrap">
                              تشغيل
                            </span>
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* PDFs */}
          {exam_pdfs.length > 0 && (
            <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
              <h4 className="font-medium text-text text-xs sm:text-sm md:text-base flex items-center gap-2">
                <FileIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-primary flex-shrink-0" />
                ملفات الاختبار
              </h4>

              {exam_pdfs.map((pdf) => {
                const pdfDownloadId = `${pdf.title}-pdf`;
                const isPdfDownloading = isDownloading === pdfDownloadId;

                return (
                  <div
                    key={pdf.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between
                               p-3 sm:p-3.5 md:p-4 rounded-xl sm:rounded-2xl border bg-gray-50 border-gray-200
                               gap-2.5 sm:gap-3 md:gap-4"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4 flex-1 min-w-0">
                      <FileIcon
                        className={cx(
                          "w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex-shrink-0",
                          pdf.type === "question"
                            ? "fill-blue-600"
                            : "fill-green-600"
                        )}
                      />

                      <div className="flex flex-col flex-1 min-w-0 gap-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-text text-xs sm:text-sm md:text-base line-clamp-1">
                            {pdf.title}
                          </span>
                        </div>

                        {pdf.description && (
                          <span className="text-text-alt text-[11px] sm:text-xs md:text-sm line-clamp-1">
                            {pdf.description}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="self-end sm:self-auto flex-shrink-0">
                      {!isRegistered ? (
                        <LockIcon2 className="fill-secondary w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      ) : (
                        <button
                          onClick={(e) =>
                            handleDownloadFile(e, pdf.pdf_url, pdf.title, "pdf")
                          }
                          disabled={isPdfDownloading}
                          className={cx(
                            "inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full md:rounded-[12px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-wait",
                            pdf.type === "question"
                              ? "bg-blue-600"
                              : "bg-green-600"
                          )}
                        >
                          {isPdfDownloading ? (
                            <svg
                              className="animate-spin w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white flex-shrink-0"
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
                            <DownloadIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                          )}
                          <span className="text-white font-medium text-xs sm:text-sm md:text-base whitespace-nowrap">
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

          {/* Action Button */}
          {isRegistered && (
            <div className="flex justify-center pt-2">
              <Link
                href={
                  isBlocked
                    ? "#"
                    : exam.type === "mock"
                      ? `/mock-test/${exam.id}`
                      : `/intern-test-details/${exam.id}`
                }
                onClick={(e) => {
                  if (isBlocked) {
                    e.preventDefault();
                  } else if (exam.type === "mock") {
                    e.preventDefault();
                    onOpenModeModal(exam.id);
                  }
                }}
                className={[
                  "inline-flex items-center gap-2 px-5 sm:px-7 md:px-9 py-2.5 sm:py-3 md:py-3.5 bg-primary text-white rounded-xl sm:rounded-2xl hover:opacity-90 transition-opacity font-medium text-xs sm:text-sm md:text-base",
                  isBlocked
                    ? "pointer-events-auto opacity-60 cursor-not-allowed hover:no-underline hover:text-text"
                    : "hover:shadow-2xl hover:scale-105 !transition-all",
                ].join(" ")}
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0"
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
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ExamModeModal = ({ isOpen, onClose, examId }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleEsc = (e) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handleEsc);

      return () => {
        document.body.style.overflow = originalOverflow;
        document.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 flex items-center justify-center p-3 sm:p-4"
      style={{ zIndex: 2147483647 }}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        style={{ zIndex: 1 }}
      />

      <div
        className="relative bg-white rounded-[20px] sm:rounded-[28px] md:rounded-[32px] w-full max-w-sm sm:max-w-md md:max-w-lg overflow-hidden shadow-2xl transform transition-all scale-100"
        style={{ zIndex: 2 }}
      >
        <div className="bg-primary p-5 sm:p-6 md:p-8 text-white text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1.5 sm:mb-2">
            اختيار وضع الاختبار
          </h3>
          <p className="text-white/80 text-xs sm:text-sm md:text-base">
            اختر الطريقة التي تفضل بها أداء الاختبار المحاكي
          </p>
        </div>

        <div className="p-5 sm:p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          <Link
            href={`/mock-test/${examId}`}
            onClick={onClose}
            className="group flex flex-col items-center p-4 sm:p-5 md:p-6 bg-gray-50 rounded-2xl sm:rounded-3xl border-2 border-transparent hover:border-primary hover:bg-primary/5 transition-all"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white rounded-xl sm:rounded-2xl shadow-sm flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary group-hover:text-white transition-all text-primary">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="font-bold text-sm sm:text-base md:text-lg text-text">
              الوضع الافتراضي
            </span>
            <span className="text-[11px] sm:text-xs md:text-sm text-text-alt text-center mt-1.5 sm:mt-2">
              الشكل الكلاسيكي للاختبار المحاكي
            </span>
          </Link>

          <Link
            href={`/mock-test/${examId}?mode=tiger`}
            onClick={onClose}
            className="group flex flex-col items-center p-4 sm:p-5 md:p-6 bg-gray-50 rounded-2xl sm:rounded-3xl border-2 border-transparent hover:border-secondary hover:bg-secondary/5 transition-all"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white rounded-xl sm:rounded-2xl shadow-sm flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-secondary group-hover:text-white transition-all text-secondary">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="font-bold text-sm sm:text-base md:text-lg text-text">
              وضع النمر
            </span>
            <span className="text-[11px] sm:text-xs md:text-sm text-text-alt text-center mt-1.5 sm:mt-2">
              تصميم عصري وتجربة أسرع
            </span>
          </Link>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 sm:py-4 md:py-5 text-text-alt font-medium hover:text-text bg-gray-50 hover:bg-gray-100 transition-all border-t border-gray-100 text-sm sm:text-base"
        >
          إلغاء
        </button>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};