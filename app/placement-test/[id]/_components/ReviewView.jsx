// app/placement-test/[id]/components/ReviewView.jsx

import Container from "@/components/ui/Container";
import ReviewQuestionItem from "./ReviewQuestionItem";
import { Flag, CheckCircle2, XCircle, Layers, Edit3, Send } from "lucide-react";

const ReviewView = ({
  testInfo,
  allQuestions,
  sections,
  answeredMap,
  flaggedMap,
  totalQuestions,
  answeredCount,
  flaggedCount,
  unansweredCount,
  onBackToTest,
  onGoToConfirm,
  onGoToQuestion,
}) => {
  const flaggedQuestions = allQuestions.filter((q) => flaggedMap[q.id]);
  const unansweredQuestions = allQuestions.filter((q) => !answeredMap[q.id]);

  return (
    <div className="min-h-[calc(100vh-133px)] bg-gray-50 py-6" dir="rtl">
      <Container>
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                مراجعة الإجابات
              </h1>
              <p className="text-gray-500">راجع إجاباتك قبل الإرسال النهائي</p>
            </div>
            <button
              onClick={onBackToTest}
              className="flex items-center gap-2 px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              العودة للتعديل
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={CheckCircle2}
            value={answeredCount}
            label="تمت الإجابة"
            color="green"
          />
          <StatCard
            icon={Flag}
            value={flaggedCount}
            label="معلّم"
            color="amber"
          />
          <StatCard
            icon={XCircle}
            value={unansweredCount}
            label="بدون إجابة"
            color="red"
          />
          <StatCard
            icon={Layers}
            value={sections?.length || 0}
            label="أقسام"
            color="blue"
          />
        </div>

        {/* Flagged Questions */}
        {flaggedQuestions.length > 0 && (
          <QuestionsList
            title="الأسئلة المعلّمة للمراجعة"
            questions={flaggedQuestions}
            allQuestions={allQuestions}
            answeredMap={answeredMap}
            onGoToQuestion={onGoToQuestion}
            icon={Flag}
            color="amber"
          />
        )}

        {/* Unanswered Questions */}
        {unansweredQuestions.length > 0 && (
          <QuestionsList
            title="الأسئلة بدون إجابة"
            questions={unansweredQuestions}
            allQuestions={allQuestions}
            answeredMap={answeredMap}
            onGoToQuestion={onGoToQuestion}
            icon={XCircle}
            color="red"
          />
        )}

        {/* Questions by Section */}
        <div className="bg-white rounded-2xl shadow-sm mb-6">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">
              ملخص الأقسام والأسئلة
            </h2>
          </div>
          <div className="p-5 space-y-6">
            {sections?.map((section, sectionIndex) => {
              const sectionQuestions = section.questions || [];
              const sectionAnswered = sectionQuestions.filter(
                (q) => answeredMap[q.id]
              ).length;

              return (
                <div key={section.id}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-700 flex items-center gap-2">
                      <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">
                        {sectionIndex + 1}
                      </span>
                      {section.title || `القسم ${sectionIndex + 1}`}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {sectionAnswered} / {sectionQuestions.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sectionQuestions.map((q) => {
                      const qIndex = allQuestions.findIndex(
                        (aq) => aq.id === q.id
                      );
                      const isAnswered = !!answeredMap[q.id];
                      const isFlagged = !!flaggedMap[q.id];

                      return (
                        <button
                          key={q.id}
                          onClick={() => onGoToQuestion(q.id)}
                          className={`w-10 h-10 rounded-lg font-medium text-sm transition-all relative ${
                            isAnswered
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-red-100 text-red-700 hover:bg-red-200"
                          }`}
                        >
                          {qIndex + 1}
                          {isFlagged && (
                            <Flag className="w-3 h-3 text-amber-500 absolute -top-1 -right-1" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-right">
              <p className="text-lg font-medium text-gray-800">
                أكملت {answeredCount} من {totalQuestions} سؤال
              </p>
              {unansweredCount > 0 ? (
                <p className="text-amber-600 text-sm mt-1">
                  يُنصح بالإجابة على جميع الأسئلة قبل الإرسال
                </p>
              ) : (
                <p className="text-green-600 text-sm mt-1">
                  ممتاز! أجبت على جميع الأسئلة
                </p>
              )}
            </div>
            <button
              onClick={onGoToConfirm}
              className="flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-full font-bold text-lg hover:bg-green-600 transition-colors"
            >
              <Send className="w-5 h-5" />
              إرسال الإجابات
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

// Helper Components
const StatCard = ({ icon: Icon, value, label, color }) => {
  const colors = {
    green: "bg-green-100 text-green-600",
    amber: "bg-amber-100 text-amber-600",
    red: "bg-red-100 text-red-600",
    blue: "bg-blue-100 text-blue-600",
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <div className="flex items-center gap-3">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${colors[color]}`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
          <p className="text-gray-500 text-xs">{label}</p>
        </div>
      </div>
    </div>
  );
};

const QuestionsList = ({
  title,
  questions,
  allQuestions,
  answeredMap,
  onGoToQuestion,
  icon: Icon,
  color,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm mb-6">
      <div className="p-5 border-b border-gray-100">
        <h2
          className={`text-lg font-bold text-${color}-700 flex items-center gap-2`}
        >
          <Icon className="w-5 h-5" />
          {title} ({questions.length})
        </h2>
      </div>
      <div className="p-5 space-y-3">
        {questions.map((q) => (
          <ReviewQuestionItem
            key={q.id}
            question={q}
            index={allQuestions.findIndex((aq) => aq.id === q.id)}
            answeredMap={answeredMap}
            onGoToQuestion={onGoToQuestion}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewView;
