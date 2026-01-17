"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectExamScore,
  selectExamPercentage,
  closeExam,
} from "../../components/utils/Store/Slices/examSlice";

export const FixedResultHero = ({ open, setOpen, id, lessonId, courseId }) => {
  // Get score from Redux
  const score = useSelector(selectExamScore);
  const percentage = useSelector(selectExamPercentage);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

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

  // Determine if passed (you can adjust this threshold)
  const passed = percentage >= 50;

  const resultImage = passed
    ? user.gender == "male"
      ? "/images/good-exam-result.png"
      : "/images/good-exam-result-girl.png"
    : user.gender == "male"
    ? "/images/bad-exam-result.png"
    : "/images/bad-exam-result-girl.png";

  const resultMessage = passed
    ? user.gender == "male"
      ? "تهانينا لقد نجحت في الاختبار"
      : "تهانينا لقد نجحت في الاختبار"
    : user.gender == "male"
    ? "للأسف لم تحقق درجة النجاح المطلوبة في هذا الاختبار"
    : "للأسف لم تحقق درجة النجاح المطلوبة في هذا الاختبار";

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
            {/* Mobile Image */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 lg:hidden mb-4">
              <img
                loading="lazy"
                className="w-full h-full object-contain"
                alt="Result icon"
                src={resultImage}
              />
            </div>

            <header className="flex flex-col w-full items-center gap-3 sm:gap-4">
              <h1 className="font-bold text-foundation-orangedarker text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[56px] text-center tracking-tight leading-tight">
                نتيجة الاختبار
              </h1>

              {/* Score Display */}
              {score && (
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] text-center tracking-tight leading-none ${
                      passed ? "text-secondary" : "text-red-500"
                    }`}
                    role="status"
                    aria-label={`Test score: ${percentage} percent`}
                  >
                    {percentage}%
                  </div>
                  <div className="text-text-alt text-lg sm:text-xl md:text-2xl font-medium">
                    {score}
                  </div>
                </div>
              )}

              {/* Fallback if no score */}
              {!score && (
                <div
                  className="font-bold text-secondary text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] text-center tracking-tight leading-none"
                  role="status"
                >
                  --
                </div>
              )}
            </header>

            <p className="font-medium text-variable-collection-text text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center px-2 leading-relaxed">
              {resultMessage}
            </p>

            {/* Action Buttons */}
            <div className=" w-full">
              <Link
                href={`/intern-test-details/${id}`}
                onClick={() => {
                  setOpen(false);
                  dispatch(closeExam());
                }}
                className="!w-full px-8 sm:px-10 lg:px-12 py-3 sm:py-4 bg-gradient-to-r from-primary to-secondary hover:scale-105 active:scale-95 transition-transform rounded-[15px] sm:rounded-[20px] flex justify-center items-center shadow-lg"
              >
                <span className="text-white text-sm sm:text-base font-bold">
                  عرض التفاصيل
                </span>
              </Link>
            </div>
          </section>

          {/* Image Section - Hidden on Mobile */}
          <div className="hidden lg:block lg:w-[58%] relative">
            <img
              loading="lazy"
              className="w-full h-full object-cover"
              alt="Result illustration"
              src={resultImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
