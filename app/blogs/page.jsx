import React from "react";
import PagesBanner from "../../components/ui/PagesBanner";
import { BlogCard } from "../../components/ui/Cards/BlogCard";
import Link from "next/link";
import Container from "../../components/ui/Container";

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

      <Container className="  grid grid-cols-1 gap-4  mt-6 mb-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-[24px]  lg:mt-[32px] lg:mb-[48px]">
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
          <Link href={"/blogs/blog-details/123"} key={index}>
            {/* It's better practice to put the key on the outermost element in the loop */}
            <BlogCard freeWidth={true} image={item} />
          </Link>
        ))}
      </Container>
    </div>
  );
};

export default BlogsPage;
