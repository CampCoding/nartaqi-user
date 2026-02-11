"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import PagesBanner from "./../../components/ui/PagesBanner";
import { QuestionAccordion } from "../faqs/page";

import Container from "../../components/ui/Container";



const clampNumber = (v, min = 0, max = 100) => {
  const n = Number.parseFloat(v);
  if (Number.isNaN(n)) return "";
  return String(Math.min(max, Math.max(min, n)));
};

const toNum = (v) => {
  const n = Number.parseFloat(v);
  return Number.isNaN(n) ? 0 : n;
};


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


  // درجات الطالب
  const [student, setStudent] = useState({
    highSchoolGrade: "",
    aptitudeScore: "",
    achievementScore: "",
  });

  // أوزان الجامعة (بالـ %)
  const [weights, setWeights] = useState({
    highSchoolPercentage: "",
    abilitiesScore: "",
    achievementScore: "",
  });

  const [result, setResult] = useState(null); // النسبة الموزونة الناتجة
  const [globalError, setGlobalError] = useState("");

  const pdfRef = useRef(null);



  const weightsTotal = useMemo(() => {
    return (
      toNum(weights.highSchoolPercentage) +
      toNum(weights.abilitiesScore) +
      toNum(weights.achievementScore)
    );
  }, [weights]);

  const calculate = () => {
    setGlobalError("");

    const hsW = toNum(weights.highSchoolPercentage);
    const abW = toNum(weights.abilitiesScore);
    const acW = toNum(weights.achievementScore);

    const hsS = toNum(student.highSchoolGrade);
    const abS = toNum(student.aptitudeScore);
    const acS = toNum(student.achievementScore);

    // لازم مجموع الأوزان 100
    if (weightsTotal !== 100) {
      setGlobalError("مجموع متطلبات الجامعة يجب أن يكون 100٪ بالضبط");
      setResult(null);
      return;
    }

    // لو وزن التحصيلي > 0 يبقى لازم الطالب يدخل التحصيلي
    if (acW > 0 && student.achievementScore === "") {
      setGlobalError("التحصيلي مطلوب لأن وزنه أكبر من 0٪. أدخل درجة التحصيلي.");
      setResult(null);
      return;
    }

    // حساب المعادلة (نقسم على 100 لأن الأوزان %)
    const weighted =
      (abW * abS + acW * acS + hsW * hsS) / 100;

    // تقفيل على رقمين عشريين
    const rounded = Math.round(weighted * 100) / 100;
    setResult(rounded);
  };

  const resetAll = () => {
    setStudent({ highSchoolGrade: "", aptitudeScore: "", achievementScore: "" });
    setWeights({ highSchoolPercentage: "", abilitiesScore: "", achievementScore: "" });
    setResult(null);
    setGlobalError("");
  };
  const downloadPDF = async () => {
    if (!pdfRef.current) return;
  
    // show pdf-only elements
    const pdfOnlyNodes = pdfRef.current.querySelectorAll('[data-pdf-only="true"]');
    const printContainer = document.querySelector('.print-container');
    pdfOnlyNodes.forEach((el) => el.classList.remove("hidden"));
    printContainer.classList.add('p-10');
    console.log("printContainer" , printContainer)

  
    try {
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).default;
  
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
  
      const imgData = canvas.toDataURL("image/png");
  
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
  
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      let heightLeft = imgHeight;
      let position = 0;
  
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      pdf.save("weighted-percentage-result.pdf");
    } finally {
      // hide pdf-only elements again (even if error happens)
      pdfOnlyNodes.forEach((el) => el.classList.add("hidden"));
      printContainer.classList.remove('p-0');

    }
  };
  




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
          <StudentDataFrame
            value={student}
            onChange={(field, value) => {
              setResult(null);
              setStudent((prev) => ({ ...prev, [field]: clampNumber(value) }));
            }}
          />

          <UniversityRequirementsFrame
            value={weights}
            onChange={(field, value) => {
              setResult(null);
              setWeights((prev) => ({ ...prev, [field]: clampNumber(value) }));
            }}
          />

        </div>

        {globalError ? (
          <div className="mt-4 w-full rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-red-700 text-sm [direction:rtl]">{globalError}</p>
          </div>
        ) : null}
        <div className="flex items-center justify-center ">
          <button
            type="button"
            onClick={calculate}
            className="px-10 md:px-20 py-3 md:py-6 mx-auto bg-primary hover:bg-primary-dark transition cursor-pointer mt-[27px] mb-[48px] rounded-xl md:rounded-[20px] inline-flex justify-center items-center gap-2.5"
          >
            <span className="text-white text-sm md:text-base font-bold">
              احسب نسبتي
            </span>
          </button>
        </div>

        {result !== null ? (
          <>
            <div ref={pdfRef} className="w-full print-container">
              <ProgressFrame percentage={result} show />
              {/* لو عايز تضيف ملخص للبيانات داخل الـ PDF */}
              <div
                data-pdf-only="true"
                className="mt-4 rounded-xl border bg-white p-4 [direction:rtl] hidden"
              >
                <p className="font-bold text-primary mb-2">ملخص البيانات</p>

                <p className="text-sm text-text">الثانوية: {student.highSchoolGrade || "—"}%</p>
                <p className="text-sm text-text">القدرات: {student.aptitudeScore || "—"}</p>
                <p className="text-sm text-text">التحصيلي: {student.achievementScore || "—"}</p>

                <hr className="my-3" />

                <p className="text-sm text-text">وزن الثانوية: {weights.highSchoolPercentage || "—"}%</p>
                <p className="text-sm text-text">وزن القدرات: {weights.abilitiesScore || "—"}%</p>
                <p className="text-sm text-text">وزن التحصيلي: {weights.achievementScore || "—"}%</p>
              </div>
            </div>
            {result !== null ? (
              <ActionsButtons
                onRecalculate={calculate}
                onReset={resetAll}
                canDownload={true}
                onDownload={downloadPDF}
              />
            ) : null}

          </>
        ) : null}

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

export const StudentDataFrame = ({ value, onChange }) => {
  const formFields = [
    {
      id: "highSchoolGrade",
      label: "نسبة الثانوية العامة",
      placeholder: "ادخل نسبتك في الثانوية العامة",
      val: value.highSchoolGrade,
    },
    {
      id: "aptitudeScore",
      label: "درجة اختبار القدرات",
      placeholder: "اكتب درجتك في اختبار القدرات (من 100)",
      val: value.aptitudeScore,
    },
  ];

  return (
    <form className="flex flex-col flex-1 items-start gap-8 px-4 py-8 md:px-6 md:py-12 relative bg-white rounded-[30px] border-[3px] border-solid border-variable-collection-stroke">
      <h1 className="relative self-stretch mt-[-3.00px] font-bold text-primary text-xl md:text-2xl [direction:rtl]">
        بيانات الطالب
      </h1>

      <div className="flex-col items-start justify-center gap-6 flex relative self-stretch w-full">
        {formFields.map((field) => (
          <div key={field.id} className="flex-col items-start gap-2.5 flex self-stretch w-full">
            <label htmlFor={field.id} className="text-zinc-950 text-base [direction:rtl]">
              {field.label}
            </label>

            <div className="p-4 bg-white rounded-[10px] border border-solid border-zinc-200 flex self-stretch w-full">
              <input
                id={field.id}
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={field.val}
                onChange={(e) => onChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                className="text-zinc-900 text-sm text-right w-full [direction:rtl] placeholder:text-zinc-500"
              />
            </div>
          </div>
        ))}

        <div className="flex-col items-start gap-2.5 flex self-stretch w-full">
          <div className="flex flex-col items-start gap-1 md:flex-row md:justify-between self-stretch w-full">
            <label htmlFor="achievementScore" className="text-zinc-950 text-base [direction:rtl]">
              درجة الاختبار التحصيلي
            </label>
            <p className="text-[#be1919] text-sm md:text-base [direction:rtl]">
              إذا كان التحصيلي غير مطلوب, اتركه فارغا
            </p>
          </div>

          <div className="p-4 bg-white rounded-[10px] border border-solid border-zinc-200 flex self-stretch w-full">
            <input
              id="achievementScore"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={value.achievementScore}
              onChange={(e) => onChange("achievementScore", e.target.value)}
              placeholder="ادخل درجتك في الاختبار التحصيلي (من 100)"
              className="text-zinc-900 text-sm text-right w-full [direction:rtl] placeholder:text-zinc-500"
            />
          </div>
        </div>
      </div>
    </form>
  );
};


export const UniversityRequirementsFrame = ({ value, onChange }) => {
  const [showAlert, setShowAlert] = useState(false);

  const total =
    (Number.parseFloat(value.highSchoolPercentage) || 0) +
    (Number.parseFloat(value.abilitiesScore) || 0) +
    (Number.parseFloat(value.achievementScore) || 0);

  useEffect(() => {
    if (
      total !== 100 &&
      (value.highSchoolPercentage || value.abilitiesScore || value.achievementScore)
    ) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [total, value.highSchoolPercentage, value.abilitiesScore, value.achievementScore]);

  return (
    <div className="flex flex-col flex-1 items-start gap-8 px-4 py-8 md:px-6 md:py-12 relative bg-white rounded-[30px] border-[3px] border-solid border-variable-collection-stroke">
      <header className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-8 self-stretch w-full">
        <h1 className="font-bold text-primary text-xl md:text-2xl [direction:rtl]">
          متطلبات الجامعة
        </h1>
        <p className="flex-1 font-medium text-[#be1a1a] text-sm text-right [direction:rtl]">
          مهم جدا إن مجموع متطلبات الجامعة 100٪
        </p>
      </header>

      {showAlert && (
        <div className="w-full p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm [direction:rtl]">
            مجموع متطلبات الجامعة يجب أن يكون 100٪ بالضبط
          </p>
        </div>
      )}

      <form className="flex-col items-start justify-center gap-6 flex self-stretch w-full">
        {/* الثانوية */}
        <div className="flex-col items-start gap-2.5 flex self-stretch w-full">
          <label htmlFor="highSchoolPercentage" className="text-zinc-950 text-base [direction:rtl]">
            النسبة المطلوبة للثانوية (%)
          </label>
          <div className="p-4 bg-white rounded-[10px] border border-solid border-zinc-200 flex self-stretch w-full">
            <input
              id="highSchoolPercentage"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={value.highSchoolPercentage}
              onChange={(e) => onChange("highSchoolPercentage", e.target.value)}
              placeholder="مثال: 40"
              className="text-zinc-900 text-sm text-right w-full [direction:rtl] placeholder:text-zinc-500"
            />
          </div>
        </div>

        {/* القدرات */}
        <div className="flex-col items-start gap-2.5 flex self-stretch w-full">
          <label htmlFor="abilitiesScore" className="text-zinc-950 text-base [direction:rtl]">
            درجة القدرات المطلوبة (%)
          </label>
          <div className="p-4 bg-white rounded-[10px] border border-solid border-zinc-200 flex self-stretch w-full">
            <input
              id="abilitiesScore"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={value.abilitiesScore}
              onChange={(e) => onChange("abilitiesScore", e.target.value)}
              placeholder="مثال: 30"
              className="text-zinc-900 text-sm text-right w-full [direction:rtl] placeholder:text-zinc-500"
            />
          </div>
        </div>

        {/* التحصيلي */}
        <div className="flex-col items-start gap-2.5 flex self-stretch w-full">
          <div className="flex flex-col items-start gap-1 md:flex-row md:justify-between self-stretch w-full">
            <label htmlFor="achievementScore" className="text-zinc-950 text-base [direction:rtl]">
              درجة التحصيلي المطلوبة (%)
            </label>
            <p className="text-[#be1919] text-sm md:text-base [direction:rtl]">
              إذا كان التحصيلي غير مطلوب, اتركه فارغا أو اجعله 0
            </p>
          </div>

          <div className="p-4 bg-white rounded-[10px] border border-solid border-zinc-200 flex self-stretch w-full">
            <input
              id="achievementScore"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={value.achievementScore}
              onChange={(e) => onChange("achievementScore", e.target.value)}
              placeholder="مثال: 30"
              className="text-zinc-900 text-sm text-right w-full [direction:rtl] placeholder:text-zinc-500"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export const ProgressFrame = ({ percentage = 0, show = false }) => {
  const safe = Math.max(0, Math.min(100, Number(percentage) || 0));

  return (
    <div className="flex flex-col items-start gap-4 pt-4 pb-6 px-4 md:pt-8 md:pb-14 relative bg-primary-light rounded-xl md:rounded-[30px]">
      <div className="flex items-start justify-between self-stretch w-full">
        <div className="font-medium text-text text-base [direction:rtl]">
          نسبتك الموزونة هي
        </div>
        <div className="font-bold text-primary-dark text-base text-right">
          {show ? `${safe}%` : "—"}
        </div>
      </div>

      <div className="bg-primary-bg rounded-[20px] self-stretch w-full">
        <div
          className="h-2 md:h-4 bg-primary rounded-[20px]"
          style={{ width: `${show ? safe : 0}%` }}
        />
      </div>
    </div>
  );
};


const ActionsButtons = ({ onRecalculate, onReset, onDownload, canDownload }) => {
  const FileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );

  return (
    <div className="flex flex-col md:flex-row w-full max-w-[812px] mx-auto items-center justify-center gap-4 md:gap-12 mt-6 md:mt-[32px]">
      <button
        className={`flex items-center px-10 md:px-20 py-4 md:py-6 justify-center gap-2 w-full md:w-auto flex-1 grow rounded-[20px] text-white transition
          ${canDownload ? "bg-primary hover:bg-primary-dark" : "bg-gray-300 cursor-not-allowed"}`}
        onClick={onDownload}
        type="button"
        disabled={!canDownload}
        aria-label="تنزيل النتيجة PDF"
      >
        <FileIcon />
        <span className="font-bold text-sm md:text-base [direction:rtl] whitespace-nowrap">
          تنزيل النتيجة PDF
        </span>
      </button>

      <button
        className="flex items-center px-10 md:px-20 py-4 md:py-6 justify-center gap-2 w-full md:w-auto flex-1 grow bg-white rounded-[20px] border-2 border-solid border-blue-500 hover:bg-gray-50 transition"
        onClick={onRecalculate}
        type="button"
        aria-label="إعادة الحساب"
      >
        <span className="font-bold text-blue-500 text-sm md:text-base [direction:rtl]">
          إعادة الحساب
        </span>
      </button>

      <button
        className="flex items-center px-6 py-4 md:py-6 justify-center w-full md:w-auto rounded-[20px] border border-zinc-200 hover:bg-zinc-50 transition"
        onClick={onReset}
        type="button"
        aria-label="مسح البيانات"
      >
        <span className="font-bold text-zinc-700 text-sm md:text-base [direction:rtl]">
          مسح البيانات
        </span>
      </button>
    </div>
  );
};
