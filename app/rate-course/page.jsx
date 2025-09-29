"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PagesBanner from "./../../components/ui/PagesBanner";
import { RatingQuestion } from "../../components/ReateCoursePage.jsx/RatingQuestion";
import RateDone from "./RateDone";

/* سؤال نصي بسيط */
function TextQuestion({
  id,
  question,
  value = "",
  onChange,
  placeholder = "اكتب رسالتك هنا",
  required,
  showError,
}) {
  return (
    <div className="flex flex-col gap-3" id={id}>
      <label className="px-4 text- font-bold leading-[50px] text-text ">
        {question}
        {required && <span className="text-red-600 mr-2">*</span>}
      </label>
      <textarea
        dir="rtl"
        className={`min-h-[120px] w-full rounded-[30px] border-[3px] px-4 py-4 outline-none focus:ring-2 ${
          showError
            ? "border-red-400 focus:ring-red-300"
            : "border-zinc-200 focus:ring-orange-300"
        }`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {showError && (
        <p className="text-sm text-red-600 px-4">هذا السؤال مطلوب</p>
      )}
    </div>
  );
}

/* صفحاتك كما هي (3 أسئلة لكل صفحة) */
const PAGES = [
  {
    title: "تقييمات عامة",
    questions: [
      {
        id: "recommend",
        type: "rating",
        question: "هل ترشح الدورة لأصدقائك؟",
        options: [
          { value: "yes", label: "نعم" },
          { value: "depends", label: "حسب المحتوى", allowText: false },
          { value: "no", label: "لا" },
        ],
        required: true,
        defaultValue: "yes",
      },
      {
        id: "staff_interaction",
        type: "rating",
        question: "ما رأيك في تفاعل المشرفين وتواجدهم بالتعليقات؟",
        options: [
          { value: "excellent", label: "ممتاز" },
          { value: "very_good", label: "جيد جدًا" },
          {
            value: "needs_improvement",
            label: "تحتاج إلى تحسين",
            allowText: false,
          },
        ],
        required: true,
      },
      {
        id: "response_speed",
        type: "rating",
        question: "ما رأيك في سرعة الاستجابة والرد على استفساراتك؟",
        options: [
          { value: "excellent", label: "ممتاز" },
          { value: "very_good", label: "جيد جدًا" },
          {
            value: "needs_improvement",
            label: "تحتاج إلى تحسين",
            allowText: false,
          },
        ],
        required: true,
      },
    ],
  },
  {
    title: "تقييم المنصة",
    questions: [
      {
        id: "platform_usability",
        type: "rating",
        question: "ما رأيك في سهولة التعامل مع المنصة؟",
        options: [
          { value: "easy", label: "سهلة" },
          { value: "normal", label: "متوسطة" },
          { value: "hard", label: "صعبة", allowText: false },
        ],
        required: true,
      },
      {
        id: "platform_notifications",
        type: "rating",
        question: "ما رأيك في الإشعارات والتذكيرات من خلال المنصة؟",
        options: [
          { value: "excellent", label: "ممتاز" },
          { value: "good", label: "جيدة" },
          { value: "weak", label: "تحتاج إلى تحسين", allowText: false },
        ],
        required: true,
      },
      {
        id: "platform_suggestions",
        type: "text",
        question: "ما الذي تقترحه للمنصة؟",
        placeholder: "اكتب ملاحظاتك هنا",
        required: false,
      },
    ],
  },
  {
    title: "تقييم المدرب",
    questions: [
      {
        id: "trainer_mastery",
        type: "rating",
        question: "ما مدى إلمام المدرب بالمادة العلمية؟",
        options: [
          { value: "excellent", label: "ممتاز" },
          { value: "very_good", label: "جيد جدًا" },
          {
            value: "needs_improvement",
            label: "تحتاج إلى تحسين",
            allowText: false,
          },
        ],
        required: true,
      },
      {
        id: "trainer_delivery",
        type: "rating",
        question: "ما رأيك في طريقة شرح المدرب؟",
        options: [
          { value: "excellent", label: "ممتاز" },
          { value: "very_good", label: "جيد جدًا" },
          {
            value: "needs_improvement",
            label: "تحتاج إلى تحسين",
            allowText: false,
          },
        ],
        required: true,
      },
      {
        id: "trainer_responses",
        type: "rating",
        question: "ما رأيك في طريقة الرد على استفسارات المتدربين؟",
        options: [
          { value: "excellent", label: "ممتاز" },
          { value: "very_good", label: "جيد جدًا" },
          {
            value: "needs_improvement",
            label: "تحتاج إلى تحسين",
            allowText: false,
          },
        ],
        required: true,
      },
    ],
  },
  {
    title: "تقييم الدورة",
    questions: [
      {
        id: "courses_overall",
        type: "rating",
        question: "ما رأيك في الدورات المقدمة من المنصة بشكل عام؟",
        options: [
          { value: "excellent", label: "ممتاز" },
          { value: "very_good", label: "جيد جدًا" },
          {
            value: "needs_improvement",
            label: "تحتاج إلى تحسين",
            allowText: false,
          },
        ],
        required: true,
      },
      {
        id: "course_kit",
        type: "rating",
        question: "ما رأيك في حقيبة الدورة؟",
        options: [
          { value: "excellent", label: "ممتاز" },
          { value: "very_good", label: "جيد جدًا" },
          {
            value: "needs_improvement",
            label: "تحتاج إلى تحسين",
            allowText: false,
          },
        ],
        required: true,
      },
      {
        id: "course_load",
        type: "rating",
        question:
          "ما رأيك في كم التطبيقات والواجبات والاختبارات التي تتضمنها الدورة؟",
        options: [
          { value: "many", label: "كثيرة" },
          { value: "acceptable", label: "مقبولة" },
          { value: "few", label: "قليلة" },
        ],
        required: true,
      },
    ],
  },
];

const isAnswered = (ans, type, required) => {
  if (!required) return true;
  if (type === "text") return typeof ans === "string" && ans.trim().length > 0;
  if (ans == null) return false;
  if (typeof ans === "object") return !!ans.value;
  return String(ans).length > 0;
};

export default function RateCoursePage() {
  const [isFinished, setIsFinished] = useState(false);

  // state: answers + لمس/Errors
  const [answers, setAnswers] = useState(() => {
    const init = {};
    for (const page of PAGES) {
      for (const q of page.questions) {
        if (q.defaultValue != null) init[q.id] = q.defaultValue;
      }
    }
    return init;
  });
  const [touched, setTouched] = useState({}); // { [id]: true }

  // refs لكل سؤال عشان نسكرول له لو ناقص
  const qRefs = useRef({}); // { [id]: HTMLElement }

  const handleChange = (qid) => (val) => {
    setAnswers((prev) => ({ ...prev, [qid]: val }));
    setTouched((t) => ({ ...t, [qid]: true }));
  };

  // حساب التقدم وإجابات مطلوبة ناقصة
  const flatQuestions = useMemo(() => PAGES.flatMap((p) => p.questions), []);

  const requiredTotal = flatQuestions.filter((q) => q.required).length;

  const requiredAnsweredCount = flatQuestions.filter((q) =>
    isAnswered(answers[q.id], q.type, q.required)
  ).length;

  const progress = Math.round((requiredAnsweredCount / requiredTotal) * 100);

  const missingRequired = flatQuestions.filter(
    (q) => q.required && !isAnswered(answers[q.id], q.type, q.required)
  );
  const allRequiredAnswered = missingRequired.length === 0;

  const handleSubmit = async () => {
    if (!allRequiredAnswered) {
      // سكروول لأول سؤال ناقص
      const first = missingRequired[0];
      const node = qRefs.current[first.id];
      node?.scrollIntoView({ behavior: "smooth", block: "center" });
      // علّم كل الناقص كمّس
      setTouched((t) => ({
        ...t,
        ...Object.fromEntries(missingRequired.map((q) => [q.id, true])),
      }));
      return;
    }
    console.log("Submitted answers:", answers);
    setIsFinished(true);
    alert("تم إرسال التقييم بنجاح ✅");
  };

  return (
    <div>
      <PagesBanner
        title={"تقييم الدورة"}
        image={"/images/Frame 1000004881 (2).png"}
        variant="normal"
        objectPosition={"top"}
        breadcrumb={[
          { title: "الرئيسية", link: "/" },
          { title: "تقييم الدورة", link: "/rate-course" },
        ]}
      />

      {isFinished ? (
        <div className="mt-[95px]">
          <RateDone />
        </div>
      ) : (
        <div className="container px-[64px] mx-auto mt-[48px] mb-[100px]" dir="rtl">
          {/* كل الأقسام وكل الأسئلة */}
          <div className="flex flex-col gap-[56px]">
            {PAGES.map((page) => (
              <section key={page.title} className="flex flex-col gap-6">
                {/* عنوان القسم */}
                <div className="flex w-full items-center justify-center px-16 py-6 rounded-[30px] bg-gradient-to-r from-primary to-secondary">
                  <div className="text-white font-bold text-[24px] md:text-[24px] leading-[50px]">
                    {page.title}
                  </div>
                </div>

                {/* أسئلة القسم */}
                <div className="flex flex-col gap-[24px]">
                  {page.questions.map((q) => {
                    const showError =
                      touched[q.id] &&
                      q.required &&
                      !isAnswered(answers[q.id], q.type, q.required);

                    return (
                      <div key={q.id} ref={(el) => (qRefs.current[q.id] = el)}>
                        {q.type === "text" ? (
                          <TextQuestion
                            id={q.id}
                            question={q.question}
                            value={answers[q.id] || ""}
                            onChange={handleChange(q.id)}
                            placeholder={q.placeholder}
                            required={q.required}
                            showError={showError}
                          />
                        ) : (
                          <>
                            <RatingQuestion
                              question={q.question}
                              options={q.options}
                              value={answers[q.id]}
                              defaultValue={q.defaultValue}
                              onChange={handleChange(q.id)}
                              required={q.required}
                            />
                            {showError && (
                              <p className="text-sm text-red-600 px-4 mt-1">
                                هذا السؤال مطلوب
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* زر إرسال فقط */}
          <div className="mt-10 flex items-center">
            <button
              onClick={handleSubmit}
              disabled={!allRequiredAnswered}
              className=" w-full text-white ml-auto flex  items-center justify-center gap-2.5 px-8 py-4 rounded-[30px]
                        bg-gradient-to-r from-primary to-secondary
                         disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 transition"
              type="button"
              aria-label="إرسال"
            >
              <span className="font-bold text-[22px] md:text-[24px] leading-[50px]">
                إرسال
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// "use client";

// import { useMemo, useState, useEffect } from "react";
// import PagesBanner from "./../../components/ui/PagesBanner";
// import { RatingQuestion } from "../../components/ReateCoursePage.jsx/RatingQuestion";
// import RateDone from "./RateDone";

// /* ✅ Renderer بسيط لسؤال نصي (textarea) */
// function TextQuestion({
//   id,
//   question,
//   value = "",
//   onChange,
//   placeholder = "اكتب رسالتك هنا",
//   required,
// }) {
//   return (
//     <div className="flex flex-col gap-3">
//       <label className="px-4 text-2xl font-bold leading-[50px] text-text ">
//         {question}
//         {required && <span className="text-red-600 mr-2">*</span>}
//       </label>
//       <textarea
//         dir="rtl"
//         className="min-h-[120px] w-full rounded-[30px] border-[3px] border-zinc-200 px-4 py-4 outline-none focus:ring-2 focus:ring-orange-300"
//         placeholder={placeholder}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//       />
//     </div>
//   );
// }

// /* ✅ تعريف الصفحات (3 أسئلة لكل صفحة) */
// const PAGES = [
//   {
//     title: "تقييمات عامة",
//     questions: [
//       {
//         id: "recommend",
//         type: "rating",
//         question: "هل ترشح الدورة لأصدقائك؟",
//         options: [
//           { value: "yes", label: "نعم" },
//           { value: "depends", label: "حسب المحتوى", allowText: false },
//           { value: "no", label: "لا" },
//         ],
//         required: true,
//         defaultValue: "yes",
//       },
//       {
//         id: "staff_interaction",
//         type: "rating",
//         question: "ما رأيك في تفاعل المشرفين وتواجدهم بالتعليقات؟",
//         options: [
//           { value: "excellent", label: "ممتاز" },
//           { value: "very_good", label: "جيد جدًا" },
//           {
//             value: "needs_improvement",
//             label: "تحتاج إلى تحسين",
//             allowText: false,
//           },
//         ],
//         required: true,
//       },
//       {
//         id: "response_speed",
//         type: "rating",
//         question: "ما رأيك في سرعة الاستجابة والرد على استفساراتك؟",
//         options: [
//           { value: "excellent", label: "ممتاز" },
//           { value: "very_good", label: "جيد جدًا" },
//           {
//             value: "needs_improvement",
//             label: "تحتاج إلى تحسين",
//             allowText: false,
//           },
//         ],
//         required: true,
//       },
//     ],
//   },
//   {
//     title: "تقييم المنصة",
//     questions: [
//       {
//         id: "platform_usability",
//         type: "rating",
//         question: "ما رأيك في سهولة التعامل مع المنصة؟",
//         options: [
//           { value: "easy", label: "سهلة" },
//           { value: "normal", label: "متوسطة" },
//           { value: "hard", label: "صعبة", allowText: false },
//         ],
//         required: true,
//       },
//       {
//         id: "platform_notifications",
//         type: "rating",
//         question: "ما رأيك في الإشعارات والتذكيرات من خلال المنصة؟",
//         options: [
//           { value: "excellent", label: "ممتاز" },
//           { value: "good", label: "جيدة" },
//           { value: "weak", label: "تحتاج إلى تحسين", allowText: false },
//         ],
//         required: true,
//       },
//       {
//         id: "platform_suggestions",
//         type: "text",
//         question: "ما الذي تقترحه للمنصة؟",
//         placeholder: "اكتب ملاحظاتك هنا",
//         required: false,
//       },
//     ],
//   },
//   {
//     title: "تقييم المدرب",
//     questions: [
//       {
//         id: "trainer_mastery",
//         type: "rating",
//         question: "ما مدى إلمام المدرب بالمادة العلمية؟",
//         options: [
//           { value: "excellent", label: "ممتاز" },
//           { value: "very_good", label: "جيد جدًا" },
//           {
//             value: "needs_improvement",
//             label: "تحتاج إلى تحسين",
//             allowText: false,
//           },
//         ],
//         required: true,
//       },
//       {
//         id: "trainer_delivery",
//         type: "rating",
//         question: "ما رأيك في طريقة شرح المدرب؟",
//         options: [
//           { value: "excellent", label: "ممتاز" },
//           { value: "very_good", label: "جيد جدًا" },
//           {
//             value: "needs_improvement",
//             label: "تحتاج إلى تحسين",
//             allowText: false,
//           },
//         ],
//         required: true,
//       },
//       {
//         id: "trainer_responses",
//         type: "rating",
//         question: "ما رأيك في طريقة الرد على استفسارات المتدربين؟",
//         options: [
//           { value: "excellent", label: "ممتاز" },
//           { value: "very_good", label: "جيد جدًا" },
//           {
//             value: "needs_improvement",
//             label: "تحتاج إلى تحسين",
//             allowText: false,
//           },
//         ],
//         required: true,
//       },
//     ],
//   },
//   {
//     title: "تقييم الدورة",
//     questions: [
//       {
//         id: "courses_overall",
//         type: "rating",
//         question: "ما رأيك في الدورات المقدمة من المنصة بشكل عام؟",
//         options: [
//           { value: "excellent", label: "ممتاز" },
//           { value: "very_good", label: "جيد جدًا" },
//           {
//             value: "needs_improvement",
//             label: "تحتاج إلى تحسين",
//             allowText: false,
//           },
//         ],
//         required: true,
//       },
//       {
//         id: "course_kit",
//         type: "rating",
//         question: "ما رأيك في حقيبة الدورة؟",
//         options: [
//           { value: "excellent", label: "ممتاز" },
//           { value: "very_good", label: "جيد جدًا" },
//           {
//             value: "needs_improvement",
//             label: "تحتاج إلى تحسين",
//             allowText: false,
//           },
//         ],
//         required: true,
//       },
//       {
//         id: "course_load",
//         type: "rating",
//         question:
//           "ما رأيك في كم التطبيقات والواجبات والاختبارات التي تتضمنها الدورة؟",
//         options: [
//           { value: "many", label: "كثيرة" },
//           { value: "acceptable", label: "مقبولة" },
//           { value: "few", label: "قليلة" },
//         ],
//         required: true,
//       },
//     ],
//   },
// ];

// /* ✅ Helpers */
// const isAnswered = (ans, type, required) => {
//   if (!required) return true; // غير مطلوب → اعتبره مُجاب
//   if (type === "text") return typeof ans === "string" && ans.trim().length > 0;
//   if (ans == null) return false;
//   if (typeof ans === "object") return !!ans.value; // النص اختياري
//   return String(ans).length > 0;
// };

// export default function RateCoursePage() {
//   const [page, setPage] = useState(0);
//   const [isFinished, setIsFinished] = useState(false);
//   // answers: { [id]: string | {value, text} }
//   const [answers, setAnswers] = useState(() => {
//     const init = {};
//     for (const p of PAGES) {
//       for (const q of p.questions) {
//         if (q.defaultValue != null) init[q.id] = q.defaultValue;
//       }
//     }
//     return init;
//   });

//   useEffect(() => {
//     if (typeof window !== "undefined")
//       window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [page]);

//   const currentPage = PAGES[page];
//   const totalPages = PAGES.length;

//   const pageAllAnswered = currentPage.questions.every((q) =>
//     isAnswered(answers[q.id], q.type, q.required)
//   );

//   const handleChange = (qid) => (val) =>
//     setAnswers((prev) => ({ ...prev, [qid]: val }));

//   const onFirst = page === 0;
//   const onLast = page === totalPages - 1;

//   const handlePrev = () => !onFirst && setPage((p) => p - 1);
//   const handleNext = () => pageAllAnswered && !onLast && setPage((p) => p + 1);
//   const handleSubmit = async () => {
//     if (!pageAllAnswered || !onLast) return;
//     // TODO: استبدل الـ endpoint ببتاعك
//     console.log("Submitted answers:", answers);
//     setIsFinished(true);
//     alert("تم إرسال التقييم بنجاح ✅");
//   };

//   // تقدّم إجمالي (بعدد الأسئلة المجيبة)
//   const totalQs = PAGES.reduce((n, pg) => n + pg.questions.length, 0);
//   const answeredCount = PAGES.reduce(
//     (n, pg) =>
//       n +
//       pg.questions.filter((q) => isAnswered(answers[q.id], q.type, q.required))
//         .length,
//     0
//   );
//   const progress = Math.round((answeredCount / totalQs) * 100);

//   return (
//     <div>
//       <PagesBanner
//         title={"تقييم الدورة"}
//         image={"/images/Frame 1000004881 (2).png"}
//         variant="normal"
//         objectPosition={"top"}
//         breadcrumb={[
//           { title: "الرئيسية", link: "/" },
//           { title: "تقييم الدورة", link: "/rate-course" },
//         ]}
//       />

//       {isFinished ? (
//         <div className="mt-[95px]">
//         <RateDone />
//         </div>
//       ) : (
//         <div className="container px-[64px] mx-auto my-[56px]" dir="rtl">
//           {/* Header (مطابق للصور) */}
//           <div className="mb-[24px] flex w-full items-center justify-center px-16 py-6 rounded-[30px] bg-[linear-gradient(90deg,rgba(59,130,246,1)_0%,rgba(249,115,22,1)_100%)]">
//             <div className="text-white font-bold text-[24px] md:text-[28px] leading-[50px]">
//               {currentPage.title}
//             </div>
//           </div>

//           {/* Progress */}
//           <div className="mb-6">
//             <div className="flex justify-between text-sm text-alt mb-2">
//               <span>
//                 الصفحة {page + 1} من {totalPages}
//               </span>
//               <span>{progress}% مكتمل</span>
//             </div>
//             <div className="h-2 rounded-full bg-zinc-200 overflow-hidden">
//               <div
//                 className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
//                 style={{ width: `${progress}%` }}
//               />
//             </div>
//           </div>

//           {/* 3 أسئلة في الصفحة */}
//           <div className="flex flex-col gap-[24px] md:gap-[36px]">
//             {currentPage.questions.map((q) =>
//               q.type === "text" ? (
//                 <TextQuestion
//                   key={q.id}
//                   id={q.id}
//                   question={q.question}
//                   value={answers[q.id] || ""}
//                   onChange={handleChange(q.id)}
//                   placeholder={q.placeholder}
//                   required={q.required}
//                 />
//               ) : (
//                 <RatingQuestion
//                   key={q.id}
//                   question={q.question}
//                   options={q.options}
//                   value={answers[q.id]}
//                   defaultValue={q.defaultValue}
//                   onChange={handleChange(q.id)}
//                   // helperText="يمكنك تعديل اختيارك لاحقًا."
//                   required={q.required}
//                 />
//               )
//             )}
//           </div>

//           {/* أزرار التنقّل بنفس الستايل */}
//           <div className="mt-10 flex items-center gap-4">
//             <button
//               onClick={handlePrev}
//               disabled={onFirst}
//               className="flex w-[180px] md:w-[220px] items-center justify-center gap-2.5 px-8 py-4 relative bg-white rounded-[30px] border-none
//                        before:content-[''] before:absolute before:inset-0 before:p-[3px] before:rounded-[30px]
//                        before:[background:linear-gradient(90deg,rgba(59,130,246,1)_0%,rgba(249,115,22,1)_100%)]
//                        before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]
//                        before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none
//                        disabled:opacity-40 disabled:cursor-not-allowed transition hover:scale-105"
//               type="button"
//               aria-label="رجوع - العودة للخلف"
//             >
//               <span
//                 className="relative font-bold text-[22px] md:text-[24px] leading-[50px]
//                              bg-[linear-gradient(90deg,rgba(59,130,246,1)_0%,rgba(249,115,22,1)_100%)]
//                              [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent]"
//               >
//                 رجوع
//               </span>
//             </button>

//             {!onLast && (
//               <button
//                 onClick={handleNext}
//                 disabled={!pageAllAnswered}
//                 className="text-white mr-auto flex w-[180px] md:w-[220px] items-center justify-center gap-2.5 px-8 py-4 rounded-[30px]
//                          bg-[linear-gradient(90deg,rgba(59,130,246,1)_0%,rgba(249,115,22,1)_100%)]
//                          disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 transition"
//                 type="button"
//                 aria-label="التالي"
//               >
//                 <span className="font-bold text-[22px] md:text-[24px] leading-[50px]">
//                   التالي
//                 </span>
//               </button>
//             )}

//             {onLast && (
//               <button
//                 onClick={handleSubmit}
//                 disabled={!pageAllAnswered}
//                 className="text-white mr-auto flex w-[180px] md:w-[220px] items-center justify-center gap-2.5 px-8 py-4 rounded-[30px]
//                          bg-[linear-gradient(90deg,rgba(59,130,246,1)_0%,rgba(249,115,22,1)_100%)]
//                          disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 transition"
//                 type="button"
//                 aria-label="إرسال"
//               >
//                 <span className="font-bold text-[22px] md:text-[24px] leading-[50px]">
//                   إرسال
//                 </span>
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
