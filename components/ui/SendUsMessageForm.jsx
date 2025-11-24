"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export const SendUsMessageForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    messageType: "",
    course: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const listRef = useRef(null);
  const triggerRef = useRef(null);

  const messageTypes = ["استفسار عام", "مشكلة تقنية", "طلب دعم", "شكوى", "اقتراح"];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple guard – relies on native "required" too
    if (!formData.fullName || !formData.phoneNumber || !formData.messageType || !formData.course) return;
    console.log("Form submitted:", formData);
  };

  // Close dropdown on outside click
  useEffect(() => {
    if (!isDropdownOpen) return;
    const onDocClick = (e) => {
      const t = e.target;
      if (
        !listRef.current?.contains(t) &&
        !triggerRef.current?.contains(t)
      ) {
        setIsDropdownOpen(false);
        setActiveIndex(-1);
      }
    };
    const onEsc = (e) => {
      if (e.key === "Escape") {
        setIsDropdownOpen(false);
        setActiveIndex(-1);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [isDropdownOpen]);

  // Keyboard nav for listbox
  const onTriggerKeyDown = (e) => {
    if (!["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) return;
    e.preventDefault();
    if (!isDropdownOpen) {
      setIsDropdownOpen(true);
      setActiveIndex(0);
      return;
    }
  };

  const onListKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % messageTypes.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + messageTypes.length) % messageTypes.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (activeIndex >= 0) {
        handleInputChange("messageType", messageTypes[activeIndex]);
        setIsDropdownOpen(false);
        triggerRef.current?.focus();
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      dir="rtl"
      className="flex flex-col w-full max-w-[800px] mx-auto items-start gap-6 px-6 py-12 relative bg-white rounded-[30px] border-[3px] border-solid border-zinc-200"
    >
      <header className="flex flex-col items-center justify-center gap-2 self-stretch">
        <h1 className="font-bold text-secondary text-2xl text-center leading-6">
          أرسل لنا رسالة
        </h1>
        <p className="text-text-alt text-sm text-center leading-5">
          املأ النموذج أدناه وسنعود إليك قريبا.
        </p>
      </header>

      <div className="flex flex-col gap-6 self-stretch w-full">
        {/* Full name */}
        <div className="flex flex-col gap-2.5 w-full">
          <label
            htmlFor="fullName"
            className="font-[600] text-text text-base leading-[14px]"
          >
            الاسم الكامل
          </label>
          <div className="flex items-center justify-end bg-white rounded-[15px] border border-solid border-zinc-200 focus-within:ring-2 focus-within:ring-secondary">
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              placeholder="أدخل اسمك الكامل"
              className="w-full px-4 py-5 text-text text-sm leading-5 placeholder:text-text-alt outline-none"
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2.5 w-full">
          <label
            htmlFor="phoneNumber"
            className="font-[600] text-text text-base leading-[14px]"
          >
            رقم الجوال
          </label>
          <div className="flex items-center justify-end bg-white rounded-[15px] border border-solid border-zinc-200 focus-within:ring-2 focus-within:ring-secondary">
            <input
              id="phoneNumber"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              pattern="^[0-9+\-\s()]{6,}$"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              placeholder="أدخل رقم هاتفك"
              className="w-full px-4 py-5 text-text text-sm leading-5 placeholder:text-text-alt outline-none"
              required
            />
          </div>
        </div>

        {/* Message type (custom select) */}
        <div className="flex flex-col gap-2.5 w-full">
          <label
            htmlFor="messageType"
            className="font-[600] text-text text-base leading-[14px]"
          >
            نوع الرسالة
          </label>

          <div className="relative w-full">
            <button
              ref={triggerRef}
              id="messageType"
              type="button"
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
              onClick={() => setIsDropdownOpen((o) => !o)}
              onKeyDown={onTriggerKeyDown}
              className="flex items-center justify-between w-full px-4 py-5 bg-white rounded-[15px] border border-solid border-zinc-200 focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <span className={!formData.messageType ? "text-text-alt" : "text-text"}>
                {formData.messageType || "حدد نوع الرسالة"}
              </span>
              <ChevronDown className="text-text-alt" />
            </button>

            {isDropdownOpen && (
              <ul
                ref={listRef}
                role="listbox"
                tabIndex={-1}
                onKeyDown={onListKeyDown}
                className="absolute top-full left-0 right-0 z-10 mt-1 max-h-64 overflow-auto bg-white border border-solid border-zinc-200 rounded-[15px] shadow-lg outline-none"
              >
                {messageTypes.map((type, index) => {
                  const selected = formData.messageType === type;
                  const active = index === activeIndex;
                  return (
                    <li key={type} role="option" aria-selected={selected}>
                      <button
                        type="button"
                        onMouseEnter={() => setActiveIndex(index)}
                        onFocus={() => setActiveIndex(index)}
                        onClick={() => {
                          handleInputChange("messageType", type);
                          setIsDropdownOpen(false);
                          triggerRef.current?.focus();
                        }}
                        className={[
                          "w-full text-right px-4 py-4 text-sm leading-5",
                          "hover:bg-zinc-50 first:rounded-t-[15px] last:rounded-b-[15px] outline-none",
                          active ? "bg-zinc-50" : "",
                          selected ? "font-semibold text-secondary-dark" : "text-text"
                        ].join(" ")}
                      >
                        {type}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        {/* Course / message body */}
        <div className="flex flex-col gap-2.5 w-full">
          <label
            htmlFor="course"
            className="font-[600] text-text text-base leading-[14px]"
          >
            الدورة المشترك بها
          </label>
          <div className="flex items-start justify-end bg-white rounded-[15px] border border-solid border-zinc-200 focus-within:ring-2 focus-within:ring-secondary">
            <textarea
              id="course"
              name="course"
              value={formData.course}
              onChange={(e) => handleInputChange("course", e.target.value)}
              placeholder="اكتب الدورة التي تواجه بها مشكلة"
              rows={3}
              className="w-full resize-none px-4 py-5 text-text text-sm leading-5 placeholder:text-text-alt outline-none"
              required
            />
          </div>
        </div>
      </div>

      <footer className="flex flex-col items-center gap-6 self-stretch w-full">
        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-16 py-6 w-full bg-secondary rounded-[20px] hover:bg-secondary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
        >
          <span className="font-bold text-neutral-50 text-base leading-8 whitespace-nowrap">
            إرسال الرسالة
          </span>
        </button>
        <p className="text-text-alt text-sm text-center leading-5">
          جميع الحقول مطلوبة. سيتم استلام الرسائل في لوحة معلومات المشرف.
        </p>
      </footer>
    </form>
  );
};
