"use client";

import { useCallback, useRef, useState } from "react";


export function useEnrollInCompetition(options = {}) {
  const {
    baseUrl = "https://camp-coding.site/nartaqi/public/api",
    getToken = () => {
      // You can replace this with your auth store (Redux/Zustand/Cookies)
      // Example: return localStorage.getItem("token");
      return typeof window !== "undefined" ? localStorage.getItem("token") : null;
    },
  } = options;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // to cancel previous request if needed
  const abortRef = useRef(null);

  const enroll = useCallback(
    async ({ student_id, competition_id, token: tokenOverride } = {}) => {
      setLoading(true);
      setSuccess(false);
      setError(null);

      // Abort any previous request
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const token = tokenOverride ?? getToken?.();
        if (!token) throw new Error("Missing auth token");

        if (!student_id) throw new Error("Missing student_id");
        if (!competition_id) throw new Error("Missing competition_id");

        const res = await fetch(
          `${baseUrl}/user/competitions/enrollInCompetition`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ student_id, competition_id }),
            signal: controller.signal,
          }
        );

        // Try parse JSON (even on error)
        const json = await res.json().catch(() => null);

        if (!res.ok) {
          const msg =
            json?.message ||
            json?.error ||
            `Request failed (${res.status})`;
          throw new Error(msg);
        }

        setData(json);
        setSuccess(true);
        return { ok: true, data: json };
      } catch (e) {
        // Ignore abort errors
        if (e?.name === "AbortError") return { ok: false, aborted: true };

        setError(e?.message || "Something went wrong");
        return { ok: false, error: e?.message || "Something went wrong" };
      } finally {
        setLoading(false);
      }
    },
    [baseUrl, getToken]
  );

  const reset = useCallback(() => {
    setLoading(false);
    setSuccess(false);
    setError(null);
    setData(null);
  }, []);

  return { enroll, loading, success, error, data, reset };
}
