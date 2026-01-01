"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setExamData,
  setCurrentIndex,
  setCurrentSectionIndex,
  setCurrentBlockIndex,
  nextQuestion,
  prevQuestion,
  setAnswer,
  startExam,
  submitExam,
  selectQuestions,
  selectSections,
  selectCurrentSection,
  selectCurrentBlock,
  selectCurrentSectionIndex,
  selectCurrentBlockIndex,
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

const ExamContent = ({ examData, sections, currentSection, currentBlock, currentSectionIndex, currentBlockIndex, onSubmitExam, submitting }) => {
  const dispatch = useDispatch();

  // Redux selectors
  const questions = useSelector(selectQuestions);
  const sectionsFromState = useSelector(selectSections);
  const currentSectionFromState = useSelector(selectCurrentSection);
  const currentBlockFromState = useSelector(selectCurrentBlock);
  const currentSectionIndexFromState = useSelector(selectCurrentSectionIndex);
  const currentBlockIndexFromState = useSelector(selectCurrentBlockIndex);
  const currentIndex = useSelector(selectCurrentIndex);
  const currentQuestion = useSelector(selectCurrentQuestion);
  const answeredMap = useSelector(selectAnsweredMap);
  const flaggedMap = useSelector(selectFlaggedMap);
  const isStarted = useSelector(selectIsStarted);

  // Use props if provided, otherwise use state
  const activeSections = sections || sectionsFromState;
  const activeCurrentSection = currentSection || currentSectionFromState;
  const activeCurrentBlock = currentBlock || currentBlockFromState;
  const activeSectionIndex = currentSectionIndex !== undefined ? currentSectionIndex : currentSectionIndexFromState;
  const activeBlockIndex = currentBlockIndex !== undefined ? currentBlockIndex : currentBlockIndexFromState;

  // Initialize exam data when it changes
  useEffect(() => {
    if (examData) {
      dispatch(setExamData(examData));
    }
  }, [examData, dispatch]);

  // Get current question from block or legacy
  const activeQuestion = activeCurrentBlock?.questions?.[0] || currentQuestion;
  
  // Get answer for current question
  const currentAnswer = activeQuestion
    ? answeredMap[activeQuestion.id] ?? null
    : null;

  // Create answeredMap by index for summary component
  const answeredMapByIndex = {};
  questions.forEach((q, index) => {
    if (answeredMap[q.id] !== undefined) {
      answeredMapByIndex[index] = answeredMap[q.id];
    }
  });

  // Check if last question in current block/section
  const isLastBlockInSection = activeCurrentSection 
    ? activeBlockIndex >= (activeCurrentSection.blocks.length - 1)
    : false;
  const isLastSection = activeSections
    ? activeSectionIndex >= (activeSections.length - 1)
    : false;
  const isLastQuestion = questions.length > 0 && currentIndex === questions.length - 1;

  // Handlers
  const handleSelectOption = (questionId, answer) => {
    dispatch(setAnswer({ questionId, answer }));
  };

  const handlePrev = () => {
    // If using sections, navigate by block/section
    if (activeSections && activeSections.length > 0) {
      if (activeBlockIndex > 0) {
        dispatch(setCurrentBlockIndex(activeBlockIndex - 1));
      } else if (activeSectionIndex > 0) {
        // Go to previous section's last block
        const prevSection = activeSections[activeSectionIndex - 1];
        if (prevSection && prevSection.blocks.length > 0) {
          dispatch(setCurrentSectionIndex(activeSectionIndex - 1));
          dispatch(setCurrentBlockIndex(prevSection.blocks.length - 1));
        }
      }
    } else {
      // Legacy navigation
      dispatch(prevQuestion());
    }
  };

  const handleNext = () => {
    // If using sections, navigate by block/section
    if (activeSections && activeSections.length > 0) {
      const currentSection = activeSections[activeSectionIndex];
      if (activeBlockIndex < currentSection.blocks.length - 1) {
        dispatch(setCurrentBlockIndex(activeBlockIndex + 1));
      } else if (!isLastSection) {
        // Move to next section
        dispatch(setCurrentSectionIndex(activeSectionIndex + 1));
        dispatch(setCurrentBlockIndex(0));
      }
    } else {
      // Legacy navigation
      dispatch(nextQuestion());
    }
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
          {isStarted && activeQuestion ? (
            <>
              {/* Section Title */}
              {activeCurrentSection && (
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-text mb-2" dangerouslySetInnerHTML={{ __html: activeCurrentSection.title?.replaceAll(/&nbsp;/ig, " ") }} />
                </div>
              )}
              
              {/* Question Counter */}
              <div className="mb-4 text-sm text-text-alt">
                السؤال {currentIndex + 1} من {questions.length}
              </div>

              {/* Passage for paragraph questions */}
              {activeCurrentBlock?.type === "paragraph" && activeCurrentBlock.passage && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div dangerouslySetInnerHTML={{ __html: activeCurrentBlock.passage.replaceAll(/&nbsp;/ig, " ") }} />
                </div>
              )}

              {(activeQuestion.type === "mcq" || activeQuestion.type === "paragraph") && (
                <McqQuestion
                  questionText={activeQuestion.text}
                  questionHtml={activeQuestion.textHtml}
                  imageUrl={activeQuestion.imageUrl}
                  options={activeQuestion.options?.map(opt => ({
                    id: opt.id,
                    label: opt.text || opt.label,
                    labelHtml: opt.textHtml,
                    isCorrect: opt.isCorrect
                  })) || []}
                  selectedOptionId={currentAnswer}
                  onSelectOption={(optionId) =>
                    handleSelectOption(activeQuestion.id, optionId)
                  }
                />
              )}

              {activeQuestion.type === "boolean" && (
                <TrueFalseQuestion
                  questionText={activeQuestion.text}
                  questionHtml={activeQuestion.textHtml}
                  imageUrl={activeQuestion.imageUrl}
                  value={currentAnswer}
                  onChange={(val) =>
                    handleSelectOption(activeQuestion.id, val)
                  }
                />
              )}

              {(activeQuestion.type === "text") && (
                <TextQuestion
                  questionText={activeQuestion.text}
                  questionHtml={activeQuestion.textHtml}
                  imageUrl={activeQuestion.imageUrl}
                  value={currentAnswer || ""}
                  onChange={(val) =>
                    handleSelectOption(activeQuestion.id, val)
                  }
                />
              )}
            </>
          ) : !isStarted && activeCurrentSection ? (
            <VerbalSection 
              sectionTitle={activeCurrentSection.title}
              sectionDescription={activeCurrentSection.description}
            />
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
                opacity: (activeSectionIndex === 0 && activeBlockIndex === 0) || currentIndex === 0 ? "0.5" : "1",
                pointerEvents: (activeSectionIndex === 0 && activeBlockIndex === 0) || currentIndex === 0 ? "none" : "auto",
              }}
              disabled={(activeSectionIndex === 0 && activeBlockIndex === 0) || currentIndex === 0}
            >
              <span className="text-center text-primary group-hover:text-white transition text-sm sm:text-base font-bold">
                السابق
              </span>
            </button>

            <button
              onClick={(isLastSection && isLastBlockInSection) || isLastQuestion ? handleSubmit : handleNext}
              className="px-8 sm:px-12 lg:px-20 py-4 sm:py-5 bg-gradient-to-r from-primary to-secondary hover:scale-105 transition cursor-pointer rounded-[15px] sm:rounded-[20px] flex justify-center items-center gap-2.5"
              disabled={submitting}
            >
              <span className="text-center text-white text-sm sm:text-base font-bold">
                {(isLastSection && isLastBlockInSection) || isLastQuestion ? "إنهاء" : "التالي"}
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

const VerbalSection = ({ sectionTitle, sectionDescription }) => {
  return (
    <div className="flex-1 flex flex-col justify-start items-start gap-6 sm:gap-8">
      <div className="w-full flex justify-start items-center gap-4 sm:gap-6">
        <h2 
          className="text-right text-text text-xl sm:text-2xl lg:text-3xl font-bold font-['Cairo']"
          dangerouslySetInnerHTML={{ __html: sectionTitle?.replaceAll(/&nbsp;/ig, " ") || "القسم اللفظي" }}
        />
      </div>
      <div className="w-full flex-1 text-right text-sup-title text-base sm:text-lg lg:text-xl font-normal font-['Cairo'] leading-relaxed sm:leading-loose lg:leading-10 space-y-4">
        {sectionDescription ? (
          <div dangerouslySetInnerHTML={{ __html: sectionDescription.replaceAll(/&nbsp;/ig, " ") }} />
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};
