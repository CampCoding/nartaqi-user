import React from "react";
import { BlogCard } from './../ui/Cards/BlogCard';
import Link from "next/link";

const RelatedBlogs = () => {
  return (
    <div className="">
      <h2 className="text-secondary text-2xl font-bold leading-8 ">
        المقالات ذات الصلة
      </h2>

      <div className="grid grid-cols-3 gap-[24px] container mx-auto mt-[32px] ">
        {[
          "/images/FRAME (1).png",
          "/images/FRAME (2).png",
          "/images/FRAME.png",

        ].map((item, index) => (
          <Link href={"/blogs/blog-details/123"}>
          <BlogCard freeWidth={true} key={index} image={item} />
          </Link>
        ))}
      </div>


    </div>
  );
};

export default RelatedBlogs;
