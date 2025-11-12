"use client";

import React, { useEffect, useState } from "react";
import { BadgeCard } from "../../../components/ui/Cards/BadgeCard";

const MyBadgesPage = () => {
  const categories = [
    "الكل",
    "القدرات العامة",
    "تحصيلي",
    "الرخصة المهنية",
    "قدرات الجامعيين",
  ];

  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const allBadges = [
    { id: 1, title: "شارة الملتزم", subtitle: "إدارة الوقت للطلاب", image: "/images/badge.png", category: "القدرات العامة" },
    { id: 2, title: "شارة المتفوق", subtitle: "تحسين الدرجات", image: "/images/badge.png", category: "تحصيلي" },
    { id: 3, title: "شارة المحترف", subtitle: "إتقان المهارات", image: "/images/badge.png", category: "الرخصة المهنية" },
    { id: 4, title: "شارة الباحث", subtitle: "بحث وتطوير", image: "/images/badge.png", category: "قدرات الجامعيين" },
    { id: 5, title: "شارة المثابر", subtitle: "استمرارية التعلم", image: "/images/badge.png", category: "القدرات العامة" },
    { id: 6, title: "شارة المبدع", subtitle: "حلول مبتكرة", image: "/images/badge.png", category: "تحصيلي" },
    { id: 7, title: "شارة المعلم", subtitle: "نقل المعرفة", image: "/images/badge.png", category: "الرخصة المهنية" },
    { id: 8, title: "شارة المتعاون", subtitle: "عمل جماعي", image: "/images/badge.png", category: "قدرات الجامعيين" },
  ];

  const visibleBadges =
    activeCategory === "الكل"
      ? allBadges
      : allBadges.filter((b) => b.category === activeCategory);

  return (
    <main className="w-full">
      <header className="flex flex-col items-start gap-2 relative mb-6 sm:mb-[24px]">
        <h1 className="font-bold text-text text-xl sm:text-2xl relative flex items-center self-stretch tracking-[0] leading-[normal]">
          شاراتي
        </h1>

        <p className="font-medium text-text-alt text-sm sm:text-base relative flex items-center self-stretch tracking-[0] leading-[normal]">
          استكشف مجموعتك من الشارات التي حصلت عليها لإنجازاتك التعليمية
          المتميزة.
        </p>
      </header>

      <BadgesNavs
        items={categories}
        value={activeCategory}
        onChange={setActiveCategory}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-3 sm:gap-x-[14px] gap-y-6 sm:gap-y-[32px] mt-6 sm:mt-[32px] place-items-center">
        {visibleBadges.map((badge) => (
          <BadgeCard
            key={badge.id}
            title={badge.title}
            subtitle={badge.subtitle}
            image={badge.image}
          />
        ))}
      </div>
    </main>
  );
};

export default MyBadgesPage;

export const BadgesNavs = ({ items, value, onChange, className = "" }) => {
  const defaultItems = [
    "الكل",
    "القدرات العامة",
    "تحصيلي",
    "الرخصة المهنية",
    "قدرات الجامعيين",
  ];

  const labels = Array.isArray(items) && items.length > 0 ? items : defaultItems;

  const [selected, setSelected] = useState(value ?? labels[0]);

  useEffect(() => {
    if (value !== undefined) {
      setSelected(value);
    }
  }, [value]);

  const handleClick = (label) => {
    if (value === undefined) {
      setSelected(label);
    }
    onChange?.(label);
  };

  return (
    <nav
      className={`w-full bg-primary-light rounded-[20px] sm:rounded-[25px] p-3 sm:p-4 ${className}`}
      role="navigation"
      aria-label="Navigation menu"
    >
      <div className="xl:hidden">
        <div className="flex items-center gap-2 overflow-x-auto hidden-scroll  scrollbar-hide pb-2">
          <div className="flex items-center gap-2 min-w-max">
            {labels.map((label, index) => (
              <button
                key={index}
                className={`
                  px-4 py-3 rounded-[12px] sm:rounded-[15px] 
                  inline-flex items-center justify-center 
                  transition-all duration-200 whitespace-nowrap
                  min-w-[80px] flex-shrink-0
                  ${selected === label ? "bg-primary" : "hover:bg-primary/10"}
                `}
                type="button"
                aria-current={selected === label ? "page" : undefined}
                onClick={() => handleClick(label)}
              >
                <span
                  className={`
                    text-sm sm:text-base font-medium text-center
                    ${selected === label ? "text-white font-bold" : "text-text"}
                    [direction:rtl]
                  `}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop - Full Width Grid */}
      <div className="hidden xl:block">
        <div className="grid grid-cols-5 gap-2">
          {labels.map((label, index) => (
            <button
              key={index}
              className={`
                px-4 py-4 rounded-[15px] 
                inline-flex items-center justify-center 
                transition-all duration-200 
                ${selected === label ? "bg-primary" : "hover:bg-primary/10"}
              `}
              type="button"
              aria-current={selected === label ? "page" : undefined}
              onClick={() => handleClick(label)}
            >
              <span
                className={`
                  text-base font-medium text-center leading-tight
                  ${selected === label ? "text-white font-bold" : "text-text"}
                  ${label === "قدرات الجامعيين" ? "leading-5" : ""}
                  [direction:rtl]
                `}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
