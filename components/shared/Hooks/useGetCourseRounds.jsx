import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useGetCourseRounds = (payload) => {
  const { user } = useSelector((state) => state.auth);
  

  console.log(payload);

  const filters = useMemo(() => {
    let f = {
      filters: {},

      ...payload,
    };
    if (payload.course_category_id) {
      f.filters.course_category_id = payload.course_category_id;
    }
    if (user) {
      f.student_id = user.id;
    }
    return f;
  }, [payload, user]);
  console.log(filters);

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

  const query = useInfiniteQuery({
    queryKey: ["CourseRounds", JSON.stringify(filters)],
    queryFn: fetchCourse,
    getNextPageParam: (lastPage) => {
      const current = lastPage?.meta?.current_page;
      const last = lastPage?.meta?.last_page;
      return current < last ? current + 1 : undefined;
    },
    refetchOnWindowFocus: false,
  });

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
