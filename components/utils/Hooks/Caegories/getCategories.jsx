"use client";

import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getCategories,
  resetCategories,
  clearCategoriesError,
  setCategoriesPage,
  selectCategories,
  selectCategoriesMeta,
  selectCategoriesLoading,
  selectCategoriesError,
  selectCategoriesLastQuery,
} from "../../Store/Slices/categories-slice";

/**
 * Simple categories hook
 * @param {Object} options
 * @param {number} options.per_page  default 10
 * @param {number} options.page      default 1
 * @param {boolean} options.auto     auto-fetch on mount (default true)
 */
export function useGetCategories(options = {}) {
  const {
    per_page = 10,
    page = 1,
    auto = true,
  } = options;

  const dispatch = useDispatch();

  const items = useSelector(selectCategories);
  const meta = useSelector(selectCategoriesMeta);
  const loading = useSelector(selectCategoriesLoading);
  const error = useSelector(selectCategoriesError);
  const lastQuery = useSelector(selectCategoriesLastQuery);

  // Fetch with optional overrides
  const fetch = useCallback(
    (override = {}) => {
      const q = {
        per_page,
        page,
        ...(lastQuery || {}),
        ...override,
      };
      return dispatch(getCategories(q));
    },
    [dispatch, per_page, page, lastQuery]
  );

  // Re-fetch current page
  const refetch = useCallback(() => {
    return fetch({ page: meta?.page || page });
  }, [fetch, meta?.page, page]);

  // Go to a specific page (updates store page then fetches)
  const goToPage = useCallback(
    (nextPage) => {
      dispatch(setCategoriesPage(nextPage));
      return fetch({ page: Number(nextPage) || 1 });
    },
    [dispatch, fetch]
  );

  // Load next page if available (append handled in slice)
  const loadMore = useCallback(() => {
    const current = meta?.page || 1;
    const last = meta?.last_page || 1;
    if (loading) return Promise.resolve();
    if (current >= last) return Promise.resolve();
    return fetch({ page: current + 1 });
  }, [fetch, meta?.page, meta?.last_page, loading]);

  // Reset list to first page
  const refresh = useCallback(() => {
    dispatch(resetCategories());
    return fetch({ page: 1, per_page });
  }, [dispatch, fetch, per_page]);

  // Clear error
  const clearError = useCallback(() => {
    dispatch(clearCategoriesError());
  }, [dispatch]);

  useEffect(() => {
    if (auto) {
      fetch({ per_page, page });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  return {
    items,
    meta,
    loading,
    error,

    // actions
    fetch,
    refetch,
    refresh,
    loadMore,
    goToPage,
    clearError,
  };
}
