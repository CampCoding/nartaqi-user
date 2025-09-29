

"use client"
import React, { useEffect, useMemo, useState } from "react";

// RewardsNav: interactive nav with controlled/uncontrolled modes.
// Props:
// - value?: string (one of: 'all' | 'books' | 'courses' | 'gifts' | 'special')
// - onChange?: (key: string) => void
export const RewardsNav = ({ value, onChange }) => {
  const menuItems = useMemo(
    () => [
      { key: "special", text: "جوائز خاصه", padding: "px-16 py-6" },
      { key: "gifts", text: "بطاقات هدايا", padding: "px-16 py-6" },
      { key: "courses", text: "دورات", padding: "px-16 py-6" },
      { key: "books", text: "كتب", padding: "px-16 py-6" },
      { key: "all", text: "الكل", padding: "px-16 py-6" },
    ],
    []
  );

  const initialKey = value ?? "all";
  const [activeKey, setActiveKey] = useState(initialKey);

  // Sync internal state with controlled value prop
  useEffect(() => {
    if (value !== undefined && value !== activeKey) {
      setActiveKey(value);
    }
  }, [value]);

  const handleClick = (key) => {
    setActiveKey(key);
    if (onChange) onChange(key);
  };

  return (
    <nav
      className="flex h-[100px] items-center justify-between px-6 py-4 relative bg-white mb-8 rounded-[20px] border-4 border-solid border-variable-collection-stroke"
      role="navigation"
      aria-label="فئات المحتوى"
    >
      {[...menuItems].reverse().map((item) => {
        const isActive = item.key === activeKey;
        return (
          <button
            key={item.key}
            className={`${item.padding} rounded-[20px] flex w-[200px] items-center justify-center relative ${
              isActive ? "bg-primary" : ""
            }`}
            type="button"
            aria-pressed={isActive}
            aria-current={isActive ? "page" : undefined}
            onClick={() => handleClick(item.key)}
          >
            <span
              className={`${
                isActive ? "text-white" : "text-[#2d2d2d]"
              } [-webkit-line-clamp:${
                item.text === "جوائز خاصه" ? "2" : "1"
              }] relative [display:-webkit-box] items-center justify-center w-fit text-base text-center leading-5 whitespace-nowrap overflow-hidden text-ellipsis [-webkit-box-orient:vertical] [direction:rtl]`}
            >
              {item.text}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
