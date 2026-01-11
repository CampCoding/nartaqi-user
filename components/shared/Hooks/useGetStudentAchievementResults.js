"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const ENDPOINT =
  "https://camp-coding.site/nartaqi/public/api/user/categories/getStudentAchievementResults";

export default function useGetStudentAchievementResults(
  category_part_id,
  options = {}
) {
  const { enabled = true, token = null } = options;

  const [data, setData] = useState(null); // full response
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Prevent double fetch in React 18 StrictMode (dev)
  const lastAutoFetchKeyRef = useRef("");

  const fetcher = useCallback(
    async (overrideId) => {
      const id = overrideId ?? category_part_id;

      if (!id) {
        setData(null);
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ category_part_id: String(id) }),
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status} ${res.statusText}`);
        }

        const json = await res.json();
        setData(json);
        return json;
      } catch (e) {
        setError(e);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [category_part_id, token]
  );

  useEffect(() => {
    if (!enabled) return;

    const key = `${String(category_part_id || "")}:${token ? "auth" : "noauth"}`;

    // ✅ If StrictMode calls effect twice with same key, skip the second call
    if (lastAutoFetchKeyRef.current === key) return;
    lastAutoFetchKeyRef.current = key;

    fetcher();
  }, [enabled, category_part_id, token, fetcher]);

  const categoryPart = useMemo(
    () => data?.message?.category_part ?? null,
    [data]
  );

  const results = useMemo(
    () =>
      Array.isArray(data?.message?.achievement_results)
        ? data.message.achievement_results
        : [],
    [data]
  );

  return {
    data,
    categoryPart, // { id, name, image_url }
    results, // achievement_results[]
    loading,
    error,
    refetch: fetcher, // refetch() or refetch("48")
  };
}
