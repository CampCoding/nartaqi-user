"use client";

import React, { useState } from "react";
import { Select, Dropdown, message } from "antd";
import { MyDatePicker } from "../ui/MyDatePicker";

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

const StudyPlannerForm = () => {
  const [isGenerating, setIsGenerating] = useState(false);
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

  const daysMap = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const arabicDaysMap = [
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const generateScheduleData = () => {
    const start = new Date(formData.studyStartDate);
    const end = new Date(formData.examDate);
    const startP = parseInt(formData.startPage);
    const endP = parseInt(formData.endPage);

    let currentDate = new Date(start);
    let totalStudyDays = 0;

    // حساب عدد أيام الدراسة الفعلية
    while (currentDate <= end) {
      const dayStr = daysMap[currentDate.getDay()];
      if (!formData.restDays.includes(dayStr)) {
        totalStudyDays++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (totalStudyDays === 0)
      throw new Error("كل الأيام بين التاريخين هي أيام راحة!");

    const totalPages = endP - startP + 1;
    const pagesPerDay = Math.floor(totalPages / totalStudyDays);
    let extraPages = totalPages % totalStudyDays;

    let schedule = [];
    currentDate = new Date(start);
    let currentStartPage = startP;
    let index = 1;

    while (currentDate <= end) {
      const dayStr = daysMap[currentDate.getDay()];
      const arDayName = arabicDaysMap[currentDate.getDay()];
      const isRest = formData.restDays.includes(dayStr);

      const dateStr = `${currentDate.getFullYear()}/${(currentDate.getMonth() + 1).toString().padStart(2, "0")}/${currentDate.getDate().toString().padStart(2, "0")}`;

      if (isRest) {
        schedule.push({
          index,
          dayName: arDayName,
          date: dateStr,
          isRestDay: true,
        });
      } else {
        let dailyPages = pagesPerDay + (extraPages > 0 ? 1 : 0);
        if (extraPages > 0) extraPages--;

        let dailyEndPage = currentStartPage + dailyPages - 1;
        schedule.push({
          index,
          dayName: arDayName,
          date: dateStr,
          isRestDay: false,
          startPage: currentStartPage,
          endPage: dailyEndPage,
        });
        currentStartPage = dailyEndPage + 1;
      }

      index++;
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return schedule;
  };

  const handleGeneratePDF = async () => {
    if (
      !formData.firstName ||
      !formData.examTitle ||
      !formData.startPage ||
      !formData.endPage ||
      !formData.studyStartDate ||
      !formData.examDate
    ) {
      message.error("يرجى تعبئة جميع الحقول المطلوبة واختيار التواريخ");
      return;
    }
    if (parseInt(formData.startPage) > parseInt(formData.endPage)) {
      message.error(
        "رقم صفحة البدء يجب أن يكون أصغر من أو يساوي رقم الصفحة الأخيرة"
      );
      return;
    }
    if (formData.studyStartDate > formData.examDate) {
      message.error("تاريخ البدء يجب أن يكون قبل تاريخ الامتحان");
      return;
    }

    setIsGenerating(true);

    try {
      const schedule = generateScheduleData();

      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).default;

      const container = document.createElement("div");
      container.style.cssText = `
        position: absolute;
        top: -9999px;
        right: 0;
        width: 800px;
        background-color: #ffffff;
        padding: 40px 50px;
        font-family: 'Arial', 'Tahoma', sans-serif;
        direction: rtl;
        text-align: right;
        color: #1f2937;
      `;

      // بناء صفوف الجدول
      const tableRows = schedule
        .map((day) => {
          if (day.isRestDay) {
            return `
            <tr style="background-color: #eff6ff;">
              <td style="border: 2px solid #3b82f6; padding: 12px; text-align: center; font-weight: bold; color: #1e3a8a;">${day.index}</td>
              <td style="border: 2px solid #3b82f6; padding: 12px; text-align: center; font-weight: bold; color: #1d4ed8;">${day.dayName} ${day.date}</td>
              <!-- تم إزالة letter-spacing واستخدام المد (التطويل) لضمان عدم تقطع الكلمة -->
              <td colspan="3" style="border: 2px solid #3b82f6; padding: 12px; text-align: center; font-weight: bold; font-size: 22px; color: #2563eb;">
                ( راحـــــــــــــــــــــــــــــــــة )
              </td>
            </tr>
          `;
          } else {
            return `
            <tr>
              <td style="border: 2px solid #1f2937; padding: 15px 12px; text-align: center; font-weight: bold; font-size: 16px;">${day.index}</td>
              <td style="border: 2px solid #1f2937; padding: 15px 12px; text-align: center; font-weight: bold; font-size: 16px;">${day.dayName} <br/> <span style="font-size:13px; font-weight:normal; color:#4b5563;">${day.date}</span></td>
              <td style="border: 2px solid #1f2937; padding: 15px 12px; text-align: center; font-weight: bold; font-size: 16px;">من صـ ${day.startPage} إلى صـ ${day.endPage}</td>
              <td style="border: 2px solid #1f2937; padding: 15px 12px; text-align: center;"></td>
              <td style="border: 2px solid #1f2937; padding: 15px 12px; text-align: center;"></td>
            </tr>
          `;
          }
        })
        .join("");

      container.innerHTML = `
        <div style="border: 3px solid #1f2937; padding: 30px; border-radius: 10px; background-color: #fafafa; position: relative; z-index: 10;">
          
          <!-- Header -->
          <h1 style="text-align: center; font-size: 32px; font-weight: 900; color: #1e3a8a; margin-top: 0; margin-bottom: 40px;">
            نـرتـقـي نـحـو الـتـفـوق
          </h1>

          <!-- User Info -->
          <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 40px; font-size: 18px; font-weight: bold;">
            <div style="display: flex; border-bottom: 1px dashed #cbd5e1; padding-bottom: 5px; width: 60%;">
              <span style="width: 120px; color: #4b5563;">الاسـم:</span>
              <span style="color: #111827;">${formData.firstName}</span>
            </div>
            <div style="display: flex; border-bottom: 1px dashed #cbd5e1; padding-bottom: 5px; width: 60%;">
              <span style="width: 120px; color: #4b5563;">رقم الجوال:</span>
              <span style="color: #111827; direction: ltr; text-align: right;">${formData.whatsappNumber || "---"}</span>
            </div>
            <div style="display: flex; border-bottom: 1px dashed #cbd5e1; padding-bottom: 5px; width: 60%;">
              <span style="width: 120px; color: #4b5563;">المادة/الامتحان:</span>
              <span style="color: #111827;">${formData.examTitle}</span>
            </div>
          </div>

          <!-- Subtitle -->
          <h2 style="text-align: center; font-size: 20px; font-weight: bold; color: #0f172a; margin-bottom: 30px;">
            " اطـبـع الـجـدول وضـعـه أمـامـك وحـدد مـا تـم ومـا لـم يـتـم "
          </h2>

          <!-- Table -->
          <table style="width: 100%; border-collapse: collapse; background-color: #ffffff; position: relative; z-index: 20;">
            <thead>
              <tr style="background-color: #f1f5f9;">
                <th style="border: 2px solid #1f2937; padding: 15px; width: 5%; font-size: 18px;">م</th>
                <th style="border: 2px solid #1f2937; padding: 15px; width: 30%; font-size: 18px;">اليوم / التاريخ</th>
                <th style="border: 2px solid #1f2937; padding: 15px; width: 35%; font-size: 18px;">الصفحات</th>
                <th style="border: 2px solid #1f2937; padding: 15px; width: 15%; font-size: 18px;">تـم</th>
                <th style="border: 2px solid #1f2937; padding: 15px; width: 15%; font-size: 18px;">لم يتم</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>

          <!-- Footer Moto -->
          <div style="margin-top: 50px; text-align: center; font-size: 22px; font-weight: 900; color: #1e3a8a; line-height: 1.8;">
            انطلق الآن ! جدولك من نرتقي جاهز ...<br/>
            <span style="color: #d97706; font-size: 24px;">التزامك اليوم هو تفوقك غداً</span>
          </div>

        </div>

        <!-- Watermark -->
        <div style="
          position: absolute;
          top: 0; left: 0; right: 0; height: 100%;
          z-index: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          opacity: 0.12;
          pointer-events: none;
        ">
          <img src="/images/logo.svg" style="width: 400px; margin: 200px 0;" crossorigin="anonymous"/>
          <img src="/images/logo.svg" style="width: 400px; margin: 200px 0;" crossorigin="anonymous"/>
          <img src="/images/logo.svg" style="width: 400px; margin: 200px 0;" crossorigin="anonymous"/>
          <img src="/images/logo.svg" style="width: 400px; margin: 200px 0;" crossorigin="anonymous"/>
        </div>
      `;

      document.body.appendChild(container);

      // انتظار تحميل صور العلامة المائية (الواتر مارك) قبل التقاط الشاشة
      const images = container.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map(
          (img) =>
            new Promise((resolve) => {
              if (img.complete) resolve();
              else {
                img.onload = resolve;
                img.onerror = resolve; // تجنب توقف الكود في حال فشل تحميل الصورة
              }
            })
        )
      );

      // إعطاء مهلة إضافية بسيطة للخطوط كي تُرسم بشكل صحيح
      await new Promise((resolve) => setTimeout(resolve, 800));

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
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

      pdf.save(`جدول_مذاكرة_${formData.firstName.replace(/\s+/g, "_")}.pdf`);
      message.success("تم إنشاء وتحميل الجدول بنجاح!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      message.error(error.message || "حدث خطأ أثناء إنشاء PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="inline-flex w-full flex-1 flex-col items-start gap-6 pt-0 pb-12 px-0 relative bg-white rounded-3xl md:rounded-[50px] border-[3px] border-solid">
      <header className="flex flex-col w-full min-h-20 items-start p-6 relative">
        <div className="h-8 justify-start flex items-center relative w-full">
          <h1 className="relative self-stretch w-fit font-bold text-orange-500 text-xl md:text-2xl tracking-[-0.60px] leading-8 whitespace-nowrap">
            نموذج مخطط الدراسة
          </h1>
        </div>
      </header>

      <main className="inline-flex flex-col items-start w-full gap-6 px-4 sm:px-6 py-0 relative flex-[0_0_auto]">
        <form className="inline-flex flex-col items-start w-full gap-6 relative flex-[0_0_auto]">
          <div className="flex flex-col items-start gap-2.5 px-0 py-[3px] relative self-stretch w-full">
            <label className="text-zinc-950 font-[600] text-sm">
              الاسم الأول
            </label>
            <div className="flex items-start justify-start h-[56px] relative self-stretch w-full bg-white rounded-[15px] border border-solid border-zinc-200">
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="أدخل اسمك الأول"
                className="absolute w-full h-full text-slate-700 px-5 text-sm bg-transparent border-none outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-2.5 px-0 py-[3px] relative self-stretch w-full">
            <label className="text-zinc-950 font-[600] text-sm">
              رقم الواتساب (اختياري)
            </label>
            <div className="flex items-start justify-start h-[56px] relative self-stretch w-full bg-white rounded-[15px] border border-solid border-zinc-200">
              <input
                type="number"
                dir="ltr"
                value={formData.whatsappNumber}
                onChange={(e) =>
                  handleInputChange("whatsappNumber", e.target.value)
                }
                placeholder="+966 123 456 789"
                className="absolute w-full h-full text-end text-slate-700 px-5 text-sm bg-transparent border-none outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-2.5 px-0 py-[3px] relative self-stretch w-full">
            <label className="text-zinc-950 font-[600] text-sm">
              الموضوع/عنوان الامتحان
            </label>
            <div className="flex items-start justify-start h-[56px] relative self-stretch w-full bg-white rounded-[15px] border border-solid border-zinc-200">
              <input
                type="text"
                value={formData.examTitle}
                onChange={(e) => handleInputChange("examTitle", e.target.value)}
                placeholder="أدخل عنوان الموضوع أو الامتحان"
                className="absolute w-full h-full text-slate-700 px-5 text-sm bg-transparent border-none outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative self-stretch w-full">
            <div className="flex flex-col w-full items-start gap-2.5 px-0 py-[3px]">
              <label className="text-zinc-950 font-[600] text-sm">
                رقم صفحة البدء
              </label>
              <div className="flex w-full items-start justify-start h-[56px] relative bg-white rounded-[15px] border border-solid border-zinc-200">
                <input
                  type="number"
                  value={formData.startPage}
                  onChange={(e) =>
                    handleInputChange("startPage", e.target.value)
                  }
                  placeholder="1"
                  className="absolute w-full h-full text-slate-700 px-5 text-sm bg-transparent border-none outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col w-full items-start gap-2.5 px-0 py-[3px]">
              <label className="text-zinc-950 font-[600] text-sm">
                رقم الصفحة الأخيرة
              </label>
              <div className="flex w-full items-start justify-start h-[56px] relative bg-white rounded-[15px] border border-solid border-zinc-200">
                <input
                  type="number"
                  value={formData.endPage}
                  onChange={(e) => handleInputChange("endPage", e.target.value)}
                  placeholder="50"
                  className="absolute w-full h-full text-slate-700 px-5 text-sm bg-transparent border-none outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative self-stretch w-full">
            <div className="flex flex-col w-full items-start gap-2.5">
              <label className="text-zinc-950 font-[600] text-sm">
                تاريخ بداية المذاكرة
              </label>
              <Dropdown
                dropdownRender={() => (
                  <div className="bg-white rounded-lg shadow-lg border border-gray-200">
                    <MyDatePicker
                      selected={formData.studyStartDate}
                      onSelect={(date) =>
                        handleInputChange("studyStartDate", date)
                      }
                    />
                  </div>
                )}
                trigger={["click"]}
                placement="bottomRight"
              >
                <div className="flex px-5 items-center justify-between h-[56px] relative self-stretch w-full bg-white rounded-[15px] border border-solid border-zinc-200 cursor-pointer hover:border-orange-300 transition-colors">
                  <input
                    type="text"
                    value={
                      formData.studyStartDate
                        ? formData.studyStartDate.toLocaleDateString("en-GB")
                        : ""
                    }
                    placeholder="اختر تاريخ البدء"
                    readOnly
                    className="flex-1 bg-transparent border-none outline-none text-slate-700 text-sm cursor-pointer pointer-events-none"
                  />
                  <CalenderIcon className="w-5 h-5" />
                </div>
              </Dropdown>
            </div>

            <div className="flex flex-col w-full items-start gap-2.5">
              <label className="text-zinc-950 font-[600] text-sm">
                تاريخ نهاية المذاكرة
              </label>
              <Dropdown
                dropdownRender={() => (
                  <div className="bg-white rounded-lg shadow-lg border border-gray-200">
                    <MyDatePicker
                      selected={formData.examDate}
                      onSelect={(date) => handleInputChange("examDate", date)}
                    />
                  </div>
                )}
                trigger={["click"]}
                placement="bottomRight"
              >
                <div className="flex px-5 items-center justify-between h-[56px] relative self-stretch w-full bg-white rounded-[15px] border border-solid border-zinc-200 cursor-pointer hover:border-orange-300 transition-colors">
                  <input
                    type="text"
                    value={
                      formData.examDate
                        ? formData.examDate.toLocaleDateString("en-GB")
                        : ""
                    }
                    placeholder="اختر تاريخ الانتهاء"
                    readOnly
                    className="flex-1 bg-transparent border-none outline-none text-slate-700 text-sm cursor-pointer pointer-events-none"
                  />
                  <CalenderIcon className="w-5 h-5" />
                </div>
              </Dropdown>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full">
            <label className="text-zinc-950 font-[600] text-sm">
              أيام الراحة
            </label>
            <div className="flex items-center justify-start min-h-[56px] px-2 relative self-stretch w-full bg-white rounded-[15px] border border-solid border-zinc-200">
              <Select
                mode="multiple"
                allowClear
                placeholder="أدخل أيام الراحة الخاصة بك"
                value={formData.restDays}
                onChange={(values) => handleInputChange("restDays", values)}
                options={restDayOptions}
                bordered={false}
                className="w-full text-sm"
                dropdownStyle={{ maxHeight: 256, overflowY: "auto" }}
              />
            </div>
          </div>
        </form>

        <button
          onClick={handleGeneratePDF}
          disabled={isGenerating}
          className="flex w-full items-center justify-center gap-2 px-8 py-4 mt-4 relative bg-primary rounded-[20px] cursor-pointer hover:bg-primary-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg"
          type="button"
        >
          {isGenerating ? (
            <>
              <svg
                className="animate-spin w-5 h-5 text-white"
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>جاري التجهيز...</span>
            </>
          ) : (
            <span>إنشاء جدول الدراسة (PDF)</span>
          )}
        </button>

        <footer className="flex flex-col items-center justify-center gap-2 mt-2 w-full">
          <p className="text-slate-500 text-sm">
            أدخل البيانات واطبع الجدول لتضعه أمامك وتراقب إنجازك.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default StudyPlannerForm;
