import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetFreeRounds = () => {
  const fetchCourse = async ({ pageParam = 1 }) => {
    const { user } = useSelector((state) => state.auth);
    const payload = {
      filters: {
        free: "1",
      },
      sort_most_common: false, // false
      sort_date_latest: false, // false
      sort_price: "low_to_high", // or high_to_low
      sort_rating: "lowest", //highest,lowest
    };
    if (user.id) {
      payload.student_id = user.id;
    }
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/getRoundByFilters`,
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
    data: query.data,
    loading: query.isLoading,
    error: query.isError ? query.error?.message : null,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
  };
};
