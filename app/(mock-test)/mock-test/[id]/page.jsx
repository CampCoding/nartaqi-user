"use client";

import React, { useState, useEffect } from "react";
import { MockExamHeader } from "../../../../components/MockTestPage/MockTestHeader";
import { MockTestFooter } from "../../../../components/MockTestPage/MockTestFooter";
import VerbalSection from "../../../../components/MockTestPage/VerbalSection";
import MockExamQuestion from "../../../../components/MockTestPage/MockExamQuestion";
import MockTestReview from "../../../../components/MockTestPage/MockTestReview";
import axios from "axios";
import { useParams } from "next/navigation";

const MockTest = () => {
  const [TestData, setTestData] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes
  const [isStart, setIsStart] = useState(false);
  const [isInReview, setIsInReview] = useState(false);
  const [fontSize, setFontSize] = useState("normal");
  const [activeFilter, setActiveFilter] = useState("all");
  const { id } = useParams();

  useEffect(() => {
    if (!isStart || isInReview) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isStart, isInReview]);

  const transformApiDataToTestData = (apiData) => {
    const sections = [];

    apiData.forEach((section) => {
      const questions = [];

      section.paragraphs.forEach((paraObj) => {
        const passage = paraObj.paragraph.paragraph_content;

        paraObj.questions.forEach((q) => {
          if (!q.options || q.options.length === 0) return;

          const formattedOptions = q.options.map((opt) => ({
            id: opt.id,
            text: opt.option_text,
            isCorrect: opt.is_correct === 1,
          }));

          const correctOption = q.options.find((o) => o.is_correct === 1);

          questions.push({
            id: q.id,
            text: q.question_text,
            passage: passage,
            options: formattedOptions,
            explanation:
              correctOption?.question_explanation || "لا يوجد تفسير متاح.",
            instructions: q.instructions || "",
          });
        });
      });

      section.mcq.forEach((q) => {
        if (!q.options || q.options.length === 0) return;

        const formattedOptions = q.options.map((opt) => ({
          id: opt.id,
          text: opt.option_text,
          isCorrect: opt.is_correct === 1,
        }));

        const correctOption = q.options.find((o) => o.is_correct === 1);

        questions.push({
          id: q.id,
          text: q.question_text,
          passage: null,
          options: formattedOptions,
          explanation:
            correctOption?.question_explanation || "لا يوجد تفسير متاح.",
          instructions: q.instructions || "",
        });
      });

      if (questions.length > 0) {
        sections.push({
          section: section.title.replace(/<[^>]*>/g, "").trim(),
          description:
            section.description?.replace(/<[^>]*>/g, "").trim() || "",
          questions,
        });
      }
    });

    return {
      data: sections,
      verbalSection: <VerbalSection />,
    };
  };

  const fetchMockTestData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("يرجى تسجيل الدخول أولاً");
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/exams/get_exam_sectionsWithQuestions`,
        { exam_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        const formattedData = transformApiDataToTestData(response.data.message);
        setTestData(formattedData);
      }
    } catch (error) {
      console.error("Error loading exam:", error);
      alert("فشل تحميل الاختبار، تأكد من الاتصال بالإنترنت أو حاول مرة أخرى.");
    }
  };

  useEffect(() => {
    if (id) fetchMockTestData();
  }, [id]);

  if (!TestData) {
    return (
      <div className="flex items-center justify-center h-screen bg-primary">
        <div className="text-white text-2xl font-bold">
          جاري تحميل الاختبار...
        </div>
      </div>
    );
  }

  const currentSectionData = TestData.data[currentSection];
  const currentQuestionData = currentSectionData?.questions[currentQuestion];

  const totalQuestions = TestData.data.reduce(
    (sum, sec) => sum + sec.questions.length,
    0
  );

  const currentQuestionNumber =
    TestData.data
      .slice(0, currentSection)
      .reduce((sum, sec) => sum + sec.questions.length, 0) +
    currentQuestion +
    1;

  const handleAnswerSelect = (optionId) => {
    const key = `${currentSection}-${currentQuestion}`;
    setAnswers((prev) => ({
      ...prev,
      [key]: optionId,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < currentSectionData.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else if (currentSection < TestData.data.length - 1) {
      setCurrentSection((prev) => prev + 1);
      setCurrentQuestion(0);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    } else if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
      setCurrentQuestion(
        TestData.data[currentSection - 1].questions.length - 1
      );
    }
  };

  const handleMarkForReview = () => {
    const key = `${currentSection}-${currentQuestion}`;
    setMarkedForReview((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) newSet.delete(key);
      else newSet.add(key);
      return newSet;
    });
  };

  const handleFontSizeChange = (size) => setFontSize(size);

  const getFontSizeClass = (size) => {
    const map = {
      small: "text-sm",
      normal: "text-base",
      large: "text-lg",
      xlarge: "text-xl",
    };
    return map[size] || "text-base";
  };

  const handleSubmitTest = () => {
    let correct = 0;

    TestData.data.forEach((section, sIdx) => {
      section.questions.forEach((question, qIdx) => {
        const key = `${sIdx}-${qIdx}`;
        const selected = answers[key];
        if (selected !== undefined) {
          const isCorrect = question.options.some(
            (opt) => opt.id === selected && opt.isCorrect
          );
          if (isCorrect) correct++;
        }
      });
    });

    const score = Math.round((correct / totalQuestions) * 100);

    alert(
      `تم تسليم الاختبار!\n\nالنتيجة: ${score}%\nالإجابات الصحيحة: ${correct} من ${totalQuestions}`
    );

    setIsInReview(true);
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="bg-primary min-h-screen">
      <MockExamHeader
        drawerPlacement="right"
        isInReview={isInReview}
        setIsInReview={setIsInReview}
        timeRemaining={formatTime(timeRemaining)}
        questionProgress={`${currentQuestionNumber} من ${totalQuestions}`}
        onMarkForReview={handleMarkForReview}
        isMarkedForReview={markedForReview.has(
          `${currentSection}-${currentQuestion}`
        )}
        fontSize={fontSize}
        onFontSizeChange={handleFontSizeChange}
      />

      {isInReview ? (
        <MockTestReview
          testData={TestData}
          answers={answers}
          setIsInReview={setIsInReview}
          markedForReview={markedForReview}
          onNavigateToQuestion={(sIdx, qIdx) => {
            setCurrentSection(sIdx);
            setCurrentQuestion(qIdx);
            setIsInReview(false);
          }}
          onBackToTest={() => setIsInReview(false)}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 h-auto md:h-[calc(100vh-235px)]">
          <div className="bg-white px-6 md:px-16 overflow-y-auto custom-scroll py-8">
            {isStart && currentQuestionData ? (
              <MockExamQuestion
                questionData={currentQuestionData}
                questionNumber={currentQuestionNumber}
                passage={currentQuestionData.passage}
                selectedAnswer={answers[`${currentSection}-${currentQuestion}`]}
                onAnswerSelect={handleAnswerSelect}
                fontSize={fontSize}
              />
            ) : (
              <VerbalSection />
            )}
          </div>

          <div className="bg-white p-8 md:p-16 flex items-start">
            {isStart && currentSectionData && (
              <div
                className={`text-right text-[#be1919] ${getFontSizeClass(
                  fontSize
                )} leading-relaxed`}
              >
                <h3 className="font-bold text-xl mb-4">
                  {currentSectionData.section || "استيعاب المقروء"}
                </h3>
                <p className="font-medium">
                  الأسئلة التالية تتعلق بالنص الذي يسبقها، بعد كل سؤال أربعة
                  اختيارات، واحد منها صحيح.
                  <br />
                  المطلوب هو: قراءة النص بعناية واختيار الإجابة الصحيحة عن كل
                  سؤال.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <MockTestFooter
        isStart={isStart}
        isInReview={isInReview}
        setIsInReview={setIsInReview}
        setIsStart={setIsStart}
        onPrevious={handlePreviousQuestion}
        onNext={handleNextQuestion}
        onSubmit={handleSubmitTest}
        canGoPrevious={currentQuestion > 0 || currentSection > 0}
        canGoNext={
          currentQuestion < currentSectionData?.questions.length - 1 ||
          currentSection < TestData.data.length - 1
        }
        isLastQuestion={currentQuestionNumber === totalQuestions}
        fontSize={fontSize}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
    </div>
  );
};

export default MockTest;
