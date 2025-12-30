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
  selectIsCurrentBlockMarked,
  selectIsLastBlockInSection,
  selectIsLastSection,
  selectFormattedAnswersForAPI,
  selectStateForSave,
  selectScore,
  selectPercentage,
  selectExamId,
  selectStudentId,
} from "../../../../components/utils/Store/Slices/mockExamSlice";

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

        <h2 className="text-2xl font-bold text-text mb-3">لا تملك صلاحية الوصول</h2>
        <p className="text-text-alt leading-relaxed mb-8">
          لا يمكنك فتح هذا الاختبار حاليًا.
          <br />
          قد يكون السبب أنك غير مشترك في الدورة أو ليس لديك تصريح للوصول للاختبار.
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

// Already Solved Popup (unchanged)
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
  const currentBlock = useSelector(selectCurrentBlock);
  const currentSectionIndex = useSelector(selectCurrentSectionIndex);
  const currentBlockIndex = useSelector(selectCurrentBlockIndex);
  const timeRemaining = useSelector(selectTimeRemaining);
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
  const [noAccess, setNoAccess] = useState(false); // ✅ NEW
  const [isInReview, setIsInReview] = useState(false);
  const [fontSize, setFontSize] = useState("normal");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isConfirmSectionEnd, setIsConfirmSectionEnd] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);



  

  // Fetch exam data
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

      // ✅ handle no_access from normal response
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
          })
        );

        // Try to restore saved state
        const savedState = localStorage.getItem(`mock_exam_state_${id}`);
        if (savedState) {
          try {
            const parsed = JSON.parse(savedState);
            if (parsed.examId === id && parsed.timeRemaining > 0) {
              dispatch(restoreState(parsed));
            }
          } catch (e) {
            console.error("Error restoring state:", e);
          }
        }
      }
    } catch (error) {
      // ✅ handle no_access from axios error response (400)
      const msg = error?.response?.data?.message;
      if (msg === "no_access") {
        setNoAccess(true);
        return;
      }

      console.error("Error loading exam:", error);
      // تقدر تعرض رسالة عامة لو حبيت
      // alert("فشل تحميل الاختبار، تأكد من الاتصال بالإنترنت أو حاول مرة أخرى.");
      // router.back();
    } finally {
      setIsLoading(false);
    }
  }, [id, user?.user?.id, dispatch, router]);

  // Initial fetch
  useEffect(() => {
    if (id) {
      dispatch(resetExam());
      fetchMockTestData();
    }
  }, [id, fetchMockTestData, dispatch]);

  // Timer effect
  useEffect(() => {
    if (!isStarted || isInReview || isSubmitted) return;

    const timer = setInterval(() => {
      dispatch(decrementTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, isInReview, isSubmitted, dispatch]);

  // Auto submit when time runs out
  // useEffect(() => {
  //   if (timeRemaining <= 0 && isStarted && !isSubmitted) {
  //     handleSubmitExam();
  //   }
  // }, [timeRemaining, isStarted, isSubmitted]);

  // Save state to localStorage
  useEffect(() => {
    if (isStarted && !isSubmitted && sections.length > 0) {
      localStorage.setItem(
        `mock_exam_state_${id}`,
        JSON.stringify(stateForSave)
      );
    }
  }, [stateForSave, isStarted, isSubmitted, sections, id]);

  // Submit exam to API
  const handleSubmitExam = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      dispatch(submitExam());

      const token = localStorage.getItem("token");

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/exams/storeStudentAnswers`,
        {
          student_id: studentId,
          exam_id: examId,
          answers: formattedAnswers,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const scoreToSubmit = `${
        formattedAnswers.filter((a) => a.is_correct).length
      }/${totalQuestions}`;

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/exams/storeStudentScore`,
        {
          student_id: studentId,
          exam_id: examId,
          score: scoreToSubmit,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.removeItem(`mock_exam_state_${id}`);
      setIsSuccessOpen(true);
    } catch (error) {
      console.error("Error submitting exam:", error);
      alert("حدث خطأ أثناء حفظ الإجابات. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAnswerSelect = (questionId, optionId) => {
    dispatch(setAnswer({ questionId, optionId }));
  };

  // Navigation
  const handleNextBlock = () => {
    if (!isLastBlockInSection) {
      dispatch(setCurrentBlockIndex(currentBlockIndex + 1));
    } else {
      setIsConfirmSectionEnd(true);
    }
  };

  const handlePreviousBlock = () => {
    if (currentBlockIndex > 0) {
      dispatch(setCurrentBlockIndex(currentBlockIndex - 1));
    }
  };

  const handleConfirmSectionEnd = () => {
    setIsConfirmSectionEnd(false);

    if (!isLastSection) {
      dispatch(setCurrentSectionIndex(currentSectionIndex + 1));
      dispatch(setCurrentBlockIndex(0));
    } else {
      setIsInReview(true);
    }
  };

  const handleMarkForReview = () => {
    if (!currentBlock) return;
    const questionIds = currentBlock.questions.map((q) => q.id);
    dispatch(toggleBlockFlag(questionIds));
  };

  const handleStartExam = () => {
    dispatch(startExam());
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    if (h > 0) {
      return `${String(h).padStart(2, "0")}:${String(m).padStart(
        2,
        "0"
      )}:${String(s).padStart(2, "0")}`;
    }
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // Loading state
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

  // ✅ No access
  if (noAccess) {
    return (
      <NoAccessScreen
        onBack={() => router.back()}
        onHome={() => router.push("/")}
      />
    );
  }

  // Already solved (optional)
  // if (isSolved) {
  //   return (
  //     <div className="flex items-center justify-center h-screen bg-primary">
  //       <AlreadySolvedPopup isOpen={true} onClose={() => router.back()} />
  //     </div>
  //   );
  // }

  // No sections
  if (!sections || sections.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-primary">
        <div className="text-white text-2xl font-bold">
          لا توجد بيانات للاختبار
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary min-h-screen">
      <MockExamHeader
        drawerPlacement="right"
        isInReview={isInReview}
        setIsInReview={setIsInReview}
        timeRemaining={formatTime(timeRemaining)}
        questionProgress={progressText}
        onMarkForReview={handleMarkForReview}
        isMarkedForReview={isCurrentBlockMarked}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
      />

      {isInReview ? (
        <MockTestReview
          sections={sections}
          answers={answeredMap}
          setIsInReview={setIsInReview}
          markedForReview={
            new Set(
              Object.keys(flaggedMap)
                .filter((k) => flaggedMap[k])
                .map((k) => parseInt(k))
            )
          }
          onNavigateToQuestion={(sectionIdx, blockIdx) => {
            dispatch(setCurrentSectionIndex(sectionIdx));
            dispatch(setCurrentBlockIndex(blockIdx));
            setIsInReview(false);
          }}
          onBackToTest={() => setIsInReview(false)}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          onSubmitExam={handleSubmitExam}
          isSubmitting={isSubmitting}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 h-auto md:h-[calc(100vh-235px)]">
          <div className="bg-white px-6 md:px-16 overflow-y-auto custom-scroll py-8">
            {isStarted && currentBlock ? (
              <MockExamQuestion
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

          <div className="bg-white p-8 md:p-16 flex items-start">
            {isStarted && currentSection && (
              <div
                className={`text-right text-[#be1919] ${
                  fontSize === "small"
                    ? "text-sm"
                    : fontSize === "large"
                    ? "text-lg"
                    : fontSize === "xlarge"
                    ? "text-xl"
                    : "text-base"
                } leading-relaxed`}
              >
                <h3
                  className="font-bold text-xl mb-4"
                  dangerouslySetInnerHTML={{ __html: currentSection.title }}
                />
                <p className="font-medium">{currentSection.description}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <MockTestFooter
        isStart={isStarted}
        isInReview={isInReview}
        setIsInReview={setIsInReview}
        setIsStart={handleStartExam}
        onPrevious={handlePreviousBlock}
        onNext={handleNextBlock}
        // onSubmit={handleSubmitExam}
        canGoPrevious={currentBlockIndex > 0}
        canGoNext={true}
        isLastQuestion={isLastBlockInSection}
        isLastSection={isLastSection}
        fontSize={fontSize}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <ConfirmationPopup
        isOpen={isConfirmSectionEnd}
        onClose={() => setIsConfirmSectionEnd(false)}
        onConfirm={handleConfirmSectionEnd}
        title="إنهاء القسم"
        message={
          isLastSection
            ? "هل أنت متأكد من إنهاء هذا القسم والانتقال إلى صفحة المراجعة؟"
            : "هل أنت متأكد من إنهاء هذا القسم والانتقال إلى القسم التالي؟"
        }
        confirmText={
          isLastSection ? "الانتقال للمراجعة" : "الانتقال للقسم التالي"
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
