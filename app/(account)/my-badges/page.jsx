"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BadgeCard } from "../../../components/ui/Cards/BadgeCard";
import { useSelector } from "react-redux";
import LoadingPage from "../../../components/shared/Loading";

const MyBadgesPage = () => {
  const [allBadges, setAllBadges] = useState([]);
  const [categories, setCategories] = useState(["الكل"]);
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/badges`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.status === "success") {
          // Map API response to badges array
          const badges = response.data?.message.map((item) => ({
            id: item.id,
            title: item.badge.name,
            subtitle: item.badge.description,
            image: item.badge.image_path,
            category: item.badge.category,
          }));

          setAllBadges(badges);

          const uniqueCategories = new Set(
            badges.map((badge) => badge.category)
          );
          setCategories(["الكل", ...Array.from(uniqueCategories)]);
        }
      } catch (error) {
        console.error("Error fetching badges:", error);
        setError(
          error.response?.data?.message || "حدث خطأ أثناء تحميل الشارات"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, []);

  const visibleBadges =
    activeCategory === "الكل"
      ? allBadges
      : allBadges.filter((b) => b.category === activeCategory);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return (
      <main className="w-full">
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full">
      <header className="flex flex-col items-start gap-2 relative mb-6 sm:mb-[24px]">
        <h1 className="font-bold text-text text-xl sm:text-2xl relative flex items-center self-stretch tracking-[0] leading-[normal]">
          شاراتي
        </h1>

        <p className="font-medium text-text-alt text-sm sm:text-base relative flex items-center self-stretch tracking-[0] leading-[normal]">
          استكشف مجموعتك من الشارات التي حصلت عليها لإنجازاتك التعليمية
          المتميزة.
        </p>
      </header>

      <BadgesNavs
        items={categories}
        value={activeCategory}
        onChange={setActiveCategory}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-3 sm:gap-x-[14px] gap-y-6 sm:gap-y-[32px] mt-6 sm:mt-[32px] place-items-center">
        {visibleBadges.length > 0 ? (
          visibleBadges.map((badge) => (
            <BadgeCard
              key={badge.id}
              title={badge.title}
              subtitle={badge.subtitle}
              image={badge.image}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-text-alt">لا توجد شارات في هذه الفئة</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default MyBadgesPage;

export const BadgesNavs = ({ items, value, onChange, className = "" }) => {
  const defaultItems = ["الكل"];

  const labels =
    Array.isArray(items) && items.length > 0 ? items : defaultItems;

  const [selected, setSelected] = useState(value ?? labels[0]);

  useEffect(() => {
    if (value !== undefined) {
      setSelected(value);
    }
  }, [value]);

  const handleClick = (label) => {
    if (value === undefined) {
      setSelected(label);
    }
    onChange?.(label);
  };

  const isScrollable = labels.length > 5;

  return (
    <nav
      className={`w-full bg-primary-light rounded-[20px] sm:rounded-[25px] p-3 sm:p-4 ${className}`}
      role="navigation"
      aria-label="Navigation menu"
    >
      {/* Mobile */}
      <div className="xl:hidden">
        <div className="flex items-center gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
          <div className="flex items-center gap-2 min-w-max">
            {/*  {labels.map((label, index) => (
              <button
                key={index}
                className={`
                  px-4 py-3 rounded-[12px] sm:rounded-[15px] 
                  inline-flex items-center justify-center 
                  transition-all duration-200 whitespace-nowrap
                  min-w-[80px] flex-shrink-0 snap-start
                  ${selected === label ? "bg-primary" : "hover:bg-primary/10"}
                `}
                type="button"
                aria-current={selected === label ? "page" : undefined}
                onClick={() => handleClick(label)}
              >
                <span
                  className={`
                    text-sm sm:text-base font-medium text-center
                    ${selected === label ? "text-white font-bold" : "text-text"}
                    [direction:rtl]
                  `}
                >
                  {label}
                </span>
              </button>
            ))} */}
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden xl:block">
        {isScrollable ? (
          // Scrollable version when more than 5 items
          <div className="overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            <div className="flex items-center gap-2 min-w-max pb-2">
              {/*  {labels.map((label, index) => (
                <button
                  key={index}
                  className={`
                    px-6 py-4 rounded-[15px] 
                    inline-flex items-center justify-center 
                    transition-all duration-200 whitespace-nowrap
                    min-w-[140px] flex-shrink-0 snap-start
                    ${selected === label ? "bg-primary" : "hover:bg-primary/10"}
                  `}
                  type="button"
                  aria-current={selected === label ? "page" : undefined}
                  onClick={() => handleClick(label)}
                >
                  <span
                    className={`
                      text-base font-medium text-center leading-tight
                      ${
                        selected === label
                          ? "text-white font-bold"
                          : "text-text"
                      }
                      [direction:rtl]
                    `}
                  >
                    {label}
                  </span>
                </button>
              ))} */}
            </div>
          </div>
        ) : (
          // Grid version when 5 or less items
          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${labels.length}, 1fr)` }}
          >
            {labels.map((label, index) => (
              <button
                key={index}
                className={`
                  px-4 py-4 rounded-[15px] 
                  inline-flex items-center justify-center 
                  transition-all duration-200 
                  ${selected === label ? "bg-primary" : "hover:bg-primary/10"}
                `}
                type="button"
                aria-current={selected === label ? "page" : undefined}
                onClick={() => handleClick(label)}
              >
                <span
                  className={`
                    text-base font-medium text-center leading-tight
                    ${selected === label ? "text-white font-bold" : "text-text"}
                    [direction:rtl]
                  `}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
