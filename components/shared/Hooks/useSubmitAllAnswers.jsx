

"use client";

import { useCallback, useRef, useState } from "react";
import axios from "axios";

/**
 * useSubmitCompetitionAnswers
 * - POST /user/competitions/submitAllAnswers
 * - Handles loading/error/success
 * - Supports AbortController (cancel previous request)
 *
 * Expected payload:
 * {
 *   student_id: number,
 *   competition_id: number,
 *   answers: [{ question_id, answer_text, correct_or_not }]
 * }
 */
export function useSubmitCompetitionAnswers({
  baseUrl = "https://camp-coding.site/nartaqi/public/api",
  getToken, // () => token string
} = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const abortRef = useRef(null);

  const submitAnswers = useCallback(
    async ({ student_id, competition_id, answers }) => {
      // basic validation
      if (!student_id) throw new Error("student_id is required");
      if (!competition_id) throw new Error("competition_id is required");
      if (!Array.isArray(answers)) throw new Error("answers must be an array");

      // cancel previous request if any
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      setError(null);
      setResponse(null);

      try {
        const token = typeof getToken === "function" ? getToken() : null;

        const res = await axios.post(
          `${baseUrl}/user/competitions/submitAllAnswers`,
          {
            student_id,
            competition_id,
            answers,
          },
          {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            signal: controller.signal,
          }
        );

        setResponse(res.data);
        return res.data;
      } catch (e) {
        // Ignore abort errors
        if (e?.name === "CanceledError" || e?.code === "ERR_CANCELED") {
          return;
        }

        const msg =
          e?.response?.data?.message ||
          e?.response?.data?.error ||
          e?.message ||
          "Submit failed";
        setError(msg);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [baseUrl, getToken]
  );

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setResponse(null);
  }, []);

  const cancel = useCallback(() => {
    if (abortRef.current) abortRef.current.abort();
  }, []);

  return { submitAnswers, loading, error, response, reset, cancel };
}
