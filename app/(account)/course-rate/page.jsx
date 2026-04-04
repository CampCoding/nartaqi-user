"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ConfigProvider, Select, Progress, Empty, Divider } from "antd";
import {
  DownOutlined,
  BookOutlined,
  VideoCameraOutlined,
  TrophyOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import useRoundCompletenessRoundByRoundID from "../../../components/shared/Hooks/useGetMyCompeletenessRoundByRoundID";
import useUserCourses from "../../../components/shared/Hooks/useGetMyCourses";

/* === دالة لتحليل رقم الهاتف === */
function parsePhoneNumber(rawPhone) {
  if (!rawPhone) return { code: "+966", number: "" };
  let cleanPhone = rawPhone.replace(/\D/g, "");

  if (cleanPhone.startsWith("966")) {
    return { code: "+966", number: cleanPhone.substring(3) };
  } else if (
    cleanPhone.startsWith("05") ||
    (cleanPhone.startsWith("5") && cleanPhone.length === 9)
  ) {
    return {
      code: "+966",
      number: cleanPhone.startsWith("0") ? cleanPhone.substring(1) : cleanPhone,
    };
  }

  if (cleanPhone.startsWith("20")) {
    return { code: "+20", number: cleanPhone.substring(2) };
  } else if (
    cleanPhone.startsWith("01") ||
    (cleanPhone.startsWith("1") && cleanPhone.length === 10)
  ) {
    return {
      code: "+20",
      number: cleanPhone.startsWith("0") ? cleanPhone.substring(1) : cleanPhone,
    };
  }

  return { code: "+966", number: cleanPhone };
}

export default function CompletionRatePage() {
  const { token, user } = useSelector((s) => s.auth);
  const studentName = user?.name || "اسم الطالب/ة غير متوفر";
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const { code: phoneCode, number: phoneNumber } = parsePhoneNumber(
    user?.phone
  );

  const { rounds, loading: coursesLoading } = useUserCourses(token, {
    autoFetch: true,
    baseUrl: "https://camp-coding.site/nartaqi/public",
  });

  const [courseId, setCourseId] = useState(null);

  const coursesOptions = useMemo(() => {
    const getId = (r) => r?.round_id ?? r?.id ?? r?.roundId;
    const getLabel = (r) =>
      r?.round_name ?? r?.name ?? r?.title ?? `دورة رقم ${getId(r)}`;

    return (rounds || [])
      .map((r) => {
        const id = getId(r);
        if (id == null) return null;
        return { value: String(id), label: getLabel(r) };
      })
      .filter(Boolean);
  }, [rounds]);

  useEffect(() => {
    if (!courseId && coursesOptions.length) {
      setCourseId(coursesOptions[0].value);
    }
  }, [courseId, coursesOptions]);

  const {
    message,
    basicItems,
    lectureItems,
    fullRoundItems,
    loading: compLoading,
    error: compError,
    refetch: refetchCompleteness,
  } = useRoundCompletenessRoundByRoundID(courseId, {
    token,
    enabled: false,
    bearer: true,
  });

  const onSubmit = async () => {
    if (!courseId) return;
    await refetchCompleteness(courseId);
  };

  const selectedCourseName =
    coursesOptions.find((c) => c.value === courseId)?.label || "";

  const downloadPDF = async () => {
    if (!message) return;

    setIsGeneratingPDF(true);

    try {
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).default;

      const container = document.createElement("div");
      container.style.cssText = `
        position: absolute;
        top: -9999px;
        right: 0;
        width: 800px;
        background-color: #ffffff;
        padding: 40px;
        font-family: 'Arial', 'Tahoma', sans-serif;
        direction: rtl;
        text-align: right;
      `;

      // بناء صفوف الجدول
      const buildTableRows = (items) => {
        if (!items || items.length === 0) {
          return `
            <tr>
              <td colspan="2" style="border: 1px solid #e5e7eb; padding: 20px; text-align: center; color: #9ca3af; font-size: 14px;">لا توجد تدريبات</td>
            </tr>
          `;
        }

        return items
          .map((item) => {
            const dateStr = item.created_at
              ? new Date(item.created_at)
                  .toLocaleDateString("en-GB")
                  .replace(/\//g, " - ")
              : new Date().toLocaleDateString("en-GB").replace(/\//g, " - ");

            return `
            <tr>
              <td style="border: 1px solid #e5e7eb; padding: 14px 18px; text-align: right; color: #1f2937; font-size: 14px; font-weight: 600;">${item.exam_name}</td>
              <td style="border: 1px solid #e5e7eb; padding: 14px 18px; text-align: center; color: #1f2937; font-size: 14px;">
                ${
                  item.solved
                    ? `
                  <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
                    <span style="font-weight: bold; font-size: 15px; color: #059669;">%${formatNumber(item.highest_score)}</span>
                    <div style="display: inline-flex; align-items: center; gap: 6px; border: 1px solid #d1d5db; border-radius: 4px; padding: 4px 10px; font-size: 11px; color: #6b7280; background-color: #f9fafb;">
                      <span style="direction: ltr;">${dateStr}</span>
                    </div>
                  </div>
                `
                    : `<span style="color: #dc2626; font-weight: 500;">لم تقم بالحل</span>`
                }
              </td>
            </tr>
          `;
          })
          .join("");
      };

      // بناء جدول كامل
      const buildTable = (title, items, cumulativeAverage) => {
        return `
          <div style="margin-bottom: 35px; position: relative;">
            <h3 style="font-size: 17px; font-weight: bold; color: #1f2937; margin: 0 0 12px 0;">${title}</h3>
            <div style="border: 1px solid #e5e7eb; border-radius: 4px; overflow: hidden; background-color: #fff;">
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr>
                    <th style="border: 1px solid #e5e7eb; padding: 14px 18px; background-color: #f9fafb; text-align: right; font-weight: bold; color: #374151; font-size: 14px; width: 70%;">اسم الدرس</th>
                    <th style="border: 1px solid #e5e7eb; padding: 14px 18px; background-color: #f9fafb; text-align: center; font-weight: bold; color: #374151; font-size: 14px; width: 30%;">معدل انجاز الواجب</th>
                  </tr>
                </thead>
                <tbody>
                  ${buildTableRows(items)}
                  <tr>
                    <td style="border: 1px solid #e5e7eb; padding: 14px 18px; text-align: right; color: #1f2937; font-size: 14px; font-weight: bold;">المعدل التراكمي</td>
                    <td style="border: 1px solid #e5e7eb; padding: 14px 18px; text-align: center; color: #1d4ed8; font-size: 16px; font-weight: bold;">%${formatNumber(cumulativeAverage)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        `;
      };

      container.innerHTML = `
        <!-- Content -->
        <div style="position: relative; z-index: 10;">
          
          <h1 style="text-align: center; font-size: 24px; font-weight: bold; color: #4b5563; margin: 0 0 35px 0;">
            معدل الانجاز برقم الجوال
          </h1>

          <div style="display: flex; justify-content: center; margin-bottom: 25px; direction: ltr;">
            <div style="display: flex; border: 1px solid #d1d5db; border-radius: 6px; overflow: hidden; width: 400px; height: 44px; background-color: #ffffff;">
              <div style="display: flex; align-items: center; justify-content: center; border-right: 1px solid #d1d5db; padding: 0 16px; font-size: 14px; color: #6b7280; direction: ltr;">
                ${phoneCode}
              </div>
              <div style="flex: 1; padding: 0 16px; display: flex; align-items: center; justify-content: flex-start; font-size: 15px; font-weight: bold; color: #374151; direction: ltr;">
                ${phoneNumber}
              </div>
            </div>
          </div>

          <div style="border: 1px solid #bae6fd; background-color: #f0f9ff; color: #0369a1; text-align: center; padding: 14px 20px; margin-bottom: 30px; font-size: 17px; font-weight: bold; border-radius: 4px;">
            اسم الطالب/ة : ${studentName}
          </div>

          <div style="border: 1px solid #bbf7d0; background-color: #f0fdf4; color: #166534; text-align: center; padding: 16px 20px; margin-bottom: 40px; font-size: 20px; font-weight: bold; border-radius: 4px;">
            ${selectedCourseName}
          </div>

          ${buildTable("تدريبات على التأسيس", basicItems, message.basic_percentage)}
          ${buildTable("تدريبات البثوث المباشرة", lectureItems, message.lecture_percentage)}
          ${buildTable("الاختبارات التجريبية", fullRoundItems, message.full_round_percentage)}

          <div style="display: flex; justify-content: flex-end; padding-top: 20px;">
            <div style="display: flex; align-items: center; gap: 10px; font-size: 18px; font-weight: bold; color: #1f2937;">
              <span>المعدل التراكمي العام :</span>
              <span style="color: #1d4ed8;">%${formatNumber(message.total_percentage)}</span>
            </div>
          </div>
        </div>

        <!-- ✅ Watermark (معدلة لتكون فوق كل شيء المطلق) -->
        <div style="
          position: absolute;
          top: 0; left: 0; right: 0; height: 100%;
          z-index: 9999; /* 👈 يضمن أن تكون فوق الجداول واي محتوى */
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          opacity: 0.12; /* 👈 شفافية مناسبة للظهور فوق الكلام والجداول */
          pointer-events: none;
        ">
          <img src="/images/logo.svg" style="width: 400px; margin: 200px 0;" crossorigin="anonymous"/>
          <img src="/images/logo.svg" style="width: 400px; margin: 200px 0;" crossorigin="anonymous"/>
          <img src="/images/logo.svg" style="width: 400px; margin: 200px 0;" crossorigin="anonymous"/>
          <img src="/images/logo.svg" style="width: 400px; margin: 200px 0;" crossorigin="anonymous"/>
        </div>
      `;

      document.body.appendChild(container);

      // انتظار تحميل الصور (اللوجو) لتجنب اختفاء العلامة المائية
      const images = container.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map(
          (img) =>
            new Promise((resolve) => {
              if (img.complete) resolve();
              else {
                img.onload = resolve;
                img.onerror = resolve;
              }
            })
        )
      );

      // انتظار إضافي لمعالجة خطوط المتصفح
      await new Promise((resolve) => setTimeout(resolve, 800));

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        windowWidth: 800,
      });

      document.body.removeChild(container);

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

      pdf.save(`تقرير_معدل_الإنجاز_${selectedCourseName}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("حدث خطأ أثناء إنشاء PDF");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <ConfigProvider
      direction="rtl"
      theme={{
        token: {
          colorPrimary: "#2563eb",
          borderRadius: 14,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        },
      }}
    >
      <div dir="rtl" className="min-h-screen bg-slate-50">
        {message && (
          <div className="fixed bottom-6 left-6 z-50">
            <button
              onClick={downloadPDF}
              disabled={isGeneratingPDF}
              className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-full font-bold shadow-xl hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingPDF ? (
                <svg
                  className="animate-spin w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <FilePdfOutlined className="text-xl" />
              )}
              {isGeneratingPDF ? "جارِ الإنشاء..." : "تحميل PDF"}
            </button>
          </div>
        )}

        <div className="relative mx-auto max-w-5xl px-4 py-10 sm:py-14">
          <header className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800">
              معدل الإنجاز
            </h1>
          </header>

          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
                <div className="flex-1">
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    اختر الدورة
                  </label>
                  <Select
                    value={courseId}
                    onChange={setCourseId}
                    options={coursesOptions}
                    placeholder="اختر الدورة..."
                    size="large"
                    className="w-full"
                    suffixIcon={<DownOutlined />}
                    loading={coursesLoading}
                    disabled={!token || coursesLoading}
                  />
                </div>

                <button
                  onClick={onSubmit}
                  disabled={!courseId || compLoading}
                  className="h-[40px] rounded-xl bg-blue-600 px-8 text-sm font-bold text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
                  {compLoading ? "جارِ التحميل..." : "عرض النتائج"}
                </button>
              </div>
              {compError && (
                <div className="mt-4 rounded-xl bg-red-50 p-3 text-center text-sm font-semibold text-red-600">
                  {compError.message || String(compError)}
                </div>
              )}
            </div>
          </div>

          {message && (
            <div className="mt-8 space-y-8 animate-fadeIn">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard
                  title="تدريبات التأسيس"
                  value={message.basic_percentage}
                />
                <StatCard
                  title="تدريبات المحاضرات"
                  value={message.lecture_percentage}
                />
                <StatCard
                  title="الاختبارات"
                  value={message.full_round_percentage}
                />
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white px-6 py-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-bold text-slate-700">
                  إجمالي نسبة الإنجاز في الدورة:
                </span>
                <div className="flex items-center gap-3 w-full sm:w-1/2">
                  <PercentProgress value={message.total_percentage} />
                  <span className="font-extrabold text-slate-800">
                    {formatPercentLabel(message.total_percentage)}
                  </span>
                </div>
              </div>

              <Divider className="border-slate-200">تفاصيل المحتوى</Divider>

              <ContentSection
                title="تدريبات التأسيس"
                icon={<BookOutlined className="text-blue-500" />}
                items={basicItems}
                emptyText="لا توجد أساسيات في هذه الدورة"
              />
              <ContentSection
                title="تدريبات المحاضرات"
                icon={<VideoCameraOutlined className="text-purple-500" />}
                items={lectureItems}
                emptyText="لا توجد محاضرات في هذه الدورة"
              />
              <ContentSection
                title="الاختبارات"
                icon={<TrophyOutlined className="text-yellow-500" />}
                items={fullRoundItems}
                emptyText="لا توجد اختبارات شاملة"
              />
            </div>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
}

function ContentSection({ title, icon, items, emptyText }) {
  const hasItems = items && items.length > 0;
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-lg">
          {icon}
        </div>
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
        <span className="mr-auto text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
          {items?.length || 0} عنصر
        </span>
      </div>
      {hasItems ? (
        <div className="grid grid-cols-1 gap-3">
          {items.map((it, idx) => (
            <ExamItemRow key={`${it.exam_id}-${idx}`} item={it} />
          ))}
        </div>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={emptyText}
          className="my-6"
        />
      )}
    </div>
  );
}

function ExamItemRow({ item }) {
  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 transition hover:bg-white hover:shadow-md hover:border-blue-200">
      <div className="text-right">
        <div className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors text-base">
          {item.exam_name}
        </div>
        <div className="mt-2 flex items-center gap-3 text-xs">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-bold ${
              item.solved
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {item.solved ? "تم الحل" : "لم يتم الحل"}
          </span>
        </div>
      </div>
      <div className="w-full sm:w-[180px] text-left">
        <div className="mb-1 flex items-center justify-between sm:justify-end gap-3">
          <span className="text-xs text-slate-400">أعلى درجة</span>
          <span className="font-extrabold text-slate-900 text-lg">
            {formatPercentLabel(item.highest_score)}
          </span>
        </div>
        <PercentProgress value={item.highest_score} />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between">
      <div>
        <div className="text-sm font-bold text-slate-500">{title}</div>
        <div className="mt-2 text-3xl font-extrabold text-slate-900">
          {formatPercentLabel(value)}
        </div>
      </div>
      <div className="mt-4">
        <PercentProgress value={value} />
      </div>
    </div>
  );
}

function PercentProgress({ value }) {
  const p = parsePercent(value);
  if (p == null)
    return <div className="h-2 w-full bg-slate-100 rounded-full" />;
  let color = "#3b82f6";
  if (p >= 90) color = "#10b981";
  else if (p < 50) color = "#ef4444";
  return (
    <Progress
      percent={p}
      showInfo={false}
      strokeColor={color}
      strokeLinecap="round"
      trailColor="#f1f5f9"
      size="small"
      style={{ margin: 0 }}
    />
  );
}

function parsePercent(value) {
  if (value == null) return null;
  if (typeof value === "string") {
    const num = Number(value.trim().replace("%", ""));
    return Number.isFinite(num) ? clamp(Math.round(num), 0, 100) : null;
  }
  if (typeof value === "number") {
    return Number.isFinite(value) ? clamp(Math.round(value), 0, 100) : null;
  }
  return null;
}

function formatPercentLabel(value) {
  return value == null ? "0%" : `${value}`;
}

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function formatNumber(value) {
  if (value == null) return "0";
  const cleanVal = typeof value === "string" ? value.replace("%", "") : value;
  const num = Number(cleanVal);
  if (isNaN(num)) return "0";
  return num % 1 === 0 ? String(num) : num.toFixed(1);
}
