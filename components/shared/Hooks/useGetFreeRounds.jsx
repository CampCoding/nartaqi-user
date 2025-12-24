"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * useGetFreeVideos
 * Endpoint: /user/categories/getFreeVideos
 *
 * Params:
 * - apiParams: string => e.g. "search=...&sort=...&category=..."
 *
 * Returns same shape as your existing hooks:
 * { data, loading, refetch, refetching, fetchNextPage, hasNextPage, isFetchingNextPage }
 */
export const useGetFreeVideos = ({ apiParams = "" } = {}) => {
  const fetcher = async ({ pageParam = 1 }) => {
    const base = "https://camp-coding.site/nartaqi/public/api";
    const query = apiParams ? `&${apiParams}` : "";
    const url = `${base}/user/categories/getFreeVideos?page=${pageParam}${query}`;

    // لو endpoint عندك POST بدل GET:
    // return axios.post(url, {}, { headers: { Authorization: `Bearer ${token}` } });

    return axios.get(url);
  };

  const query = useInfiniteQuery({
    queryKey: ["free-videos", apiParams],
    queryFn: fetcher,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const res = lastPage?.data;

      // 1) لو API بيرجع current_page / last_page داخل message
      const current =
        res?.message?.current_page ??
        res?.message?.meta?.current_page ??
        res?.meta?.current_page;

      const last =
        res?.message?.last_page ??
        res?.message?.meta?.last_page ??
        res?.meta?.last_page;

      if (Number.isFinite(current) && Number.isFinite(last)) {
        return current < last ? current + 1 : undefined;
      }

      // 2) لو بيرجع next_page_url (Laravel style)
      const nextUrl =
        res?.message?.next_page_url ??
        res?.next_page_url ??
        res?.links?.next;

      return nextUrl ? (current ? current + 1 : undefined) : undefined;
    },
    staleTime: 30_000,
  });

  return {
    data: query.data,
    loading: query.isLoading,
    refetch: query.refetch,
    refetching: query.isRefetching,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
  };
};
