"use client";

import React from "react";
import PagesBanner from "../../../components/ui/PagesBanner";
import ExamDetailsHeader from "../../../components/ExamDetailsPage/ExamDetailsHeader";
import { Instructions } from "../../../components/ExamDetailsPage/Instructions";
import { Alerts } from "../../../components/ExamDetailsPage/Alerts";
import ExamResults from "../../../components/ExamPage/ExamResults";
import Link from "next/link";

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
        <div className="  container mx-auto px-[64px] mt-[32px] mb-[64px]">
          <ExamDetailsHeader />

          <div className="flex justify-between items-center">
            <div className="mt-[32px] mb-[48px] flex flex-col gap-[48px]">
              <Instructions />
              <Alerts />
            </div>{" "}
            <div
              className="inline-flex flex-col shadow-[0px_0px_50px_0px_rgba(59,130,246,0.50)]  w-[325px] pt-[32px] px-[64px]  h-[449px] items-center  relative rounded-[30px] overflow-hidden"
              style={{
                backgroundImage: "url('/images/Frame 1000005493.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="text-right justify-center text-primary text-3xl font-semibold mb-8  ">
                نتيجة الأختبار
              </div>
              <CircularProgress />
              <div className=" justify-center text-green-600 text-base font-bold bg-white  mt-2 text-center">
                تهانينا! لقد نجحت في الأختبار
              </div>
            </div>
          </div>

          <div className="flex  justify-between">
            <Link href={"/exam-details/1234/exam"}>
              <button
                type="button"
                aria-label="إعاده الأختبار"
                className="flex  mr-auto items-center justify-center gap-2.5 p-[2px]  relative rounded-[30px] bg-gradient-to-r from-primary to-secondary cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div className="flex  mr-auto items-center justify-center gap-2.5 px-16 py-5 relative rounded-[30px] bg-white  transition-all duration-200 hover:shadow-lg  active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                  <div className="relative text-secondary flex items-center justify-center w-fit mt-[-1.00px]  font-bold  text-[20px] tracking-[0] leading-[50px] whitespace-nowrap ">
                    إعاده الأختبار
                  </div>
                </div>
              </button>
            </Link>

            <button
              onClick={() => setShowResults(true)}
              className="flex  mr-auto items-center justify-center gap-2.5 px-20 py-5 relative rounded-[30px] bg-gradient-to-r from-primary to-secondary cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              type="button"
              aria-label="ابداء الأختبار الأن"
            >
              <div className="relative text-white flex items-center justify-center w-fit mt-[-1.00px]  font-bold  text-[20px] tracking-[0] leading-[50px] whitespace-nowrap ">
                مراجعة الأختبار
              </div>
            </button>
          </div>
        </div>
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
    <div className="relative w-[146px] h-[146px] flex items-center justify-center">
      {/* Outer circle with conic-gradient */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient( #3b82f6 ${value}%, #f97316  ${value}% 100%)`,
        }}
      ></div>

      {/* White inner circle to create ring effect */}
      <div className="absolute inset-[10px] bg-white rounded-full"></div>

      {/* Percentage text */}
      <span className="text-2xl font-bold relative  !text-primary">
        {" "}
        {value} %
      </span>
    </div>
  );
};
