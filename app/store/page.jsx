// app/store/page.jsx

"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import PagesBanner from "../../components/ui/PagesBanner";
import { ProductCard } from "../../components/Store/ProductCard";
import { FiltersIcon } from "../../public/svgs";
import Container from "../../components/ui/Container";
import { BottomDrawer } from "../../components/ui/BottomDrawer";
import cx from "../../lib/cx";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { getStoreItems } from "@/components/utils/Store/Slices/storeSlice";
import Pagination from "../../components/ui/Pagination";

const Store = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { items, pagination, isLoading, error, highest_price } = useSelector(
    (state) => state.store
  );

  // ✅ Read initial values from URL
  const getInitialCategory = () => searchParams.get("category") || "all";
  const getInitialSort = () => {
    const sortMap = {
      newest: "الأحدث أولا",
      oldest: "الأقدم أولا",
      rating: "الأعلى تقييما",
      lowest_price: "الأقل سعرا",
      highest_price: "الأعلى سعرا",
    };
    return sortMap[searchParams.get("sort")] || "الأحدث أولا";
  };
  const getInitialPage = () => parseInt(searchParams.get("page")) || 1;
  const getInitialPrice = () => {
    const price = searchParams.get("maxPrice");
    return price ? parseFloat(price) : null;
  };

  const [selectedCategoryId, setSelectedCategoryId] = useState(getInitialCategory());
  const [priceRange, setPriceRange] = useState(getInitialPrice());
  const [sortBy, setSortBy] = useState(getInitialSort());
  const [currentPage, setCurrentPage] = useState(getInitialPage());
  const [isInitialized, setIsInitialized] = useState(false);
  const perPage = 12;

  // ✅ Get max price from API or default
  const maxPrice = highest_price ? parseFloat(highest_price) : 1000;

  // ✅ Initialize priceRange when highest_price loads
  useEffect(() => {
    if (highest_price && priceRange === null) {
      const urlPrice = getInitialPrice();
      setPriceRange(urlPrice !== null ? urlPrice : parseFloat(highest_price));
    }
  }, [highest_price]);

  const categories = [
    { id: "all", label: "الكل" },
    { id: "books", label: "الكتب" },
    { id: "rounds", label: "الدورات" },
    { id: "bags", label: "الحقائب" },
    { id: "accessories", label: "الأدوات" },
  ];

  const getSortValue = (sortLabel) => {
    const sortMap = {
      "الأحدث أولا": "newest",
      "الأقدم أولا": "oldest",
      "الأعلى تقييما": "rating",
      "الأقل سعرا": "lowest_price",
      "الأعلى سعرا": "highest_price",
    };
    return sortMap[sortLabel] || "newest";
  };

  // ✅ Update URL search params
  const updateSearchParams = useCallback(
    (updates) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "" || value === "all") {
          params.delete(key);
        } else if (key === "sort" && value === "newest") {
          params.delete(key); // Don't show default sort in URL
        } else if (key === "page" && value === 1) {
          params.delete(key); // Don't show page 1 in URL
        } else if (key === "maxPrice" && value >= maxPrice) {
          params.delete(key); // Don't show max price in URL
        } else {
          params.set(key, value.toString());
        }
      });

      const newUrl = params.toString() ? `?${params.toString()}` : "/store";
      router.push(newUrl, { scroll: false });
    },
    [searchParams, router, maxPrice]
  );

  // ✅ Fetch items
  const fetchItems = useCallback(
    (overridePrice, overridePage) => {
      const priceToUse = overridePrice !== undefined ? overridePrice : priceRange;
      const pageToUse = overridePage !== undefined ? overridePage : currentPage;

      dispatch(
        getStoreItems({
          perPage,
          page: pageToUse,
          category: selectedCategoryId !== "all" ? selectedCategoryId : "",
          sort: getSortValue(sortBy),
          maxPrice: priceToUse || undefined,
        })
      );
    },
    [dispatch, currentPage, selectedCategoryId, sortBy, priceRange]
  );

  // ✅ Initial fetch
  useEffect(() => {
    const initialCategory = getInitialCategory();
    const initialSort = getInitialSort();
    const initialPage = getInitialPage();
    const initialPrice = getInitialPrice();

    dispatch(
      getStoreItems({
        perPage,
        page: initialPage,
        category: initialCategory !== "all" ? initialCategory : "",
        sort: getSortValue(initialSort),
        maxPrice: initialPrice || undefined,
      })
    );

    setIsInitialized(true);
  }, [dispatch]);

  // ✅ Fetch when category or sort changes
  useEffect(() => {
    if (isInitialized && priceRange !== null) {
      fetchItems(priceRange, 1);
      setCurrentPage(1);
      updateSearchParams({
        category: selectedCategoryId,
        sort: getSortValue(sortBy),
        page: 1,
        maxPrice: priceRange,
      });
    }
  }, [selectedCategoryId, sortBy]);

  // ✅ Handle price change from slider (called only when drag ends)
  const handlePriceCommit = (newPrice) => {
    setPriceRange(newPrice);
    setCurrentPage(1);
    fetchItems(newPrice, 1);
    updateSearchParams({
      category: selectedCategoryId,
      sort: getSortValue(sortBy),
      page: 1,
      maxPrice: newPrice,
    });
  };

  // ✅ Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchItems(priceRange, page);
    updateSearchParams({
      category: selectedCategoryId,
      sort: getSortValue(sortBy),
      page: page,
      maxPrice: priceRange,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Handle category change
  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  // ✅ Handle sort change
  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  // ✅ Normalize item data
  const normalizeItem = (item) => {
    const isRound = item.teachers !== undefined;

    if (isRound) {
      return {
        id: item.id,
        type: "rounds",
        title: item.name,
        description: item.description,
        price: parseFloat(item.price),
        image: item.image_url,
        category: "rounds",
        rating: item.average_rating || 0,
        date: item.created_at,
        teacher: item.teachers?.[0]?.name,
        teacherImage: item.teachers?.[0]?.image_url,
        startDate: item.start_date,
        endDate: item.end_date,
        gender: item.gender,
        totalDays: item.total_days,
        totalHours: item.total_hours,
        capacity: item.capacity,
      };
    } else {
      return {
        id: item.id,
        type: item.category,
        title: item.name,
        description: item.description,
        price: parseFloat(item.price),
        image: item.image,
        category: item.category,
        rating: 0,
        date: item.created_at,
      };
    }
  };

  const getCategoryLabel = (category) => {
    const labels = {
      books: "كتاب",
      bags: "حقيبة",
      accessories: "أدوات",
      rounds: "دورة",
    };
    return labels[category] || category;
  };

  return (
    <div>
      <PagesBanner
        variant="normal"
        objectPosition={"object-[50%_80%]"}
        title={"متجر الكتب"}
        image={"/images/Frame 1000004928.png"}
        breadcrumb={[
          { title: "الرئيسية", link: "/" },
          { title: "متجر الكتب", link: "/store" },
        ]}
      />

      <Container className="mt-[48px]">
        <StoreHeaderMobile
          rootClassName={"lg:hidden"}
          priceRange={priceRange ?? maxPrice}
          onPriceCommit={handlePriceCommit}
          maxPrice={maxPrice}
          sortBy={sortBy}
          setSortBy={handleSortChange}
        />

        {/* Mobile Categories Swiper */}
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
                    onClick={() => handleCategoryChange(cat.id)}
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

        <div className="grid grid-cols-1 lg:grid-cols-[379px_auto] gap-6 mb-[56px]">
          <SideNav
            rootClassName={"hidden lg:inline-flex"}
            selectedCategoryId={selectedCategoryId}
            setSelectedCategoryId={handleCategoryChange}
            priceRange={priceRange ?? maxPrice}
            onPriceCommit={handlePriceCommit}
            maxPrice={maxPrice}
            sortBy={sortBy}
            setSortBy={handleSortChange}
            categories={categories}
          />

          <div className="flex flex-col gap-6">
            {/* Products Count */}
            <div className="flex items-center justify-between">
              <p className="text-text-alt text-sm">
                عرض {pagination.from || 0} - {pagination.to || 0} من{" "}
                {pagination.total || 0} منتج
              </p>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <p className="text-red-500 text-lg mb-4">{error}</p>
                  <button
                    onClick={() => fetchItems(priceRange)}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    إعادة المحاولة
                  </button>
                </div>
              </div>
            ) : items.length === 0 ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <img
                    src="/images/empty-box.png"
                    alt="لا توجد منتجات"
                    className="w-40 h-40 mx-auto mb-4 opacity-50"
                  />
                  <p className="text-text-alt text-lg">
                    لا توجد منتجات في هذه الفئة
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Products Grid */}
                <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-6">
                  {items.map((item, index) => {
                    const normalizedItem = normalizeItem(item);
                    return (
                      <ProductCard
                        key={`${normalizedItem.type}-${normalizedItem.id}-${index}`}
                        data={normalizedItem}
                        getCategoryLabel={getCategoryLabel}
                      />
                    );
                  })}
                </section>

                {/* Pagination */}
                {pagination.lastPage > 1 && (
                  <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.lastPage}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Store;

// ==================== SIDE NAV ====================
const SideNav = ({
  rootClassName,
  selectedCategoryId,
  setSelectedCategoryId,
  priceRange,
  onPriceCommit,
  maxPrice,
  sortBy,
  setSortBy,
  categories,
}) => {
  return (
    <nav
      className={cx(
        "flex-col gap-12 px-8 py-12 relative bg-primary-light rounded-[30px]",
        rootClassName
      )}
      role="navigation"
      aria-label="قائمة الفلاتر"
    >
      <FrameExtra
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
        categories={categories}
      />

      <PriceRange
        priceRange={priceRange}
        onPriceCommit={onPriceCommit}
        maxPrice={maxPrice}
      />

      <SortBy sortBy={sortBy} setSortBy={setSortBy} />
    </nav>
  );
};

// ==================== CATEGORIES ====================
export const FrameExtra = ({
  selectedCategoryId,
  setSelectedCategoryId,
  categories,
}) => {
  return (
    <div className="inline-flex flex-col items-start gap-6 relative">
      <div className="flex w-[280px] items-center justify-start relative">
        <h2 className="self-stretch font-bold text-primary text-2xl tracking-[0] leading-6 relative w-fit text-left whitespace-nowrap">
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
                  onChange={() => setSelectedCategoryId(category.id)}
                  className="sr-only"
                  aria-label={`اختر ${category.label}`}
                />
                <div
                  className={`relative w-4 h-4 rounded cursor-pointer ${selectedCategoryId === category.id
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
                className={`${index === 0
                    ? "self-stretch text-text-duplicate text-base leading-5 relative w-fit text-left whitespace-nowrap"
                    : "mt-[-2.00px] mb-[-2.00px] font-semibold text-text-duplicate text-base tracking-[0] leading-6 overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] relative w-fit text-left whitespace-nowrap"
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

// ==================== PRICE RANGE ====================
export const PriceRange = ({ priceRange, onPriceCommit, maxPrice }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [localValue, setLocalValue] = useState(priceRange);
  const trackRef = useRef(null);

  const maxValue = maxPrice || 280;

  useEffect(() => {
    if (!isDragging) {
      setLocalValue(priceRange);
    }
  }, [priceRange, isDragging]);

  const updateValueFromPosition = (clientX) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const newValue = Math.round((1 - percentage) * maxValue);
    setLocalValue(newValue);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateValueFromPosition(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      updateValueFromPosition(e.clientX);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      onPriceCommit(localValue);
    }
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    updateValueFromPosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      updateValueFromPosition(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      onPriceCommit(localValue);
    }
  };

  const handleSliderKeyDown = (e) => {
    const step = maxValue / 10;
    let newValue = localValue;

    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      newValue = Math.min(maxValue, localValue + step);
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      newValue = Math.max(0, localValue - step);
    }

    setLocalValue(Math.round(newValue));
  };

  const handleSliderKeyUp = (e) => {
    if (["ArrowLeft", "ArrowDown", "ArrowRight", "ArrowUp"].includes(e.key)) {
      onPriceCommit(localValue);
    }
  };

  const thumbPosition = (localValue / maxValue) * 280 - 10;

  return (
    <div
      className="relative w-[280px] h-[76px] select-none mt-8"
      role="group"
      aria-labelledby="price-range-title"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      dir="rtl"
    >
      <div className="flex w-[280px] h-6 items-center justify-start mb-4">
        <h2 id="price-range-title" className="font-bold text-primary text-2xl">
          النطاق السعري
          <span className="text-text-alt text-base mx-3">
            ({Math.round(localValue)} ر.س)
          </span>
        </h2>
      </div>

      <div className="relative h-[25px]">
        <div
          ref={trackRef}
          className="absolute w-[280px] h-2 top-[10px] left-0 bg-blue-400/50 rounded-full cursor-pointer"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          role="slider"
          aria-valuemin="0"
          aria-valuemax={maxValue}
          aria-valuenow={Math.round(localValue)}
          aria-label={`النطاق السعري: ${Math.round(localValue)} ريال سعودي`}
          tabIndex="0"
          onKeyDown={handleSliderKeyDown}
          onKeyUp={handleSliderKeyUp}
        >
          <div
            className="h-2 bg-blue-700 rounded-full ml-auto transition-all duration-75"
            style={{ width: `${(localValue / maxValue) * 100}%` }}
          />
        </div>

        <div
          className={cx(
            "absolute w-5 h-5 top-[4px] bg-white rounded-full border-2 border-primary cursor-grab focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 transition-transform",
            isDragging && "cursor-grabbing scale-110"
          )}
          style={{
            right: `${Math.max(0, Math.min(270, thumbPosition))}px`,
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          tabIndex="0"
          role="button"
          aria-label="مقبض التحكم في السعر"
          onKeyDown={handleSliderKeyDown}
          onKeyUp={handleSliderKeyUp}
        />
      </div>

      <div className="flex w-[280px] h-5 items-start justify-between">
        <span className="text-text-alt text-sm">0 ر.س</span>
        <span className="text-text-alt text-sm">{Math.round(maxValue)} ر.س</span>
      </div>
    </div>
  );
};

// ==================== SORT BY ====================
export const SortBy = ({ sortBy, setSortBy }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    "الأحدث أولا",
    "الأقدم أولا",
    "الأعلى تقييما",
    "الأقل سعرا",
    "الأعلى سعرا",
  ];

  const handleOptionSelect = (option) => {
    setSortBy(option);
    setIsOpen(false);
  };

  return (
    <div className="inline-flex flex-col items-start gap-4 relative mt-8">
      <div className="flex w-[280px] h-6 items-center justify-start relative">
        <div className="self-stretch text-primary text-2xl relative w-fit text-left leading-6 whitespace-nowrap font-bold">
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
                    className={cx(
                      "w-full px-[13px] py-2 text-right hover:bg-gray-50 focus:bg-gray-50 focus:outline-none font-semibold text-base",
                      sortBy === option
                        ? "text-primary bg-primary-light"
                        : "text-text"
                    )}
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
            <div className="mt-[-2.00px] mb-[-2.00px] font-semibold text-text text-base tracking-[0] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] relative w-fit text-left leading-6 whitespace-nowrap">
              {sortBy}
            </div>
          </div>
          <div className="relative w-4 h-4">
            <ChevronIcon isOpen={isOpen} />
          </div>
        </button>
      </div>
    </div>
  );
};

const ChevronIcon = ({ isOpen }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cx("transition-transform", isOpen && "rotate-180")}
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

// ==================== MOBILE HEADER ====================
export const StoreHeaderMobile = ({
  rootClassName,
  priceRange,
  onPriceCommit,
  maxPrice,
  sortBy,
  setSortBy,
}) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div className={rootClassName}>
      <header className="flex items-center justify-between">
        <FiltersIcon
          onClick={() => setOpenDrawer(true)}
          className="w-10 h-10 p-1 cursor-pointer hover:bg-neutral-200 transition-all active:border active:border-neutral-400 active:bg-neutral-300 rounded-full"
        />
        <h2 className="font-bold">المتجر</h2>
        <div></div>
      </header>

      <BottomDrawer open={openDrawer} setOpen={setOpenDrawer}>
        <div className="flex flex-col gap-10">
          <PriceRange
            priceRange={priceRange}
            onPriceCommit={onPriceCommit}
            maxPrice={maxPrice}
          />
          <SortBy sortBy={sortBy} setSortBy={setSortBy} />
        </div>
      </BottomDrawer>
    </div>
  );
};