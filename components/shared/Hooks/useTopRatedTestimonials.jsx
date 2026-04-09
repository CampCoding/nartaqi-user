// components/shared/Hooks/useTopRatedTestimonials.js
"use client";

import { useCallback, useEffect, useState } from "react";

export default function useTopRatedTestimonials({
  token = null,
  baseUrl = "https://nartaqi.net/nartaqi/public",
  enabled = true,
} = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ ابدأ بـ true
  const [error, setError] = useState(null);

  const fetchTestimonials = useCallback(async () => {
    // ✅ شيل شرط enabled لو مش محتاجه
    setLoading(true);
    setError(null);

    try {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      // ✅ أضف token بس لو موجود
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      console.log("🚀 Fetching testimonials..."); // للتأكد

      const res = await fetch(`${baseUrl}/api/user/rounds/TopRated`, {
        method: "GET",
        headers,
        cache: "no-store",
      });

      console.log("📥 Response status:", res.status); // للتأكد

      const json = await res.json();
      console.log("📦 Response data:", json); // للتأكد

      if (res.ok) {
        // ✅ Handle different response structures
        const testimonials =
          json?.message || json?.data || json?.testimonials || json || [];
        setData(Array.isArray(testimonials) ? testimonials : []);
      } else {
        throw new Error(json?.message || "Failed to fetch testimonials");
      }
    } catch (e) {
      console.error("❌ Error:", e);
      setData([]);
      setError(e?.message || "Request failed.");
    } finally {
      setLoading(false);
    }
  }, [baseUrl, token]);

  // ✅ تنفيذ مباشر عند mount
  useEffect(() => {
    fetchTestimonials();
  }, []); // ✅ Empty dependency = run once on mount

  return {
    testimonials: data,
    loading,
    error,
    refetch: fetchTestimonials,
  };
}
