"use client";

import { TopServices } from "../components/Home/TopServices";
import { HeaderHero } from "../components/Home/Hero";
import { AboutUs } from "../components/Home/AboutUs";
import CoursesCategoriesLable from "../components/ui/CoursesCategoriesLable";
import CategorySection from "../components/Home/CategorySection";
import HomeSection4Courses from "../components/Home/HomeSection4Courses";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import WhatOurXSay from "../components/Home/WhatOurStudentsSay";
import HonorRoll from "../components/Home/HonorRoll";
import NewestBlogs from "../components/Home/NewestBlogs";
import { MobileHero } from "../components/Home/Hero.mobile";
import { useHomeData } from "../hooks/useHomeData";
import { Icon } from "@iconify/react";
import LoadingPage from "../components/shared/Loading";

export default function Home() {
  const { data, isLoading, isError, error, refetch } = useHomeData();
  console.log(error);

  // Loading State
  if (isLoading) {
    return <LoadingPage />;
  }

  // Error State
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Icon
            icon="mdi:alert-circle-outline"
            className="w-16 h-16 text-red-600 mx-auto"
          />
          <h2 className="text-2xl font-bold text-red-600">حدث خطأ</h2>
          <p className="text-gray-600">
            {error.response.data.message || "فشل تحميل البيانات"}
          </p>
          <button
            onClick={refetch}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 mx-auto"
          >
            <Icon icon="mdi:refresh" className="w-5 h-5" />
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  // Extract data
  const latestRounds = data?.latestRounds || [];
  const categories = data?.categories_with_rounds || [];
  const studentRates = data?.student_rates || [];
  const latestBlogs = data?.latestBlogs || [];

  // Define colors for each category
  const categoryColors = ["secondary", "primary", "warning"];

  return (
    <>
      <TopServices />

      <div className="hidden md:block">
        <HeaderHero />
      </div>

      <div className="block md:hidden">
        <MobileHero />
      </div>

      <AboutUs />

      <CoursesCategoriesLable />

      {/* Dynamic Category Sections */}
      {categories?.map((category, index) => (
        <CategorySection
          key={category.id}
          category={category}
          color={categoryColors[index % categoryColors.length]}
          index={index}
        />
      ))}

      <HomeSection4Courses latestRounds={latestRounds} />

      <WhyChooseUs />

      <WhatOurXSay studentRates={studentRates} />

      <HonorRoll />

      <NewestBlogs blogs={latestBlogs} />
    </>
  );
}
