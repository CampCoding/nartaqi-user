import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";

export const useGetFreeRounds = ({ apiParams }) => {
  const { user } = useSelector((state) => state.auth);

  const fetchCourse = async ({ pageParam = 1 }) => {
    const payload = {
      filters: {
        free: "1",
      },
      ...apiParams, //highest,lowest
    };
    if (apiParams?.name) {
      payload.filters.name = apiParams.name;
    }
    if (user.id) {
      payload.student_id = user.id;
    }

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/getRoundByFilters`,
      payload,
      {
        params: {
          per_page: 6,
          page: pageParam,
        },
        headers: { Accept: "application/json" },
      }
    );

    return res.data;
  };

  const query = useInfiniteQuery({
    queryKey: ["freeRounds"],
    queryFn: fetchCourse,

    getNextPageParam: (lastPage) => {
      const current = lastPage?.meta?.current_page;
      const last = lastPage?.meta?.last_page;

      return current < last ? current + 1 : undefined;
    },

    refetchOnWindowFocus: false,
  });

  return {
    refetch: query.refetch,
    refetching: query.isFetching,
    data: query.data,
    loading: query.isLoading,
    error: query.error /* ? query.error?.message : null */,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
  };
};
