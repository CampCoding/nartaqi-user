"use client"


import React, { useMemo, useState } from "react";
import { Dropdown } from "antd";

const CoursesFilters = () => {
  const [selectedCategory, setSelectedCategory] = useState("اختر القسم");
  const [selectedSort, setSelectedSort] = useState("عرض الأحدث");
  const [selectedRating, setSelectedRating] = useState("تقييم");
  const [selectedType, setSelectedType] = useState("اختر النوع");

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

  const handleMenuClick = (setter) => ({ key, domEvent }) => {
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
      <div className="flex gap-4">
        <div className="flex flex-1 justify-start items-center gap-4">
          <div className=" flex-1  w-full p-6 bg-zinc-800 rounded-[20px] flex justify-start items-center gap-2.5">
            <input
              placeholder="ابحث باسم الدوره"
              className=" placeholder:text-white justify-center text-white text-base whitespace-nowrap font-semibold "
            />
          </div>

          <Dropdown
          rootClassName="flex-1"
          className="flex-1"
            trigger={["click"]}
            menu={{ items: categoryItems, onClick: handleMenuClick(setSelectedCategory) }}
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
            menu={{ items: sortItems, onClick: handleMenuClick(setSelectedSort) }}
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
            menu={{ items: ratingItems, onClick: handleMenuClick(setSelectedRating) }}
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
            menu={{ items: typeItems, onClick: handleMenuClick(setSelectedType) }}
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
        </div>
        <div className=" px-12 py-6 bg-secondary hover:bg-secondary-dark cursor-pointer rounded-[20px] inline-flex flex-col justify-center items-center gap-2.5">
          <div className="justify-center text-white text-base whitespace-nowrap font-semibold ">
            بحث
          </div>
        </div>
      </div>
  );
};

export default CoursesFilters;
