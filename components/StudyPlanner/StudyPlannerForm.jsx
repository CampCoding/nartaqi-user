"use client";

import React, { useState } from "react";
import { Select, Dropdown } from "antd";
import { MyDatePicker } from "../ui/MyDatePicker";
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
    studyStartDate: null,
    examDate: null,
    restDays: [],
  });

  const restDayOptions = [
    { value: "sat", label: "السبت" },
    { value: "sun", label: "الأحد" },
    { value: "mon", label: "الإثنين" },
    { value: "tue", label: "الثلاثاء" },
    { value: "wed", label: "الأربعاء" },
    { value: "thu", label: "الخميس" },
    { value: "fri", label: "الجمعة" },
  ];

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
    <div className="inline-flex w-full flex-1 flex-col items-start gap-6 pt-0 pb-12 px-0 relative bg-white rounded-3xl md:rounded-[50px] border-[3px] border-solid">
      <header className="flex flex-col w-full min-h-20 items-start p-6 relative">
        <div className="h-8 justify-start flex items-center relative w-full">
          <h1 className="relative self-stretch w-fit text-bold text-primary  text-xl md:text-2xl tracking-[-0.60px] leading-8 whitespace-nowrap">
            نموذج مخطط الدراسة
          </h1>
        </div>
      </header>

      <main className="inline-flex flex-col items-start w-full gap-6 px-4 sm:px-6 py-0 relative flex-[0_0_auto]">
        <form className="inline-flex flex-col items-start w-full gap-6 relative flex-[0_0_auto]">
          <div className="flex flex-col items-start gap-2.5 px-0 py-[3px] relative self-stretch w-full flex-[0_0_auto] min-w-0">
            <div className="inline-flex  items-center justify-start relative">
              <label className="relative self-stretch text-text font-[600] text-sm overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]">
                الاسم الأول
              </label>
            </div>
            <div className="flex items-start justify-start h-[56px] relative self-stretch w-full flex-[0_0_auto] bg-white rounded-[15px] border border-solid border-zinc-200">
              <div className="w-full overflow-hidden relative h-full min-w-0">
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="أدخل اسمك الأول"
                  className="absolute w-full h-full top-0 -left-px bottom-0 text-text-alt px-5 text-sm leading-5 whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] bg-transparent border-none outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2.5 px-0 py-[3px] relative self-stretch w-full flex-[0_0_auto] min-w-0">
            <div className="inline-flex  items-center justify-start relative">
              <label className="relative self-stretch text-text font-[600] text-sm overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]">
                رقم الواتساب
              </label>
            </div>
            <div className="flex items-start justify-start h-[56px] relative self-stretch w-full flex-[0_0_auto] bg-white rounded-[15px] border border-solid border-zinc-200">
              <div className="w-full overflow-hidden relative h-full min-w-0">
                <input
                  type="number"
                  dir="ltr"
                  value={formData?.whatsappNumber}
                  onChange={(e) => handleInputChange("whatsappNumber", e.target.value)}
                  placeholder="+966 123 456 789  : مثال"
                  className="absolute w-full h-full text-end top-0 -left-px bottom-0 text-text-alt px-5 text-sm leading-5 whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] bg-transparent border-none outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2.5 px-0 py-[3px] relative self-stretch w-full flex-[0_0_auto] min-w-0">
            <div className="inline-flex  items-center justify-start relative">
              <label className="relative w-fit text-text font-[600] text-sm whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]">
                الموضوع/عنوان الامتحان
              </label>
            </div>
            <div className="flex items-start justify-start h-[56px] relative self-stretch w-full flex-[0_0_auto] bg-white rounded-[15px] border border-solid border-zinc-200">
              <div className="w-full overflow-hidden relative h-full min-w-0">
                <input
                  type="text"
                  value={formData.examTitle}
                  onChange={(e) => handleInputChange("examTitle", e.target.value)}
                  placeholder="أدخل عنوان الموضوع أو الامتحان"
                  className="absolute w-full h-full top-0 -left-px text-text-alt px-5 text-sm leading-5 whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] bg-transparent border-none outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-6 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-col w-full items-start gap-2.5 px-0 py-[3px] relative min-w-0">
              <div className="inline-flex  items-center justify-start relative">
                <label className="relative self-stretch text-text font-[600] text-sm overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]">
                  رقم صفحة البدء
                </label>
              </div>
              <div className="flex w-full items-start justify-start h-[56px] relative flex-[0_0_auto] bg-white rounded-[15px] border border-solid border-zinc-200">
                <div className="ml-[-8.00px] overflow-hidden relative h-full min-w-0 w-full">
                  <input
                    type="number"
                    value={formData.startPage}
                    onChange={(e) => handleInputChange("startPage", e.target.value)}
                    placeholder="1"
                    className="absolute w-full h-full top-0 -left-px text-text-alt px-5 text-sm leading-5 whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] bg-transparent border-none outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full items-start gap-2.5 px-0 py-[3px] relative min-w-0">
              <div className="inline-flex  items-center justify-start relative">
                <label className="relative self-stretch text-text font-[600] text-sm overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]">
                  رقم الصفحة الأخيرة
                </label>
              </div>
              <div className="flex w-full items-start justify-start h-[56px] relative flex-[0_0_auto] bg-white rounded-[15px] border border-solid border-zinc-200">
                <div className="ml-[-8.00px] overflow-hidden relative h-full min-w-0 w-full">
                  <input
                    type="number"
                    value={formData.endPage}
                    onChange={(e) => handleInputChange("endPage", e.target.value)}
                    placeholder="50"
                    className="absolute w-full h-full top-0 -left-px text-text-alt px-5 text-sm leading-5 whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] bg-transparent border-none outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-1 flex-col w-full items-start gap-2.5 relative min-w-0">
              <div className="flex flex-col items-start gap-[11px] relative self-stretch w-full flex-[0_0_auto]">
                <div className="inline-flex  items-center justify-start relative">
                  <label className="relative w-fit text-zinc-950 text-sm whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]">
                    تاريخ بدء الدراسة
                  </label>
                </div>
                <Dropdown
                  dropdownRender={() => (
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
                      <MyDatePicker
                        selected={formData.studyStartDate}
                        onSelect={(date) => handleInputChange("studyStartDate", date)}
                      />
                    </div>
                  )}
                  trigger={['click']}
                  placement="bottomLeft"
                >
                  <div className="flex px-5 items-center justify-start h-[56px] relative self-stretch w-full flex-[0_0_auto] bg-white rounded-[15px] border border-solid border-zinc-200 cursor-pointer hover:border-orange-300 transition-colors">
                    <div className="flex-1 grow z-0 relative h-full min-w-0">
                      <input
                        type="text"
                        value={formData.studyStartDate ? formData.studyStartDate.toLocaleDateString('en-US') : ""}
                        placeholder="اختر تاريخ بدء الدراسة"
                        readOnly
                        className="h-full top-0.5 text-text-alt text-sm leading-5 whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] bg-transparent border-none outline-none cursor-pointer"
                      />
                    </div>
                    <div className="z-[1] relative w-4 h-4">
                      <CalenderIcon />
                    </div>
                  </div>
                </Dropdown>
              </div>
            </div>
            <div className="flex flex-1 flex-col items-start gap-2.5 w-full relative min-w-0">
              <div className="flex flex-col items-start gap-[11px] relative self-stretch w-full flex-[0_0_auto]">
                <div className="inline-flex  items-center justify-start relative">
                  <label className="relative w-fit text-zinc-950 text-sm whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]">
                    تاريخ الامتحان
                  </label>
                </div>
                <Dropdown
                  dropdownRender={() => (
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
                      <MyDatePicker
                        selected={formData.examDate}
                        onSelect={(date) => handleInputChange("examDate", date)}
                      />
                    </div>
                  )}
                  trigger={['click']}
                  placement="bottomLeft"
                >
                  <div className="flex px-5 items-center justify-start h-[56px] relative self-stretch w-full flex-[0_0_auto] bg-white rounded-[15px] border border-solid border-zinc-200 cursor-pointer hover:border-orange-300 transition-colors">
                    <div className="flex-1 grow z-0 relative h-full min-w-0">
                      <input
                        type="text"
                        value={formData.examDate ? formData.examDate.toLocaleDateString('en-US') : ""}
                        placeholder="اختر تاريخ الامتحان"
                        readOnly
                        className="h-full top-0.5 text-text-alt text-sm leading-5 whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] bg-transparent border-none outline-none cursor-pointer"
                      />
                    </div>
                    <div className="z-[1] relative w-4 h-4">
                      <CalenderIcon />
                    </div>
                  </div>
                </Dropdown>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full items-start gap-2.5 p-2.5 relative min-w-0">
            <div className="flex flex-col items-start gap-[11px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="inline-flex  items-center justify-start relative">
                <label className="relative w-fit text-zinc-950 text-sm whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]">
                  أيام الراحة
                </label>
              </div>
              <div className="flex items-center justify-start h-[56px] px-5 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-[15px] border border-solid border-zinc-200">
                <div className="flex-1 grow z-0 relative h-full flex items-center min-w-0">
                  <Select
                    mode="multiple"
                    allowClear
                    placeholder="أدخل أيام الراحة الخاصة بك "
                    value={formData.restDays}
                    onChange={(values) => handleInputChange("restDays", values)}
                    options={restDayOptions}
                    bordered={false}
                    className="w-full"
                    dropdownStyle={{ maxHeight: 256, overflowY: "auto" }}
                  />
                </div>
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
          <span className="relative font-bold [display:-webkit-box] items-center justify-center w-fit text-neutral-50 text-base text-center leading-[normal] overflow-hidden text-ellipsis [-webkit-line-clamp:1] [-webkit-box-orient:vertical]">
            إنشاء جدول الدراسة
          </span>
        </button>

        <footer className="flex flex-col items-start gap-2 relative w-full px-4 sm:px-6">
          <div className=" justify-center flex items-center relative">
            <p className="relative text-text-alt text-sm leading-5">سيتم إرسال جدولك الزمني إلى رقم الواتساب الذي تم توفيره.</p>
          </div>
          <div className=" justify-center flex items-center relative">
            <p className="relative text-text-alt text-sm leading-5">يمكنك إنشاء جداول زمنية غير محدودة.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default StudyPlannerForm;
