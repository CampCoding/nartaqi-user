"use client";
import React, { useEffect, useRef } from "react";
import PagesBanner from "../../../components/ui/PagesBanner";
import CoursesFilters from "../../../components/ui/CoursesFilters";
import CourseCard from "../../../components/ui/Cards/CourseCard";
import Testimonials from "../../../components/Testimonials";
import Container from "../../../components/ui/Container";
import { useGetCourseRounds } from "../../../components/shared/Hooks/useGetCourseRounds";

const TeachersCourses = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, loading } =
    useGetCourseRounds();
  console.log(data?.pages);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage]);

  return (
    <div>
      {/* variant = "large" or "normal" */}
      <PagesBanner
        variant={"normal"}
        title="الرخصة المهنية"
        image={"/images/Frame 1000005155.png"}
      />
      <Container className=" mt-[32px]">
        <div className="  mb-[32px] md:mb-[48px]">
          <CoursesFilters />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-colss-2 lg:grid-cols-3 gap-4 sm-gap-6 md:gap-[32px] lg:gap-[42px] ">
          {data?.pages?.map((page, index) => (
            <React.Fragment key={index}>
              {page?.data.message.map((course) => (
                <CourseCard
                  isRegistered
                  course={course}
                  freeWidth={true}
                  type="teachers"
                  buttonStyle=""
                />
              ))}
            </React.Fragment>
          ))}
        </div>
        <div
          ref={loadMoreRef}
          className="py-6 text-center text-neutral-600 text-sm"
        >
       
        </div>
      </Container>
      <Testimonials title="أراء المعلمين" />
    </div>
  );
};

export default TeachersCourses;
