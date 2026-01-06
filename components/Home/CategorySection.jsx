"use client";
import React from "react";
import Link from "next/link";
import Container from "../ui/Container";
import CoursesCategoryCard from "./../ui/Cards/CoursesCategoryCard";
import CoursesCategoryCardMobile from "../ui/Cards/CoursesCategoryCard.mobile";

const CategorySection = ({ category, color, index }) => {
  if (!category) return null;

  const categoryParts = category.category_parts || [];

  // Define color classes based on color prop
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
      <div className="flex items-center justify-between mb-8 mt-6 md:mt-[74px]">
        <div
          className={`flex md:min-w-[261px] items-center justify-center gap-2.5 px-4 py-3 md:px-14 md:py-8 relative ${colors.bg} rounded-[15px] md:rounded-[25px]`}
        >
          <div
            className={`relative flex items-center justify-center w-fit mt-[-1.00px] font-medium ${colors.text} text-[12px] md:text-2xl text-left leading-5 whitespace-nowrap`}
          >
            {category.name}
          </div>
        </div>

        <Link href={`/courses/${category.id}`}>
          <div
            className={`inline-flex items-center justify-center gap-2.5 px-4 py-3 md:px-8 md:py-5 relative bg-bg rounded-[15px] md:rounded-[25px] border border-solid ${colors.border} ${colors.hover} group cursor-pointer transition-all duration-300 ease-in-out`}
          >
            <div
              className={`relative flex items-center justify-center w-fit mt-[-1.00px] font-semibold group-hover:text-white ${colors.buttonText} text-[12px] md:text-xl text-left leading-5 whitespace-nowrap`}
            >
              عرض المزيد
            </div>
          </div>
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="gap-4 md:gap-6 grid grid-cols-2 md:grid-cols-4">
        {categoryParts?.map((item) => (
          <Link
            href={`/courses/${category.id}?category=${item.id}&&categoryName=${item.name}`}
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

            {/* Mobile Card - Now with color prop */}
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
