"use client";

import React, { useEffect, useState } from "react";

export const CheckoutTabs = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState("electronic");

  const paymentOptions = [
    { id: "electronic", label: "الدفع الإلكتروني" },
    { id: "installment", label: "التقسيط" },
    { id: "bank", label: "تحويل بنكي" },
  ];

  const handleOptionClick = (optionId) => {
    setSelectedOption(optionId);
  };

  useEffect(() => {
    if (selectedOption && onChange) {
      onChange(selectedOption);
    }
  }, [selectedOption, onChange]);

  return (
    <div
      className="flex items-center justify-between px-1 py-2 relative bg-[#fff1e7] rounded-[15px]"
      role="tablist"
      aria-label="طرق الدفع"
    >
      {paymentOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => handleOptionClick(option.id)}
          role="tab"
          aria-selected={selectedOption === option.id}
          tabIndex={selectedOption === option.id ? 0 : -1}
          className={`w-[413.34px] flex items-center justify-center px-3 py-4 relative transition-all duration-200 rounded ${
            selectedOption === option.id
              ? "bg-secondary rounded-[20px]"
              : "hover:bg-orange-100"
          }`}
        >
          <div
            className={`${
              selectedOption === option.id
                ? "font-bold text-white"
                : "font-medium text-text-alt"
            } relative flex items-center justify-center w-fit text-xl text-center leading-[normal] overflow-hidden text-ellipsis [-webkit-line-clamp:1] [-webkit-box-orient:vertical] `}
          >
            {option.label}
          </div>
        </button>
      ))}
    </div>
  );
};
