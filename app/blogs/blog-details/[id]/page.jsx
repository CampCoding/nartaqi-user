"use client";
import React from "react";
import PagesBanner from "./../../../../components/ui/PagesBanner";
import { BlogContent } from "../../../../components/BlogDetailPage/BlogContent";
import RelatedBlogs from "../../../../components/BlogDetailPage/RelatedBlogs";
import BlogComments from "../../../../components/BlogDetailPage/BlogComments";
import Container from "../../../../components/ui/Container";
import { useParams } from "next/navigation";
import useGetBlog from "../../../../components/shared/Hooks/useGetBlog";
import LoadingPage from "../../../../components/shared/Loading";
import NoContent from "../../../../components/shared/NoContent";

const BlogDetails = () => {
  const { id } = useParams();
  const { blog, loading, error } = useGetBlog(id);
  console.log({ data: blog, loading, error });

  if (loading) return <LoadingPage />;
  if (error)
    return (
      <>
        <NoContent title={"حدث خطأ اثناء تحميل المقال"} />
      </>
    );

  return (
    <div className="">
      <PagesBanner
        image={blog?.image || "/images/Frame 1000004929.png"}
        objectPosition={"100%_100%"}
        variant="large"
        title={blog?.title}
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
        <BlogContent blog={blog} />
        <RelatedBlogs />
        <BlogComments
          count={blog?.comments_count}
          id={blog?.id}
          comments={blog?.comments}
        />
      </Container>
    </div>
  );
};

export default BlogDetails;
