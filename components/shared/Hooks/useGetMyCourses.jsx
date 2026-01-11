// hooks/useUserCourses.js
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export default function useUserCourses(token, options = {}) {
  const { autoFetch = true, baseUrl = "https://camp-coding.site/nartaqi/public" } =
    options;

  const [rounds, setRounds] = useState([]);
  const [totalAchievementRate, setTotalAchievementRate] = useState("0%");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const endpoint = useMemo(
    () => `${baseUrl}/api/user/rounds/userCourses`,
    [baseUrl]
  );

  const fetchUserCourses = useCallback(async () => {
    if (!token) {
      setRounds([]);
      setTotalAchievementRate("0%");
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // لو الـ API مش محتاج body سيبها فاضية
        body: JSON.stringify({}),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || `Request failed: ${res.status}`);
      }

      if (data?.status !== "success") {
        throw new Error(data?.message || "API returned non-success status");
      }

      const roundsArr = data?.message?.rounds ?? [];
      const totalRate = data?.message?.total_achievement_rate ?? "0%";

      setRounds(roundsArr);
      setTotalAchievementRate(totalRate);
    } catch (e) {
      setError(e?.message || "Something went wrong");
      setRounds([]);
      setTotalAchievementRate("0%");
    } finally {
      setLoading(false);
    }
  }, [endpoint, token]);

  useEffect(() => {
    if (!autoFetch) return;
    fetchUserCourses();
  }, [autoFetch, fetchUserCourses]);

  return {
    rounds,
    totalAchievementRate,
    loading,
    error,
    refetch: fetchUserCourses,
  };
}
