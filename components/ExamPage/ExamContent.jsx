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
  startCurrentSection,
  moveToNextSection,
  selectQuestions,
  selectSections,
  selectCurrentSection,
  selectCurrentBlock,
  selectCurrentQuestion,
  selectAnsweredMap,
  selectFlaggedMap,
  selectIsStarted,
  selectShowSectionIntro,
  selectCurrentSectionStarted,
  selectIsLastQuestionInSection,
  selectIsFirstQuestionInSection,
  selectIsLastSection,
  selectCurrentSectionStats,
  selectCurrentSectionQuestions,
  selectCurrentIndexInSection,
  selectCurrentSectionIndex,
} from "../../components/utils/Store/Slices/examSlice";
import { ExamQuesionsSummery } from "./examQuesionsSummery";
import { McqQuestion } from "./McqQuestion";
import { TrueFalseQuestion } from "./TrueFalseQuestion";
import { TextQuestion } from "./TextQuestion";
import { ConfirmSubmitModal } from "./ConfirmSubmitModal";
import { SectionCompleteModal } from "./SectionCompleteModal";

const ExamContent = ({ onSubmitExam, submitting }) => {
  const dispatch = useDispatch();

  const questions = useSelector(selectQuestions);
  const sections = useSelector(selectSections);
  const currentSection = useSelector(selectCurrentSection);
  const currentSectionIndex = useSelector(selectCurrentSectionIndex);
  const currentBlock = useSelector(selectCurrentBlock);
  const currentQuestion = useSelector(selectCurrentQuestion);
  const answeredMap = useSelector(selectAnsweredMap);
  const flaggedMap = useSelector(selectFlaggedMap);
  const isStarted = useSelector(selectIsStarted);

  const showSectionIntro = useSelector(selectShowSectionIntro);
  const currentSectionStarted = useSelector(selectCurrentSectionStarted);
  const isLastQuestionInSection = useSelector(selectIsLastQuestionInSection);
  const isFirstQuestionInSection = useSelector(selectIsFirstQuestionInSection);
  const isLastSection = useSelector(selectIsLastSection);
  const sectionStats = useSelector(selectCurrentSectionStats);
  const sectionQuestions = useSelector(selectCurrentSectionQuestions);
  const currentIndexInSection = useSelector(selectCurrentIndexInSection);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSectionCompleteModal, setShowSectionCompleteModal] =
    useState(false);

  const currentAnswer = currentQuestion
    ? (answeredMap[currentQuestion.id] ?? null)
    : null;
  const isCurrentFlagged = currentQuestion
    ? (flaggedMap[currentQuestion.id] ?? false)
    : false;

  const answeredMapByIndex = useMemo(() => {
    const map = {};
    sectionQuestions.forEach((q, index) => {
      if (answeredMap[q.id] !== undefined) map[index] = answeredMap[q.id];
    });
    return map;
  }, [sectionQuestions, answeredMap]);

  const flaggedMapByIndex = useMemo(() => {
    const map = {};
    sectionQuestions.forEach((q, index) => {
      if (flaggedMap[q.id]) map[index] = true;
    });
    return map;
  }, [sectionQuestions, flaggedMap]);

  const examStats = useMemo(() => {
    const total = questions.length;
    const answered = Object.keys(answeredMap).length;
    const unanswered = total - answered;
    const flagged = Object.values(flaggedMap).filter(Boolean).length;
    return { total, answered, unanswered, flagged };
  }, [questions, answeredMap, flaggedMap]);

  const handleSelectOption = (questionId, answer) => {
    dispatch(setAnswer({ questionId, answer }));
  };

  const handleToggleFlag = () => {
    if (currentQuestion) {
      dispatch(toggleFlag(currentQuestion.id));
    }
  };

  const handleJumpTo = (targetIndexInSection) => {
    const targetQuestion = sectionQuestions[targetIndexInSection];
    if (targetQuestion) {
      const globalIndex = questions.findIndex(
        (q) => q.id === targetQuestion.id
      );
      dispatch(setCurrentIndex(globalIndex));
    }
  };

  const handlePrev = () => dispatch(prevQuestion());

  const handleNext = () => {
    if (isLastQuestionInSection) {
      setShowSectionCompleteModal(true);
    } else {
      dispatch(nextQuestion());
    }
  };

  const handleStart = () => dispatch(startExam());
  const handleStartSection = () => dispatch(startCurrentSection());

  const handleConfirmNextSection = () => {
    setShowSectionCompleteModal(false);
    if (isLastSection) {
      handleSubmit();
    } else {
      dispatch(moveToNextSection());
    }
  };

  const handleSubmit = () => {
    if (!onSubmitExam) return;
    setShowConfirmModal(false);
    setShowSectionCompleteModal(false);
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

  const nextSection = sections[currentSectionIndex + 1] || null;
  const showingIntro =
    !isStarted || (isStarted && showSectionIntro && !currentSectionStarted);

  return (
    <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12">
      {/* Section Progress Bar */}
      {isStarted && sections.length > 1 && (
        <div className="flex items-center gap-2 mb-4">
          {sections.map((section, idx) => (
            <React.Fragment key={section.id}>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all ${
                  idx < currentSectionIndex
                    ? "bg-green-500 text-white"
                    : idx === currentSectionIndex
                      ? "bg-primary text-white ring-4 ring-primary/20"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {idx < currentSectionIndex ? (
                  <CheckIcon className="w-4 h-4" />
                ) : (
                  idx + 1
                )}
              </div>
              {idx < sections.length - 1 && (
                <div
                  className={`flex-1 h-1 rounded ${
                    idx < currentSectionIndex ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      <div className="flex flex-col lg:flex-row items-start gap-6 sm:gap-8 lg:gap-12 xl:gap-[58px]">
        <div className="w-full lg:flex-1">
          {showingIntro ? (
            <VerbalSection
              sectionTitle={currentSection?.title || sections[0]?.title}
              sectionDescription={
                currentSection?.description || sections[0]?.description
              }
              sectionNumber={currentSectionIndex + 1}
              totalSections={sections.length}
              questionCount={
                currentSection?.questionCount || sections[0]?.questionCount || 0
              }
            />
          ) : currentQuestion ? (
            <>
              {/* Question Header with Flag */}
              <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="text-sm text-text-alt">
                    السؤال {currentIndexInSection + 1} من{" "}
                    {sectionQuestions.length}
                  </span>
                  {sections.length > 1 && (
                    <span className="text-xs text-gray-400">
                      (القسم {currentSectionIndex + 1})
                    </span>
                  )}
                  {isCurrentFlagged && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                      <FlagIcon className="w-3 h-3" />
                      <span className="hidden sm:inline">معلّم للمراجعة</span>
                      <span className="sm:hidden">معلّم</span>
                    </span>
                  )}
                </div>

                {/* Flag Button */}
                <button
                  onClick={handleToggleFlag}
                  className={`
                    flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all duration-200
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
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 max-h-[200px] sm:max-h-[300px] overflow-y-auto">
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
          ) : null}
        </div>

        {isStarted && !showingIntro && (
          <div className="w-full lg:w-auto lg:min-w-[300px] xl:min-w-[350px]">
            <ExamQuesionsSummery
              totalQuestions={sectionQuestions.length}
              currentIndex={currentIndexInSection}
              answeredMap={answeredMapByIndex}
              flaggedMap={flaggedMapByIndex}
              onJumpTo={handleJumpTo}
              sectionTitle={sections.length > 1 ? currentSection?.title : null}
            />
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col-reverse sm:flex-row mt-6 sm:mt-8 lg:mt-[64px] justify-between items-stretch sm:items-center gap-3 sm:gap-4">
        {showingIntro ? (
          <button
            onClick={isStarted ? handleStartSection : handleStart}
            className="px-8 ms-auto sm:px-12 lg:px-20 py-4 sm:py-5 bg-gradient-to-r from-primary to-secondary hover:scale-105 transition cursor-pointer rounded-[15px] sm:rounded-[20px] flex justify-center items-center gap-2.5"
          >
            <span className="text-center text-white text-sm sm:text-base font-bold">
              {!isStarted ? "ابدأ الاختبار" : "ابدأ القسم"}
            </span>
          </button>
        ) : (
          <>
            <button
              onClick={handlePrev}
              disabled={isFirstQuestionInSection}
              className={`cursor-pointer px-8 sm:px-12 lg:px-20 py-4 sm:py-5 bg-white hover:bg-primary group transition rounded-[15px] sm:rounded-[20px] outline outline-[3px] outline-offset-[-3px] outline-primary flex justify-center items-center gap-2.5 ${
                isFirstQuestionInSection
                  ? "opacity-50 cursor-not-allowed hover:bg-white"
                  : ""
              }`}
            >
              <span
                className={`text-center text-primary transition text-sm sm:text-base font-bold ${
                  isFirstQuestionInSection ? "" : "group-hover:text-white"
                }`}
              >
                السابق
              </span>
            </button>

            <button
              onClick={handleNext}
              disabled={submitting}
              className={`px-8 sm:px-12 lg:px-20 py-4 sm:py-5 bg-gradient-to-r from-primary to-secondary hover:scale-105 transition cursor-pointer rounded-[15px] sm:rounded-[20px] flex justify-center items-center gap-2.5 ${
                submitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <span className="text-center text-white text-sm sm:text-base font-bold">
                {submitting
                  ? "جاري الإرسال..."
                  : isLastQuestionInSection
                    ? isLastSection
                      ? "إنهاء الاختبار"
                      : "إتمام القسم"
                    : "التالي"}
              </span>
            </button>
          </>
        )}
      </div>

      <SectionCompleteModal
        isOpen={showSectionCompleteModal}
        onClose={() => setShowSectionCompleteModal(false)}
        onConfirm={handleConfirmNextSection}
        sectionStats={sectionStats}
        currentSectionTitle={currentSection?.title}
        nextSectionTitle={nextSection?.title}
        isLastSection={isLastSection}
      />

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

// VerbalSection Component - التصميم الأصلي
const VerbalSection = ({
  sectionTitle,
  sectionDescription,
  sectionNumber,
  totalSections,
  questionCount,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-start items-start gap-6 sm:gap-8">
      {totalSections > 1 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            القسم {sectionNumber} من {totalSections}
          </span>
          {questionCount > 0 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
              {questionCount} سؤال
            </span>
          )}
        </div>
      )}

      <div className="w-full flex justify-start items-center gap-4 sm:gap-6">
        <h2
          className="text-right text-text text-xl sm:text-2xl lg:text-3xl font-bold font-['Cairo']"
          dangerouslySetInnerHTML={{
            __html: sectionTitle?.replace(/&nbsp;/gi, " ") || "القسم",
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

const CheckIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
      clipRule="evenodd"
    />
  </svg>
);
