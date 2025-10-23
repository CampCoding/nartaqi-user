"use client";
// import checklist1 from "./checklist-1.svg";
// import image from "./image.svg";
// import vector2 from "./vector-2.svg";
// import vector from "./vector.svg";

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

const CourseContentDrawer = ({ isRegistered }) => {
  const [isOpen, setIsOpen] = useState(false); // فتح/غلق الجزء
  const [playingId, setPlayingId] = useState(null); // أي درس بيشتغل

  // بيانات تجريبية - ممكن تجيبها من API بعدين
  const lessons = [
    {
      id: 1,
      title: "كيفية إعداد خطة درس ناجحة",
      duration: "18 دقيقة",
      locked: true,
    },
    {
      id: 2,
      title: "تحديد أهداف التعلم بفعالية",
      duration: "12 دقيقة",
      locked: true,
    },
    {
      id: 3,
      title: "استخدام استراتيجيات متنوعة في التدريس",
      duration: "20 دقيقة",
      locked: true,
    },
    {
      id: 4,
      title: "إدارة الوقت داخل الحصة",
      duration: "15 دقيقة",
      locked: true,
    },
    {
      id: 5,
      title: "طرق تقييم تقدم الطلاب",
      duration: "22 دقيقة",
      locked: true,
    },
  ];

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handlePlay = (lesson) => {
    if (lesson.locked) {
      alert("هذا الدرس مقفل 🔒");
      return;
    }
    setPlayingId((prev) => (prev === lesson.id ? null : lesson.id));
    console.log("تشغيل الدرس:", lesson.title);
  };

  return (
    <div
      className={cx(
        "self-stretch w-full transition-all bg-white  rounded-xl md:rounded-[20px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)] outline outline-2 outline-offset-[-1px] outline-neutral-300 inline-flex flex-col justify-start items-start",
        !isOpen ? "hover:shadow-2xl" : "shadow-xl"
      )}
    >
      {/* Header */}
      <div
        className="self-stretch px-4 md:px-6  py-4 md:py-[24px] inline-flex justify-between items-start cursor-pointer"
        onClick={handleToggle}
      >
        <div className="text-right justify-center text-text text-sm md:text-base font-bold ">
          القسم الأول : مهارات التخطيط للدروس
        </div>
        <div
          className={`  md:w-6 md:h-6 transition-transform duration-300 ${
            !isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <CourseChevronTopIcon
            className={
              "  w-[20px] h-[20px] md:w-[24px] md:h-[24px] !fill-primary"
            }
          />{" "}
        </div>
      </div>

      {/* Body */}

      {isOpen &&
        (isRegistered ? (
          <div className=" w-full flex flex-col  gap-3 sm:gap-4 px-4 md:px-6  pb-4 md:pb-[24px]">
            <RegLecureDrawer isLive isDone={true} />
            <RegLecureDrawer isDone={true} />
            <RegLecureDrawer />
          </div>
        ) : (
          <div className="self-stretch flex flex-col justify-start items-start gap-6 px-4 md:px-6  pb-4 md:pb-[24px]">
            {lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className="self-stretch inline-flex justify-between items-start gap-3"
              >
                <div
                  className="flex justify-start items-center gap-2 cursor-pointer"
                  onClick={() => handlePlay(lesson)}
                >
                  <CoursePlayIcon className={" stroke-primary "} />
                  <div className="text-right justify-center text-text text-sm  md:text-base font-medium ">
                    {playingId === lesson.id ? "جاري التشغيل..." : lesson.title}
                  </div>
                </div>
                <div className="flex justify-start items-center gap-4">
                  <div className="text-right whitespace-nowrap justify-center text-text text-xs  md:text-sm font-medium ">
                    {lesson.duration}
                  </div>
                  {lesson.locked && <CourseLockIcon />}
                </div>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default CourseContentDrawer;

export const RegLecureDrawer = ({ isLive = false, isDone }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionId = useId();

  const toggleExpanded = () => setIsExpanded((v) => !v);

  return (
    <article
      className={cx(
        "flex w-full flex-col items-start   relative bg-white  rounded-xl md:rounded-[30px] border-2 border-solid border-variable-collection-stroke transition-all",
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
        <h1 className="font-bold cursor-pointer flex items-center justify-center w-fit -mt-px text-text text-sm sm:text-base  leading-normal">
          1: كيفية إعداد خطة درس ناجحة
        </h1>
        <div
          className={`shrink-0 w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ${
            !isExpanded ? "rotate-180" : "rotate-0"
          }`}
          aria-hidden="true"
        >
          <CourseChevronTopIcon
            className={
              "  w-[20px] h-[20px] md:w-[24px] md:h-[24px] !fill-primary"
            }
          />
        </div>
      </header>

      {isExpanded && (
        <section
          id={sectionId}
          className="flex flex-col items-start self-stretch w-full sm:gap-6 p-4 sm:p-6 !pt-0"
        >
          <div className="flex items-start gap-3 pt-3 sm:pt-4 pb-4 sm:pb-6 w-full border-b-[2px] border-solid border-variable-collection-stroke">
            <RoundedPlayIcon
              className={cx(
                " w-[27px] h-[27px]  md:w-[32px] md:h-[32px]",
                isLive ? "stroke-danger" : "stroke-primary"
              )}
            />
            <div className="flex w-full flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0  self-stretch ">
              <div className="inline-flex items-center gap-2">
                <h2 className="cursor-pointer font-medium flex items-center justify-center w-fit -mt-px text-text text-sm sm:text-base leading-normal">
                  كيفية إعداد خطة درس ناجحة
                </h2>
              </div>

              <div className="inline-flex items-center gap-3 sm:gap-4">
                {isLive ? (
                  <div className="inline-flex items-center gap-2">
                    <LiveIcon width={28} height={28} />
                    <div className="inline-flex items-center justify-end gap-2">
                      <div className="font-bold text-[#f91616] text-sm sm:text-base leading-normal">
                        بث مباشر
                      </div>
                    </div>
                  </div>
                ) : (
                  <time className="font-medium text-text text-sm sm:text-base leading-normal">
                    18 دقيقة
                  </time>
                )}
              </div>
            </div>
          </div>
          {/* {alert(isDone)} */}
          <ExerciseDropDown isDone={isDone} />
        </section>
      )}
    </article>
  );
};

export const ExerciseDropDown = ({ isDone = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionId = useId();

  const toggleExpanded = () => setIsExpanded((v) => !v);

  // العناصر المتكررة (لا يغيّر التصميم، فقط يزيل تكرار الكود)
  const items = [
    { id: 1, title: "أسئلة الأختبار" },
    // { id: 2, title: "أسئلة الأختبار" },
  ];

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
              "  w-[20px] h-[20px] md:w-[24px] md:h-[24px] !fill-primary"
            }
          />{" "}
        </div>
      </header>

      {isExpanded && (
        <div id={sectionId} className="w-full">
          {items.map((it, idx) => (
            <div className="flex flex-col  ">
              <Link
                href={`/course/${123}/view?reg=true&done=true`}
                className="flex group  items-center pt-3 sm:pt-4 pb-4 sm:pb-6 justify-between border-b-[2px] border-solid last:border-none"
              >
                <div className="inline-flex items-center gap-2 sm:gap-4 ">
                  <RoundedPlayIcon
                    className={cx(
                      " w-[20px] stroke-primary h-[20px]  md:w-[29px] md:h-[29px]"
                    )}
                  />
                  <span className="font-medium group-hover:underline transition-all text-text text-sm sm:text-base leading-normal">
                    فيديو توضيحي للاختبار
                  </span>
                </div>
                <div className="text-right whitespace-nowrap group-hover:underline justify-center text-text text-xs  md:text-sm font-medium ">
                  18 دقيقة
                </div>
              </Link>
              <div
                key={it.id}
                className="flex w-full flex-row items-center justify-between border-b-[2px] border-solid last:border-none  pt-3 sm:pt-4 pb-4 sm:pb-6  bg-white"
              >
                {(() => {
                  const Tag = isDone ? Link : "div";
                  return (
                    <>
                      <Tag
                        href={isDone ? "/exam-details/achievement" : undefined}
                        className="inline-flex items-center gap-4 sm:gap-6"
                      >
                        <div
                          className="inline-flex items-center gap-0 sm:gap-4 bg-white hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-variable-collection-text focus:ring-offset-2 rounded"
                          type="button"
                        >
                          <div
                            className="relative w-6 h-6 sm:w-7 sm:h-7 aspect-[1]"
                            aria-hidden="true"
                          >
                            <FileIcon
                              className={
                                "  w-[20px] h-[20px]  md:w-[28px] md:h-[28px] fill-primary"
                              }
                            />
                          </div>
                          <span className="font-medium text-text text-sm sm:text-base leading-normal">
                            {it.title}
                          </span>
                        </div>

                        {!isDone && (
                          <div
                            className="relative w-6 h-6 sm:w-7 sm:h-7 aspect-[1] hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-variable-collection-text focus:ring-offset-2 rounded"
                            aria-label="قائمة"
                            type="button"
                          >
                            <LockIcon2 className="fill-secondary w-5 h-5  " />
                          </div>
                        )}
                      </Tag>

                      {
                        <button
                          className="inline-flex disabled:!opacity-50 disabled:cursor-not-allowed  items-center justify-end gap-2.5  px-4 md:px-6 sm:px-8 py-2 bg-secondary     rounded-full md:rounded-[10px] hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 self-start sm:self-auto"
                          disabled={!isDone}
                          aria-label="تحميل"
                          type="button"
                        >
                          <DownloadIcon
                            className={
                              "  w-[20px] h-[20px]  md:w-[28px] md:h-[28px]"
                            }
                          />
                          <span className="text-white font-medium text-sm sm:text-base leading-normal">
                            تحميل
                          </span>
                        </button>
                      }
                    </>
                  );
                })()}
              </div>
              <div
                key={it.id}
                className="flex w-full flex-row items-center justify-between  pt-3 sm:pt-4 pb-4 sm:pb-6 border-b-[2px] border-solid last:border-none bg-white"
              >
                <nav className="inline-flex items-center gap-4 sm:gap-6">
                  <div
                    className="inline-flex items-center gap-0 sm:gap-4 bg-white hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-variable-collection-text focus:ring-offset-2 rounded"
                    type="button"
                  >
                    <div
                      className="relative w-6 h-6 sm:w-7 sm:h-7 aspect-[1]"
                      aria-hidden="true"
                    >
                      <FileIcon
                        className={
                          "  w-[20px] h-[20px]  md:w-[28px] md:h-[28px] fill-primary"
                        }
                      />
                    </div>
                    <span className="font-medium text-text text-sm sm:text-base leading-normal">
                      اجابات الاختبار
                    </span>
                  </div>

                  <button
                    className="relative w-6 h-6 sm:w-7 sm:h-7 aspect-[1] hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-variable-collection-text focus:ring-offset-2 rounded"
                    aria-label="قائمة"
                    type="button"
                  >
                    <LockIcon2 className="fill-secondary w-5 h-5  " />
                  </button>
                </nav>

                {/* الجانب الأيمن */}
                <button
                  disabled={true}
                  className="inline-flex disabled:!opacity-50 disabled:cursor-not-allowed items-center justify-end gap-2.5  px-4 md:px-6 sm:px-8 py-2 bg-secondary     rounded-full md:rounded-[10px] hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 self-start sm:self-auto"
                  aria-label="تحميل"
                  type="button"
                >
                  <DownloadIcon
                    className={"  w-[20px] h-[20px]  md:w-[28px] md:h-[28px]"}
                  />
                  <span className="text-white font-medium text-sm sm:text-base leading-normal">
                    تحميل
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
