"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const ENDPOINT =
  "https://camp-coding.site/nartaqi/public/api/user/categories/getCourseCategoryIncludedFreeVideos";

/**
 * Fetch header dropdown items for "Free Videos Parts"
 * Response shape:
 *  message: {
 *    parts_free_videos: [{ id, name, free_videos_count, image_url, ... }],
 *    category_parts_with_achievements: [...]
 *  }
 *
 * Output items shape:
 *  { id, title, count, image, link }
 */
export default function useHeaderFreeVideosItems(options = {}) {
  const {
    enabled = true,
    // لو مسار صفحتك مختلف غيره هنا
    basePath = "/free-courses",
    achievementsPathname = "/student-results",
    // لو اسم البراميتر مختلف غيره هنا
    paramName = "category_part_free_id",
  } = options;

  const [parts, setParts] = useState([]); // parts_free_videos
  const [achievements, setAchievements] = useState([]); // category_parts_with_achievements
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetcher = useCallback(async (signal) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(ENDPOINT, {
        method: "GET",
        headers: { Accept: "application/json" },
        signal,
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
      }

      const json = await res.json();

      // ✅ IMPORTANT: message is an object, not array
      const list = Array.isArray(json?.message?.parts_free_videos)
        ? json.message.parts_free_videos
        : [];

        const achievements = Array.isArray(json?.message?.category_parts_with_achievements) ? json.message.category_parts_with_achievements : [];
      setAchievements(achievements);
      setParts(list);
      return json;
    } catch (e) {
      if (e?.name !== "AbortError") setError(e);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();
    fetcher(controller.signal);

    return () => controller.abort();
  }, [enabled, fetcher]);

  const freeitems = useMemo(() => {
    return parts.map((p) => {
      const id = p?.id;
      const title = p?.name || "قسم";
      const count =
        typeof p?.free_videos_count === "number"
          ? p.free_videos_count
          : Number(p?.free_videos_count ?? 0);

      return {
        id,
        title,
        count,
        image: p?.image_url || "",
        // ✅ link matches your FreeVideosPage reading category_part_free_id
        link: `${basePath}?${paramName}=${encodeURIComponent(
          String(id ?? "")
        )}`,
      };
    });
  }, [parts, basePath, paramName]);
  const achievementsItem = useMemo(() => {
    return achievements.map((p) => {
      const id = p?.id;
      const title = p?.name || "قسم";
      const count =
        typeof p?.student_achievement_results_count === "number"
          ? p.student_achievement_results_count
          : Number(p?.student_achievement_results_count ?? 0);

      return {
        id,
        title,
        count,
        image: p?.image_url || "",
        // ✅ link matches your FreeVideosPage reading category_part_free_id
        link: `${achievementsPathname}/${encodeURIComponent(
          String(id ?? "")
        )}`,
      };
    });
  }, [achievements, basePath, paramName]);

  return {
    freeitems, // dropdown items
    achievementsItem,
    loading,
    error,
    refetch: () => {
      const controller = new AbortController();
      return fetcher(controller.signal);
    },
    raw: parts,
  };
}
