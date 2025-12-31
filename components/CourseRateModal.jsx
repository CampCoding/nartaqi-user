// components/CourseRateModal.js
"use client";

import React, { useMemo, useState } from "react";
import { X } from "lucide-react";
import { Rate } from "antd";

// replace with your real hook
const useMakeRoundRate = ({ token }) => {
  return {
    submitRate: async (data) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Submitting rate:", data);
    },
    loading: false,
  };
};

export default function CourseRateModal({
  open,
  onClose,
  roundId,
  studentId,
  token,
}) {
  const { submitRate, loading } = useMakeRoundRate({ token });

  const [rate, setRate] = useState(3);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const canSubmit = useMemo(() => {
    return !!roundId && !!studentId && rate >= 0.5 && rate <= 5 && !loading;
  }, [roundId, studentId, rate, loading]);

  if (!open) return null;

  const getRatingText = (rating) => {
    if (rating <= 1) return "سيء جداً";
    if (rating <= 2) return "سيء";
    if (rating <= 3) return "متوسط";
    if (rating <= 4) return "جيد";
    return "ممتاز";
  };

  const displayRate = hoverValue ?? rate;

  const handleSubmit = async () => {
    try {
      await submitRate({
        round_id: Number(roundId),
        student_id: String(studentId),
        rate: String(rate),
        comment: comment?.trim() || "",
      });

      setIsSubmitted(true);
      setTimeout(() => {
        onClose?.();
        setComment("");
        setRate(3);
        setHoverValue(undefined);
        setIsSubmitted(false);
      }, 1200);
    } catch (e) {
      console.error(e?.message || "فشل إرسال التقييم");
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Overlay */}
      <button
        aria-label="close"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg animate-in zoom-in-95 fade-in duration-200">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
            <h3 className="font-bold text-xl text-gray-800">تقييم الدورة</h3>
            <button
              onClick={onClose}
              className="h-10 w-10 rounded-full hover:bg-white/80 transition-colors flex items-center justify-center group"
              aria-label="close modal"
            >
              <X className="h-5 w-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Rating Section */}
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 mb-2">
                  اختر تقييمك
                </p>
                <p className="text-2xl font-bold text-gray-800 h-8 transition-all">
                  {displayRate > 0 && getRatingText(displayRate)}
                </p>
              </div>

              {/* ✅ Antd Rate */}
              <div className="flex items-center justify-center">
                <Rate
                  allowHalf
                  value={rate}
                  onChange={(v) => setRate(v)}
                  onHoverChange={(v) => setHoverValue(v)}
                  className="[direction:ltr] text-4xl" // نجوم كبيرة + LTR عشان ترتيب النجوم
                />
              </div>

              {/* Rating Display */}
              <div className="text-center">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 border border-yellow-200">
                  <span className="text-yellow-600 font-bold text-lg">
                    {rate}
                  </span>
                  <span className="text-yellow-600 text-sm">من 5</span>
                </span>
              </div>
            </div>

            {/* Comment Section */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                تعليق <span className="text-gray-400 text-xs">(اختياري)</span>
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                maxLength={500}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-gray-800 placeholder-gray-400"
                placeholder="شاركنا رأيك في الدورة... ما الذي أعجبك؟ وما الذي يمكن تحسينه؟"
              />
              <div className="flex justify-end">
                <span className="text-xs text-gray-400">{comment.length}/500</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={!canSubmit}
              onClick={handleSubmit}
              className="w-full rounded-2xl bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white py-4 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl relative overflow-hidden group"
            >
              {isSubmitted ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  تم الإرسال بنجاح!
                </span>
              ) : loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  جاري الإرسال...
                </span>
              ) : (
                "إرسال التقييم"
              )}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
