"use client";

import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentIndex,
  nextQuestion,
  prevQuestion,
  setAnswer,
  startExam,
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

const ExamContent = ({ onSubmitExam, submitting }) => {
  const dispatch = useDispatch();

  const questions = useSelector(selectQuestions);
  const sections = useSelector(selectSections);
  const currentSection = useSelector(selectCurrentSection);
  const currentBlock = useSelector(selectCurrentBlock);
  const currentQuestionInBlockIndex = useSelector(selectCurrentQuestionInBlockIndex);
  const currentIndex = useSelector(selectCurrentIndex);
  const currentQuestion = useSelector(selectCurrentQuestion);
  const answeredMap = useSelector(selectAnsweredMap);
  const flaggedMap = useSelector(selectFlaggedMap);
  const isStarted = useSelector(selectIsStarted);
  const isFirstQuestion = useSelector(selectIsFirstQuestion);
  const isLastQuestion = useSelector(selectIsLastQuestion);

  const currentAnswer = currentQuestion ? answeredMap[currentQuestion.id] ?? null : null;

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

  const handleSelectOption = (questionId, answer) => {
    dispatch(setAnswer({ questionId, answer }));
  };

  const handleJumpTo = (targetIndex) => dispatch(setCurrentIndex(targetIndex));
  const handlePrev = () => dispatch(prevQuestion());
  const handleNext = () => dispatch(nextQuestion());
  const handleStart = () => dispatch(startExam());

  const handleSubmit = () => {
    if (!onSubmitExam) return;
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
            onSelectOption={(optionId) => handleSelectOption(currentQuestion.id, optionId)}
          />
        );

      case "boolean":
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
            onSelectOption={(optionId) => handleSelectOption(currentQuestion.id, optionId)}
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
              {/* {currentSection && (
                <div className="mb-4">
                  <h3
                    className="text-lg font-bold text-text mb-2"
                    dangerouslySetInnerHTML={{
                      __html: currentSection.title?.replace(/&nbsp;/gi, " ") || "",
                    }}
                  />
                </div>
              )} */}

              {/* <div className="mb-4 text-sm text-text-alt">
                السؤال {currentIndex + 1} من {questions.length}
              </div> */}

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

              {/* {currentQuestion.instructions && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg text-blue-800 text-sm">
                  {currentQuestion.instructions}
                </div>
              )} */}

              {/* {currentBlock?.type === "paragraph" &&
                currentBlock.questions.length > 1 && (
                  <div className="mb-4 text-xs text-gray-500">
                    سؤال {currentQuestionInBlockIndex + 1} من {currentBlock.questions.length} في هذه الفقرة
                  </div>
                )} */}

              {renderQuestion()}
            </>
          ) : sections.length > 0 ? (
            <VerbalSection
              sectionTitle={currentSection?.title || sections[0]?.title}
              sectionDescription={currentSection?.description || sections[0]?.description}
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

      <div className="flex flex-col-reverse sm:flex-row mt-6 sm:mt-8 lg:mt-[64px] justify-between items-stretch sm:items-center gap-3 sm:gap-4">
        {isStarted ? (
          <>
            <button
              onClick={handlePrev}
              disabled={isFirstQuestion}
              className={`cursor-pointer px-8 sm:px-12 lg:px-20 py-4 sm:py-5 bg-white hover:bg-primary group transition rounded-[15px] sm:rounded-[20px] outline outline-[3px] outline-offset-[-3px] outline-primary flex justify-center items-center gap-2.5 ${
                isFirstQuestion ? "opacity-50 cursor-not-allowed hover:bg-white" : ""
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
              onClick={isLastQuestion ? handleSubmit : handleNext}
              disabled={submitting}
              className={`px-8 sm:px-12 lg:px-20 py-4 sm:py-5 bg-gradient-to-r from-primary to-secondary hover:scale-105 transition cursor-pointer rounded-[15px] sm:rounded-[20px] flex justify-center items-center gap-2.5 ${
                submitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <span className="text-center text-white text-sm sm:text-base font-bold">
                {submitting ? "جاري الإرسال..." : isLastQuestion ? "إنهاء" : "التالي"}
              </span>
            </button>
          </>
        ) : (
          <button
            onClick={handleStart}
            className="px-8 ms-auto sm:px-12 lg:px-20 py-4 sm:py-5 bg-gradient-to-r from-primary to-secondary hover:scale-105 transition cursor-pointer rounded-[15px] sm:rounded-[20px] flex justify-center items-center gap-2.5"
          >
            <span className="text-center text-white text-sm sm:text-base font-bold">ابدأ</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ExamContent;

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
        {sectionDescription ? (
          <div
            dangerouslySetInnerHTML={{
              __html: sectionDescription.replace(/&nbsp;/gi, " "),
            }}
          />
        ) : (
          <>
            <p>القسم اللفظي</p>
            <p>
              يتكون القسم اللفظي من مجموعة من الأسئلة التي تقيس قدرة الطالب على فهم
              المقروء، واستنتاج المعاني، وتحليل النصوص.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
