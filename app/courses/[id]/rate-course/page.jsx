"use client";

import { useMemo, useRef, useState } from "react";
import PagesBanner from "../../../../components/ui/PagesBanner";
import { RatingQuestion } from "../../../../components/ReateCoursePage.jsx/RatingQuestion";
import RateDone from "./RateDone";
import Container from "../../../../components/ui/Container";

/* Simple Text Question */
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
    <div className="flex flex-col gap-2" id={id}>
      <label className="px-4 text-base md:text-lg font-bold leading-normal text-text">
        {question}
        {required && <span className="text-red-600 mr-2">*</span>}
      </label>
      <textarea
        dir="rtl"
        className={`min-h-[100px] w-full rounded-[25px] border-2 px-4 py-3 outline-none focus:ring-2 ${
          showError
            ? "border-red-400 focus:ring-red-300"
            : "border-zinc-200 focus:ring-orange-300"
        }`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {showError && (
        <p className="text-xs text-red-600 px-4">هذا السؤال مطلوب</p>
      )}
    </div>
  );
}

/* Your pages (3 questions per page) */
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
  // ... other pages remain the same
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

  const [answers, setAnswers] = useState(() => {
    const init = {};
    for (const page of PAGES) {
      for (const q of page.questions) {
        if (q.defaultValue != null) init[q.id] = q.defaultValue;
      }
    }
    return init;
  });
  const [touched, setTouched] = useState({});

  const qRefs = useRef({});

  const handleChange = (qid) => (val) => {
    setAnswers((prev) => ({ ...prev, [qid]: val }));
    setTouched((t) => ({ ...t, [qid]: true }));
  };

  const flatQuestions = useMemo(() => PAGES.flatMap((p) => p.questions), []);

  const missingRequired = flatQuestions.filter(
    (q) => q.required && !isAnswered(answers[q.id], q.type, q.required)
  );
  const allRequiredAnswered = missingRequired.length === 0;

  const handleSubmit = async () => {
    if (!allRequiredAnswered) {
      const first = missingRequired[0];
      const node = qRefs.current[first.id];
      node?.scrollIntoView({ behavior: "smooth", block: "center" });
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
        <div className="mt-12 md:mt-20">
          <RateDone />
        </div>
      ) : (
        <Container
          className=" mt-8 md:mt-12 mb-16 md:mb-24"
          dir="rtl"
        >
          <div className="flex flex-col gap-8 md:gap-12">
            {PAGES.map((page) => (
              <section key={page.title} className="flex flex-col gap-4">
                <div className="flex w-full items-center justify-center px-4 md:px-12 py-3 md:py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary">
                  <div className="text-white font-bold text-lg md:text-xl leading-tight">
                    {page.title}
                  </div>
                </div>

                <div className="flex flex-col gap-5">
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
                              <p className="text-xs text-red-600 px-4 -mt-2">
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

          <div className="mt-8 flex items-center">
            <button
              onClick={handleSubmit}
              disabled={!allRequiredAnswered}
              className="w-full text-white ml-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl
                                 bg-gradient-to-r from-primary to-secondary
                                   disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 transition"
              type="button"
              aria-label="إرسال"
            >
              <span className="font-bold text-lg md:text-xl leading-normal">
                إرسال
              </span>
            </button>
          </div>
        </Container>
      )}
    </div>
  );
}