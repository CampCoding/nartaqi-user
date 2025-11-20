import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useGetCourseRounds = (payload) => {
  const { user } = useSelector((state) => state.auth);
  

  // ================================
  //  Build final filters object cleanly
  // ================================
  const filters = useMemo(() => {
    const f = {
      filters: {},
    };

    // include category_part_id or course_category_id
    if (payload.category_part_id) {
      f.filters.category_part_id = payload.category_part_id;
    }

    if (payload.course_category_id) {
      f.filters.course_category_id = payload.course_category_id;
    }

    // search
    if (payload.name) {
      f.filters.name = payload.name;
    }

    // inject student
    if (user) {
      f.student_id = user.id;
    }

    // include all remaining params (sort, type, price, etc.)
    for (const key in payload) {
      if (
        key !== "category_part_id" &&
        key !== "course_category_id" &&
        key !== "name"
      ) {
        f[key] = payload[key];
      }
    }

    return f;
  }, [payload, user]);
console.log(filters);

  // ================================
  //  API Request
  // ================================
  const fetchCourse = async ({ pageParam = 1 }) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/getRoundByFilters`,
      filters,
      {
        params: {
          per_page: 12,
          page: pageParam,
        },
        headers: { Accept: "application/json" },
      }
    );

    return res.data;
  };

  // ================================
  //  React Query
  // ================================
  const query = useInfiniteQuery({
    queryKey: ["CourseRounds", filters],
    queryFn: fetchCourse,
    getNextPageParam: (lastPage) => {
      const current = lastPage?.meta?.current_page;
      const last = lastPage?.meta?.last_page;
      return current < last ? current + 1 : undefined;
    },
    refetchOnWindowFocus: false,
  });

  // ================================
  //  Return API shape
  // ================================
  return {
    data: query.data,
    loading: query.isLoading,
    error: query.isError ? query.error : null,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    refetch: query.refetch,
  };
};
