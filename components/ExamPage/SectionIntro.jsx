"use client";

import React from "react";

export const SectionIntro = ({
  sectionNumber,
  totalSections,
  sectionTitle,
  sectionDescription,
  questionCount,
  onStartSection,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-start items-start gap-6 sm:gap-8">
      {/* Section Badge */}
      {totalSections > 1 && (
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            القسم {sectionNumber} من {totalSections}
          </span>
          {questionCount > 0 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
              {questionCount} سؤال
            </span>
          )}
        </div>
      )}

      {/* Section Title */}
      <div className="w-full flex justify-start items-center gap-4 sm:gap-6">
        <h2
          className="text-right text-text text-xl sm:text-2xl lg:text-3xl font-bold font-['Cairo']"
          dangerouslySetInnerHTML={{
            __html: sectionTitle?.replace(/&nbsp;/gi, " ") || "القسم اللفظي",
          }}
        />
      </div>

      {/* Section Description */}
      <div className="w-full prose prose-neutral flex-1 text-right text-sup-title text-base sm:text-lg lg:text-xl font-normal font-['Cairo'] leading-relaxed sm:leading-loose lg:leading-10 space-y-4">
        {sectionDescription && (
          <div
            dangerouslySetInnerHTML={{
              __html: sectionDescription.replace(/&nbsp;/gi, " "),
            }}
          />
        )}
      </div>

      {/* Start Section Button */}
      <div className="w-full flex justify-end mt-4">
        <button
          onClick={onStartSection}
          className="px-8 sm:px-12 lg:px-20 py-4 sm:py-5 bg-gradient-to-r from-primary to-secondary hover:scale-105 transition cursor-pointer rounded-[15px] sm:rounded-[20px] flex justify-center items-center gap-2.5"
        >
          <span className="text-center text-white text-sm sm:text-base font-bold">
            ابدأ القسم
          </span>
        </button>
      </div>
    </div>
  );
};

export default SectionIntro;
