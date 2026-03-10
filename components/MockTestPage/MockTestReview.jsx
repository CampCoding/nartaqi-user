import React, { useState, useEffect } from "react";
import { InfoIcon } from "./../../public/svgs";

const MockTestReview = ({
  sections,
  currentSectionIndex = 0,
  answers,
  markedForReview,
  onNavigateToQuestion,
  onBackToTest,
  activeFilter,
  setActiveFilter,
  onSubmitExam,
  isSubmitting = false,
  isFinalReview = false, // ✅ NEW
  isLastSection = false, // ✅ NEW
  onMoveToNextSection, // ✅ NEW
  completedSections = new Set(), // ✅ NEW
}) => {
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [isConfirmSubmit, setIsConfirmSubmit] = useState(false);

  // Get current section
  const currentSection =
    sections && sections[currentSectionIndex]
      ? sections[currentSectionIndex]
      : null;

  // ✅ Calculate stats for current section only (not completed sections)
  const totalQuestionsInSection = currentSection
    ? currentSection.blocks.reduce(
        (bSum, block) => bSum + block.questions.length,
        0
      )
    : 0;

  const completedQuestionsInSection = currentSection
    ? currentSection.blocks.reduce((count, block) => {
        return (
          count +
          block.questions.filter((q) => answers[q.id] !== undefined).length
        );
      }, 0)
    : 0;

  const flaggedQuestionsInSection = currentSection
    ? currentSection.blocks.reduce((count, block) => {
        return (
          count +
          block.questions.filter(
            (q) =>
              markedForReview.has(String(q.id)) || markedForReview.has(q.id)
          ).length
        );
      }, 0)
    : 0;

  const incompleteQuestionsInSection =
    totalQuestionsInSection - completedQuestionsInSection;

  // ✅ For final review - calculate all sections stats
  const totalQuestionsAll = sections.reduce(
    (sum, section) =>
      sum +
      section.blocks.reduce((bSum, block) => bSum + block.questions.length, 0),
    0
  );
  const completedQuestionsAll = Object.keys(answers).length;
  const incompleteQuestionsAll = totalQuestionsAll - completedQuestionsAll;

  useEffect(() => {
    let questions = [];
    let questionNumber = 1;

    if (isFinalReview) {
      // ✅ Final review - show all sections
      sections.forEach((section, sectionIndex) => {
        section.blocks.forEach((block, blockIndex) => {
          block.questions.forEach((question) => {
            const isAnswered = answers[question.id] !== undefined;
            const isFlagged =
              markedForReview.has(String(question.id)) ||
              markedForReview.has(question.id);

            questions.push({
              ...question,
              questionNumber,
              sectionIndex,
              blockIndex,
              isAnswered,
              isFlagged,
              sectionName: section.title,
              isCompleted: completedSections.has(sectionIndex),
            });

            questionNumber++;
          });
        });
      });
    } else {
      // ✅ Section review - show only current section
      if (currentSection) {
        currentSection.blocks.forEach((block, blockIndex) => {
          block.questions.forEach((question) => {
            const isAnswered = answers[question.id] !== undefined;
            const isFlagged =
              markedForReview.has(String(question.id)) ||
              markedForReview.has(question.id);

            questions.push({
              ...question,
              questionNumber,
              sectionIndex: currentSectionIndex,
              blockIndex,
              isAnswered,
              isFlagged,
              sectionName: currentSection.title,
              isCompleted: false,
            });

            questionNumber++;
          });
        });
      }
    }

    // Apply filters
    switch (activeFilter) {
      case "flagged":
        questions = questions.filter((q) => q.isFlagged);
        break;
      case "incomplete":
        questions = questions.filter((q) => !q.isAnswered);
        break;
      default:
        break;
    }

    setFilteredQuestions(questions);
  }, [
    sections,
    currentSection,
    currentSectionIndex,
    answers,
    markedForReview,
    activeFilter,
    isFinalReview,
    completedSections,
  ]);

  const handleQuestionClick = (question) => {
    // ✅ Only allow navigation for current section questions (not completed sections)
    if (
      !question.isCompleted &&
      question.sectionIndex === currentSectionIndex
    ) {
      onNavigateToQuestion(question.sectionIndex, question.blockIndex);
    }
  };

  const getFilteredCount = () => {
    if (isFinalReview) {
      switch (activeFilter) {
        case "flagged":
          return markedForReview.size;
        case "incomplete":
          return incompleteQuestionsAll;
        default:
          return totalQuestionsAll;
      }
    } else {
      switch (activeFilter) {
        case "flagged":
          return flaggedQuestionsInSection;
        case "incomplete":
          return incompleteQuestionsInSection;
        default:
          return totalQuestionsInSection;
      }
    }
  };

  const getFilteredLabel = () => {
    switch (activeFilter) {
      case "flagged":
        return "أسئلة مميزة";
      case "incomplete":
        return "أسئلة غير مكتملة";
      default:
        return "جميع الأسئلة";
    }
  };

  return (
    <div className="min-h-screen bg-white pt-[48px] pb-[32px]">
      <div className="container max-w-[1312px] mx-auto px-4">
        {/* ✅ Dynamic title based on review type */}
        <div className="text-center mb-[16px] justify-center text-text text-3xl font-bold leading-[50px]">
          {isFinalReview
            ? "المراجعة النهائية"
            : `مراجعة القسم ${currentSectionIndex + 1}`}
        </div>

        {/* ✅ Section info for section review */}
        {!isFinalReview && currentSection && (
          <div className="text-center mb-4">
            <div
              className="text-xl text-primary font-semibold prose prose-neutral inline"
              dangerouslySetInnerHTML={{
                __html: currentSection.title?.replaceAll(/&nbsp;/gi, " ") || "",
              }}
            />
          </div>
        )}

        <div className="w-full px-6 py-4 bg-primary-light rounded-2xl inline-flex justify-start items-center gap-4 mb-[24px]">
          <div className="flex justify-start items-center gap-4">
            <InfoIcon />
            <div className="text-right justify-center text-primary text-2xl font-semibold leading-[50px]">
              التعليمات
            </div>
          </div>
        </div>

        <div className="text-right justify-center">
          <span className="text-black text-base font-bold">
            {isFinalReview
              ? "فيما يلي ملخص جميع إجاباتك في الاختبار"
              : "فيما يلي ملخص إجاباتك في هذا القسم"}
          </span>
          <span className="text-black text-base font-medium leading-loose">
            <br />
            {!isFinalReview && (
              <>
                يمكنك مراجعة الأسئلة والعودة لتعديل إجاباتك قبل الانتقال للقسم
                التالي.
                <br />
                <span className="text-red-600 font-bold">
                  تنبيه: بمجرد الانتقال للقسم التالي، لن تتمكن من العودة لهذا
                  القسم.
                </span>
              </>
            )}
            {isFinalReview && (
              <>
                يمكنك مراجعة جميع إجاباتك قبل إرسال الاختبار.
                <br />
                <span className="text-amber-600 font-bold">
                  ملاحظة: الأقسام المكتملة لا يمكن تعديلها.
                </span>
              </>
            )}
          </span>
        </div>

        <div className="w-full px-6 py-4 bg-primary-light rounded-2xl inline-flex justify-between mt-[32px] items-center gap-4 mb-[24px]">
          <div className="flex justify-start items-center gap-4">
            <InfoIcon />
            <div className="text-right justify-center text-primary text-2xl font-semibold leading-[50px]">
              {isFinalReview ? "الاختبار" : "القسم"}
            </div>
          </div>
          <div className="text-right justify-center text-text text-2xl font-semibold leading-[50px]">
            {getFilteredCount()} {getFilteredLabel()}
          </div>
        </div>

        {/* ✅ Questions display */}
        {isFinalReview ? (
          // Final review - group by sections
          sections.map((section, sectionIdx) => {
            const sectionQuestions = filteredQuestions.filter(
              (q) => q.sectionIndex === sectionIdx
            );

            if (sectionQuestions.length === 0) return null;

            const isCompleted = completedSections.has(sectionIdx);
            const isCurrent = sectionIdx === currentSectionIndex;

            return (
              <div key={sectionIdx} className="mb-8">
                <div className="mb-4 px-4 py-2 bg-primary-light rounded-lg">
                  <div className="flex items-center justify-between">
                    <div
                      className="text-right text-primary prose prose-neutral text-xl font-semibold"
                      dangerouslySetInnerHTML={{
                        __html: section.title
                          ? section.title.replaceAll(/&nbsp;/gi, " ")
                          : `القسم ${sectionIdx + 1}`,
                      }}
                    />
                    <div
                      className={`text-sm ${isCompleted ? "text-green-600" : isCurrent ? "text-blue-600" : "text-gray-600"}`}
                    >
                      {isCompleted
                        ? "✓ مكتمل"
                        : isCurrent
                          ? "القسم الحالي"
                          : ""}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-2 border-[#E4E4E7] rounded-[30px] overflow-hidden">
                  {sectionQuestions.map((question) => (
                    <Review
                      key={question.id}
                      question={question}
                      onClick={() => handleQuestionClick(question)}
                      isDisabled={isCompleted}
                    />
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          // Section review - single section
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-2 border-[#E4E4E7] rounded-[30px] overflow-hidden">
            {filteredQuestions.map((question) => (
              <Review
                key={question.id}
                question={question}
                onClick={() => handleQuestionClick(question)}
                isDisabled={false}
              />
            ))}
          </div>
        )}

        {/* ✅ Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          {/* Back to questions button - only for section review */}
          {!isFinalReview && (
            <button
              onClick={onBackToTest}
              className="px-8 py-4 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-bold text-lg"
            >
              العودة للأسئلة
            </button>
          )}

          {/* Next Section / Submit button */}
          {isFinalReview ? (
            // Final review - Submit button
            <button
              onClick={() => setIsConfirmSubmit(true)}
              disabled={isSubmitting}
              className="px-12 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  جاري الإرسال...
                </>
              ) : (
                <>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  إرسال الاختبار
                </>
              )}
            </button>
          ) : (
            // Section review - Next section button
            <button
              onClick={onMoveToNextSection}
              className="px-12 py-4 bg-primary text-white rounded-xl hover:opacity-90 transition-colors font-bold text-lg flex items-center justify-center gap-3"
            >
              {isLastSection ? (
                <>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  الانتقال للمراجعة النهائية
                </>
              ) : (
                <>
                  <svg
                    className="w-6 h-6 rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  الانتقال للقسم التالي
                </>
              )}
            </button>
          )}
        </div>

        {/* Warning message */}
        {!isFinalReview && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-center">
            <p className="text-amber-800 font-medium">
              تأكد من مراجعة جميع إجاباتك قبل الانتقال. لن تتمكن من العودة لهذا
              القسم.
            </p>
          </div>
        )}

        {/* Warning if incomplete in final review */}
        {isFinalReview && incompleteQuestionsAll > 0 && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-center">
            <p className="text-yellow-800 font-medium">
              لديك {incompleteQuestionsAll} سؤال غير مُجاب.
            </p>
          </div>
        )}
      </div>

      {/* Confirm Submit Modal */}
      {isConfirmSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsConfirmSubmit(false)}
          />
          <div className="relative bg-white rounded-[20px] p-8 max-w-md w-[90%] mx-auto shadow-2xl">
            <h3 className="text-xl font-bold text-center mb-4">
              تأكيد إرسال الاختبار
            </h3>
            <p className="text-center text-gray-600 mb-6">
              {incompleteQuestionsAll > 0
                ? `لديك ${incompleteQuestionsAll} سؤال غير مُجاب. هل أنت متأكد من إرسال الاختبار؟`
                : "هل أنت متأكد من إرسال الاختبار؟ لن تتمكن من تعديل إجاباتك بعد الإرسال."}
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setIsConfirmSubmit(false)}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                onClick={() => {
                  setIsConfirmSubmit(false);
                  onSubmitExam();
                }}
                disabled={isSubmitting || incompleteQuestionsAll > 0}
                className="flex-1 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                تأكيد الإرسال
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockTestReview;

export const Review = ({ question, onClick, isDisabled = false }) => {
  return (
    <div
      className={`flex items-center justify-between border border-[#E4E4E7] !px-4 !py-6 transition-colors ${
        isDisabled
          ? "opacity-50 cursor-not-allowed bg-gray-100"
          : "cursor-pointer hover:bg-gray-50"
      }`}
      onClick={isDisabled ? undefined : onClick}
    >
      <div className="flex items-center justify-start gap-2 relative">
        {question.isFlagged ? <FilledFlagIcon /> : <OutlinedFlagIcon />}
        <div className="relative w-fit font-medium text-text text-base text-right tracking-[0] leading-[normal] whitespace-nowrap [direction:rtl]">
          سؤال {question.questionNumber}
        </div>
      </div>
      <div
        className={`justify-start text-base font-medium ${
          question.isAnswered ? "text-green-700" : "text-red-700"
        }`}
      >
        {question.isAnswered ? "مكتمل" : "غير مكتمل"}
      </div>
    </div>
  );
};

const FilledFlagIcon = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <path
      d="M5.5 3V21"
      stroke="#3B82F6"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.5 4.5H12.5L16 6H19.5C19.7652 6 20.0196 6.10536 20.2071 6.29289C20.3946 6.48043 20.5 6.73478 20.5 7V15.5C20.5 15.7652 20.3946 16.0196 20.2071 16.2071C20.0196 16.3946 19.7652 16.5 19.5 16.5H16L12.5 15H5.5V4.5Z"
      fill="#3B82F6"
      stroke="#3B82F6"
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <path
      d="M3.5 21H7.5"
      stroke="#3B82F6"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const OutlinedFlagIcon = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <path
      d="M5.5 3V21"
      stroke="#3B82F6"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.5 4.5H12.5L16 6H19.5C19.7652 6 20.0196 6.10536 20.2071 6.29289C20.3946 6.48043 20.5 6.73478 20.5 7V15.5C20.5 15.7652 20.3946 16.0196 20.2071 16.2071C20.0196 16.3946 19.7652 16.5 19.5 16.5H16L12.5 15H5.5V4.5Z"
      stroke="#3B82F6"
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <path
      d="M3.5 21H7.5"
      stroke="#3B82F6"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
