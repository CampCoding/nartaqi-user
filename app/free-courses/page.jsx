"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import PagesBanner from "../../components/ui/PagesBanner";
import CoursesFilters from "../../components/ui/CoursesFilters";
import CourseCard from "../../components/ui/Cards/CourseCard";
import Container from "../../components/ui/Container";
import { useGetFreeRounds } from "../../components/shared/Hooks/useGetFreeRounds";
import LoadingContent from "../../components/shared/LoadingContent";
import LoadingPage from "../../components/shared/Loading";
import { usePathname } from "next/navigation";
import {
  buildFiltersQuery,
  normalizeFilters,
} from "../../components/utils/helpers/filter";

const FreeCourses = () => {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    sort: "",
    rating: "",
    type: "",
    gender: "",
    level: "",
  });

  const apiParams = useMemo(() => {
    const normalized = normalizeFilters(filters);
    return buildFiltersQuery(normalized);
  }, [filters]);

  const {
    data,
    loading,
    refetch,
    refetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetFreeRounds({ apiParams });

  const loadMoreRef = useRef(null);
  const pathName = usePathname();
  const isFree = pathName === "/free-courses";

  // Infinite Scroll
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

  // Refetch on filters change
  useEffect(() => {
    refetch();
  }, [apiParams]);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div>
          <PagesBanner
            variant="normal"
            title="الشروحات المجانية"
            breadcrumb={[
              { title: "الرئيسية", link: "/" },
              { title: "الشروحات المجانية", link: "#" },
            ]}
            image="/images/Frame 1000005155.png"
          />

          <Container className="my-[32px]">
            <div className="mb-[32px] md:mb-[48px]">
              <CoursesFilters
                onFiltersChange={setFilters}
                filters={filters}
                isFree={isFree}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm-gap-6 md:gap-[32px] lg:gap-[42px]">
              {data?.pages?.map((page, index) => (
                <React.Fragment key={index}>
                  {page?.data?.message?.map((course) => {
                    const payload = {
                      id: course?.id,
                      name: course?.name,
                      description: course?.description,
                      image_url: course?.image_url || "",
                      start_date: course?.start_date,
                      free: course.free,
                      price: course?.price,
                      enrolled: course?.own,
                      favorite: course?.fav,
                      roundBook: course?.round_road_map_book,
                      rating: course?.average_rating,
                      totalRates: course?.ratings_count,
                      capacity: course?.capacity,
                      course: {
                        name: course?.category_parts_name,
                      },
                      teacher: course?.teachers?.map((teacher) => ({
                        name: teacher?.name,
                        image_url: teacher?.image_url,
                      })),
                    };

                    return (
                      <CourseCard
                        key={course?.id}
                        isRegistered
                        free={isFree}
                        course={course}
                        payload={payload}
                        freeWidth={true}
                        isInFav
                        type="0"
                        buttonStyle=""
                      />
                    );
                  })}
                </React.Fragment>
              ))}
            </div>

            {/* Infinite Scroll Loader */}
            <div className="flex justify-center items-center">
              <div
                ref={loadMoreRef}
                className="py-6 text-center text-neutral-600 text-sm"
              >
                {isFetchingNextPage && (
                  <div className="w-full flex justify-center items-center h-[200px]">
                    <LoadingContent />
                  </div>
                )}

                {!hasNextPage && isFetchingNextPage && (
                  <p className="text-gray-400 mt-2">
                    لا يوجد المزيد من النتائج
                  </p>
                )}
              </div>
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default FreeCourses;
