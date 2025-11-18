"use client";
import React, { useEffect, useRef } from "react";
import PagesBanner from "../../../components/ui/PagesBanner";
import CoursesFilters from "../../../components/ui/CoursesFilters";
import CourseCard from "../../../components/ui/Cards/CourseCard";

import Container from "../../../components/ui/Container";
import { useGetCourseRounds } from "../../../components/shared/Hooks/useGetCourseRounds";
import LoadingPage from "../../../components/shared/Loading";
import { Link } from "lucide-react";
import LoadingContent from "../../../components/shared/LoadingContent";
import { TestimonialCard } from "../../../components/Testimonials";
import TeachersTestimonials from "../../../components/Teachers/TeachersTestimonials";
import { useParams } from "next/navigation";

const TeachersCourses = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, loading } =
    useGetCourseRounds();
  const { id } = useParams();
  console.log(id);
  
  console.log(data?.pages);
  const loadMoreRef = useRef(null);
  /* 
  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage]); */

  return (
    <div>
      {/* variant = "large" or "normal" */}

      {loading ? (
        <>
          <LoadingPage />
        </>
      ) : (
        <>
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
                  {page?.data.message.map((course) => {
                    const payload = {
                      id: course?.id,
                      name: course?.name,
                      goal: course?.goal,
                      image_url: course?.image_url || "",
                      start_date: course?.start_date,
                      free: course.free,
                      price: course?.price,
                      enrolled: false, // هنا بتحدد هو Enrolled ولا لا
                      course: {
                        name: course?.course_categories?.name,
                      },

                      // دي جاية من API → payload.teacher.*
                      teacher: {
                        id: course?.teacher?.id,
                        name: course?.teacher?.name,
                        image_url: course?.teacher?.image_url,
                      },
                    };
                    return (
                      <CourseCard
                        isRegistered
                        course={course}
                        payload={payload}
                        freeWidth={true}
                        type="0"
                        buttonStyle=""
                      />
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
            <div className="flex justify-center items-center">
              <div
                ref={loadMoreRef}
                className="py-6 text-center text-neutral-600 text-sm"
              >
                {isFetchingNextPage && (
                  <div className="w-full flex justify-center items-center h-[200px] ">
                    <LoadingContent />
                  </div>
                )}

                {hasNextPage && !isFetchingNextPage && (
                  <button
                    onClick={fetchNextPage}
                    className="flex-1 px-3 sm:px-4 py-3 bg-secondary rounded-[8px] sm:rounded-[10px] flex justify-center items-center gap-2.5 transition-shadow duration-200 hover:shadow-[0_4px_12px_rgba(59,130,246,0.25)] text-bg text-xs sm:text-sm font-semibold"
                  >
                    تحميل المزيد
                  </button>
                )}

                {!hasNextPage && (
                  <p className="text-gray-400 mt-2">
                    لا يوجد المزيد من النتائج
                  </p>
                )}
              </div>
            </div>
          </Container>
          <TeachersTestimonials title="أراء الطلاب" />
        </>
      )}
    </div>
  );
};

export default TeachersCourses;
