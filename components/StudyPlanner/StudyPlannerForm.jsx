"use client";

import React, { useState } from "react";
// import h19 from "./h-19.svg";
// import image from "./image.svg";
// import vector1 from "./vector-1.svg";

export const CalenderIcon = (props) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 1H5V2H3C2.44771 2 2 2.44775 2 3V13C2 13.5522 2.44771 14 3 14H13C13.5523 14 14 13.5522 14 13V3C14 2.44775 13.5523 2 13 2H11V1H10V2H6V1ZM3 3V6H13V3H11V4H10V3H6V4H5V3H3ZM3 7V13H13V7H3Z"
      fill="#F97316"
    />
  </svg>
);

export const ChevronBottom = (props) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="#2D2D2D"
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StudyPlannerForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    whatsappNumber: "",
    examTitle: "",
    startPage: "",
    endPage: "",
    studyStartDate: "",
    examDate: "",
    restDays: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  return (
    <div className="inline-flex flex-col items-start gap-6 pt-0 pb-12 px-0 relative bg-white rounded-[30px] border-[3px] border-solid ">
      <header className="flex flex-col w-[622px] h-20 items-start p-6 relative">
        <div className="h-8 justify-start flex items-center relative">
          <h1 className="relative self-stretch w-fit  text-bold text-primary text-2xl tracking-[-0.60px] leading-8 whitespace-nowrap ">
            نموذج مخطط الدراسة
          </h1>
        </div>
      </header>

      <main className="inline-flex flex-col items-start gap-6 px-6 py-0 relative flex-[0_0_auto]">
        <form className="inline-flex flex-col items-start gap-6 relative flex-[0_0_auto]">
          <div className="flex flex-col items-start gap-2.5 px-0 py-[3px] relative self-stretch w-full flex-[0_0_auto]">
            <div className="inline-flex h-[18px] items-center justify-start relative">
              <label className="relative self-stretch w-[72px]  text-text font-[600] text-sm  overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] ">
                الاسم الأول
              </label>
            </div>
            <div className="flex items-start justify-start h-[56px] relative self-stretch w-full flex-[0_0_auto] bg-white rounded-[15px] border border-solid border-zinc-200">
              <div className="w-[550px] overflow-hidden relative h-full">
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  placeholder="أدخل اسمك الأول"
                  className="absolute w-[551px] h-full top-0 -left-px bottom-0  text-text-alt px-5 text-sm leading-5 whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]  bg-transparent border-none outline-none"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2.5 px-0 py-[3px] relative self-stretch w-full flex-[0_0_auto]">
            <div className="inline-flex h-[18px] items-center justify-start relative">
              <label className="relative self-stretch   text-text font-[600] text-sm  overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] ">
                رقم الواتساب
              </label>
            </div>
            <div className="flex items-start justify-start h-[56px] relative self-stretch w-full flex-[0_0_auto] bg-white rounded-[15px] border border-solid border-zinc-200">
              <div className="w-[550px] overflow-hidden relative h-full">
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("whatsappNumber", e.target.value)
                  }
                  placeholder="أدخل رقم واتساب الخاص بك"
                  className="absolute w-[551px] h-full top-0 -left-px bottom-0  text-text-alt px-5 text-sm leading-5 whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]  bg-transparent border-none outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2.5 px-0 py-[3px] relative self-stretch w-full flex-[0_0_auto]">
            <div className="inline-flex h-[18px] items-center justify-start relative">
              <label className="relative w-fit  text-text font-[600] text-sm  whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] ">
                الموضوع/عنوان الامتحان
              </label>
            </div>
            <div className="flex items-start justify-start h-[56px] relative self-stretch w-full flex-[0_0_auto] bg-white rounded-[15px] border border-solid border-zinc-200">
              <div className="w-[550px] overflow-hidden relative h-full">
                <input
                  type="text"
                  value={formData.examTitle}
                  onChange={(e) =>
                    handleInputChange("examTitle", e.target.value)
                  }
                  placeholder="أدخل عنوان الموضوع أو الامتحان"
                  className="absolute w-[551px] h-full top-0 -left-px  text-text-alt px-5 text-sm leading-5 whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]  bg-transparent border-none outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-col w-[279px] items-start gap-2.5 px-0 py-[3px] relative">
              <div className="inline-flex h-[18px] items-center justify-start relative">
                <label className="relative self-stretch w-[118px]  text-text font-[600] text-sm  overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] ">
                  رقم الصفحة الأخيرة
                </label>
              </div>
              <div className="flex w-[279px] items-start justify-start h-[56px] relative flex-[0_0_auto] bg-white rounded-[15px] border border-solid border-zinc-200">
                <div className="w-[255px] ml-[-8.00px] overflow-hidden relative h-full">
                  <input
                    type="number"
                    value={formData.endPage}
                    onChange={(e) =>
                      handleInputChange("endPage", e.target.value)
                    }
                    placeholder="نهاية الصفحة"
                    className="absolute w-64 h-full top-0 -left-px  text-text-alt px-5 text-sm leading-5 whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]  bg-transparent border-none outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col w-[279px] items-start gap-2.5 px-0 py-[3px] relative">
              <div className="inline-flex h-[18px] items-center justify-start relative">
                <label className="relative self-stretch w-[126px]  text-text font-[600] text-sm  overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] ">
                  رقم صفحة البدء
                </label>
              </div>
              <div className="flex w-[279px] items-start justify-start h-[56px] relative flex-[0_0_auto] bg-white rounded-[15px] border border-solid border-zinc-200">
                <div className="w-[255px] ml-[-8.00px] overflow-hidden relative h-full">
                  <input
                    type="number"
                    value={formData.startPage}
                    onChange={(e) =>
                      handleInputChange("startPage", e.target.value)
                    }
                    placeholder="صفحة البدء"
                    className="absolute w-64 h-full top-0 -left-px  text-text-alt px-5 text-sm leading-5 whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]  bg-transparent border-none outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-col w-[299px] items-start gap-2.5 p-2.5 relative">
              <div className="flex flex-col items-start gap-[11px] relative self-stretch w-full flex-[0_0_auto]">
                <div className="inline-flex h-[18px]  items-center justify-start relative">
                  <label className="relative w-fit  text-zinc-950 text-sm  whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] ">
                    تاريخ الامتحان
                  </label>
                </div>
                <div className="flex px-5 items-center justify-start h-[56px] relative self-stretch w-full flex-[0_0_auto] bg-white rounded-[15px] border border-solid border-zinc-200">
                  <div className="flex-1 grow z-0 relative h-full">
                    <input
                      type="datetime-local"
                      value={formData.examDate}
                      onChange={(e) =>
                        handleInputChange("examDate", e.target.value)
                      }
                      placeholder="اليوم/الساعة/اليوم/اليوم/اليوم"
                      className="absolute h-full top-0.5 left-[53px]  text-text-alt px-5 text-sm leading-5 whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]  bg-transparent border-none outline-none"
                    />
                  </div>
                  <div className="z-[1] relative w-4 h-4">
                    <CalenderIcon />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-[299px] items-start gap-2.5 p-2.5 relative">
              <div className="flex flex-col items-start gap-[11px] relative self-stretch w-full flex-[0_0_auto]">
                <div className="inline-flex h-[18px] items-center justify-start relative">
                  <label className="relative w-fit  text-zinc-950 text-sm  whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] ">
                    تاريخ بدء الدراسة
                  </label>
                </div>
                <div className="flex items-center justify-start h-[56px] px-5 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-[15px] border border-solid border-zinc-200">
                  <div className="flex-1 grow z-0 relative h-full">
                    <input
                      type="datetime-local"
                      value={formData.studyStartDate}
                      onChange={(e) =>
                        handleInputChange("studyStartDate", e.target.value)
                      }
                      placeholder="اليوم/الساعة/اليوم/اليوم/اليوم"
                      className="absolute h-full top-0.5 left-[53px]  text-text-alt px-5 text-sm leading-5 whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]  bg-transparent border-none outline-none"
                    />
                  </div>
                  <div className="z-[1] relative w-4 h-4">
                    <CalenderIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2.5 px-0 py-[3px] relative self-stretch w-full flex-[0_0_auto]">
            <div className="inline-flex h-[18px] items-center justify-start relative">
              <label className="relative w-fit  text-text font-[600] text-sm  whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] ">
                أيام الراحة
              </label>
            </div>
            <div className="flex items-center h-[56px]  relative self-stretch w-full flex-[0_0_auto] bg-white rounded-[15px] border border-solid border-zinc-200">
              <div className="w-[550px] z-0 overflow-hidden relative h-full">
                <select
                  value={formData.restDays}
                  onChange={(e) =>
                    handleInputChange("restDays", e.target.value)
                  }
                  className="absolute w-[551px]  h-full top-0 -left-px  text-text-alt px-5 text-sm  whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]  bg-transparent border-none outline-none"
                >
                  <option value="">أدخل أيام الراحة الخاصة بك</option>
                  <option value="friday">الجمعة</option>
                  <option value="saturday">السبت</option>
                  <option value="sunday">الأحد</option>
                  <option value="friday-saturday">الجمعة والسبت</option>
                </select>
              </div>
              <div className="inline-flex items-center gap-2 relative flex-[0_0_auto] z-[1] ">
                <ChevronBottom />
              </div>
            </div>
          </div>
        </form>

        <button
          onClick={handleSubmit}
          className="flex w-full items-center justify-center gap-2 px-8 py-5 relative bg-primary rounded-[20px] cursor-pointer hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          type="button"
          aria-label="إنشاء جدول الدراسة"
        >
          <span className="relative [display:-webkit-box] items-center justify-center w-fit  text-neutral-50 text-base text-center leading-[normal] overflow-hidden text-ellipsis [-webkit-line-clamp:1] [-webkit-box-orient:vertical] ">
            إنشاء جدول الدراسة
          </span>
        </button>

        <footer className="flex flex-col w-[574px] h-12 items-start gap-2 relative">
          <div className="h-5 justify-center flex w-[574px] items-center relative">
            <p className="relative self-stretch w-fit  text-text-alt text-sm leading-5 whitespace-nowrap ">
              سيتم إرسال جدولك الزمني إلى رقم الواتساب الذي تم توفيره.
            </p>
          </div>
          <div className="h-5 justify-center flex w-[574px] items-center relative">
            <p className="relative self-stretch w-fit  text-text-alt text-sm leading-5 whitespace-nowrap ">
              يمكنك إنشاء جداول زمنية غير محدودة.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default StudyPlannerForm;
