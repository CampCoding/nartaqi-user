"use client";

import React, { useState } from "react";
import { Dropdown } from "antd";
import { FiltersIcon } from "../../public/svgs";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BottomDrawer } from "./BottomDrawer";
import { useGetCategoryPart } from "../shared/Hooks/useGetCategoryPart";
import { Icon } from "@iconify/react";

const CoursesFilters = ({ onFiltersChange, filters, isFree = false }) => {
  const { id } = useParams();
  const router = useRouter();

  const { parts } = useGetCategoryPart(id);

  ///////////////////////////////////////////////////////////////
  // FILTER STATE (SYNCED WITH PARENT)
  ///////////////////////////////////////////////////////////////
  const [localFilters, setLocalFilters] = useState(filters);

  ///////////////////////////////////////////////////////////////
  // MAPPINGS
  ///////////////////////////////////////////////////////////////
  const mapSortLabel = {
    sort_latest: "الأحدث",
    sort_popular: "الأكثر شيوعًا",
    sort_price_asc: "السعر: الأقل للأعلى",
    sort_price_desc: "السعر: الأعلى للأقل",
  };

  const mapRatingLabel = {
    rating_highest: "أعلى تقييم",
    rating_lowest: "أقل تقييم",
  };

  const mapTypeLabel = {
    type_free: "مجاني",
    type_paid: "مدفوع",
  };

  ///////////////////////////////////////////////////////////////
  // LABELS
  ///////////////////////////////////////////////////////////////
  const categoryLabel =
    parts?.find((p) => p.id == localFilters.category)?.name || "اختر القسم";

  const sortLabel = isFree
    ? mapSortLabel[localFilters.sort] || "الأحدث"
    : "الأحدث";
  const ratingLabel = mapRatingLabel[localFilters.rating] || "أعلى تقييم";
  const typeLabel = mapTypeLabel[localFilters.type] || "اختر النوع";

  ///////////////////////////////////////////////////////////////
  // DROPDOWN ITEMS
  ///////////////////////////////////////////////////////////////
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

  ///////////////////////////////////////////////////////////////
  // ON MENU CLICK (store only keys)
  ///////////////////////////////////////////////////////////////
  const handleMenuClick =
    (filterKey) =>
    ({ key }) => {
      setLocalFilters((prev) => ({
        ...prev,
        [filterKey]: filterKey === "category" ? key.replace("cat_", "") : key,
      }));
    };

  ///////////////////////////////////////////////////////////////
  // CLEAR FILTERS BUTTON
  ///////////////////////////////////////////////////////////////
  const handleClear = () => {
    const defaultFilters = {
      search: "",
      category: "",
      sort: "sort_latest",
      rating: "rating_highest",
      type: "",
      gender: "",
      level: "",
    };

    setLocalFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  ///////////////////////////////////////////////////////////////
  // UI
  ///////////////////////////////////////////////////////////////
  return (
    <>
      {/* DESKTOP */}
      <div className="hidden md:flex gap-4">
        <div className="flex flex-wrap flex-1 gap-4">
          {/* SEARCH */}
          <div className="flex-1 p-6 bg-zinc-800 rounded-[20px] flex items-center">
            <input
              placeholder="ابحث باسم الدورة"
              className="text-white w-full bg-transparent focus:outline-none"
              value={localFilters.search}
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
                onClick: handleMenuClick("category"),
              }}
            >
              <div className="p-6 bg-zinc-800 rounded-[20px] flex justify-between items-center cursor-pointer">
                <span className="text-white">{categoryLabel}</span>
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
              onClick: handleMenuClick("sort"),
            }}
          >
            <div className="p-6 bg-zinc-800 rounded-[20px] flex justify-between items-center cursor-pointer">
              <span className="text-white">{sortLabel}</span>
              <ChevronDown className="text-white" />
            </div>
          </Dropdown>

          {/* RATING */}
          <Dropdown
            className="flex-1"
            trigger={["click"]}
            menu={{
              items: ratingItems,
              onClick: handleMenuClick("rating"),
            }}
          >
            <div className="p-6 bg-zinc-800 rounded-[20px] flex justify-between items-center cursor-pointer">
              <span className="text-white">{ratingLabel}</span>
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
                onClick: handleMenuClick("type"),
              }}
            >
              <div className="p-6 bg-zinc-800 rounded-[20px] flex justify-between items-center cursor-pointer">
                <span className="text-white">{typeLabel}</span>
                <ChevronDown className="text-white" />
              </div>
            </Dropdown>
          )}

          {/* APPLY BUTTON */}
          <div
            onClick={() => onFiltersChange(localFilters)}
            className="flex-1 px-12 py-6 bg-secondary rounded-[20px] cursor-pointer flex justify-center items-center"
          >
            <span className="text-white font-semibold">بحث</span>
          </div>

          {/* CLEAR BUTTON */}
          <div
            onClick={handleClear}
            className=" px-3 py-2 bg-red-500 rounded-[20px] cursor-pointer flex justify-center items-center"
          >
            <Icon
              icon={"typcn:delete-outline"}
              className="text-white rotate-180"
              width={30}
              height={30}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursesFilters;
