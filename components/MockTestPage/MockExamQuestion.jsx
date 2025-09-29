"use client";

import React, { useState } from "react";

const MockExamQuestion = ({ 
  questionData, 
  questionNumber = 1, 
  passage, 
  selectedAnswer, 
  onAnswerSelect 
}) => {
  if (!questionData) {
    return <div>جاري تحميل السؤال...</div>;
  }

  return (
    <div>
      {passage && (
        <div className="w-[624px] h-[120px] mb-6">
          <p className="flex items-center justify-center font-medium text-zinc-500 text-base tracking-[0] leading-[normal] [direction:rtl]">
            &quot;{passage}&quot;
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 mt-6">
        <SingleQuestion 
          questionData={questionData}
          questionNumber={questionNumber}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={onAnswerSelect}
        />
      </div>
    </div>
  );
};

export default MockExamQuestion;

export const SingleQuestion = ({ 
  questionData, 
  questionNumber = 1, 
  selectedAnswer, 
  onAnswerSelect 
}) => {
  const handleOptionChange = (optionId) => {
    onAnswerSelect(optionId);
  };

  return (
    <div className="flex flex-col items-start justify-center gap-12 px-0 py-2.5 relative">
      <div className="flex items-center justify-between w-full">
        <p className="relative flex items-center justify-center mt-[-1.00px] font-bold text-text text-base tracking-[0] leading-[normal] [direction:rtl]">
          السؤال {questionNumber}:
          <br />
          {questionData.text}
        </p>
        {selectedAnswer && (
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            تم الإجابة
          </div>
        )}
      </div>

      <fieldset className="flex-col items-start flex gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <legend className="sr-only">اختر الإجابة الصحيحة</legend>
        {questionData.options.map((option) => (
          <label
            key={option.id}
            className="items-center justify-start px-0 py-2 flex gap-4 relative self-stretch w-full flex-[0_0_auto] cursor-pointer hover:bg-gray-50 transition-colors duration-200"
          >
            <input
              type="radio"
              name={`question-${questionNumber}`}
              value={option.id}
              checked={selectedAnswer === option.id}
              onChange={() => handleOptionChange(option.id)}
              className="w-5 h-5 border-2 border-text-alt checked:bg-primary rounded-full checked:border-primary cursor-pointer"
            />
            <span className="relative flex items-center justify-center w-fit mt-[-1.00px] font-medium text-black text-base tracking-[0] leading-[normal] [direction:rtl]">
              {option.text}
            </span>
          </label>
        ))}
      </fieldset>
    </div>
  );
};
