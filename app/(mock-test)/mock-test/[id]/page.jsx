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
              {
                id: 100,
                text: "التعليم القائم على المشروعات",
                isCorrect: false,
              },
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
              { id: 100, text: "زيادة عدد الطلاب", isCorrect: false },
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
              { id: 100, text: "التعليم التقليدي", isCorrect: false },
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
      {
        section: "Quantitative Section",
        passage:
          "الرياضيات هي لغة الكون، وتلعب دوراً أساسياً في فهم العالم من حولنا. من خلال الرياضيات، يمكننا حل المشكلات المعقدة واتخاذ القرارات المدروسة. تشمل الرياضيات مجالات متعددة مثل الجبر والهندسة والإحصاء والتفاضل والتكامل.",
        questions: [
          {
            id: 4,
            text: "ما هو المجال الرياضي الذي يتعامل مع الأشكال والمساحات؟",
            options: [
              { id: 100, text: "الجبر", isCorrect: false },
              { id: 1, text: "الهندسة", isCorrect: true },
              { id: 2, text: "الإحصاء", isCorrect: false },
              { id: 3, text: "التفاضل والتكامل", isCorrect: false },
            ],
            explanation:
              "الهندسة هي المجال الرياضي الذي يتعامل مع الأشكال والمساحات والأبعاد.",
          },
          {
            id: 5,
            text: "أي من المجالات التالية يساعد في تحليل البيانات؟",
            options: [
              { id: 100, text: "الجبر", isCorrect: false },
              { id: 1, text: "الهندسة", isCorrect: false },
              { id: 2, text: "الإحصاء", isCorrect: true },
              { id: 3, text: "التفاضل والتكامل", isCorrect: false },
            ],
            explanation:
              "الإحصاء هو المجال الرياضي الذي يساعد في تحليل البيانات واستخراج النتائج منها.",
          },
          {
            id: 6,
            text: "ما هو المجال الرياضي الذي يتعامل مع المعدلات والتغيير؟",
            options: [
              { id: 100, text: "الجبر", isCorrect: false },
              { id: 1, text: "الهندسة", isCorrect: false },
              { id: 2, text: "الإحصاء", isCorrect: false },
              { id: 3, text: "التفاضل والتكامل", isCorrect: true },
            ],
            explanation:
              "التفاضل والتكامل هو المجال الرياضي الذي يتعامل مع المعدلات والتغيير والحدود.",
          },
        ],
      },
      // === Add these two objects to testData.data ===

      // Section 5: Reading Section
      {
        section: "Reading Section",
        passage:
          "تتطلّب المواطنة الرقمية من الطلاب فهم حقوقهم وواجباتهم أثناء استخدام الإنترنت، بما في ذلك احترام الخصوصية، والتحقق من موثوقية المصادر، والتواصل المسؤول. ويساعد دمج محو الأمية الإعلامية في المناهج على تنمية التفكير النقدي ومهارات التحقق من المعلومات قبل مشاركتها.",
        questions: [
          {
            id: 13,
            text: "ما العنصران اللذان يؤكد عليهما النص لتعزيز المواطنة الرقمية؟",
            options: [
              {
                id: 100,
                text: "التحميل العشوائي للمحتوى ونشره",
                isCorrect: false,
              },
              {
                id: 1,
                text: "احترام الخصوصية والتحقق من المصادر",
                isCorrect: true,
              },
              { id: 2, text: "الاكتفاء بالعناوين دون قراءة", isCorrect: false },
              { id: 3, text: "تجاهل حقوق الآخرين الرقمية", isCorrect: false },
            ],
            explanation:
              "يذكر النص احترام الخصوصية والتحقق من موثوقية المصادر كأساس للمواطنة الرقمية.",
          },
          {
            id: 14,
            text: "ما الفائدة التربوية من دمج محو الأمية الإعلامية في المناهج؟",
            options: [
              { id: 100, text: "زيادة وقت الشاشة فقط", isCorrect: false },
              {
                id: 1,
                text: "تنمية التفكير النقدي والتحقق من المعلومات",
                isCorrect: true,
              },
              {
                id: 2,
                text: "الاعتماد على الإشاعات الموثوقة!",
                isCorrect: false,
              },
              { id: 3, text: "إلغاء الأنشطة الصفية", isCorrect: false },
            ],
            explanation:
              "المحو الإعلامي يدعم التفكير النقدي ومهارات التحقق قبل مشاركة المعلومات.",
          },
          {
            id: 15,
            text: "أي ممارسة تعكس التواصل المسؤول عبر الإنترنت؟",
            options: [
              {
                id: 100,
                text: "نشر أخبار غير مؤكدة لزيادة التفاعل",
                isCorrect: false,
              },
              {
                id: 1,
                text: "اختيار لغة محترمة وتوثيق الادعاءات",
                isCorrect: true,
              },
              { id: 2, text: "مهاجمة الآراء المخالفة", isCorrect: false },
              { id: 3, text: "تجاهل قواعد المنصة", isCorrect: false },
            ],
            explanation:
              "التواصل المسؤول يتضمن لغة محترمة وتوثيق الادعاءات بالمصادر.",
          },
        ],
      },

      // Section 6: Quantitative Section
      {
        section: "Quantitative Section",
        passage:
          "نفّذت مدرسة برنامجاً رقمياً لتحسين التحصيل. شارك 60٪ من أصل 240 طالباً في دورات إلكترونية. ارتفع متوسط الدرجات العامة من 72 إلى 81 بعد فصل دراسي واحد. خُصصت ميزانية قدرها 50,000 ريال: 40٪ للأجهزة، و35٪ للتدريب، والباقي للصيانة.",
        questions: [
          {
            id: 16,
            text: "كم عدد الطلاب الذين شاركوا في الدورات الإلكترونية؟",
            options: [
              { id: 100, text: "120 طالباً", isCorrect: false },
              { id: 1, text: "144 طالباً", isCorrect: true }, // 0.60 × 240 = 144
              { id: 2, text: "160 طالباً", isCorrect: false },
              { id: 3, text: "180 طالباً", isCorrect: false },
            ],
            explanation: "%60 من 240 = 0.60 × 240 = 144 طالباً.",
          },
          {
            id: 17,
            text: "ما نسبة الزيادة المئوية في المتوسط العام للدرجات؟",
            options: [
              { id: 100, text: "9٪", isCorrect: false },
              { id: 1, text: "12.5٪", isCorrect: true }, // (81−72)/72 = 9/72 = 0.125 = 12.5%
              { id: 2, text: "15٪", isCorrect: false },
              { id: 3, text: "18٪", isCorrect: false },
            ],
            explanation:
              "نسبة الزيادة = (81 − 72) ÷ 72 = 9 ÷ 72 = 0.125 = 12.5٪.",
          },
          {
            id: 18,
            text: "ما المبلغ المخصّص للصيانة؟",
            options: [
              { id: 100, text: "10,000 ريال", isCorrect: false },
              { id: 1, text: "12,500 ريال", isCorrect: true }, // الباقي = 25% من 50,000
              { id: 2, text: "15,000 ريال", isCorrect: false },
              { id: 3, text: "17,500 ريال", isCorrect: false },
            ],
            explanation:
              "الأجهزة 40٪ والتدريب 35٪ = 75٪؛ الباقي 25٪ من 50,000 = 12,500 ريال.",
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
  const [fontSize, setFontSize] = useState("normal");
  const [activeFilter, setActiveFilter] = useState("all");

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

  // Handle font size change
  const handleFontSizeChange = (newFontSize) => {
    setFontSize(newFontSize);
  };

  // Font size mapping
  const getFontSizeClass = (size) => {
    const sizeMap = {
      small: "text-sm",
      normal: "text-base",
      large: "text-lg",
      xlarge: "text-xl",
    };
    return sizeMap[size] || sizeMap.normal;
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
          testData={testData}
          answers={answers}
          setIsInReview={setIsInReview}
          markedForReview={markedForReview}
          onNavigateToQuestion={(sectionIndex, questionIndex) => {
            setCurrentSection(sectionIndex);
            setCurrentQuestion(questionIndex);
            setIsInReview(false);
          }}
          onBackToTest={() => setIsInReview(false)}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2  h-auto md:h-[calc(100vh-235px)]   gap-4 md:gap-[32px] ]">
          <div className="bg-white px-6 md:px-[64px] overflow-auto custom-scroll py-[32px]">
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
                fontSize={fontSize}
              />
            ) : (
              <VerbalSection />
            )}
          </div>

          <div className="bg-white  p-6  md:p-[64px]">
            {isStart ? (
              <p
                className={`flex flex-col font-normal text-[#be1919] ${getFontSizeClass(
                  fontSize
                )} tracking-[0] leading-[normal] [direction:rtl]`}
              >
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
          currentSection < testData.data.length - 1
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
