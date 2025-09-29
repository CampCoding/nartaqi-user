"use client";

import React from "react";

export const TextQuestion = ({
  questionText = "",
  imageUrl,
  value = "",
  onChange,
  placeholder = "اكتب إجابتك هنا...",
}) => {
  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="self-stretch text-right justify-center text-text text-xl font-bold font-['Cairo'] leading-[50px]">
        {questionText}
      </div>
      {imageUrl && (
        <img src={imageUrl} alt="question" className="max-w-full rounded-xl" />
      )}
      <textarea
        dir="rtl"
        className="w-full min-h-[180px] p-4 rounded-2xl border-2 border-zinc-200 outline-none focus:border-primary"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    </div>
  );
};

export default TextQuestion;


