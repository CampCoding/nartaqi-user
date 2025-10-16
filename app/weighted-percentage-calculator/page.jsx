"use client";

import React, { useState } from "react";
import PagesBanner from "./../../components/ui/PagesBanner";
import {  QuestionAccordion } from "../faqs/page";

import Container from "../../components/ui/Container";

const WeightedPercentageCalculator = () => {
  const faqs = [
    {
      id: 1,
      question: "ما هي النسبة الموزونة؟",
      answer:
        "النسبة الموزونة هي مجموع درجاتك في الثانوية العامة و اختبار القدرات و الاختبار التحصيلي بعد ما نوزن كل درجة بالنسبة المحددة لها.\nكل جامعة ممكن تغير نسب الوزن بين الثانوية والقدرات والتحصيلي، عشان كده تأكد من متطلبات الجامعة اللي ناوي تقدم لها.",
    },
    {
      id: 2,
      question: "كيف تحسب النسبة الموزونة؟",
      answer:
        "النسبة الموزونة هي مجموع درجاتك في الثانوية العامة و اختبار القدرات و الاختبار التحصيلي بعد ما نوزن كل درجة بالنسبة المحددة لها.\nكل جامعة ممكن تغير نسب الوزن بين الثانوية والقدرات والتحصيلي، عشان كده تأكد من متطلبات الجامعة اللي ناوي تقدم لها.",
    },
    {
      id: 3,
      question: "ما أهمية النسبة الموزونة للالتحاق بالجامعات؟",
      answer:
        "النسبة الموزونة هي مجموع درجاتك في الثانوية العامة و اختبار القدرات و الاختبار التحصيلي بعد ما نوزن كل درجة بالنسبة المحددة لها.\nكل جامعة ممكن تغير نسب الوزن بين الثانوية والقدرات والتحصيلي، عشان كده تأكد من متطلبات الجامعة اللي ناوي تقدم لها.",
    },
  ];

  return (
    <div>
      <PagesBanner
        title={"النسبة الموزونة"}
        breadcrumb={[
          {
            title: "الرئيسية",
            link: "/",
          },
          {
            title: "النسبة الموزونة",
            link: "#",
          },
        ]}
        image={"/images/weighted-percentage-calculator.png"}
      />
      <Container className="pb-28">
        <header
          className="flex flex-col items-center justify-center relative my-6 md:my-[32px]"
          role="banner"
        >
          <h1 className="flex items-center justify-center font-bold text-text text-2xl md:text-[40px] text-center relative self-stretch tracking-[0] leading-tight md:leading-[normal] [direction:rtl]">
            حساب النسبة الموزونة
          </h1>

          <p className="font-normal text-text-alt text-base md:text-2xl text-center relative tracking-[0] leading-relaxed md:leading-[normal] [direction:rtl] px-4">
            استخدم هذه الأداة لحساب نسبتك الموزونة بناء على درجاتك ومقارنتها مع
            متطلبات الجامعات.
          </p>
        </header>
        <div className="flex flex-col md:flex-row gap-6">
          <StudentDataFrame />
          <UniversityRequirementsFrame />
        </div>
        <div className="flex items-center justify-center ">
          <div className=" px-10 md:px-20  py-3 md:py-6 mx-auto !bg-primary hover:!bg-primary-dark transition cursor-pointer mt-[27px] mb-[48px]  rounded-xl md:rounded-[20px] inline-flex justify-center items-center gap-2.5">
            <div className="text-right justify-center text-white  text-sm md:text-base font-bold ">
              احسب نسبتي
            </div>
          </div>
        </div>

        <ProgressFrame />
        <ActionsButtons />

        <div className=" mt-[48px]">
          <div className="text-right justify-center text-primary  text-xl md:text-3xl font-bold  mb-8">
            الأسئلة الشائعة
          </div>

          <div className="mt-8 flex flex-col gap-4  md:gap-6">
            {faqs.map((item) => (
              <QuestionAccordion key={item.id} item={item} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default WeightedPercentageCalculator;

const Input = ({
  label = "الاسم رباعي باللغة العربية",
  subLabel = "(مطابق للهوية الوطنية)",
  placeholder = "أدخل اسمك بالكامل",
}) => {
  return (
    <div className="flex flex-col items-start gap-2 relative">
      <div className="justify-between flex items-center relative self-stretch w-full flex-[0_0_auto]">
        <div className="mt-[-1.00px] font-bold text-text relative flex items-center justify-center w-fit text-base tracking-[0] leading-[normal] ">
          {label}
        </div>
        <div className="mt-[-1.00px] font-medium text-danger relative flex items-center justify-center w-fit text-base tracking-[0] leading-[normal] ">
          {subLabel}
        </div>
      </div>
      <input
        placeholder={placeholder}
        className="justify-start h-[58px] gap-2.5 px-4  bg-white rounded-[20px] border-2 border-solid border-[#c8c9d5] flex items-center relative self-stretch w-full flex-[0_0_auto]"
      />
    </div>
  );
};

export const StudentDataFrame = () => {
  const [formData, setFormData] = useState({
    highSchoolGrade: "",
    aptitudeScore: "",
    achievementScore: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formFields = [
    {
      id: "highSchoolGrade",
      label: "نسبة الثانوية العامة",
      placeholder: "ادخل نسبتك في الثانوية العامة",
      value: formData.highSchoolGrade,
    },
    {
      id: "aptitudeScore",
      label: "درجة اختبار القدرات",
      placeholder: "اكتب درجتك في اختبار القدرات (من 100)",
      value: formData.aptitudeScore,
    },
  ];

  return (
    // CHANGED: Reduced padding on mobile (`px-4 py-8`) and restored original padding on medium screens (`md:`).
    <form className="flex flex-col flex-1 items-start gap-8 px-4 py-8 md:px-6 md:py-12 relative bg-white rounded-[30px] border-[3px] border-solid border-variable-collection-stroke">
      {/* CHANGED: Adjusted font size for mobile. */}
      <h1 className="relative self-stretch mt-[-3.00px] font-bold text-primary text-xl md:text-2xl tracking-[0] leading-[normal] [direction:rtl]">
        بيانات الطالب
      </h1>

      <div className="flex-col items-start justify-center gap-6 flex relative self-stretch w-full flex-[0_0_auto]">
        {formFields.map((field) => (
          <div
            key={field.id}
            className="flex-col items-start gap-2.5 flex relative self-stretch w-full flex-[0_0_auto]"
          >
            <label
              htmlFor={field.id}
              className="relative [display:-webkit-box] text-text items-center justify-center self-stretch mt-[-1.00px] text-zinc-950 text-base leading-[normal] whitespace-nowrap overflow-hidden text-ellipsis [-webkit-line-clamp:0] [-webkit-box-orient:vertical] [direction:rtl]"
            >
              {field.label}
            </label>
            <div className="items-start justify-start gap-2.5 p-4 bg-white rounded-[10px] border border-solid border-zinc-200 flex relative self-stretch w-full flex-[0_0_auto]">
              <input
                id={field.id}
                type="text"
                value={field.value}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                className=" text-text-alt text-sm text-right relative [display:-webkit-box] items-center justify-center w-full mt-[-1.00px] leading-[normal] overflow-hidden text-ellipsis [-webkit-line-clamp:1] [-webkit-box-orient:vertical] [direction:rtl] placeholder:text-text-alt focus:text-zinc-950"
                aria-describedby={
                  field.id === "achievementScore"
                    ? "achievement-help"
                    : undefined
                }
              />
            </div>
          </div>
        ))}

        <div className="flex-col items-start gap-2.5 flex relative self-stretch w-full flex-[0_0_auto]">
          {/* CHANGED: Stacked label and helper text on mobile (`flex-col`) and kept them in a row on medium screens (`md:flex-row`). */}
          <div className="flex flex-col items-start gap-1 md:flex-row md:items-start md:justify-between relative self-stretch w-full flex-[0_0_auto]">
            <label
              htmlFor="achievementScore"
              className=" text-zinc-950 text-base relative [display:-webkit-box] items-center justify-center w-fit mt-[-1.00px] leading-[normal] overflow-hidden text-ellipsis [-webkit-line-clamp:1] [-webkit-box-orient:vertical] [direction:rtl]"
            >
              درجة الاختبار التحصيلي
            </label>
            {/* CHANGED: Made helper text slightly smaller on mobile. */}
            <p
              id="achievement-help"
              className=" text-[#be1919] text-sm md:text-base relative [display:-webkit-box] items-center justify-center w-fit mt-[-1.00px] leading-[normal] overflow-hidden text-ellipsis [-webkit-line-clamp:1] [-webkit-box-orient:vertical] [direction:rtl]"
            >
              إذا كان التحصيلي غير مطلوب, اتركه فارغا
            </p>
          </div>
          <div className="items-start justify-start gap-2.5 p-4 bg-white rounded-[10px] border border-solid border-zinc-200 flex relative self-stretch w-full flex-[0_0_auto]">
            <input
              id="achievementScore"
              type="text"
              value={formData.achievementScore}
              onChange={(e) =>
                handleInputChange("achievementScore", e.target.value)
              }
              placeholder="ادخل درجتك في الاختبار التحصيلي (من 100)"
              className=" text-text-alt text-sm text-right relative [display:-webkit-box] items-center justify-center w-full mt-[-1.00px] leading-[normal] overflow-hidden text-ellipsis [-webkit-line-clamp:1] [-webkit-box-orient:vertical] [direction:rtl] placeholder:text-text-alt focus:text-zinc-950"
              aria-describedby="achievement-help"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export const UniversityRequirementsFrame = () => {
  const [highSchoolPercentage, setHighSchoolPercentage] = useState("");
  const [abilitiesScore, setAbilitiesScore] = useState("");
  const [achievementScore, setAchievementScore] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const validateTotal = () => {
    const hsPercent = Number.parseFloat(highSchoolPercentage) || 0;
    const abilitiesPercent = Number.parseFloat(abilitiesScore) || 0;
    const achievementPercent = Number.parseFloat(achievementScore) || 0;
    const total = hsPercent + abilitiesPercent + achievementPercent;

    if (
      total !== 100 &&
      (hsPercent > 0 || abilitiesPercent > 0 || achievementPercent > 0)
    ) {
      setAlertMessage("مجموع متطلبات الجامعة يجب أن يكون 100٪ بالضبط");
      setShowAlert(true);
    } else {
      setShowAlert(false);
      setAlertMessage("");
    }
  };

  const handleInputChange = (setter, value) => {
    // This part of the logic had a slight bug where validateTotal
    // would run on the old state. I've corrected it to be more reliable.
    setter(value);
  };

  // Using useEffect to validate after state has updated.
  React.useEffect(() => {
    validateTotal();
  }, [highSchoolPercentage, abilitiesScore, achievementScore]);

  return (
    <div className="flex flex-col flex-1 items-start gap-8 px-4 py-8 md:px-6 md:py-12 relative bg-white rounded-[30px] border-[3px] border-solid border-variable-collection-stroke">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-start gap-2 md:gap-8 relative self-stretch w-full">
        <h1 className="w-fit font-bold text-primary text-xl md:text-2xl relative tracking-[0] leading-[normal] [direction:rtl]">
          متطلبات الجامعة
        </h1>
        <p className="flex-1 font-medium text-[#be1a1a] text-sm text-right md:text-right relative tracking-[0] leading-[normal] [direction:rtl]">
          مهم جدا إن مجموع متطلبات الجامعة 100٪ إذا ادخل الطالب أقل من 100 أو
          أكثر يظهر له رسالة تنبيه
        </p>
      </header>

      {showAlert && (
        <div className="w-full p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm [direction:rtl]">{alertMessage}</p>
        </div>
      )}

      <form className="flex-col items-start justify-center gap-6 flex relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex-col items-start gap-2.5 flex relative self-stretch w-full">
          <label
            htmlFor="highSchoolPercentage"
            className="relative [display:-webkit-box] items-center justify-center self-stretch mt-[-1.00px] text-zinc-950 text-base leading-[normal] whitespace-nowrap overflow-hidden text-ellipsis [-webkit-line-clamp:0] [-webkit-box-orient:vertical] [direction:rtl]"
          >
            النسبة المطلوبة للثانوية
          </label>
          <div className="items-start justify-start gap-2.5 p-4 bg-white rounded-[10px] border border-solid border-zinc-200 flex relative self-stretch w-full">
            <input
              id="highSchoolPercentage"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={highSchoolPercentage}
              onChange={(e) =>
                handleInputChange(setHighSchoolPercentage, e.target.value)
              }
              placeholder="ادخل النسبة المطلوبة للقبول"
              className=" text-zinc-900 text-sm text-right relative w-full leading-[normal] [direction:rtl] placeholder:text-zinc-500"
              aria-describedby="highSchoolPercentage-desc"
            />
          </div>
          <span id="highSchoolPercentage-desc" className="sr-only">
            أدخل النسبة المطلوبة للثانوية العامة من 0 إلى 100
          </span>
        </div>

        {/* Abilities Score Input - No responsive changes needed here */}
        <div className="flex-col items-start gap-2.5 flex relative self-stretch w-full">
          <label
            htmlFor="abilitiesScore"
            className="relative [display:-webkit-box] items-center justify-center self-stretch mt-[-1.00px] text-zinc-950 text-base leading-[normal] whitespace-nowrap overflow-hidden text-ellipsis [-webkit-line-clamp:0] [-webkit-box-orient:vertical] [direction:rtl]"
          >
            درجة القدرات المطلوبة
          </label>
          <div className="items-start justify-start gap-2.5 p-4 bg-white rounded-[10px] border border-solid border-zinc-200 flex relative self-stretch w-full">
            <input
              id="abilitiesScore"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={abilitiesScore}
              onChange={(e) =>
                handleInputChange(setAbilitiesScore, e.target.value)
              }
              placeholder="اكتب الحد الأدنى للقدرات"
              className=" text-zinc-900 text-sm text-right relative w-full leading-[normal] [direction:rtl] placeholder:text-zinc-500"
              aria-describedby="abilitiesScore-desc"
            />
          </div>
          <span id="abilitiesScore-desc" className="sr-only">
            أدخل درجة القدرات المطلوبة من 0 إلى 100
          </span>
        </div>

        {/* Achievement Score Input - Responsive changes made here */}
        <div className="flex-col items-start gap-2.5 flex relative self-stretch w-full">
          {/* CHANGED: Stacked label and helper text on mobile (`flex-col`) and reverted to horizontal on medium screens (`md:flex-row`). */}
          <div className="flex flex-col items-start gap-1 md:flex-row md:items-start md:justify-between relative self-stretch w-full">
            <label
              htmlFor="achievementScore"
              className=" text-zinc-950 text-base relative [display:-webkit-box] items-center justify-center w-fit mt-[-1.00px] leading-[normal] overflow-hidden text-ellipsis [-webkit-line-clamp:1] [-webkit-box-orient:vertical] [direction:rtl]"
            >
              درجة التحصيلي المطلوبة
            </label>
            {/* CHANGED: Made helper text slightly smaller for mobile. */}
            <p className=" text-[#be1919] text-sm md:text-base relative [display:-webkit-box] items-center justify-center w-fit mt-[-1.00px] leading-[normal] overflow-hidden text-ellipsis [-webkit-line-clamp:1] [-webkit-box-orient:vertical] [direction:rtl]">
              إذا كان التحصيلي غير مطلوب, اتركه فارغا
            </p>
          </div>
          <div className="items-start justify-start gap-2.5 p-4 bg-white rounded-[10px] border border-solid border-zinc-200 flex relative self-stretch w-full">
            <input
              id="achievementScore"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={achievementScore}
              onChange={(e) =>
                handleInputChange(setAchievementScore, e.target.value)
              }
              placeholder="اكتب الحد الأدنى للقدرات"
              className=" text-zinc-900 text-sm text-right relative w-full leading-[normal] [direction:rtl] placeholder:text-zinc-500"
              aria-describedby="achievementScore-desc"
            />
          </div>
          <span id="achievementScore-desc" className="sr-only">
            أدخل درجة التحصيلي المطلوبة من 0 إلى 100، أو اتركه فارغا إذا لم يكن
            مطلوبا
          </span>
        </div>
      </form>
    </div>
  );
};

export const ProgressFrame = () => {
  const progressData = {
    percentage: 75,
    label: "نسبتك الموزونة هي",
  };

  return (
    // CHANGED: Reduced vertical padding on mobile (`pt-6 pb-10`)
    // and restored the original padding on medium screens and up (`md:`).
    <div className="flex flex-col items-start gap-4 pt-4 pb-6 px-4 md:pt-8 md:pb-14 relative bg-primary-light  rounded-xl md:rounded-[30px]">
      <div className="items-start justify-between flex relative self-stretch w-full flex-[0_0_auto]">
        <div className="relative w-fit mt-[-1.00px] z-0 font-medium text-text text-base tracking-[0] leading-[normal] [direction:rtl]">
          {progressData.label}
        </div>
        <div className="relative w-fit mt-[-1.00px] z-[1] font-bold text-primary-dark text-base text-right tracking-[0] leading-[normal]">
          {progressData.percentage}%
        </div>
      </div>

      <div className="flex-col items-start bg-primary-bg rounded-[20px] flex relative self-stretch w-full flex-[0_0_auto]">
        <div
          className="relative h-2  md:h-4 bg-primary rounded-[20px]"
          style={{ width: `${progressData.percentage}%` }}
        />
      </div>
    </div>
  );
};

const ActionsButtons = () => {
  const handleRecalculate = () => {
    // Handle recalculation logic
    console.log("Recalculating...");
  };

  const handleDownloadPDF = () => {
    // Handle PDF download logic
    console.log("Downloading PDF...");
  };

  // A placeholder for the missing icon component
  const FileIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );

  return (
    <div className="flex flex-col md:flex-row  w-full max-w-[812px] mx-auto items-center justify-center gap-4 md:gap-12 relative mt-6 md:mt-[32px]  md:px-0">
      <button
        className="flex items-center px-10 md:px-20  py-4 md:py-6 justify-center gap-2 w-full md:w-auto  relative flex-1 grow bg-primary rounded-[20px] text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        onClick={handleDownloadPDF}
        type="button"
        aria-label="تنزيل النتيجة PDF"
      >
        <FileIcon />
        <span className="relative  whitespace-nowrap flex  items-center justify-center w-fit mt-[-1.00px] font-bold  text-sm md:text-base tracking-[0] leading-[normal] [direction:rtl]">
          تنزيل النتيجة PDF
        </span>
      </button>

      <button
        className="flex items-center px-10 md:px-20  py-4 md:py-6 justify-center gap-2 w-full md:w-auto  relative flex-1 grow bg-white rounded-[20px] border-2 border-solid border-blue-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        onClick={handleRecalculate}
        type="button"
        aria-label="إعادة الحساب"
      >
        <span className="relative whitespace-nowrap flex items-center justify-center w-fit mt-[-2.00px] font-bold text-blue-500 text-sm md:text-base tracking-[0] leading-[normal] [direction:rtl]">
          إعادة الحساب
        </span>
      </button>
    </div>
  );
};
