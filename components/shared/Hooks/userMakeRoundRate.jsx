// hooks/useMakeRoundRate.js
"use client";
import { useCallback, useState } from "react";

export function useMakeRoundRate({ token = null, baseUrl = "https://camp-coding.site/nartaqi/public" } = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitRate = useCallback(
    async (payload) => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${baseUrl}/api/user/rounds/makeRoundRate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        });

        const json = await res.json();

        if (!res.ok || json?.status !== "success") {
          throw new Error(json?.message || `Request failed (${res.status})`);
        }

        return json;
      } catch (e) {
        setError(e?.message || "Something went wrong");
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [token, baseUrl]
  );

  return { submitRate, loading, error };
}
