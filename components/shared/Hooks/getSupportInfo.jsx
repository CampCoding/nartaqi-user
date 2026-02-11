"use client";

import { useEffect, useMemo, useState } from "react";

const ENDPOINT =
  "https://camp-coding.site/nartaqi/public/api/user/settings/getSupportInfo";

function normalizePhoneForLink(phone) {
  return String(phone || "").replace(/[^\d+]/g, "");
}

function buildWhatsAppLink(phone, message) {
  const num = normalizePhoneForLink(phone).replace(/^\+/, "");
  const text = encodeURIComponent(message || "");
  return `https://wa.me/${num}?text=${text}`;
}

export default function useSupportInfo(endpoint = ENDPOINT) {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(endpoint, {
          method: "GET",
          signal: controller.signal,
          cache: "no-store",
        });

        const data = await res.json();
        setInfo(data?.message ?? null);
      } catch (e) {
        if (e?.name === "AbortError") return;
        setError("تعذر تحميل بيانات الدعم حالياً. حاول مرة أخرى.");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [endpoint]);

  const computed = useMemo(() => {
    const isActive = !!info?.active;

    const showWhatsApp =
      isActive && !!info?.show_whatsapp && !!info?.whatsapp_number;
    const showEmail = isActive && !!info?.show_email && !!info?.support_email;
    const showPhone = isActive && !!info?.phone_number;

    const whatsappHref = showWhatsApp
      ? buildWhatsAppLink(info.whatsapp_number, info.whatsapp_message)
      : "#";

    const emailText = info?.support_email || "—";
    const phoneText = info?.phone_number || "—";
    const whatsappNumber = info?.whatsapp_number || "—";

    const telHref = showPhone
      ? `tel:${normalizePhoneForLink(info.phone_number)}`
      : "#";

    return {
      isActive,
      showWhatsApp,
      showEmail,
      showPhone,
      whatsappHref,
      whatsappNumber,
      emailText,
      phoneText,
      telHref,
    };
  }, [info]);

  return {
    loading,
    error,
    info,
    ...computed,
  };
}
