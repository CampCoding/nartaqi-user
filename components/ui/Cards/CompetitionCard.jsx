"use client";

import React, { useState, useEffect } from "react";

export const DailyQuizSection = () => {
  const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} د`;
  };

  const progressPercentage = (timeRemaining / (15 * 60)) * 100;

  const quizData = {
    title: "المسابقة اليومية",
    startTime: "متى تبدأ؟",
    startTimeDetails: ": كل يوم في الساعة 8 مساء.",
    concept: "فكرتها",
    conceptDetails:
      ": مجموعة سريعة من الأسئلة القصيرة في مجالات مختلفة عشان تختبر سرعة البديهة والمعرفة.",
    prizes: "الجوائز:",
    prizesDetails:
      " نقاط تضاف لرصيدك فورا، تقدر تجمعها وتستبدلها بمكافآت داخل المنصة.",
    timeLabel: "الوقت المتبقي",
    joinButton: "أنضم الأن",
  };

  return (
    <section
      className="shadow-[0px_12px_50px_#3b82f6] w-[419px] h-[622px] flex bg-white rounded-[30px] overflow-hidden border-4 border-solid border-variable-collection-stroke"
      role="region"
      aria-labelledby="quiz-title"
    >
      <div className="flex mt-6 w-[419px] h-[566px] relative flex-col items-center gap-4">
        <img
          className="relative w-[387px] h-[173px] object-cover"
          alt="صورة المسابقة اليومية"
          src={"/images/daily-competition-image.png"}
        />

        <div className="flex flex-col items-center gap-8 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex flex-col  gap-[11px] relative self-stretch w-full flex-[0_0_auto]">
            <header className="flex items-center justify-center gap-2.5 px-4 py-0 relative self-stretch w-full flex-[0_0_auto]">
              <h1
                id="quiz-title"
                className="relative flex   flex-1 mt-[-1.00px]  font-bold text-primary text-2xl tracking-[0] leading-[normal] [direction:rtl]"
              >
                {quizData.title}
              </h1>
            </header>

            <div className="flex flex-col items-start gap-4 px-4 py-0 relative self-stretch w-full flex-[0_0_auto]">
              <p className="relative flex  self-stretch mt-[-1.00px]  font-normal text-transparent text-base tracking-[0] leading-6 [direction:rtl]">
                <span className="font-bold text-primary">
                  {quizData.startTime}
                </span>
                <span className=" font-medium text-text-alt">
                  {quizData.startTimeDetails}
                </span>
              </p>

              <p className="self-stretch font-normal text-transparent text-base leading-6 relative   tracking-[0] [direction:rtl]">
                <span className="font-bold text-orange-500">
                  {quizData.concept}
                </span>
                <span className=" font-medium text-[#2d2d2d]">
                  {quizData.conceptDetails}
                </span>
              </p>

              <p className="self-stretch font-normal text-warning text-base leading-6 relative   tracking-[0] [direction:rtl]">
                <span className="font-bold">{quizData.prizes}</span>
                <span className=" font-medium">{quizData.prizesDetails}</span>
              </p>
            </div>

            <div className="px-4">
              <div className="flex flex-col  w-full items-start gap-2 p-4 bg-primary-light rounded-[15px] relative flex-[0_0_auto]">
                <div className="flex h-5 items-start justify-between relative self-stretch w-full">
                  <div className="inline-flex h-5 items-center relative flex-[0_0_auto]">
                    <span className="relative flex items-center justify-center self-stretch w-fit  font-medium text-variable-collection-text text-sm text-left leading-5 whitespace-nowrap [direction:rtl]">
                      {quizData.timeLabel}
                    </span>
                  </div>
                  <div className="inline-flex h-5 items-center relative flex-[0_0_auto]">
                    <time
                      className="flex self-stretch  text-primary text-sm text-left leading-5 whitespace-nowrap relative items-center justify-center w-fit [direction:rtl]"
                      dateTime={`PT${Math.floor(timeRemaining / 60)}M`}
                    >
                      {formatTime(timeRemaining)}
                    </time>
                  </div>
                </div>

                <div
                  className="relative self-stretch w-full h-1 bg-variable-collection-white-moca rounded-full overflow-hidden rotate-180"
                  role="progressbar"
                  aria-valuenow={progressPercentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label="الوقت المتبقي للمسابقة"
                >
                  <div
                    className="relative h-1 bg-primary transition-all duration-1000 ease-linear"
                    style={{
                      width: `${progressPercentage}%`,
                      left: `${100 - progressPercentage}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            className="flex w-[387px] items-center justify-center gap-2 px-12 py-4 relative flex-[0_0_auto] bg-primary rounded-[15px] shadow-[0px_6px_24px_#bac6dc33] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-200"
            type="button"
            aria-label="انضم إلى المسابقة اليومية"
          >
            <span className="[display:-webkit-box]  font-bold text-neutral-50 text-base text-center leading-[normal] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical] relative items-center justify-center w-fit [direction:rtl]">
              {quizData.joinButton}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
