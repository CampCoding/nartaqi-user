"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const ENDPOINT =
  "https://camp-coding.site/nartaqi/public/api/user/rounds/getMyCompeletenessRoundByRoundID";

export default function useRoundCompletenessRoundByRoundID(
  roundId,
  { token, enabled = true, bearer = true } = {}
) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const abortRef = useRef(null);

  const canFetch = useMemo(() => {
    return (
      enabled && roundId != null && String(roundId).trim() !== "" && !!token
    );
  }, [enabled, roundId, token]);

  const fetchCompleteness = useCallback(
    async (overrideRoundId) => {
      const rid = overrideRoundId ?? roundId;

      if (!token) {
        setError(new Error("Missing authorization token"));
        return null;
      }
      if (rid == null || String(rid).trim() === "") {
        setError(new Error("Missing round_id"));
        return null;
      }

      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer ? `Bearer ${token}` : token,
          },
          body: JSON.stringify({ round_id: String(rid) }),
          signal: controller.signal,
          cache: "no-store",
        });

        if (!res.ok) {
          let text = "";
          try {
            text = await res.text();
          } catch {}
          throw new Error(
            `Request failed (${res.status}): ${text || res.statusText}`
          );
        }

        const json = await res.json();

        if (json?.statusCode !== 200 || json?.status !== "success") {
          throw new Error(json?.message || "API returned non-success response");
        }

        setData(json);
        return json;
      } catch (e) {
        if (e?.name === "AbortError") return null;
        setError(e);
        setData(null);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [roundId, token, bearer]
  );

  useEffect(() => {
    if (!canFetch) return;
    fetchCompleteness();
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [canFetch, fetchCompleteness]);

  const message = data?.message ?? null;

  // --- 1. Separate Basic ---
  const basicItems = useMemo(() => {
    return Array.isArray(message?.basic) ? message.basic : [];
  }, [message]);

  // --- 2. Separate Lecture ---
  const lectureItems = useMemo(() => {
    return Array.isArray(message?.lecture) ? message.lecture : [];
  }, [message]);

  // --- 3. Separate Full Round ---
  const fullRoundItems = useMemo(() => {
    return Array.isArray(message?.full_round) ? message.full_round : [];
  }, [message]);

  // Combined (if needed elsewhere)
  const allItems = useMemo(() => {
    return [...basicItems, ...lectureItems, ...fullRoundItems];
  }, [basicItems, lectureItems, fullRoundItems]);

  return {
    data,
    message,
    basicItems,     // Exported separately
    lectureItems,   // Exported separately
    fullRoundItems, // Exported separately
    allItems,
    loading,
    error,
    refetch: fetchCompleteness,
    canFetch,
  };
}