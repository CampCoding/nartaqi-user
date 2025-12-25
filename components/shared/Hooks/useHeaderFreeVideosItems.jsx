"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const ENDPOINT =
  "https://camp-coding.site/nartaqi/public/api/user/categories/getCourseCategoryIncludedFreeVideos";

/**
 * Fetch categories that include free videos and map them to header dropdown items
 * Output items shape: { id, title, count, link, target? }
 */
export default function useHeaderFreeVideosItems(options = {}) {
  const { enabled = true } = options;

  const [data, setData] = useState([]); // raw message array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetcher = useCallback(async () => {
    setLoading(true);
    setError(null);

    const controller = new AbortController();

    try {
      const res = await fetch(ENDPOINT, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        signal: controller.signal,
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
      }

      const json = await res.json();
      const message = Array.isArray(json?.message) ? json.message : [];
      setData(message);
    } catch (e) {
      if (e?.name !== "AbortError") setError(e);
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!enabled) return;
    fetcher();
  }, [enabled, fetcher]);

  const items = useMemo(() => {
    // تقدر تغيّر الفلترة حسب رغبتك (active فقط أو الكل)
    // هنا هنظهر الكل، والغير فعال نخليه بدون لينك.
    return data.map((c) => {
      const isActive = String(c?.active) === "1";
      const id = c?.id;
      const title = isActive ? c?.name : `${c?.name} (غير متاح)`;
      const count =
        typeof c?.free_videos_count === "number"
          ? c.free_videos_count
          : Number(c?.free_videos_count ?? 0);

      return {
        id,
        title,
        count,
        link: isActive ? `/free-courses?category=${id}` : "#",
      };
    });
  }, [data]);

  return {
    items,
    loading,
    error,
    refetch: fetcher,
    raw: data,
  };
}
