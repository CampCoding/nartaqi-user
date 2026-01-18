"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Dropdown } from "antd";
import { CloseIcon, FiltersIcon } from "../../public/svgs";
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
  const [openFiltersDrawer, setOpenFiltersDrawer] = useState(false);

  // Sync localFilters when filters prop changes (URL back/forward etc.)
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  ///////////////////////////////////////////////////////////////
  // DEFAULT FILTERS
  ///////////////////////////////////////////////////////////////
  const defaultFilters = {
    search: "",
    category: "",
    sort: "sort_latest",
    rating: "rating_highest",
    type: "",
    gender: "",
    level: "",
  };

  ///////////////////////////////////////////////////////////////
  // CHECK IF ANY FILTERS ARE ACTIVE
  ///////////////////////////////////////////////////////////////
  const hasActiveFilters = useMemo(() => {
    return Object.keys(defaultFilters).some(
      (key) => localFilters[key] !== defaultFilters[key]
    );
  }, [localFilters]);

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

  const mapGenderLabel = {
    both: "الجميع",
    male: "ذكر",
    female: "أنثى",
  };

  ///////////////////////////////////////////////////////////////
  // LABELS
  ///////////////////////////////////////////////////////////////
  const categoryLabel =
    parts?.find((p) => p.id == localFilters.category)?.name || "اختر القسم";

  const sortLabel = mapSortLabel[localFilters.sort] || "الأحدث";
  const ratingLabel = mapRatingLabel[localFilters.rating] || "أعلى تقييم";
  const typeLabel = mapTypeLabel[localFilters.type] || "اختر النوع";
  const genderLabel = mapGenderLabel[localFilters.gender] || "اختر الجنس";

  ///////////////////////////////////////////////////////////////
  // DROPDOWN ITEMS
  ///////////////////////////////////////////////////////////////
  const categoryItems = useMemo(
    () =>
      parts?.map((part) => ({
        key: `cat_${part.id}`,
        label: part.name,
      })) || [],
    [parts]
  );

  const sortItems = useMemo(
    () => [
      { key: "sort_latest", label: "الأحدث" },
      { key: "sort_popular", label: "الأكثر شيوعًا" },
      { key: "sort_price_asc", label: "السعر: الأقل للأعلى" },
      { key: "sort_price_desc", label: "السعر: الأعلى للأقل" },
    ],
    []
  );

  const ratingItems = useMemo(
    () => [
      { key: "rating_highest", label: "أعلى تقييم" },
      { key: "rating_lowest", label: "أقل تقييم" },
    ],
    []
  );

  const typeItems = useMemo(
    () => [
      { key: "type_free", label: "مجاني" },
      { key: "type_paid", label: "مدفوع" },
    ],
    []
  );

  const genderItems = useMemo(
    () => [
      { key: "both", label: "الجميع" },
      { key: "male", label: "ذكر" },
      { key: "female", label: "أنثى" },
    ],
    []
  );

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
        <div className=" grid grid-cols-4 gap-4 lg:flex lg:flex-wrap lg:flex-1 lg:gap-4">
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
              <div className="p-6 bg-zinc-800 rounded-[20px] flex justify-between items-center cursor-pointer whitespace-nowrap truncate ">
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
            <div className="p-6 bg-zinc-800 rounded-[20px] flex justify-between items-center cursor-pointer whitespace-nowrap truncate ">
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
            <div className="p-6 bg-zinc-800 rounded-[20px] flex justify-between items-center cursor-pointer whitespace-nowrap truncate ">
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
                items: genderItems,
                onClick: handleMenuClick("gender"),
              }}
            >
              <div className="p-6 bg-zinc-800 rounded-[20px] flex justify-between items-center cursor-pointer whitespace-nowrap truncate ">
                <span className="text-white">{genderLabel}</span>
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

          {/* CLEAR BUTTON - Only show when filters are active */}
          {hasActiveFilters && (
            <div
              onClick={handleClear}
              className="px-3 py-2 bg-red-500 rounded-[20px] cursor-pointer flex justify-center items-center"
            >
              <Icon
                icon={"typcn:delete-outline"}
                className="text-white rotate-180"
                width={30}
                height={30}
              />
            </div>
          )}
        </div>
      </div>

      {/* MOBILE */}
      <div className="block md:hidden">
        <div className="flex items-center justify-between">
          <FiltersIcon
            onClick={() => setOpenFiltersDrawer(true)}
            className="w-10 h-10 p-1 cursor-pointer hover:bg-neutral-200 transition-all active:border active:border-neutral-400 active:bg-neutral-300 rounded-full"
          />

          <ChevronLeft
            onClick={() => router.back()}
            className="w-10 p-1 h-10 cursor-pointer hover:bg-neutral-200 transition-all active:border active:border-neutral-400 active:bg-neutral-300 rounded-full"
          />
        </div>

        <MobileCoursesFilters
          open={openFiltersDrawer}
          setOpen={setOpenFiltersDrawer}
          localFilters={localFilters}
          setLocalFilters={setLocalFilters}
          onFiltersChange={onFiltersChange}
          isFree={isFree}
          categoryItems={categoryItems}
          sortItems={sortItems}
          ratingItems={ratingItems}
          typeItems={typeItems}
          genderItems={genderItems}
          categoryLabel={categoryLabel}
          sortLabel={sortLabel}
          ratingLabel={ratingLabel}
          typeLabel={typeLabel}
          genderLabel={genderLabel}
          defaultFilters={defaultFilters}
        />
      </div>
    </>
  );
};

export default CoursesFilters;

export const MobileCoursesFilters = ({
  open,
  setOpen,
  localFilters,
  setLocalFilters,
  onFiltersChange,
  isFree,
  categoryItems,
  sortItems,
  ratingItems,
  typeItems,
  genderItems,
  defaultFilters,
}) => {
  const [tempFilters, setTempFilters] = useState(localFilters);

  // Sync tempFilters when drawer opens or localFilters change
  useEffect(() => {
    if (open) {
      setTempFilters(localFilters);
    }
  }, [open, localFilters]);

  ///////////////////////////////////////////////////////////////
  // CHECK IF ANY FILTERS ARE ACTIVE (for mobile)
  ///////////////////////////////////////////////////////////////
  const hasActiveFilters = useMemo(() => {
    return Object.keys(defaultFilters).some(
      (key) => tempFilters[key] !== defaultFilters[key]
    );
  }, [tempFilters, defaultFilters]);

  ///////////////////////////////////////////////////////////////
  // ON MENU CLICK
  ///////////////////////////////////////////////////////////////
  const handleMenuClick =
    (filterKey) =>
    ({ key }) => {
      setTempFilters((prev) => ({
        ...prev,
        [filterKey]: filterKey === "category" ? key.replace("cat_", "") : key,
      }));
    };

  ///////////////////////////////////////////////////////////////
  // TEMP LABELS
  ///////////////////////////////////////////////////////////////
  const getTempCategoryLabel = () => {
    const item = categoryItems?.find((i) => i.key === `cat_${tempFilters.category}`);
    return item?.label || "اختر القسم";
  };

  const getTempSortLabel = () => {
    const item = sortItems?.find((i) => i.key === tempFilters.sort);
    return item?.label || "الأحدث";
  };

  const getTempRatingLabel = () => {
    const item = ratingItems?.find((i) => i.key === tempFilters.rating);
    return item?.label || "أعلى تقييم";
  };

  const getTempTypeLabel = () => {
    const item = typeItems?.find((i) => i.key === tempFilters.type);
    return item?.label || "اختر النوع";
  };

  const getTempGenderLabel = () => {
    const item = genderItems?.find((i) => i.key === tempFilters.gender);
    return item?.label || "اختر الجنس";
  };

  ///////////////////////////////////////////////////////////////
  // RESET & APPLY
  ///////////////////////////////////////////////////////////////
  const handleReset = () => {
    setTempFilters(defaultFilters);
  };

  const handleApply = () => {
    setLocalFilters(tempFilters);
    onFiltersChange(tempFilters);
    setOpen(false);
  };

  return (
    <BottomDrawer open={open} setOpen={setOpen}>
      <div className="flex flex-col gap-[34px]">
        {/* HEADER */}
        <div className="relative h-8 flex items-center justify-center">
          <CloseIcon
            className="absolute left-2 cursor-pointer active:bg-red-200 rounded-full"
            onClick={() => setOpen(false)}
          />
          <h1 className="flex items-center justify-center font-bold text-text-duplicate text-lg text-center whitespace-nowrap">
            فلترة
          </h1>
        </div>

        {/* FILTERS */}
        <div className="w-full inline-flex flex-col justify-start items-start gap-4">
          {/* SEARCH */}
          <div className="self-stretch px-2 py-4 rounded-2xl outline outline-2 outline-offset-[-2px] outline-neutral-300 inline-flex justify-between items-center">
            <input
              placeholder="ابحث باسم الدورة"
              className="text-text text-xs font-bold w-full bg-transparent focus:outline-none"
              value={tempFilters.search}
              onChange={(e) =>
                setTempFilters((prev) => ({
                  ...prev,
                  search: e.target.value,
                }))
              }
            />
          </div>

          {/* CATEGORY */}
          {!isFree && (
            <Dropdown
              trigger={["click"]}
              menu={{
                items: categoryItems,
                onClick: handleMenuClick("category"),
              }}
              placement="top"
            >
              <div className="self-stretch px-2 py-4 rounded-2xl outline outline-2 outline-offset-[-2px] outline-neutral-300 inline-flex justify-between items-center cursor-pointer">
                <div className="justify-center text-text text-xs font-bold leading-none">
                  {getTempCategoryLabel()}
                </div>
                <ChevronDown />
              </div>
            </Dropdown>
          )}

          {/* SORT */}
          <Dropdown
            trigger={["click"]}
            menu={{
              items: sortItems,
              onClick: handleMenuClick("sort"),
            }}
            placement="top"
          >
            <div className="self-stretch px-2 py-4 rounded-2xl outline outline-2 outline-offset-[-2px] outline-neutral-300 inline-flex justify-between items-center cursor-pointer">
              <div className="justify-center text-text text-xs font-bold leading-none">
                {getTempSortLabel()}
              </div>
              <ChevronDown />
            </div>
          </Dropdown>

          {/* RATING */}
          <Dropdown
            trigger={["click"]}
            menu={{
              items: ratingItems,
              onClick: handleMenuClick("rating"),
            }}
            placement="top"
          >
            <div className="self-stretch px-2 py-4 rounded-2xl outline outline-2 outline-offset-[-2px] outline-neutral-300 inline-flex justify-between items-center cursor-pointer">
              <div className="justify-center text-text text-xs font-bold leading-none">
                {getTempRatingLabel()}
              </div>
              <ChevronDown />
            </div>
          </Dropdown>

          {/* TYPE */}
          {!isFree && (
            <Dropdown
              trigger={["click"]}
              menu={{
                items: typeItems,
                onClick: handleMenuClick("type"),
              }}
              placement="top"
            >
              <div className="self-stretch px-2 py-4 rounded-2xl outline outline-2 outline-offset-[-2px] outline-neutral-300 inline-flex justify-between items-center cursor-pointer">
                <div className="justify-center text-text text-xs font-bold leading-none">
                  {getTempTypeLabel()}
                </div>
                <ChevronDown />
              </div>
            </Dropdown>
          )}

          {/* GENDER */}
          <Dropdown
            trigger={["click"]}
            menu={{
              items: genderItems,
              onClick: handleMenuClick("gender"),
            }}
            placement="top"
          >
            <div className="self-stretch px-2 py-4 rounded-2xl outline outline-2 outline-offset-[-2px] outline-neutral-300 inline-flex justify-between items-center cursor-pointer">
              <div className="justify-center text-text text-xs font-bold leading-none">
                {getTempGenderLabel()}
              </div>
              <ChevronDown />
            </div>
          </Dropdown>
        </div>

        {/* ACTION BUTTONS */}
        <div className="self-stretch inline-flex justify-between items-center gap-2">
          <div
            className="flex-1 p-4 bg-orange-500 rounded-2xl flex justify-center items-center gap-2.5 cursor-pointer"
            onClick={handleApply}
          >
            <div className="justify-center text-white text-base font-bold font-['Cairo'] leading-normal">
              فلترة
            </div>
          </div>
            
          {/* RESET BUTTON - Only show when filters are active */}
          {hasActiveFilters && (
            <div
              className="pl-4 pr-3 py-4 rounded-2xl outline outline-1 outline-offset-[-1px] outline-orange-500 flex justify-center items-center gap-2.5 cursor-pointer"
              onClick={handleReset}
            >
              <div className="justify-center text-orange-500 text-base font-normal font-['Cairo'] leading-normal">
                حذف الأختيارات
              </div>
            </div>
          )}
        </div>
      </div>
    </BottomDrawer>
  );
};