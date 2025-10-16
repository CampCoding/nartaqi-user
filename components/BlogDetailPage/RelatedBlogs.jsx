import React from "react";
import { BlogCard } from "./../ui/Cards/BlogCard";
import Link from "next/link";

const RelatedBlogs = () => {
  const blogs = [
    { id: 1, image: "/images/FRAME (1).png" },
    { id: 2, image: "/images/FRAME (2).png" },
    { id: 3, image: "/images/FRAME.png" },
  ];

  return (
    <section className="w-full  py-8 sm:py-10 md:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <h2 className="text-secondary text-xl font-bold leading-7 sm:text-2xl sm:leading-8 md:text-[26px] md:leading-9 lg:text-[28px] lg:leading-10 mb-6 sm:mb-8 md:mb-10 text-right">
          المقالات ذات الصلة
        </h2>

        {/* Grid of Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {blogs.map((blog) => (
            <Link
              href={`/blogs/blog-details/${blog.id}`}
              key={blog.id}
              className="group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-[30px] transition-all"
            >
              <BlogCard freeWidth={true} image={blog.image} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedBlogs;
