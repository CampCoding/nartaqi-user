"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const DEFAULT_URL = "https://camp-coding.site/nartaqi/public/api/user/team";

export function useTeam({ url = DEFAULT_URL, enabled = true, fetchOptions } = {}) {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(Boolean(enabled));
  const [error, setError] = useState(null);

  const mountedRef = useRef(true);

  const fetchTeam = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          ...(fetchOptions?.headers || {}),
        },
        ...fetchOptions,
      });

      if (!res.ok) throw new Error(`Request failed (${res.status})`);

      const json = await res.json();
      const list = Array.isArray(json?.message) ? json.message : [];

      if (mountedRef.current) setTeam(list);
    } catch (e) {
      if (mountedRef.current) setError(e?.message || "Something went wrong");
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, [url]); // ✅ مهم: شيل fetchOptions من deps (أو ثبّته)

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    fetchTeam();
  }, [enabled, fetchTeam]);

  const refetch = useCallback(() => fetchTeam(), [fetchTeam]);

  const visibleTeam = useMemo(
    () => team.filter((m) => Number(m?.hidden) !== 1),
    [team]
  );

  return { team, visibleTeam, loading, error, refetch, setTeam };
}
