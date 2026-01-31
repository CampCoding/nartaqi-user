"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const BASE_URL =
  "https://camp-coding.site/nartaqi/public/api/user/settings/get_support_gate";

export function useSupportGate(options = {}) {
  const { initialPage = 1, autoFetch = true } = options;

  const [page, setPage] = useState(initialPage);
  const [raw, setRaw] = useState(null); // full response
  const [loading, setLoading] = useState(!!autoFetch);
  const [error, setError] = useState(null);

  const fetchSupportGate = useCallback(
    async (p = page) => {
      setLoading(true);
      setError(null);

      let isActive = true;

      try {
        const url = `${BASE_URL}?page=${encodeURIComponent(p)}`;
        const res = await fetch(url, { method: "GET" });

        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);

        const json = await res.json();

        // Validate expected shape
        if (!json || json.status !== "success" || !json.message?.data) {
          throw new Error("Unexpected API response shape");
        }

        if (isActive) setRaw(json);
      } catch (e) {
        if (isActive) setError(e?.message || "Something went wrong");
        if (isActive) setRaw(null);
      } finally {
        if (isActive) setLoading(false);
      }

      return () => {
        isActive = false;
      };
    },
    [page]
  );

  useEffect(() => {
    if (!autoFetch) return;

    let cleanup = null;
    (async () => {
      cleanup = await fetchSupportGate(page);
    })();

    return () => {
      if (typeof cleanup === "function") cleanup();
    };
  }, [autoFetch, page, fetchSupportGate]);

  // data list
  const items = useMemo(() => raw?.message?.data ?? [], [raw]);

  // pagination info
  const pagination = useMemo(() => {
    const m = raw?.message;
    if (!m) return null;

    return {
      currentPage: m.current_page,
      perPage: m.per_page,
      total: m.total,
      lastPage: m.last_page,
      from: m.from,
      to: m.to,
      nextPageUrl: m.next_page_url,
      prevPageUrl: m.prev_page_url,
      links: m.links,
    };
  }, [raw]);

  const next = useCallback(() => {
    const last = raw?.message?.last_page ?? 1;
    setPage((p) => (p < last ? p + 1 : p));
  }, [raw]);

  const prev = useCallback(() => {
    setPage((p) => (p > 1 ? p - 1 : p));
  }, []);

  const refetch = useCallback(() => fetchSupportGate(page), [fetchSupportGate, page]);

  return {
    items,       // support gate list: [{id,title,youtube_link,description}]
    pagination,  // useful pagination object
    page,
    setPage,
    next,
    prev,
    raw,         // full API response
    loading,
    error,
    refetch,
  };
}
