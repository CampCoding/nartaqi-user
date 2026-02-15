"use client";

import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import { ChevronDown } from "lucide-react";
import { Dropdown, Menu } from "antd";
import { SaudiIcon, EgyptianIcon } from "../../public/svgs";
import axios from "axios";
import toast from "react-hot-toast";
import { handlePhoneCode } from "@/components/utils/helpers/phoneCode";

// ============== TELEPHONE INPUT COMPONENT ==============
const TelephoneInput = memo(function TelephoneInput({
  label = "رقم الجوال",
  subLabel = "",
  placeholder = "123456789",
  value,
  onChange,
  selectedCountry,
  setSelectedCountry,
  error,
  disabled,
  ...props
}) {
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

  const handleCountrySelect = useCallback(
    ({ key }) => {
      const country = countries.find((c) => c.code === key);
      if (country) {
        setSelectedCountry(country);
      }
    },
    [setSelectedCountry]
  );

  const menu = (
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

  // Handle input to allow only numbers
  const handleInput = useCallback(
    (e) => {
      const onlyNums = e.target.value.replace(/\D/g, "");
      onChange(onlyNums);
    },
    [onChange]
  );

  return (
    <div className="flex flex-col items-start gap-2.5 relative w-full">
      <div className="justify-between flex items-center relative self-stretch w-full flex-[0_0_auto]">
        <div className="font-[600] text-text relative flex items-center justify-center w-fit text-base leading-[14px]">
          {label}
        </div>
        {subLabel && (
          <div className="font-medium text-danger relative flex items-center justify-center w-fit text-sm tracking-[0] leading-[normal]">
            {subLabel}
          </div>
        )}
      </div>
      <div
        className={`h-[58px] justify-between overflow-hidden py-0 bg-white rounded-[15px] border border-solid flex items-center relative w-full transition-colors ${
          error
            ? "border-danger"
            : "border-zinc-200 focus-within:ring-2 focus-within:ring-secondary"
        } ${disabled ? "opacity-60" : ""}`}
      >
        <input
          className="justify-center w-full px-4 h-full font-normal text-text placeholder-text-alt text-sm text-right tracking-[0] leading-5 flex items-center relative focus:outline-none disabled:cursor-not-allowed"
          placeholder={placeholder}
          disabled={disabled}
          inputMode="numeric"
          autoComplete="tel"
          value={value}
          onChange={(e) => handleInput(e)}
          {...props}
        />
        <Dropdown
          overlay={menu}
          trigger={["click"]}
          placement="bottomRight"
          disabled={disabled}
        >
          <div className="inline-flex items-center gap-2 px-4 relative flex-[0_0_auto] border-r border-solid border-zinc-200 cursor-pointer hover:bg-gray-50 rounded-tl-lg rounded-bl-lg transition-colors h-full">
            <div className="relative flex items-center justify-center w-fit font-semibold text-text text-sm text-right tracking-[0] leading-[normal]">
              {selectedCountry?.code}
            </div>
            <div className="w-5 h-5">
              {selectedCountry?.icon && <selectedCountry.icon />}
            </div>
            <svg
              className="w-3 h-3 transition-transform"
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
      {error && <div className="text-danger text-xs mt-1">{error}</div>}
    </div>
  );
});

// ============== MAIN FORM COMPONENT ==============
export const SendUsMessageForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    messageType: "",
    content: "",
  });

  const [selectedCountry, setSelectedCountry] = useState({
    code: "+966",
    name: "Saudi Arabia",
    icon: SaudiIcon,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const listRef = useRef(null);
  const triggerRef = useRef(null);

  const messageTypes = [
    "استفسار عام",
    "مشكلة تقنية",
    "طلب دعم",
    "شكوى",
    "اقتراح",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "الاسم الكامل مطلوب";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "رقم الجوال مطلوب";
    } else if (formData.phoneNumber.length < 9) {
      newErrors.phoneNumber = "رقم الجوال غير صحيح";
    }

    if (!formData.messageType) {
      newErrors.messageType = "نوع الرسالة مطلوب";
    }

    if (!formData.content.trim()) {
      newErrors.content = "نص الشكوى مطلوب";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Format phone number with country code
      const phone = handlePhoneCode({
        phone: formData.phoneNumber,
        selectedCountryCode: selectedCountry.code,
      });

      const payload = {
        name: formData.fullName.trim(),
        message_type: formData.messageType,
        content: formData.content.trim(),
        phone: phone,
      };

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || ""}/user/settings/makeInquiry`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.status === "success") {
        toast.success("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً");
        // Reset form
        setFormData({
          fullName: "",
          phoneNumber: "",
          messageType: "",
          content: "",
        });
        setErrors({});
      } else {
        toast.error(response?.data?.message || "حدث خطأ أثناء إرسال الرسالة");
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      const errorMessage =
        error?.response?.data?.message || "حدث خطأ أثناء إرسال الرسالة";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    if (!isDropdownOpen) return;
    const onDocClick = (e) => {
      const t = e.target;
      if (!listRef.current?.contains(t) && !triggerRef.current?.contains(t)) {
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
      setActiveIndex(
        (i) => (i - 1 + messageTypes.length) % messageTypes.length
      );
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
          <div
            className={`flex items-center justify-end bg-white rounded-[15px] border border-solid ${
              errors.fullName
                ? "border-danger"
                : "border-zinc-200 focus-within:ring-2 focus-within:ring-secondary"
            }`}
          >
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              placeholder="أدخل اسمك الكامل"
              className="w-full px-4 py-5 text-text text-sm leading-5 placeholder:text-text-alt outline-none rounded-[15px]"
              disabled={isSubmitting}
            />
          </div>
          {errors.fullName && (
            <div className="text-danger text-xs">{errors.fullName}</div>
          )}
        </div>

        {/* Phone - Using the same style as login */}
        <TelephoneInput
          label="رقم الجوال"
          placeholder="أدخل رقم هاتفك"
          value={formData.phoneNumber}
          onChange={(value) => handleInputChange("phoneNumber", value)}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          error={errors.phoneNumber}
          disabled={isSubmitting}
        />

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
              disabled={isSubmitting}
              className={`flex items-center justify-between w-full px-4 py-5 bg-white rounded-[15px] border border-solid focus:outline-none focus:ring-2 focus:ring-secondary disabled:opacity-60 disabled:cursor-not-allowed ${
                errors.messageType ? "border-danger" : "border-zinc-200"
              }`}
            >
              <span
                className={
                  !formData.messageType ? "text-text-alt" : "text-text"
                }
              >
                {formData.messageType || "حدد نوع الرسالة"}
              </span>
              <ChevronDown
                className={`text-text-alt transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
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
                          "hover:bg-zinc-50 first:rounded-t-[15px] last:rounded-b-[15px] outline-none transition-colors",
                          active ? "bg-zinc-50" : "",
                          selected
                            ? "font-semibold text-secondary-dark"
                            : "text-text",
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
          {errors.messageType && (
            <div className="text-danger text-xs">{errors.messageType}</div>
          )}
        </div>

        {/* Content / message body */}
        <div className="flex flex-col gap-2.5 w-full">
          <label
            htmlFor="content"
            className="font-[600] text-text text-base leading-[14px]"
          >
            نص الشكوى
          </label>
          <div
            className={`flex items-start justify-end bg-white rounded-[15px] border border-solid ${
              errors.content
                ? "border-danger"
                : "border-zinc-200 focus-within:ring-2 focus-within:ring-secondary"
            }`}
          >
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              placeholder="اكتب المشكلة التي تواجهها"
              rows={4}
              className="w-full resize-none px-4 py-5 text-text text-sm leading-5 placeholder:text-text-alt outline-none rounded-[15px]"
              disabled={isSubmitting}
            />
          </div>
          {errors.content && (
            <div className="text-danger text-xs">{errors.content}</div>
          )}
        </div>
      </div>

      <footer className="flex flex-col items-center gap-6 self-stretch w-full">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 px-16 py-6 w-full bg-secondary rounded-[20px] hover:bg-secondary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span className="font-bold text-neutral-50 text-base leading-8 whitespace-nowrap">
                جارٍ الإرسال...
              </span>
            </div>
          ) : (
            <span className="font-bold text-neutral-50 text-base leading-8 whitespace-nowrap">
              إرسال الرسالة
            </span>
          )}
        </button>
        <p className="text-text-alt text-sm text-center leading-5">
          جميع الحقول مطلوبة. سيتم استلام الرسائل في لوحة معلومات المشرف.
        </p>
      </footer>
    </form>
  );
};

export default SendUsMessageForm;
