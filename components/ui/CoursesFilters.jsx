"use client";

import React, { useMemo, useState } from "react";
import { Dropdown } from "antd";
import { BottomDrawer } from "./BottomDrawer";
import { CloseIcon, FiltersIcon } from "../../public/svgs";
import { ChevronDown, ChevronLeft } from "lucide-react";

const CoursesFilters = () => {
  const [selectedCategory, setSelectedCategory] = useState("اختر القسم");
  const [selectedSort, setSelectedSort] = useState("عرض الأحدث");
  const [selectedRating, setSelectedRating] = useState("تقييم");
  const [selectedType, setSelectedType] = useState("اختر النوع");
  const [openFiltersDrawer, setOpenFiltersDrawer] = useState(false);

  const categoryItems = useMemo(
    () => [
      { key: "all", label: "كل الأقسام" },
      { key: "science", label: "علوم" },
      { key: "math", label: "رياضيات" },
      { key: "language", label: "لغات" },
    ],
    []
  );

  const sortItems = useMemo(
    () => [
      { key: "latest", label: "الأحدث" },
      { key: "popular", label: "الأكثر شيوعًا" },
      { key: "price_asc", label: "السعر: الأقل للأعلى" },
      { key: "price_desc", label: "السعر: الأعلى للأقل" },
    ],
    []
  );

  const ratingItems = useMemo(
    () => [
      { key: "4", label: "4+ نجوم" },
      { key: "3", label: "3+ نجوم" },
      { key: "2", label: "2+ نجوم" },
      { key: "1", label: "1+ نجمة" },
    ],
    []
  );

  const typeItems = useMemo(
    () => [
      { key: "all", label: "الكل" },
      { key: "free", label: "مجاني" },
      { key: "paid", label: "مدفوع" },
    ],
    []
  );

  const handleMenuClick =
    (setter) =>
    ({ key, domEvent }) => {
      domEvent?.preventDefault?.();
      const item = [
        ...categoryItems,
        ...sortItems,
        ...ratingItems,
        ...typeItems,
      ].find((i) => i.key === key);
      if (item) setter(item.label);
    };

  return (
    <>
      <div className="hidden md:flex gap-4">
        <div className="flex flex-wrap flex-1 justify-start items-center gap-4">
          <div className=" flex-1  w-full p-6 bg-zinc-800 rounded-[20px] flex justify-start items-center gap-2.5">
            <input
              placeholder="ابحث باسم الدورة"
              className=" placeholder:text-white justify-center text-white text-base whitespace-nowrap font-semibold "
            />
          </div>

          <Dropdown
            rootClassName="flex-1"
            className="flex-1"
            trigger={["click"]}
            menu={{
              items: categoryItems,
              onClick: handleMenuClick(setSelectedCategory),
            }}
            placement="bottom"
          >
            <div className=" p-6 bg-zinc-800 rounded-[20px] flex justify-between items-center cursor-pointer select-none">
              <div className="justify-center text-white text-base whitespace-nowrap font-semibold ">
                {selectedCategory}
              </div>
              <div className="w-6 h-6 relative overflow-hidden">
                <div className="w-2 h-1.5 left-[7.76px]  absolute ">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15L7.757 10.758L9.172 9.34399L12 12.172L14.828 9.34399L16.243 10.758L12 15Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Dropdown>

          <Dropdown
            rootClassName="flex-1"
            className="flex-1"
            trigger={["click"]}
            menu={{
              items: sortItems,
              onClick: handleMenuClick(setSelectedSort),
            }}
            placement="bottom"
          >
            <div className=" p-6 bg-zinc-800 rounded-[20px] flex justify-between items-center cursor-pointer select-none">
              <div className="justify-center text-white text-base whitespace-nowrap font-semibold ">
                {selectedSort}
              </div>
              <div className="w-6 h-6 relative overflow-hidden">
                <div className="w-2 h-1.5 left-[7.76px]  absolute ">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15L7.757 10.758L9.172 9.34399L12 12.172L14.828 9.34399L16.243 10.758L12 15Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Dropdown>

          <Dropdown
            rootClassName="flex-1"
            className="flex-1"
            trigger={["click"]}
            menu={{
              items: ratingItems,
              onClick: handleMenuClick(setSelectedRating),
            }}
            placement="bottom"
          >
            <div className=" p-6 bg-zinc-800 rounded-[20px] flex justify-between items-center cursor-pointer select-none">
              <div className="justify-center text-white text-base whitespace-nowrap font-semibold ">
                {selectedRating}
              </div>
              <div className="w-6 h-6 relative overflow-hidden">
                <div className="w-2 h-1.5 left-[7.76px]  absolute ">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15L7.757 10.758L9.172 9.34399L12 12.172L14.828 9.34399L16.243 10.758L12 15Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Dropdown>

          <Dropdown
            rootClassName="flex-1"
            className="flex-1"
            trigger={["click"]}
            menu={{
              items: typeItems,
              onClick: handleMenuClick(setSelectedType),
            }}
            placement="bottom"
          >
            <div className=" p-6 bg-zinc-800 rounded-[20px] flex justify-between items-center cursor-pointer select-none">
              <div className="justify-center text-white text-base whitespace-nowrap font-semibold ">
                {selectedType}
              </div>
              <div className="w-6 h-6 relative overflow-hidden">
                <div className="w-2 h-1.5 left-[7.76px]  absolute ">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15L7.757 10.758L9.172 9.34399L12 12.172L14.828 9.34399L16.243 10.758L12 15Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Dropdown>
          <div className=" flex-1 px-12 py-6 bg-secondary hover:bg-secondary-dark cursor-pointer rounded-[20px] inline-flex flex-col justify-center items-center gap-2.5">
            <div className="justify-center text-white text-base whitespace-nowrap font-semibold ">
              بحث
            </div>
          </div>
        </div>
      </div>

      <div className="block md:hidden">
        <div className="flex items-center justify-between">
          <FiltersIcon
            onClick={() => setOpenFiltersDrawer(true)}
            className="w-10 h-10 p-1 cursor-pointer hover:bg-neutral-200 transition-all active:border active:border-neutral-400   active:bg-neutral-300 rounded-full"
          />
          <ChevronLeft className="w-10 p-1 h-10 cursor-pointer hover:bg-neutral-200 transition-all active:border active:border-neutral-400   active:bg-neutral-300 rounded-full" />
        </div>

        <MobileCoursesFilters
          open={openFiltersDrawer}
          setOpen={setOpenFiltersDrawer}
        />
      </div>
    </>
  );
};

export default CoursesFilters;

export const MobileCoursesFilters = ({ open, setOpen }) => {
  const [selectedCategory, setSelectedCategory] = useState("اختر القسم");
  const [selectedSort, setSelectedSort] = useState("عرض الأحدث");
  const [selectedRating, setSelectedRating] = useState("تقييم");
  const [selectedGender, setSelectedGender] = useState("اختر الجنس");

  const categoryItems = useMemo(
    () => [
      { key: "all", label: "كل الأقسام" },
      { key: "science", label: "علوم" },
      { key: "math", label: "رياضيات" },
      { key: "language", label: "لغات" },
    ],
    []
  );

  const sortItems = useMemo(
    () => [
      { key: "latest", label: "الأحدث" },
      { key: "popular", label: "الأكثر شيوعًا" },
      { key: "price_asc", label: "السعر: الأقل للأعلى" },
      { key: "price_desc", label: "السعر: الأعلى للأقل" },
    ],
    []
  );

  const ratingItems = useMemo(
    () => [
      { key: "4", label: "4+ نجوم" },
      { key: "3", label: "3+ نجوم" },
      { key: "2", label: "2+ نجوم" },
      { key: "1", label: "1+ نجمة" },
    ],
    []
  );

  const genderItems = useMemo(
    () => [
      { key: "all", label: "الكل" },
      { key: "male", label: "ذكر" },
      { key: "female", label: "أنثى" },
    ],
    []
  );

  const handleMenuClick =
    (setter) =>
    ({ key, domEvent }) => {
      domEvent?.preventDefault?.();
      const item = [
        ...categoryItems,
        ...sortItems,
        ...ratingItems,
        ...genderItems,
      ].find((i) => i.key === key);
      if (item) setter(item.label);
    };

  const handleReset = () => {
    setSelectedCategory("اختر القسم");
    setSelectedSort("عرض الأحدث");
    setSelectedRating("تقييم");
    setSelectedGender("اختر الجنس");
  };

  const handleApply = () => {
    // Here you can implement the filter logic
    console.log("Applied filters:", {
      category: selectedCategory,
      sort: selectedSort,
      rating: selectedRating,
      gender: selectedGender,
    });
  };

  return (
    <BottomDrawer open={open} setOpen={setOpen}>
      <div className="flex flex-col gap-[34px]">
        <div className="relative  h-8 flex items-center justify-center">
          <CloseIcon
            className="absolute left-2 cursor-pointer active:bg-red-200 rounded-full"
            onClick={() => setOpen(false)}
          />

          <h1 className=" flex items-center justify-center font-bold  text-text-duplicate text-lg text-center   whitespace-nowrap ">
            فلترة
          </h1>
        </div>

        <div className=" w-full inline-flex flex-col justify-start items-start gap-4">
          <Dropdown
            trigger={["click"]}
            menu={{
              items: categoryItems,
              onClick: handleMenuClick(setSelectedCategory),
            }}
            placement="top"
          >
            <div className="self-stretch px-2 py-4 rounded-2xl outline outline-2 outline-offset-[-2px] outline-neutral-300 inline-flex justify-between items-center cursor-pointer">
              <div className="justify-center text-text text-xs font-bold  leading-none">
                {selectedCategory}
              </div>
              <ChevronDown />
            </div>
          </Dropdown>

          <Dropdown
            trigger={["click"]}
            menu={{
              items: sortItems,
              onClick: handleMenuClick(setSelectedSort),
            }}
            placement="top"
          >
            <div className="self-stretch px-2 py-4 rounded-2xl outline outline-2 outline-offset-[-2px] outline-neutral-300 inline-flex justify-between items-center cursor-pointer">
              <div className="justify-center text-text text-xs font-bold  leading-none">
                {selectedSort}
              </div>
              <ChevronDown />
            </div>
          </Dropdown>

          <Dropdown
            trigger={["click"]}
            menu={{
              items: ratingItems,
              onClick: handleMenuClick(setSelectedRating),
            }}
            placement="top"
          >
            <div className="self-stretch px-2 py-4 rounded-2xl outline outline-2 outline-offset-[-2px] outline-neutral-300 inline-flex justify-between items-center cursor-pointer">
              <div className="justify-center text-text text-xs font-bold  leading-none">
                {selectedRating}
              </div>
              <ChevronDown />
            </div>
          </Dropdown>

          <Dropdown
            trigger={["click"]}
            menu={{
              items: genderItems,
              onClick: handleMenuClick(setSelectedGender),
            }}
            placement="top"
          >
            <div className="self-stretch px-2 py-4 rounded-2xl outline outline-2 outline-offset-[-2px] outline-neutral-300 inline-flex justify-between items-center cursor-pointer">
              <div className="justify-center text-text text-xs font-bold  leading-none">
                {selectedGender}
              </div>
              <ChevronDown />
            </div>
          </Dropdown>
        </div>

        <div className="self-stretch inline-flex justify-between items-center gap-2">
          <div
            className=" flex-1 p-4 bg-orange-500 rounded-2xl flex justify-center items-center gap-2.5 cursor-pointer"
            onClick={handleApply}
          >
            <div className="justify-center text-white text-base font-bold font-['Cairo'] leading-normal">
              فلترة
            </div>
          </div>
          <div
            className="pl-4 pr-3 py-4 rounded-2xl outline outline-1 outline-offset-[-1px] outline-orange-500 flex justify-center items-center gap-2.5 cursor-pointer"
            onClick={handleReset}
          >
            <div className="justify-center text-orange-500 text-base font-normal font-['Cairo'] leading-normal">
              حذف الأختيارات
            </div>
          </div>
        </div>
      </div>
    </BottomDrawer>
  );
};
