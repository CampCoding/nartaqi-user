"use client";
import React from "react";
import Link from "@/components/ui/NavLink";
import Container from "../ui/Container";
import CoursesCategoryCard from "./../ui/Cards/CoursesCategoryCard";
import CoursesCategoryCardMobile from "../ui/Cards/CoursesCategoryCard.mobile";

const CategorySection = ({ category, color, index }) => {
  if (!category) return null;

  const categoryParts = category.category_parts || [];

  const colorClasses = {
    secondary: {
      bg: "bg-secondary",
      text: "text-secondary-light",
      border: "border-secondary",
      hover: "hover:bg-secondary",
      hoverText: "hover:text-white",
      buttonText: "text-secondary",
    },
    primary: {
      bg: "bg-primary",
      text: "text-primary-light",
      border: "border-primary",
      hover: "hover:bg-primary",
      hoverText: "hover:text-white",
      buttonText: "text-primary",
    },
    warning: {
      bg: "bg-warning",
      text: "text-warning-light",
      border: "border-warning",
      hover: "hover:bg-warning",
      hoverText: "hover:text-white",
      buttonText: "text-warning",
    },
  };

  const colors = colorClasses[color] || colorClasses.secondary;

  return categoryParts && categoryParts.length > 0 ? (
    <Container>
      {/* Header */}
      <div className="flex items-center justify-between mb-5 sm:mb-7 md:mb-8 mt-5 sm:mt-6 md:mt-12 lg:mt-[74px] gap-3 sm:gap-4">
        <div
          className={`flex items-center justify-center gap-2.5 px-3 sm:px-5 md:px-10 lg:px-14 py-2.5 sm:py-3 md:py-6 lg:py-8 relative ${colors.bg} rounded-[12px] sm:rounded-[15px] md:rounded-[20px] lg:rounded-[25px] min-w-[110px] sm:min-w-[140px] md:min-w-[200px] lg:min-w-[261px]`}
        >
          <div
            className={`relative flex items-center justify-center w-fit mt-[-1.00px] font-medium ${colors.text} text-xs sm:text-sm md:text-xl lg:text-2xl text-left leading-5 whitespace-nowrap`}
          >
            {category.name}
          </div>
        </div>

        <Link href={`/courses/${category.id}`}>
          <div
            className={`inline-flex items-center justify-center gap-2.5 px-3 sm:px-4 md:px-6 lg:px-8 py-2.5 sm:py-3 md:py-4 lg:py-5 relative bg-bg rounded-[12px] sm:rounded-[15px] md:rounded-[20px] lg:rounded-[25px] border border-solid ${colors.border} ${colors.hover} group cursor-pointer transition-all duration-300 ease-in-out`}
          >
            <div
              className={`relative flex items-center justify-center w-fit mt-[-1.00px] font-semibold group-hover:text-white ${colors.buttonText} text-xs sm:text-sm md:text-lg lg:text-xl text-left leading-5 whitespace-nowrap`}
            >
              عرض المزيد
            </div>
          </div>
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="gap-3 sm:gap-4 md:gap-5 lg:gap-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categoryParts?.map((item) => (
          <Link
            href={`/courses/${category.id}?category=${item.id}&categoryName=${item.name}`}
            key={item.id}
          >
            {/* Desktop Card */}
            <div className="md:block hidden">
              <CoursesCategoryCard
                color={color}
                data={{
                  image: item.image_url,
                  title: item.name,
                  courses: item.rounds_count,
                }}
                freeWidth={true}
              />
            </div>

            {/* Mobile Card */}
            <div className="block md:hidden">
              <CoursesCategoryCardMobile
                color={color}
                data={{
                  image: item.image_url,
                  title: item.name,
                  courses: item.rounds_count,
                }}
                freeWidth={true}
              />
            </div>
          </Link>
        ))}
      </div>
    </Container>
  ) : null;
};

export default CategorySection;