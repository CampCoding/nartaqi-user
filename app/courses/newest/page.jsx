"use client";

import React, { useRef } from "react";
import PagesBanner from "../../../components/ui/PagesBanner";
import CourseCard from "../../../components/ui/Cards/CourseCard";
import Container from "../../../components/ui/Container";
import LoadingPage from "../../../components/shared/Loading";
import LoadingContent from "../../../components/shared/LoadingContent";
import useMoreLatestRounds from "../../../components/shared/Hooks/useGetMoreNewestRounds";
import { useSelector } from "react-redux";

// ✅ hook الجديد (Axios)
const FreeCourses = () => {
  const loadMoreRef = useRef(null);
  const user = useSelector((state) => state?.auth);
console.log("user" , user)
  // ✅ غيّر 6 للـ student_id الحقيقي (أو جيبه من auth/session)
  const {
    rounds,
    loading,
    fetching,
    error,
    hasMore,
    loadMore,
  } = useMoreLatestRounds(user?.user?.id, 3);

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
              id: course?.id,
              name: course?.name,
              description: course?.description,
              image_url: course?.image_url || "",
              start_date: course?.start_date,
              free: course?.free,
              price: course?.price,
              enrolled: course?.own,
              favorite: course?.fav,
              roundBook: course?.round_road_map_book,
              rating: course?.average_rating,
              totalRates: course?.ratings_count,
              capacity: course?.capacity,
              course: { name: course?.category_parts_name },
              teacher: course?.teachers?.map((t) => ({
                name: t?.name,
                image_url: t?.image_url,
              })),
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

        {/* load more area */}
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
