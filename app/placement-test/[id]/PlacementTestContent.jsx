// app/placement-test/[id]/PlacementTestContent.jsx

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  initializeTest,
  startTest,
  setAnswer,
  toggleFlag,
  submitTest,
  resetTest,
  selectAllQuestions,
  selectAnsweredMap,
  selectFlaggedMap,
  selectIsStarted,
  selectIsSubmitted,
  selectTotalQuestions,
  selectPercentage,
  selectCorrectAnswers,
  selectTestInfo,
  selectSections,
  selectSectionResults,
} from "@/components/utils/Store/Slices/placementTestSlice";

import {
  LoadingView,
  ErrorView,
  AlreadySolvedView,
  StartView,
  TestView,
  ReviewView,
  ConfirmView,
  ResultsView,
} from "./_components";

const PlacementTestContent = () => {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const currentView = searchParams.get("view") || "start";

  // Redux state
  const testInfo = useSelector(selectTestInfo);
  const sections = useSelector(selectSections);
  const allQuestions = useSelector(selectAllQuestions);
  const answeredMap = useSelector(selectAnsweredMap);
  const flaggedMap = useSelector(selectFlaggedMap);
  const isStarted = useSelector(selectIsStarted);
  const isSubmitted = useSelector(selectIsSubmitted);
  const totalQuestions = useSelector(selectTotalQuestions);
  const percentage = useSelector(selectPercentage);
  const correctAnswers = useSelector(selectCorrectAnswers);
  const token = useSelector((state) => state.auth?.token);
  const user = useSelector((state) => state.auth?.user);
  const sectionResults = useSelector(selectSectionResults);

  // Local state
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingSolved, setIsCheckingSolved] = useState(true);
  const [isSolved, setIsSolved] = useState(false);
  const [previousScore, setPreviousScore] = useState(null); // ✅ جديد
  const [previousSuggestion, setPreviousSuggestion] = useState(null); // ✅ جديد
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  // Refs
  const questionRefs = useRef({});

  // Helpers
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navigateTo = useCallback(
    (view) => {
      router.push(`/placement-test/${id}?view=${view}`);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    },
    [router, id]
  );

  const scrollToQuestion = (questionId) => {
    questionRefs.current[questionId]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  // ✅ Check if already solved - محدث
  const checkIfSolved = useCallback(async () => {
    try {
      setIsCheckingSolved(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/parts/checkIfSolved`,
        {
          student_id: user?.id?.toString(),
          placement_test_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        const data = response.data.message;

        // ✅ حفظ حالة الحل
        setIsSolved(data?.is_solved || false);

        // ✅ حفظ الدرجة السابقة
        if (data?.score) {
          setPreviousScore(data.score);
        }

        // ✅ حفظ الاقتراح السابق
        if (data?.suggestion) {
          setPreviousSuggestion(data.suggestion);
        }
      }
    } catch (err) {
      console.error("Error checking if solved:", err);
      setIsSolved(false);
    } finally {
      setIsCheckingSolved(false);
    }
  }, [id, user?.id, token]);

  // Fetch test data
  const fetchTestData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/parts/getSectionsByPlacementTest`,
        { placement_test_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success" && response.data.message) {
        const sectionsData = response.data.message;

        if (!Array.isArray(sectionsData) || sectionsData.length === 0) {
          setError("لا توجد أسئلة في هذا الاختبار");
          return;
        }

        dispatch(
          initializeTest({
            testId: id,
            sections: sectionsData,
          })
        );
      } else {
        setError("لم يتم العثور على الاختبار");
      }
    } catch (err) {
      console.error("Error fetching test:", err);
      setError("حدث خطأ أثناء تحميل الاختبار");
    } finally {
      setIsLoading(false);
    }
  }, [id, dispatch, token]);

  // Initial load
  useEffect(() => {
    dispatch(resetTest());
    if (id && user?.id) {
      checkIfSolved();
      fetchTestData();
    }
  }, [id, user?.id, checkIfSolved, fetchTestData, dispatch]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentView]);

  // Scroll button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handlers
  const handleStartTest = () => {
    dispatch(startTest());
    navigateTo("test");
  };

  // ✅ إعادة الاختبار (مسح البيانات السابقة)
  const handleRetakeTest = () => {
    setIsSolved(false);
    setPreviousScore(null);
    setPreviousSuggestion(null);
    dispatch(resetTest());
    fetchTestData().then(() => {
      handleStartTest();
    });
  };

  const handleAnswerSelect = (questionId, optionId) => {
    dispatch(setAnswer({ questionId, optionId }));
  };

  const handleToggleFlag = (questionId) => {
    dispatch(toggleFlag(questionId));
  };

  const handleGoToReview = () => navigateTo("review");
  const handleBackToTest = () => navigateTo("test");
  const handleGoToConfirm = () => navigateTo("confirm");
  const handleBackToReview = () => navigateTo("review");

  const handleGoToQuestion = (questionId) => {
    navigateTo("test");
    setTimeout(() => {
      scrollToQuestion(questionId);
    }, 150);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      let correct = 0;
      allQuestions.forEach((question) => {
        const userAnswer = answeredMap[question.id];
        if (userAnswer === question.correctAnswer) {
          correct++;
        }
      });

      const scoreString = `${correct}/${totalQuestions}`;

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/parts/storeScore`,
        {
          student_id: user?.id?.toString(),
          score: scoreString,
          placement_test_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success" && response.data.message) {
        if (response.data.message.suggestion) {
          setSuggestion(response.data.message.suggestion);
        }
      }

      dispatch(submitTest());
      navigateTo("results");
    } catch (err) {
      console.error("Error submitting test:", err);
      setSubmitError("حدث خطأ أثناء إرسال الإجابات. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ الذهاب للدورة المقترحة - محدث ليدعم كلا الحالتين
  const handleGoToRound = () => {
    const roundId =
      suggestion?.suggestion_round_id ||
      suggestion?.suggestion_round?.id ||
      previousSuggestion?.suggestion_round_id ||
      previousSuggestion?.suggestion_round?.id;

    if (roundId) {
      router.push(`/course/${roundId}`);
    }
  };

  const handleGoHome = () => router.push("/");
  const handleGoBack = () => router.back();

  // Calculate stats
  const answeredCount = Object.keys(answeredMap).length;
  const flaggedCount = Object.keys(flaggedMap).filter(
    (k) => flaggedMap[k]
  ).length;
  const unansweredCount = totalQuestions - answeredCount;

  // Loading states
  if (isCheckingSolved || isLoading) {
    return <LoadingView />;
  }

  // Error state
  if (error) {
    return <ErrorView error={error} onBack={handleGoBack} />;
  }

  // No questions state
  if (!isLoading && totalQuestions === 0) {
    return (
      <ErrorView
        error="هذا الاختبار لا يحتوي على أسئلة حالياً"
        onBack={handleGoBack}
        type="warning"
      />
    );
  }

  // ✅ Already solved state - محدث
  if (isSolved && currentView === "start" && !isStarted) {
    return (
      <AlreadySolvedView
        testInfo={testInfo}
        scoreData={previousScore}
        suggestion={previousSuggestion}
        onGoHome={handleGoHome}
        onGoToRound={handleGoToRound}
        onRetake={handleRetakeTest}
      />
    );
  }

  // Results View
  if (currentView === "results" || isSubmitted) {
    return (
      <ResultsView
        testInfo={testInfo}
        percentage={percentage}
        correctAnswers={correctAnswers}
        totalQuestions={totalQuestions}
        allQuestions={allQuestions}
        answeredMap={answeredMap}
        suggestion={suggestion}
        sectionResults={sectionResults}
        onGoToRound={handleGoToRound}
        onGoHome={handleGoHome}
      />
    );
  }

  // Start View
  if (currentView === "start" && !isStarted) {
    return (
      <StartView
        testInfo={testInfo}
        totalQuestions={totalQuestions}
        sectionsCount={sections?.length || 0}
        onStartTest={handleStartTest}
      />
    );
  }

  // Confirm View
  if (currentView === "confirm") {
    return (
      <ConfirmView
        testInfo={testInfo}
        totalQuestions={totalQuestions}
        answeredCount={answeredCount}
        unansweredCount={unansweredCount}
        onBackToReview={handleBackToReview}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitError={submitError}
      />
    );
  }

  // Review View
  if (currentView === "review") {
    return (
      <ReviewView
        testInfo={testInfo}
        allQuestions={allQuestions}
        sections={sections}
        answeredMap={answeredMap}
        flaggedMap={flaggedMap}
        totalQuestions={totalQuestions}
        answeredCount={answeredCount}
        flaggedCount={flaggedCount}
        unansweredCount={unansweredCount}
        onBackToTest={handleBackToTest}
        onGoToConfirm={handleGoToConfirm}
        onGoToQuestion={handleGoToQuestion}
      />
    );
  }

  // Test View
  return (
    <TestView
      testInfo={testInfo}
      sections={sections}
      allQuestions={allQuestions}
      answeredMap={answeredMap}
      flaggedMap={flaggedMap}
      totalQuestions={totalQuestions}
      answeredCount={answeredCount}
      flaggedCount={flaggedCount}
      onAnswerSelect={handleAnswerSelect}
      onToggleFlag={handleToggleFlag}
      onGoToReview={handleGoToReview}
      questionRefs={questionRefs}
      showScrollTop={showScrollTop}
      onScrollToTop={scrollToTop}
      onScrollToQuestion={scrollToQuestion}
    />
  );
};

export default PlacementTestContent;
