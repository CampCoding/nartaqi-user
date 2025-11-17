"use client";

import { TopServices } from "../components/Home/TopServices";
import { HeaderHero } from "../components/Home/Hero";
import { AboutUs } from "../components/Home/AboutUs";
import CoursesCategoriesLable from "../components/ui/CoursesCategoriesLable";
import HomeSection1 from "../components/Home/HomeSection1";
import HomeSection2 from "../components/Home/HomeSection2";
import HomeSection3 from "./../components/Home/HomeSection3";
import HomeSection4Courses from "../components/Home/HomeSection4Courses";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import WhatOurXSay from "../components/Home/WhatOurStudentsSay";
import HonorRoll from "../components/Home/HonorRoll";
import NewestBlogs from "../components/Home/NewestBlogs";
import { MobileHero } from "../components/Home/Hero.mobile";
import { useHomeData } from "../hooks/useHomeData";
import { Icon } from "@iconify/react";
import { useEffect } from "react";

export default function Home() {
  const { data, isLoading, isError, error, refetch } = useHomeData();

  // Loading State
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen gap-3">
        <Icon icon="eos-icons:loading" className="w-8 h-8 text-primary" />
        <span className="text-lg">جاري التحميل...</span>
      </div>
    );
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
          <p className="text-gray-600">{error || "فشل تحميل البيانات"}</p>
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
  const latestRounds = data?.latestRounds;
  const categories = data?.categories_with_rounds || [];
  const studentRates = data?.student_rates || [];
  const latestBlogs = data?.latestBlogs || [];

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

      <HomeSection1 categories={categories} />

      <HomeSection2 categories={categories} />

      <HomeSection3 categories={categories} />

      <HomeSection4Courses latestRounds={latestRounds} />

      <WhyChooseUs />

      <WhatOurXSay studentRates={studentRates} />

      <HonorRoll />
      <NewestBlogs blogs={latestBlogs} />
    </>
  );
}
