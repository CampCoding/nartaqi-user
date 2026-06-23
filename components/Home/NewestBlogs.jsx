"use client";
import React, { useCallback, useState } from "react";
import { BlogCard } from "../ui/Cards/BlogCard";
import Link from "@/components/ui/NavLink";
import Container from "../ui/Container";
import { useRouter } from "next/navigation";

const NewestBlogs = ({ blogs = [] }) => {
  const router = useRouter();
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  const handleBlogClick = useCallback((id) => {
    setSelectedBlogId(id);
  }, []);

  const fallbackBlogs = [
    {
      id: 1,
      title: "مقال تجريبي",
      content: "محتوى المقال التجريبي",
      image: "/images/blog-placeholder.jpg",
      published_at: new Date().toISOString(),
      views: 0,
      comments_count: 0,
    },
  ];

  const displayBlogs = blogs?.length > 0 ? blogs : fallbackBlogs;

  return (
    <div className="bg-gradient-to-b from-[#D5E9E7] to-white">
      <Container className="flex flex-col mx-auto mb-12 sm:mb-16 md:mb-20 lg:mb-[102px] pt-6 sm:pt-7 md:pt-8">
        <div className="mx-auto inline-flex items-center justify-center gap-2.5 px-7 sm:px-10 md:px-14 py-2.5 sm:py-3 md:py-4 bg-primary-bg rounded-[16px] sm:rounded-[20px] md:rounded-[25px]">
          <div className="font-bold text-primary text-lg sm:text-xl md:text-2xl lg:text-3xl">
            أحدث المقالات
          </div>
        </div>

        {displayBlogs?.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-[26px] mt-6 sm:mt-7 md:mt-[32px]">
              {displayBlogs.slice(0, 3).map((item) => (
                <BlogCard
                  key={item.id}
                  freeWidth
                  item={item}
                  handleBlogClick={() => {
                    setSelectedBlogId(item.id);
                    router.push(`/blogs/blog-details/${item.id}`);
                  }}
                  selected={selectedBlogId}
                />
              ))}
            </div>

            <Link
              href="/blogs"
              className="!border-2 border-black focus:ring-primary-dark group hover:bg-primary-dark mt-6 sm:mt-7 md:mt-10 lg:mt-[48px] w-fit mx-auto inline-flex items-center justify-center gap-2 px-8 sm:px-10 md:px-16 lg:px-20 py-2.5 sm:py-3 md:py-5 lg:py-6 bg-foundation-bluedarker rounded-[20px] sm:rounded-[25px] md:rounded-[30px] transition-all duration-200 hover:opacity-90 focus:outline-none"
              aria-label="أظهر المزيد"
            >
              <div className="text-bold text-primary-dark group-hover:text-white text-sm sm:text-base text-center">
                أظهر المزيد
              </div>
            </Link>
          </>
        ) : (
          <div className="text-center py-10 sm:py-12 text-gray-500 text-sm sm:text-base">
            لا توجد مقالات متاحة حالياً
          </div>
        )}
      </Container>
    </div>
  );
};

export default NewestBlogs;