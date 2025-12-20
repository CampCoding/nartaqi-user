"use client";

import { useCallback, useState } from "react";
import axios from "axios";

const ENROLL_API =
  "https://camp-coding.site/nartaqi/public/api/user/rounds/enrollInCourse";

export default function useEnrollInCourse() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const enroll = useCallback(
    async ({ round_id, end_date, payment_id, student_id, token }) => {
      setLoading(true);
      setMessage("");
      setError(null);

      try {
        if (!token) throw new Error("Missing token");
        if (!round_id) throw new Error("Missing round_id");
        if (!student_id) throw new Error("Missing student_id");

        const res = await axios.post(
          ENROLL_API,
          {
            round_id,
            end_date, // "YYYY-MM-DD"
            payment_id,
            student_id: String(student_id),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const msg = res?.data?.message || "";
        setMessage(msg);

        return { ok: true, message: msg, data: res.data };
      } catch (e) {
        const msg =
          e?.response?.data?.message ||
          e?.response?.data?.error ||
          e?.message ||
          "Enroll failed";

        setError(msg);
        setMessage(msg);

        return { ok: false, message: msg, error: e };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { enroll, loading, message, error };
}
