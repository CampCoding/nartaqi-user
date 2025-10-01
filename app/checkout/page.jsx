"use client";

import React, { useState } from "react";
import CourseTitle from "./../../components/CourseDetailsPage/CourseTitle";
import CheckoutSummery from "../../components/CheckoutPage/CheckoutSummery";
import { CheckoutTabs } from "../../components/CheckoutPage/CheckoutTabs";
import {
  ApplePayIcon,
  CrditIcon,
  DisabledRadioButton,
  EnabledRadioButton,
} from "../../public/svgs";
import { Check } from "lucide-react";
import { ElectronicPayment } from "../../components/CheckoutPage/ElectronicPayment";
import InstallmentCheckout from "../../components/CheckoutPage/InstallmentCheckout";
import BankCard from "../../components/CheckoutPage/BankCard";
import CheckoutBanksSection from "../../components/CheckoutPage/CheckoutBanksSection";
import Link from "next/link";

const CheckoutPage = () => {
  const [selectedTab, setSelectedTap] = useState("");

  return (
    <div className="container  max-w-[1312px] !mx-auto px-[64px]">
      <CourseTitle title={"الدفع"} breadcrumbs={
        [
          { title: "الرئيسية", link: "/" },
            { title: "السلة", link: "/cart" },
            { title: "الدفع", link: "/#" },
        ]
      } />
      <CheckoutSummery />
      <div className="mt-[48px] flex flex-col gap-[24px] mb-[88px]">
        <CheckoutTabs onChange={(val) => setSelectedTap(val)} />
        <div className="flex flex-col ">
          {(() => {
            switch (selectedTab) {
              case "electronic":
                return <ElectronicPayment />;
              case "installment":
                return <InstallmentCheckout />;
              case "bank":
                return <CheckoutBanksSection />;
            }
          })()}
          <Link href={"/success-checkout"} className="flex  items-center justify-center px-16 py-5 cursor-pointer transition hover:bg-secondary-dark relative bg-secondary rounded-[25px]">
            <h1 className="relative flex items-center justify-center w-fit mt-[-1.00px] font-bold text-white text-2xl tracking-[0] leading-[normal] ">
              تأكيد الدفع
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

// import image from "./image.svg";
// import vector2 from "./vector-2.svg";

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
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  return (
    <form className="flex flex-col items-start gap-4 px-4 py-6 relative bg-white rounded-[30px] border-[3px] border-solid border-[#c8c9d5]">
      <header className="flex items-center justify-between w-full relative self-stretch flex-[0_0_auto]">
        <div className="inline-flex items-center gap-2 relative self-stretch flex-[0_0_auto]">
          <div className="relative w-8 h-8 aspect-[1]">
            <div className="relative w-[27px] h-[27px] top-[3px] left-[3px] bg-[url(/vector.svg)] bg-[100%_100%]">
              <div className="" alt="Vector" src={""}>
                {/* <DisabledRadioButton /> */}
                <EnabledRadioButton />
              </div>
            </div>
          </div>
          <div className="relative w-fit  font-normal text-text-alt text-2xl leading-6 whitespace-nowrap">
            Visa / Mastercard accepted
          </div>
        </div>
        <div className="relative w-14 h-14 aspect-[1]" alt="Card">
          <CrditIcon />
        </div>
      </header>

      <main className="flex flex-col items-start gap-8 w-full relative self-stretch flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-2 w-full relative self-stretch flex-[0_0_auto]">
          <label
            htmlFor="cardNumber"
            className="relative self-stretch mt-[-1.00px]  font-bold text-text-duplicate text-base tracking-[0] leading-6 "
          >
            رقم البطاقة
          </label>

          <div className="flex items-center justify-end gap-2.5 px-4 py-6 w-full bg-white rounded-[20px] border-2 border-solid border-[#c8c9d5] relative self-stretch flex-[0_0_auto]">
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
              className="relative w-full mt-[-2.00px]  font-normal text-text-duplicate text-base text-right tracking-[0] leading-6 placeholder:text-[#c8c9d5] bg-transparent border-none outline-none"
              aria-label="رقم البطاقة"
              required
            />
          </div>
        </div>

        <div className="flex items-center gap-8 w-full relative self-stretch flex-[0_0_auto]">
          <div className="flex flex-col items-start gap-2 relative flex-1 grow">
            <label
              htmlFor="expiryDate"
              className="relative self-stretch mt-[-1.00px]  font-bold text-text-duplicate text-base tracking-[0] leading-6 "
            >
              تاريخ الانتهاء
            </label>

            <div className="flex items-center justify-end gap-2.5 px-4 py-6 w-full bg-white rounded-[20px] border-2 border-solid border-[#c8c9d5] relative self-stretch flex-[0_0_auto]">
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
                className="relative w-full mt-[-2.00px]  font-normal text-text-duplicate text-base text-right tracking-[0] leading-6 placeholder:text-[#c8c9d5] bg-transparent border-none outline-none"
                aria-label="تاريخ الانتهاء"
                required
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 relative flex-1 grow">
            <label
              htmlFor="cvv"
              className="relative self-stretch mt-[-1.00px]  font-bold text-text-duplicate text-base text-right tracking-[0] leading-6"
            >
              CVV
            </label>

            <div className="flex items-center justify-end gap-2.5 px-4 py-6 w-full bg-white rounded-[20px] border-2 border-solid border-[#c8c9d5] relative self-stretch flex-[0_0_auto]">
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
                className="relative w-full mt-[-2.00px]  font-normal text-text-duplicate text-base text-right tracking-[0] leading-6 placeholder:text-[#c8c9d5] bg-transparent border-none outline-none"
                aria-label="CVV"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 w-full relative self-stretch flex-[0_0_auto]">
          <label
            htmlFor="cardholderName"
            className="relative self-stretch mt-[-1.00px]  font-bold text-text-duplicate text-base tracking-[0] leading-6 "
          >
            الاسم على البطاقة
          </label>

          <div className="flex items-center justify-end gap-2.5 px-4 py-6 w-full bg-white rounded-[20px] border-2 border-solid border-[#c8c9d5] relative self-stretch flex-[0_0_auto]">
            <input
              id="cardholderName"
              type="text"
              value={formData.cardholderName}
              onChange={(e) =>
                handleInputChange("cardholderName", e.target.value)
              }
              placeholder="يوسف شفيق"
              className="mt-[-2.00px] relative w-full  font-normal text-text-duplicate text-base tracking-[0] leading-6 placeholder:text-[#c8c9d5]  bg-transparent border-none outline-none"
              aria-label="الاسم على البطاقة"
              required
            />
          </div>
        </div>
      </main>

      <div className="flex items-start justify-start gap-4 w-full relative self-stretch flex-[0_0_auto]">
        <div className="relative w-6 h-6 aspect-[1]">
          <input
            id="saveCard"
            type="checkbox"
            checked={formData.saveCard}
            onChange={(e) => handleInputChange("saveCard", e.target.checked)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="احفظ هذه البطاقة بأمان لشرائي لاحقا"
          />
          <div
            onClick={() => handleInputChange("saveCard", !formData.saveCard)}
            className={` cursor-pointer absolute inset-0 w-6 h-6 rounded border-2 border-[#c8c9d5] ${
              formData.saveCard
                ? "bg-primary border-secondary"
                : "bg-white"
            } flex items-center justify-center`}
          >
            {formData.saveCard && (
              <Check className="w-[18px] h-[18px] text-white" />
            )}
          </div>
        </div>
        <label
          htmlFor="saveCard"
          className="mt-[-1.00px] select-none text-text-duplicate relative w-fit  font-normal text-base tracking-[0] leading-6 whitespace-nowrap  cursor-pointer"
        >
          احفظ هذه البطاقة بأمان لشرائي لاحقا
        </label>
      </div>
    </form>
  );
};

export const ApplePayFrame = () => {
  return (
    <form className="flex flex-col items-start gap-4 px-4 py-6 relative bg-white rounded-[30px] border-[3px] border-solid border-[#c8c9d5]">
      <header className="flex items-center justify-between w-full relative self-stretch flex-[0_0_auto]">
        <div className="inline-flex items-center gap-2 relative self-stretch flex-[0_0_auto]">
          <div className="relative w-8 h-8 aspect-[1]">
            <div className="relative w-[27px] h-[27px] top-[3px] left-[3px] bg-[url(/vector.svg)] bg-[100%_100%]">
              <div className="" alt="Vector" src={""}>
                <DisabledRadioButton />
                {/* <EnabledRadioButton /> */}
              </div>
            </div>
          </div>
          <div className="relative w-fit  font-normal text-text-alt text-2xl leading-6 whitespace-nowrap">
            Apple pay
          </div>
        </div>
        <div className="relative w-14 h-14 aspect-[1]" alt="Card">
          <ApplePayIcon />
        </div>
      </header>
    </form>
  );
};
