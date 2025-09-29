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
import React, { useState } from "react";
import {
  CourseChevronTopIcon,
  CourseLockIcon,
  CoursePlayIcon,
} from "../../public/svgs";

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
    <div className="self-stretch w-full px-6 py-[24px] bg-white rounded-[20px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)] outline outline-2 outline-offset-[-1px] outline-zinc-500 inline-flex flex-col justify-start items-start gap-8">
      {/* Header */}
      <div
        className="self-stretch inline-flex justify-between items-start cursor-pointer"
        onClick={handleToggle}
      >
        <div className="text-right justify-center text-text text-base font-bold ">
          القسم الأول : مهارات التخطيط للدروس
        </div>
        <div
          className={`w-6 h-6 transition-transform duration-300 ${
            !isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <CourseChevronTopIcon />
        </div>
      </div>

      {/* Body */}

      {isOpen &&
        (isRegistered ? (
          <div className=" w-full flex flex-col gap-4">
          <RegLecureDrawer isLive />
          <RegLecureDrawer />
          <RegLecureDrawer />
          
          </div>
        ) : (
          <div className="self-stretch flex flex-col justify-start items-start gap-6">
            {lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className="self-stretch inline-flex justify-between items-center"
              >
                <div
                  className="flex justify-start items-center gap-2 cursor-pointer"
                  onClick={() => handlePlay(lesson)}
                >
                  <CoursePlayIcon />
                  <div className="text-right justify-center text-text text-base font-medium ">
                    <span className=" font-bold text-primary">
                      {" "}
                      المحاضرة {index + 1}
                    </span>{" "}
                    :{" "}
                    {playingId === lesson.id ? "جاري التشغيل..." : lesson.title}
                  </div>
                </div>
                <div className="flex justify-start items-center gap-4">
                  <div className="text-right justify-center text-text text-base font-medium ">
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

export const RegLecureDrawer = ({isLive = false}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <article className="flex w-full flex-col items-start gap-6 p-6 relative bg-white rounded-[30px] border-2 border-solid border-variable-collection-stroke">
      <header
        onClick={toggleExpanded}
        className="flex cursor-pointer items-center justify-between self-stretch w-full relative flex-[0_0_auto]"
      >
        <h1 className=" font-bold cursor-pointer relative flex items-center justify-center w-fit mt-[-1.00px] text-text text-base tracking-[0] leading-[normal] ">
          المحاضرة الأولي : كيفية إعداد خطة درس ناجحة
        </h1>
        <div
          className={`w-6 h-6 transition-transform duration-300 ${
            !isExpanded ? "rotate-180" : "rotate-0"
          }`}
        >
          <CourseChevronTopIcon  />
        </div>
      </header>

      {isExpanded && (
        <section className="flex flex-col items-start self-stretch w-full relative flex-[0_0_auto]">
          <div className="flex items-center justify-between pt-4 pb-6 px-0 self-stretch w-full border-b-[3px] [border-bottom-style:solid] border-variable-collection-stroke relative flex-[0_0_auto]">
            <div className="inline-flex items-start gap-2 relative flex-[0_0_auto]">
              <RoundedPlayIcon className={isLive ? "stroke-danger" : "stroke-primary"} />
              <h2 className=" cursor-pointer font-medium relative flex items-center justify-center w-fit mt-[-1.00px] text-text text-base tracking-[0] leading-[normal] ">
                كيفية إعداد خطة درس ناجحة
              </h2>
            </div>
            <div className="inline-flex items-center justify-start gap-4 relative flex-[0_0_auto]">
              {
                isLive ? 
                  <div className="inline-flex items-center gap-2 relative">
                          <LiveIcon width={28} height={28} />
                        <div className="inline-flex items-center justify-end gap-4 relative flex-[0_0_auto]">
                          <div className="relative flex items-center justify-center w-fit mt-[-1.00px]  font-bold text-[#f91616] text-base tracking-[0] leading-[normal] ">
                            بث مباشر
                          </div>
                        </div>
                  
                      </div>
                
                : <time className="relative flex items-center justify-center w-fit mt-[-1.00px]  font-medium text-text text-base tracking-[0] leading-[normal] ">
                18 دقيقة
              </time>
             
              }
            </div>
          </div>

          <ExerciseDropDown />
        </section>
      )}
    </article>
  );
};

export const ExerciseDropDown = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      <header
        onClick={toggleExpanded}
        className="flex select-none cursor-pointer items-center justify-between px-0 py-4 relative self-stretch w-full flex-[0_0_auto]"
      >
        <div className="inline-flex select-none items-start gap-2 relative flex-[0_0_auto]">
          <CheckListIcon />
          <span className=" font-medium relative flex items-center justify-center w-fit mt-[-1.00px] text-text text-base tracking-[0] leading-[normal] ">
            تدريب
          </span>
        </div>
        <div
          className={`w-6 h-6 transition-transform duration-300 ${
            !isExpanded ? "rotate-180" : "rotate-0"
          }`}
        >
          <CourseChevronTopIcon />
        </div>{" "}
      </header>
      {isExpanded && (
        <>
          <div className="flex w-full items-center justify-between pt-4 pb-6 px-0 relative bg-white border-b-[3px] last:border-0 [border-bottom-style:solid] border-variable-collection-stroke">
            <nav className="gap-6 inline-flex items-center relative flex-[0_0_auto]">
              <button className="justify-end gap-4 bg-white inline-flex items-center relative flex-[0_0_auto] hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-variable-collection-text focus:ring-offset-2 rounded">
                <div className="relative w-7 h-7 aspect-[1]" aria-hidden="true">
                  <FileIcon className="fill-primary" />
                </div>
                <span className=" relative flex items-center justify-center w-fit mt-[-1.00px]  font-medium text-base tracking-[0] leading-[normal] ">
                  أسئلة الأختبار
                </span>
              </button>
              <button
                className="relative w-7 h-7 aspect-[1] hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-variable-collection-text focus:ring-offset-2 rounded"
                aria-label="قائمة"
              >
                <LockIcon2 className="fill-secondary" />
              </button>
            </nav>

            <button
              className="justify-end gap-2.5 px-8 py-2 bg-secondary rounded-[10px] inline-flex items-center relative flex-[0_0_auto] hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
              aria-label="تحميل"
            >
              <DownloadIcon />
              <span className=" text-white relative flex items-center justify-center w-fit mt-[-1.00px] font-medium text-base tracking-[0] leading-[normal] ">
                تحميل
              </span>
            </button>
          </div>
          <div className="flex w-full items-center justify-between pt-4 pb-6 px-0 relative bg-white border-b-[3px] last:border-0 [border-bottom-style:solid] border-variable-collection-stroke">
            <nav className="gap-6 inline-flex items-center relative flex-[0_0_auto]">
              <button className="justify-end gap-4 bg-white inline-flex items-center relative flex-[0_0_auto] hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-variable-collection-text focus:ring-offset-2 rounded">
                <div className="relative w-7 h-7 aspect-[1]" aria-hidden="true">
                  <FileIcon className="fill-primary" />
                </div>
                <span className=" relative flex items-center justify-center w-fit mt-[-1.00px]  font-medium text-base tracking-[0] leading-[normal] ">
                  أسئلة الأختبار
                </span>
              </button>
              <button
                className="relative w-7 h-7 aspect-[1] hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-variable-collection-text focus:ring-offset-2 rounded"
                aria-label="قائمة"
              >
                <LockIcon2 className="fill-secondary" />
              </button>
            </nav>

            <button
              className="justify-end gap-2.5 px-8 py-2 bg-secondary rounded-[10px] inline-flex items-center relative flex-[0_0_auto] hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
              aria-label="تحميل"
            >
              <DownloadIcon />
              <span className=" text-white relative flex items-center justify-center w-fit mt-[-1.00px] font-medium text-base tracking-[0] leading-[normal] ">
                تحميل
              </span>
            </button>
          </div>
        </>
      )}
    </>
  );
};
