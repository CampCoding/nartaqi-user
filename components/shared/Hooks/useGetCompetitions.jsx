"use client"


// useGetAllCompetitions.js
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";

/**
 * Custom hook: Get all competitions (paginated)
 * Endpoint:
 *  GET /user/competitions/getAllCompetitions?page=1&per_page=10
 */
export function useGetAllCompetitions(options = {}) {
  const {
    baseURL = "https://camp-coding.site/nartaqi/public/api",
    initialPage = 1,
    initialPerPage = 10,
    enabled = true,
    headers, // { Authorization: `Bearer ...` } if needed
  } = options;

  const [page, setPage] = useState(initialPage);
  const [perPage, setPerPage] = useState(initialPerPage);

  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Prevent race conditions (only last request wins)
  const requestIdRef = useRef(0);

  const endpoint = useMemo(() => {
    return `${baseURL}/user/competitions/getAllCompetitions`;
  }, [baseURL]);

  const fetchData = useCallback(
    async (override) => {
      const reqId = ++requestIdRef.current;
      setLoading(true);
      setError(null);

      const finalPage = override?.page ?? page;
      const finalPerPage = override?.per_page ?? perPage;

      try {
        const res = await axios.get(endpoint, {
          params: { page: finalPage, per_page: finalPerPage },
          headers,
        });

        // ignore if a newer request already happened
        if (reqId !== requestIdRef.current) return;

        if (!res.data || res.data.status !== "success") {
          setItems([]);
          setPagination(null);
          setError("Request failed.");
          return;
        }

        setItems(res.data?.data?.data || []);
        setPagination(res.data?.data || null);
      } catch (e) {
        if (reqId !== requestIdRef.current) return;

        const msg =
          e?.response?.data?.message ||
          e?.response?.data?.error ||
          e?.message ||
          "Network error";

        setItems([]);
        setPagination(null);
        setError(msg);
      } finally {
        if (reqId === requestIdRef.current) setLoading(false);
      }
    },
    [endpoint, headers, page, perPage]
  );

  useEffect(() => {
    if (!enabled) return;
    fetchData();
  }, [enabled, fetchData]);

  const refetch = useCallback(() => fetchData(), [fetchData]);

  const hasNext = !!pagination?.next_page_url;
  const hasPrev = !!pagination?.prev_page_url;

  const next = useCallback(() => {
    if (!hasNext) return;
    setPage((p) => p + 1);
  }, [hasNext]);

  const prev = useCallback(() => {
    if (!hasPrev) return;
    setPage((p) => Math.max(1, p - 1));
  }, [hasPrev]);

  return {
    items,
    pagination,
    page,
    perPage,
    setPage,
    setPerPage,
    loading,
    error,
    refetch,
    hasNext,
    hasPrev,
    next,
    prev,
    fetchData, // optional: manual fetch with override {page, per_page}
  };
}
