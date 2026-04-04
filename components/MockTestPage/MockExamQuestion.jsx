"use client";

import React from "react";

const MockExamQuestion = ({
  block,
  questionNumberStart = 1,
  answers,
  onAnswerSelect,
  fontSize = "normal",
  currentSection,
}) => {
  if (!block) {
    return (
      <div className="text-[10px] sm:text-xs md:text-sm lg:text-base">
        جاري تحميل السؤال...
      </div>
    );
  }

  const getFontSizeClass = (size) => {
    const sizeMap = {
      // base -> sm -> md -> lg -> xl
      // Mobile -> Tablet Small -> Tablet -> Desktop -> Desktop Large
      small: `
        text-[8px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base
        landscape:text-[7px] landscape:sm:text-[9px] landscape:md:text-[11px] landscape:lg:text-xs xl:landscape:text-sm
      `,
      normal: `
        text-[9px] sm:text-xs md:text-sm lg:text-base xl:text-lg
        landscape:text-[8px] landscape:sm:text-[10px] landscape:md:text-xs landscape:lg:text-sm xl:landscape:text-base
      `,
      large: `
        text-[10px] sm:text-sm md:text-base lg:text-lg xl:text-xl
        landscape:text-[9px] landscape:sm:text-xs landscape:md:text-sm landscape:lg:text-base xl:landscape:text-lg
      `,
      xlarge: `
        text-[11px] sm:text-base md:text-lg lg:text-xl xl:text-2xl
        landscape:text-[10px] landscape:sm:text-sm landscape:md:text-base landscape:lg:text-lg xl:landscape:text-xl
      `,
    };
    return sizeMap[size] || sizeMap.normal;
  };

  const textSizeClass = getFontSizeClass(fontSize);

  const currentQuestion =
    block.questions && block.questions.length > 0 ? block.questions[0] : null;

  return (
    <div className="w-full">
      {/* Passage */}
      {block.passage && (
        <div
          className={`
            mb-1.5 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-6
            landscape:mb-1 landscape:sm:mb-1.5 landscape:md:mb-2 landscape:lg:mb-3
            ${
              block.type === "paragraph"
                ? `sticky top-0 bg-white z-10 
                   pb-1 sm:pb-1.5 md:pb-2 lg:pb-3 xl:pb-4
                   pt-1 sm:pt-1.5 md:pt-2 
                   border-b border-gray-200 sm:border-gray-300 shadow-sm`
                : ""
            }
          `}
        >
          <div
            className="
              mb-1 sm:mb-1.5 md:mb-2 lg:mb-3
              text-[9px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base
              landscape:text-[8px] landscape:sm:text-[9px] landscape:md:text-[10px] landscape:lg:text-xs
              font-bold text-primary
            "
          >
            الفقرة:
          </div>
          <div
            className={`
              w-full font-medium text-zinc-600 ${textSizeClass} 
              tracking-[0] [direction:rtl] block
              leading-normal sm:leading-relaxed md:leading-relaxed lg:leading-loose
              landscape:leading-snug landscape:sm:leading-normal landscape:md:leading-relaxed
              ${
                block.type === "paragraph"
                  ? `max-h-[80px] sm:max-h-[100px] md:max-h-[140px] lg:max-h-[200px] xl:max-h-[280px]
                     landscape:max-h-[60px] landscape:sm:max-h-[70px] landscape:md:max-h-[100px] landscape:lg:max-h-[150px]
                     overflow-y-auto pr-1 sm:pr-2 custom-scroll`
                  : ""
              }
            `}
            dangerouslySetInnerHTML={{
              __html: block?.passage?.replaceAll(/&nbsp;/gi, " "),
            }}
          />
        </div>
      )}

      {/* Question */}
      {currentQuestion ? (
        <div
          className="
            mt-1 sm:mt-2 md:mt-3 lg:mt-4 xl:mt-6
            landscape:mt-0.5 landscape:sm:mt-1 landscape:md:mt-2 landscape:lg:mt-3
            w-full
          "
        >
          <SingleQuestion
            key={currentQuestion.id}
            questionData={currentQuestion}
            questionNumber={questionNumberStart}
            selectedAnswer={answers[currentQuestion.id]}
            onAnswerSelect={(optionId) =>
              onAnswerSelect(currentQuestion.id, optionId)
            }
            fontSize={fontSize}
          />
        </div>
      ) : (
        <div className="text-[10px] sm:text-xs md:text-sm lg:text-base">
          لا يوجد سؤال متاح
        </div>
      )}
    </div>
  );
};

export default MockExamQuestion;

export const SingleQuestion = ({
  questionData,
  questionNumber = 1,
  selectedAnswer,
  onAnswerSelect,
  fontSize = "normal",
}) => {
  const handleOptionChange = (optionId) => {
    onAnswerSelect(optionId);
  };

  const getFontSizeClass = (size) => {
    const sizeMap = {
      small: `
        text-[8px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base
        landscape:text-[7px] landscape:sm:text-[9px] landscape:md:text-[11px] landscape:lg:text-xs xl:landscape:text-sm
      `,
      normal: `
        text-[9px] sm:text-xs md:text-sm lg:text-base xl:text-lg
        landscape:text-[8px] landscape:sm:text-[10px] landscape:md:text-xs landscape:lg:text-sm xl:landscape:text-base
      `,
      large: `
        text-[10px] sm:text-sm md:text-base lg:text-lg xl:text-xl
        landscape:text-[9px] landscape:sm:text-xs landscape:md:text-sm landscape:lg:text-base xl:landscape:text-lg
      `,
      xlarge: `
        text-[11px] sm:text-base md:text-lg lg:text-xl xl:text-2xl
        landscape:text-[10px] landscape:sm:text-sm landscape:md:text-base landscape:lg:text-lg xl:landscape:text-xl
      `,
    };
    return sizeMap[size] || sizeMap.normal;
  };

  const textSizeClass = getFontSizeClass(fontSize);

  return (
    <div className="relative w-full">
      {/* Question Text */}
      <div
        className={`
          mb-1.5 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-5
          landscape:mb-1 landscape:sm:mb-1.5 landscape:md:mb-2 landscape:lg:mb-3
          prose prose-neutral max-w-none ${textSizeClass} 
          [&_p]:text-inherit [&_span]:text-inherit
          leading-normal sm:leading-relaxed md:leading-relaxed lg:leading-loose
          landscape:leading-snug landscape:sm:leading-normal landscape:md:leading-relaxed
        `}
        dangerouslySetInnerHTML={{ __html: questionData.text }}
      />

      {/* Options */}
      <fieldset
        className="
          flex flex-col items-start w-full
          gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 xl:gap-4
          landscape:gap-1 landscape:sm:gap-1.5 landscape:md:gap-2 landscape:lg:gap-2.5
        "
      >
        <legend className="sr-only">اختر الإجابة الصحيحة</legend>
        {questionData.options.map((option) => (
          <label
            key={option.id}
            className="
              flex items-start sm:items-center justify-start w-full
              px-1 sm:px-1.5 md:px-2 lg:px-3 xl:px-4
              py-1 sm:py-1.5 md:py-2 lg:py-2.5 xl:py-3
              landscape:py-0.5 landscape:sm:py-1 landscape:md:py-1.5 landscape:lg:py-2
              gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 xl:gap-4
              landscape:gap-1 landscape:sm:gap-1.5 landscape:md:gap-2 landscape:lg:gap-2.5
              cursor-pointer hover:bg-gray-50 transition-colors duration-200 
              rounded sm:rounded-md lg:rounded-lg
            "
          >
            <input
              type="radio"
              name={`question-${questionData.id}`}
              value={option.id}
              checked={selectedAnswer === option.id}
              onChange={() => handleOptionChange(option.id)}
              className="
                w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6
                landscape:w-2.5 landscape:h-2.5 landscape:sm:w-3 landscape:sm:h-3 landscape:md:w-3.5 landscape:md:h-3.5 landscape:lg:w-4 landscape:lg:h-4
                mt-0.5 sm:mt-0 shrink-0
                border-[1.5px] sm:border-2 border-text-alt 
                checked:bg-primary rounded-full checked:border-primary cursor-pointer
              "
            />
            <span
              className={`
                relative flex items-center justify-start w-fit font-medium text-black 
                ${textSizeClass} tracking-[0] [direction:rtl] 
                [&_p]:text-inherit [&_span]:text-inherit
                leading-normal sm:leading-relaxed md:leading-relaxed lg:leading-loose
                landscape:leading-snug landscape:sm:leading-normal landscape:md:leading-relaxed
              `}
            >
              <div dangerouslySetInnerHTML={{ __html: option.text }} />
            </span>
          </label>
        ))}
      </fieldset>
    </div>
  );
};
