"use client";

import React, { useEffect, useState, useCallback } from "react";

export const CheckoutTabs = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState("electronic");

  const paymentOptions = [
    { id: "electronic", label: "الدفع الإلكتروني" },
    { id: "installment", label: "التقسيط" },
    { id: "bank", label: "تحويل بنكي" },
  ];

  const handleOptionClick = useCallback((optionId) => {
    setSelectedOption(optionId);
  }, []);

  useEffect(() => {
    if (selectedOption && onChange) onChange(selectedOption);
  }, [selectedOption, onChange]);

  // Optional: arrow keys to move between tabs
  const onKeyDown = (e) => {
    const idx = paymentOptions.findIndex((o) => o.id === selectedOption);
    if (idx === -1) return;

    // In RTL, Left/Right feel inverted visually; keep logical order
    if (e.key === "ArrowRight") {
      const next = (idx + 1) % paymentOptions.length;
      setSelectedOption(paymentOptions[next].id);
    } else if (e.key === "ArrowLeft") {
      const prev = (idx - 1 + paymentOptions.length) % paymentOptions.length;
      setSelectedOption(paymentOptions[prev].id);
    }
  };

  return (
    <div
      dir="rtl"
      role="tablist"
      aria-label="طرق الدفع"
      onKeyDown={onKeyDown}
      className="
        flex items-center gap-1 sm:gap-2 p-1.5 bg-[#fff1e7] rounded-[15px]
        overflow-x-auto hidden-scroll
      "
    >
      {paymentOptions.map((option) => {
        const selected = selectedOption === option.id;
        return (
          <button
            key={option.id}
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => handleOptionClick(option.id)}
            className={[
              // Make tabs flexible: full width on wide screens, min width on mobile with horizontal scroll
              "flex-1 min-w-[180px] sm:min-w-0",
              "flex items-center justify-center px-3 py-3 sm:py-4 rounded transition-all duration-200",
              selected ? "bg-secondary rounded-[20px]" : "hover:bg-orange-100",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
            ].join(" ")}
          >
            <span
              className={[
                "text-center leading-normal truncate",
                selected ? "font-bold text-white" : "font-medium text-text-alt",
                "text-base sm:text-xl",
              ].join(" ")}
            >
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
