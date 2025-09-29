"use client";

import React from "react";
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
  onJumpTo,
}) => {
  const current =
    questions[currentIndex] || { type: "mcq", text: "", options: [] };
  const answerValue = answeredMap[currentIndex] ?? null;

  return (
    <div className="flex flex-col gap-">
      <div className="flex items-star gap-[58px]">
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
            onChange={(val) => onSelectOption && onSelectOption(currentIndex, val)}
          />
        )}
        {current.type === "text" && (
          <TextQuestion
            questionText={current.text}
            imageUrl={current.imageUrl}
            value={answerValue || ""}
            onChange={(val) => onSelectOption && onSelectOption(currentIndex, val)}
          />
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
        >
          <div className="text-right justify-center text-primary group-hover:text-white transition text-base font-bold ">
            السابق
          </div>
        </button>
        <button
          onClick={onNext}
          className=" px-20 py-5 bg-gradient-to-r from-primary to-secondary hover:scale-105 transition cursor-pointer rounded-[20px] flex justify-center items-center gap-2.5"
        >
          <div className="text-right justify-center text-white text-base font-bold ">
            التالي
          </div>
        </button>
      </div>
    </div>
  );
};

export default ExamContent;
