"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeShare } from "@/components/utils/Store/Slices/shareSlice";

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  RedditShareButton,
  EmailShareButton,
  PinterestShareButton,
} from "react-share";

import {
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Link as LinkIcon,
  Share2,
  X as CloseIcon,
  MessageCircle,
  Send,
  Globe,
  Pin,
  Check,
  ShieldCheck,
} from "lucide-react";

export default function ShareModal() {
  const dispatch = useDispatch();
  const { open, data } = useSelector((state) => state.share);

  const { url, title = "", summary = "", image = "" } = data || {};

  const [copied, setCopied] = useState(false);
  const panelRef = useRef(null);

  const onClose = () => dispatch(closeShare());

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();

      if (e.key === "Tab" && open && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll(
          'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    if (open) {
      document.addEventListener("keydown", onKey);
      setTimeout(() => panelRef.current?.focus(), 0);
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const copyLink = async () => {
    if (!url) return;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  const nativeShare = async () => {
    if (!url) return;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: title || "مشاركة",
          text: summary || title,
          url,
        });
      } catch {}
    } else {
      copyLink();
    }
  };

  const items = [
    {
      key: "facebook",
      label: "فيسبوك",
      Button: FacebookShareButton,
      icon: <Facebook className="h-5 w-5" aria-hidden />,
      props: { url, quote: title },
    },
    {
      key: "twitter",
      label: "إكس",
      Button: TwitterShareButton,
      icon: <Twitter className="h-5 w-5" aria-hidden />,
      props: { url, title },
    },
    {
      key: "linkedin",
      label: "لينكدإن",
      Button: LinkedinShareButton,
      icon: <Linkedin className="h-5 w-5" aria-hidden />,
      props: { url, title, summary },
    },
    {
      key: "whatsapp",
      label: "واتساب",
      Button: WhatsappShareButton,
      icon: <MessageCircle className="h-5 w-5" aria-hidden />,
      props: { url, title, separator: " — " },
    },
    {
      key: "telegram",
      label: "تيليجرام",
      Button: TelegramShareButton,
      icon: <Send className="h-5 w-5" aria-hidden />,
      props: { url, title },
    },
    {
      key: "reddit",
      label: "ريديت",
      Button: RedditShareButton,
      icon: <Globe className="h-5 w-5" aria-hidden />,
      props: { url, title },
    },
    {
      key: "pinterest",
      label: "بنترست",
      Button: PinterestShareButton,
      icon: <Pin className="h-5 w-5" aria-hidden />,
      props: { media: image || url, url, description: title },
    },
    {
      key: "email",
      label: "البريد",
      Button: EmailShareButton,
      icon: <Mail className="h-5 w-5" aria-hidden />,
      props: { url, subject: title || "مشاركة", body: summary || url },
    },
    {
      key: "copy",
      label: copied ? "تم النسخ" : "نسخ الرابط",
      Button: null,
      icon: copied ? <Check className="h-5 w-5" aria-hidden /> : <LinkIcon className="h-5 w-5" aria-hidden />,
      onClick: copyLink,
    },
    {
      key: "native",
      label: "مشاركة…",
      Button: null,
      icon: <Share2 className="h-5 w-5" aria-hidden />,
      onClick: nativeShare,
    },
  ];

  if (!open) return null;

  return (
    <div className="!fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-label="نافذة المشاركة" dir="rtl">
      <button aria-label="إغلاق" onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      <div ref={panelRef} tabIndex={-1} className="relative z-[1000] w-full max-w-3xl rounded-2xl bg-white shadow-2xl outline-none overflow-hidden">
        <div className="p-4 sm:p-5">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100">
                  <Share2 className="h-5 w-5 text-gray-700" aria-hidden />
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">مشاركة الدورة</h3>
                  <p className="text-xs sm:text-sm text-gray-500 line-clamp-1">
                    {title || "اختر طريقة المشاركة المناسبة"}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="max-w-full truncate rounded-full border bg-gray-50 px-3 py-1 text-xs text-gray-700" title={url}>
                  {url || "—"}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-xs text-gray-500">
                  <ShieldCheck className="h-4 w-4" aria-hidden />
                  رابط آمن
                </span>
              </div>
            </div>

            <button onClick={onClose} aria-label="إغلاق" className="rounded-full p-2 text-gray-600 hover:bg-gray-100 active:scale-95 transition">
              <CloseIcon className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-10">
            {items.map(({ key, label, Button, icon, props, onClick }) => (
              <div key={key} className="flex flex-col items-center">
                {Button ? (
                  <Button {...(props || {})} disabled={!url}>
                    <span className="group grid h-12 w-12 place-items-center rounded-2xl border border-gray-200 bg-white shadow-sm hover:bg-gray-50 hover:shadow active:scale-95 transition" aria-label={label}>
                      <span className="text-gray-700 group-hover:text-gray-900">{icon}</span>
                    </span>
                  </Button>
                ) : (
                  <button onClick={onClick} aria-label={label} disabled={!url} className="group grid h-12 w-12 place-items-center rounded-2xl border border-gray-200 bg-white shadow-sm hover:bg-gray-50 hover:shadow active:scale-95 transition disabled:opacity-50">
                    <span className="text-gray-700 group-hover:text-gray-900">{icon}</span>
                  </button>
                )}
                <span className="mt-1.5 text-center text-[11px] sm:text-xs text-gray-700">{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-gray-500">
              {copied ? (
                <span className="flex items-center gap-2">
                  تم نسخ الرابط بنجاح <Check className="h-4 w-4" />
                </span>
              ) : (
                "يمكنك نسخ الرابط أو استخدام المشاركة السريعة"
              )}
            </div>

            <div className="flex items-center gap-2">
              <button onClick={copyLink} disabled={!url} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-800 hover:bg-gray-100 active:scale-95 transition disabled:opacity-50">
                {copied ? <Check className="h-4 w-4" aria-hidden /> : <LinkIcon className="h-4 w-4" aria-hidden />}
                {copied ? "تم النسخ" : "نسخ الرابط"}
              </button>

              <button onClick={nativeShare} disabled={!url} className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-3 py-2 text-xs font-medium text-white hover:opacity-90 active:scale-95 transition disabled:opacity-50">
                <Share2 className="h-4 w-4" aria-hidden />
                مشاركة سريعة
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
