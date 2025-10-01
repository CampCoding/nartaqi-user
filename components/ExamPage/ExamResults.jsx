"use client";

import React, { useState } from "react";

const ExamResults = ({show , setShow}) => {
  const [activeTab, setActiveTab] = useState("all");

  const answeredQuestions = [
    {
      title: "السؤال الأول",
      question: "أي من الاستراتيجيات التالية تعزز التعلم النشط داخل الصف؟",
      answer: 2,
      explanation:
        "التعلم النشط قائم على إشراك الطلاب في النقاش والحوار وتبادل الأفكار.",
      answers: [
        { id: 0, text: "المحاضرة التقليدية فقط", isCorrect: false },
        { id: 1, text: "المناقشات التفاعلية بين الطلاب", isCorrect: true },
        { id: 2, text: "الحفظ والتلقين المباشر", isCorrect: false },
        { id: 3, text: "الاستماع الصامت للمعلم", isCorrect: false },
      ],
    },
    {
      title: "السؤال الثاني",
      question: "ما هي أفضل طريقة لتقييم الفهم؟",
      answer: 0,
      explanation: "التقييم المستمر والمتنوع يساعد على قياس الفهم بشكل أفضل.",
      answers: [
        { id: 0, text: "تقييمات مستمرة ومتنوعة", isCorrect: true },
        { id: 1, text: "اختبار واحد في نهاية الفصل", isCorrect: false },
        { id: 2, text: "الحضور فقط", isCorrect: false },
        { id: 3, text: "الواجبات المنزلية فقط", isCorrect: false },
      ],
    },
  ];

  // فلترة الأسئلة
  const filteredQuestions = answeredQuestions.filter((q) => {
    const correctId = q.answers.find((a) => a.isCorrect)?.id;
    if (activeTab === "correct") {
      return q.answer === correctId;
    } else if (activeTab === "wrong") {
      return q.answer !== correctId;
    }
    return true; // all
  });

  return (
    <div className="container mx-auto px-[64px] py-8">
      <Nanigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex flex-col gap-12 mt-8">
        {filteredQuestions.map((q, i) => (
          <AnsweredQuestion key={i} questionData={q} />
        ))}
      </div>

      <button onClick={()=> setShow(false)} className="mt-[56px] hover:scale-105 transition flex w-[234px] mr-auto items-center justify-center gap-2.5 px-20 py-6 rounded-[20px] bg-gradient-to-r from-primary to-secondary">
        <div className="font-bold text-white text-base leading-[50px]">
          إنهاء
        </div>
      </button>
    </div>
  );
};

export default ExamResults;

const Nanigation = ({ activeTab, setActiveTab }) => {
  const tabData = [
    { id: "all", label: "الكل" },
    { id: "correct", label: "الأسئلة الصحيحة" },
    { id: "wrong", label: "الأسئلة الخاطئة" },
  ];

  return (
    <div
      className="flex h-[110px] items-center justify-center gap-12 p-4 bg-[#ebf3fe] rounded-[30px]"
      role="tablist"
    >
      {tabData.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-16 py-4 rounded-[20px] transition-colors ${
            activeTab === tab.id
              ? "bg-blue-500 text-white font-bold"
              : "hover:bg-blue-100 text-gray-800"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export const AnsweredQuestion = ({ questionData }) => {
  return (
    <main className="flex flex-col items-start gap-14 px-20 py-8 bg-white rounded-[40px] border-[3px] border-solid border-variable-collection-stroke">
      {/* Header */}
      <header className="flex items-center justify-between w-full">
        <h1 className="font-bold text-secondary text-2xl">
          {questionData.title}
        </h1>
        <div
          className={`inline-flex items-center justify-center gap-2 px-12 py-4 rounded-[15px] ${
            questionData.answers.find((a) => a.isCorrect)?.id ===
            questionData.answer
              ? "bg-[#c9ffca] text-[#24ab28]"
              : "bg-[#FFC4C4] text-red-700"
          }`}
        >
          {questionData.answers.find((a) => a.isCorrect)?.id ===
          questionData.answer
            ? "صحيح"
            : "خطأ"}
        </div>
      </header>

      {/* Question */}
      <section className="flex flex-col items-start gap-6 w-full">
        <div className="flex flex-col w-[775px] gap-2">
          <h2 className="font-bold text-text text-base leading-[50px] whitespace-nowrap">
            {questionData.question}
          </h2>

          <fieldset className="flex flex-col w-[775px] gap-4">
            <legend className="sr-only">خيارات الإجابة</legend>

            {questionData.answers.map((answer, index) => {
              const isStudentAnswer = questionData.answer === answer.id;
              const isCorrect = answer.isCorrect;

              return (
                <div
                  key={answer.id}
                  className={`flex w-[841px] ${
                    index === 0 ? "ml-[-66px]" : ""
                  } items-center gap-4`}
                >
                  <label
                    className={`w-[775px] flex items-center gap-2 p-4 rounded-[20px] ${
                      isCorrect
                        ? "bg-[#c9ffca] "
                        : isStudentAnswer
                        ? "bg-[#FFC4C4]   text-red-700"
                        : "border-[3px] border-solid "
                    }`}
                  >
                    <div className="w-6 h-6">
                      {isCorrect ? (
                        <CorrectRadio />
                      ) : isStudentAnswer ? (
                        <WrongRadio />
                      ) : (
                        <NotSelectedIcon />
                      )}
                    </div>
                    <span
                      className={`text-base leading-[50px] ${
                        isCorrect
                          ? "font-semibold text-[#24ab28]"
                          : isStudentAnswer
                          ? "font-semibold text-red-700"
                          : "text-text"
                      }`}
                    >
                      {answer.text}
                    </span>
                  </label>

                  {/* أيقونة يمين توضح الصح أو الغلط */}
                  {isCorrect ? <CheckIcon /> : isStudentAnswer && <RoundedX />}
                </div>
              );
            })}
          </fieldset>
        </div>

        {/* Explanation */}
        <aside>
          <p className="text-base text-text">
            <span className="font-bold">الشرح: </span>
            {questionData.explanation}
          </p>
        </aside>
      </section>
    </main>
  );
};

const CheckIcon = (props) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_143_4488)">
      <path
        opacity={0.972}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5938 -0.03125C15.5104 -0.03125 16.4271 -0.03125 17.3438 -0.03125C23.3704 0.695044 27.7558 3.75754 30.5 9.15625C31.2938 10.8945 31.7834 12.707 31.9688 14.5938C31.9688 15.5104 31.9688 16.4271 31.9688 17.3438C31.2424 23.3704 28.1799 27.7558 22.7812 30.5C21.043 31.2938 19.2305 31.7834 17.3438 31.9688C16.4271 31.9688 15.5104 31.9688 14.5938 31.9688C8.56713 31.2424 4.18169 28.1799 1.4375 22.7812C0.6437 21.043 0.154119 19.2305 -0.03125 17.3438C-0.03125 16.4271 -0.03125 15.5104 -0.03125 14.5938C0.695044 8.56713 3.75754 4.18169 9.15625 1.4375C10.8945 0.6437 12.707 0.154119 14.5938 -0.03125ZM14.7188 2.53125C20.5007 2.27051 24.8654 4.60384 27.8125 9.53125C29.5566 12.8949 29.8899 16.3949 28.8125 20.0312C27.3021 24.375 24.375 27.3021 20.0312 28.8125C15.3995 30.1236 11.1911 29.3111 7.40625 26.375C3.47752 22.9233 1.92544 18.6003 2.75 13.4062C3.66275 9.3175 5.92317 6.22373 9.53125 4.125C11.1696 3.27309 12.8988 2.74184 14.7188 2.53125Z"
        fill="#24AC29"
      />
      <path
        opacity={0.963}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.0936 10.4688C23.2728 10.6816 23.6582 11.3483 23.2499 12.4688C20.4287 15.3524 17.5849 18.217 14.7186 21.0625C14.1605 21.5162 13.5772 21.5579 12.9686 21.1875C11.5832 19.8021 10.1978 18.4167 8.81236 17.0312C8.34848 16.3436 8.42142 15.7082 9.03111 15.125C9.52705 14.8364 10.027 14.8364 10.5311 15.125C11.604 16.1979 12.6769 17.2708 13.7499 18.3438C16.2603 15.8333 18.7707 13.3229 21.2811 10.8125C21.5295 10.6253 21.8003 10.5107 22.0936 10.4688Z"
        fill="#24AC29"
      />
    </g>
    <defs>
      <clipPath id="clip0_143_4488">
        <rect width={32} height={32} fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const RoundedX = (props) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      opacity={0.964}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.6565 1.96935C20.692 1.69979 25.244 4.13729 28.3128 9.28185C30.0786 12.6745 30.4536 16.2162 29.4378 19.9069C27.8857 24.7089 24.7086 27.886 19.9065 29.4381C15.0999 30.6936 10.7665 29.7769 6.90652 26.6881C3.0286 23.2017 1.43485 18.858 2.12527 13.6569C3.11964 8.64266 5.94255 5.09055 10.594 3.0006C11.9112 2.47718 13.2653 2.13343 14.6565 1.96935ZM15.9065 3.96935C20.7118 4.17781 24.2847 6.36529 26.6253 10.5319C28.1454 13.711 28.312 16.961 27.1253 20.2819C25.4655 24.2121 22.5592 26.6809 18.4065 27.6881C14.0724 28.4308 10.3536 27.2537 7.25027 24.1569C4.03179 20.4729 3.21929 16.3062 4.81277 11.6569C6.47258 7.7266 9.37883 5.25783 13.5315 4.2506C14.3266 4.10427 15.1183 4.01052 15.9065 3.96935Z"
      fill="#BE1A1A"
    />
    <path
      opacity={0.954}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.8447 9.15368C10.2079 9.1083 10.5413 9.18124 10.8447 9.37243C12.5434 11.0816 14.2518 12.7796 15.9697 14.4662C17.6876 12.7796 19.3959 11.0816 21.0947 9.37243C21.6667 9.02436 22.1771 9.0973 22.6259 9.59118C22.8454 10.0207 22.8246 10.4374 22.5634 10.8412C20.8543 12.5399 19.1563 14.2483 17.4697 15.9662C19.1563 17.6841 20.8543 19.3924 22.5634 21.0912C22.9115 21.6632 22.8386 22.1736 22.3447 22.6224C21.9151 22.8419 21.4984 22.8211 21.0947 22.5599C19.3959 20.8507 17.6876 19.1528 15.9697 17.4662C14.2518 19.1528 12.5434 20.8507 10.8447 22.5599C10.2727 22.908 9.76226 22.8351 9.31345 22.3412C9.09395 21.9116 9.11476 21.4949 9.37595 21.0912C11.0851 19.3924 12.7831 17.6841 14.4697 15.9662C12.7831 14.2483 11.0851 12.5399 9.37595 10.8412C8.96457 10.1167 9.12082 9.55418 9.8447 9.15368Z"
      fill="#BE1A1A"
    />
  </svg>
);

const CorrectRadio = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12ZM22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12Z"
      fill="#24AC29"
    />
    <path
      d="M17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12Z"
      fill="#24AC29"
    />
  </svg>
);

const WrongRadio = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12ZM22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12Z"
      fill="#BE1A1A"
    />
    <path
      d="M17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12Z"
      fill="#BE1A1A"
    />
  </svg>
);

const NotSelectedIcon = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12ZM22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12Z"
      fill="#71717A"
    />
  </svg>
);
