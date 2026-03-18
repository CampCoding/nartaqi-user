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
  isFinalReview = false,
  isLastSection = false,
  onMoveToNextSection,
  completedSections = new Set(),
}) => {
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [isConfirmSubmit, setIsConfirmSubmit] = useState(false);

  const currentSection =
    sections && sections[currentSectionIndex]
      ? sections[currentSectionIndex]
      : null;

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
    <div className="min-h-screen bg-white pt-6 sm:pt-8 md:pt-12 pb-4 sm:pb-6 md:pb-8 landscape:pt-3 landscape:pb-2 md:landscape:pt-8 md:landscape:pb-6">
      <div className="container max-w-[1312px] mx-auto px-2 sm:px-4 md:px-6">
        {/* Title */}
        <div className="text-center mb-2 sm:mb-3 md:mb-4 text-text text-lg sm:text-2xl md:text-3xl landscape:text-base md:landscape:text-3xl font-bold leading-tight sm:leading-normal">
          {isFinalReview
            ? "المراجعة النهائية"
            : `مراجعة القسم ${currentSectionIndex + 1}`}
        </div>

        {/* Section Title */}
        {!isFinalReview && currentSection && (
          <div className="text-center mb-2 sm:mb-3 md:mb-4 landscape:mb-1 md:landscape:mb-4">
            <div
              className="text-sm sm:text-lg md:text-xl landscape:text-xs md:landscape:text-xl text-primary font-semibold prose prose-neutral inline"
              dangerouslySetInnerHTML={{
                __html: currentSection.title?.replaceAll(/&nbsp;/gi, " ") || "",
              }}
            />
          </div>
        )}

        {/* Instructions Box */}
        <div className="w-full px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 landscape:px-3 landscape:py-1.5 md:landscape:px-6 md:landscape:py-4 bg-primary-light rounded-xl sm:rounded-2xl inline-flex justify-start items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6 landscape:mb-2 md:landscape:mb-6">
          <div className="flex justify-start items-center gap-2 sm:gap-3 md:gap-4">
            <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 landscape:w-3.5 landscape:h-3.5 md:landscape:w-6 md:landscape:h-6 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
              <InfoIcon />
            </div>
            <div className="text-right text-primary text-sm sm:text-lg md:text-2xl landscape:text-xs md:landscape:text-2xl font-semibold leading-tight sm:leading-normal whitespace-nowrap">
              التعليمات
            </div>
          </div>
        </div>

        {/* Instructions Text */}
        <div className="text-right mb-4 sm:mb-6 md:mb-8 landscape:mb-3 md:landscape:mb-8">
          <span className="text-black text-xs sm:text-sm md:text-base landscape:text-[10px] md:landscape:text-base font-bold">
            {isFinalReview
              ? "فيما يلي ملخص جميع إجاباتك في الاختبار"
              : "فيما يلي ملخص إجاباتك في هذا القسم"}
          </span>
          <span className="text-black text-xs sm:text-sm md:text-base landscape:text-[10px] md:landscape:text-base font-medium leading-relaxed">
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

        {/* Stats Box */}
        <div className="w-full px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 landscape:px-3 landscape:py-1.5 md:landscape:px-6 md:landscape:py-4 bg-primary-light rounded-xl sm:rounded-2xl inline-flex justify-between items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6 landscape:mb-2 md:landscape:mb-6">
          <div className="flex justify-start items-center gap-2 sm:gap-3 md:gap-4">
            <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 landscape:w-3.5 landscape:h-3.5 md:landscape:w-6 md:landscape:h-6 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
              <InfoIcon />
            </div>
            <div className="text-right text-primary text-sm sm:text-lg md:text-2xl landscape:text-xs md:landscape:text-2xl font-semibold leading-tight sm:leading-normal whitespace-nowrap">
              {isFinalReview ? "الاختبار" : "القسم"}
            </div>
          </div>
          <div className="text-right text-text text-sm sm:text-lg md:text-2xl landscape:text-xs md:landscape:text-2xl font-semibold leading-tight sm:leading-normal whitespace-nowrap">
            {getFilteredCount()} {getFilteredLabel()}
          </div>
        </div>

        {/* Questions Grid */}
        {isFinalReview ? (
          sections.map((section, sectionIdx) => {
            const sectionQuestions = filteredQuestions.filter(
              (q) => q.sectionIndex === sectionIdx
            );

            if (sectionQuestions.length === 0) return null;

            const isCompleted = completedSections.has(sectionIdx);
            const isCurrent = sectionIdx === currentSectionIndex;

            return (
              <div
                key={sectionIdx}
                className="mb-4 sm:mb-6 md:mb-8 landscape:mb-3 md:landscape:mb-8"
              >
                <div className="mb-2 sm:mb-3 md:mb-4 landscape:mb-1.5 md:landscape:mb-4 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 landscape:py-0.5 md:landscape:py-2 bg-primary-light rounded-lg">
                  <div className="flex items-center justify-between">
                    <div
                      className="text-right text-primary prose prose-neutral text-sm sm:text-base md:text-xl landscape:text-xs md:landscape:text-xl font-semibold"
                      dangerouslySetInnerHTML={{
                        __html: section.title
                          ? section.title.replaceAll(/&nbsp;/gi, " ")
                          : `القسم ${sectionIdx + 1}`,
                      }}
                    />
                    <div
                      className={`text-[10px] sm:text-xs md:text-sm landscape:text-[9px] md:landscape:text-sm ${
                        isCompleted
                          ? "text-green-600"
                          : isCurrent
                            ? "text-blue-600"
                            : "text-gray-600"
                      }`}
                    >
                      {isCompleted
                        ? "✓ مكتمل"
                        : isCurrent
                          ? "القسم الحالي"
                          : ""}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-2 border-[#E4E4E7] rounded-2xl sm:rounded-[25px] md:rounded-[30px] overflow-hidden">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-2 border-[#E4E4E7] rounded-2xl sm:rounded-[25px] md:rounded-[30px] overflow-hidden">
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

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6 md:mt-8 landscape:mt-3 md:landscape:mt-8">
          {!isFinalReview && (
            <button
              onClick={onBackToTest}
              className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 landscape:px-4 landscape:py-1.5 md:landscape:px-8 md:landscape:py-4 bg-gray-200 text-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-300 transition-colors font-bold text-sm sm:text-base md:text-lg landscape:text-xs md:landscape:text-lg"
            >
              العودة للأسئلة
            </button>
          )}

          {isFinalReview ? (
            <button
              onClick={() => setIsConfirmSubmit(true)}
              disabled={isSubmitting}
              className="px-6 py-2 sm:px-8 sm:py-3 md:px-12 md:py-4 landscape:px-6 landscape:py-1.5 md:landscape:px-12 md:landscape:py-4 bg-green-600 text-white rounded-lg sm:rounded-xl hover:bg-green-700 transition-colors font-bold text-sm sm:text-base md:text-lg landscape:text-xs md:landscape:text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white"
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
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 landscape:w-3.5 landscape:h-3.5 md:landscape:w-6 md:landscape:h-6"
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
            <button
              onClick={onMoveToNextSection}
              className="px-6 py-2 sm:px-8 sm:py-3 md:px-12 md:py-4 landscape:px-6 landscape:py-1.5 md:landscape:px-12 md:landscape:py-4 bg-primary text-white rounded-lg sm:rounded-xl hover:opacity-90 transition-colors font-bold text-sm sm:text-base md:text-lg landscape:text-xs md:landscape:text-lg flex items-center justify-center gap-2 sm:gap-3"
            >
              {isLastSection ? (
                <>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 landscape:w-3.5 landscape:h-3.5 md:landscape:w-6 md:landscape:h-6"
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
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 landscape:w-3.5 landscape:h-3.5 md:landscape:w-6 md:landscape:h-6 rotate-180"
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

        {/* Warning Messages */}
        {!isFinalReview && (
          <div className="mt-2 sm:mt-3 md:mt-4 landscape:mt-1.5 md:landscape:mt-4 p-2 sm:p-3 md:p-4 landscape:p-2 md:landscape:p-4 bg-amber-50 border border-amber-200 rounded-lg sm:rounded-xl text-center">
            <p className="text-amber-800 font-medium text-xs sm:text-sm md:text-base landscape:text-[10px] md:landscape:text-base">
              تأكد من مراجعة جميع إجاباتك قبل الانتقال. لن تتمكن من العودة لهذا
              القسم.
            </p>
          </div>
        )}

        {isFinalReview && incompleteQuestionsAll > 0 && (
          <div className="mt-2 sm:mt-3 md:mt-4 landscape:mt-1.5 md:landscape:mt-4 p-2 sm:p-3 md:p-4 landscape:p-2 md:landscape:p-4 bg-yellow-50 border border-yellow-200 rounded-lg sm:rounded-xl text-center">
            <p className="text-yellow-800 font-medium text-xs sm:text-sm md:text-base landscape:text-[10px] md:landscape:text-base">
              لديك {incompleteQuestionsAll} سؤال غير مُجاب.
            </p>
          </div>
        )}
      </div>

      {/* Confirm Submit Modal */}
      {isConfirmSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsConfirmSubmit(false)}
          />
          <div className="relative bg-white rounded-2xl sm:rounded-[20px] p-4 sm:p-6 md:p-8 max-w-md w-full mx-auto shadow-2xl">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-center mb-2 sm:mb-3 md:mb-4">
              تأكيد إرسال الاختبار
            </h3>
            <p className="text-center text-gray-600 mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm md:text-base">
              {incompleteQuestionsAll > 0
                ? `لديك ${incompleteQuestionsAll} سؤال غير مُجاب. هل أنت متأكد من إرسال الاختبار؟`
                : "هل أنت متأكد من إرسال الاختبار؟ لن تتمكن من تعديل إجاباتك بعد الإرسال."}
            </p>
            <div className="flex gap-2 sm:gap-3 md:gap-4">
              <button
                onClick={() => setIsConfirmSubmit(false)}
                className="flex-1 py-2 sm:py-2.5 md:py-3 border-2 border-gray-300 text-gray-700 rounded-lg sm:rounded-xl font-medium hover:bg-gray-50 text-xs sm:text-sm md:text-base"
              >
                إلغاء
              </button>
              <button
                onClick={() => {
                  setIsConfirmSubmit(false);
                  onSubmitExam();
                }}
                disabled={isSubmitting || incompleteQuestionsAll > 0}
                className="flex-1 py-2 sm:py-2.5 md:py-3 bg-green-600 text-white rounded-lg sm:rounded-xl font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm md:text-base"
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
      className={`flex items-center justify-between border border-[#E4E4E7] px-2 py-3 sm:px-3 sm:py-4 md:!px-4 md:!py-6 landscape:px-2 landscape:py-2 md:landscape:!px-4 md:landscape:!py-6 transition-colors ${
        isDisabled
          ? "opacity-50 cursor-not-allowed bg-gray-100"
          : "cursor-pointer hover:bg-gray-50"
      }`}
      onClick={isDisabled ? undefined : onClick}
    >
      <div className="flex items-center justify-start gap-1 sm:gap-1.5 md:gap-2 relative">
        <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 landscape:w-3.5 landscape:h-3.5 md:landscape:w-6 md:landscape:h-6 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full shrink-0">
          {question.isFlagged ? <FilledFlagIcon /> : <OutlinedFlagIcon />}
        </div>
        <div className="font-medium text-text text-xs sm:text-sm md:text-base landscape:text-[10px] md:landscape:text-base text-right whitespace-nowrap [direction:rtl]">
          سؤال {question.questionNumber}
        </div>
      </div>
      <div
        className={`text-xs sm:text-sm md:text-base landscape:text-[10px] md:landscape:text-base font-medium whitespace-nowrap ${
          question.isAnswered ? "text-green-700" : "text-red-700"
        }`}
      >
        {question.isAnswered ? "مكتمل" : "غير مكتمل"}
      </div>
    </div>
  );
};

const FilledFlagIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
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
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
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
