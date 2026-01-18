"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import LoadingPage from "@/components/shared/Loading";
import Container from "../../../components/ui/Container"; // غيّر المسار لو مختلف
import { useCompetitionQuestions } from "../../../components/shared/Hooks/useGetCompetitionQuestions";
const pad2 = (n) => String(n).padStart(2, "0");

const formatTimerHHMMSS = (seconds) => {
  const s = Math.max(0, Number(seconds) || 0);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  return `${pad2(h)}:${pad2(m)}:${pad2(ss)}`;
};

// groups by show_date => sections
const groupByShowDate = (questions = []) => {
  const map = new Map();
  for (const q of questions) {
    const key = q?.show_date || "all";
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(q);
  }
  const keys = Array.from(map.keys()).sort((a, b) => {
    const da = new Date(a).getTime();
    const db = new Date(b).getTime();
    if (!Number.isNaN(da) && !Number.isNaN(db)) return da - db;
    return String(a).localeCompare(String(b));
  });

  return keys.map((k, idx) => ({
    key: k,
    title: `القسم ${idx + 1}`,
    questions: map.get(k) || [],
  }));
};

export default function CompetitionExamPage() {
  const router = useRouter();
  const { id } = useParams(); // competition_id
  const { token, user } = useSelector((s) => s.auth);
  const getToken = useCallback(() => token, [token]);


  const { data, loading, error, fetchQuestions } = useCompetitionQuestions({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "https://camp-coding.site/nartaqi/public/api",
    getToken,
    cleanHtml: true,
  });
  // fetch
  useEffect(() => {
    if (!token || !user?.id || !id) return;
    fetchQuestions({ student_id: user.id, competition_id: id });
  }, [token, user?.id, id, fetchQuestions]);

  const sections = useMemo(() => {
    return groupByShowDate(data?.questions || []);
  }, [data?.questions]);

  // flatten for navigation
  const flat = useMemo(() => {
    const arr = [];
    sections.forEach((sec, secIdx) => {
      sec.questions.forEach((q, qIdx) => {
        arr.push({
          ...q,
          __secIdx: secIdx,
          __secTitle: sec.title,
          __qIdxInSec: qIdx,
          __globalIdx: arr.length,
        });
      });
    });
    return arr;
  }, [sections]);

  const total = flat.length;

  const [current, setCurrent] = useState(0);

  // answers map: { [questionId]: optionId OR optionId[] }
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState(() => new Set());

  // timer: use competition end_date as countdown target (as screenshot style)
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (!data?.competition?.end_date) return;

    const endAt = new Date(data.competition.end_date).getTime(); // from API
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((endAt - now) / 1000));
      setRemaining(diff);
    };

    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [data?.competition?.end_date]);

  // keep current in range after data loads
  useEffect(() => {
    if (total > 0) setCurrent((prev) => Math.min(prev, total - 1));
  }, [total]);

  const currentQ = flat[current];

  const isAnswered = useCallback(
    (q) => {
      const v = answers?.[q?.id];
      if (Array.isArray(v)) return v.length > 0;
      return v !== undefined && v !== null && v !== "";
    },
    [answers]
  );

  const isMarked = useCallback((q) => marked.has(q?.id), [marked]);

  const badgeClasses = (qGlobalIndex) => {
    const q = flat[qGlobalIndex];
    const isCurrent = qGlobalIndex === current;
    const answered = q ? isAnswered(q) : false;
    const flagged = q ? isMarked(q) : false;

    // priority like screenshot: current (blue), marked (yellow), answered (orange), empty (gray)
    if (isCurrent) return "bg-[#3B82F6] text-white";
    if (flagged) return "bg-[#FACC15] text-black";
    if (answered) return "bg-[#F97316] text-white";
    return "bg-[#F3F4F6] text-[#111827]";
  };

  const handleChooseOption = (qid, optionId) => {
    const qType = (data?.competition?.question_type || "").toLowerCase(); // single | multi

    if (qType === "multi") {
      setAnswers((prev) => {
        const old = Array.isArray(prev[qid]) ? prev[qid] : [];
        const exists = old.includes(optionId);
        const next = exists ? old.filter((x) => x !== optionId) : [...old, optionId];
        return { ...prev, [qid]: next };
      });
      return;
    }

    // single
    setAnswers((prev) => ({ ...prev, [qid]: optionId }));
  };

  const toggleMarkCurrent = () => {
    if (!currentQ?.id) return;
    setMarked((prev) => {
      const next = new Set(prev);
      if (next.has(currentQ.id)) next.delete(currentQ.id);
      else next.add(currentQ.id);
      return next;
    });
  };

  const goNext = () => setCurrent((p) => Math.min(p + 1, total - 1));
  const goPrev = () => setCurrent((p) => Math.max(p - 1, 0));

  const canPrev = current > 0;
  const isLast = total > 0 && current === total - 1;

  const handleSubmit = () => {
    // هنا هتربط submit API لما يكون جاهز
    // حاليا هنرجع أو نفتح نتيجة.. إلخ
    alert("تم إنهاء المسابقة (اربط submit API هنا)");
    router.back();
  };

  if (loading) return <LoadingPage />;

  if (error) {
    return (
      <Container className="py-16">
        <div className="mx-auto max-w-xl text-center">
          <div className="text-red-600 font-bold text-lg">حدث خطأ في تحميل الأسئلة</div>
          <div className="text-sm text-gray-600 mt-2">{error}</div>
          <button
            className="mt-5 px-6 py-2 rounded-xl bg-primary text-white"
            onClick={() => fetchQuestions({ student_id: user?.id, competition_id: id })}
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

  const qType = (data?.competition?.question_type || "").toLowerCase(); // single | multi
  const selected = answers[currentQ.id];

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Container className="py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* RIGHT MAIN */}
          <div className="flex-1">
            {/* header right */}
            <div className="flex flex-col items-end gap-2">
              <div className="text-sm font-bold text-[#0F172A]">
                {currentQ.__secTitle}
              </div>
              <div className="text-sm text-[#334155]">
                السؤال {current + 1} من {total}
              </div>
            </div>

            {/* passage box */}
            <div className="mt-6 border border-[#E5E7EB] rounded-xl p-4 text-sm leading-7 text-[#0F172A] bg-white">
              {/* لو عندك passage في API حطه هنا. حالياً بنعرض question_text لو طويل */}
              {currentQ.question_text}
            </div>

            {/* question */}
            <div className="mt-6 text-sm font-semibold text-[#0F172A]">
              {/* لو عندك حقل منفصل للسؤال غير القطعة */}
              {currentQ.question_text}
            </div>

            {/* options */}
            <div className="mt-4 space-y-3">
              {(currentQ.options || []).map((opt) => {
                const optId = opt.id;
                const checked =
                  qType === "multi"
                    ? Array.isArray(selected) && selected.includes(optId)
                    : selected === optId;

                return (
                  <label
                    key={optId}
                    className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                  >
                    <span className="text-sm text-[#0F172A]">{opt.option_text}</span>

                    {/* radio/checkbox on the right like screenshot */}
                    <span className="flex items-center">
                      {qType === "multi" ? (
                        <input
                          type="checkbox"
                          checked={!!checked}
                          onChange={() => handleChooseOption(currentQ.id, optId)}
                          className="w-4 h-4 accent-[#3B82F6]"
                        />
                      ) : (
                        <input
                          type="radio"
                          name={`q-${currentQ.id}`}
                          checked={!!checked}
                          onChange={() => handleChooseOption(currentQ.id, optId)}
                          className="w-4 h-4 accent-[#3B82F6]"
                        />
                      )}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* bottom buttons like screenshot */}
            <div className="mt-14 flex items-center justify-between">
              {/* NEXT (gradient) */}
              <button
                type="button"
                onClick={() => (isLast ? handleSubmit() : goNext())}
                className="w-[180px] h-[54px] rounded-2xl text-white font-bold shadow-sm"
                style={{
                  background:
                    "linear-gradient(90deg, #3B82F6 0%, #F97316 100%)",
                }}
              >
                {isLast ? "إنهاء" : "التالي"}
              </button>

              {/* PREV (outline) */}
              <button
                type="button"
                onClick={goPrev}
                disabled={!canPrev}
                className={`w-[180px] h-[54px] rounded-2xl font-bold border ${canPrev
                  ? "border-[#93C5FD] text-[#60A5FA] hover:bg-[#EFF6FF]"
                  : "border-[#E5E7EB] text-gray-300 cursor-not-allowed"
                  }`}
              >
                السابق
              </button>
            </div>
          </div>
          {/* LEFT SIDEBAR */}
          <LeftSidebar
            totalQuestions={total}
            currentIndex={current}
            answeredMap={answers}
            markedSet={marked}
            questionIds={flat.map((q) => q.id)}
            onJumpTo={(idx) => setCurrent(idx)}
          />

        </div>
      </Container>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center justify-end gap-2">
      <span className="text-xs text-[#111827]">{label}</span>
      <span
        className="w-3 h-3 rounded-sm"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}




function LeftSidebar({
  totalQuestions = 0,
  currentIndex = 0,
  answeredMap = {}, // { [questionId]: optionId | optionId[] }
  markedSet = new Set(), // Set(questionId)
  questionIds = [], // array of question ids by order (same order as numbers)
  onJumpTo, // (index)=>void
}) {
  const isAnsweredByIndex = (index) => {
    const qid = questionIds?.[index];
    if (!qid) return false;
    const v = answeredMap?.[qid];
    if (Array.isArray(v)) return v.length > 0;
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

    // priority: current > marked > answered > empty
    if (isCurrent) return "bg-primary text-white";
    if (isMarked) return "bg-yellow-400 text-black";
    if (isAnswered) return "bg-secondary text-white";
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
            <div className="bg-secondary w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 rounded-md" />
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
