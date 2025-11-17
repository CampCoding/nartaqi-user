import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetCourseRounds = () => {
  const fetchCourse = async ({ pageParam = 1 }) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/getRounds`,
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
    queryKey: ["CourseRounds"],
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
    error: query.isError ? query.error?.message : null,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
  };
};
