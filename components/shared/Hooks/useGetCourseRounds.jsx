import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetCourseRounds = (payload) => {
  const filters = { filters: { ...payload } };
  console.log(filters);

  const fetchCourse = async ({ pageParam = 1 }) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/getRoundByFilters`,
      {
        ...filters,
      },
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
    queryKey: ["CourseRounds", payload],
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
