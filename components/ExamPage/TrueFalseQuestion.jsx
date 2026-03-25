"use client";

import React from "react";

export const TrueFalseQuestion = ({
  questionText = "",
  questionHtml = "",
  imageUrl,
  value = null,
  onChange,
}) => {
  return (
    <div className="flex-1 flex flex-col gap-4">
      {questionHtml ? (
        <div
          className="!w-full richtext text-base sm:text-xl font-bold"
          dangerouslySetInnerHTML={{ __html: questionHtml }}
        />
      ) : (
        <div className="self-stretch text-right justify-center text-text text-base sm:text-xl font-bold leading-[40px] sm:leading-[50px]">
          {questionText}
        </div>
      )}

      {imageUrl && (
        <img
          loading="lazy"
          src={imageUrl}
          alt="question"
          className="max-w-full max-h-[250px] sm:max-h-[349px] rounded-xl"
        />
      )}

      <div className="flex flex-col flex-1 items-start gap-4 sm:gap-6 relative">
        {[
          { id: true, label: "صحيح" },
          { id: false, label: "خطأ" },
        ].map((opt) => (
          <button
            key={opt.label}
            onClick={() => onChange && onChange(opt.id)}
            className={`
              flex items-center gap-2 sm:gap-3 p-3 sm:p-4 w-full rounded-[15px] sm:rounded-[20px] border-[3px] border-solid transition
              ${
                value === opt.id
                  ? "bg-white border-secondary text-secondary-dark font-semibold"
                  : "bg-white border-zinc-200 text-text"
              }
            `}
          >
            <span
              className={`
                flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 transition flex-shrink-0
                ${value === opt.id ? "border-secondary" : "border-gray-400"}
              `}
            >
              {value === opt.id && (
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-secondary rounded-full"></span>
              )}
            </span>

            <span
              dir="rtl"
              className="text-sm sm:text-base leading-[30px] sm:leading-[40px]"
            >
              {opt.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TrueFalseQuestion;
