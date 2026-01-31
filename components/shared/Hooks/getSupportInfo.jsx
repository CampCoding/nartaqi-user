"use client";

import React, { useEffect, useMemo, useState } from "react";

const ENDPOINT =
  "https://camp-coding.site/nartaqi/public/api/user/settings/getSupportInfo";

function normalizePhoneForLink(phone) {
  // whatsapp/tel links prefer digits with optional leading +
  return String(phone || "").replace(/[^\d+]/g, "");
}

function buildWhatsAppLink(phone, message) {
  const num = normalizePhoneForLink(phone).replace(/^\+/, ""); // wa.me بدون +
  const text = encodeURIComponent(message || "");
  // wa.me supports ?text
  return `https://wa.me/${num}?text=${text}`;
}

function buildMailto(email, subject, body) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const q = params.toString();
  return `mailto:${email}${q ? `?${q}` : ""}`;
}

export default function SupportWidget({
  // optional: override endpoint
  endpoint = ENDPOINT,
  // optional: default fallback UI while loading
  showWhileLoading = true,
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState(null);
  const [error, setError] = useState("");

  // ✅ fetch once (no token / no headers / no abort)
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(endpoint, { method: "GET" });
        const data = await res.json();

        if (!mounted) return;

        const payload = data?.message ?? null;
        setInfo(payload);
      } catch (e) {
        if (!mounted) return;
        setError("تعذر تحميل بيانات الدعم حالياً.");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [endpoint]);

  // close on ESC + click outside overlay handled below
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const active = !!info?.active;
  const showWhatsApp = !!info?.show_whatsapp && !!info?.whatsapp_number;
  const showEmail = !!info?.show_email && !!info?.support_email;
  const showPhone = !!info?.phone_number;

  const hasAny =
    (showWhatsApp || showEmail || showPhone) && active && !error;

  const whatsappHref = useMemo(() => {
    if (!showWhatsApp) return "#";
    return buildWhatsAppLink(info.whatsapp_number, info.whatsapp_message);
  }, [showWhatsApp, info]);

  const telHref = useMemo(() => {
    if (!showPhone) return "#";
    return `tel:${normalizePhoneForLink(info.phone_number)}`;
  }, [showPhone, info]);

  const mailHref = useMemo(() => {
    if (!showEmail) return "#";
    return buildMailto(
      info.support_email,
      "Support Request",
      "مرحباً، أحتاج مساعدة بخصوص..."
    );
  }, [showEmail, info]);

  if (!hasAny) {
    // optionally show nothing if not active / no channels
    if (!showWhileLoading && loading) return null;
    if (loading && showWhileLoading) return <FloatingSkeleton />;
    return null;
  }

  return (
    <>
      {/* Floating Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={[
          "fixed bottom-5 right-5 z-[9999]",
          "rounded-full shadow-lg",
          "bg-primary text-white",
          "h-14 w-14 grid place-items-center",
          "hover:scale-[1.03] active:scale-[0.98] transition",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
        ].join(" ")}
        aria-label="الدعم"
      >
        {/* simple chat icon */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 4h16v11a3 3 0 0 1-3 3H9l-5 4V7a3 3 0 0 1 3-3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M8 9h8M8 13h6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[10000]" dir="rtl">
          {/* overlay */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            aria-label="إغلاق"
          />

          {/* panel */}
          <div
            className={[
              "absolute bottom-24 right-5 w-[92vw] max-w-[380px]",
              "rounded-3xl border bg-white shadow-2xl overflow-hidden",
              "animate-in fade-in zoom-in-95 duration-150",
            ].join(" ")}
            role="dialog"
            aria-modal="true"
            aria-label="معلومات الدعم"
          >
            {/* header */}
            <div className="p-4 flex items-start justify-between gap-3">
              <div className="text-right">
                <p className="text-base font-extrabold text-foreground">
                  مركز الدعم
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  اختر طريقة التواصل المناسبة لك
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="h-10 w-10 rounded-full grid place-items-center border bg-white hover:bg-muted/50 transition"
                aria-label="إغلاق"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M18 6 6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="h-px bg-border" />

            {/* body */}
            <div className="p-4 space-y-3">
              {info?.working_hours_text ? (
                <InfoRow label="ساعات العمل" value={info.working_hours_text} />
              ) : null}

              {info?.response_time_text ? (
                <InfoRow label="وقت الاستجابة" value={info.response_time_text} />
              ) : null}

              <div className="grid grid-cols-1 gap-2 pt-1">
                {showWhatsApp && (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className={actionClass("bg-emerald-600 hover:bg-emerald-700")}
                  >
                    <span className="font-bold">واتساب</span>
                    <span className="text-xs opacity-90">
                      {info.whatsapp_number}
                    </span>
                  </a>
                )}

                {showPhone && (
                  <a
                    href={telHref}
                    className={actionClass("bg-slate-900 hover:bg-slate-800")}
                  >
                    <span className="font-bold">اتصال</span>
                    <span className="text-xs opacity-90">
                      {info.phone_number}
                    </span>
                  </a>
                )}

                {showEmail && (
                  <a
                    href={mailHref}
                    className={actionClass("bg-indigo-600 hover:bg-indigo-700")}
                  >
                    <span className="font-bold">إيميل</span>
                    <span className="text-xs opacity-90">
                      {info.support_email}
                    </span>
                  </a>
                )}
              </div>

              {error ? (
                <p className="text-sm text-red-600 text-right">{error}</p>
              ) : null}
            </div>

            <div className="h-10 bg-gradient-to-t from-white to-transparent" />
          </div>
        </div>
      )}
    </>
  );
}

function actionClass(extra) {
  return [
    "w-full rounded-2xl px-4 py-3 text-white",
    "flex items-center justify-between gap-3",
    "transition shadow-sm hover:shadow-md",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
    extra,
  ].join(" ");
}

function InfoRow({ label, value }) {
  return (
    <div className="rounded-2xl border bg-muted/20 px-4 py-3">
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-bold text-foreground leading-relaxed">
        {value}
      </p>
    </div>
  );
}

function FloatingSkeleton() {
  return (
    <div className="fixed bottom-5 right-5 z-[9999] h-14 w-14 rounded-full bg-muted animate-pulse" />
  );
}
