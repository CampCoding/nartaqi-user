"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Timer } from "../../../../components/ExamPage/Timer";
import ExamContent from "../../../../components/ExamPage/ExamContent";
import { FixedResultHero } from "../../../../components/ExamPage/FixedResultHero";
import Container from "../../../../components/ui/Container";
import { useSelector } from "react-redux";
import LoadingPage from "@/components/shared/Loading";
import { useParams } from "next/navigation";

const ExamPage = ({ params }) => {
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answeredMap, setAnsweredMap] = useState({});
  const [flaggedMap, setFlaggedMap] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const { id } = useParams();

  // Fetch exam data
  useEffect(() => {
    const fetchExamData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/exams/get_exam_sectionsWithQuestions`,
          {
            exam_id: id,
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
          setExamData(response.data.message);
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

    fetchExamData();
  }, []);

  // Transform API data to questions array
  const questions = useMemo(() => {
    if (!examData) return [];

    const allQuestions = [];

    examData.forEach((section) => {
      // Add MCQ questions only
      section.mcq?.forEach((question) => {
        allQuestions.push({
          id: question.id,
          type: "mcq",
          text: stripHtml(question.question_text),
          imageUrl: question.image_url || undefined,
          sectionId: section.id,
          sectionTitle: stripHtml(section.title),
          options:
            question.options?.map((opt) => ({
              id: opt.id,
              label: stripHtml(opt.option_text),
              isCorrect: opt.is_correct === 1,
              explanation: stripHtml(opt.question_explanation),
            })) || [],
        });
      });
    });

    return allQuestions;
  }, [examData]);

  // Get total time from first section
  const initialSeconds = useMemo(() => {
    if (!examData || examData.length === 0) return 60 * 60;

    const timeString = examData[0].time_if_free; // "01:30:00"
    if (!timeString) return 60 * 60;

    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }, [examData]);

  const handleSelectOption = useCallback((index, value) => {
    setAnsweredMap((prev) => ({ ...prev, [index]: value }));
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(questions.length - 1, i + 1));
  }, [questions.length]);

  const handleJumpTo = useCallback((index) => setCurrentIndex(index), []);

  const handleTimeUp = useCallback(() => {
    console.log("Time is up", answeredMap);
    handleSubmitTheExam();
  }, [answeredMap]);

  const handleSubmitTheExam = async () => {
    try {
      // Transform answers to API format
      const submissionData = Object.entries(answeredMap).map(
        ([index, answerId]) => ({
          question_id: questions[index].id,
          answer_id: answerId, // The selected option id
        })
      );

      console.log("Submitting answers:", submissionData);

      // TODO: Replace with actual submit endpoint when provided
      // const response = await axios.post("/user/rounds/exams/submit_exam", {
      //   exam_id: 28,
      //   answers: submissionData,
      // });

      // if (response.data.statusCode === 200) {
      //   // Handle success
      //   console.log("Exam submitted successfully:", response.data);
      // }

      setIsSubmitted(true);
    } catch (err) {
      console.error("Failed to submit exam:", err);
      // You might want to show an error message to the user here
    }
  };

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

  if (!questions || questions.length === 0) {
    return (
      <Container className="flex items-center justify-center py-20">
        <div className="text-center text-text">
          <p className="text-lg font-bold">
            لا توجد أسئلة متاحة في هذا الاختبار
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="flex flex-col py-[48px]">
      <Timer
        currentQuestionIndex={currentIndex}
        totalQuestions={questions.length}
        initialSeconds={initialSeconds}
        onTimeUp={handleTimeUp}
        isStarted={isStarted}
        setIsStarted={setIsStarted}
      />
      <ExamContent
        questions={questions}
        currentIndex={currentIndex}
        answeredMap={answeredMap}
        flaggedMap={flaggedMap}
        onSelectOption={handleSelectOption}
        onPrev={handlePrev}
        onNext={handleNext}
        onJumpTo={handleJumpTo}
        isStarted={isStarted}
        setIsStarted={setIsStarted}
        onSubmit={handleSubmitTheExam}
      />
      <FixedResultHero id={id} open={isSubmitted} setOpen={setIsSubmitted} />
    </Container>
  );
};

export default ExamPage;

// Helper function to strip HTML tags
function stripHtml(html) {
  if (!html) return "";
  if (typeof window === "undefined") {
    // Server-side: use regex
    return html.replace(/<[^>]*>/g, "");
  }
  // Client-side: use DOM
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}
