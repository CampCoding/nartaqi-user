"use client";

import React, { useRef } from "react";
import PagesBanner from "../../../components/ui/PagesBanner";
import CourseCard from "../../../components/ui/Cards/CourseCard";
import Container from "../../../components/ui/Container";
import LoadingPage from "../../../components/shared/Loading";
import LoadingContent from "../../../components/shared/LoadingContent";
import useMoreLatestRounds from "../../../components/shared/Hooks/useGetMoreNewestRounds";
import { useSelector } from "react-redux";

const FreeCourses = () => {
  const loadMoreRef = useRef(null);
  const user = useSelector((state) => state?.auth);

  const { rounds, loading, fetching, error, hasMore, loadMore } =
    useMoreLatestRounds(user?.user?.id, 3);

  if (loading) return <LoadingPage />;

  return (
    <>
      <PagesBanner
        variant={"normal"}
        title="احدث الدورات"
        image={"/images/Frame 1000005155.png"}
        breadcrumb={[
          { title: "الرئيسية", link: "/" },
          { title: "احدث الدورات", link: "#" },
        ]}
      />

      <Container className="my-[32px]">
        {error ? (
          <div className="p-4 rounded border border-red-200 text-red-700">
            {typeof error === "string" ? error : "حدث خطأ أثناء جلب الدورات"}
          </div>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-[32px] lg:gap-[42px]">
          {rounds?.map((course) => {
            const payload = {
              ...course,
              id: course?.id,
              name: course?.name,
              description: course?.description,
              image_url: course?.image_url || "",
              start_date: course?.start_date,
              end_date: course?.end_date, // ✅ ADDED
              free: course?.free,
              price: course?.price,
              enrolled: course?.own || false,
              own: course?.own || false, // ✅ ADDED
              favorite: course?.fav,
              fav: course?.fav,
              user_rated: course?.user_rated || false, // ✅ ADDED
              is_rated: course?.is_rated || false, // ✅ ADDED
              roundBook: course?.round_road_map_book,
              rating: course?.average_rating,
              totalRates: course?.ratings_count,
              ratings_count: course?.ratings_count || 0,
              capacity: course?.capacity,
              students_count: course?.students_count || 0,
              lessons_count: course?.lessons_count || 0,
              gender: course?.gender,
              teachers: course?.teachers || [],
              course: { name: course?.category_parts_name },
            };

            return (
              <CourseCard
                key={course?.id}
                isRegistered
                course={course}
                payload={payload}
                freeWidth={true}
                type="0"
                buttonStyle=""
              />
            );
          })}
        </div>

        <div className="flex justify-center items-center">
          <div
            ref={loadMoreRef}
            className="py-6 text-center text-neutral-600 text-sm w-full"
          >
            {fetching && (
              <div className="w-full flex justify-center items-center h-[200px]">
                <LoadingContent />
              </div>
            )}

            {!fetching && hasMore && (
              <button
                onClick={loadMore}
                className="px-5 py-2 rounded-lg border border-slate-200 hover:border-slate-300"
              >
                تحميل المزيد
              </button>
            )}

            {!hasMore && !fetching && (
              <p className="text-gray-400 mt-2">لا يوجد المزيد من النتائج</p>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default FreeCourses;
