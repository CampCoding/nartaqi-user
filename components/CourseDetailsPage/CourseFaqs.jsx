"use client";

import React, { useState, useMemo } from "react";
import useGetfaqs from "../shared/Hooks/useGetfaqs";

const CrouseFaqs = () => {
  const { data, isLoading, isError, error } = useGetfaqs();
  const [activeCategory, setActiveCategory] = useState("all");

  const faqs = data?.message || [];

  const categories = useMemo(() => {
    const categorySet = new Set(faqs.map((faq) => faq.category));
    return Array.from(categorySet);
  }, [faqs]);

  const categoryLabels = {
    all: "الكل",
    general_aptitude: "القدرات العامة",
    registration_payment: "التسجيل والدفع",
    courses: "دورات",
    general: "عام",
    technical_support: "الدعم الفني",
  };

  const filteredFaqs = useMemo(() => {
    if (activeCategory === "all") {
      return faqs.filter((faq) => !faq.hidden);
    }
    return faqs.filter(
      (faq) => faq.category === activeCategory && !faq.hidden
    );
  }, [faqs, activeCategory]);

  if (isLoading) {
    return (
      <div dir="rtl" className="w-full mb-8 sm:mb-10">
        <h1 className="text-right text-primary text-lg sm:text-xl md:text-2xl font-bold mb-5 sm:mb-6 md:mb-8">
          الأسئلة الشائعة
        </h1>
        <div className="flex items-center justify-center min-h-[150px] sm:min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div dir="rtl" className="w-full mb-8 sm:mb-10">
        <h1 className="text-right text-primary text-lg sm:text-xl md:text-2xl font-bold mb-5 sm:mb-6 md:mb-8">
          الأسئلة الشائعة
        </h1>
        <div className="flex items-center justify-center min-h-[150px] sm:min-h-[200px]">
          <div className="text-center">
            <p className="text-red-500 text-sm sm:text-base mb-3 sm:mb-4">
              حدث خطأ في تحميل الأسئلة الشائعة
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm sm:text-base"
            >
              إعادة المحاولة
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="w-full mb-8 sm:mb-10">
      <h1 className="text-right text-primary text-lg sm:text-xl md:text-2xl font-bold mb-5 sm:mb-6 md:mb-8">
        الأسئلة الشائعة
      </h1>

      <NavigationItems
        categories={categories}
        categoryLabels={categoryLabels}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className="mt-5 sm:mt-6 md:mt-8 flex flex-col gap-3 sm:gap-3.5 md:gap-5">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((item) => (
            <QuestionAccordion key={item.id} item={item} />
          ))
        ) : (
          <div className="text-center py-8 sm:py-10 text-text-alt text-sm sm:text-base">
            لا توجد أسئلة في هذه الفئة
          </div>
        )}
      </div>
    </div>
  );
};

export default CrouseFaqs;

export const NavigationItems = ({
  categories,
  categoryLabels,
  activeCategory,
  setActiveCategory,
}) => {
  const orderedCategories = useMemo(() => {
    const otherCategories = categories.filter((cat) => cat !== "all");
    return ["all", ...otherCategories];
  }, [categories]);

  return (
    <nav
      dir="rtl"
      className="flex items-center gap-1.5 sm:gap-2 md:gap-3 px-2 sm:px-3 md:px-4 py-3 sm:py-4 md:py-6 bg-primary-light rounded-[12px] sm:rounded-[16px] md:rounded-[20px] overflow-x-auto hidden-scroll"
      role="navigation"
      aria-label="قائمة التنقل"
    >
      {orderedCategories.map((category) => {
        const isActive = activeCategory === category;
        const label = categoryLabels[category] || category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`px-3.5 sm:px-5 md:px-8 lg:px-10 py-2 sm:py-3 md:py-4 rounded-[10px] sm:rounded-[14px] md:rounded-[20px] inline-flex items-center justify-center transition-colors whitespace-nowrap flex-shrink-0 ${isActive ? "bg-primary" : "bg-white/0 hover:bg-white/60"
              }`}
            aria-current={isActive ? "page" : undefined}
          >
            <span
              className={`text-center text-xs sm:text-sm md:text-base lg:text-lg leading-5 font-medium ${isActive ? "text-white" : "text-text"
                }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export const QuestionAccordion = ({ item }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-white rounded-lg sm:rounded-xl md:rounded-[24px] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`w-full text-right p-3 sm:p-4 md:p-5 flex items-center justify-between gap-3 transition ${open ? "bg-primary" : "bg-primary-light hover:bg-primary/10"
          }`}
      >
        <span
          className={`text-xs sm:text-sm md:text-lg leading-relaxed flex-1 ${open ? "text-white" : "text-[#2d2d2d]"
            }`}
        >
          {item.question}
        </span>

        <span
          className={`size-7 sm:size-9 md:size-10 flex items-center justify-center transition-transform flex-shrink-0 ${open ? "rotate-180" : ""
            }`}
          aria-hidden="true"
        >
          <svg
            width={20}
            height={20}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="sm:w-[22px] sm:h-[22px]"
          >
            <path
              d="M36.2502 31.1158C36.0372 31.3292 35.7842 31.4985 35.5057 31.6141C35.2272 31.7296 34.9286 31.7891 34.6271 31.7891C34.3256 31.7891 34.027 31.7296 33.7485 31.6141C33.47 31.4985 33.217 31.3292 33.004 31.1158L24.0713 22.1831L15.1386 31.1158C14.7082 31.5463 14.1243 31.7881 13.5156 31.7881C12.9068 31.7881 12.323 31.5463 11.8925 31.1158C11.462 30.6853 11.2202 30.1015 11.2202 29.4927C11.2202 28.8839 11.462 28.3001 11.8925 27.8696L22.4598 17.3023C22.6728 17.0889 22.9258 16.9196 23.2043 16.8041C23.4828 16.6885 23.7813 16.6291 24.0829 16.6291C24.3844 16.6291 24.6829 16.6885 24.9614 16.8041C25.24 16.9196 25.4929 17.0889 25.7059 17.3023L36.2732 27.8696C37.1481 28.7445 37.1481 30.2179 36.2502 31.1158Z"
              fill={open ? "white" : "black"}
            />
          </svg>
        </span>
      </button>

      {open && (
        <div className="p-3 sm:p-4 md:p-5 text-right text-text text-xs sm:text-sm md:text-base font-medium leading-relaxed md:leading-8 border border-t-0 border-zinc-300 rounded-b-lg sm:rounded-b-xl md:rounded-b-[20px]">
          {item.answer}
        </div>
      )}
    </div>
  );
};