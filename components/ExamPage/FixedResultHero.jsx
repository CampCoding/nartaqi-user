import Link from "next/link";
import React, { useEffect } from "react";

export const FixedResultHero = ({ open, setOpen }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-white w-full overflow-hidden rounded-t-[30px] sm:rounded-[30px] lg:rounded-[50px] max-w-[1000px] shadow-2xl animate-slideUpMobile sm:animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Handle */}
        <div className="sm:hidden flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Content Section */}
          <section className="w-full lg:w-[42%] flex flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-[54px] px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-12 bg-white">
            <div className="w-32 h-32 sm:w-40 sm:h-40 lg:hidden mb-4">
              <img
                className="w-full h-full object-contain"
                alt="Success icon"
                src={"/images/good-exam-result.png"}
              />
            </div>

            <header className="flex flex-col w-full items-center gap-3 sm:gap-4">
              <h1 className="font-bold text-foundation-orangedarker text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[56px] text-center tracking-tight leading-tight">
                نتيجة الاختبار
              </h1>

              <div
                className="font-bold text-secondary text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] text-center tracking-tight leading-none"
                role="status"
                aria-label="Test score: 85 percent"
              >
                85%
              </div>
            </header>

            <p className="font-medium text-variable-collection-text text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center px-2 leading-relaxed">
              تهانينا لقد نجحت في الاختبار
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                href={"/exam-details/123"}
                onClick={() => setOpen(false)}
                className="w-full sm:w-auto px-8 sm:px-10 lg:px-12 py-3 sm:py-4 bg-gradient-to-r from-primary to-secondary hover:scale-105 active:scale-95 transition-transform rounded-[15px] sm:rounded-[20px] flex justify-center items-center shadow-lg"
              >
                <span className="text-white text-sm sm:text-base font-bold">
                  عرض التفاصيل
                </span>
              </Link>

              <button
                onClick={() => setOpen(false)}
                className="w-full sm:w-auto px-8 sm:px-10 lg:px-12 py-3 sm:py-4 bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary transition-all rounded-[15px] sm:rounded-[20px] flex justify-center items-center"
              >
                <span className="text-sm sm:text-base font-bold">إغلاق</span>
              </button>
            </div>
          </section>

          {/* Image Section - Hidden on Mobile */}
          <div className="hidden lg:block lg:w-[58%] relative">
            <img
              className="w-full h-full object-cover"
              alt="Congratulations illustration"
              src={"/images/good-exam-result.png"}
            />
          </div>
        </div>

        {/* Close Button - Desktop Only */}
        <button
          onClick={() => setOpen(false)}
          className="hidden sm:flex absolute top-4 right-4 lg:top-6 lg:right-6 w-10 h-10 items-center justify-center bg-white hover:bg-gray-100 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
