import React from "react";
import PagesBanner from "./../../../../components/ui/PagesBanner";
import { BlogContent } from "../../../../components/BlogDetailPage/BlogContent";
import RelatedBlogs from "../../../../components/BlogDetailPage/RelatedBlogs";
import BlogComments from "../../../../components/BlogDetailPage/BlogComments";
import Container from "../../../../components/ui/Container";

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
      <Container className={"mt-[32px] mb-[100px]"}>
          <BlogContent />
          <RelatedBlogs />
          <BlogComments />
      </Container>
    </div>
  );
};

export default BlogDetails;
