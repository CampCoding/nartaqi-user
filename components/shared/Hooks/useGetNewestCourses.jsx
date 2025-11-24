"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";

export const useGetNewestRounds = () => {
  const { user } = useSelector((state) => state.auth);
  const fetchCourse = async ({ pageParam = 1 }) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/getLatestRounds`,
    { student_id: user.id }, // body لازم يبقى موجود حتى لو فاضي
      {
        params: {
          per_page: 3,
          page: pageParam,
        },
        headers: { Accept: "application/json" },
      }
    );

    return res.data;
  };

  const query = useInfiniteQuery({
    queryKey: ["NewestRounds"],
    queryFn: fetchCourse,
    getNextPageParam: (lastPage) => {
      const current = lastPage?.meta?.current_page;
      const last = lastPage?.meta?.last_page;
      return current < last ? current + 1 : undefined;
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.isError ? query.error?.message : null,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    refetch: query.refetch,
  };
};
