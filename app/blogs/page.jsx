import React from "react";
import PagesBanner from "../../components/ui/PagesBanner";
import { BlogCard } from "../../components/ui/Cards/BlogCard";

const BlogsPage = () => {
  return (
    <div>
      <PagesBanner
        variant={"normal"}
        height="h-[387px]"
        title="المدونة"
        image={"/images/Frame 1000004929.png"}
        breadcrumb={[
          {
            title: "الرئيسية",
            link: "/",
          },
          {
            title: "المدونة",
            link: "/students-courses",
          },
        ]}
      />

      <div className="grid grid-cols-3 gap-[24px] container mx-auto px-[64px] mt-[32px] mb-[48px]">
        {[
          "/images/FRAME (1).png",
          "/images/FRAME (2).png",
          "/images/FRAME.png",
          "/images/FRAME (1).png",
          "/images/FRAME (2).png",
          "/images/FRAME.png",
          "/images/FRAME (1).png",
          "/images/FRAME (2).png",
          "/images/FRAME.png",
          "/images/FRAME (1).png",
          "/images/FRAME (2).png",
          "/images/FRAME.png",
          "/images/FRAME (1).png",
          "/images/FRAME (2).png",
          "/images/FRAME.png",
          "/images/FRAME (1).png",
          "/images/FRAME (2).png",
          "/images/FRAME.png",
          "/images/FRAME (1).png",
          "/images/FRAME (2).png",
          "/images/FRAME.png",
          "/images/FRAME (1).png",
          "/images/FRAME (2).png",
          "/images/FRAME.png",
        ].map((item, index) => (
          <BlogCard freeWidth={true} key={index} image={item} />
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
