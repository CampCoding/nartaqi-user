"use client";

import React from "react";

export const ConfirmSubmitModal = ({
  isOpen,
  onClose,
  onConfirm,
  stats,
  submitting,
}) => {
  if (!isOpen) return null;

  const hasUnanswered = stats.unanswered > 0;
  const hasFlagged = stats.flagged > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 animate-fadeIn">
        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-center text-text mb-4">
          تأكيد إنهاء الاختبار
        </h3>

        {/* Stats */}
        <div className="space-y-3 mb-6">
          {/* Total Progress */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <span className="text-gray-600">إجمالي الأسئلة</span>
            <span className="font-bold text-text">{stats.total}</span>
          </div>

          {/* Answered */}
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className="text-green-700">تمت الإجابة</span>
            </div>
            <span className="font-bold text-green-700">{stats.answered}</span>
          </div>

          {/* Unanswered */}
          {hasUnanswered && (
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-200">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="text-red-700">لم تتم الإجابة</span>
              </div>
              <span className="font-bold text-red-700">{stats.unanswered}</span>
            </div>
          )}

          {/* Flagged */}
          {hasFlagged && (
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex items-center gap-2">
                <FlagIcon className="w-4 h-4 text-amber-500" />
                <span className="text-amber-700">معلّمة للمراجعة</span>
              </div>
              <span className="font-bold text-amber-700">{stats.flagged}</span>
            </div>
          )}
        </div>

        {/* Warning Message */}
        <div className="p-4 bg-gray-100 rounded-xl mb-6">
          <p className="text-sm text-gray-700 text-center leading-relaxed">
            {hasUnanswered && hasFlagged ? (
              <>
                لديك{" "}
                <span className="font-bold text-red-600">
                  {stats.unanswered}
                </span>{" "}
                سؤال بدون إجابة و{" "}
                <span className="font-bold text-amber-600">
                  {stats.flagged}
                </span>{" "}
                سؤال معلّم للمراجعة.
                <br />
                هل أنت متأكد من إنهاء الاختبار؟
              </>
            ) : hasUnanswered ? (
              <>
                لديك{" "}
                <span className="font-bold text-red-600">
                  {stats.unanswered}
                </span>{" "}
                سؤال بدون إجابة.
                <br />
                هل أنت متأكد من إنهاء الاختبار؟
              </>
            ) : hasFlagged ? (
              <>
                لديك{" "}
                <span className="font-bold text-amber-600">
                  {stats.flagged}
                </span>{" "}
                سؤال معلّم للمراجعة.
                <br />
                هل أنت متأكد من إنهاء الاختبار؟
              </>
            ) : (
              "هل أنت متأكد من إنهاء الاختبار؟"
            )}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            disabled={submitting}
            className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition"
          >
            العودة للمراجعة
          </button>
          <button
            onClick={onConfirm}
            disabled={submitting}
            className={`flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-bold rounded-xl transition ${
              submitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {submitting ? "جاري الإرسال..." : "تأكيد الإنهاء"}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

// Flag Icon
const FlagIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M3 2.25a.75.75 0 01.75.75v.54l1.838-.46a9.75 9.75 0 016.725.738l.108.054a8.25 8.25 0 005.58.652l3.109-.732a.75.75 0 01.917.81 47.784 47.784 0 00.005 10.337.75.75 0 01-.574.812l-3.114.733a9.75 9.75 0 01-6.594-.77l-.108-.054a8.25 8.25 0 00-5.69-.625l-2.202.55V21a.75.75 0 01-1.5 0V3A.75.75 0 013 2.25z"
      clipRule="evenodd"
    />
  </svg>
);

export default ConfirmSubmitModal;
