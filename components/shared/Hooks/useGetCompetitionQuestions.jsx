"use client";

import { useCallback, useState } from "react";
import axios from "axios";

// تحويل HTML -> نص
const htmlToText = (html) => {
  if (!html) return "";
  if (typeof window === "undefined") return String(html).replace(/<[^>]*>/g, "");
  const doc = new DOMParser().parseFromString(String(html), "text/html");
  return (doc.body.textContent || "").replace(/\u00A0/g, " ").trim();
};

export function useCompetitionQuestions({
  baseUrl = "https://camp-coding.site/nartaqi/public/api",
  getToken,
  cleanHtml = true,
} = {}) {
  /**
   * data will be ONE of:
   * - { type: "questions", competition, questions, total_questions, is_daily }
   * - { type: "already_answered", all_answered, answered_count, total_questions, message }
   */
  const [data, setData] = useState(null);
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
          { headers: token ? { Authorization: `Bearer ${token}` } : undefined }
        );

        const root = res?.data || {};
        const payload = root?.data;

        // ✅ Shape 2: already answered
        // {
        //   status: "success",
        //   message: "تم حل أسئلة اليوم",
        //   data: { all_answered, answered_count, total_questions }
        // }
        if (payload && typeof payload?.all_answered === "boolean") {
          const normalized = {
            type: "already_answered",
            message: root?.message || "",
            all_answered: payload.all_answered,
            answered_count: payload.answered_count ?? 0,
            total_questions: payload.total_questions ?? 0,
          };

          setData(normalized);
          return normalized;
        }

        // ✅ Shape 1: questions
        // { status: "success", data: { competition, questions, total_questions, is_daily } }
        if (payload?.competition && Array.isArray(payload?.questions)) {
          const normalized = {
            type: "questions",
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
        }

        // ❌ unexpected
        throw new Error("Invalid response shape from getCompetitionQuestions");
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
