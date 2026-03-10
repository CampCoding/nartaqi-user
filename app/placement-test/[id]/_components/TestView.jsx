// app/placement-test/[id]/components/TestView.jsx

"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import QuestionCard from "./QuestionCard";
import {
  Flag,
  CheckCircle2,
  AlertCircle,
  FileText,
  Eye,
  ArrowUp,
  Layers,
} from "lucide-react";

const TestView = ({
  testInfo,
  sections,
  allQuestions,
  answeredMap,
  flaggedMap,
  totalQuestions,
  answeredCount,
  flaggedCount,
  onAnswerSelect,
  onToggleFlag,
  onGoToReview,
  questionRefs,
  showScrollTop,
  onScrollToTop,
  onScrollToQuestion,
}) => {
  const [showNavigator, setShowNavigator] = useState(false);

  let globalIndex = 0;

  return (
    <div className="min-h-[calc(100vh-133px)] bg-gray-50 py-6" dir="rtl">
      <Container>
        {/* Sticky Header */}
        <div className="top-[60px] z-40 bg-white rounded-2xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                {testInfo?.title || "اختبار تحديد المستوى"}
              </h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  {answeredCount} مُجاب
                </span>
                <span className="flex items-center gap-1">
                  <Flag className="w-4 h-4 text-amber-500" />
                  {flaggedCount} مُعلّم
                </span>
                <span className="flex items-center gap-1">
                  <AlertCircle className="w-4 h-4 text-gray-400" />
                  {totalQuestions - answeredCount} متبقي
                </span>
                <span className="flex items-center gap-1">
                  <Layers className="w-4 h-4 text-blue-500" />
                  {sections?.length || 0} أقسام
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowNavigator(!showNavigator)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-gray-300 text-gray-600 hover:border-primary hover:text-primary transition-all"
              >
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">
                  خريطة الأسئلة
                </span>
              </button>

              <button
                onClick={onGoToReview}
                className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">مراجعة وإرسال</span>
                <span className="sm:hidden">مراجعة</span>
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>التقدم</span>
              <span>
                {answeredCount} / {totalQuestions} سؤال
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(answeredCount / totalQuestions) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question Navigator */}
          {showNavigator && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {allQuestions.map((q, index) => (
                  <button
                    key={q.id}
                    onClick={() => onScrollToQuestion(q.id)}
                    className={`w-10 h-10 rounded-lg font-medium text-sm transition-all relative ${
                      answeredMap[q.id]
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : flaggedMap[q.id]
                          ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {index + 1}
                    {flaggedMap[q.id] && (
                      <Flag className="w-3 h-3 text-amber-500 absolute -top-1 -right-1" />
                    )}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-green-100 rounded"></span>
                  تمت الإجابة
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-amber-100 rounded"></span>
                  معلّم للمراجعة
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-gray-100 rounded"></span>
                  لم تتم الإجابة
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections?.map((section, sectionIndex) => {
            return (
              <div key={section.id}>
                {/* Section Header */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-dashed border-secondary/30"></div>
                  </div>

                  <div className="relative flex justify-center">
                    <div className="bg-white rounded-md p-3">
                      {/* Section Separator */}
                      <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t-2 border-dashed border-primary/30"></div>
                        </div>
                        <div className="relative flex justify-center">
                          <div className="bg-secondary text-white px-6 py-3 rounded-2xl shadow-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <Layers className="w-5 h-5" />
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-white/80">
                                  القسم {sectionIndex + 1} من {sections.length}
                                </p>
                                <h2 className="font-bold text-lg">
                                  {section.title || `القسم ${sectionIndex + 1}`}
                                </h2>
                              </div>
                              <div className="mr-4 pr-4 border-r border-white/30">
                                <p className="text-2xl font-bold">
                                  {section.questions?.length || 0}
                                </p>
                                <p className="text-xs text-white/80">سؤال</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section Description if exists */}
                      {section.description && (
                        <div className="">
                          <p className="text-blue-800 text-sm ">
                            <div
                              className="bg-gray-50!"
                              dangerouslySetInnerHTML={{
                                __html: section.description,
                              }}
                            />
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Questions */}
                <div className="space-y-4">
                  {section.questions?.map((question) => {
                    const currentIndex = globalIndex++;
                    return (
                      <QuestionCard
                        key={question.id}
                        question={question}
                        index={currentIndex}
                        answeredMap={answeredMap}
                        flaggedMap={flaggedMap}
                        onAnswerSelect={onAnswerSelect}
                        onToggleFlag={onToggleFlag}
                        questionRefs={questionRefs}
                      />
                    );
                  })}
                </div>

                {/* Section End */}
                {sectionIndex < sections.length - 1 && (
                  <div className="mt-8 flex items-center justify-center">
                    <div className="flex items-center gap-3 text-gray-400 text-sm bg-gray-100 px-4 py-2 rounded-full">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>انتهى القسم {sectionIndex + 1}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Action */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-right">
              <p className="text-gray-800 font-medium">
                أكملت {answeredCount} من {totalQuestions} سؤال
              </p>
              {totalQuestions - answeredCount > 0 && (
                <p className="text-amber-600 text-sm mt-1">
                  لديك {totalQuestions - answeredCount} سؤال بدون إجابة
                </p>
              )}
            </div>
            <button
              onClick={onGoToReview}
              className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-full font-bold hover:opacity-90 transition-opacity"
            >
              <Eye className="w-5 h-5" />
              مراجعة الإجابات والإرسال
            </button>
          </div>
        </div>
      </Container>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={onScrollToTop}
          className="fixed bottom-6 left-6 w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity z-50"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default TestView;
