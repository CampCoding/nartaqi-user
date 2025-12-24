"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import CourseCard from "./../ui/Cards/CourseCard";
import { ProductCard } from "./../Store/ProductCard";
import { BlogCard } from "./../ui/Cards/BlogCard";
import Link from "next/link";

import { motion } from "framer-motion";
import cx from "../../lib/cx";
import { LecturerCard } from "../ui/Cards/LicturerCard";

import { useSelector } from "react-redux";
import useGeneralSearch from "../shared/Hooks/useGeneralSearch";

const SearchBanner = ({ openSearch, setOpenSearch }) => {
  const [textSearch, setTextSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // all | rounds | teachers | stores | blogs

  // ✅ Get token (adjust if you use next-auth)
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (openSearch) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openSearch]);

  const handleSearch = (q) => {
    setTextSearch(q);
    setActiveTab("all");
  };

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  const formVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0.2, ease: "easeOut" },
    },
  };

  // scroll detection
  const containerRef = useRef(null);
  const [scrolled400, setScrolled400] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => setScrolled400(el.scrollTop >= 200);
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ Call API when textSearch changes
  const { rounds, teachers, blogs, stores, loading, error, refetch } =
    useGeneralSearch({
      token,
      search: textSearch,
      enabled: !!openSearch, // only when banner open
    });

  const totalResults = useMemo(() => {
    return (
      (rounds?.length || 0) +
      (teachers?.length || 0) +
      (stores?.length || 0) +
      (blogs?.length || 0)
    );
  }, [rounds, teachers, stores, blogs]);

  const shouldShowRounds = activeTab === "all" || activeTab === "rounds";
  const shouldShowTeachers = activeTab === "all" || activeTab === "teachers";
  const shouldShowStores = activeTab === "all" || activeTab === "stores";
  const shouldShowBlogs = activeTab === "all" || activeTab === "blogs";

  return (
    <motion.main
      ref={containerRef}
      key="search-banner"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed z-50 inset-0 !overflow-y-auto bg-white"
    >
      <div
        className={`${
          !textSearch ? "h-[100svh] lg:h-screen" : "h-[50vh] lg:h-[calc(70vh)]"
        } flex items-center transition-all duration-500 justify-center left-0 right-0 bg-black/25`}
        style={{
          backgroundImage: "url('/images/search-banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          onClick={() => setOpenSearch(false)}
          className={cx(
            "cursor-pointer z-50 fixed top-6 right-6 lg:top-[107px] lg:right-[74px] p-2 ",
            scrolled400
              ? "bg-white rounded-full w-10 shadow-2xl h-10 flex items-center justify-center border border-red-500 "
              : ""
          )}
        >
          <XIcon stroke={scrolled400 ? "red" : "white"} />
        </div>

        <motion.div
          variants={formVariants}
          className="w-full flex items-center justify-center"
        >
          <Searchform onSearchClick={handleSearch} />
        </motion.div>
      </div>

      {textSearch && (
        <div className="container max-w-[1312px] mx-auto px-4 lg:px-0 mt-8 lg:mt-[48px] mb-24 lg:mb-[200px]">
          <div className="text-right justify-start text-text text-2xl lg:text-3xl font-bold">
            نتائج البحث ({loading ? "..." : totalResults})
          </div>

          <div className="mt-4 lg:mt-[24px] mb-8 lg:mb-[48px]">
            <Navs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              counts={{
                all: totalResults,
                rounds: rounds?.length || 0,
                teachers: teachers?.length || 0,
                stores: stores?.length || 0,
                blogs: blogs?.length || 0,
              }}
            />
          </div>

          {/* Loading / Error */}
          {loading && (
            <div className="mt-6 text-center text-gray-500">جاري البحث...</div>
          )}

          {error && !loading && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              حدث خطأ أثناء البحث.
              <button
                onClick={() => refetch()}
                className="ms-3 underline font-semibold"
              >
                إعادة المحاولة
              </button>
            </div>
          )}

          {!loading && !error && totalResults === 0 && (
            <p className="mt-8 text-center text-gray-400">لا توجد نتائج مطابقة.</p>
          )}

          {/* Results */}
          {!loading && !error && totalResults > 0 && (
            <div className="flex flex-col gap-10 lg:gap-[63px]">
              {shouldShowRounds && <Courses rounds={rounds} />}
              {shouldShowTeachers && <Lecturers teachers={teachers} />}
              {shouldShowStores && <BooksAndBags stores={stores} />}
              {shouldShowBlogs && <Blogs blogs={blogs} />}
            </div>
          )}
        </div>
      )}
    </motion.main>
  );
};

export default SearchBanner;

// ----------------------------
// Search Form
// ----------------------------
export const Searchform = ({ onSearchClick }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => setSearchValue(e.target.value);

  const handleSearchSubmit = () => onSearchClick(searchValue);

  return (
    <div className="w-full px-4 lg:px-0 lg:w-auto flex flex-col lg:flex-row justify-start items-center gap-4 lg:gap-2">
      <div className="w-full lg:w-[732px] p-4 lg:p-8 bg-gray-50 rounded-[20px] lg:rounded-[30px] flex justify-start items-center gap-4">
        <div className="flex justify-start w-full items-center gap-2">
          <SearchIcon />
          <input
            onChange={handleSearchChange}
            value={searchValue}
            className="text-right justify-start text-text placeholder:!text-text-alt flex-1 w-full text-sm lg:text-base font-semibold bg-transparent focus:outline-none"
            placeholder="ابحث عن دورة، مدرب، أو موضوع…"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearchSubmit();
            }}
          />
        </div>
      </div>

      <div
        onClick={handleSearchSubmit}
        className="w-full lg:w-auto px-12 py-4 lg:py-6 cursor-pointer hover:bg-primary-dark transition bg-primary rounded-[20px] lg:rounded-[30px] inline-flex flex-col justify-center items-center"
      >
        <div className="self-stretch text-center justify-start text-white text-lg lg:text-2xl font-bold">
          بحث
        </div>
      </div>
    </div>
  );
};

// ----------------------------
// Sections (Dynamic)
// ----------------------------
const Courses = ({ rounds = [] }) => {
  if (!rounds.length) return null;

  return (
    <div>
      <div className="self-stretch text-right justify-start text-text text-xl lg:text-2xl font-bold">
        دورات
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-[48px] gap-y-6 lg:gap-y-[28px] mt-6">
        {rounds.map((course) => {
          const payload = {
            ...course,
            id: course?.id,
            name: course?.name,
            description: course?.description,
            image_url: course?.image_url || course?.image || "",
            start_date: course?.start_date,
            free: course?.free,
            price: course?.price,
            enrolled: course?.own,
            favorite: course?.fav,
            roundBook: course?.round_book,
            roundBookUrl: course?.round_book_url,
            roundRoadMapBook: course?.round_road_map_book,
            roundRoadMapBookUrl: course?.round_road_map_book_url,
            rating: course?.average_rating,
            totalRates: course?.ratings_count,
            capacity: course?.capacity,
            teachers: course?.teachers,
            course: { name: course?.category_parts_name },
            teacher: (course?.teachers || []).map((t) => ({
              name: t?.name,
              image_url: t?.image_url || t?.image,
            })),
          };

          return <CourseCard key={course?.id} freeWidth payload={payload} />;
        })}
      </div>
    </div>
  );
};

const Lecturers = ({ teachers = [] }) => {
  if (!teachers.length) return null;

  return (
    <div>
      <div className="self-stretch text-right justify-start text-text text-xl lg:text-2xl font-bold">
        محاضرين
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 lg:gap-x-[29px] gap-y-6 lg:gap-y-[28px] mt-6">
        {teachers.map((t) => (
          <LecturerCard
            key={t?.id}
            payload={{
              id: t?.id,
              name: t?.name,
              image_url: t?.image_url || t?.image,
              description: t?.description,
              gender: t?.gender,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const BooksAndBags = ({ stores = [] }) => {
  if (!stores.length) return null;

  return (
    <div>
      <div className="self-stretch text-right justify-start text-text text-xl lg:text-2xl font-bold">
        كتب وحقائب
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 lg:gap-x-[29px] gap-y-6 lg:gap-y-[28px] mt-6">
        {stores.map((item) => (
          <ProductCard
            key={item?.id}
            data={{
              ...item,
              image: item?.image,
              title: item?.title,
              description: item?.description,
              price: item?.price,
              category: item?.category,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Blogs = ({ blogs = [] }) => {
  if (!blogs.length) return null;

  return (
    <div>
      <div className="self-stretch text-right justify-start text-text text-xl lg:text-2xl font-bold">
        مدونات
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 lg:gap-x-[29px] gap-y-6 lg:gap-y-[28px] mt-6">
        {blogs.map((b) => (
          <Link href={`/blogs/blog-details/${b?.id || ""}`} key={b?.id || b?.title}>
            <BlogCard freeWidth={true} image={b?.image || "/images/FRAME.png"} />
          </Link>
        ))}
      </div>
    </div>
  );
};

// ----------------------------
// Tabs (Navs)
// ----------------------------
export const Navs = ({ activeTab, setActiveTab, counts }) => {
  const items = [
    { key: "all", text: `الكل (${counts?.all ?? 0})`, padding: "px-8 py-3 lg:px-16 lg:py-4" },
    { key: "rounds", text: `دورات (${counts?.rounds ?? 0})`, padding: "px-8 py-3 lg:px-16 lg:py-4" },
    { key: "teachers", text: `محاضرين (${counts?.teachers ?? 0})`, padding: "px-8 py-3 lg:px-16 lg:py-4" },
    { key: "stores", text: `كتب وحقائب (${counts?.stores ?? 0})`, padding: "px-6 py-3 lg:px-8 lg:py-4" },
    { key: "blogs", text: `مدونات (${counts?.blogs ?? 0})`, padding: "px-6 py-3 lg:px-8 lg:py-4" },
  ];

  return (
    <nav
      className="flex w-full items-center justify-between p-2 lg:p-4 relative bg-[#ebf3fe] rounded-[20px]"
      role="navigation"
    >
      <div className="flex-1 overflow-x-auto whitespace-nowrap hidden-scroll">
        <div className="inline-flex items-center">
          {items
            .slice() // avoid mutating
            .map((item) => {
              const isActive = item.key === activeTab;
              return (
                <div
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={`justify-center ${item.padding} rounded-[16px] inline-flex items-center cursor-pointer ${
                    isActive ? "bg-primary" : ""
                  }`}
                >
                  <div
                    className={`w-fit text-center leading-normal ${
                      isActive
                        ? "text-white text-base lg:text-xl font-bold"
                        : "text-[#2d2d2d] text-sm lg:text-base font-semibold"
                    }`}
                  >
                    {item.text}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div className="pl-3">
        <FilterIcon />
      </div>
    </nav>
  );
};

// ----------------------------
// Icons
// ----------------------------
const SearchIcon = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx={11}
      cy={11}
      r={8}
      stroke="#71717A"
      strokeWidth={1.33333}
      strokeLinejoin="round"
    />
    <path
      d="M20.9992 20.9992L16.6992 16.6992"
      stroke="#71717A"
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const XIcon = (props) => (
  <svg
    className="w-6 h-6 lg:w-8 lg:h-8"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2 30L16 16M16 16L30 2M16 16L2 2M16 16L30 30"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FilterIcon = (props) => (
  <svg
    width={32}
    height={33}
    viewBox="0 0 32 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 8.83594H26M9.33333 15.5026H22.6667M13.3333 22.1693H18.6667"
      stroke="#152E56"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
