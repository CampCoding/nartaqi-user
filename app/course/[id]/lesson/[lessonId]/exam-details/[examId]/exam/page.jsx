"use client";

import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Timer } from "../../../../../../../../components/ExamPage/Timer";
import ExamContent from "../../../../../../../../components/ExamPage/ExamContent";
import { FixedResultHero } from "../../../../../../../../components/ExamPage/FixedResultHero";
import Container from "../../../../../../../../components/ui/Container";
import { useSelector, useDispatch } from "react-redux";
import LoadingPage from "@/components/shared/Loading";
import { useParams } from "next/navigation";
import {
  resetExam,
  setStudentId,
  setExamId,
  initializeExam,
  decrementTime,
  setCurrentSectionIndex,
  setCurrentBlockIndex,
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
} from "../../../../../../../../components/utils/Store/Slices/examSlice";

const ExamPage = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { id , examId , lessonId } = useParams();

  // Local state for loading/error
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

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
  const [openResult, setOpenResult] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      
      setOpenResult(isSubmitted)
    }
  },[isSubmitted])
  const submissionData = useSelector(selectSubmissionData);
  const answers = useSelector(selectAnswers);

  // Reset exam when component mounts or exam ID changes
  useEffect(() => {
    dispatch(resetExam());

    // Set student ID and exam ID from auth
    if (user?.id) {
      dispatch(setStudentId(user.id));
    }
    if (examId) {
      dispatch(setExamId(examId));
    }
  }, [dispatch, examId, user]);

  // Fetch exam data
  useEffect(() => {
    const fetchExamData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/exams/get_exam_sectionsWithQuestions`,
          {
            exam_id: examId,
            lesson_id: id,
            student_id: user?.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (
          response.data.statusCode === 200 &&
          response.data.status === "success"
        ) {
          const data = response.data.message;
          setExamData(data);

          // Initialize exam with sections and exam_info
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
        setError(err.message || "An error occurred while loading the exam");
        console.error("Error fetching exam data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token && examId) {
      fetchExamData();
    }
  }, [token, examId]);

  // Timer effect
  useEffect(() => {
    if (!isStarted || isSubmitted) return;

    const timer = setInterval(() => {
      dispatch(decrementTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, isSubmitted, dispatch]);

  // Handle time up
  const handleTimeUp = useCallback(() => {
    if (timeRemaining <= 0 && isStarted && !isSubmitted) {
      handleSubmitTheExam();
    }
  }, [timeRemaining, isStarted, isSubmitted]);

  // Calculate score from answers
  const calculateScore = () => {
    const correctAnswers = answers.filter((answer) => answer.is_correct).length;
    const totalQuestions = questions.length;
    const percentage =
      totalQuestions > 0
        ? Math.round((correctAnswers / totalQuestions) * 100)
        : 0;

    return {
      score: `${correctAnswers}/${totalQuestions}`,
      percentage,
      correctAnswers,
      totalQuestions,
    };
  };

  // Handle exam submission
  const handleSubmitTheExam = async () => {
    if (submitting) return; // Prevent double submission

    try {
      setSubmitting(true);


      // Step 1: Store student answers
      const answersResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/exams/storeStudentAnswers`,
        submissionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      // Calculate score
      const scoreData = calculateScore();

      // Step 2: Store student score
      const scorePayload = {
        student_id: user?.id,
        exam_id: examId,
        score: scoreData.score,
      };

      const scoreResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/exams/storeStudentScore`,
        scorePayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      // Store results in Redux
      dispatch(
        setExamResults({
          score: scoreData.score,
          percentage: scoreData.percentage,
          resultData: {
            answersResponse: answersResponse.data,
            scoreResponse: scoreResponse.data,
            ...scoreData,
          },
        })
      );

      // Mark as submitted
      dispatch(submitExam());
    } catch (err) {
      console.error("Failed to submit exam:", err);

      // Calculate and store score locally even if API fails
      const scoreData = calculateScore();
      dispatch(
        setExamResults({
          score: scoreData.score,
          percentage: scoreData.percentage,
          resultData: scoreData,
        })
      );

      // Still mark as submitted in UI
      dispatch(submitExam());
    } finally {
      setSubmitting(false);
    }
  };

  // Handle start exam (for Timer component)
  const handleSetIsStarted = useCallback(
    (value) => {
      if (value) {
        dispatch(startExam());
      }
    },
    [dispatch]
  );

  if (loading) {
    return <LoadingPage />;
  }

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

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    if (h > 0) {
      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <Container className="flex flex-col py-[48px]">
      <Timer
        examData={examData}
        currentQuestionIndex={currentIndex}
        totalQuestions={questions.length}
        timeRemaining={timeRemaining}
        formattedTime={formatTime(timeRemaining)}
        onTimeUp={handleTimeUp}
        isStarted={isStarted}
        setIsStarted={handleSetIsStarted}
      />
      <ExamContent
        examData={examData?.sections}
        sections={sections}
        currentSection={currentSection}
        currentBlock={currentBlock}
        currentSectionIndex={currentSectionIndex}
        currentBlockIndex={currentBlockIndex}
        onSubmitExam={handleSubmitTheExam}
        submitting={submitting}
      />
      <FixedResultHero showDetailsButtonLink={`/course/${id}/lesson/${lessonId}/exam-details/${examId}/exam`} courseId={id} id={examId} lessonId={lessonId} open={openResult} setOpen={() => {
        setOpenResult(true)
      }} />
    </Container>
  );
};

export default ExamPage;
