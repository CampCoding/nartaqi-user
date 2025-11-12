"use client";
import React, { useEffect, useMemo, useState } from "react";

export const RewardsNav = ({ value, onChange }) => {
  // 1. Removed static padding from the data array to apply responsive classes directly
  const menuItems = useMemo(
    () => [
      { key: "special", text: "جوائز خاصه" },
      { key: "gifts", text: "بطاقات هدايا" },
      { key: "courses", text: "دورات" },
      { key: "books", text: "كتب" },
      { key: "all", text: "الكل" },
    ],
    []
  );

  const initialKey = value ?? "all";
  const [activeKey, setActiveKey] = useState(initialKey);

  useEffect(() => {
    if (value !== undefined && value !== activeKey) {
      setActiveKey(value);
    }
  }, [value, activeKey]);

  const handleClick = (key) => {
    setActiveKey(key);
    onChange?.(key);
  };

  return (
    <nav
      // 2. Main container is now shorter and has less padding on mobile
      className="flex sticky md:static top-[80px] z-30 h-auto items-center  bg-white mb-8 shadow-2xl md:shadow-none md:rounded-[20px] lg:border-4 border-solid border-variable-collection-stroke p-2 lg:h-[100px] lg:px-6 lg:py-4"
      role="navigation"
      aria-label="فئات المحتوى"
    >
      {/* 3. Added a wrapper for horizontal scrolling on mobile */}
      <div className="flex w-full items-center gap-2 px-4 lg:px-0 overflow-x-auto lg:justify-between hidden-scroll">
        {[...menuItems].reverse().map((item) => {
          const isActive = item.key === activeKey;
          return (
            <button
              key={item.key}
              // 4. Buttons are now flexible on mobile with smaller padding and a fixed width on desktop
              className={`flex-shrink-0 rounded-[16px] lg:rounded-[20px] flex items-center justify-center relative px-6 py-3 lg:w-[200px] lg:px-16 lg:py-6 transition-colors duration-200 ${
                isActive ? "bg-primary" : "bg-transparent"
              }`}
              type="button"
              onClick={() => handleClick(item.key)}
            >
              <span
                // 5. Font size is now smaller on mobile
                className={`relative w-fit text-center text-sm md:text-base leading-5 whitespace-nowrap transition-colors duration-200 ${
                  isActive ? "text-white" : "text-[#2d2d2d]"
                }`}
              >
                {item.text}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
