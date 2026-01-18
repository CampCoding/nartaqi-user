"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import LoadingPage from "@/components/shared/Loading";
import Container from "../../../components/ui/Container";
import { useCompetitionQuestions } from "../../../components/shared/Hooks/useGetCompetitionQuestions";
import { useSubmitCompetitionAnswers } from "../../../components/shared/Hooks/useSubmitAllAnswers";

// strip html from option_text for submit
const stripHtml = (html = "") =>
  String(html)
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

export default function CompetitionExamPage() {
  const router = useRouter();
  const { id } = useParams(); // competition_id
  const { token, user } = useSelector((s) => s.auth);

  const getToken = useCallback(() => token, [token]);

  // ✅ GET QUESTIONS
  const { data, loading, error, fetchQuestions } = useCompetitionQuestions({
    baseUrl:
      process.env.NEXT_PUBLIC_API_URL ||
      "https://camp-coding.site/nartaqi/public/api",
    getToken,
    cleanHtml: false,
  });

  // ✅ SUBMIT ANSWERS
  const {
    submitAnswers,
    loading: submitting,
    error: submitError,
    reset: resetSubmitState,
  } = useSubmitCompetitionAnswers({
    baseUrl:
      process.env.NEXT_PUBLIC_API_URL ||
      "https://camp-coding.site/nartaqi/public/api",
    getToken,
  });

  // fetch questions
  useEffect(() => {
    if (!token || !user?.id || !id) return;
    fetchQuestions({ student_id: user.id, competition_id: id });
  }, [token, user?.id, id, fetchQuestions]);

  // ✅ NO GROUPING: use API order directly
  const questions = useMemo(() => data?.questions || [], [data?.questions]);
  const total = questions.length;

  const [current, setCurrent] = useState(0);

  // answers map: { [questionId]: optionId }
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState(() => new Set());

  // keep current in range after data loads
  useEffect(() => {
    if (total > 0) setCurrent((prev) => Math.min(prev, total - 1));
  }, [total]);

  const currentQ = questions[current];

  // ✅ always single choice
  const handleChooseOption = useCallback((qid, optionId) => {
    setAnswers((prev) => ({ ...prev, [qid]: optionId }));
  }, []);

  const toggleMarkCurrent = useCallback(() => {
    if (!currentQ?.id) return;
    setMarked((prev) => {
      const next = new Set(prev);
      if (next.has(currentQ.id)) next.delete(currentQ.id);
      else next.add(currentQ.id);
      return next;
    });
  }, [currentQ?.id]);

  const goNext = useCallback(() => {
    setCurrent((p) => Math.min(p + 1, total - 1));
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrent((p) => Math.max(p - 1, 0));
  }, []);

  const canPrev = current > 0;
  const isLast = total > 0 && current === total - 1;

  // ✅ answered helpers
  const isAnsweredQ = useCallback(
    (q) => {
      const v = answers?.[q?.id];
      return v !== undefined && v !== null && v !== "";
    },
    [answers]
  );

  const unansweredIndexes = useMemo(() => {
    return (questions || [])
      .map((q, idx) => (isAnsweredQ(q) ? null : idx))
      .filter((x) => x !== null);
  }, [questions, isAnsweredQ]);

  const answeredCount = total - unansweredIndexes.length;
  const allAnswered = total > 0 && unansweredIndexes.length === 0;

  // ✅ warn before leaving/reload if there is progress
  const hasProgress = useMemo(() => {
    const anyAnswer = Object.keys(answers || {}).length > 0;
    const moved = current > 0;
    const anyMarked = (marked?.size || 0) > 0;
    return anyAnswer || moved || anyMarked;
  }, [answers, current, marked]);

  useEffect(() => {
    if (!hasProgress) return;

    const handler = (e) => {
      e.preventDefault();
      e.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [hasProgress]);

  // ✅ build submit payload using selected options + is_correct
  const buildSubmitPayload = useCallback(() => {
    const payloadAnswers = [];

    for (const q of questions) {
      const pickedId = answers[q.id];

      // skip unanswered (but we will block submit anyway)
      if (pickedId === undefined || pickedId === null || pickedId === "") continue;

      const pickedOption = (q.options || []).find((o) => o.id === pickedId);

      const answer_text = pickedOption ? stripHtml(pickedOption.option_text) : "";

      const correct_or_not =
        pickedOption && Number(pickedOption.is_correct) === 1 ? 1 : 0;

      payloadAnswers.push({
        question_id: q.id,
        answer_text,
        correct_or_not,
      });
    }

    return {
      student_id: user?.id,
      competition_id: Number(id),
      answers: payloadAnswers,
    };
  }, [answers, questions, user?.id, id]);

  // ✅ submit handler using hook
  const handleSubmit = useCallback(async () => {
    if (!user?.id || !id) return;

    // ✅ block submit if not all answered
    if (!allAnswered) {
      const firstMissing = unansweredIndexes[0];
      if (typeof firstMissing === "number") setCurrent(firstMissing);
      alert(
        `لازم تجاوب كل الأسئلة قبل الإنهاء.\nالمتبقي: ${unansweredIndexes.length} سؤال`
      );
      return;
    }

    try {
      resetSubmitState();

      const payload = buildSubmitPayload();

      if (!payload.answers.length) {
        alert("لم تقم بالإجابة على أي سؤال بعد.");
        return;
      }

      await submitAnswers(payload);

      alert("تم إرسال الإجابات بنجاح ✅");
      router.back();
    } catch (e) {
      alert("حدث خطأ أثناء إرسال الإجابات. حاول مرة أخرى.");
    }
  }, [
    user?.id,
    id,
    allAnswered,
    unansweredIndexes,
    resetSubmitState,
    buildSubmitPayload,
    submitAnswers,
    router,
  ]);

  if (loading) return <LoadingPage />;

  if (error) {
    return (
      <Container className="py-16">
        <div className="mx-auto max-w-xl text-center">
          <div className="text-red-600 font-bold text-lg">
            حدث خطأ في تحميل الأسئلة
          </div>
          <div className="text-sm text-gray-600 mt-2">{error}</div>

          <button
            className="mt-5 px-6 py-2 rounded-xl bg-primary text-white"
            onClick={() => {
              const ok = confirm(
                "سيتم فقدان التقدم الحالي إذا قمت بإعادة التحميل/إعادة المحاولة. هل تريد المتابعة؟"
              );
              if (!ok) return;
              fetchQuestions({ student_id: user?.id, competition_id: id });
            }}
          >
            إعادة المحاولة
          </button>
        </div>
      </Container>
    );
  }

  if (!currentQ) {
    return (
      <Container className="py-16">
        <div className="mx-auto max-w-xl text-center text-gray-700">
          لا توجد أسئلة لهذه المسابقة حاليًا
        </div>
      </Container>
    );
  }

  const selected = answers[currentQ.id];

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Container className="py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* RIGHT MAIN */}
          <div className="flex-1">
            <div className="flex flex-col items-start gap-2">
              <div className="text-sm font-bold text-[#0F172A]">
                {data?.competition?.name || "المسابقة"}
              </div>

              <div className="text-sm text-[#334155]">
                السؤال {current + 1} من {total}
              </div>

              <div className="text-xs text-[#64748B]">
                جاوبت {answeredCount} من {total}
              </div>
            </div>

            {/* question text (HTML) */}
            <div
              className="mt-6 border border-[#E5E7EB] rounded-xl p-4 text-sm leading-7 text-[#0F172A] bg-white"
              dangerouslySetInnerHTML={{
                __html: String(currentQ.question_text || "").replaceAll(/&nbsp;/gi, " "),
              }}
            />

            {/* options: radio style */}
            <div className="mt-4 space-y-3">
              {(currentQ.options || []).map((opt) => {
                const optId = opt.id;
                const checked = selected === optId;

                return (
                  <button
                    key={optId}
                    type="button"
                    onClick={() => handleChooseOption(currentQ.id, optId)}
                    className={[
                      "w-full rounded-xl border px-4 py-3 flex gap-4 items-center",
                      "transition hover:bg-gray-50 text-right",
                      checked
                        ? "border-[#3B82F6] bg-[#EFF6FF]"
                        : "border-[#E5E7EB] bg-white",
                    ].join(" ")}
                    aria-pressed={checked}
                  >
                    {/* radio indicator */}
                    <span
                      className={[
                        "w-5 h-5 rounded-full border flex items-center justify-center shrink-0",
                        checked ? "border-[#3B82F6]" : "border-[#CBD5E1]",
                      ].join(" ")}
                    >
                      {checked ? (
                        <span className="w-3 h-3 rounded-full bg-[#3B82F6]" />
                      ) : null}
                    </span>

                    <span
                      className="text-sm text-[#0F172A] leading-6"
                      dangerouslySetInnerHTML={{
                        __html: String(opt.option_text || "").replaceAll(/&nbsp;/gi, " "),
                      }}
                    />
                  </button>
                );
              })}
            </div>

            {/* submit error message */}
            {submitError ? (
              <div className="mt-4 text-sm text-red-600 font-semibold">
                {submitError}
              </div>
            ) : null}

            {/* bottom buttons */}
            <div className="mt-14 flex items-center justify-between">
              <button
                type="button"
                onClick={() => (isLast ? handleSubmit() : goNext())}
                disabled={submitting || (isLast && !allAnswered)}
                className={`w-[180px] h-[54px] rounded-2xl text-white font-bold shadow-sm ${
                  submitting || (isLast && !allAnswered)
                    ? "opacity-60 cursor-not-allowed"
                    : ""
                }`}
                style={{
                  background: "linear-gradient(90deg, #3B82F6 0%, #F97316 100%)",
                }}
              >
                {isLast
                  ? submitting
                    ? "جاري الإنهاء..."
                    : allAnswered
                    ? "إنهاء"
                    : "أكمل الإجابات"
                  : "التالي"}
              </button>

              <button
                type="button"
                onClick={goPrev}
                disabled={!canPrev || submitting}
                className={`w-[180px] h-[54px] rounded-2xl font-bold border ${
                  canPrev && !submitting
                    ? "border-[#93C5FD] text-[#60A5FA] hover:bg-[#EFF6FF]"
                    : "border-[#E5E7EB] text-gray-300 cursor-not-allowed"
                }`}
              >
                السابق
              </button>
            </div>
          </div>

          {/* LEFT SIDEBAR */}
          <div className="w-full lg:w-[479px] flex flex-col gap-4">
            <LeftSidebar
              totalQuestions={total}
              currentIndex={current}
              answeredMap={answers}
              markedSet={marked}
              questionIds={questions.map((q) => q.id)}
              onJumpTo={(idx) => setCurrent(idx)}
            />

            {/* mark question */}
            <button
              type="button"
              onClick={toggleMarkCurrent}
              className="w-full rounded-xl border border-[#E5E7EB] py-2 text-sm font-semibold hover:bg-gray-50"
              disabled={submitting}
            >
              {marked.has(currentQ?.id) ? "إزالة تعليم السؤال" : "تعليم السؤال"}
            </button>

            {/* optional: hint if missing answers */}
            {!allAnswered ? (
              <div className="text-xs text-[#B45309] font-semibold">
                لديك {unansweredIndexes.length} سؤال غير مجاب عنه.
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </div>
  );
}

function LeftSidebar({
  totalQuestions = 0,
  currentIndex = 0,
  answeredMap = {},
  markedSet = new Set(),
  questionIds = [],
  onJumpTo,
}) {
  const isAnsweredByIndex = (index) => {
    const qid = questionIds?.[index];
    if (!qid) return false;
    const v = answeredMap?.[qid];
    return v !== undefined && v !== null && v !== "";
  };

  const isMarkedByIndex = (index) => {
    const qid = questionIds?.[index];
    if (!qid) return false;
    return markedSet?.has(qid);
  };

  const getBoxStyle = (index) => {
    const isCurrent = index === currentIndex;
    const isMarked = isMarkedByIndex(index);
    const isAnswered = isAnsweredByIndex(index);

    if (isCurrent) return "bg-primary text-white";
    if (isMarked) return "bg-yellow-400 text-black";
    if (isAnswered) return "bg-[#F97316] text-white";
    return "bg-[#d9d9d9] text-text";
  };

  return (
    <div className="flex flex-col items-start gap-2 sm:gap-3 lg:gap-4 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 bg-white rounded-lg border border-solid border-variable-collection-stroke w-full max-w-[479px]">
      <div className="font-bold text-text text-lg sm:text-xl lg:text-2xl leading-tight sm:leading-relaxed text-center sm:text-right whitespace-nowrap">
        الأسئلة
      </div>

      <div className="flex flex-wrap w-full items-start justify-start gap-2 sm:gap-3 lg:gap-4">
        {Array.from({ length: totalQuestions }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onJumpTo?.(index)}
            className={`flex flex-col w-10 sm:w-12 lg:w-14 items-center justify-center gap-2 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 lg:py-3 rounded-md sm:rounded-md lg:rounded-lg transition ${getBoxStyle(
              index
            )}`}
            aria-label={`السؤال رقم ${index + 1}`}
          >
            <div className="font-medium text-lg text-right leading-tight sm:leading-relaxed whitespace-nowrap">
              {index + 1}
            </div>
          </button>
        ))}
      </div>

      <div className="flex flex-col w-full items-center gap-2 sm:gap-3 lg:gap-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 w-[160px] ">
            <div className="bg-primary w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 rounded-md" />
            <span className="font-medium text-text text-xs sm:text-sm lg:text-base leading-tight sm:leading-relaxed">
              الحالي
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 w-[160px]">
            <div className="bg-yellow-400 w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 rounded-md" />
            <span className="font-medium text-text text-xs sm:text-sm lg:text-base leading-tight sm:leading-relaxed">
              المعلقة
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 w-[160px]">
            <div className="bg-[#F97316] w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 rounded-md" />
            <span className="font-medium text-text text-xs sm:text-sm lg:text-base leading-tight sm:leading-relaxed">
              المجاب عنه
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 w-[160px]">
            <div className="bg-[#d9d9d9] w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 rounded-md" />
            <span className="font-medium text-text text-xs sm:text-sm lg:text-base leading-tight sm:leading-relaxed whitespace-nowrap">
              غير مجاب عنه
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
