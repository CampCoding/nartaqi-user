"use client";

import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Timer } from "../../../../components/ExamPage/Timer";
import { FixedResultHero } from "../../../../components/ExamPage/FixedResultHero";
import Container from "../../../../components/ui/Container";
import { useSelector, useDispatch } from "react-redux";
import LoadingPage from "@/components/shared/Loading";
import { useParams } from "next/navigation";
import {
  resetExam,
  setStudentId,
  setExamId,
  initializeExam,
  decrementTime,
  selectQuestions,
  selectSections,
  selectCurrentSection,
  selectCurrentBlock,
  selectCurrentSectionIndex,
  selectCurrentBlockIndex,
  selectCurrentIndex,
  selectAnsweredMap,
  selectTimeRemaining,
  selectIsStarted,
  selectIsSubmitted,
  selectSubmissionData,
  selectAnswers,
  startExam,
  submitExam,
  setExamResults,
} from "../../../../components/utils/Store/Slices/examSlice";
import ExamContent from "../../../../components/ExamPage/ExamContent";

const ExamPage = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { id, examId, lessonId } = useParams(); // id غالبًا courseId

  // Local state
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [openResult, setOpenResult] = useState(false);

  // Redux state
  const sections = useSelector(selectSections);
  const questions = useSelector(selectQuestions);
  const currentSection = useSelector(selectCurrentSection);
  const currentBlock = useSelector(selectCurrentBlock);
  const currentSectionIndex = useSelector(selectCurrentSectionIndex);
  const currentBlockIndex = useSelector(selectCurrentBlockIndex);
  const currentIndex = useSelector(selectCurrentIndex);
  const answeredMap = useSelector(selectAnsweredMap);
  const timeRemaining = useSelector(selectTimeRemaining);
  const isStarted = useSelector(selectIsStarted);
  const isSubmitted = useSelector(selectIsSubmitted);
  const submissionData = useSelector(selectSubmissionData);
  const answers = useSelector(selectAnswers);

  // Reset exam on mount / exam change
  useEffect(() => {
    dispatch(resetExam());

    if (user?.id) dispatch(setStudentId(user.id));
    if (examId) dispatch(setExamId(examId));
  }, [dispatch, examId, user?.id]);

  // Fetch exam data
  useEffect(() => {
    const fetchExamData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/exams/get_exam_sectionsWithQuestions`,
          {
            exam_id: examId,
            // ✅ FIX: lesson_id لازم تكون lessonId مش id
            lesson_id: lessonId,
            student_id: user?.id,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data?.statusCode === 200 && response.data?.status === "success") {
          const data = response.data.message;
          setExamData(data);

          dispatch(
            initializeExam({
              sections: data.sections,
              examInfo: data.exam_info,
            })
          );
        } else {
          setError("Failed to load exam data");
        }
      } catch (err) {
        setError(err?.message || "An error occurred while loading the exam");
        console.error("Error fetching exam data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token && examId && lessonId && user?.id) {
      fetchExamData();
    }
  }, [token, examId, lessonId, user?.id, dispatch]);

  // Timer tick
  useEffect(() => {
    if (!isStarted || isSubmitted) return;

    const timer = setInterval(() => {
      dispatch(decrementTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, isSubmitted, dispatch]);

  // ✅ FIX: enforce submit on time up (حتى لو Timer component ما ناداش)
  useEffect(() => {
    if (!isStarted || isSubmitted) return;
    if (timeRemaining <= 0) {
      handleSubmitTheExam();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRemaining, isStarted, isSubmitted]);

  // Open results when submitted
  useEffect(() => {
    if (isSubmitted) setOpenResult(true);
  }, [isSubmitted]);

  const calculateScore = () => {
    const correctAnswers = answers.filter((a) => a.is_correct).length;
    const totalQuestions = questions.length;

    const percentage =
      totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

    return {
      score: `${correctAnswers}/${totalQuestions}`,
      percentage,
      correctAnswers,
      totalQuestions,
    };
  };

  const handleSubmitTheExam = useCallback(async () => {
    if (submitting) return;

    try {
      setSubmitting(true);

      // 1) Store student answers
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/exams/storeStudentAnswers`,
        submissionData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 2) Store score
      const scoreData = calculateScore();
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/exams/storeStudentScore`,
        {
          student_id: user?.id,
          exam_id: examId,
          score: scoreData.score,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(
        setExamResults({
          score: scoreData.score,
          percentage: scoreData.percentage,
          resultData: scoreData,
        })
      );

      dispatch(submitExam());
    } catch (err) {
      console.error("Failed to submit exam:", err);

      // still show results locally
      const scoreData = calculateScore();
      dispatch(
        setExamResults({
          score: scoreData.score,
          percentage: scoreData.percentage,
          resultData: scoreData,
        })
      );
      dispatch(submitExam());
    } finally {
      setSubmitting(false);
    }
  }, [submitting, submissionData, token, user?.id, examId, dispatch, questions.length, answers]);

  const handleSetIsStarted = useCallback(
    (value) => {
      if (value) dispatch(startExam());
    },
    [dispatch]
  );

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    if (h > 0) {
      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(
        2,
        "0"
      )}`;
    }
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  if (loading) return <LoadingPage />;

  if (error) {
    return (
      <Container className="flex items-center justify-center py-20">
        <div className="text-center text-red-600">
          <p className="text-lg font-bold">حدث خطأ في تحميل الاختبار</p>
          <p className="text-sm mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
          >
            إعادة المحاولة
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="flex flex-col py-[48px]">
      <Timer
        examData={examData}
        currentQuestionIndex={currentIndex}
        totalQuestions={questions.length}
        timeRemaining={timeRemaining}
        formattedTime={formatTime(timeRemaining)}
        isStarted={isStarted}
        setIsStarted={handleSetIsStarted}
        // لو Timer عندك بينادي onTimeUp كويس — لو لأ، الـ effect فوق بيغطي
        onTimeUp={() => handleSubmitTheExam()}
      />

      <ExamContent onSubmitExam={handleSubmitTheExam} submitting={submitting} />

      <FixedResultHero
        courseId={id}
        id={examId}
        lessonId={lessonId}
        open={openResult}
        // ✅ FIX: خليها setter طبيعي
        setOpen={setOpenResult}
      />
    </Container>
  );
};

export default ExamPage;
