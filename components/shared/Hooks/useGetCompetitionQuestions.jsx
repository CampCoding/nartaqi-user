"use client";

import { useCallback, useState } from "react";
import axios from "axios";

// تحويل HTML -> نص (عشان الـ question_text و option_text بييجوا <p>..</p>)
const htmlToText = (html) => {
  if (!html) return "";
  if (typeof window === "undefined") return String(html).replace(/<[^>]*>/g, "");
  const doc = new DOMParser().parseFromString(String(html), "text/html");
  return (doc.body.textContent || "").replace(/\u00A0/g, " ").trim(); // replace &nbsp;
};

export function useCompetitionQuestions({
  baseUrl = "https://camp-coding.site/nartaqi/public/api",
  getToken,
  cleanHtml = true,
} = {}) {
  const [data, setData] = useState(null); // {competition, questions, total_questions, is_daily}
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuestions = useCallback(
    async ({ student_id, competition_id }) => {
      setLoading(true);
      setError(null);

      try {
        const token = typeof getToken === "function" ? getToken() : null;

        const res = await axios.post(
          `${baseUrl}/user/competitions/getCompetitionQuestions`,
          { student_id, competition_id },
          {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          }
        );

        // expected: { status: "success", data: { competition, questions, total_questions, is_daily } }
        const payload = res?.data?.data;

        if (!payload?.competition || !Array.isArray(payload?.questions)) {
          throw new Error("Invalid response shape from getCompetitionQuestions");
        }

        const normalized = {
          ...payload,
          questions: cleanHtml
            ? payload.questions.map((q) => ({
                ...q,
                question_text: htmlToText(q.question_text),
                options: (q.options || []).map((o) => ({
                  ...o,
                  option_text: htmlToText(o.option_text),
                })),
              }))
            : payload.questions,
        };

        setData(normalized);
        return normalized;
      } catch (e) {
        const msg =
          e?.response?.data?.message ||
          e?.message ||
          "Failed to load competition questions";
        setError(msg);
        setData(null);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [baseUrl, getToken, cleanHtml]
  );

  return { data, loading, error, fetchQuestions };
}
