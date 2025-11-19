"use client";
import React, { useEffect, useRef } from "react";
import PagesBanner from "../../../components/ui/PagesBanner";
import CoursesFilters from "../../../components/ui/CoursesFilters";
import CourseCard from "../../../components/ui/Cards/CourseCard";
import Testimonials from "../../../components/Testimonials";
import Container from "../../../components/ui/Container";
import { useGetNewestRounds } from "../../../components/shared/Hooks/useGetNewestCourses";
import LoadingPage from "../../../components/shared/Loading";

const FreeCourses = () => {
  const {
    data,
    loading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetNewestRounds();
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
  console.log(data);

  return (
    <>
      {loading ? (
        <>
          <LoadingPage />
        </>
      ) : (
        <>
          <div>
            {/* variant = "large" or "normal" */}
            <PagesBanner
              variant={"normal"}
              title="احدث الدورات"
              image={"/images/Frame 1000005155.png"}
              breadcrumb={[
                {
                  title: "الرئيسية",
                  link: "/",
                },
                {
                  title: "احدث الدورات",
                  link: "#",
                },
              ]}
            />
            <Container className=" my-[32px]">
              {/*    <div className="  mb-[32px] md:mb-[48px]">
                <CoursesFilters />
              </div> */}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-colss-2 lg:grid-cols-3 gap-4 sm-gap-6 md:gap-[32px] lg:gap-[42px] ">
                {data?.pages?.map((page, index) => (
                  <React.Fragment key={index}>
                    {page?.message?.map((course) => {
                      console.log(course);

                      const payload = {
                        id: course?.id,
                        name: course?.name,
                        goal: course?.description,
                        image_url: course?.image_url || "",
                        start_date: course?.start_date,
                        free: course.free,

                        enrolled: false, // هنا بتحدد هو Enrolled ولا لا

                        // دي جاية من API → payload.course.name
                        course: {
                          name: course?.course_categories?.name,
                        },

                        // دي جاية من API → payload.teacher.*
                        teacher: {
                          id: course?.teacher?.id,
                          name: course?.teacher?.name,
                          image_url: course?.teacher.image_url,
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
                  {/* Loader يظهر فقط مع الاسكرول */}
                  {isFetchingNextPage && (
                    <div className="w-full flex justify-center items-center h-[200px]">
                      <LoadingContent />
                    </div>
                  )}

                  {/* مفيش صفحات تاني */}
                  {!hasNextPage && isFetchingNextPage && (
                    <p className="text-gray-400 mt-2">
                      لا يوجد المزيد من النتائج
                    </p>
                  )}
                </div>
              </div>
            </Container>
          </div>
        </>
      )}
    </>
  );
};

export default FreeCourses;
