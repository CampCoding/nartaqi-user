import React from "react";

export const ExamQuesionsSummery = ({
  totalQuestions = 0,
  currentIndex = 0,
  answeredMap = {},
  flaggedMap = {},
  onJumpTo,
}) => {
  const getBoxStyle = (i) => {
    if (i === currentIndex) return "bg-primary text-white";
    if (flaggedMap[i]) return "bg-yellow-400";
    const ans = answeredMap[i];
    const isAnswered =
      ans !== null &&
      ans !== undefined &&
      !(typeof ans === "string" && ans.trim() === "");
    if (isAnswered) return "bg-secondary text-white";
    return "bg-gray-100";
  };

  return (
    <div className="flex flex-col items-start gap-2 sm:gap-3 lg:gap-4 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 bg-white rounded-lg border border-solid border-variable-collection-stroke w-full max-w-[479px]">
      <div className="font-bold text-text text-lg sm:text-xl lg:text-2xl leading-tight sm:leading-relaxed text-center sm:text-right whitespace-nowrap">
        الأسئلة
      </div>

      <div className="flex flex-wrap w-full items-start justify-start gap-2 sm:gap-3 lg:gap-4">
        {Array.from({ length: totalQuestions }).map((_, index) => (
          <button
            key={index}
            onClick={() => onJumpTo && onJumpTo(index)}
            className={`flex flex-col w-10 sm:w-12 lg:w-14 items-center justify-center gap-2 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 lg:py-3 rounded-md sm:rounded-md lg:rounded-lg transition ${getBoxStyle(
              index
            )}`}
          >
            <div className="font-medium text-lg text-right leading-tight sm:leading-relaxed whitespace-nowrap">
              {index + 1}
            </div>
          </button>
        ))}
      </div>

      <div className="flex flex-col w-full items-center gap-2 sm:gap-3 lg:gap-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 w-[160px] ">
            <div className="bg-primary w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 rounded-md" />
            <span className="font-medium text-text text-xs sm:text-sm lg:text-base leading-tight sm:leading-relaxed">
              الحالي
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 w-[160px]">
            <div className="bg-yellow-400 w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 rounded-md" />
            <span className="font-medium text-text text-xs sm:text-sm lg:text-base leading-tight sm:leading-relaxed">
              المعلقة
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 w-[160px]">
            <div className="bg-secondary w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 rounded-md" />
            <span className="font-medium text-text text-xs sm:text-sm lg:text-base leading-tight sm:leading-relaxed">
              المجاب عنه
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 w-[160px]">
            <div className="bg-[#d9d9d9] w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 rounded-md" />
            <span className="font-medium text-text text-xs sm:text-sm lg:text-base leading-tight sm:leading-relaxed whitespace-nowrap">
              غير مجاب عنه
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
