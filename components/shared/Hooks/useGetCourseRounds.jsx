"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export const useGetCourseRounds = (payload) => {
  const { user } = useSelector((state) => state.auth);

  const filters = useMemo(() => {
    const f = { filters: {} };

    if (payload?.category_part_id) f.filters.category_part_id = payload.category_part_id;
    if (payload?.course_category_id) f.filters.course_category_id = payload.course_category_id;

    // your backend expects "name" as search
    if (payload?.name) f.filters.name = payload.name;

    if (user?.id) f.student_id = user.id;

    for (const key in (payload || {})) {
      if (key !== "category_part_id" && key !== "course_category_id" && key !== "name") {
        f[key] = payload[key];
      }
    }

    return f;
  }, [payload, user?.id]);

  const [rounds, setRounds] = useState([]);
  const [roundsMeta, setRoundsMeta] = useState(null); // message.rounds (pagination object)
  const [pagination, setPagination] = useState(null); // message.pagination (simple pagination)
  const [courseCategories, setCourseCategories] = useState([]); // message.course_categories

  const [page, setPage] = useState(1);
  const perPage = 12;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);

  const hasMore = useMemo(() => {
    const current = roundsMeta?.current_page ?? pagination?.current_page ?? page;
    const last = roundsMeta?.last_page ?? pagination?.last_page ?? 1;
    return current < last;
  }, [roundsMeta, pagination, page]);

  const fetchPage = useCallback(
    async (targetPage, { append } = { append: false }) => {
      try { 
        if (append) setFetching(true);
        else setLoading(true);

        setError(null);

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/rounds/getRoundByFilters`,
          filters,
          {
            params: { per_page: perPage, page: targetPage },
            headers: { Accept: "application/json" },
          }
        );

        const message = res?.data?.message || {};
        const roundsObj = message?.rounds || {};
        const list = roundsObj?.data || [];

        setRoundsMeta(roundsObj);
        setPagination(message?.pagination || null);
        setCourseCategories(message?.course_categories || []);

        setPage(targetPage);
        setRounds((prev) => (append ? [...prev, ...list] : list));
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
        setFetching(false);
      }
    },
    [filters]
  );

  // auto fetch when filters change
  useEffect(() => {
    setRounds([]);
    setRoundsMeta(null);
    setPagination(null);
    setCourseCategories([]);
    setPage(1);
    fetchPage(1, { append: false });
  }, [fetchPage]);

  const loadMore = useCallback(() => {
    if (loading || fetching || !hasMore) return;
    const current = roundsMeta?.current_page ?? pagination?.current_page ?? page;
    fetchPage(current + 1, { append: true });
  }, [fetchPage, fetching, hasMore, loading, page, roundsMeta, pagination]);

  const refetch = useCallback(() => {
    fetchPage(1, { append: false });
  }, [fetchPage]);

  return {
    rounds,
    roundsMeta,        // full laravel paginator object
    pagination,        // simplified pagination
    courseCategories,  // array
    loading,
    fetching,
    error,
    hasMore,
    loadMore,
    refetch,
  };
};
