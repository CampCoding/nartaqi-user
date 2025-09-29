"use client";

import React, { useState, useRef, useEffect } from "react";
import PagesBanner from "../../components/ui/PagesBanner";
import { ProductCard } from "../../components/Store/ProductCard";

const Store = () => {
  return (
    <div>
      <PagesBanner
        variant="normal"
        objectPosition={"object-[50%_80%]"}
        title={"متجر الكتب"}
        image={"/images/Frame 1000004928.png"}
        breadcrumb={[
          {
            title: "الرئيسية",
            link: "/",
          },
          {
            title: "متجر الكتب",
            link: "/",
          },
        ]}
      />

      <div className="container mx-auto px-[64px] mt-[48px]  ">
        <div className="grid grid-cols-[379px_auto] gap-6 mb-[56px] ">
          <SideNav />
          <section className=" grid grid-cols-3 mx-auto gap-x-4 gap-y-6" >
            {
              [
                "FRAME (5).png",
                "FRAME (6).png",
                "FRAME (7).png",
                "FRAME (8).png",
                "FRAME (9).png",
                "FRAME (5).png",
                "FRAME (6).png",
                "FRAME (7).png",
                "FRAME (8).png",
                "FRAME (9).png",
                "FRAME (5).png",
                "FRAME (6).png",
                "FRAME (7).png",
                "FRAME (8).png",
                "FRAME (9).png",
              ].map((item , index)=>{
                return (

                  <ProductCard data={item} key={index} />
                )
              })
            }
           
          </section>
          {/* <PoliciesSections /> */}
        </div>
      </div>
    </div>
  );
};

export default Store;



const SideNav = () => {
 

  return (
    <nav
      className="  inline-flex flex-col  gap-12 px-8 py-12 relative bg-primary-light rounded-[30px]"
      role="navigation"
      aria-label="قائمة شروط الاستخدام"
    >
      <FrameExtra />

      <PriceRange />

      <SortBy />
    </nav>
  );
};

export const FrameExtra = () => {
  const [selectedCategory, setSelectedCategory] = useState("الكتب");

  const categories = [
    { id: "all", label: "الكل", isSelected: true },
    { id: "books", label: "الكتب", isSelected: false },
    { id: "courses", label: "الدورات", isSelected: false },
    { id: "bags", label: "الحقائب", isSelected: false },
  ];

  const handleCategoryChange = (categoryId, categoryLabel) => {
    setSelectedCategory(categoryLabel);
  };

  return (
    <div className="inline-flex flex-col items-start gap-6 relative">
      <div className="flex w-[280px] items-center justify-start relative">
        <h2 className="self-stretch  font-bold text-primary text-2xl tracking-[0] leading-6 relative w-fit text-left whitespace-nowrap ">
          الفئات
        </h2>
      </div>
      <div
        className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto]"
        role="group"
        aria-labelledby="categories-heading"
      >
        {categories.map((category, index) => (
          <div
            key={category.id}
            className="flex w-[280px] h-5 items-center justify-start gap-2 relative"
          >
            <label className="flex gap-[8px] items-center relative flex-[0_0_auto] cursor-pointer">
              <div className="relative">
                <input
                  type="radio"
                  name="category"
                  value={category.id}
                  checked={selectedCategory === category.label}
                  onChange={() => {
                    handleCategoryChange(category.id, category.label);
                    console.log(category.id, "__", category.label);
                  }}
                  className="sr-only"
                  aria-label={`اختر ${category.label}`}
                />
                <div
                  className={`relative w-4 h-4 rounded cursor-pointer ${
                    selectedCategory === category.label
                      ? "bg-primary"
                      : "border border-solid border-zinc-900"
                  }`}
                >
                  {selectedCategory === category.label && (
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 4C0 1.79086 1.79086 0 4 0H12C14.2091 0 16 1.79086 16 4V12C16 14.2091 14.2091 16 12 16H4C1.79086 16 0 14.2091 0 12V4Z"
                        fill="#3B82F6"
                      />
                      <path
                        d="M3 7.5C4.5621 9.0621 7 11.5 7 11.5L13.5 5"
                        stroke="white"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <div
                className={`${
                  index === 0
                    ? "self-stretch  text-text-duplicate text-base leading-5 relative w-fit text-left whitespace-nowrap "
                    : "mt-[-2.00px] mb-[-2.00px]  font-semibold text-text-duplicate text-base tracking-[0] leading-6 overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] relative w-fit text-left whitespace-nowrap "
                }`}
              >
                {category.label}
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PriceRange = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const maxValue = 280;
  const trackRef = useRef(null);

  const updateValueFromPosition = (clientX) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    // ✅ عكس الحساب للـ RTL
    const newValue = (1 - percentage) * maxValue;
    setSliderValue(newValue);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateValueFromPosition(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging) updateValueFromPosition(e.clientX);
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleSliderKeyDown = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      // في RTL السهم لليسار يزيد
      setSliderValue((prev) => Math.min(maxValue, prev + 10));
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      // في RTL السهم لليمين ينقص
      setSliderValue((prev) => Math.max(0, prev - 10));
    }
  };

  const currentPrice = Math.round((sliderValue / maxValue) * 100);

  return (
    <div
      className="relative w-[280px] h-[76px] select-none"
      role="group"
      aria-labelledby="price-range-title"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      dir="rtl"
    >
      {/* Title */}
      <div className="flex w-[280px] h-6 items-center justify-start mb-4">
        <h2 id="price-range-title" className="font-bold text-primary text-2xl">
          النطاق السعري
        </h2>
      </div>

      <div className="relative h-[25px]">
        {/* Track */}
        <div
          ref={trackRef}
          className="absolute w-[280px] h-2 top-[10px] left-0   bg-blue-400/50 rounded-full cursor-pointer"
          onMouseDown={handleMouseDown}
          role="slider"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={currentPrice}
          aria-label={`النطاق السعري: ${currentPrice} ريال سعودي`}
          tabIndex="0"
          onKeyDown={handleSliderKeyDown}
        >
          <div
            className="h-2 bg-blue-700 rounded-full ml-auto"
            style={{ width: `${(sliderValue / maxValue) * 100}%` }}
          />
        </div>

        {/* Handle */}
        <div
          className="absolute w-5 h-5 top-[4px] bg-white rounded-full border-2 border-primary cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
          style={{
            right: `${(sliderValue / maxValue) * 280 - 10}px`,
          }}
          onMouseDown={handleMouseDown}
          tabIndex="0"
          role="button"
          aria-label={`مقبض التحكم في السعر: ${currentPrice} ريال سعودي`}
          onKeyDown={handleSliderKeyDown}
        />
      </div>
      {/* Labels */}
      <div className="flex w-[280px] h-5 items-start justify-between ">
        <span className="text-text-alt text-sm">0 ر.س</span>
        <span className="text-text-alt text-sm">100 ر.س</span>
      </div>
    </div>
  );
};

const H69 = (props) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="#71717A"
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SortBy = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("الأحدث أولا");

  const sortOptions = [
    "الأحدث أولا",
    "الأقدم أولا",
    "الأعلى تقييما",
    "الأقل سعرا",
  ];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="inline-flex flex-col items-start gap-4 relative">
      <div className="flex w-[280px] h-6 items-center justify-start relative">
        <div className="self-stretch  text-primary text-2xl relative w-fit text-left leading-6 whitespace-nowrap ">
          فرز حسب
        </div>
      </div>
      <div className="relative w-[280px] h-10">
        {isOpen && (
          <div className="absolute top-full left-0 w-full mt-1 bg-white border border-zinc-200 rounded-md shadow-lg z-10">
            <ul role="listbox" className="py-1">
              {sortOptions.map((option, index) => (
                <li key={index}>
                  <button
                    className="w-full px-[13px] py-2 text-right hover:bg-gray-50 focus:bg-gray-50 focus:outline-none  font-semibold text-text text-base "
                    onClick={() => handleOptionSelect(option)}
                    role="option"
                    aria-selected={selectedOption === option}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          className="flex items-center justify-between px-[13px] py-[9px] bg-white rounded-md border border-solid border-zinc-200 relative w-[280px] h-10 cursor-pointer hover:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          role="combobox"
        >
          <div className="inline-flex h-5 items-center relative flex-[0_0_auto]">
            <div className="mt-[-2.00px] mb-[-2.00px]  font-semibold text-text text-base tracking-[0] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] relative w-fit text-left leading-6 whitespace-nowrap ">
              {selectedOption}
            </div>
          </div>
          <div className="relative w-4 h-4">
            <H69 />
          </div>
        </button>
      </div>
    </div>
  );
};
