"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import PagesBanner from "../../../../components/ui/PagesBanner";
import { RatingQuestion } from "../../../../components/ReateCoursePage.jsx/RatingQuestion";
import RateDone from "./RateDone";
import Container from "../../../../components/ui/Container";
import {
  submitRoundRate,
  resetRateState,
} from "@/components/utils/Store/Slices/rateRoundSlice";

/* ✅ Mapping من القيم المحلية للقيم الموقع API بيستقبلها */
const MAPPINGS = {
  recommend: {
    yes: "نعم",
    depends: "حسب المحتوى",
    no: "لا",
  },
  staff_interaction: {
    excellent: "ممتاز",
    very_good: "جيد جدًا",
    needs_improvement: "تحتاج إلى تحسين",
  },
  response_speed: {
    excellent: "ممتاز",
    very_good: "جيد جدًا",
    needs_improvement: "تحتاج إلى تحسين",
  },
  platform_usability: {
    easy: "سهلة",
    normal: "متوسطة",
    hard: "صعبة",
  },
  platform_notifications: {
    excellent: "ممتاز",
    good: "جيدة",
    weak: "تحتاج إلى تحسين",
  },
};

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
    title: "تقييم عام للدورة",
    questions: [
      {
        id: "overall_rating",
        type: "rating",
        question: "تقييمك العام للدورة",
        options: [
          { value: "5", label: "ممتاز (5)" },
          { value: "4.5", label: "جيد جدًا (4.5)" },
          { value: "4", label: "جيد (4)" },
          { value: "3", label: "متوسط (3)" },
          { value: "2", label: "ضعيف (2)" },
        ],
        required: true,
        defaultValue: "5",
      },
      {
        id: "comment",
        type: "text",
        question: "اكتب رأيك في الدورة",
        placeholder: "اكتب تعليقك هنا...",
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

// ✅ Helper: get value from answer (object or string)
const getValue = (ans) => {
  if (ans == null) return "";
  if (typeof ans === "object") return ans.value || "";
  return String(ans);
};

export default function RateCoursePage() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  // ✅ Get round id from URL params
  const roundId = pathname.split("/").filter(Boolean)[1];

  // ✅ Get user from auth
  const { user, token } = useSelector((state) => state.auth);
  const studentId = user?.id;

  // ✅ Get rate state
  const { isSubmitting, error, success } = useSelector(
    (state) => state.rateRound
  );

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

  // ✅ Reset state on mount
  useEffect(() => {
    dispatch(resetRateState());
  }, [dispatch]);

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (!token) {
      toast.error("يجب تسجيل الدخول أولاً");
      router.push("/login");
    }
  }, [token, router]);

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
      toast.error("يرجى الإجابة على جميع الأسئلة المطلوبة");
      return;
    }

    if (!roundId || !studentId) {
      toast.error("بيانات غير كاملة، يرجى إعادة المحاولة");
      return;
    }

    // ✅ Build the API payload
    const apiPayload = {
      student_id: parseInt(studentId),
      round_id: parseInt(roundId),
      rate: parseFloat(getValue(answers.overall_rating) || 5),
      comment: getValue(answers.comment) || "",
      recommend_to_friends:
        MAPPINGS.recommend[getValue(answers.recommend)] || "نعم",
      moderator_interaction:
        MAPPINGS.staff_interaction[getValue(answers.staff_interaction)] ||
        "ممتاز",
      response_speed:
        MAPPINGS.response_speed[getValue(answers.response_speed)] || "جيد جدًا",
      platform_ease_of_use:
        MAPPINGS.platform_usability[getValue(answers.platform_usability)] ||
        "سهلة",
      notifications_rating:
        MAPPINGS.platform_notifications[
          getValue(answers.platform_notifications)
        ] || "ممتاز",
    };

    // ✅ Optional: include suggestions if provided
    const suggestions = getValue(answers.platform_suggestions);
    if (suggestions && suggestions.trim()) {
      apiPayload.suggestions = suggestions;
    }

    try {
      await dispatch(submitRoundRate(apiPayload)).unwrap();
      toast.success("تم إرسال التقييم بنجاح ✅");
      setIsFinished(true);
    } catch (err) {
      console.error("Failed to submit rating:", err);
      toast.error(
        typeof err === "string" ? err : "حدث خطأ أثناء إرسال التقييم"
      );
    }
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
          { title: "تقييم الدورة", link: "#" },
        ]}
      />

      {isFinished ? (
        <div className="my-12 md:my-20">
          <RateDone />
        </div>
      ) : (
        <Container className="mt-8 md:mt-12 mb-16 md:mb-24" dir="rtl">
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

          {/* ✅ Error Display */}
          {error && (
            <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="mt-8 flex items-center">
            <button
              onClick={handleSubmit}
              disabled={!allRequiredAnswered || isSubmitting}
              className="w-full text-white ml-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl
                                 bg-gradient-to-r from-primary to-secondary
                                   disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 transition"
              type="button"
              aria-label="إرسال"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span className="font-bold text-lg md:text-xl leading-normal">
                    جاري الإرسال...
                  </span>
                </>
              ) : (
                <span className="font-bold text-lg md:text-xl leading-normal">
                  إرسال
                </span>
              )}
            </button>
          </div>
        </Container>
      )}
    </div>
  );
}
