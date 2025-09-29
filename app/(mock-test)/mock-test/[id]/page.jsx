"use client";

import React, { useState, useEffect } from "react";
import { MockExamHeader } from "../../../../components/MockTestPage/MockTestHeader";
import { MockTestFooter } from "../../../../components/MockTestPage/MockTestFooter";
import VerbalSection from "../../../../components/MockTestPage/VerbalSection";
import MockExamQuestion from "../../../../components/MockTestPage/MockExamQuestion";
import MockTestReview from "../../../../components/MockTestPage/MockTestReview";

const MockTest = () => {
  // Test data with multiple questions
  const testData = {
    verbalSection: <VerbalSection />,
    data: [
      {
        section: "Verbal Section",
        passage:
          "شهد التعليم في المملكة العربية السعودية تطورا كبيرا خلال السنوات الأخيرة، حيث تم إدخال استراتيجيات تدريس حديثة مثل التعليم المدمج، والتعلم القائم على المشروعات، واستخدام التكنولوجيا في الفصول الدراسية. هذه الاستراتيجيات تهدف إلى تحسين مهارات الطلاب العملية وتعزيز قدرتهم على التفكير النقدي وحل المشكلات",
        questions: [
          {
            id: 1,
            text: "أي من الاستراتيجيات المذكورة في النص تهدف إلى دمج التعليم التقليدي مع التعليم الإلكتروني؟",
            options: [
              { id: 0, text: "التعليم القائم على المشروعات", isCorrect: false },
              { id: 1, text: "التعليم المدمج", isCorrect: true },
              { id: 2, text: "التعلم النشط", isCorrect: false },
              { id: 3, text: "التعليم التعاوني", isCorrect: false },
            ],
            explanation:
              "الاستراتيجية التي تجمع بين التعليم التقليدي والتعليم الإلكتروني هي التعليم المدمج.",
          },
          {
            id: 2,
            text: "ما الهدف الرئيسي من الاستراتيجيات المذكورة في النص؟",
            options: [
              { id: 0, text: "زيادة عدد الطلاب", isCorrect: false },
              {
                id: 1,
                text: "تحسين المهارات العملية والتفكير النقدي",
                isCorrect: true,
              },
              { id: 2, text: "تقليل التكاليف", isCorrect: false },
              { id: 3, text: "تسهيل العملية التعليمية فقط", isCorrect: false },
            ],
            explanation:
              "الهدف الرئيسي هو تحسين مهارات الطلاب العملية وتعزيز قدرتهم على التفكير النقدي وحل المشكلات.",
          },
          {
            id: 3,
            text: "أي من الاستراتيجيات التالية تركز على استخدام التكنولوجيا في الفصول؟",
            options: [
              { id: 0, text: "التعليم التقليدي", isCorrect: false },
              {
                id: 1,
                text: "استخدام التكنولوجيا في الفصول الدراسية",
                isCorrect: true,
              },
              { id: 2, text: "التعليم الورقي", isCorrect: false },
              { id: 3, text: "التعليم الشفهي", isCorrect: false },
            ],
            explanation:
              "استخدام التكنولوجيا في الفصول الدراسية هو الاستراتيجية التي تركز على التكنولوجيا.",
          },
        ],
      },
    ],
  };

  // State management
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes in seconds
  const [isStart, setIsStart] = useState(false);
  const [isInReview, setIsInReview] = useState(false);
  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Auto submit when time runs out
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Get current question data
  const currentQuestionData =
    testData?.data[currentSection]?.questions[currentQuestion];
  const totalQuestions = testData?.data.reduce(
    (total, section) => total + section.questions.length,
    0
  );
  const currentQuestionNumber =
    testData?.data
      .slice(0, currentSection)
      .reduce((total, section) => total + section.questions.length, 0) +
    currentQuestion +
    1;

  // Handle answer selection
  const handleAnswerSelect = (questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  // Handle navigation
  const handleNextQuestion = () => {
    if (currentQuestion < testData?.data[currentSection].questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else if (currentSection < testData?.data.length - 1) {
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
        testData?.data[currentSection - 1].questions.length - 1
      );
    }
  };

  // Handle mark for review
  const handleMarkForReview = () => {
    const questionId = `${currentSection}-${currentQuestion}`;
    setMarkedForReview((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  // Handle test submission
  const handleSubmitTest = () => {
    // Calculate score
    let correctAnswers = 0;
    testData?.data.forEach((section, sectionIndex) => {
      section.questions.forEach((question, questionIndex) => {
        const answerKey = `${sectionIndex}-${questionIndex}`;
        const selectedAnswer = answers[answerKey];
        if (selectedAnswer !== undefined) {
          const selectedOption = question.options.find(
            (opt) => opt.id === selectedAnswer
          );
          if (selectedOption?.isCorrect) {
            correctAnswers++;
          }
        }
      });
    });

    setIsInReview(true);
    return;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    alert(
      `تم إرسال الاختبار!\nالنتيجة: ${score}%\nالإجابات الصحيحة: ${correctAnswers}/${totalQuestions}`
    );
  };

  // Format time display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="bg-primary">
      <MockExamHeader
        isInReview={isInReview}
        setIsInReview={setIsInReview}
        timeRemaining={formatTime(timeRemaining)}
        questionProgress={`${currentQuestionNumber} من ${totalQuestions}`}
        onMarkForReview={handleMarkForReview}
        isMarkedForReview={markedForReview.has(
          `${currentSection}-${currentQuestion}`
        )}
      />

      {isInReview ? (
        <MockTestReview />
      ) : (
        <div className="grid grid-cols-2 gap-[32px] min-h-screen">
          <div className="bg-white px-[64px] py-[32px]">
            {isStart ? (
              <MockExamQuestion
                questionData={currentQuestionData}
                questionNumber={currentQuestionNumber}
                passage={testData.data[currentSection]?.passage}
                selectedAnswer={answers[`${currentSection}-${currentQuestion}`]}
                onAnswerSelect={(optionId) =>
                  handleAnswerSelect(
                    `${currentSection}-${currentQuestion}`,
                    optionId
                  )
                }
              />
            ) : (
              <VerbalSection />
            )}
          </div>

          <div className="bg-white p-[64px]">
            {isStart ? (
              <p className="  flex flex-col   font-normal text-[#be1919] text-base tracking-[0] leading-[normal] [direction:rtl]">
                <span className="font-bold">استيعاب المقروء</span>

                <span className=" font-medium">
                  {" "}
                  الأسئلة التإلىة تتعلق بالنص الذي يسبقها ، بعد كل سؤال أربعة
                  اختيارات، واحد منها صحيح المطلوب هو : قراءة النص بعناية
                  .واختيار الإجابة الصحيحة عن كل سؤال
                </span>
              </p>
            ) : null}
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
          currentQuestion <
            testData.data[currentSection].questions.length - 1 ||
          currentSection < testData.length - 1
        }
        isLastQuestion={currentQuestionNumber === totalQuestions}
      />
    </div>
  );
};

export default MockTest;
