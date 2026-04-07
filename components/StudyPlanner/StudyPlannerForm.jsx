"use client";

import React, { useState, useCallback, memo } from "react";
import { Select, Dropdown, Menu, message } from "antd";
import { MyDatePicker } from "../ui/MyDatePicker";
import { useSelector } from "react-redux";
import { SaudiIcon, EgyptianIcon } from "../../public/svgs";
import { handlePhoneCode } from "../utils/helpers/phoneCode";
import toast from "react-hot-toast";
import axios from "axios";
// import { handlePhoneCode } from "../../../components/utils/helpers/phoneCode";

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

const WhatsAppIcon = (props) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const DownloadIcon = (props) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const StudyPlannerForm = () => {
  // Get user from Redux store
  const { user } = useSelector((state) => state.auth);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isSendingWhatsApp, setIsSendingWhatsApp] = useState(false);

  // Country selection state for phone input
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+966",
    name: "Saudi Arabia",
    icon: SaudiIcon,
  });

  const [formData, setFormData] = useState({
    firstName: "",
    whatsappNumber: "",
    examTitle: "",
    startPage: "",
    endPage: "",
    studyStartDate: null,
    examDate: null,
    restDays: [],
    student_id: user?.id || null,
    file: null,
  });

  const countries = [
    {
      code: "+966",
      name: "Saudi Arabia",
      icon: SaudiIcon,
    },
    {
      code: "+20",
      name: "Egypt",
      icon: EgyptianIcon,
    },
  ];

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

  const handleCountrySelect = useCallback(({ key }) => {
    const country = countries.find((c) => c.code === key);
    if (country) {
      setSelectedCountry(country);
    }
  }, []);

  const handlePhoneInput = useCallback((e) => {
    const onlyNums = e.target.value.replace(/\D/g, "");
    handleInputChange("whatsappNumber", onlyNums);
  }, []);

  const countryMenu = (
    <Menu onClick={handleCountrySelect} className="min-w-[200px]">
      {countries.map((country) => (
        <Menu.Item key={country.code}>
          <div className="!flex gap-3 px-4 py-3">
            <div className="w-5 h-5">
              <country.icon />
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm text-gray-900">
                {country.name}
              </div>
              <div className="text-xs text-gray-500">{country.code}</div>
            </div>
            {selectedCountry?.code === country?.code && (
              <svg
                className="w-4 h-4 text-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  const generateScheduleData = () => {
    const start = new Date(formData.studyStartDate);
    const end = new Date(formData.examDate);
    const startP = parseInt(formData.startPage);
    const endP = parseInt(formData.endPage);

    let currentDate = new Date(start);
    let totalStudyDays = 0;

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

  const validateForm = () => {
    if (
      !formData.firstName ||
      !formData.examTitle ||
      !formData.startPage ||
      !formData.endPage ||
      !formData.studyStartDate ||
      !formData.examDate
    ) {
      toast.error("يرجى تعبئة جميع الحقول المطلوبة واختيار التواريخ");
      return false;
    }
    if (parseInt(formData.startPage) > parseInt(formData.endPage)) {
      toast.error(
        "رقم صفحة البدء يجب أن يكون أصغر من أو يساوي رقم الصفحة الأخيرة"
      );
      return false;
    }
    if (formData.studyStartDate > formData.examDate) {
      toast.error("تاريخ البدء يجب أن يكون قبل تاريخ الامتحان");
      return false;
    }
    return true;
  };

  const generatePDFBlob = async (schedule) => {
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

    // Get formatted phone number
    const formattedPhone = formData.whatsappNumber
      ? handlePhoneCode({
          phone: formData.whatsappNumber,
          selectedCountryCode: selectedCountry.code,
        })
      : "---";

    const tableRows = schedule
      .map((day) => {
        if (day.isRestDay) {
          return `
          <tr style="background-color: #eff6ff;">
            <td style="border: 2px solid #3b82f6; padding: 12px; text-align: center; font-weight: bold; color: #1e3a8a;">${day.index}</td>
            <td style="border: 2px solid #3b82f6; padding: 12px; text-align: center; font-weight: bold; color: #1d4ed8;">${day.dayName} ${day.date}</td>
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
        
        <h1 style="text-align: center; font-size: 32px; font-weight: 900; color: #1e3a8a; margin-top: 0; margin-bottom: 40px;">
          نـرتـقـي نـحـو الـتـفـوق
        </h1>

        <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 40px; font-size: 18px; font-weight: bold;">
          <div style="display: flex; border-bottom: 1px dashed #cbd5e1; padding-bottom: 5px; width: 60%;">
            <span style="width: 120px; color: #4b5563;">الاسـم:</span>
            <span style="color: #111827;">${formData.firstName}</span>
          </div>
          <div style="display: flex; border-bottom: 1px dashed #cbd5e1; padding-bottom: 5px; width: 60%;">
            <span style="width: 120px; color: #4b5563;">رقم الجوال:</span>
            <span style="color: #111827; direction: ltr; text-align: right;">+${formattedPhone}</span>
          </div>
          <div style="display: flex; border-bottom: 1px dashed #cbd5e1; padding-bottom: 5px; width: 60%;">
            <span style="width: 120px; color: #4b5563;">المادة/الامتحان:</span>
            <span style="color: #111827;">${formData.examTitle}</span>
          </div>
        </div>

        <h2 style="text-align: center; font-size: 20px; font-weight: bold; color: #0f172a; margin-bottom: 30px;">
          " اطـبـع الـجـدول وضـعـه أمـامـك وحـدد مـا تـم ومـا لـم يـتـم "
        </h2>

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

        <div style="margin-top: 50px; text-align: center; font-size: 22px; font-weight: 900; color: #1e3a8a; line-height: 1.8;">
          انطلق الآن ! جدولك من نرتقي جاهز ...<br/>
          <span style="color: #d97706; font-size: 24px;">التزامك اليوم هو تفوقك غداً</span>
        </div>

      </div>

      <div style="
        position: absolute;
        top: 0; left: 0; right: 0; height: 100%;
        z-index: 100;
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

    return pdf;
  };

  // Download PDF locally
  const handleDownloadPDF = async () => {
    if (!validateForm()) return;

    setIsGenerating(true);

    try {
      const schedule = generateScheduleData();
      const pdf = await generatePDFBlob(schedule);

      pdf.save(`جدول_مذاكرة_${formData.firstName.replace(/\s+/g, "_")}.pdf`);
      toast.success("تم تحميل الجدول بنجاح!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error(error.message || "حدث خطأ أثناء إنشاء PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  // Send PDF via WhatsApp API
  const handleSendWhatsApp = async () => {
    if (!validateForm()) return;

    if (!formData.whatsappNumber) {
      toast.error("يرجى إدخال رقم الواتساب لإرسال الجدول");
      return;
    }

    setIsSendingWhatsApp(true);

    try {
      const schedule = generateScheduleData();
      const pdf = await generatePDFBlob(schedule);

      // Convert PDF to Blob
      const pdfBlob = pdf.output("blob");
      const pdfFile = new File(
        [pdfBlob],
        `جدول_مذاكرة_${formData.firstName.replace(/\s+/g, "_")}.pdf`,
        { type: "application/pdf" }
      );

      // Get formatted phone number
      const formattedPhone = handlePhoneCode({
        phone: formData.whatsappNumber,
        selectedCountryCode: selectedCountry.code,
      });

      // Create FormData for API request
      const apiFormData = new FormData();
      apiFormData.append("file", pdfFile);
      apiFormData.append("whatsapp_number", formattedPhone);

      // Add student_id if user is logged in
      if (user?.id) {
        apiFormData.append("student_id", user.id);
      }

      // Send to API
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/categories/uploadFile`,
        apiFormData
      );

      if (!response.status) {
        throw new Error("فشل في إرسال الجدول عبر الواتساب");
      }

      toast.success("تم إرسال الجدول عبر الواتساب بنجاح!");
    } catch (error) {
      console.error("Error sending WhatsApp:", error);
      toast.error(error.message || "حدث خطأ أثناء إرسال الجدول");
    } finally {
      setIsSendingWhatsApp(false);
    }
  };

  const isLoading = isGenerating || isSendingWhatsApp;

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
          {/* First Name */}
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
                disabled={isLoading}
                className="absolute w-full h-full text-slate-700 px-5 text-sm bg-transparent border-none outline-none disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* WhatsApp Number - Same design as login */}
          <div className="flex flex-col items-start gap-2.5 px-0 py-[3px] relative self-stretch w-full">
            <div className="justify-between flex items-center relative self-stretch w-full">
              <div className="flex items-center gap-2">
                <span className="font-[600] text-zinc-950 text-sm">
                  رقم الواتساب
                </span>
                <span className="font-medium text-gray-400 text-sm">
                  (بدون صفر)
                </span>
              </div>
              <span className="text-xs text-gray-400">(اختياري)</span>
            </div>
            <div
              className={`h-[56px] justify-between overflow-hidden bg-white rounded-[15px] border border-solid flex items-center relative w-full transition-colors border-zinc-200 focus-within:border-orange-400 ${
                isLoading ? "opacity-60" : ""
              }`}
            >
              <input
                type="text"
                inputMode="numeric"
                dir="ltr"
                value={formData.whatsappNumber}
                onChange={handlePhoneInput}
                placeholder="مثال (50xxxxxxx)"
                disabled={isLoading}
                className="justify-center w-full px-5 h-full font-normal text-slate-700 placeholder-gray-300 text-sm text-right tracking-[0] leading-[normal] flex items-center relative focus:outline-none disabled:cursor-not-allowed"
              />
              <Dropdown
                overlay={countryMenu}
                trigger={["click"]}
                placement="bottomRight"
                disabled={isLoading}
              >
                <div className="inline-flex items-center gap-2 px-4 relative flex-[0_0_auto] border-r border-solid border-zinc-200 cursor-pointer hover:bg-gray-50 rounded-tl-lg rounded-bl-lg transition-colors h-full">
                  <div className="relative flex items-center justify-center w-fit font-semibold text-slate-700 text-sm text-right">
                    {selectedCountry?.code}
                  </div>
                  <div className="w-5 h-5">
                    {selectedCountry?.icon && <selectedCountry.icon />}
                  </div>
                  <svg
                    className="w-3 h-3 transition-transform text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </Dropdown>
            </div>
          </div>

          {/* Exam Title */}
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
                disabled={isLoading}
                className="absolute w-full h-full text-slate-700 px-5 text-sm bg-transparent border-none outline-none disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Page Range */}
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
                  disabled={isLoading}
                  className="absolute w-full h-full text-slate-700 px-5 text-sm bg-transparent border-none outline-none disabled:opacity-60 disabled:cursor-not-allowed"
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
                  disabled={isLoading}
                  className="absolute w-full h-full text-slate-700 px-5 text-sm bg-transparent border-none outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Date Range */}
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
                disabled={isLoading}
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
                disabled={isLoading}
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

          {/* Rest Days */}
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
                disabled={isLoading}
                className="w-full text-sm"
                dropdownStyle={{ maxHeight: 256, overflowY: "auto" }}
              />
            </div>
          </div>
        </form>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full mt-4">
          {/* Download PDF Button */}
          <button
            onClick={handleDownloadPDF}
            disabled={isLoading}
            className="flex flex-1 items-center justify-center gap-2 px-6 py-4 bg-primary rounded-[20px] cursor-pointer hover:bg-primary-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-base"
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
                <span>جاري التحميل...</span>
              </>
            ) : (
              <>
                <DownloadIcon className="w-5 h-5" />
                <span>تحميل PDF</span>
              </>
            )}
          </button>

          {/* Send WhatsApp Button */}
          <button
            onClick={handleSendWhatsApp}
            disabled={isLoading}
            className="flex flex-1 items-center justify-center gap-2 px-6 py-4 bg-green-500 rounded-[20px] cursor-pointer hover:bg-green-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-base"
            type="button"
          >
            {isSendingWhatsApp ? (
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
                <span>جاري الإرسال...</span>
              </>
            ) : (
              <>
                <WhatsAppIcon className="w-5 h-5" />
                <span>إرسال عبر واتساب</span>
              </>
            )}
          </button>
        </div>

        <footer className="flex flex-col items-center justify-center gap-2 mt-2 w-full">
          <p className="text-slate-500 text-sm text-center">
            أدخل البيانات واطبع الجدول لتضعه أمامك وتراقب إنجازك.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default StudyPlannerForm;
