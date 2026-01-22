"use client";

import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useEnrollInCompetition } from "../../shared/Hooks/useEnrollCompetition";

const TZ = "Africa/Cairo";

// ---------- Timezone-safe helpers (NO libs) ----------
const _dtfCache = new Map();
function getDtf(tz) {
  const key = tz;
  if (_dtfCache.has(key)) return _dtfCache.get(key);
  const dtf = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  _dtfCache.set(key, dtf);
  return dtf;
}

function tzPartsFromDate(date, tz) {
  const parts = getDtf(tz).formatToParts(date);
  const map = {};
  for (const p of parts) {
    if (p.type !== "literal") map[p.type] = p.value;
  }
  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    hour: Number(map.hour),
    minute: Number(map.minute),
    second: Number(map.second),
  };
}

/**
 * Build a Date that represents (y-m-d h:m:s) *as wall-clock time* in a given IANA timezone.
 * This prevents "shift by 2 hours" when API sends "YYYY-MM-DD HH:mm:ss" with no timezone.
 */
function makeDateInTimeZone(y, m, d, hh, mm, ss, tz) {
  const desiredUTC = Date.UTC(y, m - 1, d, hh, mm, ss);
  let guess = new Date(desiredUTC);

  // iterate a couple times to resolve DST edges
  for (let i = 0; i < 3; i++) {
    const p = tzPartsFromDate(guess, tz);
    const asUTC = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
    const offsetMs = asUTC - guess.getTime(); // tz offset at guess
    const corrected = desiredUTC - offsetMs;
    if (Math.abs(corrected - guess.getTime()) < 1) break;
    guess = new Date(corrected);
  }
  return guess;
}

function parseApiDate(v) {
  if (!v) return null;
  if (v instanceof Date) return isNaN(v.getTime()) ? null : v;

  const str = String(v).trim();
  if (!str) return null;

  // If ISO with Z or offset -> trust native parser
  const looksISOWithTZ =
    /Z$/i.test(str) ||
    /[+-]\d{2}:?\d{2}$/i.test(str) ||
    (str.includes("T") && (str.includes("Z") || /[+-]\d{2}:?\d{2}/.test(str)));

  if (looksISOWithTZ) {
    const d = new Date(str);
    return isNaN(d.getTime()) ? null : d;
  }

  // Handle: "YYYY-MM-DD HH:mm:ss" or "YYYY-MM-DD"
  const m = str.match(/^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?$/);
  if (m) {
    const y = Number(m[1]);
    const mo = Number(m[2]);
    const da = Number(m[3]);
    const hh = Number(m[4] ?? 0);
    const mi = Number(m[5] ?? 0);
    const ss = Number(m[6] ?? 0);

    // treat as Cairo wall-clock time
    const d = makeDateInTimeZone(y, mo, da, hh, mi, ss, TZ);
    return isNaN(d.getTime()) ? null : d;
  }

  // fallback (last resort)
  const d = new Date(str);
  return isNaN(d.getTime()) ? null : d;
}

function formatInTZ(date, locale = "ar-EG") {
  if (!date) return "قريبًا";
  try {
    return new Intl.DateTimeFormat(locale, {
      timeZone: TZ,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return date.toLocaleString(locale);
  }
}

// ---------- Status Normalization Helpers ----------
const STATUS_ALIASES = {
  active: ["active", "ongoing", "on_going", "running", "started", "in_progress", "open"],
  upcoming: ["upcoming", "scheduled", "pending", "soon", "not_started"],
  ended: ["ended", "complete", "completed", "finished", "closed", "expired", "done"],
};

function normalizeStatusWord(v) {
  const s = (v ?? "").toString().trim().toLowerCase();
  if (!s) return "";

  for (const [k, arr] of Object.entries(STATUS_ALIASES)) {
    if (arr.includes(s)) return k;
  }

  if (s.includes("end")) return "ended";
  if (s.includes("complete") || s.includes("finish")) return "ended";
  if (s.includes("up")) return "upcoming";
  if (s.includes("on") || s.includes("run") || s.includes("progress") || s.includes("start"))
    return "active";

  return s;
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d.getTime());
}

function buildImageUrl(raw) {
  const img = raw?.image_url || raw?.imageUrl || raw?.image || raw?.cover || raw?.banner || "";
  if (!img) return "/images/daily-competition-image.png";
  if (/^https?:\/\//i.test(img)) return img;

  // relative path like "competitions/xxx.jpg"
  const base = "https://camp-coding.site/nartaqi/public/storage/";
  return base + img.replace(/^\/+/, "");
}

// OPTIONAL: set fixed hour for daily competitions if API uses midnight (00:00:00)
function applyDailyHourIfNeeded(dateObj, raw, fallbackHour = null) {
  if (!dateObj || fallbackHour == null) return dateObj;
  if ((raw?.type || "").toString().toLowerCase() !== "daily") return dateObj;

  const p = tzPartsFromDate(dateObj, TZ);
  const isMidnight = p.hour === 0 && p.minute === 0 && p.second === 0;
  if (!isMidnight) return dateObj;

  return makeDateInTimeZone(p.year, p.month, p.day, Number(fallbackHour), 0, 0, TZ);
}

// ---------- Normalize Competition (robust) ----------
function normalizeCompetition(raw) {
  if (!raw) return null;

  const title =
    raw.title ||
    raw.name ||
    raw.competition_name ||
    raw.competitionName ||
    "مسابقة";

  let startAt =
    parseApiDate(raw.starts_at) ||
    parseApiDate(raw.start_at) ||
    parseApiDate(raw.start_date) ||
    parseApiDate(raw.start_time) ||
    null;

  let endAt =
    parseApiDate(raw.ends_at) ||
    parseApiDate(raw.end_at) ||
    parseApiDate(raw.end_date) ||
    parseApiDate(raw.end_time) ||
    null;

  // ✅ If you WANT daily to start at 8pm Cairo even when API is 00:00:00, enable:
  // startAt = applyDailyHourIfNeeded(startAt, raw, 20);
  // endAt   = applyDailyHourIfNeeded(endAt, raw, 23);

  const apiStatus = normalizeStatusWord(raw.status);
  const apiActive = raw.active; // boolean or null
  const isComplete = !!raw.is_complete;

  const durationMin = raw.duration_minutes ?? raw.durationMin ?? raw.duration ?? null;
  const enrolled = !!raw.enrolled;

  return {
    id: raw.id,
    title,
    image: buildImageUrl(raw),
    idea: raw.idea || raw.description || raw.conceptDetails || "",
    prize: raw.prize || raw.prizes || raw.rewards || "",
    startAt: isValidDate(startAt) ? startAt : null,
    endAt: isValidDate(endAt) ? endAt : null,
    apiStatus, // "active" | "upcoming" | "ended" | ...
    apiActive,
    durationMin,
    enrolled,
    _raw: raw,
  };
}

/**
 * ✅ Compute status with correct priority:
 * 1) TIME is truth (prevents wrong API status)
 * 2) If no time -> fallback to API status/flags
 * 3) is_complete=true ALWAYS means ended (even if API says upcoming/ongoing)
 */
function computeCompetitionStatus(normalized, nowMs) {
  if (!normalized) return "none";

  const s = normalized.startAt?.getTime?.() ?? null;
  const e = normalized.endAt?.getTime?.() ?? null;

  // 0) hard flags override everything
  // if (normalized.isComplete) return "ended";
  if (normalized.apiActive === false) return "ended";

  // 1) time-based truth (strongest)
  if (s && nowMs < s) return "upcoming";
  if (e && nowMs >= e) return "ended";
  if (s && e && nowMs >= s && nowMs < e) return "active";

  // 2) fallback to API status
  if (normalized.apiStatus === "ended") return "ended";
  if (normalized.apiStatus === "upcoming") return "upcoming";
  if (normalized.apiStatus === "active") return "active";

  // 3) fallback to active flag
  if (normalized.apiActive === true) return "active";

  // default
  return "active";
}

function computeTargetAt(normalized, computedStatus) {
  if (!normalized) return null;
  if (computedStatus === "upcoming") return normalized.startAt;
  if (computedStatus === "active") return normalized.endAt || null;
  return null;
}

function getTypeBadge(typeRaw) {
  const t = (typeRaw ?? "").toString().toLowerCase();

  // you can tune colors as you like
  if (t === "daily")
    return { label: "يومية", cls: "bg-primary text-white border-white/15" };

  if (t === "weekly")
    return { label: "أسبوعية", cls: "bg-secondary text-white border-white/15" };

  if (t === "monthly")
    return { label: "شهرية", cls: "bg-warning text-white border-black/10" };

  return { label: "مسابقة", cls: "bg-primary text-white border-white/15" };
}

function getQuestionTypeBadge(qtRaw) {
  const q = (qtRaw ?? "").toString().toLowerCase();
  if (q === "single")
    return { label: "اختيار واحد", cls: "bg-white/90 text-black border-black/10" };
  if (q === "multi" || q === "multiple")
    return { label: "اختيارات متعددة", cls: "bg-white/90 text-black border-black/10" };
  return null;
}

function getStatusBadge(status) {
  if (status === "active")
    return { label: "نشطة الآن", cls: "bg-green-600/95 text-white border-white/15" };
  if (status === "upcoming")
    return { label: "قريبًا", cls: "bg-sky-600/95 text-white border-white/15" };
  if (status === "ended")
    return { label: "منتهية", cls: "bg-rose-600/95 text-white border-white/15" };
  return null;
}


export const DailyQuizSection = ({
  buttonHoverColor,
  color = "primary",
  border,
  competition = null,
  onJoin,
  disabled = false,
}) => {
  const router = useRouter();
  const { token, user } = useSelector((state) => state.auth);
  const studentId = user?.id;

  // ✅ tick "now" every second
  const [nowMs, setNowMs] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const pad2 = (n) => String(n).padStart(2, "0");

  const toParts = (seconds) => {
    const s = Math.max(0, Number(seconds) || 0);
    const days = Math.floor(s / 86400);
    const hours = Math.floor((s % 86400) / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    return { days, hours, minutes, secs };
  };

  const formatUpcoming = (seconds) => {
    const { days, hours, minutes, secs } = toParts(seconds);
    return `${days} يوم • ${hours} س • ${minutes} د • ${pad2(secs)} ث`;
  };

  const formatActive = (seconds) => {
    const { days, hours, minutes, secs } = toParts(seconds);
    return `${days} يوم • ${hours} س • ${minutes} د • ${pad2(secs)} ث`;
  };


  // ---------- Normalize Competition ----------
  const normalized = useMemo(() => normalizeCompetition(competition), [competition]);

  // ---------- Status Logic ----------
  const computedStatus = useMemo(
    () => computeCompetitionStatus(normalized, nowMs),
    [normalized, nowMs]
  );



  const typeBadge = useMemo(
    () => getTypeBadge(normalized?._raw?.type || competition?.type),
    [normalized, competition]
  );

  const questionBadge = useMemo(
    () => getQuestionTypeBadge(normalized?._raw?.question_type || competition?.question_type),
    [normalized, competition]
  );

  const statusBadge = useMemo(
    () => getStatusBadge(computedStatus),
    [computedStatus]
  );




  // ---------- Countdown target ----------
  const targetAt = useMemo(
    () => computeTargetAt(normalized, computedStatus),
    [normalized, computedStatus]
  );

  const timeRemaining = useMemo(() => {
    if (!targetAt) return 0;
    const diff = Math.floor((targetAt.getTime() - nowMs) / 1000);
    return Math.max(0, diff);
  }, [targetAt, nowMs]);

  // ---------- Duration/base for progress ----------
  const activeDurationSeconds = useMemo(() => {
    if (!normalized) return 15 * 60;

    if (normalized.durationMin && Number(normalized.durationMin) > 0) {
      return Math.max(1, Number(normalized.durationMin) * 60);
    }

    if (normalized.startAt && normalized.endAt) {
      const diff = Math.floor((normalized.endAt.getTime() - normalized.startAt.getTime()) / 1000);
      return Math.max(1, diff);
    }

    return 15 * 60;
  }, [normalized]);

  // keep a stable "base" per phase
  const baseRef = useRef(1);
  useEffect(() => {
    if (!normalized) return;

    if (computedStatus === "active") {
      baseRef.current = activeDurationSeconds || 1;
    } else if (computedStatus === "upcoming") {
      baseRef.current = Math.max(1, timeRemaining || 1);
    } else {
      baseRef.current = 1;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [normalized?.id, computedStatus, activeDurationSeconds]);

  const progressPercentage = useMemo(() => {
    const base = baseRef.current || 1;
    return Math.max(0, Math.min(100, (timeRemaining / base) * 100));
  }, [timeRemaining]);

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
        prizesDetails: " نقاط تضاف لرصيدك فورا، تقدر تجمعها وتستبدلها بمكافآت داخل المنصة.",
        timeLabel: "الوقت المتبقي  ",
        joinButton: "انضم الآن",
      };
    }

    const startLabel = "متى تبدأ؟";
    const startDetails = normalized.startAt ? `: ${formatInTZ(normalized.startAt)}` : ": قريبًا";

    const conceptLabel = "فكرتها";
    const conceptDetails = `: ${normalized.idea || ""}`;

    const prizesLabel = "الجوائز:";
    const prizesDetails = ` ${normalized.prize || ""}`;

    let timeLabel = "الوقت المتبقي  ";
    if (computedStatus === "upcoming") timeLabel = "يبدأ بعد";
    if (computedStatus === "ended") timeLabel = "انتهت";

    let joinButton = normalized.enrolled ? "ادخل المسابقة" : "انضم الآن";
    if (computedStatus === "upcoming") joinButton = normalized.enrolled ? "مسجل (قريبًا)" : "قريبًا";
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

  const { enroll, loading: isJoining } = useEnrollInCompetition({
    getToken: () => token,
  });

  // ---------- Join rules ----------
  const autoDisabled =
    disabled ||
    isJoining ||
    !competition ||
    !studentId ||
    !token ||
    computedStatus !== "active" ||
    timeRemaining <= 0 ||
    normalized?.apiActive === false;

  const handleJoin = useCallback(async () => {
    if (!token) {
      toast.error("سجّل الدخول أولاً");
      router.push("/login");
      return;
    }
    if (!studentId) {
      toast.error("تعذر تحديد بيانات الطالب");
      return;
    }

    if (computedStatus === "upcoming") {
      toast.message("المسابقة لم تبدأ بعد");
      return;
    }
    if (computedStatus === "ended") {
      toast.message("انتهت المسابقة");
      return;
    }

    const competitionId = competition?.id;
    if (!competitionId) {
      toast.error("Competition ID غير موجود");
      return;
    }

    if (!!competition.enrolled) {
      router.push(`/competitions/${competitionId}`);
      return;
    }

    const res = await enroll({
      student_id: studentId,
      competition_id: competitionId,
    });

    if (res?.ok) {
      toast.success("تم الانضمام للمسابقة ✅");
      router.push(`/competitions/${competitionId}`);
      onJoin?.(competition);
    } else if (res?.aborted) {
      // ignore
    } else {
      toast.error(res?.error || "تعذر الانضمام، حاول مرة أخرى");
    }
  }, [token, studentId, computedStatus, competition, enroll, router, onJoin]);

  // ---------- Image fallback ----------
  const FALLBACK_IMG = "/images/daily-competition-image.png";
  const [imgSrc, setImgSrc] = useState(ui.image || FALLBACK_IMG);

  useEffect(() => {
    setImgSrc(ui.image || FALLBACK_IMG);
  }, [ui.image]);

  const handleImgError = useCallback(() => {
    setImgSrc(FALLBACK_IMG);
  }, []);

  return (
    <section
      className={`${colorClasses.shadow} w-full h-full  md:!w-full px-4 py-4 flex bg-white rounded-[30px] overflow-hidden border-4 ${colorClasses.border}`}
      role="region"
      aria-labelledby="quiz-title"
    >
      <div className="flex w-full relative flex-col items-center gap-4 sm:px-0">
        <div className="relative w-full">
          <img
            loading="lazy"
            className="relative w-full rounded-3xl overflow-hidden h-[173px] object-cover sm:px-0"
            alt="صورة المسابقة"
            src={imgSrc}
            onError={handleImgError}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {/* Type badge */}
              <span
                className={[
                  "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold border shadow-sm backdrop-blur",
                  typeBadge.cls,
                ].join(" ")}
              >
                {typeBadge.label}
              </span>

              {/* Question type badge (optional) */}
              {questionBadge && (
                <span
                  className={[
                    "hidden sm:inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border shadow-sm backdrop-blur",
                    questionBadge.cls,
                  ].join(" ")}
                >
                  {questionBadge.label}
                </span>
              )}
            </div>

            {/* Status badge */}
            {statusBadge && (
              <span
                className={[
                  "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold border shadow-sm backdrop-blur",
                  statusBadge.cls,
                ].join(" ")}
              >
                {statusBadge.label}
              </span>
            )}
          </div>
        </div>


        <div className="flex  flex-col items-center justify-between gap-4 sm:gap-6 relative self-stretch w-full flex-1">
          <div className="flex flex-col gap-3 sm:gap-[11px] relative self-stretch w-full flex-[0_0_auto]">
            <header className="flex items-center justify-center gap-2.5 py-0 relative self-stretch w-full flex-[0_0_auto]">
              <h1
                id="quiz-title"
                className={[`relative flex flex-1 mt-[-1.00px] font-bold ${colorClasses.text} text-lg sm:text-xl tracking-[0] leading-[normal] [direction:rtl] text-center`].join(" ")}
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
                <span
                  className="font-bold text-orange-500 prose prose-neutral"
                  dangerouslySetInnerHTML={{
                    __html: String(ui.conceptLabel || "").replaceAll(/&nbsp;/gi, " "),
                  }}
                />
                <span
                  className="font-medium text-[#2d2d2d] prose prose-neutral"
                  dangerouslySetInnerHTML={{
                    __html: String(ui.conceptDetails || "").replaceAll(/&nbsp;/gi, " "),
                  }}
                />
              </p>

              <p className="self-stretch font-normal text-warning text-sm sm:text-base leading-5 sm:leading-6 relative tracking-[0] [direction:rtl]">
                <span
                  className="font-bold prose prose-neutral"
                  dangerouslySetInnerHTML={{
                    __html: String(ui.prizesLabel || "").replaceAll(/&nbsp;/gi, " "),
                  }}
                />
                <span
                  className="font-medium prose prose-neutral"
                  dangerouslySetInnerHTML={{
                    __html: String(ui.prizesDetails || "").replaceAll(/&nbsp;/gi, " "),
                  }}
                />
              </p>
            </div>


          </div>

          <div className="w-full sm:px-0 flex flex-col items-center justify-center gap-3 sm:gap-4 relative self-stretch flex-[0_0_auto]">
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
                    {computedStatus === "ended"
                      ? "0"
                      : computedStatus === "upcoming"
                        ? formatUpcoming(timeRemaining)
                        : formatActive(timeRemaining)}
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
                  className={`relative h-1 ${colorClasses.text.replace("text-", "bg-")} transition-all duration-1000 ease-linear`}
                  style={{
                    width: `${progressPercentage}%`,
                    left: `${100 - progressPercentage}%`,
                  }}
                />
              </div>
            </div>
            <button
              className={`flex w-full  items-center justify-center gap-2 px-6 sm:px-12 py-3 sm:py-4
                ${colorClasses.bg} ${colorClasses.hover}
                rounded-[15px] shadow-[0px_6px_24px_#bac6dc33]
                transition-colors duration-200
                ${autoDisabled ? "opacity-60 cursor-not-allowed" : ""}`}
              type="button"
              onClick={handleJoin}
              disabled={autoDisabled}
              aria-label="انضم إلى المسابقة"
            >
              <span className="font-bold text-neutral-50 text-sm sm:text-base [direction:rtl]">
                {isJoining ? "جاري الانضمام..." : ui.joinButton}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
