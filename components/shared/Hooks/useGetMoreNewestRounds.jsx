// src/hooks/useMoreLatestRounds.js
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";

const ENDPOINT =
  "https://camp-coding.site/nartaqi/public/api/user/rounds/getmoreLatestRounds";

export default function useMoreLatestRounds(studentId, perPage = 3) {
  const [rounds, setRounds] = useState([]);
  const [loading, setLoading] = useState(true);   // أول تحميل
  const [fetching, setFetching] = useState(false); // تحميل صفحات إضافية
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const token = localStorage.getItem("token");

  // علشان نتجنب race conditions
  const requestIdRef = useRef(0);

  const fetchPage = useCallback(
    async (targetPage, mode = "append") => {



      const rid = ++requestIdRef.current;

      try {
        setError(null);
        if (targetPage === 1) setLoading(true);
        else setFetching(true);

        const res = await axios.post(ENDPOINT, {
          // student_id: String(studentId),

          // ✅ لو الـ API بيدعم pagination
          // page: targetPage,
          // per_page: perPage,
        },
        { headers: { Authorization: `Bearer ${token}` } }

      
      );

        // لو فيه request أحدث خرج قبل ده، تجاهل ده
        if (rid !== requestIdRef.current) return;

        const list = Array.isArray(res?.data?.message) ? res.data.message : [];

        setHasMore(list.length >= perPage);

        setRounds((prev) => {
          const next = mode === "replace" ? [] : prev;

          // ✅ منع التكرار حسب id
          const map = new Map(next.map((r) => [r.id, r]));
          list.forEach((r) => map.set(r.id, r));

          return Array.from(map.values());
        });
      } catch (e) {
        if (rid !== requestIdRef.current) return;
        setError(
          e?.response?.data?.message ||
            e?.message ||
            "Failed to load latest rounds"
        );
      } finally {
        if (rid !== requestIdRef.current) return;
        setLoading(false);
        setFetching(false);
      }
    },
    [studentId, perPage]
  );

  // ✅ أول تحميل + عند تغيير studentId
  useEffect(() => {
    setRounds([]);
    setPage(1);
    setHasMore(true);
    fetchPage(1, "replace");
  }, [fetchPage]);

  const loadMore = useCallback(() => {
    if (!hasMore || loading || fetching) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPage(nextPage, "append");
  }, [hasMore, loading, fetching, page, fetchPage]);

  const refetch = useCallback(() => {
    requestIdRef.current++; // يلغي أي طلبات قديمة
    setRounds([]);
    setPage(1);
    setHasMore(true);
    fetchPage(1, "replace");
  }, [fetchPage]);

  return {
    rounds,
    loading,
    fetching,
    error,
    hasMore,
    loadMore,
    refetch,
    page,
  };
}
