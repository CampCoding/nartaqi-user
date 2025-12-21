"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Mark student view for a specific video in a round.
 *
 * Endpoint:
 *  POST https://camp-coding.site/nartaqi/public/api/user/rounds/makestudentView
 * Body: { student_id, round_id, video_id }
 *
 * @param {string | null} token Optional Bearer token
 * @param {object} options Optional callbacks
 */
export default function useMakeStudentView(
  token,
  {
    baseUrl = "https://camp-coding.site/nartaqi/public",
    onSuccess,
    onError,
  } = {}
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // prevent race conditions (only last request wins)
  const reqIdRef = useRef(0);

  const makeStudentView = useCallback(
    async ({ student_id, round_id, video_id }) => {
      setError(null);
      setLoading(true);

      const currentReqId = ++reqIdRef.current;

      try {
        // Basic validation
        if (!student_id || !round_id || !video_id) {
          throw new Error("Missing required fields: student_id, round_id, video_id");
        }

        const res = await fetch(`${baseUrl}/api/user/rounds/makestudentView`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            student_id: String(student_id),
            round_id: String(round_id),
            video_id: String(video_id),
          }),
        });

        const json = await res.json().catch(() => ({}));

        // if a newer request started, ignore this one
        if (currentReqId !== reqIdRef.current) return null;

        if (!res.ok) {
          const msg =
            json?.message ||
            json?.error ||
            `Request failed with status ${res.status}`;
          throw new Error(msg);
        }

        setData(json);
        onSuccess?.(json);

        return json;
      } catch (e) {
        // if a newer request started, ignore this one
        if (currentReqId !== reqIdRef.current) return null;

        const errMsg = e?.message || "Something went wrong";
        setError(errMsg);
        onError?.(errMsg);

        return null;
      } finally {
        // if a newer request started, ignore state update
        if (currentReqId !== reqIdRef.current) return;
        setLoading(false);
      }
    },
    [baseUrl, token, onSuccess, onError]
  );

  const reset = useCallback(() => {
    setLoading(false);
    setData(null);
    setError(null);
  }, []);

  return { makeStudentView, loading, data, error, reset };
}
