"use client";

import {
  CheckListIcon,
  DownloadIcon,
  FileIcon,
  LiveIcon,
  LockIcon2,
  RoundedPlayIcon,
} from "./../../public/svgs";
import React, { useEffect, useMemo, useState, useId } from "react";
import {
  CourseChevronTopIcon,
  CourseLockIcon,
  CoursePlayIcon,
} from "../../public/svgs";
import cx from "../../lib/cx";
import Link from "@/components/ui/NavLink";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import useMakeStudentView from "../shared/Hooks/useMakestudentView";
import { useSelector } from "react-redux";
import CheckboxButton from "./CheckboxButton";
import { InfoIcon } from "./../../public/svgs";
import { Modal } from "antd";
import CursorLabelSection from "./CursorLabelSection";
import { formatDate } from "../utils/helpers/date";

// ==================== ENCODING/DECODING HELPERS ====================
export const encodeId = (value) => {
  if (!value) return null;
  try {
    return encodeURIComponent(btoa(String(value)));
  } catch (e) {
    console.error("Encoding error:", e);
    return null;
  }
};

export const extractVimeoId = (url) => {
  if (!url) return null;
  if (/^\d+$/.test(url)) return url;
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match ? match[1] : null;
};

export const extractYoutubeId = (url) => {
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
  const { token, user } = useSelector((state) => state.auth);
  const handleToggle = () => setIsOpen((prev) => !prev);

  const [infoOpen, setInfoOpen] = useState(false);

  const openInfo = (e) => {
    e.stopPropagation();
    setInfoOpen(true);
  };

  const closeInfo = () => setInfoOpen(false);

  return (
    <CursorLabelSection
      stop={true}
      label={
        <div className="">
          {isRegistered &&
            own &&
            !content?.was_opened &&
            content?.show_date && (
              <div className="text-xs sm:text-sm !text-red-900 text-right mt-2 text-text font-normal">
                متاح في: {content.show_date}
              </div>
            )}
        </div>
      }
    >
      <div
        className={cx(
          "self-stretch w-full transition-all bg-white rounded-xl sm:rounded-2xl md:rounded-[24px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)] outline outline-2 outline-offset-[-1px] outline-neutral-300 inline-flex flex-col justify-start items-start",
          !isOpen ? "hover:shadow-2xl" : "shadow-xl"
        )}
      >
        {/* Header */}
        <div
          className="self-stretch px-3.5 sm:px-5 md:px-7 py-4 sm:py-5 md:py-7 inline-flex justify-between items-start cursor-pointer gap-2"
          onClick={handleToggle}
        >
          <div className="flex-1 min-w-0">
            <div className="text-right flex items-start gap-2 text-text text-sm sm:text-base md:text-lg font-bold">
              <button
                type="button"
                onClick={openInfo}
                className="inline-flex items-center justify-center mt-1 flex-shrink-0"
                aria-label="عرض وصف المحتوى"
              >
                <InfoIcon />
              </button>

              <div className="min-w-0">
                <div className="line-clamp-2 sm:line-clamp-none">
                  {content.content_title || "غير محدد"}
                </div>
                {isRegistered &&
                  own &&
                  !content?.was_opened &&
                  content?.show_date && (
                    <div className="text-xs sm:text-sm !text-red-900 text-right mt-2 text-text font-normal">
                      متاح في: {content.show_date}
                    </div>
                  )}
              </div>
            </div>
          </div>

          <div className="transition-transform duration-300 flex-shrink-0">
            <div className="flex justify-between items-center gap-3 sm:gap-4 md:gap-5">
              <CourseChevronTopIcon
                className={`w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] md:w-[26px] md:h-[26px] ${!isOpen ? "rotate-180" : "rotate-0"
                  } transition-transform duration-300 !fill-primary`}
              />
              {!isRegistered && (
                <CourseLockIcon className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] md:w-[26px] md:h-[26px] !fill-primary" />
              )}
            </div>
          </div>
        </div>

        <Modal
          open={infoOpen}
          onCancel={closeInfo}
          footer={null}
          centered
          title={content.content_title || "وصف المحتوى"}
          width="90%"
          style={{ maxWidth: 600 }}
        >
          <div
            className="text-right leading-relaxed prose prose-neutral text-text leading-7 md:leading-8 text-xs sm:text-sm md:text-base font-normal"
            dangerouslySetInnerHTML={{
              __html:
                content?.description ||
                content?.content_description ||
                "<p>لا يوجد وصف متاح</p>",
            }}
          />
        </Modal>

        {/* Body */}
        {isOpen &&
          (isRegistered ? (
            <div className="w-full flex flex-col gap-3 sm:gap-4 md:gap-5 px-3.5 sm:px-5 md:px-7 pb-4 sm:pb-5 md:pb-7">
              {!content.lessons || content.lessons.length == 0 ? (
                <span className="text-gray-500 text-base sm:text-lg md:text-xl">
                  {" "}
                  لا يوجد بيانات{" "}
                </span>
              ) : (
                content.lessons.map((lesson) => (
                  <RegLectureDrawer
                    key={lesson.id}
                    lesson={lesson}
                    isDone={true}
                    own={own}
                    isSectionOpen={content.was_opened}
                    isRegistered={isRegistered}
                    token={token}
                    studentId={user?.id}
                    roundId={content?.round_id}
                  />
                ))
              )}
            </div>
          ) : (
            <div className="w-full flex flex-col gap-3 sm:gap-4 md:gap-5 px-3.5 sm:px-5 md:px-7 pb-4 sm:pb-5 md:pb-7">
              {content.lessons.map((lesson) => (
                <RegLectureDrawer
                  key={lesson.id}
                  lesson={lesson}
                  isDone={true}
                  isSectionOpen={content.was_opened}
                  own={own}
                  isRegistered={isRegistered}
                  token={token}
                  studentId={user?.id}
                  roundId={content?.round_id}
                />
              ))}
            </div>
          ))}
      </div>
    </CursorLabelSection>
  );
};

export default CourseContentDrawer;

// ==================== REG LECTURE DRAWER ====================
export const RegLectureDrawer = ({
  lesson,
  isDone,
  isRegistered,
  own,
  roundId,
  isSectionOpen,
  token,
  studentId,
}) => {
  const [savingMap, setSavingMap] = useState({});

  const { makeStudentView, loading: markingView } = useMakeStudentView(token, {
    onSuccess: () => null,
    onError: (msg) => toast.error(msg || "حصل خطأ أثناء تسجيل المشاهدة"),
  });

  const markingRef = React.useRef(new Set());

  const setWatched = async (item, nextChecked) => {
    if (item.type !== "video") return;
    if (!isRegistered) return;

    if (!token) {
      toast.error("token غير متوفر");
      return false;
    }
    if (!studentId || !roundId) {
      toast.error("studentId أو roundId غير متوفر");
      return false;
    }

    const key = `video-${item.id}`;
    if (markingRef.current.has(key)) return false;
    markingRef.current.add(key);

    setSavingMap((prev) => ({ ...prev, [key]: true }));

    try {
      const res = await makeStudentView({
        student_id: String(studentId),
        round_id: String(roundId),
        video_id: String(item.id),
        watched: nextChecked ? "1" : "0",
      });

      return !!res;
    } catch (e) {
      return false;
    } finally {
      setSavingMap((prev) => ({ ...prev, [key]: false }));
      markingRef.current.delete(key);
    }
  };

  const toggleChecked = async (item) => {
    const key = `video-${item.id}`;
    const prevChecked = !!checkedMap[key];
    const nextChecked = !prevChecked;

    setCheckedMap((prev) => ({ ...prev, [key]: nextChecked }));

    const ok = await setWatched(item, nextChecked);

    if (!ok) {
      setCheckedMap((prev) => ({ ...prev, [key]: prevChecked }));
      toast.error("حصل خطأ أثناء تحديث حالة المشاهدة");
      return;
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const sectionId = useId();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const mergedParams = {
    ...Object.fromEntries(searchParams.entries()),
    watch: true,
  };

  const toggleExpanded = () => setIsExpanded((v) => !v);

  const formatTime = (timeString) => {
    if (!timeString) return "";

    const isPM = timeString.toUpperCase().includes("PM");
    const isAM = timeString.toUpperCase().includes("AM");

    const cleanTime = timeString.replace(/\s*(AM|PM)\s*/gi, "").trim();
    const [hours, minutes] = cleanTime.split(":");

    let hour = parseInt(hours, 10);

    if (isPM || isAM) {
      if (isPM && hour !== 12) {
        hour = hour + 12;
      } else if (isAM && hour === 12) {
        hour = 0;
      }
    }

    const period = hour >= 12 ? "م" : "ص";
    const hour12 = hour % 12 || 12;

    return `${hour12}:${minutes} ${period}`;
  };

  const buildVideoQuery = (item) => {
    const query = { ...mergedParams, video: item.id };

    const vimeoSource =
      item?.vimeo_link || item?.link || item?.video_url || item?.url;
    const youtubeSource =
      item?.youtube_link || item?.link || item?.video_url || item?.url;

    const vimeoId = extractVimeoId(vimeoSource);
    if (vimeoId) {
      query.vimeo_id = encodeId(vimeoId);
      return query;
    }

    const youtubeId = extractYoutubeId(youtubeSource);
    if (youtubeId) {
      query.youtube_id = encodeId(youtubeId);
      return query;
    }

    const raw =
      item?.vimeo_link ||
      item?.youtube_link ||
      item?.link ||
      item?.video_url ||
      item?.url;
    if (raw) {
      if (String(raw).toLowerCase().includes("vimeo")) {
        query.vimeo_id = encodeId(raw);
        return query;
      }

      if (
        String(raw).toLowerCase().includes("youtube") ||
        String(raw).toLowerCase().includes("youtu.be")
      ) {
        query.youtube_id = encodeId(raw);
        return query;
      }

      query.vimeo_id = encodeId(raw);
    }

    return query;
  };

  const hasActiveLive = useMemo(() => {
    return (lesson.live || []).some((live) => live.finished !== "1");
  }, [lesson.live]);

  const allContent = useMemo(() => {
    if (hasActiveLive) {
      return (lesson.live || [])
        .filter((live) => live.finished !== "1")
        .map((live) => ({ ...live, type: "live" }));
    }

    return [
      ...(lesson.videos || []).map((video) => ({ ...video, type: "video" })),
      ...(lesson.live || [])
        .filter((live) => live.finished === "1")
        .map((live) => ({ ...live, type: "live" })),
    ];
  }, [hasActiveLive, lesson.live, lesson.videos]);

  const hasExams = lesson.exam_all_data && lesson.exam_all_data.length > 0;

  const toBool = (v) => v === true || v === 1 || v === "1" || v === "true";

  const buildInitCheckedMap = () => {
    const init = {};
    (lesson?.videos || []).forEach((v) => {
      init[`video-${v.id}`] =
        toBool(v?.watched) || v?.is_viewed == "1" || v?.is_done == "1" || false;
    });
    (lesson?.live || []).forEach((l) => {
      init[`live-${l.id}`] =
        toBool(l?.watched) || l?.is_viewed == "1" || l?.is_done == "1" || false;
    });
    return init;
  };

  const [checkedMap, setCheckedMap] = useState(() => buildInitCheckedMap());

  useEffect(() => {
    setCheckedMap(buildInitCheckedMap());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson?.id]);

  const [lessonInfoOpen, setLessonInfoOpen] = useState(false);

  const openLessonInfo = (e) => {
    e.stopPropagation();
    setLessonInfoOpen(true);
  };

  const closeLessonInfo = () => setLessonInfoOpen(false);

  const lessonDescription =
    lesson?.description || lesson?.lesson_description || lesson?.desc || "";

  return (
    <article
      className={cx(
        "flex w-full flex-col items-start relative bg-white rounded-xl sm:rounded-2xl md:rounded-[32px] border-2 border-solid border-variable-collection-stroke transition-all",
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
        className="flex cursor-pointer gap-3 sm:gap-4 md:gap-6 p-3.5 sm:p-5 md:p-6 lg:p-7 items-start justify-between self-stretch w-full"
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-controls={sectionId}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <button
            type="button"
            onClick={openLessonInfo}
            className="inline-flex items-center justify-center flex-shrink-0"
            aria-label="عرض وصف الدرس"
          >
            <InfoIcon />
          </button>
          <div className="min-w-0">
            <h1 className="font-bold cursor-pointer text-text text-sm sm:text-base md:text-lg leading-snug line-clamp-2">
              {lesson.lesson_title || "غير محدد"}
            </h1>
            {isRegistered &&
              own &&
              !lesson?.was_opened &&
              lesson?.show_date && (
                <div className="text-xs sm:text-sm !text-red-900 text-right mt-2 text-text font-normal">
                  متاح في: {lesson.show_date}
                </div>
              )}
          </div>
        </div>

        <div
          className="shrink-0 transition-transform duration-300"
          aria-hidden="true"
        >
          <div className="flex justify-between items-center gap-3 sm:gap-4 md:gap-5">
            <CourseChevronTopIcon
              className={`w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] md:w-[26px] md:h-[26px] ${!isExpanded ? "rotate-180" : "rotate-0"
                } transition-transform duration-300 !fill-primary`}
            />
            {!isRegistered && (
              <CourseLockIcon className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] md:w-[26px] md:h-[26px] !fill-primary" />
            )}
          </div>
        </div>
      </header>

      <Modal
        open={lessonInfoOpen}
        onCancel={closeLessonInfo}
        footer={null}
        centered
        title={lesson.lesson_title || "وصف الدرس"}
        width="90%"
        style={{ maxWidth: 600 }}
      >
        <div
          className="text-right leading-relaxed prose prose-neutral text-text leading-7 md:leading-8 text-xs sm:text-sm md:text-base font-normal"
          dangerouslySetInnerHTML={{
            __html: lessonDescription?.trim()
              ? lessonDescription
              : "<p>لا يوجد وصف متاح لهذا الدرس</p>",
          }}
        />
      </Modal>

      {isExpanded && (
        <section
          id={sectionId}
          className="flex flex-col items-start self-stretch w-full gap-3 sm:gap-4 md:gap-6 p-3.5 sm:p-5 md:p-6 lg:p-7 !pt-0"
        >
          {/* Videos and Live Sessions */}
          {!allContent || allContent.length == 0 ? (
            <span className="text-gray-500 text-base sm:text-lg md:text-xl">
              {" "}
              لا يوجد بيانات{" "}
            </span>
          ) : (
            allContent.map((item) => {
              const key = `video-${item.id}`;
              const isSaving = !!savingMap[key];

              return (
                <div
                  key={`${item.type}-${item.id}`}
                  className="flex items-start gap-3 sm:gap-4 pt-3 sm:pt-4 pb-4 sm:pb-5 md:pb-6 w-full border-b-[2px] border-solid border-variable-collection-stroke"
                >
                  <RoundedPlayIcon
                    className={cx(
                      "w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] md:w-[36px] md:h-[36px] flex-shrink-0",
                      item.type === "live" ? "stroke-danger" : "stroke-primary"
                    )}
                  />

                  <div
                    className={cx(
                      "flex w-full flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 self-stretch min-w-0"
                    )}
                  >
                    <div className="inline-flex items-center gap-2 sm:gap-3 min-w-0">
                      {item.type === "video" ? (
                        isRegistered ? (
                          <Link
                            href={
                              lesson.was_opened && isSectionOpen
                                ? {
                                  pathname,
                                  query: buildVideoQuery(item),
                                  hash: "player",
                                }
                                : "#"
                            }
                          >
                            <h2 className="cursor-pointer font-medium text-text text-sm sm:text-base md:text-lg leading-snug line-clamp-2 hover:text-primary transition-colors">
                              {item.title || "غير محدد"}
                            </h2>
                          </Link>
                        ) : (
                          <h2 className="font-medium text-text text-sm sm:text-base md:text-lg leading-snug line-clamp-2">
                            {item.title || "غير محدد"}
                          </h2>
                        )
                      ) : (
                        <div className="flex flex-col gap-1 min-w-0">
                          <h2 className="font-medium text-text text-sm sm:text-base md:text-lg leading-snug line-clamp-2">
                            {item.title || "غير محدد"}
                          </h2>

                          {item.finished == "1" ? (
                            <Link
                              href={{
                                pathname,
                                query: buildVideoQuery(item),
                                hash: "player",
                              }}
                              className="text-gray-500 underline text-xs sm:text-sm md:text-base"
                              rel="noreferrer"
                            >
                              عرض التسجيل
                            </Link>
                          ) : (
                            <a
                              className="text-gray-500 underline text-xs sm:text-sm md:text-base"
                              href={item.link}
                              target="_blank"
                              rel="noreferrer"
                            >
                              دخول البث
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Right side: status/time */}
                    <div className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0 self-end sm:self-auto">
                      {item.type === "live" ? (
                        <div className="inline-flex items-center gap-2 flex-wrap justify-end">
                          <span className="font-bold text-xs sm:text-sm md:text-base leading-normal">
                            {item.finished == "1" ? (
                              <span className="text-green-500">انتهى البث</span>
                            ) : (
                              <span className="text-danger">بث مباشر</span>
                            )}
                          </span>
                          <time className="font-medium text-text-alt text-[11px] sm:text-xs md:text-sm">
                            {formatDate(item.date)} - {formatTime(item.time)} -{" "}
                            {formatTime(item.end_time)}
                          </time>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-3 sm:gap-4">
                          <time className="font-medium text-text text-xs sm:text-sm md:text-base leading-normal">
                            {formatTime(item.time)}
                          </time>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Exams */}
          {hasExams && (
            <ExerciseDropDown
              lesson={lesson}
              examAllData={lesson.exam_all_data}
              isOpen={lesson?.was_opened}
              isSectionOpen={isSectionOpen}
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
export const ExerciseDropDown = ({
  examAllData,
  isDone = false,
  isRegistered,
  isSectionOpen,
  isOpen,
  lesson,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionId = useId();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { id } = useParams();

  const isAvailable = isOpen && isSectionOpen;

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

  const handleDownloadFile = async (fileUrl, title, extension = "pdf") => {
    if (!isDone) {
      alert("يجب إكمال الدرس أولاً للتحميل 🔒");
      return;
    }

    try {
      const res = await fetch(fileUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const blob = await res.blob();
      const a = document.createElement("a");
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = `${title}.${extension}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      alert("تعذر تحميل الملف. قد يكون الرابط يحتاج صلاحيات أو CORS.");
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
        className="flex select-none cursor-pointer items-center justify-between py-3 sm:py-4 md:py-5 w-full"
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-controls={sectionId}
      >
        <div className="inline-flex items-center gap-2 sm:gap-2.5">
          <CheckListIcon />
          <span className="font-medium text-text text-sm sm:text-base md:text-lg leading-normal">
            تدريب
          </span>
        </div>

        <div aria-hidden="true">
          <div className="flex justify-between items-center gap-3 sm:gap-4 md:gap-5">
            <CourseChevronTopIcon
              className={`w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] md:w-[26px] md:h-[26px] ${!isExpanded ? "rotate-180" : "rotate-0"
                } transition-transform duration-300 !fill-primary`}
            />
            {!isRegistered && (
              <CourseLockIcon className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] md:w-[26px] md:h-[26px] !fill-primary" />
            )}
          </div>
        </div>
      </header>

      {isExpanded && (
        <div id={sectionId} className="w-full">
          {!examAllData || examAllData.length == 0 ? (
            <span className="text-gray-500 text-base sm:text-lg md:text-xl">
              {" "}
              لا يوجد بيانات{" "}
            </span>
          ) : (
            examAllData.map((examData) => {
              const exam = examData?.exam;
              const examVideos = examData.videos || [];
              const examPdfs = examData.exam_pdfs || [];

              return (
                <div key={exam?.id} className="flex flex-col">
                  {/* Exam Title Row */}
                  {exam && (
                    <div className="flex w-full flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 border-b-[2px] border-solid last:border-none pt-3 sm:pt-4 pb-4 sm:pb-5 bg-white">
                      <div className="inline-flex items-center gap-3 sm:gap-5 w-full justify-between">
                        <div className="inline-flex items-center gap-2.5 sm:gap-3 md:gap-5 bg-white transition-opacity focus:outline-none focus:ring-2 focus:ring-variable-collection-text focus:ring-offset-2 rounded min-w-0 flex-1">
                          <div
                            className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 aspect-[1] flex-shrink-0"
                            aria-hidden="true"
                          >
                            <FileIcon className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] md:w-[30px] md:h-[30px] fill-primary" />
                          </div>
                          <span className="font-medium text-text text-sm sm:text-base md:text-lg leading-normal line-clamp-2">
                            {exam.title || "أسئلة الاختبار"}
                          </span>
                        </div>
                        {isAvailable && isRegistered && (
                          <Link
                            href={
                              isDone
                                ? `/course/${id}/lesson/${lesson.id}/exam-details/${exam?.id}`
                                : undefined
                            }
                            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary rounded-full hover:opacity-90 transition-opacity flex-shrink-0"
                          >
                            <FileIcon className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                            <span className="text-white font-medium text-xs sm:text-sm md:text-base whitespace-nowrap">
                              بدء الاختبار
                            </span>
                          </Link>
                        )}

                        {!isDone && (
                          <div className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 aspect-[1] flex-shrink-0">
                            <LockIcon2 className="fill-secondary w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                        )}
                      </div>
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
                          className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4 pb-4 sm:pb-5 w-full border-b-[2px] border-solid border-variable-collection-stroke"
                        >
                          <RoundedPlayIcon className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] md:w-[36px] md:h-[36px] stroke-primary flex-shrink-0" />

                          <div className="flex w-full flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 md:gap-4 min-w-0">
                            <div className="inline-flex items-center gap-2 sm:gap-2.5 flex-wrap flex-1 min-w-0">
                              {isDone && isPlayable ? (
                                <Link
                                  href={{
                                    pathname,
                                    query: buildExamVideoQuery(video),
                                    hash: "player",
                                  }}
                                  className="font-medium text-text text-sm sm:text-base md:text-lg leading-snug hover:text-primary hover:underline transition-colors line-clamp-2"
                                >
                                  {video.title || "شرح الاختبار"}
                                </Link>
                              ) : (
                                <h2 className="font-medium text-text text-sm sm:text-base md:text-lg leading-snug line-clamp-2">
                                  {video.title || "شرح الاختبار"}
                                </h2>
                              )}
                            </div>

                            <div className="inline-flex items-center gap-2 flex-shrink-0 self-end sm:self-auto">
                              {!isDone ? (
                                <LockIcon2 className="fill-secondary w-5 h-5 sm:w-6 sm:h-6" />
                              ) : (
                                isAvailable &&
                                isPlayable && (
                                  <Link
                                    href={{
                                      pathname,
                                      query: buildExamVideoQuery(video),
                                      hash: "player",
                                    }}
                                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary rounded-full hover:opacity-90 transition-opacity"
                                  >
                                    <svg
                                      className="w-4 h-4 sm:w-5 sm:h-5 fill-white"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                    <span className="text-white font-medium text-xs sm:text-sm md:text-base">
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
                        className="flex w-full flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border-b-[2px] border-solid last:border-none pt-3 sm:pt-4 pb-4 sm:pb-5 bg-white"
                      >
                        <div className="inline-flex items-center gap-2.5 sm:gap-3 md:gap-5 min-w-0 flex-1">
                          <FileIcon className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] md:w-[26px] md:h-[26px] fill-primary flex-shrink-0" />
                          <span className="font-medium text-text text-sm sm:text-base md:text-lg leading-normal line-clamp-2">
                            {pdf.title}
                          </span>
                        </div>

                        {isAvailable && isRegistered && (
                          <button
                            onClick={() =>
                              handleDownloadFile(pdf.pdf_url, pdf.title, "pdf")
                            }
                            className="inline-flex items-center justify-end gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-secondary rounded-full md:rounded-[12px] hover:opacity-90 transition-opacity flex-shrink-0 self-end sm:self-auto"
                          >
                            <DownloadIcon className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] md:w-[22px] md:h-[22px]" />
                            <span className="text-white font-medium text-xs sm:text-sm md:text-base leading-normal whitespace-nowrap">
                              تحميل
                            </span>
                          </button>
                        )}
                      </div>
                    ))}
                </div>
              );
            })
          )}
        </div>
      )}
    </>
  );
};