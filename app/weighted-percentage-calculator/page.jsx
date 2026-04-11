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
        "النسبة الموزونة هي مجموع درجاتك في الثانوية العامة و اختبار القدرات و الاختبار التحصيلي بعد ما نوزن كل درجة بالنسبة المحددة لها.\nكل ج��معة ممكن تغير نسب الوزن بين الثانوية والقدرات والتحصيلي، عشان كده تأكد من متطلبات الجامعة اللي ناوي تقدم لها.",
    },
  ];

  const [student, setStudent] = useState({
    highSchoolGrade: "",
    aptitudeScore: "",
    achievementScore: "",
  });

  const [weights, setWeights] = useState({
    highSchoolPercentage: "",
    abilitiesScore: "",
    achievementScore: "",
  });

  const [result, setResult] = useState(null);
  const [globalError, setGlobalError] = useState("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

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

    if (weightsTotal !== 100) {
      setGlobalError("مجموع متطلبات الجامعة يجب أن يكون 100٪ بالضبط");
      setResult(null);
      return;
    }

    if (acW > 0 && student.achievementScore === "") {
      setGlobalError("التحصيلي مطلوب لأن وزنه أكبر من 0٪. أدخل درجة التحصيلي.");
      setResult(null);
      return;
    }

    const weighted = (abW * abS + acW * acS + hsW * hsS) / 100;
    const rounded = Math.round(weighted * 100) / 100;
    setResult(rounded);
  };

  const resetAll = () => {
    setStudent({
      highSchoolGrade: "",
      aptitudeScore: "",
      achievementScore: "",
    });
    setWeights({
      highSchoolPercentage: "",
      abilitiesScore: "",
      achievementScore: "",
    });
    setResult(null);
    setGlobalError("");
  };

  const downloadPDF = async () => {
    if (result === null) return;
    setIsGeneratingPDF(true);

    try {
      const domToImage = (await import("dom-to-image")).default;
      const jsPDF = (await import("jspdf")).default;

      const percentage = result;
      const size = 260;
      const cx = size / 2;
      const cy = size / 2;
      const stroke = 28; // ← سميك زي الصورة
      const radius = cx - stroke / 2;
      const circumference = radius * 2 * Math.PI;
      const strokeDashoffset =
        circumference - (percentage / 100) * circumference;
      const innerSize = size - stroke * 2; // الدايرة الداخلية
      // إنشاء الـ wrapper
      const wrapper = document.createElement("div");
      wrapper.style.cssText = `
      position: fixed;
      top: 0;
      left: -9999px;
      width: 800px;
      height: 1131px;
      z-index: -1;
      overflow: hidden;
    `;

      // إنشاء الـ container الفعلي
      const pdfContainer = document.createElement("div");
      pdfContainer.id = "pdf-export-container";
      pdfContainer.style.cssText = `
      width: 800px;
      height: 1131px;
      background-color: #F0F4F8;
      font-family: Arial, sans-serif;
      direction: rtl;
      position: relative;
      overflow: hidden;
    `;

      // ===== HEADER =====
      const header = document.createElement("div");
      header.style.cssText = `
      width: 800px;
      height: 120px;
      background: linear-gradient(to left, #2E8BC9, #47A7E9);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 40px;
      box-sizing: border-box;
    `;

      const logo = document.createElement("img");
      logo.src =
        "https://res.cloudinary.com/dbvh5i83q/image/upload/v1775902080/eeaf2477-0e69-4093-afe5-7cc2b948b192_enqxcm.png";
      logo.crossOrigin = "anonymous";
      logo.style.cssText = `
      width: 90px;
      height: 90px;
      object-fit: contain;
      filter: brightness(0) invert(1);
    `;

      const headerTitle = document.createElement("div");
      headerTitle.textContent = "تقرير النسبة الموزونة";
      headerTitle.style.cssText = `
      color: white;
      font-size: 30px;
      font-weight: bold;
    `;

      header.appendChild(logo);
      header.appendChild(headerTitle);

      // ===== CONTENT AREA =====
      const content = document.createElement("div");
      content.style.cssText = `
      padding: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0;
    `;

      // ===== TABLE =====
      const tableWrapper = document.createElement("div");
      tableWrapper.style.cssText = `
      width: 100%;
      display: flex;
      flex-direction: row-reverse;
      gap: 20px;
      margin-top: 20px;
    `;

      const columns = [
        {
          header: "البيان",
          rows: ["الثانوية العامة", "اختبار القدرات", "الاختبار التحصيلي"],
        },
        {
          header: "درجة الطالب",
          rows: [
            `${student.highSchoolGrade || "0"}%`,
            `${student.aptitudeScore || "0"}%`,
            `${student.achievementScore || "0"}%`,
          ],
        },
        {
          header: "وزن الجامعة",
          rows: [
            `${weights.highSchoolPercentage || "0"}%`,
            `${weights.abilitiesScore || "0"}%`,
            `${weights.achievementScore || "0"}%`,
          ],
        },
      ];

      columns.forEach((col) => {
        const colDiv = document.createElement("div");
        colDiv.style.cssText = `
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 12px;
      `;

        // Header cell
        const headerCell = document.createElement("div");
        headerCell.style.cssText = `
        background: linear-gradient(to bottom, #47A7E9, #2E8BC9);
        color: white;
        font-weight: bold;
        font-size: 20px;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 30px 0px 0 0;
        text-align: center;
      `;
        headerCell.textContent = col.header;
        colDiv.appendChild(headerCell);

        // Data rows
        col.rows.forEach((rowText) => {
          const cell = document.createElement("div");
          cell.style.cssText = `
          background-color: #DAE9F5;
          color: #334155;
          font-weight: bold;
          font-size: 20px;
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          text-align: center;
        `;
          cell.textContent = rowText;
          colDiv.appendChild(cell);
        });

        tableWrapper.appendChild(colDiv);
      });

      content.appendChild(tableWrapper);

      // ===== PILL =====
      const pill = document.createElement("div");
      pill.style.cssText = `
      margin-top: 60px;
      background: white;
      padding: 14px 50px;
      border-radius: 50px;
      font-weight: bold;
      color: #334155;
      font-size: 24px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
      display: inline-block;
    `;
      pill.textContent = "النسبة الموزونة النهائية";
      content.appendChild(pill);

      // ===== CIRCLE =====
      const circleWrapper = document.createElement("div");
      circleWrapper.style.cssText = `
  margin-top: 40px;
  width: ${size}px;
  height: ${size}px;
  position: relative;
`;

      // SVG
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("width", String(size));
      svg.setAttribute("height", String(size));
      svg.style.cssText = `
  position: absolute;
  top: 0;
  left: 0;
  transform: rotate(-90deg);
`;

      // Background track - أزرق فاتح جداً
      const bgCircle = document.createElementNS(svgNS, "circle");
      bgCircle.setAttribute("cx", String(cx));
      bgCircle.setAttribute("cy", String(cy));
      bgCircle.setAttribute("r", String(radius));
      bgCircle.setAttribute("stroke", "#DBEAFE");
      bgCircle.setAttribute("stroke-width", String(stroke));
      bgCircle.setAttribute("fill", "transparent");

      // Progress arc - أزرق غامق
      const progressCircle = document.createElementNS(svgNS, "circle");
      progressCircle.setAttribute("cx", String(cx));
      progressCircle.setAttribute("cy", String(cy));
      progressCircle.setAttribute("r", String(radius));
      progressCircle.setAttribute("stroke", "#2E8BC9");
      progressCircle.setAttribute("stroke-width", String(stroke));
      progressCircle.setAttribute("fill", "transparent");
      progressCircle.setAttribute("stroke-dasharray", String(circumference));
      progressCircle.setAttribute(
        "stroke-dashoffset",
        String(strokeDashoffset)
      );
      progressCircle.setAttribute("stroke-linecap", "round");

      svg.appendChild(bgCircle);
      svg.appendChild(progressCircle);

      // Inner white circle
      const innerCircle = document.createElement("div");
      innerCircle.style.cssText = `
  position: absolute;
  top: ${stroke}px;
  left: ${stroke}px;
  width: ${innerSize}px;
  height: ${innerSize}px;
  background: white;
  border-radius: 50%;
`;

      // Percentage text - centered بـ line-height
      const percentText = document.createElement("div");
      percentText.textContent = `${percentage}%`;
      percentText.style.cssText = `
  position: absolute;
  top: ${stroke}px;
  left: ${stroke}px;
  width: ${innerSize}px;
  height: ${innerSize}px;
  line-height: ${innerSize}px;
  text-align: center;
  font-size: 52px;
  font-weight: bold;
  color: #334155;
  z-index: 2;
`;

      circleWrapper.appendChild(svg);
      circleWrapper.appendChild(innerCircle);
      circleWrapper.appendChild(percentText);
      content.appendChild(circleWrapper);

      // ===== SUBTITLE =====
      const subtitle = document.createElement("div");
      subtitle.textContent = "نرتقي معا للنجاح .. فالموازنة بداية الرحلة";
      subtitle.style.cssText = `
      margin-top: 40px;
      font-size: 22px;
      font-weight: 500;
      color: #4b5563;
      text-align: center;
    `;
      content.appendChild(subtitle);

      // ===== FOOTER =====
      const footer = document.createElement("div");
      footer.style.cssText = `
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 60px;
      background: linear-gradient(to left, #2E8BC9, #47A7E9);
    `;

      // Assemble
      pdfContainer.appendChild(header);
      pdfContainer.appendChild(content);
      pdfContainer.appendChild(footer);
      wrapper.appendChild(pdfContainer);
      document.body.appendChild(wrapper);

      // Wait for image to load
      await new Promise((r) => {
        if (logo.complete) r(null);
        else {
          logo.onload = r;
          logo.onerror = r;
        }
      });

      await new Promise((r) => setTimeout(r, 500));

      // Capture using dom-to-image
      const dataUrl = await domToImage.toPng(pdfContainer, {
        width: 800,
        height: 1131,
        style: {
          transform: "scale(1)",
          transformOrigin: "top left",
        },
      });

      document.body.removeChild(wrapper);

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("تقرير_النسبة_الموزونة.pdf");
    } catch (err) {
      console.error("PDF Error:", err);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div>
      <PagesBanner
        title={"النسبة الموزونة"}
        breadcrumb={[
          { title: "الرئيسية", link: "/" },
          { title: "النسبة الموزونة", link: "#" },
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
            <p className="text-red-700 text-sm [direction:rtl]">
              {globalError}
            </p>
          </div>
        ) : null}

        <div className="flex items-center justify-center">
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
            <ProgressFrame percentage={result} show />
            <ActionsButtons
              onRecalculate={calculate}
              onReset={resetAll}
              canDownload={true}
              onDownload={downloadPDF}
              isLoading={isGeneratingPDF}
            />
          </>
        ) : null}

        <div className="mt-[48px]">
          <div className="text-right justify-center text-primary text-xl md:text-3xl font-bold mb-8">
            الأسئلة الشائعة
          </div>
          <div className="mt-8 flex flex-col gap-4 md:gap-6">
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

// ============ باقي الكومبوننتات كما هي ============

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
    <form className="flex flex-col flex-1 items-start gap-8 px-4 py-6 md:px-6  relative bg-white rounded-[30px] border-[3px] border-solid border-variable-collection-stroke">
      <h1 className="relative self-stretch mt-[-3.00px] font-bold text-primary text-xl md:text-2xl [direction:rtl]">
        بيانات الطالب
      </h1>

      <div className="flex-col items-start justify-center gap-6 flex relative self-stretch w-full">
        {formFields.map((field) => (
          <div
            key={field.id}
            className="flex-col items-start gap-2.5 flex self-stretch w-full"
          >
            <label
              htmlFor={field.id}
              className="text-zinc-950 text-base [direction:rtl]"
            >
              {field.label}
            </label>
            <div className="p-4 bg-white rounded-[10px] border border-solid border-zinc-200 flex self-stretch w-full">
              <input
                id={field.id}
                type="number"
                onWheel={(e) => e.target.blur()}
                min="0"
                max="100"
                step="0.1"
                value={field.val}
                onChange={(e) => onChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                className="text-zinc-900 text-sm text-right w-full [direction:rtl] placeholder:text-zinc-500 outline-none"
              />
            </div>
          </div>
        ))}

        <div className="flex-col items-start gap-2.5 flex self-stretch w-full">
          <div className="flex flex-col items-start gap-1 md:flex-row md:justify-between self-stretch w-full">
            <label
              htmlFor="achievementScore"
              className="text-zinc-950 text-base [direction:rtl]"
            >
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
              onWheel={(e) => e.target.blur()}
              min="0"
              max="100"
              step="0.1"
              value={value.achievementScore}
              onChange={(e) => onChange("achievementScore", e.target.value)}
              placeholder="ادخل درجتك في الاختبار التحصيلي (من 100)"
              className="text-zinc-900 text-sm text-right w-full [direction:rtl] placeholder:text-zinc-500 outline-none"
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
      (value.highSchoolPercentage ||
        value.abilitiesScore ||
        value.achievementScore)
    ) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [
    total,
    value.highSchoolPercentage,
    value.abilitiesScore,
    value.achievementScore,
  ]);

  return (
    <div className="flex flex-col flex-1 items-start gap-8 px-4 py-6 md:px-6 relative bg-white rounded-[30px] border-[3px] border-solid border-variable-collection-stroke">
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
            مجموع متطلبات الجامعة يجب أن يكون 100٪ بالضبط (الحالي: {total}%)
          </p>
        </div>
      )}

      <form className="flex-col items-start justify-center gap-6 flex self-stretch w-full">
        <div className="flex-col items-start gap-2.5 flex self-stretch w-full">
          <label
            htmlFor="highSchoolPercentage"
            className="text-zinc-950 text-base [direction:rtl]"
          >
            النسبة المطلوبة للثانوية (%)
          </label>
          <div className="p-4 bg-white rounded-[10px] border border-solid border-zinc-200 flex self-stretch w-full">
            <input
              id="highSchoolPercentage"
              type="number"
              onWheel={(e) => e.target.blur()}
              min="0"
              max="100"
              step="0.1"
              value={value.highSchoolPercentage}
              onChange={(e) => onChange("highSchoolPercentage", e.target.value)}
              placeholder="مثال: 40"
              className="text-zinc-900 text-sm text-right w-full [direction:rtl] placeholder:text-zinc-500 outline-none"
            />
          </div>
        </div>

        <div className="flex-col items-start gap-2.5 flex self-stretch w-full">
          <label
            htmlFor="abilitiesScore"
            className="text-zinc-950 text-base [direction:rtl]"
          >
            درجة القدرات المطلوبة (%)
          </label>
          <div className="p-4 bg-white rounded-[10px] border border-solid border-zinc-200 flex self-stretch w-full">
            <input
              id="abilitiesScore"
              type="number"
              onWheel={(e) => e.target.blur()}
              min="0"
              max="100"
              step="0.1"
              value={value.abilitiesScore}
              onChange={(e) => onChange("abilitiesScore", e.target.value)}
              placeholder="مثال: 30"
              className="text-zinc-900 text-sm text-right w-full [direction:rtl] placeholder:text-zinc-500 outline-none"
            />
          </div>
        </div>

        <div className="flex-col items-start gap-2.5 flex self-stretch w-full">
          <div className="flex flex-col items-start gap-1 md:flex-row md:justify-between self-stretch w-full">
            <label
              htmlFor="achievementScoreWeight"
              className="text-zinc-950 text-base [direction:rtl]"
            >
              درجة التحصيلي المطلوبة (%)
            </label>
            <p className="text-[#be1919] text-sm md:text-base [direction:rtl]">
              إذا كان التحصيلي غير مطلوب, اتركه فارغا أو اجعله 0
            </p>
          </div>
          <div className="p-4 bg-white rounded-[10px] border border-solid border-zinc-200 flex self-stretch w-full">
            <input
              id="achievementScoreWeight"
              type="number"
              onWheel={(e) => e.target.blur()}
              min="0"
              max="100"
              step="0.1"
              value={value.achievementScore}
              onChange={(e) => onChange("achievementScore", e.target.value)}
              placeholder="مثال: 30"
              className="text-zinc-900 text-sm text-right w-full [direction:rtl] placeholder:text-zinc-500 outline-none"
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
        <div className="font-bold text-primary-dark text-xl text-right">
          {show ? `${safe}%` : "—"}
        </div>
      </div>
      <div className="bg-primary-bg rounded-[20px] self-stretch w-full">
        <div
          className="h-2 md:h-4 bg-primary rounded-[20px] transition-all duration-500"
          style={{ width: `${show ? safe : 0}%` }}
        />
      </div>
    </div>
  );
};

const ActionsButtons = ({
  onRecalculate,
  onReset,
  onDownload,
  canDownload,
  isLoading,
}) => {
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
    <div className="flex flex-col md:flex-row w-full max-w-[812px] mx-auto items-center justify-center gap-4 md:gap-12 mt-6 md:mt-[32px]">
      <button
        className={`flex items-center px-10 md:px-20 py-4 md:py-6 justify-center gap-2 w-full md:w-auto flex-1 grow rounded-[20px] text-white transition
          ${canDownload && !isLoading ? "bg-primary hover:bg-primary-dark" : "bg-gray-300 cursor-not-allowed"}`}
        onClick={onDownload}
        type="button"
        disabled={!canDownload || isLoading}
      >
        {isLoading ? (
          "جارِ الإنشاء..."
        ) : (
          <>
            <FileIcon />
            <span className="font-bold text-sm md:text-base [direction:rtl] whitespace-nowrap">
              تنزيل النتيجة PDF
            </span>
          </>
        )}
      </button>

      <button
        className="flex items-center px-10 md:px-20 py-4 md:py-6 justify-center gap-2 w-full md:w-auto flex-1 grow bg-white rounded-[20px] border-2 border-solid border-blue-500 hover:bg-gray-50 transition"
        onClick={onRecalculate}
        type="button"
      >
        <span className="font-bold text-blue-500 text-sm md:text-base [direction:rtl]">
          إعادة الحساب
        </span>
      </button>

      <button
        className="flex items-center px-6 py-4 md:py-6 justify-center w-full md:w-auto rounded-[20px] border border-zinc-200 hover:bg-zinc-50 transition"
        onClick={onReset}
        type="button"
      >
        <span className="font-bold text-zinc-700 text-sm md:text-base [direction:rtl]">
          مسح البيانات
        </span>
      </button>
    </div>
  );
};
