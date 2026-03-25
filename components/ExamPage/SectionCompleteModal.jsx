"use client";

import React from "react";

export const SectionCompleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  sectionStats,
  currentSectionTitle,
  nextSectionTitle,
  isLastSection,
}) => {
  if (!isOpen) return null;

  const hasUnanswered = sectionStats.unanswered > 0;
  const hasFlagged = sectionStats.flagged > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-5 sm:p-8 animate-fadeIn max-h-[90vh] overflow-y-auto">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
            <CheckIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-center text-text mb-2">
          {isLastSection ? "إنهاء القسم الأخير" : "إتمام القسم"}
        </h3>

        <p className="text-center text-gray-500 mb-4 text-sm sm:text-base">
          {currentSectionTitle && (
            <span dangerouslySetInnerHTML={{ __html: currentSectionTitle }} />
          )}
        </p>

        {/* Stats */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <span className="text-gray-600 text-sm sm:text-base">
              أسئلة القسم
            </span>
            <span className="font-bold text-text">{sectionStats.total}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className="text-green-700 text-sm sm:text-base">
                تمت الإجابة
              </span>
            </div>
            <span className="font-bold text-green-700">
              {sectionStats.answered}
            </span>
          </div>

          {hasUnanswered && (
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-200">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="text-red-700 text-sm sm:text-base">
                  لم تتم الإجابة
                </span>
              </div>
              <span className="font-bold text-red-700">
                {sectionStats.unanswered}
              </span>
            </div>
          )}

          {hasFlagged && (
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex items-center gap-2">
                <FlagIcon className="w-4 h-4 text-amber-500" />
                <span className="text-amber-700 text-sm sm:text-base">
                  معلّمة للمراجعة
                </span>
              </div>
              <span className="font-bold text-amber-700">
                {sectionStats.flagged}
              </span>
            </div>
          )}
        </div>

        {/* Next Section Info */}
        {!isLastSection && nextSectionTitle && (
          <div className="p-4 bg-blue-50 rounded-xl mb-6 border border-blue-200">
            <p className="text-sm text-blue-700 text-center">
              <span className="font-bold">القسم التالي:</span>{" "}
              <span dangerouslySetInnerHTML={{ __html: nextSectionTitle }} />
            </p>
          </div>
        )}

        {/* Warning */}
        {(hasUnanswered || hasFlagged) && (
          <div className="p-4 bg-yellow-50 rounded-xl mb-6 border border-yellow-200">
            <p className="text-sm text-yellow-700 text-center leading-relaxed">
              ⚠️ لن تتمكن من العودة لهذا القسم بعد الانتقال
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition text-sm sm:text-base"
          >
            العودة للمراجعة
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-bold rounded-xl transition text-sm sm:text-base"
          >
            {isLastSection ? "إنهاء الاختبار" : "القسم التالي"}
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

const CheckIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
      clipRule="evenodd"
    />
  </svg>
);

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

export default SectionCompleteModal;
