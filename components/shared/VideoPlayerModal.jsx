"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { X, PlayCircle } from "lucide-react";
import { closeVideoModal } from "@/components/utils/Store/Slices/videoModalSlice";
import VideoPlayer from "@/components/ui/Video"; // عدّل المسار حسب مشروعك

export default function VideoPlayerModal() {
  const dispatch = useDispatch();
  const { open, data } = useSelector((s) => s.videoModal);
  const panelRef = useRef(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ✅ احذف params الخاصة بالمشغل
  const stripPlayerParams = useCallback(() => {
    const next = new URLSearchParams(searchParams?.toString?.() || "");

    // params used in player / preview
    next.delete("watch");
    next.delete("video");
    next.delete("vimeo_id");
    next.delete("youtube_id");

    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [router, pathname, searchParams]);

  const onClose = useCallback(() => {
    dispatch(closeVideoModal());
    stripPlayerParams();
  }, [dispatch, stripPlayerParams]);

  // ESC + focus بسيط
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();

      // Focus trap خفيف
      if (e.key === "Tab" && panelRef.current) {
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

    document.addEventListener("keydown", onKey);
    setTimeout(() => panelRef.current?.focus(), 0);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // منع سكرول الخلفية
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const title = data?.title || "مشاهدة الفيديو";
  const vimeoId = data?.vimeoId || "";
  const youtubeId = data?.youtubeId || "";
  const autoplay = data?.autoplay ?? true;

  return createPortal(
    <div
      className="fixed  inset-0 z-[9999] flex items-center justify-center p-3 sm:!p-10"
      role="dialog"
      aria-modal="true"
      aria-label="Video Modal"
      dir="rtl"
    >
      {/* Backdrop */}
      <button
        aria-label="إغلاق"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-[3px]"
      />  

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className="
          relative z-[10000]
          w-full max-w-4xl
          rounded-2xl bg-white
          shadow-2xl
          overflow-hidden
          outline-none
          
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-0  bg-white/90">
          <div className="min-w-0 flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100">
              <PlayCircle className="h-5 w-5 text-gray-700" />
            </span>
            <div className="min-w-0">
              <div className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                {title}
              </div>
              <div className="text-[11px] sm:text-xs text-gray-500">
                ESC للإغلاق • Double click fullscreen داخل المشغل
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="إغلاق"
            className="rounded-full p-2 text-gray-600 hover:bg-gray-100 active:scale-95 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="bg-black  overflow-auto">
          <div className="w-full 
          ">
            <VideoPlayer
              // ✅ مهم: لو VideoPlayer عندك بيقرأ فقط من query params
              // سيظل شغال لأن المودال أصلاً اتفتح بسبب وجود params
              // هنا بنمرر قيم احتياطية لو بتدعمها
              vimeo_id={vimeoId}
              youtube_id={youtubeId}
              defaultPlay={autoplay}
              rootClassName="w-full"
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
