"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
import { useHomeMeta } from "../hooks/useHomeMeta";

const getYouTubeId = (url) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/,
  );
  return match ? match[1] : null;
};
import { Icon } from "@iconify/react";
import LoadingPage from "../components/shared/Loading";
import { useSelector } from "react-redux";
import CursorLabelSection from "../components/ui/CursorLabelSection";

export default function Home() {
  const user = useSelector((state) => state.auth);
  const studentId = user?.user?.id || null;
  const { data, isLoading, isError, error, refetch } = useHomeData(studentId);
  const { banners, videoUrl } = useHomeMeta();
  const youtubeId = getYouTubeId(videoUrl);

  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            const headerHeight = 134;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }, 100);
      }
    };

    if (!isLoading) {
      handleHashScroll();
    }

    window.addEventListener("hashchange", handleHashScroll);

    return () => {
      window.removeEventListener("hashchange", handleHashScroll);
    };
  }, [isLoading]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center space-y-3 sm:space-y-4 max-w-md">
          <Icon
            icon="mdi:alert-circle-outline"
            className="w-12 h-12 sm:w-16 sm:h-16 text-red-600 mx-auto"
          />
          <h2 className="text-xl sm:text-2xl font-bold text-red-600">
            حدث خطأ
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            {error?.response?.data?.message ||
              error?.message ||
              "فشل تحميل البيانات"}
          </p>
          <button
            onClick={refetch}
            className="mt-3 sm:mt-4 px-4 sm:px-6 py-2 text-sm sm:text-base bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 mx-auto"
          >
            <Icon icon="mdi:refresh" className="w-4 h-4 sm:w-5 sm:h-5" />
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  const latestRounds = data?.latestRounds || [];
  const categories = data?.categories_with_rounds || [];
  const studentRates = data?.student_rates || [];
  const latestBlogs = data?.latestBlogs || [];

  const categoryColors = ["secondary", "primary", "warning"];

  return (
    <>
      <TopServices />
      <div className="hidden md:block">
        <HeaderHero banners={banners} videoUrl={videoUrl} />
        <CursorLabelSection />
      </div>

      <div className="block md:hidden">
        <MobileHero banners={banners} videoUrl={videoUrl} />
      </div>

      <AboutUs youtubeId={youtubeId || ""} />

      <CoursesCategoriesLable />

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
