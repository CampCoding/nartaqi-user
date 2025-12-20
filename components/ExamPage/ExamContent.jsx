"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setExamData,
  setCurrentIndex,
  nextQuestion,
  prevQuestion,
  setAnswer,
  startExam,
  submitExam,
  selectQuestions,
  selectCurrentIndex,
  selectCurrentQuestion,
  selectAnsweredMap,
  selectFlaggedMap,
  selectIsStarted,
} from "../../components/utils/Store/Slices/examSlice";
import { ExamQuesionsSummery } from "./examQuesionsSummery";
import { McqQuestion } from "./McqQuestion";
import { TrueFalseQuestion } from "./TrueFalseQuestion";
import { TextQuestion } from "./TextQuestion";

const ExamContent = ({ examData, onSubmitExam }) => {
  const dispatch = useDispatch();

  // Redux selectors
  const questions = useSelector(selectQuestions);
  const currentIndex = useSelector(selectCurrentIndex);
  const currentQuestion = useSelector(selectCurrentQuestion);
  const answeredMap = useSelector(selectAnsweredMap);
  const flaggedMap = useSelector(selectFlaggedMap);
  const isStarted = useSelector(selectIsStarted);

  // Initialize exam data when it changes
  useEffect(() => {
    if (examData) {
      dispatch(setExamData(examData));
    }
  }, [examData, dispatch]);

  // Get answer for current question
  const currentAnswer = currentQuestion
    ? answeredMap[currentQuestion.id] ?? null
    : null;

  // Create answeredMap by index for summary component
  const answeredMapByIndex = {};
  questions.forEach((q, index) => {
    if (answeredMap[q.id] !== undefined) {
      answeredMapByIndex[index] = answeredMap[q.id];
    }
  });

  const isLastQuestion =
    questions.length > 0 && currentIndex === questions.length - 1;

  // Handlers
  const handleSelectOption = (questionId, answer) => {
    dispatch(setAnswer({ questionId, answer }));
  };

  const handlePrev = () => {
    dispatch(prevQuestion());
  };

  const handleNext = () => {
    dispatch(nextQuestion());
  };

  const handleJumpTo = (index) => {
    dispatch(setCurrentIndex(index));
  };

  const handleStart = () => {
    dispatch(startExam());
  };

  const handleSubmit = () => {
    // Call parent submit handler
    if (onSubmitExam) {
      onSubmitExam();
    }
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12">
      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row items-start gap-6 sm:gap-8 lg:gap-12 xl:gap-[58px]">
        {/* Question Section */}
        <div className="w-full lg:flex-1">
          {isStarted && currentQuestion ? (
            <>
              {/* Question Counter */}
              <div className="mb-4 text-sm text-text-alt">
                السؤال {currentIndex + 1} من {questions.length}
              </div>

              {currentQuestion.type === "mcq" && (
                <McqQuestion
                  questionText={currentQuestion.text}
                  questionHtml={currentQuestion.textHtml}
                  imageUrl={currentQuestion.imageUrl}
                  options={currentQuestion.options}
                  selectedOptionId={currentAnswer}
                  onSelectOption={(optionId) =>
                    handleSelectOption(currentQuestion.id, optionId)
                  }
                />
              )}

              {currentQuestion.type === "boolean" && (
                <TrueFalseQuestion
                  questionText={currentQuestion.text}
                  questionHtml={currentQuestion.textHtml}
                  imageUrl={currentQuestion.imageUrl}
                  value={currentAnswer}
                  onChange={(val) =>
                    handleSelectOption(currentQuestion.id, val)
                  }
                />
              )}

              {(currentQuestion.type === "text" ||
                currentQuestion.type === "paragraph") && (
                <TextQuestion
                  questionText={currentQuestion.text}
                  questionHtml={currentQuestion.textHtml}
                  imageUrl={currentQuestion.imageUrl}
                  value={currentAnswer || ""}
                  onChange={(val) =>
                    handleSelectOption(currentQuestion.id, val)
                  }
                />
              )}
            </>
          ) : (
            <VerbalSection />
          )}
        </div>

        {/* Summary Sidebar */}
        {isStarted && (
          <div className="w-full lg:w-auto lg:min-w-[300px] xl:min-w-[350px]">
            <ExamQuesionsSummery
              totalQuestions={questions.length}
              currentIndex={currentIndex}
              answeredMap={answeredMapByIndex}
              flaggedMap={flaggedMap}
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
              className="cursor-pointer px-8 sm:px-12 lg:px-20 py-4 sm:py-5 bg-white hover:bg-primary group transition rounded-[15px] sm:rounded-[20px] outline outline-[3px] outline-offset-[-3px] outline-primary flex justify-center items-center gap-2.5"
              style={{
                opacity: currentIndex === 0 ? "0.5" : "1",
                pointerEvents: currentIndex === 0 ? "none" : "auto",
              }}
              disabled={currentIndex === 0}
            >
              <span className="text-center text-primary group-hover:text-white transition text-sm sm:text-base font-bold">
                السابق
              </span>
            </button>

            <button
              onClick={isLastQuestion ? handleSubmit : handleNext}
              className="px-8 sm:px-12 lg:px-20 py-4 sm:py-5 bg-gradient-to-r from-primary to-secondary hover:scale-105 transition cursor-pointer rounded-[15px] sm:rounded-[20px] flex justify-center items-center gap-2.5"
            >
              <span className="text-center text-white text-sm sm:text-base font-bold">
                {isLastQuestion ? "إنهاء" : "التالي"}
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
    </div>
  );
};

export default ExamContent;

const VerbalSection = () => {
  return (
    <div className="flex-1 flex flex-col justify-start items-start gap-6 sm:gap-8">
      <div className="w-full flex justify-start items-center gap-4 sm:gap-6">
        <h2 className="text-right text-text text-xl sm:text-2xl lg:text-3xl font-bold font-['Cairo']">
          القسم اللفظي
        </h2>
      </div>
      <div className="w-full flex-1 text-right text-sup-title text-base sm:text-lg lg:text-xl font-normal font-['Cairo'] leading-relaxed sm:leading-loose lg:leading-10 space-y-4">
        <p>القسم اللفظي</p>
        <p>
          يتكون القسم اللفظي من مجموعة من الأسئلة التي تقيس قدرة الطالب على فهم
          المقروء، واستنتاج المعاني، وتحليل النصوص. يتم عرض فقرة نصية قصيرة أو
          جمل متتابعة، يليها عدد من الأسئلة متعددة الخيارات، بحيث يختار الطالب
          الإجابة الصحيحة من بين الخيارات المتاحة.
        </p>
        <p className="font-semibold mt-4">تشمل أنواع الأسئلة ما يلي:</p>
        <p>
          <span className="font-semibold">أسئلة الفهم والاستيعاب:</span> تهدف
          إلى قياس قدرة الطالب على فهم الفكرة الرئيسة والتفاصيل المهمة في النص.
        </p>
        <p>
          <span className="font-semibold">أسئلة المعاني والمفردات:</span> تطلب
          من الطالب تحديد معنى كلمة أو جملة في سياقها الصحيح.
        </p>
      </div>
    </div>
  );
};
