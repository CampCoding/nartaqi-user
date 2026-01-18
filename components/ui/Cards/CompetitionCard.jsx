"use client";

import React, { useEffect, useMemo, useState } from "react";

export const DailyQuizSection = ({
  buttonHoverColor,
  color = "primary",
  border,

  competition = null, // object from API
  onJoin, // function(competition)
  disabled = false, // optional external disable
}) => {
  // ---------- Helpers ----------
  const parseDate = (v) => {
    if (!v) return null;
    const d = new Date(v);
    return isNaN(d.getTime()) ? null : d;
  };

  const pad2 = (n) => String(n).padStart(2, "0");

  // better than "minutes only"
  const formatRemaining = (seconds) => {
    const s = Math.max(0, Number(seconds) || 0);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const ss = s % 60;

    if (h > 0) return `${h}:${pad2(m)}:${pad2(ss)}`;
    return `${m} د : ${pad2(ss)} ث`;
  };

  // ---------- Normalize API Fields ----------
  const normalized = useMemo(() => {
    if (!competition) return null;

    const title =
      competition.title ||
      competition.name ||
      competition.competition_name ||
      "مسابقة";

    const image =
      competition.image_url ||
      competition.image ||
      competition.cover ||
      competition.banner ||
      "/images/daily-competition-image.png";

    const startAt =
      parseDate(competition.starts_at) ||
      parseDate(competition.start_date) ||
      parseDate(competition.start_at) ||
      parseDate(competition.start_time) ||
      null;

    const endAt =
      parseDate(competition.ends_at) ||
      parseDate(competition.end_date) ||
      parseDate(competition.end_at) ||
      parseDate(competition.end_time) ||
      null;

    const idea =
      competition.idea ||
      competition.description ||
      competition.conceptDetails 
    const prize =
      competition.prize ||
      competition.prizes ||
      competition.rewards 
    // status from API: upcoming | active | ended (example)
    const statusRaw = (competition.status || "").toString().toLowerCase();
    const apiActive = competition.active;

    return {
      title,
      image,
      startAt,
      endAt,
      idea,
      prize,
      statusRaw,
      apiActive,
    };
  }, [competition]);

  // ---------- Status Logic (robust) ----------
  const computedStatus = useMemo(() => {
    if (!normalized) return "none";

    const now = Date.now();
    const s = normalized.startAt?.getTime?.() ?? null;
    const e = normalized.endAt?.getTime?.() ?? null;

    // If API already provides a useful status, honor it (but still validate by time if possible)
    const api = normalized.statusRaw;

    // Time-based fallback / correction:
    if (s && now < s) return "upcoming";
    if (e && now >= e) return "ended";
    if (normalized.apiActive === false) {
      // explicitly inactive
      return api || "ended";
    }
    // If within time window (or missing dates) consider active if API says active or active flag true
    if ((s && now >= s && (!e || now < e)) || (!s && !e)) {
      if (api === "upcoming") return "upcoming";
      if (api === "ended") return "ended";
      return "active";
    }

    // final fallback
    return api || "active";
  }, [normalized]);

  // ---------- Timer Target (start for upcoming, end for active) ----------
  const targetAt = useMemo(() => {
    if (!normalized) return null;
    if (computedStatus === "upcoming") return normalized.startAt;
    if (computedStatus === "active") return normalized.endAt || null;
    return null;
  }, [normalized, computedStatus]);

  const totalSeconds = useMemo(() => {
    if (!normalized) return 15 * 60;

    const durationMin =
      normalized.duration_minutes ??
      normalized.durationMin ??
      normalized.duration ??
      competition?.duration_minutes ??
      competition?.durationMin ??
      competition?.duration ??
      null;

    // 1) explicit duration
    if (durationMin && Number(durationMin) > 0) return Number(durationMin) * 60;

    // 2) if we have start & end, use that
    if (normalized.startAt && normalized.endAt) {
      const diff = Math.max(
        1,
        Math.floor((normalized.endAt.getTime() - normalized.startAt.getTime()) / 1000)
      );
      return diff;
    }

    // 3) if we only have targetAt, use remaining-to-target as "total" to avoid NaN
    if (targetAt) {
      const now = Date.now();
      const diff = Math.max(1, Math.floor((targetAt.getTime() - now) / 1000));
      return diff;
    }

    return 15 * 60;
  }, [normalized, targetAt, competition]);

  const initialRemaining = useMemo(() => {
    if (!targetAt) return totalSeconds;
    const now = Date.now();
    return Math.max(0, Math.floor((targetAt.getTime() - now) / 1000));
  }, [targetAt, totalSeconds]);

  const [timeRemaining, setTimeRemaining] = useState(initialRemaining);

  // Re-init timer when competition/status changes
  useEffect(() => {
    setTimeRemaining(initialRemaining);
  }, [initialRemaining]);

  // Countdown tick
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Progress:
  // - if active and we have start+end: remaining/total
  // - otherwise: remaining/total
  const progressPercentage = useMemo(() => {
    const base = totalSeconds || 1;
    return Math.max(0, Math.min(100, (timeRemaining / base) * 100));
  }, [timeRemaining, totalSeconds]);

  // ---------- UI Data ----------
  const ui = useMemo(() => {
    if (!normalized) {
      return {
        title: "المسابقة اليومية",
        image: "/images/daily-competition-image.png",
        startLabel: "متى تبدأ؟",
        startDetails: ": كل يوم في الساعة 8 مساء.",
        conceptLabel: "فكرتها",
        conceptDetails:
          ": مجموعة سريعة من الأسئلة القصيرة في مجالات مختلفة عشان تختبر سرعة البديهة والمعرفة.",
        prizesLabel: "الجوائز:",
        prizesDetails:
          " نقاط تضاف لرصيدك فورا، تقدر تجمعها وتستبدلها بمكافآت داخل المنصة.",
        timeLabel: "الوقت المتبقي",
        joinButton: "انضم الآن",
      };
    }

    const startLabel = "متى تبدأ؟";
    const startDetails = normalized.startAt
      ? `: ${normalized.startAt.toLocaleString("ar-EG")}`
      : ": قريبًا";

    const conceptLabel = "فكرتها";
    const conceptDetails = `: ${normalized.idea}`;

    const prizesLabel = "الجوائز:";
    const prizesDetails = ` ${normalized.prize}`;

    let timeLabel = "الوقت المتبقي";
    if (computedStatus === "upcoming") timeLabel = "يبدأ بعد";
    if (computedStatus === "ended") timeLabel = "انتهت";

    let joinButton = "انضم الآن";
    if (computedStatus === "upcoming") joinButton = "قريبًا";
    if (computedStatus === "ended") joinButton = "انتهت المسابقة";

    return {
      title: normalized.title,
      image: normalized.image,
      startLabel,
      startDetails,
      conceptLabel,
      conceptDetails,
      prizesLabel,
      prizesDetails,
      timeLabel,
      joinButton,
    };
  }, [normalized, computedStatus]);

  const getColorClasses = () => {
    switch (color) {
      case "primary":
        return {
          text: "text-primary",
          bg: "bg-primary",
          hover: "hover:bg-primary-dark",
          border: "border-primary-light",
          shadow: "shadow-[0px_12px_50px_#3b82f6]",
        };
      case "secondary":
        return {
          text: "text-secondary",
          bg: "bg-secondary",
          hover: "hover:bg-secondary-dark",
          border: "border-secondary-light",
          shadow: "shadow-[0px_12px_50px_#10b981]",
        };
      case "warning":
        return {
          text: "text-warning",
          bg: "bg-warning",
          hover: "hover:bg-warning-dark",
          border: "border-warning-light",
          shadow: "shadow-[0px_12px_50px_#f59e0b]",
        };
      default:
        return {
          text: "text-primary",
          bg: "bg-primary",
          hover: "hover:bg-primary-dark",
          border: "border-primary-light",
          shadow: "shadow-[0px_12px_50px_#3b82f6]",
        };
    }
  };

  const colorClasses = getColorClasses();

  // ---------- Join rules ----------
  const autoDisabled =
    disabled ||
    !competition ||
    computedStatus !== "active" ||
    timeRemaining <= 0 ||
    normalized?.apiActive === false;

  const handleJoin = () => {
    if (autoDisabled) return;
    if (typeof onJoin === "function") onJoin(competition);
  };

  return (
    <section
      className={`${colorClasses.shadow} w-full max-w-[419px] md:!w-full px-4 py-4 flex bg-white rounded-[30px] overflow-hidden border-4 ${colorClasses.border}`}
      role="region"
      aria-labelledby="quiz-title"
    >
      <div className="flex w-full relative flex-col items-center gap-4 sm:px-0">
        <img
          loading="lazy"
          className="relative w-full rounded-3xl overflow-hidden max-w-[387px] h-[173px] object-cover sm:px-0"
          alt="صورة المسابقة"
          src={ui.image}
        />

        <div className="flex flex-col items-center gap-6 sm:gap-8 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex flex-col gap-3 sm:gap-[11px] relative self-stretch w-full flex-[0_0_auto]">
            <header className="flex items-center justify-center gap-2.5 py-0 relative self-stretch w-full flex-[0_0_auto]">
              <h1
                id="quiz-title"
                className={`relative flex flex-1 mt-[-1.00px] font-bold ${colorClasses.text} text-lg sm:text-xl tracking-[0] leading-[normal] [direction:rtl] text-center`}
              >
                {ui.title}
              </h1>
            </header>

            <div className="flex flex-col items-start gap-3 sm:gap-4 py-0 relative self-stretch w-full flex-[0_0_auto]">
              <p className="relative flex self-stretch mt-[-1.00px] font-normal text-transparent text-sm sm:text-base tracking-[0] leading-5 sm:leading-6 [direction:rtl]">
                <span className="font-bold text-primary">{ui.startLabel}</span>
                <span className="font-medium text-text-alt">{ui.startDetails}</span>
              </p>

              <p className="self-stretch font-normal text-transparent text-sm sm:text-base leading-5 sm:leading-6 relative tracking-[0] [direction:rtl]">
                <span className="font-bold text-orange-500">{ui.conceptLabel}</span>
                <span className="font-medium text-[#2d2d2d]">{ui.conceptDetails}</span>
              </p>

              <p className="self-stretch font-normal text-warning text-sm sm:text-base leading-5 sm:leading-6 relative tracking-[0] [direction:rtl]">
                <span className="font-bold">{ui.prizesLabel}</span>
                <span className="font-medium">{ui.prizesDetails}</span>
              </p>
            </div>

            <div className="flex flex-col w-full items-start gap-2 p-3 sm:p-4 bg-primary-light rounded-[15px] relative flex-[0_0_auto]">
              <div className="flex h-5 items-start justify-between relative self-stretch w-full">
                <div className="inline-flex h-5 items-center relative flex-[0_0_auto]">
                  <span className="relative flex items-center justify-center self-stretch w-fit font-medium text-text text-xs sm:text-sm text-left leading-5 whitespace-nowrap [direction:rtl]">
                    {ui.timeLabel}
                  </span>
                </div>

                <div className="inline-flex h-5 items-center relative flex-[0_0_auto]">
                  <time
                    className={`flex self-stretch ${colorClasses.text} text-xs sm:text-sm text-left leading-5 whitespace-nowrap relative items-center justify-center w-fit [direction:rtl]`}
                    dateTime={`PT${Math.floor(timeRemaining / 60)}M`}
                  >
                    {computedStatus === "ended" ? "0" : formatRemaining(timeRemaining)}
                  </time>
                </div>
              </div>

              <div
                className="relative self-stretch w-full h-1 bg-white rounded-full overflow-hidden rotate-180"
                role="progressbar"
                aria-valuenow={progressPercentage}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label="الوقت المتبقي للمسابقة"
              >
                <div
                  className={`relative h-1 ${colorClasses.text.replace(
                    "text-",
                    "bg-"
                  )} transition-all duration-1000 ease-linear`}
                  style={{
                    width: `${progressPercentage}%`,
                    left: `${100 - progressPercentage}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="w-full sm:px-0">
            <button
              className={`flex w-full max-w-[387px] items-center justify-center gap-2 px-6 sm:px-12 py-3 sm:py-4 relative flex-[0_0_auto]
                ${colorClasses.bg} ${colorClasses.hover}
                rounded-[15px] shadow-[0px_6px_24px_#bac6dc33]
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                transition-colors duration-200 sm:mx-0
                ${autoDisabled ? "opacity-60 cursor-not-allowed" : ""}
              `}
              type="button"
              onClick={handleJoin}
              disabled={autoDisabled}
              aria-label="انضم إلى المسابقة"
            >
              <span className="[display:-webkit-box] font-bold text-neutral-50 text-sm sm:text-base text-center leading-[normal] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical] relative items-center justify-center w-fit [direction:rtl]">
                {ui.joinButton}
              </span>
            </button>

            {/* Optional tiny status hint */}
            {normalized && (
              <div className="mt-2 text-xs text-muted-foreground [direction:rtl] text-center">
                الحالة:{" "}
                {computedStatus === "upcoming"
                  ? "قادمة"
                  : computedStatus === "active"
                  ? "نشطة الآن"
                  : "منتهية"}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
