"use client";

import React, { useEffect, useRef, useState } from "react";
import CourseCard from "./../ui/Cards/CourseCard";
import LicturerCard from "./../ui/Cards/LicturerCard";
import { ProductCard } from "./../Store/ProductCard";
import { BlogCard } from "./../ui/Cards/BlogCard";
import { ImageOff } from "lucide-react";
import Link from "next/link";
// Import framer-motion
import { motion, AnimatePresence } from "framer-motion";
import cx from "../../lib/cx";

// You will wrap your component with <AnimatePresence> in the parent.
// See "How to Use It" section below.

const SearchBanner = ({ openSearch, setOpenSearch }) => {
  const [textSearch, setTextSearch] = useState("");

  useEffect(() => {
    if (openSearch) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openSearch]);

  // The conditional rendering is now handled by AnimatePresence in the parent component.
  // We no longer need: if (!openSearch) return null;

  const handleSearch = (e) => {
    setTextSearch(e);
  };

  // Animation variants for the main overlay
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  // Animation variants for the search form container
  const formVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0.2, ease: "easeOut" },
    },
  };

  // here i want to detect if scrolled to 400px from top
  const containerRef = useRef(null);
  const [scrolled400, setScrolled400] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      setScrolled400(el.scrollTop >= 200);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    // Initialize state based on current scroll
    onScroll();

    return () => {
      el.removeEventListener("scroll", onScroll);
    };
  }, [containerRef]);

  return (
    // Wrap the entire component with motion.main and apply variants
    <motion.main
      ref={containerRef}
      key="search-banner"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed z-50 inset-0 !overflow-y-auto bg-white"
    >
      {/* Example usage: you can use `scrolled400` to toggle styles/UI */}
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
            scrolled400 ? "bg-white rounded-full w-10 shadow-2xl h-10 flex items-center justify-center border border-red-500 " : ""
          )}
        >
          <XIcon stroke={scrolled400 ? "red" : "white"} />
        </div>
        {/* Animate the search form as well for a staggered effect */}
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
            نتائج البحث (23)
          </div>
          <div className="mt-4 lg:mt-[24px] mb-8 lg:mb-[48px]">
            <Navs />
          </div>
          <div className="flex flex-col gap-10 lg:gap-[63px]">
            <Courses />
            <Lecturers />
            <BooksAndBags />
            <Blogs />
          </div>
        </div>
      )}
    </motion.main>
  );
};

export default SearchBanner;

// --- NO CHANGES NEEDED FOR THE REST OF THE COMPONENTS ---

export const Searchform = ({ onSearchClick }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = () => {
    onSearchClick(searchValue);
  };

  return (
    <div className="w-full px-4 lg:px-0 lg:w-auto flex flex-col lg:flex-row justify-start items-center gap-4 lg:gap-2">
      {" "}
      <div className="w-full lg:w-[732px] p-4 lg:p-8 bg-gray-50 rounded-[20px] lg:rounded-[30px] flex justify-start items-center gap-4">
        {" "}
        <div className="flex justify-start w-full items-center gap-2">
          <SearchIcon />{" "}
          <input
            onChange={handleSearchChange}
            value={searchValue}
            className="text-right justify-start text-text placeholder:!text-text-alt flex-1 w-full text-sm lg:text-base font-semibold bg-transparent focus:outline-none"
            placeholder="ابحث عن دورة، مدرب، أو موضوع…"
          />{" "}
        </div>{" "}
      </div>{" "}
      <div
        onClick={handleSearchSubmit}
        className="w-full lg:w-auto px-12 py-4 lg:py-6 cursor-pointer hover:bg-primary-dark transition bg-primary rounded-[20px] lg:rounded-[30px] inline-flex flex-col justify-center items-center"
      >
        {" "}
        <div className="self-stretch text-center justify-start text-white text-lg lg:text-2xl font-bold">
          بحث{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

const SearchIcon = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {" "}
    <circle
      cx={11}
      cy={11}
      r={8}
      stroke="#71717A"
      strokeWidth={1.33333}
      strokeLinejoin="round"
    />{" "}
    <path
      d="M20.9992 20.9992L16.6992 16.6992"
      stroke="#71717A"
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />{" "}
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
    {" "}
    <path
      d="M2 30L16 16M16 16L30 2M16 16L2 2M16 16L30 30"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />{" "}
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
    {" "}
    <path
      d="M6 8.83594H26M9.33333 15.5026H22.6667M13.3333 22.1693H18.6667"
      stroke="#152E56"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />{" "}
  </svg>
);

const Courses = () => {
  return (
    <div>
      {" "}
      <div className="self-stretch text-right justify-start text-text text-xl lg:text-2xl font-bold ">
        دورات{" "}
      </div>{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-[48px] gap-y-6 lg:gap-y-[28px] mt-6">
        <CourseCard freeWidth />
        <CourseCard freeWidth />
        <CourseCard freeWidth />
        <CourseCard freeWidth />
        <CourseCard freeWidth />{" "}
      </div>{" "}
    </div>
  );
};

const Lecturers = () => {
  return (
    <div>
      {" "}
      <div className="self-stretch text-right justify-start text-text text-xl lg:text-2xl font-bold ">
        محاضرين{" "}
      </div>{" "}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 lg:gap-x-[29px] gap-y-6 lg:gap-y-[28px] mt-6">
        <LicturerCard />
        <LicturerCard />
        <LicturerCard />
        <LicturerCard />
        <LicturerCard />{" "}
      </div>{" "}
    </div>
  );
};

const BooksAndBags = () => {
  return (
    <div>
      {" "}
      <div className="self-stretch text-right justify-start text-text text-xl lg:text-2xl font-bold ">
        كتب وحقائب{" "}
      </div>{" "}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 lg:gap-x-[29px] gap-y-6 lg:gap-y-[28px] mt-6">
        {" "}
        {[
          "FRAME (5).png",
          "books.png",
          "FRAME (7).png",
          "FRAME (8).png",
          "FRAME (9).png",
          "FRAME (9).png",
        ].map((item, index) => (
          <ProductCard data={item} key={index} />
        ))}{" "}
      </div>{" "}
    </div>
  );
};

const Blogs = () => {
  return (
    <div>
      {" "}
      <div className="self-stretch text-right justify-start text-text text-xl lg:text-2xl font-bold ">
        مدونات{" "}
      </div>{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 lg:gap-x-[29px] gap-y-6 lg:gap-y-[28px] mt-6">
        {" "}
        {[
          "/images/FRAME (1).png",
          "/images/FRAME (2).png",
          "/images/FRAME.png",
          "/images/FRAME (1).png",
          "/images/FRAME (2).png",
          "/images/FRAME.png",
        ].map((item, index) => (
          <Link href={"/blogs/blog-details/123"} key={index}>
            <BlogCard freeWidth={true} image={item} />{" "}
          </Link>
        ))}{" "}
      </div>{" "}
    </div>
  );
};

export const Navs = () => {
  const navigationItems = [
    { text: "مدونات", padding: "px-6 py-3 lg:px-8 lg:py-4" },
    { text: "كتب وحقائب", padding: "px-6 py-3 lg:px-8 lg:py-4" },
    { text: "محاضرين", padding: "px-8 py-3 lg:px-16 lg:py-4" },
    { text: "دورات", padding: "px-8 py-3 lg:px-16 lg:py-4" },
    { text: "الكل", padding: "px-8 py-3 lg:px-16 lg:py-4", isActive: true },
  ];

  return (
    <nav
      className="flex w-full items-center justify-between p-2 lg:p-4 relative bg-[#ebf3fe] rounded-[20px]"
      role="navigation"
    >
      {" "}
      <div className="flex-1 overflow-x-auto whitespace-nowrap">
        {" "}
        <div className="inline-flex items-center">
          {" "}
          {navigationItems.reverse().map((item, index) => (
            <div
              key={index}
              className={`justify-center ${
                item.padding
              } rounded-[16px] inline-flex items-center cursor-pointer ${
                item.isActive ? "bg-primary" : ""
              }`}
            >
              {" "}
              <div
                className={`w-fit text-center leading-normal ${
                  item.isActive
                    ? "text-white text-base lg:text-xl font-bold"
                    : "text-[#2d2d2d] text-sm lg:text-base font-semibold"
                }`}
              >
                {item.text}{" "}
              </div>{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </div>{" "}
      <div className="pl-3">
        <FilterIcon />{" "}
      </div>{" "}
    </nav>
  );
};
