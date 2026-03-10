// app/placement-test/[id]/components/QuestionCard.jsx

import { Flag, Check, CheckCircle2, FileText } from "lucide-react";

const QuestionCard = ({
  question,
  index,
  answeredMap,
  flaggedMap,
  onAnswerSelect,
  onToggleFlag,
  questionRefs,
}) => {
  const isAnswered = !!answeredMap[question.id];
  const isFlagged = !!flaggedMap[question.id];
  const letters = ["أ", "ب", "ج", "د", "هـ", "و"];

  return (
    <div
      ref={(el) => (questionRefs.current[question.id] = el)}
      className={`bg-white rounded-2xl shadow-sm overflow-hidden transition-all ${
        isFlagged ? "ring-2 ring-amber-400" : ""
      }`}
    >
      {/* Header */}
      <div
        className={`px-5 py-3 flex items-center justify-between ${
          isFlagged ? "bg-amber-50" : "bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-3 flex-wrap">
          <span className="bg-primary text-white text-sm font-bold px-4 py-1.5 rounded-full">
            السؤال {index + 1}
          </span>
          {question?.type === "t_f" && (
            <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
              صح أو خطأ
            </span>
          )}
          {question?.type === "paragraph_mcq" && (
            <span className="bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full">
              سؤال على فقرة
            </span>
          )}
          {isAnswered && (
            <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              تمت الإجابة
            </span>
          )}
        </div>
        <button
          onClick={() => onToggleFlag(question.id)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all ${
            isFlagged
              ? "bg-amber-500 border-amber-500 text-white"
              : "border-gray-300 text-gray-500 hover:border-amber-500 hover:text-amber-500"
          }`}
        >
          <Flag className="w-4 h-4" />
          <span className="text-xs font-medium hidden sm:inline">
            {isFlagged ? "معلّم" : "علّم للمراجعة"}
          </span>
        </button>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        {/* Passage */}
        {question?.passage && (
          <div className="mb-6 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-r-4 border-blue-500">
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-blue-800">
                  اقرأ الفقرة التالية:
                </h3>
              </div>
            </div>
            <div
              className="prose prose-sm max-w-none text-gray-700 leading-relaxed pr-11"
              dangerouslySetInnerHTML={{ __html: question.passage }}
            />
          </div>
        )}

        {/* Question Text */}
        <div
          className="text-lg md:text-xl text-gray-800 font-medium prose max-w-none leading-relaxed mb-6"
          dangerouslySetInnerHTML={{ __html: question?.text }}
        />

        {/* Options */}
        <div className="space-y-3">
          {question?.options?.map((option, optIndex) => {
            const isSelected = answeredMap[question.id] === option.id;

            return (
              <label
                key={option.id}
                onClick={() => onAnswerSelect(question.id, option.id)}
                className={`flex items-center gap-4 p-4 md:p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-bold transition-all ${
                    isSelected
                      ? "border-primary bg-primary text-white"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  {letters[optIndex] || optIndex + 1}
                </div>
                <span
                  className="flex-1 text-gray-700 text-base md:text-lg"
                  dangerouslySetInnerHTML={{ __html: option.text }}
                />
                {isSelected && (
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                )}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
