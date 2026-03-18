// app/placement-test/[id]/_components/ResultsView.jsx

"use client";

import { useState, useRef, useEffect } from "react";
import Container from "@/components/ui/Container";
import {
  Eye,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Sparkles,
  BookOpen,
  ArrowLeft,
  Trophy,
  Target,
  Download,
  Loader2,
  Check,
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResultsView = ({
  testInfo,
  percentage,
  correctAnswers,
  totalQuestions,
  allQuestions,
  answeredMap,
  suggestion,
  sectionResults = [],
  onGoToRound,
  onGoHome,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const pdfContentRef = useRef(null);
  const hasAutoDownloaded = useRef(false);

  // دالة إنشاء وتحميل PDF
  const generateAndDownloadPDF = async () => {
    if (!pdfContentRef.current || isGeneratingPDF) return;

    try {
      setIsGeneratingPDF(true);

      // انتظار تحميل المحتوى
      await new Promise((resolve) => setTimeout(resolve, 500));

      const element = pdfContentRef.current;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#f9fafb",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = margin;

      // إضافة الصورة الأولى
      pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - margin * 2;

      // صفحات إضافية إذا لزم الأمر
      while (heightLeft > 0) {
        pdf.addPage();
        position = heightLeft - imgHeight + margin;
        pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight - margin * 2;
      }

      // حفظ الملف
      const date = new Date().toLocaleDateString("en-GB").replace(/\//g, "-");
      const testName = testInfo?.name || "placement-test";

      pdf.save(`${testName}-result-${date}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // تنزيل تلقائي عند فتح الصفحة
  useEffect(() => {
    if (!hasAutoDownloaded.current) {
      const timer = setTimeout(() => {
        hasAutoDownloaded.current = true;
        generateAndDownloadPDF();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-[calc(100vh-133px)] bg-gray-50 py-8" dir="rtl">
      <Container>
        {/* Loading Overlay */}
        {isGeneratingPDF && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="text-lg font-bold text-gray-800">
                جاري تحميل النتيجة...
              </p>
            </div>
          </div>
        )}

        <div className="max-w-2xl mx-auto space-y-6">
          {/* ============ PDF Content Area ============ */}
          <div ref={pdfContentRef} className="space-y-6">
            {/* Main Result Card */}
            <div
              className="bg-white rounded-3xl p-8 md:p-12 shadow-lg relative overflow-hidden"
              style={{ position: "relative" }}
            >
              {/* Watermark - في المنتصف */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  opacity: 0.1,
                  pointerEvents: "none",
                  zIndex: 10,
                }}
              >
                <img
                  src="/images/logo.svg"
                  alt=""
                  style={{ width: "300px", height: "auto" }}
                />
              </div>

              {/* Header */}
              <div className="text-center mb-8 relative z-20">
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                    percentage >= 60 ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {percentage >= 60 ? (
                    <Trophy className="w-12 h-12 text-green-500" />
                  ) : (
                    <Target className="w-12 h-12 text-red-500" />
                  )}
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {percentage >= 60 ? "أحسنت!" : "حاول مرة أخرى"}
                </h1>
                <p className="text-gray-500">تم إنهاء الاختبار بنجاح</p>
              </div>

              {/* Total Score Circle */}
              <div className="relative w-44 h-44 mx-auto mb-8 z-20">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="88"
                    cy="88"
                    r="78"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                  />
                  <circle
                    cx="88"
                    cy="88"
                    r="78"
                    fill="none"
                    stroke={percentage >= 60 ? "#22c55e" : "#ef4444"}
                    strokeWidth="12"
                    strokeDasharray={`${(percentage / 100) * 490} 490`}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold text-gray-800">
                    {percentage}%
                  </span>
                  <span className="text-gray-500 text-sm mt-2">
                    المجموع الكلي
                  </span>
                </div>
              </div>

              {/* Section Results - داخل الـ PDF */}
              {sectionResults.length > 0 && (
                <div className="relative z-20">
                  <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    نتائج الأقسام
                  </h2>

                  <div className="space-y-4">
                    {sectionResults.map((section, index) => (
                      <SectionResultCard
                        key={section.id}
                        section={section}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* ============ End PDF Content Area ============ */}

          {/* ============ Outside PDF - الأزرار والتفاصيل ============ */}

          {/* Show Details Button */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full py-3 border-2 border-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 bg-white"
          >
            <Eye className="w-5 h-5" />
            {showDetails ? "إخفاء التفاصيل" : "عرض تفاصيل الإجابات"}
            <ChevronUp
              className={`w-5 h-5 transition-transform ${
                showDetails ? "" : "rotate-180"
              }`}
            />
          </button>

          {/* شكل مصغر للامتحان */}
          {showDetails && (
            <AnswerDetails
              allQuestions={allQuestions}
              answeredMap={answeredMap}
            />
          )}

          {/* Suggestion Card - خارج الـ PDF */}
          {suggestion && (
            <SuggestionCard suggestion={suggestion} onGoToRound={onGoToRound} />
          )}

          {/* Download PDF Button */}
          <button
            onClick={generateAndDownloadPDF}
            disabled={isGeneratingPDF}
            className="w-full py-4 bg-secondary text-white rounded-full font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isGeneratingPDF ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                جاري التحميل...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                تحميل النتيجة PDF
              </>
            )}
          </button>

          {/* Home Button */}
          <button
            onClick={onGoHome}
            className="w-full py-4 bg-primary text-white rounded-full font-bold text-lg hover:opacity-90 transition-opacity"
          >
            العودة للرئيسية
          </button>
        </div>
      </Container>
    </div>
  );
};

// Section Result Card Component - بدون تغيير
const SectionResultCard = ({ section, index }) => {
  const getColorClass = (percentage) => {
    if (percentage >= 80)
      return {
        bg: "bg-green-500",
        light: "bg-green-100",
        text: "text-green-600",
      };
    if (percentage >= 60)
      return {
        bg: "bg-yellow-500",
        light: "bg-yellow-100",
        text: "text-yellow-600",
      };
    return { bg: "bg-red-500", light: "bg-red-100", text: "text-red-600" };
  };

  const colors = getColorClass(section.percentage);

  return (
    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span
            className={`w-8 h-8 rounded-full ${colors.light} ${colors.text} flex items-center justify-center text-sm font-bold`}
          >
            {index + 1}
          </span>
          <div>
            <h3 className="font-bold text-gray-800 text-sm">
              {section.title || `القسم ${index + 1}`}
            </h3>
            <p className="text-xs text-gray-500">
              {section.total} {section.total === 1 ? "سؤال" : "أسئلة"}
            </p>
          </div>
        </div>
        <div className="text-left">
          <p className={`text-lg font-bold ${colors.text}`}>
            {section.correct}/{section.total}
          </p>
          <p className="text-xs text-gray-500">{section.percentage}%</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`absolute top-0 right-0 h-full ${colors.bg} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${section.percentage}%` }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "8px",
          fontSize: "12px",
        }}
      >
        <span style={{ color: "#16a34a" }}>✓ {section.correct} صحيح</span>
        <span style={{ color: "#dc2626" }}>
          ✗ {section.total - section.correct} خطأ
        </span>
      </div>
    </div>
  );
};

// Answer Details Component (الشكل المصغر)
const AnswerDetails = ({ allQuestions, answeredMap }) => {
  const letters = ["أ", "ب", "ج", "د", "هـ", "و"];

  return (
    <div className="border border-gray-200 rounded-3xl overflow-hidden bg-[#f8f9fa] shadow-inner">
      <div className="max-h-[600px] overflow-y-auto custom-scroll p-3 md:p-5 space-y-4">
        {allQuestions.map((q, index) => {
          const selectedOptionId = answeredMap[q.id];
          const isCorrect = q.options?.find(
            (opt) => opt.id === selectedOptionId
          )?.isCorrect;
          const hasAnswered = selectedOptionId !== undefined;

          // التحقق إذا كان السؤال على فقرة
          const isParagraphQuestion = q.type === "paragraph_mcq" || q.passage;

          return (
            <div
              key={q.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* رأس الكارد المصغر */}
              <div
                className={`px-4 py-3 flex items-center justify-between border-b border-gray-100 ${
                  !hasAnswered
                    ? "bg-gray-100"
                    : isCorrect
                      ? "bg-green-50"
                      : "bg-red-50"
                }`}
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm ${
                      !hasAnswered
                        ? "bg-gray-500"
                        : isCorrect
                          ? "bg-green-500"
                          : "bg-red-500"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="font-bold text-sm text-gray-700">
                    {!hasAnswered
                      ? "لم تتم الإجابة"
                      : isCorrect
                        ? "إجابة صحيحة"
                        : "إجابة خاطئة"}
                  </span>

                  {/* === التعديل 1: إضافة بادج "سؤال على فقرة" === */}
                  {isParagraphQuestion && (
                    <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-0.5 rounded-full border border-purple-200">
                      سؤال على فقرة
                    </span>
                  )}
                </div>
                {hasAnswered && (
                  <div>
                    {isCorrect ? (
                      <CheckCircle2 className="text-green-500 w-5 h-5" />
                    ) : (
                      <XCircle className="text-red-500 w-5 h-5" />
                    )}
                  </div>
                )}
              </div>

              {/* جسم السؤال (بدون فقرة) */}
              <div className="p-4 md:p-5">
                {/* نص السؤال */}
                <div
                  className="text-base text-gray-800 font-medium prose prose-sm max-w-none leading-relaxed mb-4 [&_p]:m-0"
                  dangerouslySetInnerHTML={{ __html: q.text }}
                />

                {/* الاختيارات */}
                <div className="space-y-2.5">
                  {q.options?.map((option, optIndex) => {
                    const isSelected = selectedOptionId === option.id;
                    const isActualCorrect = option.isCorrect;

                    let optionStyle = "border-gray-200 bg-white";
                    let letterStyle = "border-gray-300 text-gray-500";
                    let Icon = null;

                    if (isSelected && isActualCorrect) {
                      optionStyle = "border-green-500 bg-green-50";
                      letterStyle = "border-green-500 bg-green-500 text-white";
                      Icon = (
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      );
                    } else if (isSelected && !isActualCorrect) {
                      optionStyle = "border-red-500 bg-red-50";
                      letterStyle = "border-red-500 bg-red-500 text-white";
                      Icon = (
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      );
                    } else if (!isSelected && isActualCorrect) {
                      // === التعديل 2: إزالة border-dashed من الإجابة الصحيحة وجعلها صلبة ===
                      optionStyle = "border-green-500 bg-green-50/40";
                      letterStyle = "border-green-500 text-green-600";
                      Icon = (
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      );
                    }

                    return (
                      <div
                        key={option.id}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${optionStyle}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-bold text-sm ${letterStyle}`}
                        >
                          {letters[optIndex] || optIndex + 1}
                        </div>
                        <span
                          className={`flex-1 text-sm md:text-base ${
                            isActualCorrect || isSelected
                              ? "font-semibold text-gray-800"
                              : "text-gray-600"
                          } [&_p]:m-0`}
                          dangerouslySetInnerHTML={{ __html: option.text }}
                        />
                        {Icon}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Suggestion Card Component - بدون تغيير
const SuggestionCard = ({ suggestion, onGoToRound }) => (
  <div className="bg-secondary rounded-3xl p-8 shadow-lg text-white">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
        <Sparkles className="w-6 h-6" />
      </div>
      <div>
        <h2 className="text-xl font-bold">توصية لك</h2>
        <p className="text-white/80 text-sm">بناءً على نتيجتك</p>
      </div>
    </div>

    {suggestion.message && (
      <p className="text-lg mb-6 bg-white/10 rounded-xl p-4">
        {suggestion.message}
      </p>
    )}

    {suggestion.suggestion_round && (
      <div className="bg-white rounded-2xl p-4 flex items-center gap-4">
        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
          {suggestion.suggestion_round.image_url ? (
            <img
              src={suggestion.suggestion_round.image_url}
              alt={suggestion.suggestion_round.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-800 text-lg mb-1">
            {suggestion.suggestion_round.name}
          </h3>
          <p className="text-gray-500 text-sm">الدورة المقترحة لك</p>
        </div>
        <button
          onClick={onGoToRound}
          className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:opacity-90 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
      </div>
    )}

    <button
      onClick={onGoToRound}
      className="w-full mt-4 py-4 bg-white text-secondary rounded-full font-bold text-lg hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
    >
      <BookOpen className="w-5 h-5" />
      الذهاب للدورة المقترحة
    </button>
  </div>
);

export default ResultsView;
