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
    <div className="flex flex-col gap-[32px] mb-[100px]">
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
    <div className="flex flex-col items-start gap-4 px-4 py-6 relative bg-white rounded-[30px] border-[3px] border-solid border-border">
      {/* Header */}
      <div className="flex items-center justify-between w-full relative self-stretch flex-[0_0_auto]">
        <div className="inline-flex items-center gap-2 relative self-stretch flex-[0_0_auto]">
          <div className="relative w-8 h-8 aspect-[1] focus-within:ring-2 focus-within:ring-secondary focus-within:ring-offset-2 focus-within:rounded-full">
            <EnabledRadioButton />
          </div>
          <div className="relative font-normal text-text-alt text-2xl leading-6 whitespace-nowrap">
            Visa / Mastercard accepted
          </div>
        </div>
        <div className="relative w-14 h-14 aspect-[1]">
          <CrditIcon />
        </div>
      </div>

      {/* Form */}
      <form className="flex flex-col items-start gap-8 w-full relative self-stretch flex-[0_0_auto]">
        {/* Card Number */}
        <div className="flex flex-col items-start gap-2 w-full">
          <label
            htmlFor="cardNumber"
            className="font-bold text-text text-base leading-6 "
          >
            رقم البطاقة
          </label>
            <div className="flex items-center  w-full bg-white rounded-[20px] border-2 border-solid border-border focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20">
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
                className="w-full px-4 py-6 font-normal text-text text-base text-right bg-transparent placeholder:text-border outline-none focus:outline-none"
                dir="ltr"
              />
            </div>
        </div>

        {/* Expiry + CVV */}
        <div className="flex items-center gap-8 w-full">
          <div className="flex flex-col items-start gap-2 flex-1">
            <label
              htmlFor="cvv"
              className="font-bold text-text text-base text-right leading-6"
            >
              CVV
            </label>
            <div className="flex items-center  w-full bg-white rounded-[20px] border-2 border-solid border-border focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20">
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
                className="w-full px-4 py-6 font-normal text-text text-base text-right bg-transparent placeholder:text-border outline-none focus:outline-none"
                dir="ltr"
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 flex-1">
            <label
              htmlFor="expiryDate"
              className="font-bold text-text text-base leading-6 "
            >
              تاريخ الانتهاء
            </label>
            <div className="flex items-center  w-full bg-white rounded-[20px] border-2 border-solid border-border focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20">
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
                className="w-full font-normal px-4 py-6 text-text text-base text-right bg-transparent placeholder:text-border outline-none focus:outline-none"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* Cardholder Name */}
        <div className="flex flex-col items-start gap-2 w-full">
          <label
            htmlFor="cardholderName"
            className="font-bold text-text text-base leading-6 "
          >
            الاسم على البطاقة
          </label>
          <div className="flex items-center  w-full bg-white rounded-[20px] border-2 border-solid border-border focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20">
            <input
              id="cardholderName"
              type="text"
              value={formData.cardholderName}
              onChange={(e) =>
                handleInputChange("cardholderName", e.target.value)
              }
              placeholder="يوسف شفيق"
              className="w-full font-normal px-4 py-6 text-text text-base text-right bg-transparent placeholder:text-border outline-none focus:outline-none"
            />
          </div>
        </div>

        {/* Save Card */}
        <div className="flex items-center gap-4 w-full">
          <div
            onClick={() => handleInputChange("saveCard", !formData.saveCard)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleInputChange("saveCard", !formData.saveCard);
              }
            }}
            className={`cursor-pointer w-6 h-6 rounded border-2 border-border flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 ${
              formData.saveCard
                ? "bg-secondary border !border-secondary"
                : "bg-white"
            }`}
          >
            {formData.saveCard && (
              <Check className="w-[18px] h-[18px] text-white" />
            )}
          </div>
          <label
            htmlFor="saveCard"
            className="select-none font-normal text-text text-base cursor-pointer "
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
    <div className="flex flex-col items-start gap-4 px-4 py-6 relative bg-white rounded-[30px] border-[3px] border-solid border-border">
      <div className="flex items-center justify-between w-full">
        <div className="inline-flex items-center gap-2">
          <div className="relative w-8 h-8 focus-within:ring-2 focus-within:ring-secondary focus-within:ring-offset-2 focus-within:rounded-full">
            <DisabledRadioButton />
          </div>
          <div className="font-normal text-text-alt text-2xl leading-6 whitespace-nowrap">
            Apple Pay
          </div>
        </div>
        <div className="relative w-14 h-14">
          <ApplePayIcon />
        </div>
      </div>
    </div>
  );
};
