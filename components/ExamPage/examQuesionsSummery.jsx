import React from "react";

export const ExamQuesionsSummery = ({
  totalQuestions = 0,
  currentIndex = 0,
  answeredMap = {},
  flaggedMap = {},
  onJumpTo,
}) => {
  const getBoxStyle = (i) => {
    if (i === currentIndex) return "bg-blue-500 text-white";
    if (flaggedMap[i]) return "bg-yellow-400";
    const ans = answeredMap[i];
    const isAnswered =
      ans !== null && ans !== undefined && !(typeof ans === "string" && ans.trim() === "");
    if (isAnswered) return "bg-secondary text-white";
    return "bg-gray-100";
  };

  return (
    <div className="flex-col w-[400px] items-start gap-4 px-6 py-8 bg-white rounded-2xl border border-solid border-variable-collection-stroke flex relative">
      <div className="relative flex items-center justify-center w-fit font-bold text-text text-xl leading-7 whitespace-nowrap ">
        الأسئلة
      </div>

      <div className="flex flex-wrap w-full items-start justify-start gap-[12px_6px] relative">
        {Array.from({ length: totalQuestions }).map((_, index) => (
          <button
            key={index}
            onClick={() => onJumpTo && onJumpTo(index)}
            className={`flex flex-col w-[45px] items-center justify-center gap-2 px-3 py-2 rounded-lg transition ${getBoxStyle(
              index
            )}`}
          >
            <div className="font-medium  text-lg text-right leading-6 whitespace-nowrap flex relative">
              {index + 1}
            </div>
          </button>
        ))}
      </div>

      <div className="flex flex-col w-full items-center gap-3 relative">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 w-6 h-6 rounded-md" />
            <span className="font-medium text-text text-sm leading-6 ">
              الحالي
            </span>
          </div>
          <div className="flex items-center w-[120px] gap-3 ">
            <div className="bg-yellow-400 w-6 h-6 rounded-md" />
            <span className="font-medium text-text text-sm leading-6 ">
              المعلقة
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="bg-secondary w-6 h-6 rounded-md" />
            <span className="font-medium text-text text-sm leading-6 ">
              المجاب عنه
            </span>
          </div>
          <div className="flex items-center w-[120px] gap-3">
            <div className="bg-[#d9d9d9] w-6 h-6 rounded-md" />
            <span className="font-medium text-text text-sm leading-6 ">
              غير مجاب عنه
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
