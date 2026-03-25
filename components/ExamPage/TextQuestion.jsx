"use client";

import React from "react";

export const TextQuestion = ({
  questionText = "",
  questionHtml = "",
  imageUrl,
  value = "",
  onChange,
  placeholder = "اكتب إجابتك هنا...",
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

      <textarea
        dir="rtl"
        className="w-full min-h-[150px] sm:min-h-[180px] p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 border-zinc-200 outline-none focus:border-primary text-sm sm:text-base"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    </div>
  );
};

export default TextQuestion;
