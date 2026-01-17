"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import PagesBanner from "../../../components/ui/PagesBanner";
import CoursesFilters from "../../../components/ui/CoursesFilters";
import CourseCard from "../../../components/ui/Cards/CourseCard";
import Container from "../../../components/ui/Container";
import { useGetCourseRounds } from "../../../components/shared/Hooks/useGetCourseRounds";
import LoadingPage from "../../../components/shared/Loading";
import LoadingContent from "../../../components/shared/LoadingContent";
import TeachersTestimonials from "../../../components/Teachers/TeachersTestimonials";
import { useParams, useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  buildFiltersQuery,
  normalizeFilters,
} from "../../../components/utils/helpers/filter";

const FILTER_KEYS = ["search", "category", "sort", "rating", "type", "gender", "level"];

const DEFAULT_FILTERS = {
  search: "",
  category: "",
  sort: "sort_latest",
  rating: "rating_highest",
  type: "",
  gender: "",
  level: "",
};

function readFiltersFromSearchParams(searchParams) {
  return {
    search: searchParams.get("search") || DEFAULT_FILTERS.search,
    category: searchParams.get("category") || DEFAULT_FILTERS.category,
    sort: searchParams.get("sort") || DEFAULT_FILTERS.sort,
    rating: searchParams.get("rating") || DEFAULT_FILTERS.rating,
    type: searchParams.get("type") || DEFAULT_FILTERS.type,
    gender: searchParams.get("gender") || DEFAULT_FILTERS.gender,
    level: searchParams.get("level") || DEFAULT_FILTERS.level,
  };
}

function shallowEqual(a, b) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  for (const k of aKeys) {
    if (a[k] !== b[k]) return false;
  }
  return true;
}

const TeachersCourses = () => {
  const { id } = useParams();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  //////////////////////////////////////////////////////////////////////
  // FILTERS STATE (SYNCED WITH URL)
  //////////////////////////////////////////////////////////////////////
  const [filters, setFilters] = useState(() => readFiltersFromSearchParams(searchParams));

  //////////////////////////////////////////////////////////////////////
  // When URL changes (back/forward or direct open link) sync state
  //////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const next = readFiltersFromSearchParams(searchParams);
    setFilters((prev) => (shallowEqual(prev, next) ? prev : next));
  }, [searchParams]);

  //////////////////////////////////////////////////////////////////////
  // Update URL with filters (keep any other existing params)
  //////////////////////////////////////////////////////////////////////
  const syncUrlWithFilters = useCallback(
    (nextFilters) => {
      // Keep other params not related to filters
      const params = new URLSearchParams(searchParams.toString());
      FILTER_KEYS.forEach((k) => params.delete(k));

      Object.entries(nextFilters).forEach(([key, val]) => {
        if (!FILTER_KEYS.includes(key)) return;

        const v = val == null ? "" : String(val);
        if (!v) return; // skip empty

        // skip defaults to keep URL clean
        if (DEFAULT_FILTERS[key] !== undefined && v === String(DEFAULT_FILTERS[key])) return;

        params.set(key, v);
      });

      const qs = params.toString();
      const url = qs ? `${pathname}?${qs}` : pathname;

      // replace (not push) to avoid spamming history while filtering
      router.replace(url, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  //////////////////////////////////////////////////////////////////////
  // Unified handler used by Filters component
  //////////////////////////////////////////////////////////////////////
  const handleFiltersChange = useCallback(
    (next) => {
      setFilters(next);
      syncUrlWithFilters(next);
    },
    [syncUrlWithFilters]
  );

  //////////////////////////////////////////////////////////////////////
  // API PARAMS
  //////////////////////////////////////////////////////////////////////
  const apiParams = useMemo(() => {
    const normalized = normalizeFilters(filters);
    const q = buildFiltersQuery(normalized);

    // ✅ IMPORTANT: backend expects filters.name (not search)
    if (q?.search && !q?.name) q.name = q.search;

    // ✅ teacher/category id from route
    q.course_category_id = id;

    return q;
  }, [filters, id]);


  //////////////////////////////////////////////////////////////////////
  // AXIOS HOOK (NO REACT QUERY)
  //////////////////////////////////////////////////////////////////////
  const {
    rounds,
    courseCategories,
    loading,
    fetching,
    hasMore,
    loadMore,
    error,
    refetch,
  } = useGetCourseRounds(apiParams);

  const categoryName = courseCategories?.[0]?.name || "الدورات";

  return (
    <div>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <PagesBanner
            variant="normal"
            title={categoryName}
            image="/images/Frame 1000005155.png"
            breadcrumb={[
              { title: "الرئيسية", path: "/" },
              { title: categoryName, path: "#" },
            ]}
          />

          <Container className="mt-[32px]">
            {/* FILTERS */}
            <div className="mb-[32px] md:mb-[48px]">
              <CoursesFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />
            </div>

            {/* ERROR */}
            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                حدث خطأ أثناء تحميل الدورات. حاول مرة أخرى.
                <button onClick={refetch} className="ms-3 underline font-semibold">
                  إعادة المحاولة
                </button>
              </div>
            )}

            {/* COURSES LIST */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rounds?.map((course) => {
                const payload = {
                  ...course,
                  id: course?.id,
                  name: course?.name,
                  description: course?.description,
                  image_url: course?.image_url || course?.image || "",
                  start_date: course?.start_date,
                  free: course?.free,
                  price: course?.price,
                  enrolled: course?.own,
                  favorite: course?.fav,
                  roundBook: course?.round_book,
                  roundBookUrl: course?.round_book_url,
                  roundRoadMapBook: course?.round_road_map_book,
                  roundRoadMapBookUrl: course?.round_road_map_book_url,
                  rating: course?.average_rating,
                  totalRates: course?.ratings_count,
                  capacity: course?.capacity,
                  teachers: course?.teachers,
                  course: { name: course?.category_parts_name },
                  teacher: (course?.teachers || []).map((t) => ({
                    name: t?.name,
                    image_url: t?.image_url || t?.image,
                  })),
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
            </div>

            {/* EMPTY */}
            {!loading && !rounds?.length && (
              <p className="mt-6 text-center text-gray-400">لا توجد نتائج مطابقة.</p>
            )}

            {/* LOAD MORE */}
            <div className="flex justify-center items-center mt-6">
              {fetching && (
                <div className="flex justify-center h-[200px]">
                  <LoadingContent />
                </div>
              )}

              {hasMore && !fetching && (
                <button
                  onClick={loadMore}
                  className="px-4 py-3 bg-secondary rounded-[10px] text-white font-semibold"
                >
                  تحميل المزيد
                </button>
              )}

              {!hasMore && !!rounds?.length && (
                <p className="text-gray-400 mt-2">لا يوجد المزيد من النتائج</p>
              )}
            </div>
          </Container>

          <TeachersTestimonials title="أراء الطلاب" />
        </>
      )}
    </div>
  );
};

export default TeachersCourses;
