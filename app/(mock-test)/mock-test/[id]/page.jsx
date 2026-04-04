"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MockExamHeader } from "../../../../components/MockTestPage/MockTestHeader";
import { MockTestFooter } from "../../../../components/MockTestPage/MockTestFooter";
import VerbalSection from "../../../../components/MockTestPage/VerbalSection";
import MockExamQuestion from "../../../../components/MockTestPage/MockExamQuestion";
import MockTestReview from "../../../../components/MockTestPage/MockTestReview";
import { ConfirmationPopup } from "../../../../components/ui/ConfirmationPopup";
import { SuccessPopup } from "../../../../components/ui/SuccessPopup";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import {
  initializeExam,
  startExam,
  decrementTime,
  setCurrentSectionIndex,
  setCurrentBlockIndex,
  setAnswer,
  toggleBlockFlag,
  submitExam,
  restoreState,
  resetExam,
  selectSections,
  selectCurrentSection,
  selectCurrentBlock,
  selectCurrentSectionIndex,
  selectCurrentBlockIndex,
  selectTimeRemaining,
  selectAnsweredMap,
  selectFlaggedMap,
  selectIsStarted,
  selectIsSubmitted,
  selectIsSolved,
  selectTotalQuestions,
  selectProgressText,
  selectExamInfo,
  selectIsCurrentBlockMarked,
  selectIsLastBlockInSection,
  selectIsLastSection,
  selectCanGoToPreviousSection,
  selectFormattedAnswersForAPI,
  selectStateForSave,
  selectScore,
  selectPercentage,
  selectExamId,
  selectStudentId,
  selectSectionProgressText,
} from "../../../../components/utils/Store/Slices/mockExamSlice";
import toast from "react-hot-toast";

/* =========================
   UI: No Access Screen
========================= */
const NoAccessScreen = ({ onBack, onHome }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary px-4">
      <div className="bg-white rounded-[30px] p-8 md:p-12 max-w-md w-full shadow-2xl text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-amber-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v3m0 4h.01M10.29 3.86l-7.1 12.29A2 2 0 005.92 19h12.16a2 2 0 001.73-2.85l-7.1-12.29a2 2 0 00-3.42 0z"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-text mb-3">
          لا تملك صلاحية الوصول
        </h2>
        <p className="text-text-alt leading-relaxed mb-8">
          لا يمكنك فتح هذا الاختبار حاليًا.
          <br />
          قد يكون السبب أنك غير مشترك في الدورة أو ليس لديك تصريح للوصول
          للاختبار.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={onBack}
            className="w-full py-4 bg-primary text-white rounded-xl font-medium text-lg hover:opacity-90 transition-opacity"
          >
            الرجوع
          </button>
          <button
            onClick={onHome}
            className="w-full py-4 bg-gray-100 text-text rounded-xl font-medium text-lg hover:bg-gray-200 transition-colors"
          >
            الصفحة الرئيسية
          </button>
        </div>
      </div>
    </div>
  );
};

// Already Solved Popup
const AlreadySolvedPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-[30px] p-8 md:p-12 max-w-md w-[90%] mx-auto shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-text mb-4">
          تم حل هذا الاختبار مسبقاً
        </h2>
        <p className="text-center text-text-alt mb-8 leading-relaxed">
          لقد قمت بحل هذا الاختبار من قبل ولا يمكنك إعادة حله مرة أخرى.
          <br />
          يمكنك مراجعة نتائجك من صفحة الدورة.
        </p>
        <button
          onClick={onClose}
          className="w-full py-4 bg-primary text-white rounded-xl font-medium text-lg hover:opacity-90 transition-opacity"
        >
          العودة للصفحة السابقة
        </button>
      </div>
    </div>
  );
};

const MockTest = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();
  const user = useSelector((state) => state?.auth);

  // Redux selectors
  const sections = useSelector(selectSections);
  const currentSection = useSelector(selectCurrentSection);
  const sectionProgressText = useSelector(selectSectionProgressText);
  const currentBlock = useSelector(selectCurrentBlock);
  const currentSectionIndex = useSelector(selectCurrentSectionIndex);
  const currentBlockIndex = useSelector(selectCurrentBlockIndex);
  const timeRemaining = useSelector(selectTimeRemaining);
  const examInfo = useSelector(selectExamInfo);
  const answeredMap = useSelector(selectAnsweredMap);
  const flaggedMap = useSelector(selectFlaggedMap);
  const isStarted = useSelector(selectIsStarted);
  const isSubmitted = useSelector(selectIsSubmitted);
  const isSolved = useSelector(selectIsSolved);
  const totalQuestions = useSelector(selectTotalQuestions);
  const progressText = useSelector(selectProgressText);
  const isCurrentBlockMarked = useSelector(selectIsCurrentBlockMarked);
  const isLastBlockInSection = useSelector(selectIsLastBlockInSection);
  const isLastSection = useSelector(selectIsLastSection);
  const formattedAnswers = useSelector(selectFormattedAnswersForAPI);
  const stateForSave = useSelector(selectStateForSave);
  const examScore = useSelector(selectScore);
  const examPercentage = useSelector(selectPercentage);
  const examId = useSelector(selectExamId);
  const studentId = useSelector(selectStudentId);

  // Local state
  const [isLoading, setIsLoading] = useState(true);
  const [noAccess, setNoAccess] = useState(false);
  const [isInReview, setIsInReview] = useState(false);
  const [isFinalReview, setIsFinalReview] = useState(false);
  const [fontSize, setFontSize] = useState("normal");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isConfirmSectionEnd, setIsConfirmSectionEnd] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enteredSections, setEnteredSections] = useState(new Set());
  const [completedSections, setCompletedSections] = useState(new Set());

  const fetchMockTestData = useCallback(async () => {
    setIsLoading(true);
    setNoAccess(false);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("يرجى تسجيل الدخول أولاً");
        router.back();
        return;
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/exams/get_mock_exam_sectionsWithQuestions`,
        { exam_id: id, student_id: user?.user?.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (
        response?.data?.status === "failed" &&
        response?.data?.message === "no_access"
      ) {
        setNoAccess(true);
        return;
      }
      if (response.data.status === "success") {
        dispatch(
          initializeExam({
            examId: id,
            studentId: user?.user?.id,
            sections: response.data.message.sections,
            examInfo: response.data.message.exam_info,
          })
        );
        const savedState = localStorage.getItem(`mock_exam_state_${id}`);
        if (savedState) {
          try {
            const parsed = JSON.parse(savedState);
            if (parsed.examId === id && parsed.timeRemaining > 0) {
              dispatch(restoreState(parsed));
              if (parsed.currentSectionIndex !== undefined) {
                const restoredEntered = new Set();
                const restoredCompleted = new Set();
                for (let i = 0; i <= parsed.currentSectionIndex; i++)
                  restoredEntered.add(i);
                for (let i = 0; i < parsed.currentSectionIndex; i++)
                  restoredCompleted.add(i);
                setEnteredSections(restoredEntered);
                setCompletedSections(restoredCompleted);
              }
            }
          } catch (e) {
            console.error("Error restoring state:", e);
          }
        }
      }
    } catch (error) {
      if (error?.response?.data?.message === "no_access") {
        setNoAccess(true);
        return;
      }
    } finally {
      setIsLoading(false);
    }
  }, [id, user?.user?.id, dispatch, router]);

  useEffect(() => {
    if (id) {
      dispatch(resetExam());
      fetchMockTestData();
    }
  }, [id, fetchMockTestData, dispatch]);

  useEffect(() => {
    if (!isStarted || isInReview || isSubmitted) return;
    const timer = setInterval(() => dispatch(decrementTime()), 1000);
    return () => clearInterval(timer);
  }, [isStarted, isInReview, isSubmitted, currentSectionIndex, dispatch]);

  useEffect(() => {
    if (isStarted && !isSubmitted && sections.length > 0) {
      localStorage.setItem(
        `mock_exam_state_${id}`,
        JSON.stringify({
          ...stateForSave,
          completedSections: Array.from(completedSections),
        })
      );
    }
  }, [stateForSave, isStarted, isSubmitted, sections, id, completedSections]);

  const areAllCurrentSectionQuestionsAnswered = () => {
    if (!currentSection || !currentSection.blocks) return false;
    const allQuestionIds = [];
    currentSection.blocks.forEach((block) =>
      block.questions?.forEach((q) => allQuestionIds.push(q.id))
    );
    if (allQuestionIds.length === 0) return false;
    return allQuestionIds.every(
      (questionId) =>
        answeredMap[questionId] !== undefined &&
        answeredMap[questionId] !== null
    );
  };

  const areAllExamQuestionsAnswered = () => {
    const allQuestionIds = [];
    sections.forEach((section) =>
      section.blocks?.forEach((block) =>
        block.questions?.forEach((q) => allQuestionIds.push(q.id))
      )
    );
    if (allQuestionIds.length === 0) return false;
    return allQuestionIds.every(
      (questionId) =>
        answeredMap[questionId] !== undefined &&
        answeredMap[questionId] !== null
    );
  };

  const getUnansweredCountInCurrentSection = () => {
    if (!currentSection || !currentSection.blocks) return 0;
    return currentSection.blocks.reduce(
      (count, block) =>
        count +
        (block.questions?.filter(
          (q) => answeredMap[q.id] === undefined || answeredMap[q.id] === null
        ).length || 0),
      0
    );
  };

  const handleSubmitExam = async () => {
    if (isSubmitting) return;
    if (!areAllExamQuestionsAnswered()) {
      const unansweredCount =
        sections?.reduce(
          (count, section) =>
            count +
            (section.blocks?.reduce(
              (bCount, block) =>
                bCount +
                (block.questions?.filter(
                  (q) =>
                    answeredMap[q.id] === undefined ||
                    answeredMap[q.id] === null
                ).length || 0),
              0
            ) || 0),
          0
        ) || 0;
      alert(
        `لا يمكنك إرسال الاختبار قبل حل جميع الأسئلة. لديك ${unansweredCount} سؤال غير مُجاب.`
      );
      return;
    }
    setIsSubmitting(true);
    try {
      dispatch(submitExam());
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/exams/storeStudentAnswers`,
        { student_id: studentId, exam_id: examId, answers: formattedAnswers },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const scoreToSubmit = `${formattedAnswers.filter((a) => a.is_correct).length}/${totalQuestions}`;
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/exams/storeStudentScore`,
        { student_id: studentId, exam_id: examId, score: scoreToSubmit },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem(`mock_exam_state_${id}`);
      setIsSuccessOpen(true);
    } catch (error) {
      alert("حدث خطأ أثناء حفظ الإجابات. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAnswerSelect = (questionId, optionId) =>
    dispatch(setAnswer({ questionId, optionId }));

  const handleNextBlock = () => {
    if (!enteredSections.has(currentSectionIndex)) {
      setEnteredSections((prev) => new Set(prev).add(currentSectionIndex));
      return;
    }
    if (!isLastBlockInSection)
      dispatch(setCurrentBlockIndex(currentBlockIndex + 1));
    else setIsConfirmSectionEnd(true);
  };

  const handlePreviousBlock = () => {
    if (currentBlockIndex > 0)
      dispatch(setCurrentBlockIndex(currentBlockIndex - 1));
  };

  const handleMoveToNextSection = () => {
    if (!isLastSection) {
      setCompletedSections((prev) => new Set(prev).add(currentSectionIndex));
      dispatch(setCurrentSectionIndex(currentSectionIndex + 1));
      dispatch(setCurrentBlockIndex(0));
      setIsInReview(false);
      setIsFinalReview(false);
    } else {
      setCompletedSections((prev) => new Set(prev).add(currentSectionIndex));
      setIsFinalReview(true);
      setIsInReview(true);
    }
  };

  const handleConfirmSectionEnd = () => {
    if (!areAllCurrentSectionQuestionsAnswered()) {
      toast.error(
        `يجب الإجابة على جميع الأسئلة في هذا القسم قبل الانتقال. لديك ${getUnansweredCountInCurrentSection()} سؤال غير مُجاب.`
      );
      setIsConfirmSectionEnd(false);
      return;
    }
    setIsConfirmSectionEnd(false);
    setIsInReview(true);
    setIsFinalReview(false);
  };

  const handleBackToQuestions = () => {
    setIsInReview(false);
    setIsFinalReview(false);
  };

  const handleNavigateToQuestion = (sectionIdx, blockIdx) => {
    if (
      sectionIdx === currentSectionIndex &&
      !completedSections.has(sectionIdx)
    ) {
      dispatch(setCurrentBlockIndex(blockIdx));
      setIsInReview(false);
      setIsFinalReview(false);
    }
  };

  const handleMarkForReview = () => {
    if (!currentBlock) return;
    dispatch(toggleBlockFlag(currentBlock.questions.map((q) => q.id)));
  };

  const handleStartExam = () => {
    dispatch(startExam());
    setEnteredSections((prev) => new Set(prev).add(0));
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0)
      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-primary">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mx-auto mb-4"></div>
          <div className="text-white text-2xl font-bold">
            جاري تحميل الاختبار...
          </div>
        </div>
      </div>
    );
  }

  if (noAccess)
    return (
      <NoAccessScreen
        onBack={() => router.back()}
        onHome={() => router.push("/")}
      />
    );
  if (!sections || sections.length === 0)
    return (
      <div className="flex items-center justify-center h-screen bg-primary">
        <div className="text-white text-2xl font-bold">
          لا توجد بيانات للاختبار
        </div>
      </div>
    );

  return (
    <div className="bg-[#f8f9fa] flex flex-col h-[100dvh] overflow-hidden w-full">
      <div className="shrink-0 w-full z-20">
        <MockExamHeader
          examInfo={examInfo}
          drawerPlacement="right"
          isInReview={isInReview}
          setIsInReview={setIsInReview}
          timeRemaining={formatTime(timeRemaining)}
          questionProgress={sectionProgressText}
          onMarkForReview={handleMarkForReview}
          isMarkedForReview={isCurrentBlockMarked}
          fontSize={fontSize}
          onFontSizeChange={setFontSize}
          currentSection={currentSection}
        />
      </div>

      {isInReview ? (
        <div className="flex-1 overflow-y-auto w-full bg-white">
          <MockTestReview
            sections={sections}
            currentSectionIndex={currentSectionIndex}
            answers={answeredMap}
            setIsInReview={setIsInReview}
            markedForReview={
              new Set(
                Object.keys(flaggedMap)
                  .filter((k) => flaggedMap[k])
                  .map((k) => parseInt(k))
              )
            }
            onNavigateToQuestion={handleNavigateToQuestion}
            onBackToTest={handleBackToQuestions}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            onSubmitExam={handleSubmitExam}
            isSubmitting={isSubmitting}
            isFinalReview={isFinalReview}
            isLastSection={isLastSection}
            onMoveToNextSection={handleMoveToNextSection}
            completedSections={completedSections}
          />
        </div>
      ) : (
        <div className="flex flex-row w-full flex-1 overflow-hidden" dir="rtl">
          <div className="w-[49%] h-full bg-white px-2 py-2 sm:px-4 landscape:py-0.5 md:landscape:py-6 sm:py-6 md:px-12 overflow-y-auto custom-scroll">
            {isStarted &&
            currentBlock &&
            enteredSections.has(currentSectionIndex) ? (
              <MockExamQuestion
                currentSection={currentSection}
                block={currentBlock}
                questionNumberStart={
                  parseInt(progressText.split(" ")[0].split("-")[0]) || 1
                }
                answers={answeredMap}
                onAnswerSelect={handleAnswerSelect}
                fontSize={fontSize}
              />
            ) : (
              <VerbalSection
                sectionTitle={currentSection?.title}
                sectionDescription={currentSection?.description}
              />
            )}
          </div>

          <div className="w-[2%] max-w-[8px] min-w-[3px] sm:min-w-[6px] bg-[#00A1E4] shrink-0 h-full"></div>

          <div className="w-[49%] h-full bg-white px-2 py-2 sm:px-4 landscape:py-0.5 md:landscape:py-6 sm:py-6 md:px-12 overflow-y-auto custom-scroll flex flex-col items-start">
            {isStarted && currentSection && (
              <div
                className={`text-right text-[#be1919] w-full 
      ${
        fontSize === "small"
          ? `text-[8px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base
             landscape:text-[7px] landscape:sm:text-[9px] landscape:md:text-[11px] landscape:lg:text-xs`
          : fontSize === "large"
            ? `text-[10px] sm:text-sm md:text-base lg:text-lg xl:text-xl
               landscape:text-[9px] landscape:sm:text-xs landscape:md:text-sm landscape:lg:text-base`
            : fontSize === "xlarge"
              ? `text-[11px] sm:text-base md:text-lg lg:text-xl xl:text-2xl
                 landscape:text-[10px] landscape:sm:text-sm landscape:md:text-base landscape:lg:text-lg`
              : `text-[9px] sm:text-xs md:text-sm lg:text-base xl:text-lg
                 landscape:text-[8px] landscape:sm:text-[10px] landscape:md:text-xs landscape:lg:text-sm`
      } 
      leading-normal sm:leading-relaxed md:leading-relaxed lg:leading-loose
      landscape:leading-snug landscape:sm:leading-normal landscape:md:leading-relaxed
    `}
              >
                {enteredSections.has(currentSectionIndex) &&
                currentBlock?.questions?.[0] ? (
                  <>
                    {currentBlock.questions[0].description && (
                      <p
                        className="font-medium"
                        dangerouslySetInnerHTML={{
                          __html:
                            currentBlock.questions[0].description.replaceAll(
                              /&nbsp;/gi,
                              " "
                            ),
                        }}
                      />
                    )}
                    {!currentBlock.questions[0].description &&
                      currentBlock.questions[0].instructions && (
                        <p
                          className="font-medium"
                          dangerouslySetInnerHTML={{
                            __html:
                              currentBlock.questions[0].instructions.replaceAll(
                                /&nbsp;/gi,
                                " "
                              ),
                          }}
                        />
                      )}
                  </>
                ) : (
                  <>
                    <h3
                      className={`
            prose prose-neutral font-bold w-full grid grid-cols-1 !whitespace-normal
            mb-1.5 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-5
            landscape:mb-1 landscape:sm:mb-1.5 landscape:md:mb-2 landscape:lg:mb-3
            ${
              fontSize === "small"
                ? `text-[10px] sm:text-xs md:text-sm lg:text-lg xl:text-xl
                   landscape:text-[9px] landscape:sm:text-[11px] landscape:md:text-xs landscape:lg:text-base`
                : fontSize === "large"
                  ? `text-[12px] sm:text-base md:text-lg lg:text-xl xl:text-2xl
                     landscape:text-[11px] landscape:sm:text-sm landscape:md:text-base landscape:lg:text-lg`
                  : fontSize === "xlarge"
                    ? `text-[14px] sm:text-lg md:text-xl lg:text-2xl xl:text-3xl
                       landscape:text-[12px] landscape:sm:text-base landscape:md:text-lg landscape:lg:text-xl`
                    : `text-[11px] sm:text-sm md:text-base lg:text-xl xl:text-2xl
                       landscape:text-[10px] landscape:sm:text-xs landscape:md:text-sm landscape:lg:text-lg`
            }
          `}
                      dangerouslySetInnerHTML={{
                        __html: currentSection.title.replaceAll(
                          /&nbsp;/gi,
                          " "
                        ),
                      }}
                    />
                    <p
                      className="font-medium"
                      dangerouslySetInnerHTML={{
                        __html:
                          currentSection.description?.replaceAll(
                            /&nbsp;/gi,
                            " "
                          ) || "",
                      }}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="shrink-0 w-full z-10 border-t border-white/20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <MockTestFooter
          isStart={isStarted}
          isInReview={isInReview}
          setIsInReview={setIsInReview}
          setIsStart={handleStartExam}
          onPrevious={handlePreviousBlock}
          onNext={handleNextBlock}
          canGoPrevious={currentBlockIndex > 0}
          canGoNext={true}
          isLastQuestion={isLastBlockInSection}
          isLastSection={isLastSection}
          fontSize={fontSize}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </div>

      <ConfirmationPopup
        isOpen={isConfirmSectionEnd}
        onClose={() => setIsConfirmSectionEnd(false)}
        onConfirm={handleConfirmSectionEnd}
        title="إنهاء القسم"
        message={
          getUnansweredCountInCurrentSection() > 0
            ? `يجب الإجابة على جميع الأسئلة في هذا القسم قبل الانتقال. لديك ${getUnansweredCountInCurrentSection()} سؤال غير مُجاب.`
            : "هل أنت متأكد من إنهاء هذا القسم والانتقال إلى صفحة مراجعة القسم؟"
        }
        confirmText={
          getUnansweredCountInCurrentSection() > 0
            ? "إغلاق"
            : "الانتقال للمراجعة"
        }
        cancelText="إلغاء"
      />
      <SuccessPopup
        isOpen={isSuccessOpen}
        onClose={() => {
          setIsSuccessOpen(false);
          router.push("/");
        }}
        title="تم إرسال الاختبار بنجاح!"
        message={`نتيجتك: ${examScore} (${examPercentage}%)`}
        buttonText="العودة للصفحة الرئيسية"
      />
    </div>
  );
};

export default MockTest;
