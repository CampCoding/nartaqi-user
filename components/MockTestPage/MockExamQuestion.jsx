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
    return <div className="text-[10px] sm:text-sm">جاري تحميل السؤال...</div>;
  }

  // تصغير مقاسات الخطوط قليلاً للـ Landscape لتناسب الشاشة بالعرض
  const getFontSizeClass = (size) => {
    const sizeMap = {
      small: "text-[8px] sm:text-sm landscape:text-[8px]",
      normal: "text-[9px] sm:text-base landscape:text-[9px]",
      large: "text-[11px] sm:text-lg landscape:text-[11px]",
      xlarge: "text-[12px] sm:text-xl landscape:text-[12px]",
    };
    return sizeMap[size] || sizeMap.normal;
  };

  const textSizeClass = getFontSizeClass(fontSize);

  const currentQuestion =
    block.questions && block.questions.length > 0 ? block.questions[0] : null;

  return (
    <div className="w-full">
      {/* Show passage if exists */}
      {block.passage && (
        <div
          className={`mb-2 sm:mb-6 landscape:mb-1 ${
            block.type === "paragraph"
              ? "sticky top-0 bg-white z-10 pb-1 sm:pb-4 pt-1 sm:pt-2 border-b sm:border-b-2 border-gray-300 shadow-sm"
              : ""
          }`}
        >
          <div className="mb-1 sm:mb-3 text-[9px] sm:text-sm landscape:text-[8px] font-bold text-primary">
            الفقرة:
          </div>
          <div
            className={`w-full font-medium text-zinc-600 ${textSizeClass} tracking-[0] leading-tight sm:leading-relaxed landscape:leading-snug [direction:rtl] block ${
              block.type === "paragraph"
                ? "max-h-[100px] sm:max-h-[250px] landscape:max-h-[80px] overflow-y-auto pr-1 sm:pr-2 custom-scroll"
                : ""
            }`}
            dangerouslySetInnerHTML={{
              __html: block?.passage?.replaceAll(/&nbsp;/gi, " "),
            }}
          />
        </div>
      )}

      {/* Show only one question at a time */}
      {currentQuestion ? (
        <div className="mt-1 sm:mt-6 landscape:mt-1 w-full">
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
        <div className="text-[10px] sm:text-sm">لا يوجد سؤال متاح</div>
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
      small: "text-[8px] sm:text-sm landscape:text-[7px]",
      normal: "text-[9px] sm:text-base landscape:text-[8px]",
      large: "text-[11px] sm:text-lg landscape:text-[10px]",
      xlarge: "text-[12px] sm:text-xl landscape:text-[11px]",
    };
    return sizeMap[size] || sizeMap.normal;
  };

  const textSizeClass = getFontSizeClass(fontSize);

  return (
    <div className="relative w-full">
      <div
        className={`mb-2 sm:mb-5 landscape:mb-1 prose prose-neutral max-w-none ${textSizeClass} [&_p]:text-inherit [&_span]:text-inherit leading-tight sm:leading-normal landscape:leading-snug`}
        dangerouslySetInnerHTML={{ __html: questionData.text }}
      />

      <fieldset className="flex-col items-start flex gap-1.5 sm:gap-4 landscape:gap-1 relative self-stretch w-full flex-[0_0_auto]">
        <legend className="sr-only">اختر الإجابة الصحيحة</legend>
        {questionData.options.map((option) => (
          <label
            key={option.id}
            className="items-start sm:items-center justify-start px-1 sm:px-0 py-1 sm:py-2 landscape:py-0.5 flex gap-1.5 sm:gap-4 landscape:gap-1 relative self-stretch w-full flex-[0_0_auto] cursor-pointer hover:bg-gray-50 transition-colors duration-200 rounded sm:rounded-none"
          >
            <input
              type="radio"
              name={`question-${questionData.id}`}
              value={option.id}
              checked={selectedAnswer === option.id}
              onChange={() => handleOptionChange(option.id)}
              className="w-3 h-3 sm:w-5 sm:h-5 landscape:w-2.5 landscape:h-2.5 mt-0.5 sm:mt-0 shrink-0 border-[1.5px] sm:border-2 border-text-alt checked:bg-primary rounded-full checked:border-primary cursor-pointer"
            />
            <span
              className={`relative flex items-center justify-start w-fit font-medium text-black ${textSizeClass} tracking-[0] leading-tight sm:leading-[normal] landscape:leading-snug [direction:rtl] [&_p]:text-inherit [&_span]:text-inherit`}
            >
              <div dangerouslySetInnerHTML={{ __html: option.text }} />
            </span>
          </label>
        ))}
      </fieldset>
    </div>
  );
};
