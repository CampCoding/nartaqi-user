"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import PagesBanner from "../../../components/ui/PagesBanner";
import CoursesFilters from "../../../components/ui/CoursesFilters";
import CourseCard from "../../../components/ui/Cards/CourseCard";
import Container from "../../../components/ui/Container";
import { useGetCourseRounds } from "../../../components/shared/Hooks/useGetCourseRounds";
import LoadingPage from "../../../components/shared/Loading";
import LoadingContent from "../../../components/shared/LoadingContent";
import TeachersTestimonials from "../../../components/Teachers/TeachersTestimonials";
import { useParams } from "next/navigation";
import {
  buildFiltersQuery,
  normalizeFilters,
} from "../../../components/utils/helpers/filter";
import { useGetCategoryPart } from "../../../components/shared/Hooks/useGetCategoryPart";

const TeachersCourses = () => {
  const { id } = useParams();
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    sort: "",
    rating: "",
    type: "",
    gender: "",
    level: "",
  });

  const {
    parts,
    loading: partsLoading,
    error: partsError,
  } = useGetCategoryPart(id);

  const apiParams = useMemo(() => {
    const normalized = normalizeFilters(filters);
    const q = buildFiltersQuery(normalized);
    q.course_category_id = id;
    return q;
  }, [filters, id]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    loading,
    error,
    refetch,
  } = useGetCourseRounds(apiParams);

  const loadMoreRef = useRef(null);

  useEffect(() => {
    refetch();
  }, [apiParams]);

  return (
    <div>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <PagesBanner
            variant="normal"
            title="الرخصة المهنية"
            image="/images/Frame 1000005155.png"
          />

          <Container className="mt-[32px]">
            <div className="mb-[32px] md:mb-[48px]">
              <CoursesFilters
                onFiltersChange={setFilters}
                categoryParts={parts.message}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.pages?.map((page, index) => (
                <React.Fragment key={index}>
                  {page?.data.message.map((course) => {
                    console.log(course);

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
                      teacher: course?.teachers.map((teacher) => {
                        return {
                          name: teacher?.name,
                          image_url: teacher?.image_url,
                        };
                      }),
                    };
                    return (
                      <CourseCard
                        key={course?.id}
                        isRegistered
                        buttonStyle=""
                        payload={payload}
                        freeWidth
                        type="0"
                      />
                    );
                  })}
                </React.Fragment>
              ))}
            </div>

            <div className="flex justify-center items-center mt-6">
              <div ref={loadMoreRef} className="py-6 text-center">
                {isFetchingNextPage && (
                  <div className="flex justify-center h-[200px]">
                    <LoadingContent />
                  </div>
                )}

                {hasNextPage && !isFetchingNextPage && (
                  <button
                    onClick={fetchNextPage}
                    className="px-4 py-3 bg-secondary rounded-[10px] text-white font-semibold"
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
