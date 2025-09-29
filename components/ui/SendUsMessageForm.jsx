"use client"



import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
// import h111 from "./h-111.svg";

export const SendUsMessageForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    messageType: "",
    course: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const messageTypes = [
    "استفسار عام",
    "مشكلة تقنية",
    "طلب دعم",
    "شكوى",
    "اقتراح",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-[800px] mx-auto items-start gap-6 px-6 py-12 relative bg-white rounded-[30px] border-[3px] border-solid border-zinc-200"
    >
      <header className="flex-col items-center justify-center gap-2 flex relative self-stretch w-full flex-[0_0_auto]">
        <h1 className="flex self-stretch mt-[-1.00px] font-bold text-secondary text-2xl text-center tracking-[-0.60px] leading-6 relative items-center justify-center [direction:rtl]">
          أرسل لنا رسالة
        </h1>
        <p className="flex self-stretch  text-text-alt text-sm text-center leading-5 relative items-center justify-center [direction:rtl]">
          املأ النموذج أدناه وسنعود إليك قريبا.
        </p>
      </header>

      <div className="flex-col items-start justify-center gap-6 flex relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex-col items-start gap-2.5 flex relative self-stretch w-full flex-[0_0_auto]">
          <label
            htmlFor="fullName"
            className=" font-[600] relative [display:-webkit-box] items-center justify-center self-stretch h-[18px] mt-[-1.00px]  text-text text-base leading-[14px] overflow-hidden text-ellipsis [-webkit-line-clamp:1] [-webkit-box-orient:vertical] [direction:rtl]"
          >
            الاسم الكامل
          </label>
          <div className="justify-end gap-2.5 flex items-center  relative self-stretch w-full flex-[0_0_auto] bg-white rounded-[15px] border border-solid border-zinc-200">
            <input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              placeholder="أدخل اسمك الكامل"
              className="w-full  px-4 py-5 text-text text-sm leading-5 [direction:rtl] placeholder:text-text-alt"
              required
            />
          </div>
        </div>

        <div className="flex-col items-start gap-2.5 flex relative self-stretch w-full flex-[0_0_auto]">
          <label
            htmlFor="phoneNumber"
            className=" font-[600] relative [display:-webkit-box] items-center justify-center self-stretch h-[18px] mt-[-1.00px]  text-text text-base leading-[14px] overflow-hidden text-ellipsis [-webkit-line-clamp:1] [-webkit-box-orient:vertical] [direction:rtl]"
          >
            رقم الجوال
          </label>
          <div className="items-start justify-end gap-2.5  bg-white rounded-[15px] border border-solid border-zinc-200 flex relative self-stretch w-full flex-[0_0_auto]">
            <input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              placeholder="أدخل رقم هاتفك"
              className="w-full  px-4 py-5 text-text text-sm leading-5 [direction:rtl] placeholder:text-text-alt"
              required
            />
          </div>
        </div>

        <div className="flex-col items-start gap-2.5 flex relative self-stretch w-full flex-[0_0_auto]">
          <label
            htmlFor="messageType"
            className=" font-[600] relative [display:-webkit-box] items-center justify-center self-stretch h-[18px] mt-[-1.00px]  text-text text-base leading-[14px] overflow-hidden text-ellipsis [-webkit-line-clamp:1] [-webkit-box-orient:vertical] [direction:rtl]"
          >
            نوع الرسالة
          </label>
          <div className="relative self-stretch w-full">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="justify-between px-4 py-5 flex items-center  relative self-stretch w-full flex-[0_0_auto] bg-white rounded-[15px] border border-solid border-zinc-200"
            >
              <div className="flex w-fit mt-[-1.00px]  text-text-alt text-sm text-left leading-5 whitespace-nowrap relative items-center justify-center [direction:rtl]">
                {formData.messageType || "حدد نوع الرسالة"}
              </div>
              <ChevronDown className="text-text-alt" />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full  left-0 right-0 z-10 bg-white border border-solid border-zinc-200 rounded-[15px] mt-1 shadow-lg">
                {messageTypes.map((type, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      handleInputChange("messageType", type);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-3 text-right  px-4 py-5 text-text text-sm leading-5 [direction:rtl] hover:bg-zinc-50 first:rounded-t-[15px] last:rounded-b-[15px]"
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex-col items-start gap-2.5 flex relative self-stretch w-full flex-[0_0_auto]">
          <label
            htmlFor="course"
            className=" font-[600] relative [display:-webkit-box] items-center justify-center self-stretch h-[18px] mt-[-1.00px]  text-text text-base leading-[14px] overflow-hidden text-ellipsis [-webkit-line-clamp:1] [-webkit-box-orient:vertical] [direction:rtl]"
          >
            الدورة المشترك بها
          </label>
          <div className="items-start justify-end gap-2.5  bg-white rounded-[15px] border border-solid border-zinc-200 flex relative self-stretch w-full flex-[0_0_auto]">
            <textarea
              id="course"
              value={formData.course}
              onChange={(e) => handleInputChange("course", e.target.value)}
              placeholder="اكتب الدورة التي تواجهة بها مشكلة"
              rows="3"
              className="w-full resize-none  px-4 py-5 text-text text-sm leading-5 [direction:rtl] placeholder:text-text-alt"
              required
            />
          </div>
        </div>
      </div>

      <footer className="flex-col items-center gap-6 flex relative self-stretch w-full flex-[0_0_auto]">
        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-16 py-6 relative self-stretch w-full flex-[0_0_auto] bg-secondary rounded-[20px] hover:bg-secondary-dark transition-colors duration-200"
        >
          <span className="[display:-webkit-box] w-fit  font-bold text-neutral-50 text-base text-center leading-8 whitespace-nowrap overflow-hidden text-ellipsis [-webkit-line-clamp:1] [-webkit-box-orient:vertical] relative items-center justify-center [direction:rtl]">
            إرسال الرسالة
          </span>
        </button>
        <p className="[display:-webkit-box] self-stretch  text-text-alt text-sm text-center leading-5 overflow-hidden text-ellipsis [-webkit-line-clamp:1] [-webkit-box-orient:vertical] relative items-center justify-center [direction:rtl]">
          جميع الحقول مطلوبة. سيتم استلام الرسائل في لوحة معلومات المشرف.
        </p>
      </footer>
    </form>
  );
};