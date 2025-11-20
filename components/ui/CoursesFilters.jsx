"use client";

import React, { useState } from "react";
import { Dropdown } from "antd";
import { FiltersIcon, CloseIcon } from "../../public/svgs";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { BottomDrawer } from "./BottomDrawer";

///////////////////////////////////////////////////////////////////
// MAIN DESKTOP + MOBILE FILTERS
///////////////////////////////////////////////////////////////////

const CoursesFilters = ({ onFiltersChange, categoryParts }) => {
  // UI text states
  const [selectedCategory, setSelectedCategory] = useState("اختر القسم");
  const [selectedSort, setSelectedSort] = useState("عرض الأحدث");
  const [selectedRating, setSelectedRating] = useState("أعلى تقييم");
  const [selectedType, setSelectedType] = useState("اختر النوع");

  const [openFiltersDrawer, setOpenFiltersDrawer] = useState(false);

  const router = useRouter();

  ///////////////////////////////////////////////////////////////////
  // INTERNAL FILTER STATE
  ///////////////////////////////////////////////////////////////////

  const [localFilters, setLocalFilters] = useState({
    search: "",
    category: "",
    sort: "",
    rating: "highest",
    type: "",
    gender: "",
  });
  const categoryItems =
    categoryParts?.map((part) => ({
      key: `cat_${part.id}`,
      label: part.name,
    })) || [];

  const sortItems = [
    { key: "sort_latest", label: "الأحدث" },
    { key: "sort_popular", label: "الأكثر شيوعًا" },
    { key: "sort_price_asc", label: "السعر: الأقل للأعلى" },
    { key: "sort_price_desc", label: "السعر: الأعلى للأقل" },
  ];

  const ratingItems = [
    { key: "rating_highest", label: "أعلى تقييم" },
    { key: "rating_lowest", label: "أقل تقييم" },
  ];

  const typeItems = [
    { key: "type_free", label: "مجاني" },
    { key: "type_paid", label: "مدفوع" },
  ];

  const allItems = [
    ...categoryItems,
    ...sortItems,
    ...ratingItems,
    ...typeItems,
  ];

  ///////////////////////////////////////////////////////////////////
  // HANDLE SELECT
  ///////////////////////////////////////////////////////////////////

  const handleMenuClick =
    (setter, filterKey) =>
    ({ key }) => {
      const item = allItems.find((i) => i.key === key);
      if (item) {
        setter(item.label);
        setLocalFilters((prev) => ({
          ...prev,
          [filterKey]: key,
        }));
      }
    };

  ///////////////////////////////////////////////////////////////////
  // RENDER
  ///////////////////////////////////////////////////////////////////

  return (
    <>
      {/* ================= Desktop Filters ================= */}
      <div className="hidden md:flex gap-4">
        <div className="flex flex-wrap flex-1 gap-4">
          {/* Search */}
          <div className="flex-1 p-6 bg-zinc-800 rounded-[20px] flex items-center">
            <input
              placeholder="ابحث باسم الدورة"
              className="text-white w-full bg-transparent focus:outline-none"
              onChange={(e) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  search: e.target.value,
                }))
              }
            />
          </div>

          {/* Category */}
          <Dropdown
            className="flex-1"
            trigger={["click"]}
            menu={{
              items: categoryItems,
              onClick: handleMenuClick(setSelectedCategory, "category"),
            }}
          >
            <div className="p-6 bg-zinc-800 rounded-[20px] flex justify-between items-center cursor-pointer">
              <span className="text-white">{selectedCategory}</span>
              <ChevronDown className="text-white" />
            </div>
          </Dropdown>

          {/* Sort */}
          <Dropdown
            className="flex-1"
            trigger={["click"]}
            menu={{
              items: sortItems,
              onClick: handleMenuClick(setSelectedSort, "sort"),
            }}
          >
            <div className="p-6 bg-zinc-800 rounded-[20px] flex justify-between items-center cursor-pointer">
              <span className="text-white">{selectedSort}</span>
              <ChevronDown className="text-white" />
            </div>
          </Dropdown>

          {/* Rating */}
          <Dropdown
            className="flex-1"
            trigger={["click"]}
            menu={{
              items: ratingItems,
              onClick: handleMenuClick(setSelectedRating, "rating"),
            }}
          >
            <div className="p-6 bg-zinc-800 rounded-[20px] flex justify-between items-center cursor-pointer">
              <span className="text-white">{selectedRating}</span>
              <ChevronDown className="text-white" />
            </div>
          </Dropdown>

          {/* Type */}
          <Dropdown
            className="flex-1"
            trigger={["click"]}
            menu={{
              items: typeItems,
              onClick: handleMenuClick(setSelectedType, "type"),
            }}
          >
            <div className="p-6 bg-zinc-800 rounded-[20px] flex justify-between items-center cursor-pointer">
              <span className="text-white">{selectedType}</span>
              <ChevronDown className="text-white" />
            </div>
          </Dropdown>

          {/* APPLY BUTTON */}
          <div
            onClick={() => onFiltersChange?.(localFilters)}
            className="flex-1 px-12 py-6 bg-secondary rounded-[20px] cursor-pointer flex justify-center items-center"
          >
            <span className="text-white font-semibold">بحث</span>
          </div>
        </div>
      </div>

      {/* ================= Mobile Filters ================= */}
      <div className="md:hidden">
        <div className="flex items-center justify-between">
          <FiltersIcon
            onClick={() => setOpenFiltersDrawer(true)}
            className="w-10 h-10 p-1 cursor-pointer"
          />
          <ChevronLeft
            onClick={() => router.back()}
            className="w-10 h-10 p-1 cursor-pointer"
          />
        </div>

        <MobileCoursesFilters
          open={openFiltersDrawer}
          setOpen={setOpenFiltersDrawer}
          onFiltersChange={onFiltersChange}
          categoryParts={categoryParts}
        />
      </div>
    </>
  );
};

export default CoursesFilters;

///////////////////////////////////////////////////////////////////
// MOBILE VERSION
///////////////////////////////////////////////////////////////////

export const MobileCoursesFilters = ({
  open,
  setOpen,
  onFiltersChange,
  categoryParts,
}) => {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("اختر القسم");
  const [selectedSort, setSelectedSort] = useState("عرض الأحدث");
  const [selectedRating, setSelectedRating] = useState("أعلى تقييم");
  const [selectedGender, setSelectedGender] = useState("اختر الجنس");

  const [localFilters, setLocalFilters] = useState({
    category: "",
    sort: "",
    rating: "highest",
    gender: "",
    search: "",
  });

  const categoryItems =
    categoryParts?.map((part) => ({
      key: `cat_${part.id}`,
      label: part.name,
    })) || [];

  const sortItems = [
    { key: "sort_latest", label: "الأحدث" },
    { key: "sort_popular", label: "الأكثر شيوعًا" },
    { key: "sort_price_asc", label: "السعر: الأقل للأعلى" },
    { key: "sort_price_desc", label: "السعر: الأعلى للأقل" },
  ];

  const ratingItems = [
    { key: "rating_highest", label: "أعلى تقييم" },
    { key: "rating_lowest", label: "أقل تقييم" },
  ];

  const genderItems = [
    { key: "gender_male", label: "ذكر" },
    { key: "gender_female", label: "أنثى" },
  ];

  const allItems = [
    ...categoryItems,
    ...sortItems,
    ...ratingItems,
    ...genderItems,
  ];

  const handleMenuClick =
    (setter, filterKey) =>
    ({ key }) => {
      const item = allItems.find((i) => i.key === key);
      if (item) {
        setter(item.label);
        setLocalFilters((prev) => ({
          ...prev,
          [filterKey]: key,
        }));
      }
    };

  const handleApply = () => {
    onFiltersChange?.(localFilters);
    setOpen(false);
  };

  return (
    <BottomDrawer open={open} setOpen={setOpen}>
      <div className="flex flex-col gap-6">
        <div className="relative h-8 flex items-center justify-center">
          <CloseIcon
            className="absolute left-2 cursor-pointer"
            onClick={() => setOpen(false)}
          />
          <h1 className="font-bold text-lg">فلترة</h1>
        </div>

        {/* Category */}
        <Dropdown
          trigger={["click"]}
          menu={{
            items: categoryItems,
            onClick: handleMenuClick(setSelectedCategory, "category"),
          }}
        >
          <div className="w-full px-4 py-4 rounded-2xl outline outline-neutral-300 flex justify-between items-center cursor-pointer">
            <span className="text-xs font-bold">{selectedCategory}</span>
            <ChevronDown />
          </div>
        </Dropdown>

        {/* Sort */}
        <Dropdown
          trigger={["click"]}
          menu={{
            items: sortItems,
            onClick: handleMenuClick(setSelectedSort, "sort"),
          }}
        >
          <div className="w-full px-4 py-4 rounded-2xl outline outline-neutral-300 flex justify-between items-center cursor-pointer">
            <span className="text-xs font-bold">{selectedSort}</span>
            <ChevronDown />
          </div>
        </Dropdown>

        {/* Rating */}
        <Dropdown
          trigger={["click"]}
          menu={{
            items: ratingItems,
            onClick: handleMenuClick(setSelectedRating, "rating"),
          }}
        >
          <div className="w-full px-4 py-4 rounded-2xl outline outline-neutral-300 flex justify-between items-center cursor-pointer">
            <span className="text-xs font-bold">{selectedRating}</span>
            <ChevronDown />
          </div>
        </Dropdown>

        {/* Gender */}
        <Dropdown
          trigger={["click"]}
          menu={{
            items: genderItems,
            onClick: handleMenuClick(setSelectedGender, "gender"),
          }}
        >
          <div className="w-full px-4 py-4 rounded-2xl outline outline-neutral-300 flex justify-between items-center cursor-pointer">
            <span className="text-xs font-bold">{selectedGender}</span>
            <ChevronDown />
          </div>
        </Dropdown>

        {/* ACTION BUTTONS */}
        <div className="flex justify-between gap-3 px-1">
          <div
            onClick={handleApply}
            className="flex-1 py-4 bg-orange-500 text-white rounded-2xl font-bold text-center cursor-pointer"
          >
            فلترة
          </div>

          <div
            onClick={() => {
              setSelectedCategory("اختر القسم");
              setSelectedSort("عرض الأحدث");
              setSelectedRating("تقييم");
              setSelectedGender("اختر الجنس");

              setLocalFilters({
                category: "",
                sort: "",
                rating: "",
                gender: "",
                search: "",
              });
            }}
            className="px-4 py-4 rounded-2xl outline outline-orange-500 text-orange-500 font-semibold cursor-pointer"
          >
            حذف
          </div>
        </div>
      </div>
    </BottomDrawer>
  );
};
