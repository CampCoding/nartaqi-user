"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ResultsImagesSliderModal({
  open,
  onClose,
  items = [],
  initialIndex = 0,
  title = "صور النتائج",
}) {
  const safeIndex = useMemo(() => {
    const n = Array.isArray(items) ? items.length : 0;
    if (!n) return 0;
    const idx = Number(initialIndex) || 0;
    return Math.min(Math.max(idx, 0), n - 1);
  }, [items, initialIndex]);

  // Prevent body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* overlay */}
      <button
        aria-label="close overlay"
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
      />

      {/* panel */}
      <div className="relative w-[min(1000px,92vw)] max-h-[92vh] overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* header */}
        <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
          <div className="font-extrabold text-text line-clamp-1">{title}</div>

          <button
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-xl border hover:bg-neutral-50"
            aria-label="close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* body */}
        <div className="relative p-3">
          {/* custom nav buttons */}
          <button
            className="resultsPrev absolute left-3 top-1/2 -translate-y-1/2 z-10 grid h-11 w-11 place-items-center rounded-2xl bg-white/90 border shadow hover:bg-white"
            aria-label="prev"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            className="resultsNext absolute right-3 top-1/2 -translate-y-1/2 z-10 grid h-11 w-11 place-items-center rounded-2xl bg-white/90 border shadow hover:bg-white"
            aria-label="next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <Swiper
            modules={[Navigation, Keyboard]}
            initialSlide={safeIndex}
            navigation={{
              prevEl: ".resultsPrev",
              nextEl: ".resultsNext",
            }}
            keyboard={{ enabled: true }}
            spaceBetween={12}
            slidesPerView={1}
            className="w-full"
          >
            {items.map((it, idx) => {
              const img = it?.image_url || "/images/resultImage.png";
              const t = it?.title || `نتيجة ${idx + 1}`;
              return (
                <SwiperSlide key={it?.id ?? idx}>
                  <div className="w-full">
                    <div className="rounded-2xl overflow-hidden bg-neutral-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={t}
                        className="w-full h-[65vh] max-h-[70vh] object-contain bg-black/5"
                        loading="lazy"
                      />
                    </div>

                    <div className="mt-3 px-1">
                      <div className="text-sm text-neutral-500">
                        {idx + 1} / {items.length}
                      </div>
                      <div className="font-bold text-text line-clamp-2">{t}</div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
