"use client";

import React from "react";
import PagesBanner from "../../../components/ui/PagesBanner";
import ExamDetailsHeader from "../../../components/ExamDetailsPage/ExamDetailsHeader";
import { Instructions } from "../../../components/ExamDetailsPage/Instructions";
import { Alerts } from "../../../components/ExamDetailsPage/Alerts";
import ExamResults from "../../../components/ExamPage/ExamResults";
import Link from "next/link";
import Container from "../../../components/ui/Container";

const ExamDetails = () => {
  const [showResults, setShowResults] = React.useState(false);

  return (
    <div>
      <PagesBanner
        variant="normal"
        image={"/images/exam-details-banner.png"}
        title={"تفاصيل الأختبار"}
        breadcrumb={[
          { title: "الرئيسية", link: "/" },
          { title: "إتقان التدريس الفعال - معلمين", link: "#" },
          { title: "اختبارات", link: "#" },
          { title: "تفاصيل الأختبار", link: "#" },
        ]}
      />

      {!showResults && (
        <Container className=" mt-6 sm:mt-8 lg:mt-10 mb-8 sm:mb-12 lg:mb-16">
          <ExamDetailsHeader />

          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mt-6 sm:mt-8 lg:mt-10 mb-8 sm:mb-12 lg:mb-14 gap-6 sm:gap-8 lg:gap-12">
            <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12 w-full lg:w-2/3">
              <Instructions />
              <Alerts />
            </div>
            <div
              className="w-full sm:w-80  sm:!m-auto lg:w-96 pt-6 sm:pt-8 px-4 sm:px-8 lg:px-16 h-auto sm:h-[400px] lg:h-[450px] flex flex-col items-center relative rounded-3xl overflow-hidden shadow-[0px_0px_50px_0px_rgba(59,130,246,0.50)]"
              style={{
                backgroundImage: "url('/images/Frame 1000005493.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="text-right text-primary text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 sm:mb-8">
                نتيجة الأختبار
              </div>
              <CircularProgress />
              <div className="text-green-600 text-sm sm:text-base lg:text-lg font-bold bg-white mt-2 text-center px-4 py-2 rounded-lg">
                تهانينا! لقد نجحت في الأختبار
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-6">
            <Link href={"/exam-details/1234/exam"}>
              <button
                type="button"
                aria-label="إعاده الأختبار"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 p-[2px] rounded-3xl bg-gradient-to-r from-primary to-secondary cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div className="flex items-center justify-center gap-2.5 px-8 sm:px-12 lg:px-16 py-3 sm:py-4 w-full bg-white rounded-3xl transition-all duration-200 hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                  <div className="text-secondary font-bold text-base sm:text-lg lg:text-xl leading-tight whitespace-nowrap">
                    إعاده الأختبار
                  </div>
                </div>
              </button>
            </Link>

            <button
              onClick={() => setShowResults(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 sm:px-12 lg:px-16 py-3 sm:py-4 rounded-3xl bg-gradient-to-r from-primary to-secondary cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              type="button"
              aria-label="ابداء الأختبار الأن"
            >
              <div className="text-white font-bold text-base sm:text-lg lg:text-xl leading-tight whitespace-nowrap">
                مراجعة الأختبار
              </div>
            </button>
          </div>
        </Container>
      )}

      {showResults && (
        <ExamResults show={showResults} setShow={setShowResults} />
      )}
    </div>
  );
};

export default ExamDetails;

const CircularProgress = ({ value = 80 }) => {
  return (
    <div className="relative w-24 sm:w-32 lg:w-36 h-24 sm:h-32 lg:h-36 flex items-center justify-center">
      {/* Outer circle with conic-gradient */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(#3b82f6 ${value}%, #f97316 ${value}% 100%)`,
        }}
      ></div>

      {/* White inner circle to create ring effect */}
      <div className="absolute inset-2 sm:inset-3 bg-white rounded-full"></div>

      {/* Percentage text */}
      <span className="text-lg sm:text-xl lg:text-2xl font-bold relative text-primary">
        {value} %
      </span>
    </div>
  );
};
