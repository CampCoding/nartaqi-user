// components/Teachers/TeachersTestimonials.jsx
"use client";

import React from "react";
import TestimonialCard from "@/components/ui/Cards/TestimonialCard";
import Container from "../ui/Container";
import useTopRatedTestimonials from "../shared/Hooks/useTopRatedTestimonials";

const TeachersTestimonials = ({ title = "آراء الطلاب" }) => {
  // ✅ مش محتاج token لـ public endpoint
  const { testimonials, loading, error, refetch } = useTopRatedTestimonials();

  console.log("📊 Testimonials state:", { testimonials, loading, error }); // للتأكد

  return (
    <div>
      <main className="relative pb-4 bg-[linear-gradient(0deg,rgba(67,139,255,0.5)_0%,rgba(157,180,255,0.5)_32%,rgba(255,171,113,0.5)_59%,rgba(249,115,22,0.5)_80%,rgba(255,255,255,1)_96%)]">
        <header className="container mx-auto px-4 sm:px-8 md:px-[64px] pt-[48px] sm:pt-[72px]">
          <h1 className="font-bold text-text text-2xl sm:text-3xl md:text-[40px] tracking-[0] leading-[normal] text-right">
            {title}
          </h1>
        </header>

        <Container className="mx-auto px-4 sm:px-8 md:px-[64px] mt-[32px] sm:mt-[56px] pb-8">
          {/* Loading State */}
          {loading && <TestimonialsSkeleton />}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={refetch}
                className="px-6 py-2 bg-secondary text-white rounded-lg font-semibold hover:bg-secondary/90 transition"
              >
                إعادة المحاولة
              </button>
            </div>
          )}

          {/* Testimonials Grid */}
          {!loading && !error && testimonials?.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-[23px]">
              {testimonials.map((item, index) => (
                <TestimonialCard
                  key={item?.id || index}
                  payload={item}
                  type="students"
                  freeWidth={true}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && testimonials?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-alt text-lg">لا توجد تقييمات حالياً</p>
            </div>
          )}
        </Container>
      </main>
    </div>
  );
};

export default TeachersTestimonials;

/* Skeleton */
const TestimonialsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-[23px]">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-4 px-6 py-8 bg-white rounded-[25px] shadow-lg animate-pulse"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-32 bg-gray-200 rounded" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={j} className="w-5 h-5 bg-gray-200 rounded" />
            ))}
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-[90%] bg-gray-200 rounded" />
            <div className="h-4 w-[75%] bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};
