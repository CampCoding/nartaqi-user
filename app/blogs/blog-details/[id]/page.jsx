import React from "react";
import PagesBanner from "./../../../../components/ui/PagesBanner";
import { BlogContent } from "../../../../components/BlogDetailPage/BlogContent";
import RelatedBlogs from "../../../../components/BlogDetailPage/RelatedBlogs";
import BlogComments from "../../../../components/BlogDetailPage/BlogComments";

const BlogDetails = () => {
  return (
    <div className="">
      <PagesBanner
        image={"/images/Frame 1000004881 (1).png"}
        objectPosition={"100%_100%"}
        variant="large"
        title="مستقبل التعلم عبر الإنترنت: الاتجاهات والتقنيات"
        breadcrumb={[
          {
            title: "الرئيسية",
            link: "/",
          },
          {
            title: "المدونة",
            link: "/",
          },
        ]}
      />
      <div className="container mx-auto px-[64px] mt-[32px] mb-[100px]">
        <BlogContent />
        <RelatedBlogs />
        <BlogComments />
      </div>
    </div>
  );
};

export default BlogDetails;
