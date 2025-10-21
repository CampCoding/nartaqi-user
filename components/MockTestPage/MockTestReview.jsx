import React, { useState, useEffect } from "react";
import { InfoIcon } from "./../../public/svgs";

const MockTestReview = ({
  testData,
  answers,
  markedForReview,
  onNavigateToQuestion,
  onBackToTest,
  activeFilter,
  setActiveFilter,
}) => {
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  // Calculate question statistics
  const totalQuestions =
    testData?.data.reduce(
      (total, section) => total + section.questions.length,
      0
    ) || 0;

  const completedQuestions = Object.keys(answers).length;
  const flaggedQuestions = markedForReview.size;
  const incompleteQuestions = totalQuestions - completedQuestions;

  // Filter questions based on active filter
  useEffect(() => {
    if (!testData?.data) return;

    let questions = [];
    let questionNumber = 1;

    testData.data.forEach((section, sectionIndex) => {
      section.questions.forEach((question, questionIndex) => {
        const answerKey = `${sectionIndex}-${questionIndex}`;
        const isAnswered = answers[answerKey] !== undefined;
        const isFlagged = markedForReview.has(answerKey);

        questions.push({
          ...question,
          questionNumber,
          sectionIndex,
          questionIndex,
          answerKey,
          isAnswered,
          isFlagged,
          sectionName: section.section,
        });

        questionNumber++;
      });
    });

    // Apply filter
    switch (activeFilter) {
      case "flagged":
        questions = questions.filter((q) => q.isFlagged);
        break;
      case "incomplete":
        questions = questions.filter((q) => !q.isAnswered);
        break;
      case "all":
      default:
        break;
    }

    setFilteredQuestions(questions);
  }, [testData, answers, markedForReview, activeFilter]);

  const handleQuestionClick = (question) => {
    if (onNavigateToQuestion) {
      onNavigateToQuestion(question.sectionIndex, question.questionIndex);
    }
  };

  const getFilteredCount = () => {
    switch (activeFilter) {
      case "flagged":
        return flaggedQuestions;
      case "incomplete":
        return incompleteQuestions;
      case "all":
      default:
        return totalQuestions;
    }
  };

  const getFilteredLabel = () => {
    switch (activeFilter) {
      case "flagged":
        return "أسئلة مميزة";
      case "incomplete":
        return "أسئلة غير مكتملة";
      case "all":
      default:
        return "جميع الأسئلة";
    }
  };

  return (
    <div className="min-h-screen bg-white pt-[48px] pb-[32px]">
      <div className="container max-w-[1312px] mx-auto">
        <div className="text-center mb-[16px] justify-center text-text text-3xl font-bold leading-[50px]">
          قسم المراجعة
        </div>

        <div className="w-full px-6 py-4 bg-primary-light rounded-2xl inline-flex justify-start items-center gap-4 mb-[24px]">
          <div className="flex justify-start items-center gap-4">
            <InfoIcon />
            <div className="text-right justify-center text-primary text-2xl font-semibold leading-[50px]">
              التعليمات
            </div>
          </div>
        </div>

        <div className="text-right justify-center">
          <span className="text-black text-base font-bold">
            فيما يلي ملخص الإجاباتك يمكنك مراجعة اسئلتك بثلاث (3) طرق مختلفة
          </span>
          <span className="text-black text-base font-medium leading-loose">
            <br />
            الأزرار الموجودة في الركن السفلي الأيسر تطابق هذه الخيارات:
            <br />
            <br />
            1- زر مراجعة الكل: قم بمراجعة كل أسئلتك وإجاباتك
            <br />
            2- زر مراجعة الغير مكتمل: قم بمراجعة الأسئلة غير المكتملة.
            <br />
            3- زر المميز بعلامة: قم بمراجعة الأسئلة المميزة بعلامة للمراجعة،
            انقر فوق رمز التمييز لتغيير حالة المراجعة.
            <br />
            <br />
            يمكنك أيضاً النقر فوق رقم السؤال للانتقال مباشرة إلى موقعه في
            الاختبار.
          </span>
        </div>

        {/* Filter Buttons */}
        {/* <div className="flex flex-wrap gap-4 mt-8 mb-6 justify-center">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeFilter === "all"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            مراجعة الكل ({totalQuestions})
          </button>
          <button
            onClick={() => setActiveFilter("incomplete")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeFilter === "incomplete"
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            مراجعة الغير مكتمل ({incompleteQuestions})
          </button>
          <button
            onClick={() => setActiveFilter("flagged")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeFilter === "flagged"
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            مراجعة المميز بعلامة ({flaggedQuestions})
          </button>
        </div> */}

        {/* Statistics */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {totalQuestions}
              </div>
              <div className="text-sm text-blue-800">إجمالي الأسئلة</div>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {completedQuestions}
              </div>
              <div className="text-sm text-green-800">أسئلة مكتملة</div>
            </div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {flaggedQuestions}
              </div>
              <div className="text-sm text-orange-800">أسئلة مميزة</div>
            </div>
          </div>
        </div> */}

        {/* Section Header */}
        <div className="w-full px-6 py-4 bg-primary-light rounded-2xl inline-flex justify-between mt-[32px] items-center gap-4 mb-[24px]">
          <div className="flex justify-start items-center gap-4">
            <InfoIcon />
            <div className="text-right justify-center text-primary text-2xl font-semibold leading-[50px]">
              { "القسم اللفظي"}
            </div>
          </div>
          <div className="text-right justify-center text-text text-2xl font-semibold leading-[50px]">
            {getFilteredCount()} {getFilteredLabel()}
          </div>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-2 border-[#E4E4E7] rounded-[30px] overflow-hidden">
          {filteredQuestions.map((question) => (
            <Review
              key={question.answerKey}
              question={question}
              onClick={() => handleQuestionClick(question)}
            />
          ))}
        </div>

        {/* Back to Test Button */}
        {/* <div className="flex justify-center mt-8">
          <button
            onClick={onBackToTest}
            className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200 font-medium text-lg"
          >
            العودة إلى الاختبار
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default MockTestReview;

export const Review = ({ question, onClick }) => {
  const getStatusColor = () => {
    if (question.isAnswered) return "text-green-700";
    return "text-red-700";
  };

  const getStatusText = () => {
    if (question.isAnswered) return "مكتمل";
    return "غير مكتمل";
  };

  return (
    <div
      className="flex items-center justify-between border border-[#E4E4E7] !px-4 !py-6 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center justify-start gap-2 relative">
        {question.isFlagged ? <FilledFlagIcon /> : <OutlinedFlagIcon />}
        <div className="relative w-fit font-medium text-text text-base text-right tracking-[0] leading-[normal] whitespace-nowrap [direction:rtl]">
          سؤال {question.questionNumber}
        </div>
      </div>

      <div
        className={`justify-start text-base font-medium font-noto ${getStatusColor()}`}
      >
        {getStatusText()}
      </div>
    </div>
  );
};

const FilledFlagIcon = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.5 3V21"
      stroke="#3B82F6"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.5 4.5H12.5L16 6H19.5C19.7652 6 20.0196 6.10536 20.2071 6.29289C20.3946 6.48043 20.5 6.73478 20.5 7V15.5C20.5 15.7652 20.3946 16.0196 20.2071 16.2071C20.0196 16.3946 19.7652 16.5 19.5 16.5H16L12.5 15H5.5V4.5Z"
      fill="#3B82F6"
      stroke="#3B82F6"
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <path
      d="M3.5 21H7.5"
      stroke="#3B82F6"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const OutlinedFlagIcon = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.5 3V21"
      stroke="#3B82F6"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.5 4.5H12.5L16 6H19.5C19.7652 6 20.0196 6.10536 20.2071 6.29289C20.3946 6.48043 20.5 6.73478 20.5 7V15.5C20.5 15.7652 20.3946 16.0196 20.2071 16.2071C20.0196 16.3946 19.7652 16.5 19.5 16.5H16L12.5 15H5.5V4.5Z"
      stroke="#3B82F6"
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <path
      d="M3.5 21H7.5"
      stroke="#3B82F6"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
