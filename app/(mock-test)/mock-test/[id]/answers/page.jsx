"use client";

import React, { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import useGetStudentExamAnswers from "../../../../../components/shared/Hooks/getStudentAnswersByExamId";
import { MockExamHeader } from "../../../../../components/MockTestPage/MockTestHeader";
import { MockTestFooter } from "../../../../../components/MockTestPage/MockTestFooter";

const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen bg-primary">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mx-auto mb-4"></div>
      <div className="text-white text-2xl font-bold">
        جاري تحميل الإجابات...
      </div>
    </div>
  </div>
);

const ErrorScreen = ({ message, onBack }) => (
  <div className="flex items-center justify-center min-h-screen bg-primary px-4">
    <div className="bg-white rounded-[30px] p-8 md:p-12 max-w-lg w-full shadow-2xl text-center">
      <h2 className="text-2xl font-bold text-text mb-3">تعذر جلب الإجابات</h2>
      <p className="text-text-alt leading-relaxed mb-8">{message}</p>
      <button
        onClick={onBack}
        className="w-full py-4 bg-primary text-white rounded-xl font-medium text-lg hover:opacity-90 transition-opacity"
      >
        الرجوع
      </button>
    </div>
  </div>
);

const OptionItem = ({ option, isCorrect, isStudentChoice , state }) => {
  const base =
    "w-full text-right border rounded-2xl px-4 py-3 transition-colors";

  const stateClass = isCorrect
    ? "border-green-500 bg-green-50 text-green-800"
    : isStudentChoice
    ? "border-red-500 bg-red-50 text-red-800"
    : "border-gray-200 bg-white text-text";

  return (
    <div className={`${base} ${stateClass}`}>
      <div
        className="ql-editor prose prose-neutral"
        dangerouslySetInnerHTML={{
          __html: option?.option_text?.replaceAll?.(/&nbsp;/gi, " ") || "",
        }}
      />
      <div className="flex justify-end gap-2 mt-2 text-sm font-medium">
        {isCorrect && <span className="text-green-700">الإجابة الصحيحة</span>}
        {isStudentChoice && !isCorrect && (
          <span className="text-red-700">إجابتك</span>
        )}
      </div>
    </div>
  );
};

const QuestionCard = ({ question, index, fontSize }) => {
  const options = question?.options || [];
  const studentChoice = question?.student_answer;
  const correctChoice = question?.correct_option_id;

  const studentOption = options.find((opt) => opt.id === studentChoice);
  const correctOption = options.find((opt) => opt.id === correctChoice);

  const explanationHtml =
    correctOption?.question_explanation || question?.question_explanation || "";

  return (
    <div className=" p-5 md:p-6 ">
      <div className="flex justify-between items-start gap-3 mb-4">
        <div className="flex-1 text-right">
          <p className="text-sm text-text-alt mb-1">سؤال {index}</p>
          <div
            className={` prose prose-neutral text-text font-semibold leading-relaxed ql-editor p-0 m-0 ${
              fontSize === "small"
                ? "text-sm"
                : fontSize === "large"
                ? "text-lg"
                : fontSize === "xlarge"
                ? "text-xl"
                : "text-base"
            }`}
            dangerouslySetInnerHTML={{
              __html:
                question?.question_text?.replaceAll?.(/&nbsp;/gi, " ") || "",
            }}
          />
        </div>
        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
          {question?.question_type === "paragraph_mcq"
            ? "سؤال فقرة"
            : "اختيار من متعدد"}
        </span>
      </div>

      <div className="space-y-3">
          {options.map((opt) => {



              const isCorrect = opt.id === question.correct_option_id;






          return (
            <OptionItem
              state={isCorrect} // false or true
              key={opt.id}
              option={opt}
              isCorrect={+opt.id == +correctChoice}
              isStudentChoice={+opt.id == +question.student_answer}
              />
          );
        })}
      </div>

      {(studentOption || correctOption || explanationHtml) && (
        <div className="mt-6 pt-4 border-t border-gray-200 space-y-3 text-right">
          {studentOption && (
            <div>
              <p className="text-sm font-semibold text-text mb-1">إجابتك:</p>
              <div
                className={` prose prose-neutral ql-editor p-0 m-0 text-text-alt ${
                  fontSize === "small"
                    ? "text-sm"
                    : fontSize === "large"
                    ? "text-lg"
                    : fontSize === "xlarge"
                    ? "text-xl"
                    : "text-base"
                }`}
                dangerouslySetInnerHTML={{
                  __html:
                    studentOption.option_text?.replaceAll?.(/&nbsp;/gi, " ") ||
                    "",
                }}
              />
            </div>
          )}

          {correctOption && (
            <div>
              <p className="text-sm font-semibold text-green-700 mb-1">
                الإجابة الصحيحة:
              </p>
              <div
                className={` prose prose-neutral ql-editor p-0 m-0 text-green-800 ${
                  fontSize === "small"
                    ? "text-sm"
                    : fontSize === "large"
                    ? "text-lg"
                    : fontSize === "xlarge"
                    ? "text-xl"
                    : "text-base"
                }`}
                dangerouslySetInnerHTML={{
                  __html:
                    correctOption.option_text?.replaceAll?.(/&nbsp;/gi, " ") ||
                    "",
                }}
              />
            </div>
          )}

          {explanationHtml && (
            <div>
              <p className="text-sm font-semibold text-primary mb-1">
                التفسير:
              </p>
              <div
                className={` prose prose-neutral ql-editor p-0 m-0 text-text-alt ${
                  fontSize === "small"
                    ? "text-sm"
                    : fontSize === "large"
                    ? "text-lg"
                    : fontSize === "xlarge"
                    ? "text-xl"
                    : "text-base"
                }`}
                dangerouslySetInnerHTML={{
                  __html: explanationHtml.replaceAll?.(/&nbsp;/gi, " ") || "",
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const AnswersPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const user = useSelector((state) => state?.auth?.user);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fontSize, setFontSize] = useState("normal");

  const { sections, loading, error, isSolved, lastStudentScore, examInfo } =
    useGetStudentExamAnswers({
      studentId: user?.id,
      examId: id,
    });

  const flatQuestions = useMemo(() => {
    const items = [];

    sections.forEach((sec) => {
      const title = sec?.title?.replaceAll?.(/&nbsp;/gi, " ") || "";
      const description = sec?.description?.replaceAll?.(/&nbsp;/gi, " ") || "";

      (sec?.paragraphs || []).forEach((paragraphBlock) => {
        const paragraphContent =
          paragraphBlock?.paragraph?.paragraph_content?.replaceAll?.(
            /&nbsp;/gi,
            " "
          ) || "";

        (paragraphBlock?.questions || []).forEach((q) => {
          items.push({
            sectionTitle: title,
            sectionDescription: description,
            paragraphContent,
            question: q,
            isParagraph: true,
          });
        });
      });

      (sec?.mcq || []).forEach((q) => {
        items.push({
          sectionTitle: title,
          sectionDescription: description,
          paragraphContent: null,
          question: q,
          isParagraph: false,
        });
      });
    });

    return items;
  }, [sections]);

  const totalQuestions = flatQuestions.length;

  const lastScoreLabel = useMemo(() => {
    if (!lastStudentScore) return null;

    if (
      typeof lastStudentScore === "string" ||
      typeof lastStudentScore === "number"
    ) {
      return String(lastStudentScore);
    }

    if (typeof lastStudentScore === "object") {
      if (lastStudentScore.score) return String(lastStudentScore.score);
      try {
        return JSON.stringify(lastStudentScore);
      } catch (e) {
        return null;
      }
    }

    return null;
  }, [lastStudentScore]);

  if (loading) return <LoadingScreen />;
  if (error)
    return <ErrorScreen message={error} onBack={() => router.back()} />;

  const currentItem = flatQuestions[currentIndex];
  const questionNumber = currentIndex + 1;
  const progressText = `سؤال ${questionNumber} من ${totalQuestions}`;

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalQuestions - 1));
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="bg-primary min-h-screen flex flex-col">
      <MockExamHeader
        drawerPlacement="right"
        isInReview={false}
        setInReview={() => {}}
        timeRemaining={"--:--"}
        questionProgress={progressText}
        onMarkForReview={() => {}}
        isMarkedForReview={false}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
      />

      <main className="flex-1  shadow-2xl !h-full">
        <div className="grid grid-cols-1  md:grid-cols-2 gap-4 h-auto md:h-[calc(100vh-235px)] md:gap-8">
          <div className="bg-white !h-full px-6 md:px-10 overflow-y-auto custom-scroll py-6  ">
            {currentItem ? (
              <>
                {currentItem.paragraphContent && (
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 md:p-5 mb-4">
                    <div
                      className=" prose prose-neutral text-right text-text ql-editor p-0 m-0"
                      dangerouslySetInnerHTML={{
                        __html: currentItem.paragraphContent,
                      }}
                    />
                  </div>
                )}

                <QuestionCard
                  question={currentItem.question}
                  index={questionNumber}
                  fontSize={fontSize}
                />
              </>
            ) : (
              <div className="text-center text-text font-semibold py-10">
                لا توجد أسئلة متاحة لهذا الاختبار.
              </div>
            )}
          </div>

          <div className="bg-white !h-full p-8 md:p-12   flex items-start">
            {currentItem && (
              <div
                className={`text-right text-[#be1919] ${
                  fontSize === "small"
                    ? "text-sm"
                    : fontSize === "large"
                    ? "text-lg"
                    : fontSize === "xlarge"
                    ? "text-xl"
                    : "text-base"
                } leading-relaxed w-full`}
              >
                <h3
                  className={` prose prose-neutral ${
                    fontSize === "small"
                      ? "text-lg"
                      : fontSize === "large"
                      ? "text-xl"
                      : fontSize === "xlarge"
                      ? "text-2xl"
                      : "text-lg"
                  } font-bold w-full grid grid-cols-1 mb-4 !whitespace-normal ql-editor p-0 m-0`}
                  dangerouslySetInnerHTML={{
                    __html: currentItem.sectionTitle,
                  }}
                />
                {/* <p className="font-medium">
                    {currentItem.sectionDescription}
                  </p> */}
                <p
                  className="font-medium prose prose-neutral"
                  dangerouslySetInnerHTML={{
                    __html: currentItem.sectionDescription.replaceAll(
                      /&nbsp;/gi,
                      " "
                    ),
                  }}
                />

                <div className="mt-4 flex flex-wrap gap-2 text-sm text-text-alt">
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-text">
                    {progressText}
                  </span>
                  {lastScoreLabel && (
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">
                      نتيجتك الأخيرة: {lastScoreLabel}
                    </span>
                  )}
                  <span
                    className={`px-3 py-1 rounded-full ${
                      isSolved
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {isSolved ? "تم الحل" : "لم يتم الحل بعد"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <MockTestFooter
        isStart={true}
        setIsStart={() => {}}
        isInReview={false}
        setIsInReview={() => {}}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={() => {}}
        canGoPrevious={currentIndex > 0}
        canGoNext={currentIndex < totalQuestions - 1}
        isLastQuestion={currentIndex === totalQuestions - 1}
        isLastSection={currentIndex === totalQuestions - 1}
        fontSize={fontSize}
        activeFilter="all"
        setActiveFilter={() => {}}
      />
    </div>
  );
};

export default AnswersPage;
