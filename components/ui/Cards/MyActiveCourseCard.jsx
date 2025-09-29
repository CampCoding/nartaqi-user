import React from "react";

export const MyActiveCourseCard = () => {
  const courseData = {
    title: "إتقان التدريس الفعال",
    progress: 65,
    progressLabel: "معدل الإنجاز",
    buttonText: "متابعة",
  };

  return (
    <article
      className="flex flex-col w-full items-start gap-2 pt-0 pb-8 px-0 relative bg-white rounded-[20px] border-4 border-solid border-secondary"
      role="article"
      aria-label={`دورة ${courseData.title}`}
    >
      <div
        className="relative self-stretch w-full h-[200px] rounded-[20px_20px_0px_0px] overflow-hidden"
        role="img"
        aria-label="صورة الدورة"
        style={{
          backgroundImage: `url('/images/teacher-course-banner.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="flex flex-col items-center gap-8 px-4 py-0 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
          <h2 className="  font-bold text-text text-2xl relative flex items-center justify-center mt-[-1.00px] tracking-[0] leading-[normal] [direction:rtl]">
            {courseData.title}
          </h2>
          <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex h-5 items-start justify-between relative self-stretch w-full">
              <div className="inline-flex h-5 items-center relative flex-[0_0_auto]">
                <span className=" text-text-duplicate text-left [direction:rtl] relative flex items-center justify-center self-stretch w-fit text-sm leading-5 whitespace-nowrap">
                  {courseData.progressLabel}
                </span>
              </div>
              <div className="inline-flex h-5 items-center relative flex-[0_0_auto]">
                <span className=" text-secondary text-bold relative flex items-center justify-center self-stretch w-fit text-sm leading-5 whitespace-nowrap">
                  {courseData.progress}%
                </span>
              </div>
            </div>
            <div
              className="relative self-stretch w-full h-2 bg-zinc-100 rounded-full overflow-hidden rotate-180"
              role="progressbar"
              aria-valuenow={courseData.progress}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label={`${courseData.progressLabel}: ${courseData.progress}%`}
            >
              <div
                className="relative left-[-114px] w-[326px] h-2 bg-secondary rounded-lg"
                style={{ width: `${courseData.progress}%` }}
              />
            </div>
          </div>
        </div>
        <button
          className="flex h-[50px] items-center justify-center gap-2.5 px-4 py-3 relative self-stretch w-full bg-secondary rounded-[10px] shadow-[11px_11px_15px_#fdd4b7] hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-colors duration-200"
          type="button"
          aria-label={`${courseData.buttonText} دورة ${courseData.title}`}
        >
          <span className="w-fit  font-semibold text-white text-sm text-left relative flex items-center justify-center mt-[-1.00px] tracking-[0] leading-[normal] [direction:rtl]">
            {courseData.buttonText}
          </span>
        </button>
      </div>
    </article>
  );
};