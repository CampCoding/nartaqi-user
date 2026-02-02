"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * ✅ useTconditions
 * - No tokens
 * - No headers
 * - No AbortController
 * - Handles: loading / error / data + refetch
 * - Also gives you: term + conditions (by type)
 */
export function useTconditions() {
  const [data, setData] = useState([]); // raw API array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const mountedRef = useRef(true);

  const fetchTconditions = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://camp-coding.site/nartaqi/public/api/user/settings/getTconditions"
      );

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
      }

      const json = await res.json();

      // expected: { statusCode, status, message: [] }
      const list = Array.isArray(json?.message) ? json.message : [];

      if (mountedRef.current) setData(list);
    } catch (e) {
      const msg = e?.message || "Something went wrong";
      if (mountedRef.current) setError(msg);
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    fetchTconditions();
    return () => {
      mountedRef.current = false;
    };
  }, [fetchTconditions]);

  // helpers by type
  const term = useMemo(() => data.find((x) => x?.type === "term")?.content || "", [data]);
  const conditions = useMemo(
    () => data.find((x) => x?.type === "conditions")?.content || "",
    [data]
  );

  return {
    data,        // raw array
    term,        // string
    conditions,  // string
    loading,
    error,
    refetch: fetchTconditions,
  };
}
