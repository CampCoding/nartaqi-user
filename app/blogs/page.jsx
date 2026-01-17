"use client";
import React, { useCallback, useState } from "react";
import PagesBanner from "../../components/ui/PagesBanner";
import { BlogCard } from "../../components/ui/Cards/BlogCard";
import Link from "next/link";
import Container from "../../components/ui/Container";
import { useGetBlogs } from "../../components/shared/Hooks/useGetBlogs.jsx";
import LoadingPage from "../../components/shared/Loading";
import NoContent from "../../components/shared/NoContent";

const BlogsPage = () => {
  const { blogs, loading, error } = useGetBlogs();

  const [selectedBlogId, setSelectedBlogId] = useState(null);

  const handleBlogClick = useCallback((id) => {
    setSelectedBlogId(id);
  }, []);
  if (loading) return <LoadingPage />;

  return (
    <div>
      <PagesBanner
        variant="normal"
        height="h-[387px]"
        title="المدونة"
        image="/images/Frame 1000004929.png"
        breadcrumb={[
          { title: "الرئيسية", link: "/" },
          { title: "المدونة", link: "/blogs" },
        ]}
      />

      {blogs.message.length > 0 ? (
        <>
          <Container className="grid grid-cols-1 gap-4 mt-6 mb-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-[24px] lg:mt-[32px] lg:mb-[48px]">
            {blogs?.message?.map((item) => (
              <Link
                href={`/blogs/blog-details/${item.id}`}
                key={item.id}
                className="block"
              >
                <BlogCard
                  freeWidth
                  item={item}
                  handleBlogClick={() => {
                    setSelectedBlogId(item.id);
                    router.push(`/blogs/blog-details/${item.id}`);
                  }}
                  selected={selectedBlogId}
                />
              </Link>
            ))}
          </Container>
        </>
      ) : (
        <>
          <div className="">
            <div className="self-stretch text-right justify-start text-text text-xl lg:text-2xl font-bold">
              <NoContent title={"لا توجد مقالات "} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogsPage;
