import { TransactionCalenderIcon, UploadPill } from "../../public/svgs";
import BankCard from "./BankCard";
import React, { useState } from "react";

const CheckoutBanksSection = () => {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        <BankCard widthClass="w-full" />
        <BankCard widthClass="w-full" />
        <BankCard widthClass="w-full" />
        <BankCard widthClass="w-full" />
      </div>

      <TransactionDetail />
    </div>
  );
};

export default CheckoutBanksSection;

export const TransactionDetail = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    transferDate: "",
    transferAmount: "",
    receiptFile: null,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFormData((prev) => ({
      ...prev,
      receiptFile: file,
    }));
  };

  return (
    <div className="flex flex-col items-start gap-4 sm:gap-6 md:gap-8 px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12 relative bg-[#fef1e8] rounded-[20px] sm:rounded-[30px] md:rounded-[40px]">
      <div className="flex flex-col items-start gap-6 sm:gap-8 md:gap-12 relative self-stretch w-full">
        <h1 className="relative self-stretch font-bold text-black text-xl sm:text-2xl md:text-[28px] lg:text-[32px] tracking-[0] leading-normal">
          تفاصيل التحويل
        </h1>

        <form className="flex flex-col items-start gap-4 sm:gap-5 md:gap-6 relative self-stretch w-full">
          {/* First Row - Student Name & Transfer Date */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 justify-between relative self-stretch w-full">
            <div className="flex flex-col w-full lg:w-1/2 items-start gap-1.5 sm:gap-2 relative">
              <label
                htmlFor="studentName"
                className="relative self-stretch font-bold text-text text-sm sm:text-base tracking-[0] leading-6"
              >
                اسم الطالب
              </label>

              <div className="flex items-center justify-end gap-2.5 px-3 sm:px-4 py-3 sm:py-4 md:py-5 relative self-stretch w-full bg-white rounded-[15px] sm:rounded-[18px] md:rounded-[20px] border-2 border-solid border-[#c8c9d5] focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20">
                <input
                  type="text"
                  id="studentName"
                  value={formData.studentName}
                  onChange={(e) =>
                    handleInputChange("studentName", e.target.value)
                  }
                  className="font-normal text-[#c8c9d5] relative w-full text-sm sm:text-base tracking-[0] leading-6 bg-transparent border-none outline-none placeholder:text-[#c8c9d5]"
                  placeholder="ادخل اسمك كامل"
                />
              </div>
            </div>

            <div className="flex flex-col w-full lg:w-1/2 items-start gap-1.5 sm:gap-2 relative">
              <label
                htmlFor="transferDate"
                className="relative self-stretch font-bold text-text-duplicate text-sm sm:text-base tracking-[0] leading-6"
              >
                تاريخ التحويل
              </label>

              <div className="flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4 md:py-5 relative self-stretch w-full bg-white rounded-[15px] sm:rounded-[18px] md:rounded-[20px] border-2 border-solid border-[#c8c9d5] focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20">
                <input
                  type="date"
                  id="transferDate"
                  value={formData.transferDate}
                  onChange={(e) =>
                    handleInputChange("transferDate", e.target.value)
                  }
                  className="font-normal text-[#c8c9d5] relative w-full text-sm sm:text-base tracking-[0] leading-6 bg-transparent border-none outline-none"
                  placeholder="اختر التاريخ"
                />
                <div className="relative w-5 h-5 sm:w-6 sm:h-6 aspect-[1] flex-shrink-0">
                  <div className="relative w-[18px] h-[18px] sm:w-[21px] sm:h-[21px] top-0.5 left-px">
                    <TransactionCalenderIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row - Transfer Amount & Receipt Upload */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 relative self-stretch w-full">
            <div className="flex flex-col w-full lg:w-1/2 items-start gap-1.5 sm:gap-2 relative">
              <label
                htmlFor="transferAmount"
                className="relative self-stretch font-bold text-text-duplicate text-sm sm:text-base tracking-[0] leading-6"
              >
                المبلغ المحول
              </label>

              <div className="flex items-center justify-end gap-2.5 px-3 sm:px-4 py-3 sm:py-4 md:py-5 relative self-stretch w-full bg-white rounded-[15px] sm:rounded-[18px] md:rounded-[20px] border-2 border-solid border-[#c8c9d5] focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20">
                <input
                  type="number"
                  id="transferAmount"
                  value={formData.transferAmount}
                  onChange={(e) =>
                    handleInputChange("transferAmount", e.target.value)
                  }
                  className="font-normal text-[#c8c9d5] relative w-full text-sm sm:text-base tracking-[0] leading-6 bg-transparent border-none outline-none placeholder:text-[#c8c9d5]"
                  placeholder="ادخل المبلغ"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="inline-flex w-full lg:w-1/2 flex-col items-start gap-1.5 sm:gap-2 relative">
              <label
                htmlFor="receiptUpload"
                className="relative self-stretch font-bold text-text-duplicate text-sm sm:text-base tracking-[0] leading-6"
              >
                إيصال التحويل
              </label>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full">
                <label
                  htmlFor="receiptUpload"
                  className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 bg-white rounded-[8px] sm:rounded-[10px] border border-solid border-[#c8c9d5] cursor-pointer hover:bg-gray-50 transition-colors focus-within:ring-2 focus-within:ring-secondary focus-within:ring-offset-2 whitespace-nowrap"
                >
                  <span className="font-semibold text-text-duplicate text-xs sm:text-sm md:text-base tracking-[0] leading-6">
                    رفع الإيصال
                  </span>
                  <div className="w-4 h-4 sm:w-5 sm:h-5">
                    <UploadPill />
                  </div>
                </label>

                <div className="font-normal text-text-alt text-xs sm:text-sm md:text-base tracking-[0] leading-6 break-all sm:break-normal">
                  {formData.receiptFile
                    ? formData.receiptFile.name
                    : "لم يتم اختيار ملف"}
                </div>

                <input
                  type="file"
                  id="receiptUpload"
                  onChange={handleFileUpload}
                  accept="image/*,.pdf"
                  className="sr-only"
                  aria-describedby="file-upload-description"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
