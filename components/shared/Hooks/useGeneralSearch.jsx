"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const ENDPOINT =
  "https://camp-coding.site/nartaqi/public/api/user/categories/makeGeneralSearch";

export default function useGeneralSearch({ token, search, enabled = true }) {
  const [data, setData] = useState({
    rounds: [],
    teachers: [],
    blogs: [],
    stores: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const abortRef = useRef(null);

  const normalizedSearch = useMemo(() => (search || "").trim(), [search]);

  const fetchSearch = useCallback(
    async (overrideSearch) => {
      const q = (overrideSearch ?? normalizedSearch).trim();

      if (!enabled) return;
      if (!token) {
        setError(new Error("Missing token"));
        return;
      }
      if (!q) {
        setData({ rounds: [], teachers: [], blogs: [], stores: [] });
        setError(null);
        setLoading(false);
        return;
      }

      // cancel previous
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        setLoading(true);
        setError(null);

        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ search: q }),
          signal: controller.signal,
        });

        const json = await res.json();

        if (!res.ok) {
          throw new Error(
            json?.message || json?.error || `Request failed (${res.status})`
          );
        }

        // Your response shape:
        // { statusCode:200, status:"success", message:{ rounds, teachers, blogs, stores } }
        const msg = json?.message || {};
        setData({
          rounds: Array.isArray(msg.rounds) ? msg.rounds : [],
          teachers: Array.isArray(msg.teachers) ? msg.teachers : [],
          blogs: Array.isArray(msg.blogs) ? msg.blogs : [],
          stores: Array.isArray(msg.stores) ? msg.stores : [],
        });
      } catch (e) {
        // ignore abort error
        if (e?.name === "AbortError") return;
        setError(e);
        setData({ rounds: [], teachers: [], blogs: [], stores: [] });
      } finally {
        setLoading(false);
      }
    },
    [enabled, token, normalizedSearch]
  );

  // auto fetch when search changes
  useEffect(() => {
    fetchSearch();
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [fetchSearch]);

  return {
    data,
    rounds: data.rounds,
    teachers: data.teachers,
    blogs: data.blogs,
    stores: data.stores,
    loading,
    error,
    refetch: fetchSearch,
  };
}
