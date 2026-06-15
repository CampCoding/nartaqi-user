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
  const [examModeModal, setExamModeModal] = useState({ isOpen: false, examId: null });

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
      <div className="text-right justify-center text-primary text-xl md:text-2xl font-bold mb-7 lg:mb-10">
        محتوي الدورة : {round.name}
      </div>

      <Navs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {selectedTab === "foundation" && (
        <div className="  flex flex-col gap-4 md:gap-5">
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
            <div className="text-center py-12 md:py-14 text-text-alt text-base md:text-lg">
              لا يوجد محتوى تأسيسي متاح
            </div>
          )}
        </div>
      )}

      {selectedTab === "lectures" && (
        <div className="flex flex-col gap-4 md:gap-5">
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
            <div className="text-center py-12 md:py-14 text-text-alt text-base md:text-lg">
              لا توجد محاضرات متاحة
            </div>
          )}
        </div>
      )}

      {selectedTab === "tests" && (
        <div className="flex flex-col gap-4 md:gap-5">
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
            <div className="text-center py-12 md:py-14 text-text-alt text-base md:text-lg">
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
      className="flex w-full mb-7 lg:mb-9 items-center justify-between
                 p-3.5 lg:p-4 bg-[#ebf3fe]
                 rounded-[22px] lg:rounded-[28px]
                 overflow-x-auto hidden-scroll gap-2.5"
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
              "min-h-[48px] lg:min-h-[54px]",
              "px-4 md:px-6 py-3 md:py-3.5",
              "rounded-[18px] lg:rounded-[20px]",
              "transition-all duration-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300",
              tab.id === "tests" ? "lg:w-[210px]" : "lg:inline-flex",
              selected
                ? "bg-primary font-bold text-white shadow-sm"
                : "text-zinc-500",
              !selected ? "hover:bg-white/60 hover:text-zinc-700" : "",
            ].join(" ")}
          >
            <span className="w-fit text-center text-sm md:text-lg lg:text-xl leading-normal truncate">
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

  const getLevelLabel = (level) => {
    const levels = { easy: "سهل", medium: "متوسط", hard: "صعب" };
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
        !isRegistered ? "يجب التسجيل في الدورة أولاً 🔒" : isFutureExam ? "هذا الاختبار لم يبدأ بعد ⏳" : ""
      }
      className={cx(
        "flex flex-col relative bg-white rounded-[22px] md:rounded-[26px] border-2 border-solid transition-all border-zinc-300",
        isExpanded ? "shadow-xl" : "hover:shadow-2xl"
      )}
    >
      {/* Main Row */}
      <div
        onClick={() => {

          hasContent && setIsExpanded(!isExpanded)


        }}
        className={cx(
          "flex flex-col lg:flex-row items-start lg:items-center justify-between",
          "p-4 sm:p-5 lg:px-7 lg:py-7",
          "gap-4 sm:gap-5",
          hasContent && "cursor-pointer"
        )}
      >
        {/* Title + Tags */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1 flex-wrap w-full lg:w-auto min-w-0">
          {!isRegistered && (
            <LockIcon2 className="fill-secondary w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
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
              "font-medium text-text text-sm sm:text-base md:text-lg transition-all line-clamp-2 sm:line-clamp-1",
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

          {/* {exam.level && (
            <span
              className={`text-xs md:text-sm px-2.5 py-1 rounded-full whitespace-nowrap ${getLevelColor(
                exam.level
              )}`}
            >
              {getLevelLabel(exam.level)}
            </span>
          )} */}
        </div>

        {/* Time + Date */}
        <div className="w-full lg:w-auto flex items-center justify-between lg:justify-end gap-3 sm:gap-4 lg:gap-5">
          <div className="flex items-center gap-3 sm:gap-4">

            {examData?.show_date && isBlocked && (
              <span className="text-text-alt text-xs sm:text-sm whitespace-nowrap">
                متاح في {new Date(examData?.show_date).toLocaleDateString("ar-EG", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
            <span className="text-text-alt text-xs sm:text-sm whitespace-nowrap">
              {formatTime(exam.time)}
            </span>
          </div>

          {hasContent && (
            <div
              className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 flex-shrink-0 ${isExpanded ? "rotate-180" : "rotate-0"
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
        <div className="border-t-2 border-zinc-200 px-4 sm:px-5 lg:px-7 py-5 sm:py-6 space-y-5 sm:space-y-6">
          {exam.description && (
            <p className="text-text-alt text-sm md:text-base leading-relaxed">
              {exam.description}
            </p>
          )}

          {/* Videos */}
          {videos.length > 0 && (
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-medium text-text text-sm md:text-base flex items-center gap-2">
                <RoundedPlayIcon className="w-5 h-5 md:w-6 md:h-6 stroke-primary flex-shrink-0" />
                فيديوهات الشرح
              </h4>

              {videos.map((video) => {
                const platform = getVideoPlatform(video.video_url);
                const isPlayable = !!platform;

                return (
                  <div
                    key={video.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between
                               p-3.5 sm:p-4.5 bg-gray-50 rounded-2xl border border-gray-200
                               gap-3 sm:gap-4"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <RoundedPlayIcon className="w-6 h-6 md:w-7 md:h-7 stroke-primary flex-shrink-0" />
                      <div className="flex flex-col flex-1 min-w-0 gap-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          {isRegistered && isPlayable ? (
                            <Link
                              href={{
                                pathname,
                                query: buildExamVideoQuery(video),
                                hash: "player",
                              }}
                              className="font-medium text-text text-sm md:text-base hover:text-primary hover:underline transition-colors line-clamp-1"
                            >
                              {video.title}
                            </Link>
                          ) : (
                            <span className="font-medium text-text text-sm md:text-base line-clamp-1">
                              {video.title}
                            </span>
                          )}
                        </div>

                        {video.description && (
                          <span className="text-text-alt text-xs md:text-sm line-clamp-1">
                            {video.description}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-auto">
                      {!isRegistered ? (
                        <LockIcon2 className="fill-secondary w-5 h-5 md:w-6 md:h-6" />
                      ) : (
                        isPlayable && (
                          <Link
                            href={{
                              pathname,
                              query: buildExamVideoQuery(video),
                              hash: "player",
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary rounded-full hover:opacity-90 transition-opacity"
                          >
                            <svg
                              className="w-4 h-4 md:w-5 md:h-5 text-white flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-white font-medium text-sm md:text-base whitespace-nowrap">
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
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-medium text-text text-sm md:text-base flex items-center gap-2">
                <FileIcon className="w-5 h-5 md:w-6 md:h-6 fill-primary flex-shrink-0" />
                ملفات الاختبار
              </h4>

              {exam_pdfs.map((pdf) => {
                const pdfDownloadId = `${pdf.title}-pdf`;
                const isPdfDownloading = isDownloading === pdfDownloadId;

                return (
                  <div
                    key={pdf.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between
                               p-3.5 sm:p-4.5 rounded-2xl border bg-gray-50 border-gray-200
                               gap-3 sm:gap-4"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <FileIcon
                        className={cx(
                          "w-6 h-6 md:w-7 md:h-7 flex-shrink-0",
                          pdf.type === "question"
                            ? "fill-blue-600"
                            : "fill-green-600"
                        )}
                      />

                      <div className="flex flex-col flex-1 min-w-0 gap-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-text text-sm md:text-base line-clamp-1">
                            {pdf.title}
                          </span>
                          {/* <span
                            className={`text-xs md:text-sm px-2.5 py-1 rounded-full whitespace-nowrap ${pdf.type === "question"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-green-100 text-green-600"
                              }`}
                          >
                            {pdf.type === "question" ? "أسئلة" : "إجابات"}
                          </span> */}
                        </div>

                        {pdf.description && (
                          <span className="text-text-alt text-xs md:text-sm line-clamp-1">
                            {pdf.description}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="self-end sm:self-auto flex-shrink-0">
                      {!isRegistered ? (
                        <LockIcon2 className="fill-secondary w-5 h-5 md:w-6 md:h-6" />
                      ) : (
                        <button
                          onClick={(e) =>
                            handleDownloadFile(e, pdf.pdf_url, pdf.title, "pdf")
                          }
                          disabled={isPdfDownloading}
                          className={cx(
                            "inline-flex items-center gap-2 px-4 py-2.5 rounded-full md:rounded-[12px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-wait",
                            pdf.type === "question"
                              ? "bg-blue-600"
                              : "bg-green-600"
                          )}
                        >
                          {isPdfDownloading ? (
                            <svg
                              className="animate-spin w-4 h-4 md:w-5 md:h-5 text-white flex-shrink-0"
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
                            <DownloadIcon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                          )}
                          <span className="text-white font-medium text-sm md:text-base whitespace-nowrap">
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
                className={["inline-flex items-center gap-2 px-7 sm:px-9 py-3.5 bg-primary text-white rounded-2xl hover:opacity-90 transition-opacity font-medium text-sm md:text-base", isBlocked ? "pointer-events-auto opacity-60 cursor-not-allowed hover:no-underline hover:text-text" : " hover:shadow-2xl hover:scale-105 !transition-all "].join(" ")}
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl transform transition-all scale-100">
        <div className="bg-primary p-8 text-white text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-white"
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
          <h3 className="text-2xl font-bold mb-2">اختيار وضع الاختبار</h3>
          <p className="text-white/80">اختر الطريقة التي تفضل بها أداء الاختبار المحاكي</p>
        </div>

        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href={`/mock-test/${examId}`}
            onClick={onClose}
            className="group flex flex-col items-center p-6 bg-gray-50 rounded-3xl border-2 border-transparent hover:border-primary hover:bg-primary/5 transition-all"
          >
            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all text-primary">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="font-bold text-lg text-text">الوضع الافتراضي</span>
            <span className="text-sm text-text-alt text-center mt-2">الشكل الكلاسيكي للاختبار المحاكي</span>
          </Link>

          <Link
            href={`/mock-test/${examId}?mode=tiger`}
            onClick={onClose}
            className="group flex flex-col items-center p-6 bg-gray-50 rounded-3xl border-2 border-transparent hover:border-secondary hover:bg-secondary/5 transition-all"
          >
            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white transition-all text-secondary">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-lg text-text">وضع النمر</span>
            <span className="text-sm text-text-alt text-center mt-2">تصميم عصري وتجربة أسرع</span>
          </Link>
        </div>

        <button
          onClick={onClose}
          className="w-full py-5 text-text-alt font-medium hover:text-text bg-gray-50 hover:bg-gray-100 transition-all border-t border-gray-100"
        >
          إلغاء
        </button>
      </div>
    </div>
  );
};
