"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * useGetFreeVideos (UPDATED)
 * Endpoint: POST /user/categories/getFreeVideos
 *
 * Body:
 *  - course_category_id: number|string (required)
 *
 * Optional:
 *  - apiParams: string => "search=...&sort=..." (if your backend supports query string)
 *
 * Returns:
 * { data, loading, refetch, refetching, fetchNextPage, hasNextPage, isFetchingNextPage }
 */
export const useGetFreeVideos = ({
  course_category_id,
  apiParams = "",
} = {}) => {
  const fetcher = async ({ pageParam = 1 }) => {
    const base = "https://camp-coding.site/nartaqi/public/api";
    const query = apiParams ? `&${apiParams}` : "";
    const url = `${base}/user/categories/getFreeVideos?page=${pageParam}${query}`;

    // ✅ POST body as per new API
    const body = {
      course_category_id: course_category_id ? String(course_category_id) : "",
    };

    return axios.post(url, body);
  };

  const query = useInfiniteQuery({
    queryKey: ["free-videos", course_category_id, apiParams],
    enabled: Boolean(course_category_id), // ✅ don't call without category
    queryFn: fetcher,
    initialPageParam: 1,

    // ✅ Updated pagination for new response shape:
    // response: { statusCode, status, message: [ ...items ] }
    // (No pagination info provided) -> we assume single page unless your API adds meta later.
    getNextPageParam: (lastPage, allPages) => {
      const res = lastPage?.data;

      // If later the API adds meta:
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

      // If it adds next_page_url:
      const nextUrl =
        res?.message?.next_page_url ?? res?.next_page_url ?? res?.links?.next;

      if (nextUrl) return allPages.length + 1;

      // ✅ Current API returns array only => no next page
      return undefined;
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
