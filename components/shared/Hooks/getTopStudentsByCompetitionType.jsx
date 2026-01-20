"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";

/**
 * GET /user/categories/getTopStudentsByCompetitionType
 * No token
 */
export function useGetTopStudentsByCompetitionType(options = {}) {
  const {
    baseURL = "https://camp-coding.site/nartaqi/public/api",
    enabled = true,
    headers,
    timeout = 20000,
  } = options;

  const [data, setData] = useState({ daily: [], weekly: [], monthly: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const aliveRef = useRef(true);
  const reqIdRef = useRef(0);

  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
    };
  }, []);

  const fetchTopStudents = useCallback(async () => {
    const reqId = ++reqIdRef.current;
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        `${baseURL}/user/categories/getTopStudentsByCompetitionType`,
        { timeout, headers: { ...(headers || {}) } }
      );

      if (!aliveRef.current || reqId !== reqIdRef.current) return;

      const incoming = res?.data?.data || {};
      setData({
        daily: Array.isArray(incoming.daily) ? incoming.daily : [],
        weekly: Array.isArray(incoming.weekly) ? incoming.weekly : [],
        monthly: Array.isArray(incoming.monthly) ? incoming.monthly : [],
      });
    } catch (e) {
      if (!aliveRef.current || reqId !== reqIdRef.current) return;

      const msg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        e?.message ||
        "Request failed";

      setError(msg);
      setData({ daily: [], weekly: [], monthly: [] });
    } finally {
      if (!aliveRef.current || reqId !== reqIdRef.current) return;
      setLoading(false);
    }
  }, [baseURL, headers, timeout]);

  useEffect(() => {
    if (!enabled) return;
    fetchTopStudents();
  }, [enabled, fetchTopStudents]);

  return {
    data,
    daily: data.daily,
    weekly: data.weekly,
    monthly: data.monthly,
    loading,
    error,
    refetch: fetchTopStudents,
  };
}
