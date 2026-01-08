"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";

/**
 * Returns items array compatible with headerData.courses.items
 * from API: get_limit_CourseCategoryParts
 */
export default function useHeaderCoursesItems(studentId) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const abortRef = useRef(null);

  useEffect(() => {
    // لو عايز تعرض الدروب داون حتى لو مش لوجن شيل الشرط ده
    // if (!studentId) return;

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const run = async () => {
      try {
        setLoading(true);
        setError(null);

        const base =
          process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
          "https://camp-coding.site/nartaqi/public/api";

        const url = `${base}/user/categories/get_limit_CourseCategoryParts`;

        const res = await axios.get(
          url,
        );

        const list =
          res?.data?.status === "success" && Array.isArray(res.data.message)
            ? res.data.message
            : [];

        // ✅ Convert API items -> header items shape
        const mapped = list.map((p) => ({
          id: p.id,
          count: Number(p.rounds_count ?? 0),
          title: p.name,
          // ✅ عدّل اللينك حسب صفحة عرض الدورات عندك
          link: `/courses/${p?.id}` ,
        }));

        // (اختياري) ترتيب تنازلي حسب العدد
        mapped.sort((a, b) => (b.count || 0) - (a.count || 0));

        // (اختياري) لو عايز تشيل اللي count=0:
        // const filtered = mapped.filter((x) => (x.count || 0) > 0);

        setItems(mapped);
      } catch (e) {
        if (e?.name === "CanceledError" || e?.code === "ERR_CANCELED") return;
        setItems([]);
        setError(e?.response?.data?.message || "Failed to load courses menu");
      } finally {
        setLoading(false);
      }
    };

    run();

    return () => controller.abort();
  }, [studentId]);

  return { items, loading, error };
}
