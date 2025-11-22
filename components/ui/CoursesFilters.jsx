"use client";

import React, { useState, useEffect } from "react";
import { Dropdown } from "antd";
import { FiltersIcon, CloseIcon } from "../../public/svgs";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { BottomDrawer } from "./BottomDrawer";
import { useGetCategoryPart } from "../shared/Hooks/useGetCategoryPart";

///////////////////////////////////////////////////////////////////
// MAIN FILTERS COMPONENT
///////////////////////////////////////////////////////////////////

const CoursesFilters = ({ onFiltersChange, isFree = false }) => {
  const searchParams = useSearchParams();
  const { id } = useParams();
  const router = useRouter();

  /////////////////////////////////////////////////////////////////
  // FETCH PARTS (CORRECT)
  /////////////////////////////////////////////////////////////////
  const { parts } = useGetCategoryPart(id);

  /////////////////////////////////////////////////////////////////
  // READ SELECTED CATEGORY FROM URL
  /////////////////////////////////////////////////////////////////
  const partId = searchParams.get("category");
  const partName = parts?.find((p) => p.id == partId)?.name;

  /////////////////////////////////////////////////////////////////
  // CATEGORY LABEL IN UI (NO MORE OVERRIDE)
  /////////////////////////////////////////////////////////////////
  const [selectedCategory, setSelectedCategory] = useState("اختر القسم");

  useEffect(() => {
    if (partId && partName) {
      setSelectedCategory(partName);
    }
  }, [partId, partName]);

  /////////////////////////////////////////////////////////////////
  // OTHER FILTER STATES
  /////////////////////////////////////////////////////////////////
  const [selectedSort, setSelectedSort] = useState("عرض الأحدث");
  const [selectedRating, setSelectedRating] = useState("أعلى تقييم");
  const [selectedType, setSelectedType] = useState("اختر النوع");

  /////////////////////////////////////////////////////////////////
  // FILTER LOGIC STATE
  /////////////////////////////////////////////////////////////////
  const [localFilters, setLocalFilters] = useState({
    search: "",
    category: "",
    sort: "",
    rating: "highest",
    type: "",
    gender: "",
  });

  /////////////////////////////////////////////////////////////////
  // DROPDOWN MENU ITEMS
  /////////////////////////////////////////////////////////////////
  const categoryItems =
    parts?.map((part) => ({
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

  console.log(localFilters);
  
  /////////////////////////////////////////////////////////////////
  // ON MENU CLICK
  /////////////////////////////////////////////////////////////////
  const handleMenuClick =
    (setter, filterKey) =>
    ({ key }) => {
      const item = allItems.find((i) => i.key === key);
      if (!item) return;

      // UI label
      setter(item.label);

      // Prepare filter value
      if (filterKey === "category") {
        const partId = key.replace("cat_", ""); // extract id
        setLocalFilters((prev) => ({
          ...prev,
          category: partId,
        }));
      } else {
        setLocalFilters((prev) => ({
          ...prev,
          [filterKey]: key,
        }));
      }
    };

  /////////////////////////////////////////////////////////////////
  // MOBILE DRAWER STATE
  /////////////////////////////////////////////////////////////////
  const [open, setOpen] = useState(false);

  /////////////////////////////////////////////////////////////////
  // DESKTOP UI
  /////////////////////////////////////////////////////////////////
  return (
    <>
      {/* ============= DESKTOP ============= */}
      <div className="hidden md:flex gap-4">
        <div className="flex flex-wrap flex-1 gap-4">
          {/* SEARCH */}
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

          {/* CATEGORY */}
          {!isFree && (
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
          )}

          {/* SORT */}
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

          {/* RATING */}
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

          {/* TYPE */}
          {!isFree && (
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
          )}

          {/* APPLY */}
          <div
            onClick={() => onFiltersChange(localFilters)}
            className="flex-1 px-12 py-6 bg-secondary rounded-[20px] cursor-pointer flex justify-center items-center"
          >
            <span className="text-white font-semibold">بحث</span>
          </div>
        </div>
      </div>

      {/* ============= MOBILE ============= */}
      <MobileFiltersDrawer
        open={open}
        setOpen={setOpen}
        parts={parts}
        onFiltersChange={onFiltersChange}
      />

      <div className="md:hidden flex items-center justify-between">
        <FiltersIcon
          onClick={() => setOpen(true)}
          className="w-10 h-10 p-1 cursor-pointer"
        />
        <ChevronLeft
          onClick={() => router.back()}
          className="w-10 h-10 p-1 cursor-pointer"
        />
      </div>
    </>
  );
};

export default CoursesFilters;

///////////////////////////////////////////////////////////////////
// MOBILE DRAWER VERSION
///////////////////////////////////////////////////////////////////

const MobileFiltersDrawer = ({ open, setOpen, onFiltersChange, parts }) => {
  const [selectedCategory, setSelectedCategory] = useState("اختر القسم");

  const categoryItems =
    parts?.map((p) => ({
      key: `cat_${p.id}`,
      label: p.name,
    })) || [];

  return (
    <BottomDrawer open={open} setOpen={setOpen}>
      {/* موبايل هنا حسب اللي انت عايزه */}
      <div className="p-6">
        <h1 className="text-center font-bold text-lg mb-6">فلترة</h1>

        <Dropdown
          trigger={["click"]}
          menu={{
            items: categoryItems,
            onClick: ({ key }) => {
              const item = categoryItems.find((i) => i.key === key);
              if (item) setSelectedCategory(item.label);
            },
          }}
        >
          <div className="px-4 py-4 rounded-2xl outline outline-neutral-300 flex justify-between items-center cursor-pointer mb-4">
            <span className="text-xs font-bold">{selectedCategory}</span>
            <ChevronDown />
          </div>
        </Dropdown>

        <button
          onClick={() => setOpen(false)}
          className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold"
        >
          تطبيق
        </button>
      </div>
    </BottomDrawer>
  );
};
