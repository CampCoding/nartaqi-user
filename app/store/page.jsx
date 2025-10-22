"use client";

import React, { useState, useRef, useEffect } from "react";
import PagesBanner from "../../components/ui/PagesBanner";
import { ProductCard } from "../../components/Store/ProductCard";
import { FiltersIcon } from "../../public/svgs";
import { ChevronLeft } from "lucide-react";
import Container from "../../components/ui/Container";
import { BottomDrawer } from "../../components/ui/BottomDrawer";
import { PoliciesSections } from "../conditions-and-privacy/page";
import cx from "../../lib/cx";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const Store = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");
  const [priceRange, setPriceRange] = useState(280);
  const [sortBy, setSortBy] = useState("الأحدث أولا");
  
  const categories = [
    { id: "all", label: "الكل" },
    { id: "books", label: "الكتب" },
    { id: "courses", label: "الدورات" },
    { id: "bags", label: "الحقائب" },
  ];

  // Sample product data with proper structure
  const products = [
    { id: 1, image: "FRAME (5).png", category: "bags", title: "حقيبة أنيقة", price: 150, rating: 4.5, date: "2024-01-15" },
    { id: 2, image: "books.png", category: "books", title: "كتاب البرمجة", price: 80, rating: 4.8, date: "2024-01-20" },
    { id: 3, image: "FRAME (7).png", category: "books", title: "كتاب الرياضيات", price: 120, rating: 4.2, date: "2024-01-18" },
    { id: 4, image: "FRAME (8).png", category: "tools", title: "أدوات مكتبية", price: 60, rating: 4.0, date: "2024-01-22" },
    { id: 5, image: "teacher-course-banner.png", category: "courses", title: "دورة تطوير الويب", price: 200, rating: 4.9, date: "2024-01-10" },
    { id: 6, image: "FRAME (5).png", category: "bags", title: "حقيبة سفر", price: 180, rating: 4.3, date: "2024-01-25" },
    { id: 7, image: "books.png", category: "books", title: "كتاب الذكاء الاصطناعي", price: 90, rating: 4.7, date: "2024-01-12" },
    { id: 8, image: "FRAME (7).png", category: "books", title: "كتاب الفيزياء", price: 110, rating: 4.1, date: "2024-01-28" },
    { id: 9, image: "FRAME (8).png", category: "tools", title: "أدوات الرسم", price: 45, rating: 3.9, date: "2024-01-30" },
    { id: 10, image: "teacher-course-banner.png", category: "courses", title: "دورة التصميم", price: 250, rating: 4.6, date: "2024-01-05" },
    { id: 11, image: "FRAME (5).png", category: "bags", title: "حقيبة يد", price: 70, rating: 4.4, date: "2024-01-08" },
    { id: 12, image: "books.png", category: "books", title: "كتاب الكيمياء", price: 95, rating: 4.3, date: "2024-01-14" },
    { id: 13, image: "FRAME (7).png", category: "books", title: "كتاب الأحياء", price: 85, rating: 4.0, date: "2024-01-16" },
    { id: 14, image: "FRAME (8).png", category: "tools", title: "أدوات الكتابة", price: 35, rating: 3.8, date: "2024-01-24" },
    { id: 15, image: "teacher-course-banner.png", category: "courses", title: "دورة التسويق", price: 180, rating: 4.5, date: "2024-01-02" },
  ];

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      // Category filter
      if (selectedCategoryId !== "all" && product.category !== selectedCategoryId) {
        return false;
      }
      // Price filter
      if (product.price > priceRange) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "الأحدث أولا":
          return new Date(b.date) - new Date(a.date);
        case "الأقدم أولا":
          return new Date(a.date) - new Date(b.date);
        case "الأعلى تقييما":
          return b.rating - a.rating;
        case "الأقل سعرا":
          return a.price - b.price;
        default:
          return 0;
      }
    });

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
      <Container className="mt-[48px] ">
        <StoreHeaderMobile 
          rootClassName={"lg:hidden"} 
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <div
          className="py-6 sticky top-[83px] md:top-[112px] z-30 bg-white lg:hidden"
          dir="rtl"
        >
          <Swiper
            modules={[FreeMode]}
            freeMode={{ enabled: true, sticky: false, momentumBounce: true }}
            slidesPerView="auto"
            spaceBetween={12}
            className="!px-1"
          >
            {categories.map((cat) => {
              const isActive = selectedCategoryId === cat.id;
              return (
                <SwiperSlide key={cat.id} className="!w-auto">
                  <button
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={cx(
                      "px-4 py-2 rounded-full border transition-colors",
                      isActive
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-text border-zinc-200 hover:border-zinc-300"
                    )}
                    aria-pressed={isActive}
                  >
                    {cat.label}
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[379px_auto] gap-6 mb-[56px] ">
          <SideNav 
            rootClassName={"hidden lg:inline-flex"} 
            selectedCategoryId={selectedCategoryId}
            setSelectedCategoryId={setSelectedCategoryId}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          <section className=" grid grid-cols-1  sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-6">
            {filteredProducts.map((product) => {
              return <ProductCard data={product} key={product.id} />;
            })}
          </section>
        </div>
      </Container>
    </div>
  );
};

export default Store;

const SideNav = ({ 
  rootClassName, 
  selectedCategoryId, 
  setSelectedCategoryId, 
  priceRange, 
  setPriceRange, 
  sortBy, 
  setSortBy 
}) => {
  return (
    <nav
      className={cx(
        "  flex-col  gap-12 px-8 py-12 relative bg-primary-light rounded-[30px]",
        rootClassName
      )}
      role="navigation"
      aria-label="قائمة شروط الاستخدام"
    >
      <FrameExtra 
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
      />

      <PriceRange 
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />

      <SortBy 
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </nav>
  );
};

export const FrameExtra = ({ selectedCategoryId, setSelectedCategoryId }) => {
  const categories = [
    { id: "all", label: "الكل" },
    { id: "books", label: "الكتب" },
    { id: "courses", label: "الدورات" },
    { id: "bags", label: "الحقائب" },
  ];

  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId);
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
                  checked={selectedCategoryId === category.id}
                  onChange={() => {
                    handleCategoryChange(category.id);
                  }}
                  className="sr-only"
                  aria-label={`اختر ${category.label}`}
                />
                <div
                  className={`relative w-4 h-4 rounded cursor-pointer ${
                    selectedCategoryId === category.id
                      ? "bg-primary"
                      : "border border-solid border-zinc-900"
                  }`}
                >
                  {selectedCategoryId === category.id && (
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

export const PriceRange = ({ priceRange, setPriceRange }) => {
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
    setPriceRange(newValue);
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
      setPriceRange((prev) => Math.min(maxValue, prev + 10));
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      // في RTL السهم لليمين ينقص
      setPriceRange((prev) => Math.max(0, prev - 10));
    }
  };

  const currentPrice = Math.round((priceRange / maxValue) * 100);

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
          النطاق السعري{" "}
          <span className="text-text-alt text-base mx-3 ">
            {" "}
            ({priceRange.toFixed("0")} ر.س )
          </span>
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
          aria-valuemax="280"
          aria-valuenow={currentPrice}
          aria-label={`النطاق السعري: ${currentPrice} ريال سعودي`}
          tabIndex="0"
          onKeyDown={handleSliderKeyDown}
        >
          <div
            className="h-2 bg-blue-700 rounded-full ml-auto"
            style={{ width: `${(priceRange / maxValue) * 100}%` }}
          />
        </div>

        {/* Handle */}
        <div
          className="absolute w-5 h-5 top-[4px] bg-white rounded-full border-2 border-primary cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
          style={{
            right: `${(priceRange / maxValue) * 280 - 10}px`,
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
        <span className="text-text-alt text-sm">280 ر.س</span>
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

export const SortBy = ({ sortBy, setSortBy }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    "الأحدث أولا",
    "الأقدم أولا",
    "الأعلى تقييما",
    "الأقل سعرا",
  ];

  const handleOptionSelect = (option) => {
    setSortBy(option);
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
                    aria-selected={sortBy === option}
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
              {sortBy}
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

export const StoreHeaderMobile = ({ 
  rootClassName, 
  priceRange, 
  setPriceRange, 
  sortBy, 
  setSortBy 
}) => {
  const [openDrawer, serOpenDrawer] = useState(false);
  return (
    <div className={rootClassName}>
      <header className="flex items-center justify-between ">
        <FiltersIcon
          onClick={() => serOpenDrawer(true)}
          className="w-10 h-10 p-1 cursor-pointer hover:bg-neutral-200 transition-all active:border active:border-neutral-400   active:bg-neutral-300 rounded-full"
        />

        <h2 className="font-bold">المتجر</h2>
        <div></div>
      </header>

      <BottomDrawer open={openDrawer} setOpen={serOpenDrawer}>
        <div className="flex flex-col gap-10">
          <PriceRange 
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
          <SortBy 
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>
      </BottomDrawer>
    </div>
  );
};
