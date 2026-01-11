"use client";

import React, { useState } from "react";
import {
  ApplePayIcon,
  CrditIcon,
  DisabledRadioButton,
  EnabledRadioButton,
} from "../../public/svgs";
import { Check } from "lucide-react";

export const ElectronicPayment = () => {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20">
      <CriditFrame />
      <ApplePayFrame />
    </div>
  );
};

export const CriditFrame = () => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    saveCard: false,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : v;
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="flex flex-col items-start gap-3 sm:gap-4 px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 relative bg-white rounded-[20px] sm:rounded-[25px] md:rounded-[30px] border-2 sm:border-[3px] border-solid border-border">
      {/* Header */}
      <div className="flex items-center justify-between w-full relative self-stretch flex-[0_0_auto]">
        <div className="inline-flex items-center gap-2 relative self-stretch flex-[0_0_auto]">
          <div className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 aspect-[1] focus-within:ring-2 focus-within:ring-secondary focus-within:ring-offset-2 focus-within:rounded-full">
            <EnabledRadioButton />
          </div>
          <div className="relative font-normal text-text-alt text-lg sm:text-xl md:text-2xl leading-6 whitespace-nowrap">
            Visa / Mastercard accepted
          </div>
        </div>
        <div className="relative w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 aspect-[1]">
          <CrditIcon />
        </div>
      </div>

      {/* Form */}
      <form className="flex flex-col items-start gap-4 sm:gap-5 md:gap-6 w-full relative self-stretch flex-[0_0_auto]">
        {/* Card Number */}
        <div className="flex flex-col items-start gap-1.5 sm:gap-2 w-full">
          <label
            htmlFor="cardNumber"
            className="font-bold text-text text-sm sm:text-base leading-6"
          >
            رقم البطاقة
          </label>
          <div className="flex items-center w-full bg-white rounded-[15px] sm:rounded-[18px] md:rounded-[20px] border-2 border-solid border-border focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20">
            <input
              id="cardNumber"
              type="text"
              value={formData.cardNumber}
              onChange={(e) =>
                handleInputChange(
                  "cardNumber",
                  formatCardNumber(e.target.value)
                )
              }
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              className="w-full px-3 sm:px-4 py-3 sm:py-4 md:py-5 font-normal text-text text-sm sm:text-base text-right bg-transparent placeholder:text-border outline-none focus:outline-none"
              dir="ltr"
            />
          </div>
        </div>

        {/* Expiry + CVV */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-6 w-full">
          <div className="flex flex-col items-start gap-1.5 sm:gap-2 w-full sm:flex-1">
            <label
              htmlFor="cvv"
              className="font-bold text-text text-sm sm:text-base text-right leading-6"
            >
              CVV
            </label>
            <div className="flex items-center w-full bg-white rounded-[15px] sm:rounded-[18px] md:rounded-[20px] border-2 border-solid border-border focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20">
              <input
                id="cvv"
                type="text"
                value={formData.cvv}
                onChange={(e) =>
                  handleInputChange(
                    "cvv",
                    e.target.value.replace(/[^0-9]/g, "")
                  )
                }
                placeholder="CVV"
                maxLength="4"
                className="w-full px-3 sm:px-4 py-3 sm:py-4 md:py-5 font-normal text-text text-sm sm:text-base text-right bg-transparent placeholder:text-border outline-none focus:outline-none"
                dir="ltr"
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-1.5 sm:gap-2 w-full sm:flex-1">
            <label
              htmlFor="expiryDate"
              className="font-bold text-text text-sm sm:text-base leading-6"
            >
              تاريخ الانتهاء
            </label>
            <div className="flex items-center w-full bg-white rounded-[15px] sm:rounded-[18px] md:rounded-[20px] border-2 border-solid border-border focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20">
              <input
                id="expiryDate"
                type="text"
                value={formData.expiryDate}
                onChange={(e) =>
                  handleInputChange(
                    "expiryDate",
                    formatExpiryDate(e.target.value)
                  )
                }
                placeholder="MM/YY"
                maxLength="5"
                className="w-full font-normal px-3 sm:px-4 py-3 sm:py-4 md:py-5 text-text text-sm sm:text-base text-right bg-transparent placeholder:text-border outline-none focus:outline-none"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* Cardholder Name */}
        <div className="flex flex-col items-start gap-1.5 sm:gap-2 w-full">
          <label
            htmlFor="cardholderName"
            className="font-bold text-text text-sm sm:text-base leading-6"
          >
            الاسم على البطاقة
          </label>
          <div className="flex items-center w-full bg-white rounded-[15px] sm:rounded-[18px] md:rounded-[20px] border-2 border-solid border-border focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20">
            <input
              id="cardholderName"
              type="text"
              value={formData.cardholderName}
              onChange={(e) =>
                handleInputChange("cardholderName", e.target.value)
              }
              placeholder="يوسف شفيق"
              className="w-full font-normal px-3 sm:px-4 py-3 sm:py-4 md:py-5 text-text text-sm sm:text-base text-right bg-transparent placeholder:text-border outline-none focus:outline-none"
            />
          </div>
        </div>

        {/* Save Card */}
        <div className="flex items-center gap-3 w-full">
          <div
            onClick={() => handleInputChange("saveCard", !formData.saveCard)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleInputChange("saveCard", !formData.saveCard);
              }
            }}
            className={`cursor-pointer w-5 h-5 sm:w-6 sm:h-6 rounded border-2 border-border flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 ${
              formData.saveCard
                ? "bg-secondary border !border-secondary"
                : "bg-white"
            }`}
          >
            {formData.saveCard && (
              <Check className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px] text-white" />
            )}
          </div>
          <label
            htmlFor="saveCard"
            className="select-none font-normal text-text text-sm sm:text-base cursor-pointer"
          >
            احفظ هذه البطاقة بأمان لشرائي لاحقا
          </label>
        </div>
      </form>
    </div>
  );
};

export const ApplePayFrame = () => {
  return (
    <div className="flex flex-col items-start gap-3 sm:gap-4 px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 relative bg-white rounded-[20px] sm:rounded-[25px] md:rounded-[30px] border-2 sm:border-[3px] border-solid border-border">
      <div className="flex items-center justify-between w-full">
        <div className="inline-flex items-center gap-2">
          <div className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 focus-within:ring-2 focus-within:ring-secondary focus-within:ring-offset-2 focus-within:rounded-full">
            <DisabledRadioButton />
          </div>
          <div className="font-normal text-text-alt text-lg sm:text-xl md:text-2xl leading-6 whitespace-nowrap">
            Apple Pay
          </div>
        </div>
        <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14">
          <ApplePayIcon />
        </div>
      </div>
    </div>
  );
};
