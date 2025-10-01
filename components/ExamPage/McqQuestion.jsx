"use client";

import React from "react";

export const McqQuestion = ({
  questionText = "",
  imageUrl,
  options = [],
  selectedOptionId = null,
  onSelectOption,
}) => {
  return (
    <div className="flex-1 flex flex-col gap-4">
      {imageUrl && (
        <img src={imageUrl} alt="question" className="max-w-full h-[349px] object-contain border-2 border-primary-light   rounded-xl" />
      )}
      <div className="self-stretch text-right justify-center text-text text-xl font-bold  leading-[50px]">
        {questionText}
      </div>
      <div className="flex flex-col flex-1 items-start gap-6 relative">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelectOption && onSelectOption(option.id)}
            className={`
            flex items-center gap-2 p-4 w-full rounded-[20px] border-[3px] border-solid transition
            ${
              selectedOptionId === option.id
                ? "bg-white border-secondary text-secondary-dark font-semibold"
                : "bg-white border-zinc-200 text-text"
            }
          `}
          >
            <span
              className={`
              flex items-center justify-center w-6 h-6 rounded-full border-2 transition
              ${
                selectedOptionId === option.id
                  ? "bg-seconborder-secondary border-secondary"
                  : "border-gray-400"
              }
            `}
            >
              {selectedOptionId === option.id && (
                <span className="w-3 h-3 bg-secondary rounded-full"></span>
              )}
            </span>

            <span dir="rtl" className="text-base leading-[40px]">
              {option.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
