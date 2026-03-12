"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import {
  Check,
  X,
  Eye,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Sparkles,
  BookOpen,
  ArrowLeft,
  Trophy,
  Target,
} from "lucide-react";

const ResultsView = ({
  testInfo,
  percentage,
  correctAnswers,
  totalQuestions,
  allQuestions,
  answeredMap,
  suggestion,
  sectionResults = [],
  onGoToRound,
  onGoHome,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="min-h-[calc(100vh-133px)] bg-gray-50 py-8" dir="rtl">
      <Container>
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Main Result Card */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
            {/* Header */}
            <div className="text-center mb-8">
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                  percentage >= 60 ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {percentage >= 60 ? (
                  <Trophy className="w-12 h-12 text-green-500" />
                ) : (
                  <Target className="w-12 h-12 text-red-500" />
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {percentage >= 60 ? "أحسنت!" : "حاول مرة أخرى"}
              </h1>
              <p className="text-gray-500">تم إنهاء الاختبار بنجاح</p>
            </div>

            {/* Section Results */}
            {sectionResults.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  نتائج الأقسام
                </h2>

                <div className="space-y-4">
                  {sectionResults.map((section, index) => (
                    <SectionResultCard
                      key={section.id}
                      section={section}
                      index={index}
                    />
                  ))}
                </div>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-dashed border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-sm font-bold text-gray-500">
                      النتيجة الإجمالية
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Total Score Circle */}
            <div className="relative w-44 h-44 mx-auto mb-8">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="88"
                  cy="88"
                  r="78"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                />
                <circle
                  cx="88"
                  cy="88"
                  r="78"
                  fill="none"
                  stroke={percentage >= 60 ? "#22c55e" : "#ef4444"}
                  strokeWidth="12"
                  strokeDasharray={`${(percentage / 100) * 490} 490`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-gray-800">
                  {percentage}%
                </span>
                <span className="text-gray-500 text-sm">المجموع الكلي</span>
              </div>
            </div>

            {/* Total Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-green-50 rounded-2xl p-5 text-center">
                <p className="text-3xl font-bold text-green-600">
                  {correctAnswers}
                </p>
                <p className="text-green-600 text-sm">إجابة صحيحة</p>
              </div>
              <div className="bg-red-50 rounded-2xl p-5 text-center">
                <p className="text-3xl font-bold text-red-600">
                  {totalQuestions - correctAnswers}
                </p>
                <p className="text-red-600 text-sm">إجابة خاطئة</p>
              </div>
            </div>

            {/* Show Details */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full py-3 border-2 border-gray-200 text-gray-700 rounded-full font-medium mb-4 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <Eye className="w-5 h-5" />
              {showDetails ? "إخفاء التفاصيل" : "عرض تفاصيل الإجابات"}
              <ChevronUp
                className={`w-5 h-5 transition-transform ${
                  showDetails ? "" : "rotate-180"
                }`}
              />
            </button>

            {showDetails && (
              <AnswerDetails
                allQuestions={allQuestions}
                answeredMap={answeredMap}
              />
            )}
          </div>

          {/* Suggestion Card */}
          {suggestion && (
            <SuggestionCard suggestion={suggestion} onGoToRound={onGoToRound} />
          )}

          {/* Home Button */}
          <button
            onClick={onGoHome}
            className="w-full py-4 bg-primary text-white rounded-full font-bold text-lg hover:opacity-90 transition-opacity"
          >
            العودة للرئيسية
          </button>
        </div>
      </Container>
    </div>
  );
};

// Section Result Card Component
const SectionResultCard = ({ section, index }) => {
  const getColorClass = (percentage) => {
    if (percentage >= 80)
      return {
        bg: "bg-green-500",
        light: "bg-green-100",
        text: "text-green-600",
      };
    if (percentage >= 60)
      return {
        bg: "bg-yellow-500",
        light: "bg-yellow-100",
        text: "text-yellow-600",
      };
    return { bg: "bg-red-500", light: "bg-red-100", text: "text-red-600" };
  };

  const colors = getColorClass(section.percentage);

  return (
    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span
            className={`w-8 h-8 rounded-full ${colors.light} ${colors.text} flex items-center justify-center text-sm font-bold`}
          >
            {index + 1}
          </span>
          <div>
            <h3 className="font-bold text-gray-800 text-sm">
              {section.title || `القسم ${index + 1}`}
            </h3>
            <p className="text-xs text-gray-500">
              {section.total} {section.total === 1 ? "سؤال" : "أسئلة"}
            </p>
          </div>
        </div>
        <div className="text-left">
          <p className={`text-lg font-bold ${colors.text}`}>
            {section.correct}/{section.total}
          </p>
          <p className="text-xs text-gray-500">{section.percentage}%</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`absolute top-0 right-0 h-full ${colors.bg} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${section.percentage}%` }}
        />
      </div>

      {/* Mini Stats */}
      <div className="flex items-center justify-between mt-2 text-xs">
        <span className="text-green-600 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          {section.correct} صحيح
        </span>
        <span className="text-red-600 flex items-center gap-1">
          <XCircle className="w-3 h-3" />
          {section.total - section.correct} خطأ
        </span>
      </div>
    </div>
  );
};

// Answer Details Component
const AnswerDetails = ({ allQuestions, answeredMap }) => (
  <div className="mb-6 border rounded-2xl overflow-hidden">
    <div className="max-h-96 overflow-y-auto">
      {allQuestions.map((q, index) => {
        const selectedOptionId = answeredMap[q.id];
        const selectedOption = q.options?.find(
          (opt) => opt.id === selectedOptionId
        );
        const correctOption = q.options?.find((opt) => opt.isCorrect);
        const isCorrect = selectedOption?.isCorrect;

        return (
          <div
            key={q.id}
            className={`p-4 border-b last:border-b-0 ${
              isCorrect ? "bg-green-50" : "bg-red-50"
            }`}
          >
            <div className="flex items-start gap-3">
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  isCorrect
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {index + 1}
              </span>
              <div className="flex-1">
                <div
                  className="text-gray-800 text-sm mb-2"
                  dangerouslySetInnerHTML={{ __html: q.text }}
                />
                <div className="text-xs space-y-1">
                  {selectedOption ? (
                    <p
                      className={isCorrect ? "text-green-700" : "text-red-700"}
                    >
                      إجابتك:{" "}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: selectedOption.text,
                        }}
                      />
                    </p>
                  ) : (
                    <p className="text-gray-500">لم تتم الإجابة</p>
                  )}
                  {!isCorrect && correctOption && (
                    <p className="text-green-700">
                      الإجابة الصحيحة:{" "}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: correctOption.text,
                        }}
                      />
                    </p>
                  )}
                </div>
              </div>
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

// Suggestion Card Component
const SuggestionCard = ({ suggestion, onGoToRound }) => (
  <div className="bg-secondary rounded-3xl p-8 shadow-lg text-white">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
        <Sparkles className="w-6 h-6" />
      </div>
      <div>
        <h2 className="text-xl font-bold">توصية لك</h2>
        <p className="text-white/80 text-sm">بناءً على نتيجتك</p>
      </div>
    </div>

    {suggestion.message && (
      <p className="text-lg mb-6 bg-white/10 rounded-xl p-4">
        {suggestion.message}
      </p>
    )}

    {suggestion.suggestion_round && (
      <div className="bg-white rounded-2xl p-4 flex items-center gap-4">
        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
          {suggestion.suggestion_round.image_url ? (
            <img
              src={suggestion.suggestion_round.image_url}
              alt={suggestion.suggestion_round.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-800 text-lg mb-1">
            {suggestion.suggestion_round.name}
          </h3>
          <p className="text-gray-500 text-sm">الدورة المقترحة لك</p>
        </div>
        <button
          onClick={onGoToRound}
          className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:opacity-90 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
      </div>
    )}

    <button
      onClick={onGoToRound}
      className="w-full mt-4 py-4 bg-white text-secondary rounded-full font-bold text-lg hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
    >
      <BookOpen className="w-5 h-5" />
      الذهاب للدورة المقترحة
    </button>
  </div>
);

export default ResultsView;
