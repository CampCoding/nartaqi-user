"use client";

import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentIndex,
  nextQuestion,
  prevQuestion,
  setAnswer,
  startExam,
  toggleFlag,
  selectQuestions,
  selectSections,
  selectCurrentSection,
  selectCurrentBlock,
  selectCurrentQuestionInBlockIndex,
  selectCurrentIndex,
  selectCurrentQuestion,
  selectAnsweredMap,
  selectFlaggedMap,
  selectIsStarted,
  selectIsFirstQuestion,
  selectIsLastQuestion,
} from "../../components/utils/Store/Slices/examSlice";
import { ExamQuesionsSummery } from "./examQuesionsSummery";
import { McqQuestion } from "./McqQuestion";
import { TrueFalseQuestion } from "./TrueFalseQuestion";
import { TextQuestion } from "./TextQuestion";
import { ConfirmSubmitModal } from "./ConfirmSubmitModal";

const ExamContent = ({ onSubmitExam, submitting }) => {
  const dispatch = useDispatch();

  const questions = useSelector(selectQuestions);
  const sections = useSelector(selectSections);
  const currentSection = useSelector(selectCurrentSection);
  const currentBlock = useSelector(selectCurrentBlock);
  const currentQuestionInBlockIndex = useSelector(
    selectCurrentQuestionInBlockIndex
  );
  const currentIndex = useSelector(selectCurrentIndex);
  const currentQuestion = useSelector(selectCurrentQuestion);
  const answeredMap = useSelector(selectAnsweredMap);
  const flaggedMap = useSelector(selectFlaggedMap);
  const isStarted = useSelector(selectIsStarted);
  const isFirstQuestion = useSelector(selectIsFirstQuestion);
  const isLastQuestion = useSelector(selectIsLastQuestion);

  // Modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const currentAnswer = currentQuestion
    ? (answeredMap[currentQuestion.id] ?? null)
    : null;
  const isCurrentFlagged = currentQuestion
    ? (flaggedMap[currentQuestion.id] ?? false)
    : false;

  const answeredMapByIndex = useMemo(() => {
    const map = {};
    questions.forEach((q, index) => {
      if (answeredMap[q.id] !== undefined) map[index] = answeredMap[q.id];
    });
    return map;
  }, [questions, answeredMap]);

  const flaggedMapByIndex = useMemo(() => {
    const map = {};
    questions.forEach((q, index) => {
      if (flaggedMap[q.id]) map[index] = true;
    });
    return map;
  }, [questions, flaggedMap]);

  // Stats للأسئلة
  const examStats = useMemo(() => {
    const total = questions.length;
    const answered = Object.keys(answeredMap).length;
    const unanswered = total - answered;
    const flagged = Object.values(flaggedMap).filter(Boolean).length;

    // الأسئلة المعلمة ومتجاوبتش
    const flaggedUnanswered = questions.filter(
      (q) => flaggedMap[q.id] && answeredMap[q.id] === undefined
    ).length;

    return { total, answered, unanswered, flagged, flaggedUnanswered };
  }, [questions, answeredMap, flaggedMap]);

  const handleSelectOption = (questionId, answer) => {
    dispatch(setAnswer({ questionId, answer }));
  };

  const handleToggleFlag = () => {
    if (currentQuestion) {
      dispatch(toggleFlag(currentQuestion.id));
    }
  };

  const handleJumpTo = (targetIndex) => dispatch(setCurrentIndex(targetIndex));
  const handlePrev = () => dispatch(prevQuestion());
  const handleNext = () => dispatch(nextQuestion());
  const handleStart = () => dispatch(startExam());

  // عند الضغط على إنهاء - نعرض Modal لو في مشاكل
  const handleFinishClick = () => {
    if (examStats.unanswered > 0 || examStats.flagged > 0) {
      setShowConfirmModal(true);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!onSubmitExam) return;
    setShowConfirmModal(false);
    onSubmitExam();
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case "mcq":
      case "paragraph":
        return (
          <McqQuestion
            questionText={currentQuestion.text}
            questionHtml={currentQuestion.textHtml}
            imageUrl={currentQuestion.imageUrl}
            options={currentQuestion.options || []}
            selectedOptionId={currentAnswer}
            onSelectOption={(optionId) =>
              handleSelectOption(currentQuestion.id, optionId)
            }
          />
        );

      case "boolean":
      case "t_f":
        return (
          <TrueFalseQuestion
            questionText={currentQuestion.text}
            questionHtml={currentQuestion.textHtml}
            imageUrl={currentQuestion.imageUrl}
            value={currentAnswer}
            onChange={(val) => handleSelectOption(currentQuestion.id, val)}
            options={currentQuestion.options}
          />
        );

      case "text":
        return (
          <TextQuestion
            questionText={currentQuestion.text}
            questionHtml={currentQuestion.textHtml}
            imageUrl={currentQuestion.imageUrl}
            value={currentAnswer || ""}
            onChange={(val) => handleSelectOption(currentQuestion.id, val)}
          />
        );

      default:
        return (
          <McqQuestion
            questionText={currentQuestion.text}
            questionHtml={currentQuestion.textHtml}
            imageUrl={currentQuestion.imageUrl}
            options={currentQuestion.options || []}
            selectedOptionId={currentAnswer}
            onSelectOption={(optionId) =>
              handleSelectOption(currentQuestion.id, optionId)
            }
          />
        );
    }
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12">
      <div className="flex flex-col lg:flex-row items-start gap-6 sm:gap-8 lg:gap-12 xl:gap-[58px]">
        <div className="w-full lg:flex-1">
          {isStarted && currentQuestion ? (
            <>
              {/* Question Header with Flag */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-text-alt">
                    السؤال {currentIndex + 1} من {questions.length}
                  </span>
                  {isCurrentFlagged && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                      <FlagIcon className="w-3 h-3" />
                      معلّم للمراجعة
                    </span>
                  )}
                </div>

                {/* Flag Button */}
                <button
                  onClick={handleToggleFlag}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200
                    ${
                      isCurrentFlagged
                        ? "bg-amber-500 text-white hover:bg-amber-600"
                        : "bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-amber-600"
                    }
                  `}
                  title={isCurrentFlagged ? "إزالة العلامة" : "تعليم للمراجعة"}
                >
                  <FlagIcon className="w-5 h-5" />
                  <span className="text-sm font-medium hidden sm:inline">
                    {isCurrentFlagged ? "إزالة العلامة" : "علّم للمراجعة"}
                  </span>
                </button>
              </div>

              {currentBlock?.type === "paragraph" && currentBlock.passage && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 max-h-[300px] overflow-y-auto">
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: currentBlock.passage.replace(/&nbsp;/gi, " "),
                    }}
                  />
                </div>
              )}

              {renderQuestion()}
            </>
          ) : sections.length > 0 ? (
            <VerbalSection
              sectionTitle={currentSection?.title || sections[0]?.title}
              sectionDescription={
                currentSection?.description || sections[0]?.description
              }
            />
          ) : (
            <VerbalSection />
          )}
        </div>

        {isStarted && (
          <div className="w-full lg:w-auto lg:min-w-[300px] xl:min-w-[350px]">
            <ExamQuesionsSummery
              totalQuestions={questions.length}
              currentIndex={currentIndex}
              answeredMap={answeredMapByIndex}
              flaggedMap={flaggedMapByIndex}
              onJumpTo={handleJumpTo}
            />
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col-reverse sm:flex-row mt-6 sm:mt-8 lg:mt-[64px] justify-between items-stretch sm:items-center gap-3 sm:gap-4">
        {isStarted ? (
          <>
            <button
              onClick={handlePrev}
              disabled={isFirstQuestion}
              className={`cursor-pointer px-8 sm:px-12 lg:px-20 py-4 sm:py-5 bg-white hover:bg-primary group transition rounded-[15px] sm:rounded-[20px] outline outline-[3px] outline-offset-[-3px] outline-primary flex justify-center items-center gap-2.5 ${
                isFirstQuestion
                  ? "opacity-50 cursor-not-allowed hover:bg-white"
                  : ""
              }`}
            >
              <span
                className={`text-center text-primary transition text-sm sm:text-base font-bold ${
                  isFirstQuestion ? "" : "group-hover:text-white"
                }`}
              >
                السابق
              </span>
            </button>

            <button
              onClick={isLastQuestion ? handleFinishClick : handleNext}
              disabled={submitting}
              className={`px-8 sm:px-12 lg:px-20 py-4 sm:py-5 bg-gradient-to-r from-primary to-secondary hover:scale-105 transition cursor-pointer rounded-[15px] sm:rounded-[20px] flex justify-center items-center gap-2.5 ${
                submitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <span className="text-center text-white text-sm sm:text-base font-bold">
                {submitting
                  ? "جاري الإرسال..."
                  : isLastQuestion
                    ? "إنهاء"
                    : "التالي"}
              </span>
            </button>
          </>
        ) : (
          <button
            onClick={handleStart}
            className="px-8 ms-auto sm:px-12 lg:px-20 py-4 sm:py-5 bg-gradient-to-r from-primary to-secondary hover:scale-105 transition cursor-pointer rounded-[15px] sm:rounded-[20px] flex justify-center items-center gap-2.5"
          >
            <span className="text-center text-white text-sm sm:text-base font-bold">
              ابدأ
            </span>
          </button>
        )}
      </div>

      {/* Confirm Submit Modal */}
      <ConfirmSubmitModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleSubmit}
        stats={examStats}
        submitting={submitting}
      />
    </div>
  );
};

export default ExamContent;

// Flag Icon Component
const FlagIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M3 2.25a.75.75 0 01.75.75v.54l1.838-.46a9.75 9.75 0 016.725.738l.108.054a8.25 8.25 0 005.58.652l3.109-.732a.75.75 0 01.917.81 47.784 47.784 0 00.005 10.337.75.75 0 01-.574.812l-3.114.733a9.75 9.75 0 01-6.594-.77l-.108-.054a8.25 8.25 0 00-5.69-.625l-2.202.55V21a.75.75 0 01-1.5 0V3A.75.75 0 013 2.25z"
      clipRule="evenodd"
    />
  </svg>
);

const VerbalSection = ({ sectionTitle, sectionDescription }) => {
  return (
    <div className="flex-1 flex flex-col justify-start items-start gap-6 sm:gap-8">
      <div className="w-full flex justify-start items-center gap-4 sm:gap-6">
        <h2
          className="text-right text-text text-xl sm:text-2xl lg:text-3xl font-bold font-['Cairo']"
          dangerouslySetInnerHTML={{
            __html: sectionTitle?.replace(/&nbsp;/gi, " ") || "القسم اللفظي",
          }}
        />
      </div>

      <div className="w-full prose prose-neutral flex-1 text-right text-sup-title text-base sm:text-lg lg:text-xl font-normal font-['Cairo'] leading-relaxed sm:leading-loose lg:leading-10 space-y-4">
        {sectionDescription && (
          <div
            dangerouslySetInnerHTML={{
              __html: sectionDescription.replace(/&nbsp;/gi, " "),
            }}
          />
        )}
      </div>
    </div>
  );
};
