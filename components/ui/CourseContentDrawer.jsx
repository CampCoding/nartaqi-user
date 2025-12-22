// CourseContentDrawer.jsx (full file)

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
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import useMakeStudentView from "../shared/Hooks/useMakestudentView";
import { useSelector } from "react-redux";
import CheckboxButton from "./CheckboxButton";

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
  const { token, user } = useSelector((state) => state.auth);

  const handleToggle = () => setIsOpen((prev) => !prev);

  return (
    <div
      className={cx(
        "self-stretch w-full transition-all bg-white rounded-2xl md:rounded-[24px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)] outline outline-2 outline-offset-[-1px] outline-neutral-300 inline-flex flex-col justify-start items-start",
        !isOpen ? "hover:shadow-2xl" : "shadow-xl"
      )}
    >
      {/* Header */}
      <div
        className="self-stretch px-5 md:px-7 py-5 md:py-7 inline-flex justify-between items-center cursor-pointer"
        onClick={handleToggle}
      >
        <div className="text-right justify-center text-text text-base md:text-lg font-bold">
          {content.content_title || "غير محدد"}
        </div>

        <div className="transition-transform duration-300">
          <div className="flex justify-between items-center gap-4 md:gap-5">
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
                key={lesson.id}
                lesson={lesson}
                isDone={true}
                own={own}
                isRegistered={isRegistered}
                token={token}
                studentId={user?.id}
                // ✅ round_id كان غلط/غير معرّف — لازم من الداتا
                roundId={content?.round_id}
              />
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4 md:gap-5 px-5 md:px-7 pb-5 md:pb-7">
            {content.lessons.map((lesson) => (
              <RegLectureDrawer
                key={lesson.id}
                lesson={lesson}
                isDone={true}
                own={own}
                // ✅ كان غلط: isRegistered={!isRegistered}
                isRegistered={isRegistered}
                token={token}
                studentId={user?.id}
                roundId={content?.round_id}
              />
            ))}
          </div>
        ))}
    </div>
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
  token,
  studentId,
}) => {
  const [savingMap, setSavingMap] = useState({});

  const { makeStudentView, loading: markingView } = useMakeStudentView(token, {
    onSuccess: () => toast.success("تم تسجيل المشاهدة ✅"),
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
      // ✅ نفس الـ endpoint في الحالتين (حدد/الغِ)
      // لازم الـ API يدعم flag زي watched / is_viewed / action
      const res = await makeStudentView({
        student_id: String(studentId),
        round_id: String(roundId),
        video_id: String(item.id),

        // ✅ ده اللي يخلي الـ endpoint يعرف هل مشاهدة ولا إلغاء مشاهدة
        watched: nextChecked ? "1" : "0",
      });

      // لو الـ hook بيرجع falsy على failure
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

    // ✅ Optimistic UI
    setCheckedMap((prev) => ({ ...prev, [key]: nextChecked }));

    // ✅ Call API on BOTH check/uncheck
    const ok = await setWatched(item, nextChecked);

    // ✅ Rollback لو فشل
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

  // ✅ professional time formatter: supports seconds (number) or "mm:ss" / "hh:mm:ss"
  const formatTime = (
    input,
    { style = "long", roundToMinute = false } = {}
  ) => {
    if (input === null || input === undefined || input === "" || input === 0) {
      return "غير محدد";
    }

    let totalSeconds = 0;

    // number seconds OR numeric string
    if (
      typeof input === "number" ||
      (typeof input === "string" && /^\d+(\.\d+)?$/.test(input.trim()))
    ) {
      totalSeconds = Math.floor(Number(input));
    }
    // "mm:ss" or "hh:mm:ss"
    else if (typeof input === "string") {
      const parts = input
        .trim()
        .split(":")
        .map((p) => p.trim());
      if (parts.length === 2 || parts.length === 3) {
        const nums = parts.map((p) => Number(p));
        if (nums.some((n) => Number.isNaN(n) || n < 0)) return "غير محدد";

        if (parts.length === 2) {
          const [m, s] = nums;
          totalSeconds = m * 60 + s;
        } else {
          const [h, m, s] = nums;
          totalSeconds = h * 3600 + m * 60 + s;
        }
      } else {
        return "غير محدد";
      }
    } else {
      return "غير محدد";
    }

    if (totalSeconds <= 0) return "غير محدد";

    if (roundToMinute) {
      const mins = Math.round(totalSeconds / 60);
      return `${mins} دقيقة`;
    }

    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (style === "short") {
      const mm = String(mins).padStart(2, "0");
      const ss = String(secs).padStart(2, "0");
      if (hours > 0) {
        const hh = String(hours).padStart(2, "0");
        return `${hh}:${mm}:${ss}`;
      }
      return `${mins}:${ss}`;
    }

    const parts = [];
    if (hours) parts.push(`${hours} ساعة`);
    if (mins) parts.push(`${mins} دقيقة`);
    if (secs) parts.push(`${secs} ثانية`);

    if (parts.length === 0) return "أقل من دقيقة";
    if (parts.length === 1) return parts[0];
    if (parts.length === 2) return `${parts[0]} و ${parts[1]}`;
    return `${parts[0]} و ${parts[1]} و ${parts[2]}`;
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

  // ✅ Checkbox state per item (video/live), matches YOUR API: video.watched boolean
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

  // ✅ sync لو الداتا اتغيرت / refetch
  useEffect(() => {
    setCheckedMap(buildInitCheckedMap());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson?.id]);

  const itemKey = (item) => `${item.type}-${item.id}`;

  return (
    <article
      className={cx(
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
        className="flex cursor-pointer gap-4 sm:gap-6 p-5 sm:p-6 md:p-7 items-center justify-between self-stretch w-full"
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-controls={sectionId}
      >
        <h1 className="font-bold cursor-pointer flex items-center justify-center w-fit -mt-px text-text text-base md:text-lg leading-snug">
          {lesson.lesson_title || "غير محدد"}
        </h1>

        <div
          className="shrink-0 transition-transform duration-300"
          aria-hidden="true"
        >
          <div className="flex justify-between items-center gap-4 md:gap-5">
            <CourseChevronTopIcon
              className={`w-[22px] h-[22px] md:w-[26px] md:h-[26px] ${
                !isExpanded ? "rotate-180" : "rotate-0"
              } transition-transform duration-300 !fill-primary`}
            />
            {/* ✅ القفل يظهر لغير المسجل */}
            {!isRegistered && (
              <CourseLockIcon className="w-[22px] h-[22px] md:w-[26px] md:h-[26px] !fill-primary" />
            )}
          </div>
        </div>
      </header>

      {isExpanded && (
        <section
          id={sectionId}
          className="flex flex-col items-start self-stretch w-full gap-4 sm:gap-6 p-5 sm:p-6 md:p-7 !pt-0"
        >
          {/* Videos and Live Sessions */}
          {allContent.map((item) => {
            const key = `video-${item.id}`;
            const isSaving = !!savingMap[key];

            return (
              <div
                key={`${item.type}-${item.id}`}
                className="flex items-start gap-4 pt-4 pb-5 sm:pb-6 w-full border-b-[2px] border-solid border-variable-collection-stroke"
              >
                <RoundedPlayIcon
                  className={cx(
                    "w-[30px] h-[30px] md:w-[36px] md:h-[36px]",
                    item.type === "live" ? "stroke-danger" : "stroke-primary"
                  )}
                />

                <div className="flex w-full flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 self-stretch">
                  <div className="inline-flex items-center gap-3">
                    {item.type === "video" ? (
                      // ✅ المسجّل هو اللي يفتح الفيديو
                      isRegistered ? (
                        <Link
                          href={{
                            pathname,
                            query: buildVideoQuery(item),
                            hash: "player",
                          }}
                          onClick={async () => {
                            const key = `video-${item.id}`;
                            if (!checkedMap[key] && isRegistered) {
                              await toggleChecked(item);
                            }
                          }}
                          
                        >
                          <h2 className="cursor-pointer font-medium ...">
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
                            rel="noreferrer"
                          >
                            عرض التسجيل
                          </a>
                        ) : (
                          <a
                            className="text-gray-500 underline text-sm md:text-base"
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

                  {/* Right side: status/time + checkbox for videos */}
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
                      <div className="inline-flex items-center gap-3 sm:gap-4">
                        {/* ✅ Checkbox لكل فيديو */}

                        <time className="font-medium text-text text-sm md:text-base leading-normal">
                          {formatTime(item.time)}
                        </time>
                        <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                          <CheckboxButton
                            id={key}
                            type="checkbox"
                            checked={!!checkedMap[key]}
                            onChange={() => toggleChecked(item)}
                            disabled={!isRegistered || isSaving}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

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
export const ExerciseDropDown = ({
  examAllData,
  isDone = false,
  isRegistered,
  lesson,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionId = useId();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { id } = useParams();

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
            {!isRegistered && (
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
                      const Tag = isDone && isRegistered ? Link : "div";
                      return (
                        <Tag
                          href={
                            isDone
                              ? `/course/${id}/lesson/${lesson.id}/exam-details/${exam?.id}`
                              : undefined
                          }
                          onClick={() => console.log("lesson", lesson)}
                          className="inline-flex items-center gap-5 sm:gap-7"
                        >
                          <div className="inline-flex items-center gap-3 sm:gap-5 bg-white hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-variable-collection-text focus:ring-offset-2 rounded">
                            <div
                              className="relative w-7 h-7 sm:w-8 sm:h-8 aspect-[1]"
                              aria-hidden="true"
                            >
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
                                href={{
                                  pathname,
                                  query: buildExamVideoQuery(video),
                                  hash: "player",
                                }}
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
                                  href={{
                                    pathname,
                                    query: buildExamVideoQuery(video),
                                    hash: "player",
                                  }}
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary rounded-full hover:opacity-90 transition-opacity"
                                >
                                  <svg
                                    className="w-4.5 h-4.5 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
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
                          onClick={() =>
                            handleDownloadFile(pdf.pdf_url, pdf.title, "pdf")
                          }
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
