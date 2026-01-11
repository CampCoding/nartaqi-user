"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Fetch teacher data + rounds by teacher_id
 * Endpoint: POST /api/user/rounds/getTeacherData
 *
 * Expected response:
 * {
 *  statusCode: 200,
 *  status: "success",
 *  message: { teacher: {...}, rounds: [...] }
 * }
 *
 * Invalid id response:
 * {
 *  message: "The selected teacher id is invalid.",
 *  errors: { teacher_id: [...] }
 * }
 */
export default function useTeacherData({
  teacherId,
  token,
  baseUrl = "https://camp-coding.site/nartaqi/public",
  enabled = true,
} = {}) {
  const [data, setData] = useState(null); // { teacher, rounds }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTeacherData = useCallback(async () => {
    if (!enabled) return;
    if (!teacherId) {
      setData(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${baseUrl}/api/user/rounds/getTeacherData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ teacher_id: String(teacherId) }),
        cache: "no-store",
      });

      const json = await res.json();

      // ✅ success shape
      if (res.ok && json?.status === "success" && json?.message) {
        setData(json.message);
        return;
      }

      // ❌ invalid id shape
      const invalidMsg =
        json?.message ||
        json?.errors?.teacher_id?.[0] ||
        "Unexpected error while fetching teacher data.";

      throw new Error(invalidMsg);
    } catch (e) {
      setData(null);
      setError(e?.message || "Request failed.");
    } finally {
      setLoading(false);
    }
  }, [baseUrl, enabled, teacherId, token]);

  useEffect(() => {
    fetchTeacherData();
  }, [fetchTeacherData]);

  return {
    data, // { teacher, rounds }
    teacher: data?.teacher || null,
    rounds: data?.rounds || [],
    loading,
    error,
    refetch: fetchTeacherData,
  };
}
