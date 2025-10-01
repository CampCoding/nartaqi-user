"use client";

import React, { useEffect, useState } from "react";
import CourseCard from "./../ui/Cards/CourseCard";
import LicturerCard from "./../ui/Cards/LicturerCard";
import { ProductCard } from "./../Store/ProductCard";
import { BlogCard } from "./../ui/Cards/BlogCard";
import { ImageOff } from "lucide-react";
import Link from "next/link";

const SearchBanner = ({ openSearch, setOpenSearch }) => {
  const [textSearch, setTextSearch] = useState("");

  useEffect(() => {
    if (openSearch) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [openSearch]);

  if (!openSearch) return null;

  const handleSearch = (e) => {
    setTextSearch(e);
  };

  return (
    <main className="fixed z-50 inset-0 !overflow-auto top-0 bottom-0 bg-white ">
      <div
        className={`${
          !textSearch ? "h-[calc(100vh)]" : "h-[calc(70vh)]"
        } flex items-center transition-all duration-500 justify-center left-0 right-0 bg-black/25`}
        style={{
          backgroundImage: "url('/images/search-banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 1000,
        }}
      >
        <div
          onClick={() => setOpenSearch(false)}
          className="  cursor-pointer absolute top-[107px] right-[74px] p-4"
        >
          <XIcon />
        </div>
        <Searchform onSearchClick={handleSearch} />
      </div>

      {textSearch && (
        <div className="container max-w-[1312px] mx-auto  mt-[48px] mb-[200px]">
          <div className=" text-right justify-start text-text text-3xl font-bold  ">
            نتائج البحث (23)
          </div>
          <div className="mt-[24px] mb-[48px]">
            <Navs />
          </div>

          <div className="flex flex-col gap-[63px]">
            <Courses />
            <Lecturers />
            <BooksAndBags />
            <Blogs />
          </div>
        </div>
      )}
    </main>
  );
};

export default SearchBanner;

export const Searchform = ({ onSearchClick }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = () => {
    // Handle search functionality here
    console.log(searchValue);
    onSearchClick(searchValue);
  };

  return (
    <div className="inline-flex justify-start items-center gap-2">
      <div className="w-[732px] p-8 bg-gray-50 rounded-[30px] flex justify-start items-center gap-28">
        <div className="flex justify-start w-full items-center gap-2">
          <SearchIcon />
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            className="text-right justify-start text-text placeholder:!text-text-alt flex-1 w-full text-base font-semibold  "
            placeholder="ابحث عن دورة، مدرب، أو موضوع…"
          />
        </div>
      </div>
      <div
        onClick={() => handleSearchSubmit()}
        className="px-12 py-6 cursor-pointer hover:bg-primary-dark transition bg-primary rounded-[30px] inline-flex flex-col justify-center items-center gap-2.5"
      >
        <div className="self-stretch text-center justify-start text-white text-2xl font-bold ">
          بحث
        </div>
      </div>
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
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2 30L16 16M16 16L30 2M16 16L2 2M16 16L30 30"
      stroke="white"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Courses = () => {
  return (
    <div className="">
      <div className="self-stretch text-right justify-start text-text text-2xl font-bold ">
        دورات
      </div>
      <div className="grid grid-cols-3 gap-x-[48px] gap-y-[28px] mt-6">
        <CourseCard freeWidth />
        <CourseCard freeWidth />
        <CourseCard freeWidth />
        <CourseCard freeWidth />
        <CourseCard freeWidth />
      </div>
    </div>
  );
};
const Lecturers = () => {
  return (
    <div className="">
      <div className="self-stretch text-right justify-start text-text text-2xl font-bold ">
        محاضرين
      </div>
      <div className="grid grid-cols-4 gap-x-[29px] gap-y-[28px] mt-6">
        <LicturerCard />
        <LicturerCard />
        <LicturerCard />
        <LicturerCard />
        <LicturerCard />
        {/*  */}
      </div>
    </div>
  );
};

const BooksAndBags = () => {
  return (
    <div className="">
      <div className="self-stretch text-right justify-start text-text text-2xl font-bold ">
        كتب وحقائب
      </div>
      <div className="grid grid-cols-4 gap-x-[29px] gap-y-[28px] mt-6">
        {[
          "FRAME (5).png",
          "FRAME (6).png",
          "FRAME (7).png",
          "FRAME (8).png",
          "FRAME (9).png",
          "FRAME (9).png",
        ].map((item, index) => {
          return <ProductCard data={item} key={index} />;
        })}{" "}
      </div>
    </div>
  );
};

const Blogs = () => {
  return (
    <div className="">
      <div className="self-stretch text-right justify-start text-text text-2xl font-bold ">
        مدونات
      </div>
      <div className="grid grid-cols-3 gap-x-[29px] gap-y-[28px] mt-6">
        {[
          "/images/FRAME (1).png",
          "/images/FRAME (2).png",
          "/images/FRAME.png",
          "/images/FRAME (1).png",
          "/images/FRAME (2).png",
          "/images/FRAME.png",
        ].map((item, index) => (
          <Link href={"/blogs/blog-details/123"}>

          <BlogCard freeWidth={true} key={index} image={item} />
          </Link>
        ))}
        {/*  */}
      </div>
    </div>
  );
};

export const Navs = () => {
  // Navigation items array containing text and padding for each item
  // Each item can have an 'isActive' property to indicate the current selection
  const navigationItems = [
    { text: "مدونات", padding: "px-8 py-4" },
    { text: "كتب وحقائب", padding: "px-8 py-4" },
    { text: "محاضرين", padding: "px-16 py-4" },
    { text: "دورات", padding: "px-16 py-4" },
    { text: "الكل", padding: "px-16 py-4", isActive: true },
  ];

  return (
    <nav
      className="flex w-[1312px] items-center justify-between p-4 relative bg-[#ebf3fe] rounded-[20px]"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Container for navigation items */}
      <div className="inline-flex items-center relative flex-[0_0_auto]">
        {/* Map through navigation items to create menu buttons */}
        {navigationItems.reverse().map((item, index) => (
          <div
            key={index}
            className={`justify-center ${
              item.padding
            } rounded inline-flex items-center relative flex-[0_0_auto] ${
              item.isActive ? "bg-blue-500 rounded-[20px]" : ""
            }`}
          >
            <div
              className={`${
                item.isActive
                  ? " text-white text-xl"
                  : " text-[#2d2d2d] text-base"
              } relative [display:-webkit-box] items-center justify-center w-fit text-center leading-[normal] overflow-hidden text-ellipsis [-webkit-line-clamp:1] [-webkit-box-orient:vertical] [direction:rtl]`}
            >
              {item.text}
            </div>
          </div>
        ))}
      </div>

      {/* Container for the menu icon */}
      <FilterIcon />
    </nav>
  );
};

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
