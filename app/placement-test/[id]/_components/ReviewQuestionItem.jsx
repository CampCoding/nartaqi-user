// app/placement-test/[id]/components/ReviewQuestionItem.jsx

import { Check, Edit3 } from "lucide-react";

const ReviewQuestionItem = ({
  question,
  index,
  answeredMap,
  onGoToQuestion,
}) => {
  const isAnswered = !!answeredMap[question.id];
  const selectedOption = question.options?.find(
    (opt) => opt.id === answeredMap[question.id]
  );

  return (
    <div
      onClick={() => onGoToQuestion(question.id)}
      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
    >
      <span className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
        {index + 1}
      </span>
      <div className="flex-1 min-w-0">
        <div
          className="text-gray-800 text-sm line-clamp-1"
          dangerouslySetInnerHTML={{ __html: question.text }}
        />
        {isAnswered ? (
          <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
            <Check className="w-3 h-3" />
            <span>الإجابة: </span>
            <span
              className="font-medium line-clamp-1"
              dangerouslySetInnerHTML={{ __html: selectedOption?.text || "" }}
            />
          </p>
        ) : (
          <p className="text-red-600 text-xs mt-1">لم تتم الإجابة</p>
        )}
      </div>
      <Edit3 className="w-5 h-5 text-gray-400 flex-shrink-0" />
    </div>
  );
};

export default ReviewQuestionItem;
