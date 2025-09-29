import { TransactionCalenderIcon, UploadPill } from "../../public/svgs";
import BankCard from "./BankCard";
import React, { useState } from "react";
// import image from "./image.svg";
// import vector from "./vector.svg";
// import vector2 from "./vector-2.svg";
const CheckoutBanksSection = () => {
  return (
    <div className="flex flex-col gap-6 mb-[32px]">
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
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
    <div className="flex flex-col items-start gap-8 px-6 py-16 relative bg-[#fef1e8] rounded-[40px]">
      <div className="flex flex-col items-start gap-16 relative self-stretch w-full ">
        <h1 className="relative self-stretch mt-[-1.00px]  font-bold text-black text-[32px] tracking-[0] leading-[normal] ">
          تفاصيل التحويل
        </h1>

        <form className="flex flex-col items-start gap-6 relative self-stretch w-full ">
          <div className="flex items-center gap-[64px] justify-between relative self-stretch w-full ">
            <div className="flex flex-col w-[600px] items-start gap-2 relative">
              <label
                htmlFor="studentName"
                className="relative self-stretch mt-[-1.00px]  font-bold text-text text-base tracking-[0] leading-6 "
              >
                اسم الطالب
              </label>

              <div className="flex items-center justify-end gap-2.5 px-4 py-6 relative self-stretch w-full  bg-white rounded-[20px] border-2 border-solid border-[#c8c9d5]">
                <input
                  type="text"
                  id="studentName"
                  value={formData.studentName}
                  onChange={(e) =>
                    handleInputChange("studentName", e.target.value)
                  }
                  className="mt-[-2.00px]  font-normal text-[#c8c9d5] relative w-full text-base tracking-[0] leading-6  bg-transparent border-none outline-none"
                  placeholder="ادخل اسمك كامل"
                />
              </div>
            </div>
            <div className="flex flex-col w-[600px] items-start gap-2 relative">
              <label
                htmlFor="transferDate"
                className="relative self-stretch mt-[-1.00px]  font-bold text-text-duplicate text-base tracking-[0] leading-6 "
              >
                تاريخ التحويل
              </label>

              <div className="flex items-center justify-between px-4 py-6 relative self-stretch w-full  bg-white rounded-[20px] border-2 border-solid border-[#c8c9d5]">
                <input
                  type="date"
                  id="transferDate"
                  value={formData.transferDate}
                  onChange={(e) =>
                    handleInputChange("transferDate", e.target.value)
                  }
                  className="mt-[-2.00px] font-normal text-[#c8c9d5] relative w-fit text-base tracking-[0] leading-6 whitespace-nowrap  bg-transparent border-none outline-none"
                  placeholder="اختر التاريخ"
                />
                <div className="relative w-6 h-6 aspect-[1]">
                  <div className="relative w-[21px] h-[21px] top-0.5 left-px">
                    <TransactionCalenderIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex  gap-[64px]  relative self-stretch w-full ">
            <div className="flex flex-col !w-[600px] items-start gap-2 relative">
              <label
                htmlFor="transferAmount"
                className="relative self-stretch mt-[-1.00px]  font-bold text-text-duplicate text-base tracking-[0] leading-6 "
              >
                المبلغ المحول
              </label>

              <div className="flex items-center justify-end gap-2.5 px-4 py-6 relative self-stretch w-full  bg-white rounded-[20px] border-2 border-solid border-[#c8c9d5]">
                <input
                  type="number"
                  id="transferAmount"
                  value={formData.transferAmount}
                  onChange={(e) =>
                    handleInputChange("transferAmount", e.target.value)
                  }
                  className="mt-[-2.00px]  font-normal text-[#c8c9d5] relative w-full text-base tracking-[0] leading-6  bg-transparent border-none outline-none"
                  placeholder="ادخل المبلغ"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            <div className="inline-flex w-[600px] flex-col items-start justify-between relative self-stretch ">
              <label
                htmlFor="receiptUpload"
                className="relative self-stretch mt-[-1.00px]  font-bold text-text-duplicate text-base tracking-[0] leading-6 "
              >
                إيصال التحويل
              </label>

              <div className="inline-flex items-center gap-2 relative ">
                <label
                  htmlFor="receiptUpload"
                  className="inline-flex items-start justify-end gap-2 px-6 py-4 relative  bg-white rounded-[10px] border border-solid border-[#c8c9d5] cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <span className="mt-[-1.00px]  font-semibold text-text-duplicate relative w-fit text-base tracking-[0] leading-6 whitespace-nowrap ">
                    رفع الإيصال
                  </span>
                  <div className="mt-auto">
                    <UploadPill />
                  </div>
                </label>

                <div className=" font-normal text-text-alt relative w-fit text-base tracking-[0] leading-6 whitespace-nowrap ">
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
