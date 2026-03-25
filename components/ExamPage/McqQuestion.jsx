"use client";

import React from "react";

export const McqQuestion = ({
  questionText = "",
  questionHtml = "",
  imageUrl,
  options = [],
  selectedOptionId = null,
  onSelectOption,
}) => {
  return (
    <div className="flex-1 flex flex-col gap-4">
      {imageUrl && (
        <img
          loading="lazy"
          src={imageUrl}
          alt="question"
          className="max-w-full max-h-[250px] sm:max-h-[349px] h-auto object-contain border-2 border-primary-light rounded-xl"
        />
      )}

      {/* Question Text */}
      {questionHtml ? (
        <div
          className="!w-full richtext text-sm sm:text-base"
          dangerouslySetInnerHTML={{ __html: questionHtml }}
        />
      ) : (
        <p className="text-sm sm:text-base">{questionText}</p>
      )}

      {/* Options */}
      <div
        role="radiogroup"
        aria-label="خيارات السؤال"
        className="flex flex-col flex-1 items-start gap-3 sm:gap-4 relative"
      >
        {options.map((option) => {
          const selected = selectedOptionId === option.id;
          return (
            <div
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onSelectOption?.(option.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectOption?.(option.id);
                }
              }}
              className={[
                "flex items-center gap-2 sm:gap-3 py-3 md:py-4 px-3 sm:px-4 w-full rounded-[15px] sm:rounded-[20px] border-[3px] border-solid transition cursor-pointer",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
                selected
                  ? "bg-white border-secondary text-secondary-dark font-semibold"
                  : "bg-white border-zinc-200 text-text hover:border-zinc-300",
              ].join(" ")}
            >
              {/* Custom radio indicator */}
              <span
                aria-hidden="true"
                className={[
                  "flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 transition flex-shrink-0",
                  selected ? "border-secondary" : "border-gray-400",
                ].join(" ")}
              >
                {selected && (
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-secondary rounded-full" />
                )}
              </span>

              {/* Option Text */}
              {option.textHtml ? (
                <span
                  dir="rtl"
                  className="prose prose-neutral !w-full text-sm sm:text-base"
                  dangerouslySetInnerHTML={{ __html: option.textHtml }}
                />
              ) : (
                <span dir="rtl" className="w-full flex-1 text-sm sm:text-base">
                  {option.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
