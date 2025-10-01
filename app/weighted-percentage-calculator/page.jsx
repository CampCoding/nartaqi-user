"use client";

import React, { useState } from "react";
import PagesBanner from "./../../components/ui/PagesBanner";
import { NavigationItems, QuestionAccordion } from "../faqs/page";
import { FileIcon } from "../../public/svgs";

const WeightedPercentageCalculator = () => {

  const faqs = [
    {
      id: 1,
      question: "ما هي النسبة الموزونة؟",
      answer: ""
    },
    {
      id: 2,
      question: "كيف تحسب النسبة الموزونة؟",
      answer:
        "النسبة الموزونة هي مجموع درجاتك في الثانوية العامة و اختبار القدرات و الاختبار التحصيلي بعد ما نوزن كل درجة بالنسبة المحددة لها.\nكل جامعة ممكن تغير نسب الوزن بين الثانوية والقدرات والتحصيلي، عشان كده تأكد من متطلبات الجامعة اللي ناوي تقدم لها."
    },
    {
      id: 3,
      question: "ما أهمية النسبة الموزونة للالتحاق بالجامعات؟",
      answer: ""
    }
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
      <div className="container max-w-[1312px] mx-auto px-[64px]  pb-28">
        <header
          className="flex flex-col  items-center justify-center relative my-[32px]"
          role="banner"
        >
          <h1 className="flex items-center justify-center mt-[-1.00px]  font-bold text-text text-[40px] text-center relative self-stretch tracking-[0] leading-[normal] [direction:rtl]">
            حساب النسبة الموزونة
          </h1>

          <p className=" font-normal text-text-alt text-2xl relative  tracking-[0] leading-[normal] [direction:rtl]">
            استخدم هذه الأداة لحساب نسبتك الموزونة بناء على درجاتك ومقارنتها مع
            متطلبات الجامعات.
          </p>
        </header>

        <div className="flex gap-6">
          <StudentDataFrame />
          <UniversityRequirementsFrame />
        </div>
        <div className="flex items-center justify-center ">
          <div className="px-20 py-6 mx-auto !bg-primary hover:!bg-primary-dark transition cursor-pointer mt-[27px] mb-[48px]  rounded-[20px] inline-flex justify-center items-center gap-2.5">
            <div className="text-right justify-center text-white text-base font-bold ">
              احسب نسبتي
            </div>
          </div>
        </div>

        <ProgressFrame />
        <ActionsButtons />

        <div className=" mt-[48px]">
          <div className="text-right justify-center text-primary text-3xl font-bold  mb-8">
            الأسئلة الشائعة
          </div>


          <div className="mt-8 flex flex-col gap-6">
            {faqs .map((item) => (
              <QuestionAccordion key={item.id} item={item} />
            ))}
          </div>
          
        </div>
      </div>
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
    <form className="flex flex-col w-[644px] items-start gap-8 px-6 py-12 relative bg-white rounded-[30px] border-[3px] border-solid border-variable-collection-stroke">
      <h1 className="relative self-stretch mt-[-3.00px]  font-bold text-primary text-2xl tracking-[0] leading-[normal] [direction:rtl]">
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
              className="relative [display:-webkit-box] text-text items-center justify-center self-stretch  mt-[-1.00px]  text-zinc-950 text-base leading-[normal] whitespace-nowrap overflow-hidden text-ellipsis [-webkit-line-clamp:0] [-webkit-box-orient:vertical] [direction:rtl]"
            >
              {field.label}
            </label>
            <div className="items-start justify-end gap-2.5 p-4 bg-white rounded-[10px] border border-solid border-zinc-200 flex relative self-stretch w-full flex-[0_0_auto]">
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

        <div className="flex-col items-end gap-2.5 flex relative self-stretch w-full flex-[0_0_auto]">
          <div className="items-start justify-between flex relative self-stretch w-full flex-[0_0_auto]">
            <label
              htmlFor="achievementScore"
              className=" text-zinc-950 text-base relative [display:-webkit-box] items-center justify-center w-fit mt-[-1.00px] leading-[normal] overflow-hidden text-ellipsis [-webkit-line-clamp:1] [-webkit-box-orient:vertical] [direction:rtl]"
            >
              درجة الاختبار التحصيلي
            </label>
            <p
              id="achievement-help"
              className=" text-[#be1919] text-base relative [display:-webkit-box] items-center justify-center w-fit mt-[-1.00px] leading-[normal] overflow-hidden text-ellipsis [-webkit-line-clamp:1] [-webkit-box-orient:vertical] [direction:rtl]"
            >
              إذا كان التحصيلي غير مطلوب, اتركه فارغا
            </p>
          </div>
          <div className="items-start justify-end gap-2.5 p-4 bg-white rounded-[10px] border border-solid border-zinc-200 flex relative self-stretch w-full flex-[0_0_auto]">
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
    setter(value);
    setTimeout(validateTotal, 100);
  };

  return (
    <div className="flex flex-col w-[644px] items-end gap-8 px-6 py-12 relative bg-white rounded-[30px] border-[3px] border-solid border-variable-collection-stroke">
      <header className="items-center justify-end gap-8 flex relative self-stretch w-full flex-[0_0_auto]">
        <h1 className="w-fit  font-bold text-primary text-2xl relative tracking-[0] leading-[normal] [direction:rtl]">
          متطلبات الجامعة
        </h1>
        <p className="flex-1 mt-[-1.00px]  font-medium text-[#be1a1a] text-sm relative tracking-[0] leading-[normal] [direction:rtl]">
          مهم جدا إن مجموع متطلبات الجامعة 100٪ إذا ادخل الطالب أقل من 100 أو
          أكثر يظهر له رسالة تنبيه
        </p>
      </header>

      {showAlert && (
        <div className="w-full p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm [direction:rtl] ">
            {alertMessage}
          </p>
        </div>
      )}

      <form className="flex-col items-start justify-center gap-6 flex relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex-col items-start gap-2.5 flex relative self-stretch w-full flex-[0_0_auto]">
          <label
            htmlFor="highSchoolPercentage"
            className="relative [display:-webkit-box] items-center justify-center self-stretch  mt-[-1.00px]  text-zinc-950 text-base leading-[normal] whitespace-nowrap overflow-hidden text-ellipsis [-webkit-line-clamp:0] [-webkit-box-orient:vertical] [direction:rtl]"
          >
            النسبة المطلوبة للثانوية
          </label>
          <div className="items-start justify-end gap-2.5 p-4 bg-white rounded-[10px] border border-solid border-zinc-200 flex relative self-stretch w-full flex-[0_0_auto]">
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

        <div className="flex-col items-start gap-2.5 flex relative self-stretch w-full flex-[0_0_auto]">
          <label
            htmlFor="abilitiesScore"
            className="relative [display:-webkit-box] items-center justify-center self-stretch  mt-[-1.00px]  text-zinc-950 text-base leading-[normal] whitespace-nowrap overflow-hidden text-ellipsis [-webkit-line-clamp:0] [-webkit-box-orient:vertical] [direction:rtl]"
          >
            درجة القدرات المطلوبة
          </label>
          <div className="items-start justify-end gap-2.5 p-4 bg-white rounded-[10px] border border-solid border-zinc-200 flex relative self-stretch w-full flex-[0_0_auto]">
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

        <div className="flex-col items-start gap-2.5 flex relative self-stretch w-full flex-[0_0_auto]">
          <div className="items-start justify-between flex relative self-stretch w-full flex-[0_0_auto]">
            <label
              htmlFor="achievementScore"
              className=" text-zinc-950 text-base relative [display:-webkit-box] items-center justify-center w-fit mt-[-1.00px] leading-[normal] overflow-hidden text-ellipsis [-webkit-line-clamp:1] [-webkit-box-orient:vertical] [direction:rtl]"
            >
              درجة التحصيلي المطلوبة
            </label>
            <p className=" text-[#be1919] text-base relative [display:-webkit-box] items-center justify-center w-fit mt-[-1.00px] leading-[normal] overflow-hidden text-ellipsis [-webkit-line-clamp:1] [-webkit-box-orient:vertical] [direction:rtl]">
              إذا كان التحصيلي غير مطلوب, اتركه فارغا
            </p>
          </div>
          <div className="items-start justify-end gap-2.5 p-4 bg-white rounded-[10px] border border-solid border-zinc-200 flex relative self-stretch w-full flex-[0_0_auto]">
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
    <div className="flex flex-col items-start gap-4 pt-8 pb-14 px-4 relative bg-primary-light rounded-[30px]">
      <div className="items-start justify-between flex relative self-stretch w-full flex-[0_0_auto]">
        <div className="relative w-fit mt-[-1.00px] z-0  font-medium text-text text-base tracking-[0] leading-[normal] [direction:rtl]">
          {progressData.label}
        </div>
        <div className="relative w-fit mt-[-1.00px] z-[1]  font-bold text-primary-dark text-base text-right tracking-[0] leading-[normal]">
          {progressData.percentage}%
        </div>

      </div>

      <div className="flex-col items-start bg-primary-bg rounded-[20px] flex relative self-stretch w-full flex-[0_0_auto]">
        <div
          className="relative h-4 bg-primary rounded-[20px]"
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

  return (
    <div className="flex w-[812px] mx-auto items-start justify-end gap-12 relative mt-[32px]">
   

      <button
        className="flex items-center justify-center gap-2 px-12 py-6 relative flex-1 grow bg-blue-500 rounded-[20px] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        onClick={handleDownloadPDF}
        type="button"
        aria-label="تنزيل النتيجة PDF"
      >
      <FileIcon />
        <span className="relative flex items-center justify-center w-fit mt-[-1.00px]  font-bold text-white text-base tracking-[0] leading-[normal] [direction:rtl]">
          تنزيل النتيجة PDF
        </span>

      </button>



      <button
        className="flex items-center justify-center gap-2 px-12 py-6 relative flex-1 grow bg-variable-collection-white-moca rounded-[20px] border-2 border-solid border-foundation-bluenormal hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-foundation-bluenormal focus:ring-offset-2 transition-colors duration-200"
        onClick={handleRecalculate}
        type="button"
        aria-label="إعادة الحساب"
      >
        <span className="relative flex items-center justify-center w-fit mt-[-2.00px]  font-bold text-foundation-bluenormal text-base tracking-[0] leading-[normal] [direction:rtl]">
          إعادة الحساب
        </span>
      </button>
    </div>
  );
};