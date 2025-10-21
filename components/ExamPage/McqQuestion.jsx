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
        <img
          src={imageUrl}
          alt="question"
          className="max-w-full max-h-[349px] h-auto object-contain border-2 border-primary-light rounded-xl"
        />
      )}

      <h2 className="self-stretch text-right justify-center text-text   text-lg md:text-xl font-bold leading-[50px]">
        {questionText}
      </h2>

      {/* Radio-like options */}
      <div
        role="radiogroup"
        aria-label="خيارات السؤال"
        className="flex flex-col flex-1 items-start gap-4 relative"
      >
        {options.map((option) => {
          const selected = selectedOptionId === option.id;
          return (
            <button
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
                "flex items-center gap-3  py-2  md:py-4 px-4 w-full rounded-[20px] border-[3px] border-solid transition",
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
                  "flex items-center justify-center w-6 h-6 rounded-full border-2 transition",
                  selected ? "border-secondary" : "border-gray-400",
                ].join(" ")}
              >
                {selected && (
                  <span className="w-3 h-3 bg-secondary rounded-full" />
                )}
              </span>

              <span
                dir="rtl"
                className=" text-sm md:text-base leading-[40px] text-right"
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
