// app/placement-test/[id]/components/AlreadySolvedView.jsx

import Container from "@/components/ui/Container";
import {
  CheckCircle2,
  RotateCcw,
  Home,
  Trophy,
  Target,
  Sparkles,
  BookOpen,
  ArrowLeft,
  Calendar,
  Award,
  XCircle,
} from "lucide-react";

const AlreadySolvedView = ({
  testInfo,
  scoreData,
  suggestion,
  onRetake,
  onGoHome,
  onGoToRound,
}) => {
  // Parse score (e.g., "3/14")
  const parseScore = (scoreString) => {
    if (!scoreString) return { correct: 0, total: 0, percentage: 0 };
    const parts = scoreString.split("/");
    const correct = parseInt(parts[0]) || 0;
    const total = parseInt(parts[1]) || 1;
    const percentage = Math.round((correct / total) * 100);
    return { correct, total, percentage };
  };

  const { correct, total, percentage } = parseScore(scoreData?.score);
  const isPassed = percentage >= 60;
  const wrong = total - correct;

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className="min-h-[calc(100vh-133px)] bg-gradient-to-b from-gray-50 to-gray-100 py-8"
      dir="rtl"
    >
      <Container>
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Main Result Card */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
            {/* Header */}
            <div className="text-center mb-8">
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                  isPassed ? "bg-green-100" : "bg-amber-100"
                }`}
              >
                {isPassed ? (
                  <Trophy className="w-12 h-12 text-green-500" />
                ) : (
                  <Target className="w-12 h-12 text-amber-500" />
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                تم حل هذا الاختبار مسبقاً
              </h1>
              <p className="text-gray-500">
                لقد قمت بحل "{testInfo?.title || "اختبار تحديد المستوى"}" من قبل
              </p>
            </div>

            {/* Score Circle */}
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
                  stroke={isPassed ? "#22c55e" : "#f59e0b"}
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
                <span className="text-gray-500 text-sm">نتيجتك السابقة</span>
              </div>
            </div>

            {/* Score Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 rounded-2xl p-5 text-center border border-green-100">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <p className="text-3xl font-bold text-green-600">{correct}</p>
                </div>
                <p className="text-green-600 text-sm font-medium">
                  إجابة صحيحة
                </p>
              </div>
              <div className="bg-red-50 rounded-2xl p-5 text-center border border-red-100">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <XCircle className="w-6 h-6 text-red-500" />
                  <p className="text-3xl font-bold text-red-600">{wrong}</p>
                </div>
                <p className="text-red-600 text-sm font-medium">إجابة خاطئة</p>
              </div>
            </div>

            {/* Score Details Card */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-5 mb-6 border border-gray-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">الدرجة</p>
                    <p className="text-xl font-bold text-primary">
                      {scoreData?.score || `${correct}/${total}`}
                    </p>
                  </div>
                </div>
                {/* <div
                  className={`px-5 py-2.5 rounded-full text-sm font-bold ${
                    isPassed
                      ? "bg-green-500 text-white"
                      : "bg-amber-500 text-white"
                  }`}
                >
                  {isPassed ? "✓ ناجح" : "يحتاج تحسين"}
                </div> */}
              </div>

              {/* Date */}
              {scoreData?.created_at && (
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200 text-gray-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>تاريخ الحل: {formatDate(scoreData.created_at)}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={onGoHome}
                className="w-full py-4 bg-primary text-white rounded-full font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
              >
                <Home className="w-5 h-5" />
                العودة للرئيسية
              </button>

              {/* {onRetake && (
                <button
                  onClick={onRetake}
                  className="w-full py-4 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  إعادة الاختبار
                </button>
              )} */}
            </div>
          </div>

          {/* Suggestion Card */}
          {suggestion && (
            <SuggestionCard suggestion={suggestion} onGoToRound={onGoToRound} />
          )}
        </div>
      </Container>
    </div>
  );
};

// Suggestion Card Component
const SuggestionCard = ({ suggestion, onGoToRound }) => {
  const roundData = suggestion.suggestion_round;

  if (!suggestion.message && !roundData) return null;

  return (
    <div className="bg-secondary rounded-3xl p-8 shadow-xl text-white overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">توصية لك</h2>
            <p className="text-white/70 text-sm">بناءً على نتيجتك السابقة</p>
          </div>
        </div>

        {/* Message */}
        {suggestion.message && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-6 border border-white/20">
            <p className="text-lg leading-relaxed">{suggestion.message}</p>
          </div>
        )}

        {/* Suggested Round */}
        {roundData && (
          <>
            <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-lg">
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                {roundData.image_url ? (
                  <img
                    src={roundData.image_url}
                    alt={roundData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                    <BookOpen className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1">
                  {roundData.name}
                </h3>
                <p className="text-gray-500 text-sm flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  الدورة المقترحة لك
                </p>
              </div>
              <button
                onClick={onGoToRound}
                className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* CTA Button */}
            <button
              onClick={onGoToRound}
              className="w-full mt-6 py-4 bg-white text-secondary rounded-full font-bold text-lg hover:bg-white/95 transition-all hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              الذهاب للدورة المقترحة
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AlreadySolvedView;
