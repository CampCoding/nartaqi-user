"use client";

import React, { useState } from "react";
import { ExamQuesionsSummery } from "./examQuesionsSummery";
import { McqQuestion } from "./McqQuestion";
import { TrueFalseQuestion } from "./TrueFalseQuestion";
import { TextQuestion } from "./TextQuestion";

const ExamContent = ({
  questions = [],
  currentIndex = 0,
  answeredMap = {},
  flaggedMap = {},
  onSelectOption,
  onPrev,
  onNext,
  onSubmit,
  onJumpTo,
  isStarted,
  setIsStarted,
}) => {
  const current = questions[currentIndex] || {
    type: "mcq",
    text: "",
    options: [],
  };
  const answerValue = answeredMap[currentIndex] ?? null;
  const isLastQuestion = questions.length > 0 && currentIndex === questions.length - 1;

  return (
    <div className="flex flex-col gap-">
      <div className="flex items-star gap-[58px]">
        {isStarted ? (
          <>
            {current.type === "mcq" && (
              <McqQuestion
                questionText={current.text}
                imageUrl={current.imageUrl}
                options={current.options}
                selectedOptionId={answerValue}
                onSelectOption={(id) =>
                  onSelectOption && onSelectOption(currentIndex, id)
                }
              />
            )}
            {current.type === "boolean" && (
              <TrueFalseQuestion
                questionText={current.text}
                imageUrl={current.imageUrl}
                value={answerValue}
                onChange={(val) =>
                  onSelectOption && onSelectOption(currentIndex, val)
                }
              />
            )}
            {current.type === "text" && (
              <TextQuestion
                questionText={current.text}
                imageUrl={current.imageUrl}
                value={answerValue || ""}
                onChange={(val) =>
                  onSelectOption && onSelectOption(currentIndex, val)
                }
              />
            )}
          </>
        ) : (
          <VerbalSection />
        )}

        <ExamQuesionsSummery
          totalQuestions={questions.length}
          currentIndex={currentIndex}
          answeredMap={answeredMap}
          flaggedMap={flaggedMap}
          onJumpTo={onJumpTo}
        />
      </div>
      <div className="flex mt/[64px] mt-[64px] justify-between items-center">
        <button
          onClick={onPrev}
          className=" cursor-pointer px-20 py-5 bg-white hover:bg-primary group transition rounded-[20px] outline outline-[3px] outline-offset-[-3px] outline-primary flex justify-center items-center gap-2.5"
          style={{
            opacity:currentIndex == 0 ? "0":"1",
            pointerEvents:currentIndex == 0 ? "none":"auto"
          }}
        >
          <div className="text-right justify-center text-primary group-hover:text-white transition text-base font-bold ">
            السابق
          </div>
        </button>
        {isStarted ? (
          <>
            <button
              onClick={isLastQuestion ? (onSubmit || onNext) : onNext}
              className=" px-20 py-5 bg-gradient-to-r from-primary to-secondary hover:scale-105 transition cursor-pointer rounded-[20px] flex justify-center items-center gap-2.5"
            >
              <div className="text-right justify-center text-white text-base font-bold ">
                {isLastQuestion ? "إنهاء" : "التالي"}
              </div>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={(()=>setIsStarted(true))}
              className=" px-20 py-5 bg-gradient-to-r from-primary to-secondary hover:scale-105 transition cursor-pointer rounded-[20px] flex justify-center items-center gap-2.5"
            >
              <div className="text-right justify-center text-white text-base font-bold ">
                ابدأ
              </div>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ExamContent;

const VerbalSection = () => {
  return (
    <div class=" flex-1  inline-flex flex-col justify-start items-start gap-8">
      <div class="w-[769px] inline-flex justify-start items-center gap-6">
        <div class="text-right justify-center text-text text-3xl font-bold font-['Cairo']">
          القسم اللفظي
        </div>
      </div>
      <div class="self-stretch flex-1 text-right justify-center text-sup-title text-xl font-normal font-['Cairo'] leading-10">
        القسم اللفظي
        <br />
        يتكون القسم اللفظي من مجموعة من الأسئلة التي تقيس قدرة الطالب على فهم
        المقروء، واستنتاج المعاني، وتحليل النصوص. يتم عرض فقرة نصية قصيرة أو جمل
        متتابعة، يليها عدد من الأسئلة متعددة الخيارات، بحيث يختار الطالب الإجابة
        الصحيحة من بين الخيارات المتاحة.
        <br />
        <br />
        تشمل أنواع الأسئلة ما يلي:
        <br />
        <br />
        أسئلة الفهم والاستيعاب: تهدف إلى قياس قدرة الطالب على فهم الفكرة الرئيسة
        والتفاصيل المهمة في النص.
        <br />
        <br />
        أسئلة المعاني والمفردات: تطلب من الطالب تحديد معنى كلمة أو جملة في
        سياقها الصحيح.
      </div>
    </div>
  );
};
