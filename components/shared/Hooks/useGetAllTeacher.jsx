"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const DEFAULT_URL =
  "https://camp-coding.site/nartaqi/public/api/user/rounds/getAllTeacher";

const DEFAULT_HEADERS = {};

export default function useGetAllTeacherRounds(options = {}) {
  const {
    url = DEFAULT_URL,
    token = null,
    enabled = true,
    headers = DEFAULT_HEADERS,
  } = options;

  const [data, setData] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(Boolean(enabled));
  const [error, setError] = useState(null);

  // ✅ prevents setState after unmount (بدون cancel للـ request)
  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const normalizeTeacher = useCallback((t) => {
    const fixedImageUrl =
      typeof t?.image_url === "string"
        ? t.image_url.replace(/^storage(?=https?:\/\/)/, "")
        : null;

    const bestImage =
      fixedImageUrl || (typeof t?.image === "string" ? t.image : null) || null;

    return {
      ...t,
      image_url: fixedImageUrl || t?.image_url || null,
      image: bestImage,
    };
  }, []);

  const fetchTeachers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...headers,
        },
        cache: "no-store",
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        const msg =
          json?.message || json?.error || `Request failed with status ${res.status}`;
        throw new Error(msg);
      }

      const list = Array.isArray(json?.message) ? json.message : [];
      const normalized = list.map(normalizeTeacher);

      if (!isMountedRef.current) return;

      setData(json);
      setTeachers(normalized);
      return normalized;
    } catch (e) {
      if (!isMountedRef.current) return;

      setError(e?.message || "Something went wrong");
      setTeachers([]);
      setData(null);
    } finally {
      if (!isMountedRef.current) return;
      setLoading(false);
    }
  }, [url, token, headers, normalizeTeacher]);

  useEffect(() => {
    if (!enabled) return;
    fetchTeachers();
  }, [enabled, fetchTeachers]);

  const refetch = useCallback(() => fetchTeachers(), [fetchTeachers]);
  const hasData = useMemo(() => teachers.length > 0, [teachers]);

  return { data, teachers, loading, error, hasData, refetch };
}
