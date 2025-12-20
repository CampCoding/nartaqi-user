"use client";

import React from "react";

export const TrueFalseQuestion = ({
  questionText = "",
  imageUrl,
  value = null,
  onChange,
}) => {
  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="self-stretch text-right justify-center text-text text-xl font-bold  leading-[50px]">
        {questionText}
      </div>
      {imageUrl && (
        <img
          loading="lazy"
          src={imageUrl}
          alt="question"
          className="max-w-full rounded-xl"
        />
      )}
      <div className="flex flex-col flex-1 items-start gap-6 relative">
        {[
          { id: true, label: "صحيح" },
          { id: false, label: "خطأ" },
        ].map((opt) => (
          <button
            key={opt.label}
            onClick={() => onChange && onChange(opt.id)}
            className={`
            flex items-center gap-2 p-4 w-full rounded-[20px] border-[3px] border-solid transition
            ${
              value === opt.id
                ? "bg-white border-secondary text-secondary-dark font-semibold"
                : "bg-white border-zinc-200 text-text"
            }
          `}
          >
            <span
              className={`
              flex items-center justify-center w-6 h-6 rounded-full border-2 transition
              ${
                value === opt.id
                  ? "bg-seconborder-secondary border-secondary"
                  : "border-gray-400"
              }
            `}
            >
              {value === opt.id && (
                <span className="w-3 h-3 bg-secondary rounded-full"></span>
              )}
            </span>

            <span dir="rtl" className="text-base leading-[40px]">
              {opt.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TrueFalseQuestion;
